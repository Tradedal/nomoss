// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripetax_id } from "./catalog.js";
import { Striperefund } from "./charges.js";
import {
  Stripeaddress,
  Stripecash_balance,
  Stripecheckout_session,
  Stripecredit_note,
  Stripediscount,
  Stripeoffline_acceptance,
  Stripeonline_acceptance,
  Stripeshipping,
  Stripetest_helpers_test_clock,
} from "./common.js";
import {
  Stripeinvoice,
  Stripeinvoice_setting_customer_setting,
} from "./invoices.js";
import { Stripepayment_intent } from "./paymentIntents.js";
import { Stripebank_account, Stripecard } from "./paymentSources.js";
import { Stripesource } from "./sources.js";
import { Stripesubscription } from "./subscriptions.js";
import { Stripebalance_transaction } from "./transfers.js";

export type Stripecustomer = {
  readonly address?: Stripeaddress | null | null;
  readonly balance?: number;
  readonly business_name?: string;
  readonly cash_balance?: Stripecash_balance | null | null;
  readonly created: number;
  readonly currency?: string | null;
  readonly customer_account?: string | null;
  readonly default_source?:
    | string
    | Stripebank_account
    | Stripecard
    | Stripesource
    | null
    | null;
  readonly delinquent?: boolean | null;
  readonly description?: string | null;
  readonly discount?: Stripediscount | null | null;
  readonly email?: string | null;
  readonly id: string;
  readonly individual_name?: string;
  readonly invoice_credit_balance?: { readonly [x: string]: number };
  readonly invoice_prefix?: string | null;
  readonly invoice_settings?: Stripeinvoice_setting_customer_setting;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string };
  readonly name?: string | null;
  readonly next_invoice_sequence?: number;
  readonly object: "customer";
  readonly phone?: string | null;
  readonly preferred_locales?: ReadonlyArray<string> | null;
  readonly shipping?: Stripeshipping | null | null;
  readonly sources?: {
    readonly data: ReadonlyArray<
      Stripebank_account | Stripecard | Stripesource
    >;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly subscriptions?: {
    readonly data: ReadonlyArray<Stripesubscription>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly tax?: Stripecustomer_tax;
  readonly tax_exempt?: "exempt" | "none" | "reverse" | null;
  readonly tax_ids?: {
    readonly data: ReadonlyArray<Stripetax_id>;
    readonly has_more: boolean;
    readonly object: "list";
    readonly url: string;
  } & { readonly [x: string]: Schema.Json };
  readonly test_clock?: string | Stripetest_helpers_test_clock | null | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_cash_balance_transaction = {
  readonly adjusted_for_overdraft?: Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft;
  readonly applied_to_payment?: Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction;
  readonly created: number;
  readonly currency: string;
  readonly customer: string | Stripecustomer;
  readonly customer_account?: string | null;
  readonly ending_balance: number;
  readonly funded?: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction;
  readonly id: string;
  readonly livemode: boolean;
  readonly net_amount: number;
  readonly object: "customer_cash_balance_transaction";
  readonly refunded_from_payment?: Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction;
  readonly transferred_to_balance?: Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance;
  readonly type:
    | "adjusted_for_overdraft"
    | "applied_to_payment"
    | "funded"
    | "funding_reversed"
    | "refunded_from_payment"
    | "return_canceled"
    | "return_initiated"
    | "transferred_to_balance"
    | "unapplied_from_payment";
  readonly unapplied_from_payment?: Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction;
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction =
  { readonly payment_intent: string | Stripepayment_intent } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance =
  { readonly balance_transaction: string | Stripebalance_transaction } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction =
  { readonly refund: string | Striperefund } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction =
  { readonly payment_intent: string | Stripepayment_intent } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft =
  {
    readonly balance_transaction: string | Stripebalance_transaction;
    readonly linked_transaction:
      | string
      | Stripecustomer_cash_balance_transaction;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_transaction = {
  readonly amount: number;
  readonly checkout_session?: string | Stripecheckout_session | null;
  readonly created: number;
  readonly credit_note?: string | Stripecredit_note | null;
  readonly currency: string;
  readonly customer: string | Stripecustomer;
  readonly customer_account?: string | null;
  readonly description?: string | null;
  readonly ending_balance: number;
  readonly id: string;
  readonly invoice?: string | Stripeinvoice | null;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly object: "customer_balance_transaction";
  readonly type:
    | "adjustment"
    | "applied_to_invoice"
    | "checkout_session_subscription_payment"
    | "checkout_session_subscription_payment_canceled"
    | "credit_note"
    | "initial"
    | "invoice_overpaid"
    | "invoice_too_large"
    | "invoice_too_small"
    | "migration"
    | "unapplied_from_invoice"
    | "unspent_receiver_credit";
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_customer_balance_settings = {
  readonly reconciliation_mode: "automatic" | "manual";
  readonly using_merchant_default: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripedeleted_customer = {
  readonly deleted: true;
  readonly id: string;
  readonly object: "customer";
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer =
  {
    readonly bic?: string | null;
    readonly iban_last4?: string | null;
    readonly sender_name?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer =
  {
    readonly account_number_last4?: string | null;
    readonly sender_name?: string | null;
    readonly sort_code?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer =
  {
    readonly sender_bank?: string | null;
    readonly sender_branch?: string | null;
    readonly sender_name?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer =
  {
    readonly network?: "ach" | "domestic_wire_us" | "fednow" | "rtp" | "swift";
    readonly sender_name?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_tax_location = {
  readonly country: string;
  readonly source:
    | "billing_address"
    | "ip_address"
    | "payment_method"
    | "shipping_destination";
  readonly state?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_acceptance = {
  readonly accepted_at?: number | null;
  readonly offline?: Stripeoffline_acceptance;
  readonly online?: Stripeonline_acceptance;
  readonly type: "offline" | "online";
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer =
  {
    readonly eu_bank_transfer?: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer;
    readonly gb_bank_transfer?: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer;
    readonly jp_bank_transfer?: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer;
    readonly reference?: string | null;
    readonly type:
      | "eu_bank_transfer"
      | "gb_bank_transfer"
      | "jp_bank_transfer"
      | "mx_bank_transfer"
      | "us_bank_transfer";
    readonly us_bank_transfer?: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer;
  } & { readonly [x: string]: Schema.Json };
export type Stripecustomer_tax = {
  readonly automatic_tax:
    | "failed"
    | "not_collecting"
    | "supported"
    | "unrecognized_location";
  readonly ip_address?: string | null;
  readonly location?: Stripecustomer_tax_location | null;
  readonly provider: "anrok" | "avalara" | "sphere" | "stripe";
} & { readonly [x: string]: Schema.Json };
export type Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction =
  {
    readonly bank_transfer: Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer;
  } & { readonly [x: string]: Schema.Json };

export const Stripecustomer = Schema.suspend(
  (): Schema.Codec<Stripecustomer> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeaddress, Schema.Null]).annotate({
              description: "The customer's billing address.",
            }),
            Schema.Null,
          ]),
        ),
        balance: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The current balance, if any, that's stored on the customer in their default currency. If negative, the customer has credit to apply to their next invoice. If positive, the customer has an amount owed that's added to their next invoice. The balance only considers amounts that Stripe hasn't successfully applied to any invoice. It doesn't reflect unpaid invoices. This balance is only taken into account after invoices finalize. For multi-currency balances, see [invoice_credit_balance](https://docs.stripe.com/api/customers/object#customer_object-invoice_credit_balance).",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        business_name: Schema.optionalKey(
          Schema.String.annotate({
            description: "The customer's business name.",
          }).check(
            Schema.isMaxCodePoints(150).annotate({
              expected: "a string with at most 150 code points",
            }),
          ),
        ),
        cash_balance: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecash_balance, Schema.Null]).annotate({
              description:
                'The current funds being held by Stripe on behalf of the customer. You can apply these funds towards payment intents when the source is "cash_balance". The `settings[reconciliation_mode]` field describes if these funds apply to these payment intents manually or automatically.',
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Three-letter [ISO code for the currency](https://stripe.com/docs/currencies) the customer can be charged in for recurring billing purposes.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of an Account representing a customer. You can use this ID with any v1 API that accepts a customer_account parameter.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        default_source: Schema.optionalKey(
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
              Stripesource,
              Schema.Null,
            ]).annotate({
              description:
                "ID of the default payment source for the customer.\n\nIf you use payment methods created through the PaymentMethods API, see the [invoice_settings.default_payment_method](https://docs.stripe.com/api/customers/object#customer_object-invoice_settings-default_payment_method) field instead.",
            }),
            Schema.Null,
          ]),
        ),
        delinquent: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Tracks the most recent state change on any invoice belonging to the customer. Paying an invoice or marking it uncollectible via the API will set this field to false. An automatic payment failure or passing the `invoice.due_date` will set this field to `true`.\n\nIf an invoice becomes uncollectible by [dunning](https://docs.stripe.com/billing/automatic-collection), `delinquent` doesn't reset to `false`.\n\nIf you care whether the customer has paid their most recent subscription invoice, use `subscription.status` instead. Paying or marking uncollectible any customer invoice regardless of whether it is the latest invoice for a subscription will always set this field to `false`.",
            }),
            Schema.Null,
          ]),
        ),
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
        discount: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripediscount> => Stripediscount,
              ),
              Schema.Null,
            ]).annotate({
              description:
                "Describes the current discount active on the customer, if there is one.",
            }),
            Schema.Null,
          ]),
        ),
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The customer's email address.",
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
        individual_name: Schema.optionalKey(
          Schema.String.annotate({
            description: "The customer's individual name.",
          }).check(
            Schema.isMaxCodePoints(150).annotate({
              expected: "a string with at most 150 code points",
            }),
          ),
        ),
        invoice_credit_balance: Schema.optionalKey(
          Schema.Record(Schema.String, Schema.Int).annotate({
            description:
              "The current multi-currency balances, if any, that's stored on the customer. If positive in a currency, the customer has a credit to apply to their next invoice denominated in that currency. If negative, the customer has an amount owed that's added to their next invoice denominated in that currency. These balances don't apply to unpaid invoices. They solely track amounts that Stripe hasn't successfully applied to any invoice. Stripe only applies a balance in a specific currency to an invoice after that invoice (which is in the same currency) finalizes.",
          }),
        ),
        invoice_prefix: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The prefix for the customer used to generate unique invoice numbers.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        invoice_settings: Schema.optionalKey(
          Stripeinvoice_setting_customer_setting,
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
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
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The customer's full name or business name.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        next_invoice_sequence: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "The suffix of the customer's next invoice number (for example, 0001). When the account uses account level sequencing, this parameter is ignored in API requests and the field omitted in API responses.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        object: Schema.Literal("customer").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        phone: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The customer's phone number.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        preferred_locales: Schema.optionalKey(
          Schema.Union([
            Schema.Array(
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
            ).annotate({
              description:
                "The customer's preferred locales (languages), ordered by preference.",
            }),
            Schema.Null,
          ]),
        ),
        shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping, Schema.Null]).annotate({
              description:
                "Mailing and shipping address for the customer. Appears on invoices emailed to this customer.",
            }),
            Schema.Null,
          ]),
        ),
        sources: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Schema.Union([
                  Schema.suspend(
                    (): Schema.Codec<Stripebank_account> => Stripebank_account,
                  ),
                  Schema.suspend((): Schema.Codec<Stripecard> => Stripecard),
                  Stripesource,
                ]).annotate({ title: "Polymorphic" }),
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
            title: "ApmsSourcesSourceList",
            description: "The customer's payment sources, if any.",
          }),
        ),
        subscriptions: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Schema.suspend(
                  (): Schema.Codec<Stripesubscription> => Stripesubscription,
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
            title: "SubscriptionList",
            description: "The customer's current subscriptions, if any.",
          }),
        ),
        tax: Schema.optionalKey(Stripecustomer_tax),
        tax_exempt: Schema.optionalKey(
          Schema.Union([
            Schema.Literals(["exempt", "none", "reverse"]).annotate({
              description:
                'Describes the customer\'s tax exemption status, which is `none`, `exempt`, or `reverse`. When set to `reverse`, invoice and receipt PDFs include the following text: **"Reverse charge"**.',
            }),
            Schema.Null,
          ]),
        ),
        tax_ids: Schema.optionalKey(
          Schema.StructWithRest(
            Schema.Struct({
              data: Schema.Array(
                Schema.suspend((): Schema.Codec<Stripetax_id> => Stripetax_id),
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
            title: "TaxIDsList",
            description: "The customer's tax IDs.",
          }),
        ),
        test_clock: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripetest_helpers_test_clock,
              Schema.Null,
            ]).annotate({
              description:
                "ID of the test clock that this customer belongs to.",
            }),
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
      title: "Customer",
      description:
        "This object represents a customer of your business. Use it to [create recurring charges](https://docs.stripe.com/invoicing/customer), [save payment](https://docs.stripe.com/payments/save-during-payment) and contact information,\nand track payments that belong to the same customer.",
      identifier: "Stripecustomer",
    }),
);
export const Stripecustomer_cash_balance_transaction = Schema.suspend(
  (): Schema.Codec<Stripecustomer_cash_balance_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        adjusted_for_overdraft: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft> =>
              Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft,
          ),
        ),
        applied_to_payment: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction> =>
              Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction,
          ),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
        ]).annotate({
          description:
            "The customer whose available cash balance changed as a result of this transaction.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of an Account representing a customer whose available cash balance changed as a result of this transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        ending_balance: Schema.Number.annotate({
          description:
            "The total available cash balance for the specified currency after this transaction was applied. Represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        funded: Schema.optionalKey(
          Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction,
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
        net_amount: Schema.Number.annotate({
          description:
            "The amount by which the cash balance changed, represented in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal). A positive value represents funds being added to the cash balance, a negative value represents funds being removed from the cash balance.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        object: Schema.Literal("customer_cash_balance_transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        refunded_from_payment: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction> =>
              Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction,
          ),
        ),
        transferred_to_balance: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance> =>
              Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance,
          ),
        ),
        type: Schema.Literals([
          "adjusted_for_overdraft",
          "applied_to_payment",
          "funded",
          "funding_reversed",
          "refunded_from_payment",
          "return_canceled",
          "return_initiated",
          "transferred_to_balance",
          "unapplied_from_payment",
        ]).annotate({
          description:
            "The type of the cash balance transaction. New types may be added in future. See [Customer Balance](https://docs.stripe.com/payments/customer-balance#types) to learn more about these types.",
        }),
        unapplied_from_payment: Schema.optionalKey(
          Schema.suspend(
            (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction> =>
              Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction,
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
      title: "Cash Balance Transaction",
      description:
        "Customers with certain payments enabled have a cash balance, representing funds that were paid\nby the customer to a merchant, but have not yet been allocated to a payment. Cash Balance Transactions\nrepresent when funds are moved into or out of this balance. This includes funding by the customer, allocation\nto payments, and refunds to the customer.",
      identifier: "Stripecustomer_cash_balance_transaction",
    }),
);
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction =
  Schema.StructWithRest(
    Schema.Struct({
      payment_intent: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
        ),
      ]).annotate({
        description:
          "The [Payment Intent](https://docs.stripe.com/api/payment_intents/object) that funds were unapplied from.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceUnappliedFromPaymentTransaction",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_unapplied_from_payment_transaction",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance =
  Schema.StructWithRest(
    Schema.Struct({
      balance_transaction: Schema.Union([
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
          "The [Balance Transaction](https://docs.stripe.com/api/balance_transactions/object) that corresponds to funds transferred to your Stripe balance.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceTransferredToBalance",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_transferred_to_balance",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction =
  Schema.StructWithRest(
    Schema.Struct({
      refund: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend((): Schema.Codec<Striperefund> => Striperefund),
      ]).annotate({
        description:
          "The [Refund](https://docs.stripe.com/api/refunds/object) that moved these funds into the customer's cash balance.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceRefundedFromPaymentTransaction",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_refunded_from_payment_transaction",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction =
  Schema.StructWithRest(
    Schema.Struct({
      payment_intent: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
        ),
      ]).annotate({
        description:
          "The [Payment Intent](https://docs.stripe.com/api/payment_intents/object) that funds were applied to.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceAppliedToPaymentTransaction",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_applied_to_payment_transaction",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft =
  Schema.StructWithRest(
    Schema.Struct({
      balance_transaction: Schema.Union([
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
          "The [Balance Transaction](https://docs.stripe.com/api/balance_transactions/object) that corresponds to funds taken out of your Stripe balance.",
      }),
      linked_transaction: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripecustomer_cash_balance_transaction> =>
            Stripecustomer_cash_balance_transaction,
        ),
      ]).annotate({
        description:
          "The [Cash Balance Transaction](https://docs.stripe.com/api/cash_balance_transactions/object) that brought the customer balance negative, triggering the clawback of funds.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceAdjustedForOverdraft",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_adjusted_for_overdraft",
  });
export const Stripecustomer_balance_transaction = Schema.suspend(
  (): Schema.Codec<Stripecustomer_balance_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "The amount of the transaction. A negative value is a credit for the customer's balance, and a positive value is a debit to the customer's `balance`.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        checkout_session: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripecheckout_session,
            ]).annotate({
              description:
                "The ID of the checkout session (if any) that created the transaction.",
            }),
            Schema.Null,
          ]),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        credit_note: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecredit_note> => Stripecredit_note,
              ),
            ]).annotate({
              description:
                "The ID of the credit note (if any) related to the transaction.",
            }),
            Schema.Null,
          ]),
        ),
        currency: Schema.String.annotate({
          description:
            "Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
          format: "currency",
        }),
        customer: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecustomer> => Stripecustomer),
        ]).annotate({
          description: "The ID of the customer the transaction belongs to.",
        }),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The ID of an Account representing a customer that the transaction belongs to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
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
        ending_balance: Schema.Number.annotate({
          description:
            "The customer's `balance` after the transaction was applied. A negative value decreases the amount due on the customer's next invoice. A positive value increases the amount due on the customer's next invoice.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        invoice: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeinvoice> => Stripeinvoice),
            ]).annotate({
              description:
                "The ID of the invoice (if any) related to the transaction.",
            }),
            Schema.Null,
          ]),
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
        object: Schema.Literal("customer_balance_transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        type: Schema.Literals([
          "adjustment",
          "applied_to_invoice",
          "checkout_session_subscription_payment",
          "checkout_session_subscription_payment_canceled",
          "credit_note",
          "initial",
          "invoice_overpaid",
          "invoice_too_large",
          "invoice_too_small",
          "migration",
          "unapplied_from_invoice",
          "unspent_receiver_credit",
        ]).annotate({
          description:
            "Transaction type: `adjustment`, `applied_to_invoice`, `credit_note`, `initial`, `invoice_overpaid`, `invoice_too_large`, `invoice_too_small`, `unspent_receiver_credit`, `unapplied_from_invoice`, `checkout_session_subscription_payment`, or `checkout_session_subscription_payment_canceled`. See the [Customer Balance page](https://docs.stripe.com/billing/customer/balance#types) to learn more about transaction types.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Customer Balance Transaction",
      description:
        "Each customer has a [Balance](https://docs.stripe.com/api/customers/object#customer_object-balance) value,\nwhich denotes a debit or credit that's automatically applied to their next invoice upon finalization.\nYou may modify the value directly by using the [update customer API](https://docs.stripe.com/api/customers/update),\nor by creating a Customer Balance Transaction, which increments or decrements the customer's `balance` by the specified `amount`.\n\nRelated guide: [Customer balance](https://docs.stripe.com/billing/customer/balance)",
      identifier: "Stripecustomer_balance_transaction",
    }),
);
export const Stripecustomer_balance_customer_balance_settings =
  Schema.StructWithRest(
    Schema.Struct({
      reconciliation_mode: Schema.Literals(["automatic", "manual"]).annotate({
        description:
          "The configuration for how funds that land in the customer cash balance are reconciled.",
      }),
      using_merchant_default: Schema.Boolean.annotate({
        description:
          "A flag to indicate if reconciliation mode returned is the user's default or is specific to this customer cash balance",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "CustomerBalanceCustomerBalanceSettings",
    description: "",
    identifier: "Stripecustomer_balance_customer_balance_settings",
  });
export const Stripedeleted_customer = Schema.StructWithRest(
  Schema.Struct({
    deleted: Schema.Literal(true).annotate({
      description: "Always true for a deleted object",
    }),
    id: Schema.String.annotate({
      description: "Unique identifier for the object.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    object: Schema.Literal("customer").annotate({
      description:
        "String representing the object's type. Objects of the same type share the same value.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "DeletedCustomer",
  description: "",
  identifier: "Stripedeleted_customer",
});
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      bic: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The BIC of the bank of the sender of the funding.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      iban_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The last 4 digits of the IBAN of the sender of the funding.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sender_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The full name of the sender, as supplied by the sending bank.",
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
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceEuBankTransfer",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      account_number_last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The last 4 digits of the account number of the sender of the funding.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sender_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The full name of the sender, as supplied by the sending bank.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sort_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The sort code of the bank of the sender of the funding",
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
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceGbBankTransfer",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      sender_bank: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The name of the bank of the sender of the funding.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sender_branch: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The name of the bank branch of the sender of the funding.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      sender_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The full name of the sender, as supplied by the sending bank.",
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
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceJpBankTransfer",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer",
  });
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      network: Schema.optionalKey(
        Schema.Literals([
          "ach",
          "domestic_wire_us",
          "fednow",
          "rtp",
          "swift",
        ]).annotate({
          description: "The banking network used for this funding.",
        }),
      ),
      sender_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The full name of the sender, as supplied by the sending bank.",
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
    title:
      "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransferResourceUsBankTransfer",
    description: "",
    identifier:
      "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer",
  });
export const Stripecustomer_tax_location = Schema.StructWithRest(
  Schema.Struct({
    country: Schema.String.annotate({
      description: "The identified tax country of the customer.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    source: Schema.Literals([
      "billing_address",
      "ip_address",
      "payment_method",
      "shipping_destination",
    ]).annotate({
      description: "The data source used to infer the customer's location.",
    }),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The identified tax state, county, province, or region of the customer.",
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
  title: "CustomerTaxLocation",
  description: "",
  identifier: "Stripecustomer_tax_location",
});
export const Stripecustomer_acceptance = Schema.suspend(
  (): Schema.Codec<Stripecustomer_acceptance> =>
    Schema.StructWithRest(
      Schema.Struct({
        accepted_at: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description: "The time that the customer accepts the mandate.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        offline: Schema.optionalKey(Stripeoffline_acceptance),
        online: Schema.optionalKey(Stripeonline_acceptance),
        type: Schema.Literals(["offline", "online"]).annotate({
          description:
            "The mandate includes the type of customer acceptance information, such as: `online` or `offline`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "customer_acceptance",
      description: "",
      identifier: "Stripecustomer_acceptance",
    }),
);
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer =
  Schema.suspend(
    (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer> =>
      Schema.StructWithRest(
        Schema.Struct({
          eu_bank_transfer: Schema.optionalKey(
            Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_eu_bank_transfer,
          ),
          gb_bank_transfer: Schema.optionalKey(
            Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_gb_bank_transfer,
          ),
          jp_bank_transfer: Schema.optionalKey(
            Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_jp_bank_transfer,
          ),
          reference: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The user-supplied reference field on the bank transfer.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          type: Schema.Literals([
            "eu_bank_transfer",
            "gb_bank_transfer",
            "jp_bank_transfer",
            "mx_bank_transfer",
            "us_bank_transfer",
          ]).annotate({
            description:
              "The funding method type used to fund the customer balance. Permitted values include: `eu_bank_transfer`, `gb_bank_transfer`, `jp_bank_transfer`, `mx_bank_transfer`, or `us_bank_transfer`.",
          }),
          us_bank_transfer: Schema.optionalKey(
            Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer_resource_us_bank_transfer,
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
          "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransactionResourceBankTransfer",
        description: "",
        identifier:
          "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer",
      }),
  );
export const Stripecustomer_tax = Schema.suspend(
  (): Schema.Codec<Stripecustomer_tax> =>
    Schema.StructWithRest(
      Schema.Struct({
        automatic_tax: Schema.Literals([
          "failed",
          "not_collecting",
          "supported",
          "unrecognized_location",
        ]).annotate({
          description:
            "Surfaces if automatic tax computation is possible given the current customer location information.",
        }),
        ip_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A recent IP address of the customer used for tax reporting and tax location inference.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        location: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecustomer_tax_location]).annotate({
              description: "The identified tax location of the customer.",
            }),
            Schema.Null,
          ]),
        ),
        provider: Schema.Literals([
          "anrok",
          "avalara",
          "sphere",
          "stripe",
        ]).annotate({
          description:
            "The tax calculation provider used for location resolution. Defaults to `stripe` when not using a [third-party provider](/tax/third-party-apps).",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "CustomerTax",
      description: "",
      identifier: "Stripecustomer_tax",
    }),
);
export const Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction =
  Schema.suspend(
    (): Schema.Codec<Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction> =>
      Schema.StructWithRest(
        Schema.Struct({
          bank_transfer:
            Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction_resource_bank_transfer,
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title:
          "CustomerBalanceResourceCashBalanceTransactionResourceFundedTransaction",
        description: "",
        identifier:
          "Stripecustomer_balance_resource_cash_balance_transaction_resource_funded_transaction",
      }),
  );
