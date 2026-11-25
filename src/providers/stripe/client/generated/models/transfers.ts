// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripetax_deducted_at_source } from "./catalog.js";
import { Stripecharge, Stripedispute, Striperefund } from "./charges.js";
import {
  Stripeapplication_fee,
  Stripeconnect_collection_transfer,
  Stripedeleted_bank_account,
  Stripedeleted_card,
  Stripefee,
  Stripefee_refund,
  Stripereserve_transaction,
  Stripetopup,
} from "./common.js";
import { Stripecustomer_cash_balance_transaction } from "./customers.js";
import {
  Stripeissuing_authorization,
  Stripeissuing_dispute,
  Stripeissuing_transaction,
} from "./issuing.js";
import { Stripebank_account, Stripecard } from "./paymentSources.js";
import { Stripepayment_data } from "./payments.js";

export type Stripetransfer = {
  readonly amount: number;
  readonly amount_reversed: number;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly destination?: string | Stripeaccount | null;
  readonly destination_payment?: string | Stripecharge;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "transfer";
  readonly reversals: {
    readonly data: ReadonlyArray<Stripetransfer_reversal>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly reversed: boolean;
  readonly source_transaction?: string | Stripecharge | null;
  readonly source_type?: string;
  readonly transfer_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetransfer_reversal = {
  readonly amount: number;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly created: number;
  readonly currency: string;
  readonly destination_payment_refund?: string | Striperefund | null;
  readonly id: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "transfer_reversal";
  readonly source_refund?: string | Striperefund | null;
  readonly transfer: string | Stripetransfer;
} & { readonly [x: string]: Schema.Json };
export type Stripebalance_transaction = {
  readonly amount: number;
  readonly available_on: number;
  readonly balance_type:
    | "issuing"
    | "payments"
    | "refund_and_dispute_prefunding"
    | "risk_reserved";
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly exchange_rate?: number | null;
  readonly fee: number;
  readonly fee_details: ReadonlyArray<Stripefee>;
  readonly id: string;
  readonly net: number;
  readonly object: "balance_transaction";
  readonly reporting_category: string;
  readonly source?:
    | string
    | Stripeapplication_fee
    | Stripecharge
    | Stripeconnect_collection_transfer
    | Stripecustomer_cash_balance_transaction
    | Stripedispute
    | Stripefee_refund
    | Stripeissuing_authorization
    | Stripeissuing_dispute
    | Stripeissuing_transaction
    | Stripepayout
    | Striperefund
    | Stripereserve_transaction
    | Stripetax_deducted_at_source
    | Stripetopup
    | Stripetransfer
    | Stripetransfer_reversal
    | null;
  readonly status: string;
  readonly type:
    | "adjustment"
    | "advance"
    | "advance_funding"
    | "anticipation_repayment"
    | "application_fee"
    | "application_fee_refund"
    | "charge"
    | "climate_order_purchase"
    | "climate_order_refund"
    | "connect_collection_transfer"
    | "contribution"
    | "fee_credit_funding"
    | "inbound_transfer"
    | "inbound_transfer_reversal"
    | "issuing_authorization_hold"
    | "issuing_authorization_release"
    | "issuing_dispute"
    | "issuing_dispute_provisional_credit"
    | "issuing_dispute_provisional_credit_reversal"
    | "issuing_transaction"
    | "obligation_outbound"
    | "obligation_reversal_inbound"
    | "payment"
    | "payment_failure_refund"
    | "payment_network_reserve_hold"
    | "payment_network_reserve_release"
    | "payment_refund"
    | "payment_reversal"
    | "payment_unreconciled"
    | "payout"
    | "payout_cancel"
    | "payout_failure"
    | "payout_minimum_balance_hold"
    | "payout_minimum_balance_release"
    | "refund"
    | "refund_failure"
    | "reserve_hold"
    | "reserve_release"
    | "reserve_transaction"
    | "reserved_funds"
    | "stripe_balance_payment_debit"
    | "stripe_balance_payment_debit_reversal"
    | "stripe_fee"
    | "stripe_fx_fee"
    | "tax_fee"
    | "tax_fund"
    | "topup"
    | "topup_reversal"
    | "transfer"
    | "transfer_cancel"
    | "transfer_failure"
    | "transfer_refund";
} & { readonly [x: string]: Schema.Json };
export type Stripepayout = {
  readonly amount: number;
  readonly application_fee?: string | Stripeapplication_fee | null;
  readonly application_fee_amount?: number | null;
  readonly arrival_date: number;
  readonly automatic: boolean;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly destination?:
    | string
    | Stripebank_account
    | Stripecard
    | Stripedeleted_bank_account
    | Stripedeleted_card
    | null;
  readonly failure_balance_transaction?:
    | string
    | Stripebalance_transaction
    | null;
  readonly failure_code?: string | null;
  readonly failure_message?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly method: string;
  readonly object: "payout";
  readonly original_payout?: string | Stripepayout | null;
  readonly payout_method?: string | null;
  readonly reconciliation_status:
    | "completed"
    | "in_progress"
    | "not_applicable";
  readonly reversed_by?: string | Stripepayout | null;
  readonly source_type: string;
  readonly statement_descriptor?: string | null;
  readonly status: string;
  readonly trace_id?: Stripepayouts_trace_id | null;
  readonly type: "bank_account" | "card";
} & { readonly [x: string]: Schema.Json };
export type Stripepayouts_trace_id = {
  readonly status: string;
  readonly value?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetransfer_schedule = {
  readonly delay_days: number;
  readonly interval: string;
  readonly monthly_anchor?: number;
  readonly monthly_payout_days?: ReadonlyArray<number>;
  readonly weekly_anchor?: string;
  readonly weekly_payout_days?: ReadonlyArray<
    "friday" | "monday" | "thursday" | "tuesday" | "wednesday"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripetransfer_data = {
  readonly amount?: number;
  readonly description?: string;
  readonly destination: string | Stripeaccount;
  readonly metadata?: { readonly [x: string]: string };
  readonly payment_data?: Stripepayment_data;
} & { readonly [x: string]: Schema.Json };

export const Stripetransfer = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount in cents (or local equivalent) to be transferred.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    amount_reversed: Schema.Number.annotate({
      description:
        "Amount in cents (or local equivalent) reversed (can be less than the amount attribute on the transfer if a partial reversal was issued).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    balance_transaction: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripebalance_transaction> =>
              Stripebalance_transaction,
          ),
        ]).annotate({
          description:
            "Balance transaction that describes the impact of this transfer on your account balance.",
        }),
        Schema.Null,
      ]),
    ),
    created: Schema.Number.annotate({
      description: "Time that this record of the transfer was first created.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    description: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    destination: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
        ]).annotate({
          description: "ID of the Stripe account the transfer was sent to.",
        }),
        Schema.Null,
      ]),
    ),
    destination_payment: Schema.optionalKey(
      Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
      ]).annotate({
        description:
          "If the destination is a Stripe account, this will be the ID of the payment that the destination account received for the transfer.",
      }),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    livemode: Schema.Boolean.annotate({
      description:
        "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
    }),
    metadata: Schema.Record(
      Schema.String,
      Schema.String.check(
        Schema.isMaxCodePoints(500).annotate({
          expected: "a string with at most 500 code points",
        }),
      ),
    ).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
    }),
    object: Schema.Literal("transfer").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    reversals: Schema.StructWithRest(
      Schema.Struct({
        data: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripetransfer_reversal> =>
              Stripetransfer_reversal,
          ),
        ).annotate({ description: "Details about each object." }),
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
    ).annotate({
      title: "TransferReversalList",
      description:
        "A list of reversals that have been applied to the transfer.",
    }),
    reversed: Schema.Boolean.annotate({
      description:
        "Whether the transfer has been fully reversed. If the transfer is only partially reversed, this attribute will still be false.",
    }),
    source_transaction: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
        ]).annotate({
          description:
            "ID of the charge that was used to fund the transfer. If null, the transfer was funded from the available balance.",
        }),
        Schema.Null,
      ]),
    ),
    source_type: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The source balance this transfer came from. One of `card`, `fpx`, or `bank_account`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    transfer_group: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "A string that identifies this transaction as part of a group. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options) for details.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
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
  title: "Transfer",
  description:
    "A `Transfer` object is created when you move funds between Stripe accounts as\npart of Connect.\n\nBefore April 6, 2017, transfers also represented movement of funds from a\nStripe account to a card or bank account. This behavior has since been split\nout into a [Payout](https://docs.stripe.com/api#payout_object) object, with corresponding payout endpoints. For more\ninformation, read about the\n[transfer/payout split](https://docs.stripe.com/transfer-payout-split).\n\nRelated guide: [Creating separate charges and transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)",
  identifier: "Stripetransfer",
});
export const Stripetransfer_reversal = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Number.annotate({
      description: "Amount, in cents (or local equivalent).",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    balance_transaction: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripebalance_transaction> =>
              Stripebalance_transaction,
          ),
        ]).annotate({
          description:
            "Balance transaction that describes the impact on your account balance.",
        }),
        Schema.Null,
      ]),
    ),
    created: Schema.Number.annotate({
      description:
        "Time at which the object was created. Measured in seconds since the Unix epoch.",
      format: "unix-time",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    currency: Schema.String.annotate({
      description:
        "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      format: "currency",
    }),
    destination_payment_refund: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Striperefund> => Striperefund),
        ]).annotate({
          description: "Linked payment refund for the transfer reversal.",
        }),
        Schema.Null,
      ]),
    ),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    metadata: Schema.optionalKey(
      Schema.Union([
        Schema.Record(
          Schema.String,
          Schema.String.check(
            Schema.isMaxCodePoints(500).annotate({
              expected: "a string with at most 500 code points",
            }),
          ),
        ).annotate({
          description:
            "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
        }),
        Schema.Null,
      ]),
    ),
    object: Schema.Literal("transfer_reversal").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
    source_refund: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Striperefund> => Striperefund),
        ]).annotate({
          description:
            "ID of the refund responsible for the transfer reversal.",
        }),
        Schema.Null,
      ]),
    ),
    transfer: Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.suspend((): Schema.Codec<Stripetransfer> => Stripetransfer),
    ]).annotate({ description: "ID of the transfer that was reversed." }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "Transfer Reversal",
  description:
    "[Stripe Connect](https://docs.stripe.com/connect) platforms can reverse transfers made to a\nconnected account, either entirely or partially, and can also specify whether\nto refund any related application fees. Transfer reversals add to the\nplatform's balance and subtract from the destination account's balance.\n\nReversing a transfer that was made for a [destination\ncharge](/docs/connect/destination-charges) is allowed only up to the amount of\nthe charge. It is possible to reverse a\n[transfer_group](https://docs.stripe.com/connect/separate-charges-and-transfers#transfer-options)\ntransfer only if the destination account has enough balance to cover the\nreversal.\n\nRelated guide: [Reverse transfers](https://docs.stripe.com/connect/separate-charges-and-transfers#reverse-transfers)",
  identifier: "Stripetransfer_reversal",
});
export const Stripebalance_transaction = Schema.suspend(
  (): Schema.Codec<Stripebalance_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "Gross amount of this transaction (in cents (or local equivalent)). A positive value represents funds charged to another party, and a negative value represents funds sent to another party.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        available_on: Schema.Number.annotate({
          description:
            "The date that the transaction's net funds become available in the Stripe balance.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        balance_type: Schema.Literals([
          "issuing",
          "payments",
          "refund_and_dispute_prefunding",
          "risk_reserved",
        ]).annotate({
          description: "The balance that this transaction impacts.",
        }),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        exchange_rate: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "If applicable, this transaction uses an exchange rate. If money converts from currency A to currency B, then the `amount` in currency A, multiplied by the `exchange_rate`, equals the `amount` in currency B. For example, if you charge a customer 10.00 EUR, the PaymentIntent's `amount` is `1000` and `currency` is `eur`. If this converts to 12.34 USD in your Stripe account, the BalanceTransaction's `amount` is `1234`, its `currency` is `usd`, and the `exchange_rate` is `1.234`.",
            }).check(
              Schema.isFinite().annotate({ expected: "a finite number" }),
            ),
            Schema.Null,
          ]),
        ),
        fee: Schema.Number.annotate({
          description:
            "Fees (in cents (or local equivalent)) paid for this transaction. Represented as a positive integer when assessed.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        fee_details: Schema.Array(Stripefee).annotate({
          description:
            "Detailed breakdown of fees (in cents (or local equivalent)) paid for this transaction.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        net: Schema.Number.annotate({
          description:
            "Net impact to a Stripe balance (in cents (or local equivalent)). A positive value represents incrementing a Stripe balance, and a negative value decrementing a Stripe balance. You can calculate the net impact of a transaction on a balance by `amount` - `fee`",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        object: Schema.Literal("balance_transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        reporting_category: Schema.String.annotate({
          description:
            "Learn more about how [reporting categories](https://stripe.com/docs/reports/reporting-categories) can help you understand balance transactions from an accounting perspective.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        source: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeapplication_fee> =>
                  Stripeapplication_fee,
              ),
              Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
              Stripeconnect_collection_transfer,
              Schema.suspend(
                (): Schema.Codec<Stripecustomer_cash_balance_transaction> =>
                  Stripecustomer_cash_balance_transaction,
              ),
              Schema.suspend((): Schema.Codec<Stripedispute> => Stripedispute),
              Schema.suspend(
                (): Schema.Codec<Stripefee_refund> => Stripefee_refund,
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_authorization> =>
                  Stripeissuing_authorization,
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_dispute> =>
                  Stripeissuing_dispute,
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeissuing_transaction> =>
                  Stripeissuing_transaction,
              ),
              Schema.suspend((): Schema.Codec<Stripepayout> => Stripepayout),
              Schema.suspend((): Schema.Codec<Striperefund> => Striperefund),
              Stripereserve_transaction,
              Stripetax_deducted_at_source,
              Schema.suspend((): Schema.Codec<Stripetopup> => Stripetopup),
              Schema.suspend(
                (): Schema.Codec<Stripetransfer> => Stripetransfer,
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetransfer_reversal> =>
                  Stripetransfer_reversal,
              ),
            ]).annotate({
              description: "This transaction relates to the Stripe object.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.String.annotate({
          description:
            "The transaction's net funds status in the Stripe balance, which are either `available` or `pending`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        type: Schema.Literals([
          "adjustment",
          "advance",
          "advance_funding",
          "anticipation_repayment",
          "application_fee",
          "application_fee_refund",
          "charge",
          "climate_order_purchase",
          "climate_order_refund",
          "connect_collection_transfer",
          "contribution",
          "fee_credit_funding",
          "inbound_transfer",
          "inbound_transfer_reversal",
          "issuing_authorization_hold",
          "issuing_authorization_release",
          "issuing_dispute",
          "issuing_dispute_provisional_credit",
          "issuing_dispute_provisional_credit_reversal",
          "issuing_transaction",
          "obligation_outbound",
          "obligation_reversal_inbound",
          "payment",
          "payment_failure_refund",
          "payment_network_reserve_hold",
          "payment_network_reserve_release",
          "payment_refund",
          "payment_reversal",
          "payment_unreconciled",
          "payout",
          "payout_cancel",
          "payout_failure",
          "payout_minimum_balance_hold",
          "payout_minimum_balance_release",
          "refund",
          "refund_failure",
          "reserve_hold",
          "reserve_release",
          "reserve_transaction",
          "reserved_funds",
          "stripe_balance_payment_debit",
          "stripe_balance_payment_debit_reversal",
          "stripe_fee",
          "stripe_fx_fee",
          "tax_fee",
          "tax_fund",
          "topup",
          "topup_reversal",
          "transfer",
          "transfer_cancel",
          "transfer_failure",
          "transfer_refund",
        ]).annotate({
          description:
            "Transaction type: `tax_fund`, `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `inbound_transfer`, `inbound_transfer_reversal`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_dispute_provisional_credit`, `issuing_dispute_provisional_credit_reversal`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, `transfer_refund`, or `fee_credit_funding`. Learn more about [balance transaction types and what they represent](https://stripe.com/docs/reports/balance-transaction-types). To classify transactions for accounting purposes, consider `reporting_category` instead.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Balance Transaction",
      description:
        "Balance transactions represent funds moving through your Stripe account.\nStripe creates them for every type of transaction that enters or leaves your Stripe account balance.\n\nRelated guide: [Balance transaction types](https://docs.stripe.com/reports/balance-transaction-types)",
      identifier: "Stripebalance_transaction",
    }),
);
export const Stripepayout = Schema.suspend(
  (): Schema.Codec<Stripepayout> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The amount (in cents (or local equivalent)) that transfers to your bank account or debit card.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        application_fee: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripeapplication_fee> =>
                  Stripeapplication_fee,
              ),
            ]).annotate({
              description:
                "The application fee (if any) for the payout. [See the Connect documentation](https://docs.stripe.com/connect/instant-payouts#monetization-and-fees) for details.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount of the application fee (if any) requested for the payout. [See the Connect documentation](https://docs.stripe.com/connect/instant-payouts#monetization-and-fees) for details.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        arrival_date: Schema.Number.annotate({
          description:
            "Date that you can expect the payout to arrive in the bank. This factors in delays to account for weekends or bank holidays.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        automatic: Schema.Boolean.annotate({
          description:
            "Returns `true` if the payout is created by an [automated payout schedule](https://docs.stripe.com/payouts#payout-schedule) and `false` if it's [requested manually](https://stripe.com/docs/payouts#manual-payouts).",
        }),
        balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ]).annotate({
              description:
                "ID of the balance transaction that describes the impact of this payout on your account balance.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An arbitrary string attached to the object. Often useful for displaying to users.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        destination: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebank_account> => Stripebank_account,
              ),
              Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
              Stripedeleted_bank_account,
              Stripedeleted_card,
            ]).annotate({
              description:
                "ID of the bank account or card the payout is sent to.",
            }),
            Schema.Null,
          ]),
        ),
        failure_balance_transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripebalance_transaction> =>
                  Stripebalance_transaction,
              ),
            ]).annotate({
              description:
                "If the payout fails or cancels, this is the ID of the balance transaction that reverses the initial balance transaction and returns the funds from the failed payout back in your balance.",
            }),
            Schema.Null,
          ]),
        ),
        failure_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Error code that provides a reason for a payout failure, if available.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        failure_message: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Message that provides the reason for a payout failure, if available.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        metadata: Schema.optionalKey(
          Schema.Union([
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.isMaxCodePoints(500).annotate({
                  expected: "a string with at most 500 code points",
                }),
              ),
            ).annotate({
              description:
                "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
            }),
            Schema.Null,
          ]),
        ),
        method: Schema.String.annotate({
          description:
            "The method used to send this payout, which can be `standard` or `instant`. `instant` is supported for payouts to debit cards and bank accounts in certain countries. Learn more about [bank support for Instant Payouts](https://stripe.com/docs/payouts/instant-payouts-banks).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        object: Schema.Literal("payout").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        original_payout: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripepayout> => Stripepayout),
            ]).annotate({
              description:
                "If the payout reverses another, this is the ID of the original payout.",
            }),
            Schema.Null,
          ]),
        ),
        payout_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "ID of the v2 FinancialAccount the funds are sent to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        reconciliation_status: Schema.Literals([
          "completed",
          "in_progress",
          "not_applicable",
        ]).annotate({
          description:
            "If `completed`, you can use the [Balance Transactions API](https://docs.stripe.com/api/balance_transactions/list#balance_transaction_list-payout) to list all balance transactions that are paid out in this payout.",
        }),
        reversed_by: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripepayout> => Stripepayout),
            ]).annotate({
              description:
                "If the payout reverses, this is the ID of the payout that reverses this payout.",
            }),
            Schema.Null,
          ]),
        ),
        source_type: Schema.String.annotate({
          description:
            "The source balance this payout came from, which can be one of the following: `card`, `fpx`, or `bank_account`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Extra information about a payout that displays on the user's bank statement.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.String.annotate({
          description:
            "Current status of the payout: `paid`, `pending`, `in_transit`, `canceled` or `failed`. A payout is `pending` until it's submitted to the bank, when it becomes `in_transit`. The status changes to `paid` if the transaction succeeds, or to `failed` or `canceled` (within 5 business days). Some payouts that fail might initially show as `paid`, then change to `failed`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        trace_id: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripepayouts_trace_id]).annotate({
              description:
                'A value that generates from the beneficiary\'s bank that allows users to track payouts with their bank. Banks might call this a "reference number" or something similar.',
            }),
            Schema.Null,
          ]),
        ),
        type: Schema.Literals(["bank_account", "card"]).annotate({
          description: "Can be `bank_account` or `card`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Payout",
      description:
        "A `Payout` object is created when you receive funds from Stripe, or when you\ninitiate a payout to either a bank account or debit card of a [connected\nStripe account](/docs/connect/bank-debit-card-payouts). You can retrieve individual payouts,\nand list all payouts. Payouts are made on [varying\nschedules](/docs/connect/manage-payout-schedule), depending on your country and\nindustry.\n\nRelated guide: [Receiving payouts](https://docs.stripe.com/payouts)",
      identifier: "Stripepayout",
    }),
);
export const Stripepayouts_trace_id = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String.annotate({
      description:
        "Possible values are `pending`, `supported`, and `unsupported`. When `payout.status` is `pending` or `in_transit`, this will be `pending`. When the payout transitions to `paid`, `failed`, or `canceled`, this status will become `supported` or `unsupported` shortly after in most cases. In some cases, this may appear as `pending` for up to 10 days after `arrival_date` until transitioning to `supported` or `unsupported`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    value: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The trace ID value if `trace_id.status` is `supported`, otherwise `nil`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
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
  title: "PayoutsTraceID",
  description: "",
  identifier: "Stripepayouts_trace_id",
});
export const Stripetransfer_schedule = Schema.StructWithRest(
  Schema.Struct({
    delay_days: Schema.Number.annotate({
      description:
        "The number of days charges for the account will be held before being paid out.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
    interval: Schema.String.annotate({
      description:
        "How frequently funds will be paid out. One of `manual` (payouts only created via API call), `daily`, `weekly`, or `monthly`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    monthly_anchor: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The day of the month funds will be paid out. Only shown if `interval` is monthly. Payouts scheduled between the 29th and 31st of the month are sent on the last day of shorter months.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    monthly_payout_days: Schema.optionalKey(
      Schema.Array(Schema.Int).annotate({
        description:
          "The days of the month funds will be paid out. Only shown if `interval` is monthly. Payouts scheduled between the 29th and 31st of the month are sent on the last day of shorter months.",
      }),
    ),
    weekly_anchor: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The day of the week funds will be paid out, of the style 'monday', 'tuesday', etc. Only shown if `interval` is weekly.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    weekly_payout_days: Schema.optionalKey(
      Schema.Array(
        Schema.Literals([
          "friday",
          "monday",
          "thursday",
          "tuesday",
          "wednesday",
        ]),
      ).annotate({
        description:
          "The days of the week when available funds are paid out, specified as an array, for example, [`monday`, `tuesday`]. Only shown if `interval` is weekly.",
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
  title: "TransferSchedule",
  description: "",
  identifier: "Stripetransfer_schedule",
});
export const Stripetransfer_data = Schema.suspend(
  (): Schema.Codec<Stripetransfer_data> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The amount transferred to the destination account. This transfer will occur automatically after the payment succeeds. If no amount is specified, by default the entire payment amount is transferred to the destination account.\n The amount must be less than or equal to the [amount](https://docs.stripe.com/api/payment_intents/object#payment_intent_object-amount), and must be a positive integer\n representing how much to transfer in the smallest currency unit (e.g., 100 cents to charge $1.00).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        description: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "An arbitrary string attached to the transfer. Often useful for displaying to users.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        destination: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
        ]).annotate({
          description:
            "The account (if any) that the payment is attributed to for tax reporting, and where funds from the payment are transferred to after payment success.",
        }),
        metadata: Schema.optionalKey(
          Schema.Record(
            Schema.String,
            Schema.String.check(
              Schema.isMaxCodePoints(500).annotate({
                expected: "a string with at most 500 code points",
              }),
            ),
          ).annotate({
            description:
              "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.",
          }),
        ),
        payment_data: Schema.optionalKey(Stripepayment_data),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "transfer_data",
      description: "",
      identifier: "Stripetransfer_data",
    }),
);
