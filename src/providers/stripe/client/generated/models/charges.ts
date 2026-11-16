// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripeaccount } from "./accounts.js";
import { Stripebilling_details } from "./billing.js";
import {
  Stripeapplication,
  Stripeapplication_fee,
  Stripedestination_details_unimplemented,
  Stripeemail_sent,
  Stripefile,
  Striperadar_radar_options,
  Striperadar_rule,
  Stripereview,
  Stripeshipping,
} from "./common.js";
import { Stripecustomer, Stripedeleted_customer } from "./customers.js";
import { Stripepayment_intent } from "./paymentIntents.js";
import { Stripepayment_method_details } from "./paymentMethodDetails.js";
import { Stripepayment_method } from "./paymentMethods.js";
import { Stripepayment_flows_payment_intent_presentment_details } from "./payments.js";
import {
  Stripebalance_transaction,
  Stripetransfer,
  Stripetransfer_reversal,
} from "./transfers.js";

export type Stripecharge = {
  readonly amount: number;
  readonly amount_captured: number;
  readonly amount_refunded: number;
  readonly application?: string | Stripeapplication | null;
  readonly application_fee?: string | Stripeapplication_fee | null;
  readonly application_fee_amount?: number | null;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly billing_details: Stripebilling_details;
  readonly calculated_statement_descriptor?: string | null;
  readonly captured: boolean;
  readonly created: number;
  readonly currency: string;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly description?: string | null;
  readonly disputed: boolean;
  readonly failure_balance_transaction?:
    | string
    | Stripebalance_transaction
    | null;
  readonly failure_code?: string | null;
  readonly failure_message?: string | null;
  readonly fraud_details?: Stripecharge_fraud_details | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "charge";
  readonly on_behalf_of?: string | Stripeaccount | null;
  readonly outcome?: Stripecharge_outcome | null;
  readonly paid: boolean;
  readonly payment_intent?: string | Stripepayment_intent | null;
  readonly payment_method?: string | null;
  readonly payment_method_details?: Stripepayment_method_details | null;
  readonly presentment_details?: Stripepayment_flows_payment_intent_presentment_details;
  readonly radar_options?: Striperadar_radar_options;
  readonly receipt_email?: string | null;
  readonly receipt_number?: string | null;
  readonly receipt_url?: string | null;
  readonly refunded: boolean;
  readonly refunds?:
    | ({
        readonly data: ReadonlyArray<Striperefund>;
        readonly has_more: boolean;
        readonly object: "list";
        readonly url: string;
      } & { readonly [x: string]: Schema.Json })
    | null;
  readonly review?: string | Stripereview | null;
  readonly shipping?: Stripeshipping | null;
  readonly source_transfer?: string | Stripetransfer | null;
  readonly statement_descriptor?: string | null;
  readonly statement_descriptor_suffix?: string | null;
  readonly status: "failed" | "pending" | "succeeded";
  readonly transfer?: string | Stripetransfer;
  readonly transfer_data?: Stripecharge_transfer_data | null;
  readonly transfer_group?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund = {
  readonly amount: number;
  readonly balance_transaction?: string | Stripebalance_transaction | null;
  readonly charge?: string | Stripecharge | null;
  readonly created: number;
  readonly currency: string;
  readonly customer?: string | Stripecustomer | Stripedeleted_customer | null;
  readonly customer_account?: string | null;
  readonly description?: string;
  readonly destination_details?: Striperefund_destination_details;
  readonly failure_balance_transaction?: string | Stripebalance_transaction;
  readonly failure_reason?: string;
  readonly id: string;
  readonly instructions_email?: string;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly next_action?: Striperefund_next_action;
  readonly object: "refund";
  readonly payment_intent?: string | Stripepayment_intent | null;
  readonly payment_method?: string | Stripepayment_method | null;
  readonly pending_reason?:
    | "charge_pending"
    | "insufficient_funds"
    | "processing";
  readonly presentment_details?: Stripepayment_flows_payment_intent_presentment_details;
  readonly reason?:
    | "duplicate"
    | "expired_uncaptured_charge"
    | "fraudulent"
    | "requested_by_customer"
    | null;
  readonly receipt_number?: string | null;
  readonly source_transfer_reversal?: string | Stripetransfer_reversal | null;
  readonly status?: string | null;
  readonly transfer_reversal?: string | Stripetransfer_reversal | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute = {
  readonly amount: number;
  readonly balance_transactions: ReadonlyArray<Stripebalance_transaction>;
  readonly charge: string | Stripecharge;
  readonly created: number;
  readonly currency: string;
  readonly enhanced_eligibility_types: ReadonlyArray<
    "mastercard_compliance" | "visa_compelling_evidence_3" | "visa_compliance"
  >;
  readonly evidence: Stripedispute_evidence;
  readonly evidence_details: Stripedispute_evidence_details;
  readonly id: string;
  readonly intended_submission_method?:
    | "manual"
    | "prefer_manual"
    | "prefer_smart_disputes"
    | "smart_disputes"
    | null;
  readonly is_charge_refundable: boolean;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "dispute";
  readonly payment_intent?: string | Stripepayment_intent | null;
  readonly payment_method_details?: Stripedispute_payment_method_details;
  readonly reason: string;
  readonly status:
    | "appeal_needs_response"
    | "appeal_under_review"
    | "lost"
    | "needs_response"
    | "prevented"
    | "under_review"
    | "warning_closed"
    | "warning_needs_response"
    | "warning_under_review"
    | "won";
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_afterpay_clearpay = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_blik = {
  readonly network_decline_code?: string | null;
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_br_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_card = {
  readonly reference?: string;
  readonly reference_status?: string;
  readonly reference_type?: string;
  readonly type: "pending" | "refund" | "reversal";
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_crypto = {
  readonly reference?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_eu_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_gb_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_jp_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_klarna = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_mb_way = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_multibanco = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_mx_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_p24 = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_paypal = {
  readonly network_decline_code?: string | null;
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_swish = {
  readonly network_decline_code?: string | null;
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_th_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details_us_bank_transfer = {
  readonly reference?: string | null;
  readonly reference_status?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_appeal_card = {
  readonly reason_for_filing?: string;
  readonly supporting_files?: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_evidence_mastercard_compliance = {
  readonly fee_acknowledged: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_transaction_shipping_address = {
  readonly city?: string | null;
  readonly country?: string | null;
  readonly line1?: string | null;
  readonly line2?: string | null;
  readonly postal_code?: string | null;
  readonly state?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_evidence_visa_compliance = {
  readonly fee_acknowledged: boolean;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_eligibility_mastercard_compliance = {
  readonly status: "fee_acknowledged" | "requires_fee_acknowledgement";
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_eligibility_visa_compelling_evidence3 = {
  readonly required_actions: ReadonlyArray<
    | "missing_customer_identifiers"
    | "missing_disputed_transaction_description"
    | "missing_merchandise_or_services"
    | "missing_prior_undisputed_transaction_description"
    | "missing_prior_undisputed_transactions"
  >;
  readonly status: "not_qualified" | "qualified" | "requires_action";
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_eligibility_visa_compliance = {
  readonly status: "fee_acknowledged" | "requires_fee_acknowledgement";
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_payment_method_details_amazon_pay = {
  readonly dispute_type?: "chargeback" | "claim" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_payment_method_details_card = {
  readonly brand: string;
  readonly case_type:
    | "block"
    | "chargeback"
    | "compliance"
    | "inquiry"
    | "resolution";
  readonly network: string;
  readonly network_reason_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_payment_method_details_klarna = {
  readonly chargeback_loss_reason_code?: string;
  readonly reason_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_payment_method_details_paypal = {
  readonly case_id?: string | null;
  readonly reason_code?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripecharge_fraud_details = {
  readonly stripe_report?: string;
  readonly user_report?: string;
} & { readonly [x: string]: Schema.Json };
export type Stripecharge_transfer_data = {
  readonly amount?: number | null;
  readonly destination: string | Stripeaccount;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_destination_details = {
  readonly affirm?: Stripedestination_details_unimplemented;
  readonly afterpay_clearpay?: Striperefund_destination_details_afterpay_clearpay;
  readonly alipay?: Stripedestination_details_unimplemented;
  readonly alma?: Stripedestination_details_unimplemented;
  readonly amazon_pay?: Stripedestination_details_unimplemented;
  readonly au_bank_transfer?: Stripedestination_details_unimplemented;
  readonly blik?: Striperefund_destination_details_blik;
  readonly br_bank_transfer?: Striperefund_destination_details_br_bank_transfer;
  readonly card?: Striperefund_destination_details_card;
  readonly cashapp?: Stripedestination_details_unimplemented;
  readonly crypto?: Striperefund_destination_details_crypto;
  readonly customer_cash_balance?: Stripedestination_details_unimplemented;
  readonly eps?: Stripedestination_details_unimplemented;
  readonly eu_bank_transfer?: Striperefund_destination_details_eu_bank_transfer;
  readonly gb_bank_transfer?: Striperefund_destination_details_gb_bank_transfer;
  readonly giropay?: Stripedestination_details_unimplemented;
  readonly grabpay?: Stripedestination_details_unimplemented;
  readonly jp_bank_transfer?: Striperefund_destination_details_jp_bank_transfer;
  readonly klarna?: Striperefund_destination_details_klarna;
  readonly mb_way?: Striperefund_destination_details_mb_way;
  readonly multibanco?: Striperefund_destination_details_multibanco;
  readonly mx_bank_transfer?: Striperefund_destination_details_mx_bank_transfer;
  readonly nz_bank_transfer?: Stripedestination_details_unimplemented;
  readonly p24?: Striperefund_destination_details_p24;
  readonly paynow?: Stripedestination_details_unimplemented;
  readonly paypal?: Striperefund_destination_details_paypal;
  readonly pix?: Stripedestination_details_unimplemented;
  readonly revolut?: Stripedestination_details_unimplemented;
  readonly scalapay?: Stripedestination_details_unimplemented;
  readonly sofort?: Stripedestination_details_unimplemented;
  readonly swish?: Striperefund_destination_details_swish;
  readonly th_bank_transfer?: Striperefund_destination_details_th_bank_transfer;
  readonly twint?: Stripedestination_details_unimplemented;
  readonly type: string;
  readonly us_bank_transfer?: Striperefund_destination_details_us_bank_transfer;
  readonly wechat_pay?: Stripedestination_details_unimplemented;
  readonly zip?: Stripedestination_details_unimplemented;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_next_action_display_details = {
  readonly email_sent: Stripeemail_sent;
  readonly expires_at: number;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_appeal = {
  readonly card?: Stripedispute_appeal_card;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_visa_compelling_evidence3_disputed_transaction = {
  readonly customer_account_id?: string | null;
  readonly customer_device_fingerprint?: string | null;
  readonly customer_device_id?: string | null;
  readonly customer_email_address?: string | null;
  readonly customer_purchase_ip?: string | null;
  readonly merchandise_or_services?: "merchandise" | "services" | null;
  readonly product_description?: string | null;
  readonly shipping_address?: Stripedispute_transaction_shipping_address | null;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction =
  {
    readonly charge: string;
    readonly customer_account_id?: string | null;
    readonly customer_device_fingerprint?: string | null;
    readonly customer_device_id?: string | null;
    readonly customer_email_address?: string | null;
    readonly customer_purchase_ip?: string | null;
    readonly product_description?: string | null;
    readonly shipping_address?: Stripedispute_transaction_shipping_address | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_eligibility = {
  readonly mastercard_compliance?: Stripedispute_enhanced_eligibility_mastercard_compliance;
  readonly visa_compelling_evidence_3?: Stripedispute_enhanced_eligibility_visa_compelling_evidence3;
  readonly visa_compliance?: Stripedispute_enhanced_eligibility_visa_compliance;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_payment_method_details = {
  readonly amazon_pay?: Stripedispute_payment_method_details_amazon_pay;
  readonly card?: Stripedispute_payment_method_details_card;
  readonly klarna?: Stripedispute_payment_method_details_klarna;
  readonly paypal?: Stripedispute_payment_method_details_paypal;
  readonly type: "amazon_pay" | "card" | "klarna" | "paypal";
} & { readonly [x: string]: Schema.Json };
export type Stripecharge_outcome = {
  readonly advice_code?:
    | "confirm_card_data"
    | "do_not_try_again"
    | "try_again_later"
    | null;
  readonly network_advice_code?: string | null;
  readonly network_decline_code?: string | null;
  readonly network_status?: string | null;
  readonly reason?: string | null;
  readonly risk_level?: string;
  readonly risk_score?: number;
  readonly rule?: string | Striperadar_rule;
  readonly seller_message?: string | null;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Striperefund_next_action = {
  readonly display_details?: Striperefund_next_action_display_details;
  readonly type: string;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_evidence_visa_compelling_evidence3 = {
  readonly disputed_transaction?: Stripedispute_visa_compelling_evidence3_disputed_transaction | null;
  readonly prior_undisputed_transactions: ReadonlyArray<Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction>;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_evidence_details = {
  readonly due_by?: number | null;
  readonly enhanced_eligibility: Stripedispute_enhanced_eligibility;
  readonly has_evidence: boolean;
  readonly past_due: boolean;
  readonly submission_count: number;
  readonly submission_method: "manual" | "not_submitted" | "smart_disputes";
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_enhanced_evidence = {
  readonly mastercard_compliance?: Stripedispute_enhanced_evidence_mastercard_compliance;
  readonly visa_compelling_evidence_3?: Stripedispute_enhanced_evidence_visa_compelling_evidence3;
  readonly visa_compliance?: Stripedispute_enhanced_evidence_visa_compliance;
} & { readonly [x: string]: Schema.Json };
export type Stripedispute_evidence = {
  readonly access_activity_log?: string | null;
  readonly appeal?: Stripedispute_appeal | null;
  readonly billing_address?: string | null;
  readonly cancellation_policy?: string | Stripefile | null;
  readonly cancellation_policy_disclosure?: string | null;
  readonly cancellation_rebuttal?: string | null;
  readonly customer_communication?: string | Stripefile | null;
  readonly customer_email_address?: string | null;
  readonly customer_name?: string | null;
  readonly customer_purchase_ip?: string | null;
  readonly customer_signature?: string | Stripefile | null;
  readonly duplicate_charge_documentation?: string | Stripefile | null;
  readonly duplicate_charge_explanation?: string | null;
  readonly duplicate_charge_id?: string | null;
  readonly enhanced_evidence: Stripedispute_enhanced_evidence;
  readonly product_description?: string | null;
  readonly receipt?: string | Stripefile | null;
  readonly refund_policy?: string | Stripefile | null;
  readonly refund_policy_disclosure?: string | null;
  readonly refund_refusal_explanation?: string | null;
  readonly service_date?: string | null;
  readonly service_documentation?: string | Stripefile | null;
  readonly shipping_address?: string | null;
  readonly shipping_carrier?: string | null;
  readonly shipping_date?: string | null;
  readonly shipping_documentation?: string | Stripefile | null;
  readonly shipping_tracking_number?: string | null;
  readonly uncategorized_file?: string | Stripefile | null;
  readonly uncategorized_text?: string | null;
} & { readonly [x: string]: Schema.Json };

export const Stripecharge = Schema.suspend(
  (): Schema.Codec<Stripecharge> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "Amount intended to be collected by this payment. A positive integer representing how much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_captured: Schema.Number.annotate({
          description:
            "Amount in cents (or local equivalent) captured (can be less than the amount attribute on the charge if a partial capture was made).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        amount_refunded: Schema.Number.annotate({
          description:
            "Amount in cents (or local equivalent) refunded (can be less than the amount attribute on the charge if a partial refund was issued).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        application: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripeapplication,
            ]).annotate({
              description:
                "ID of the Connect application that created the charge.",
            }),
            Schema.Null,
          ]),
        ),
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
                "The application fee (if any) for the charge. [See the Connect documentation](https://docs.stripe.com/connect/direct-charges#collect-fees) for details.",
            }),
            Schema.Null,
          ]),
        ),
        application_fee_amount: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "The amount of the application fee (if any) requested for the charge. [See the Connect documentation](https://docs.stripe.com/connect/direct-charges#collect-fees) for details.",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
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
                "ID of the balance transaction that describes the impact of this charge on your account balance (not including refunds or disputes).",
            }),
            Schema.Null,
          ]),
        ),
        billing_details: Stripebilling_details,
        calculated_statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The full statement descriptor that is passed to card networks, and that is displayed on your customers' credit card and bank statements. Allows you to see what the statement descriptor looks like after the static and dynamic portions are combined. This value only exists for card payments.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        captured: Schema.Boolean.annotate({
          description:
            "If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured.",
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
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({
              description:
                "ID of the customer this charge is for if one exists.",
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
              Schema.isMaxCodePoints(40000).annotate({
                expected: "a string with at most 40000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        disputed: Schema.Boolean.annotate({
          description: "Whether the charge has been disputed.",
        }),
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
                "ID of the balance transaction that describes the reversal of the balance on your account due to payment failure.",
            }),
            Schema.Null,
          ]),
        ),
        failure_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Error code explaining reason for charge failure if available (see [the errors section](https://docs.stripe.com/error-codes) for a list of codes).",
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
                "Message to user further explaining reason for charge failure if available.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        fraud_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecharge_fraud_details]).annotate({
              description: "Information on fraud assessments for the charge.",
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
        object: Schema.Literal("charge").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        on_behalf_of: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripeaccount> => Stripeaccount),
            ]).annotate({
              description:
                "The account (if any) the charge was made on behalf of without triggering an automatic transfer. See the [Connect documentation](https://docs.stripe.com/connect/separate-charges-and-transfers) for details.",
            }),
            Schema.Null,
          ]),
        ),
        outcome: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecharge_outcome]).annotate({
              description:
                "Details about whether the payment was accepted, and why. See [understanding declines](https://docs.stripe.com/declines) for details.",
            }),
            Schema.Null,
          ]),
        ),
        paid: Schema.Boolean.annotate({
          description:
            "`true` if the charge succeeded, or was successfully authorized for later capture.",
        }),
        payment_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
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
                "ID of the PaymentIntent associated with this charge, if one exists.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ID of the payment method used in this charge.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        payment_method_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripepayment_method_details> =>
                  Stripepayment_method_details,
              ),
            ]).annotate({
              description:
                "Details about the payment method at the time of the transaction.",
            }),
            Schema.Null,
          ]),
        ),
        presentment_details: Schema.optionalKey(
          Stripepayment_flows_payment_intent_presentment_details,
        ),
        radar_options: Schema.optionalKey(Striperadar_radar_options),
        receipt_email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "This is the email address that the receipt for this charge was sent to.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        receipt_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "This is the transaction number that appears on email receipts sent for this charge. This attribute will be `null` until a receipt has been sent.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "This is the URL to view the receipt for this charge. The receipt is kept up-to-date to the latest state of the charge, including any refunds. If the charge is for an Invoice, the receipt will be stylized as an Invoice receipt.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        refunded: Schema.Boolean.annotate({
          description:
            "Whether the charge has been fully refunded. If the charge is only partially refunded, this attribute will still be false.",
        }),
        refunds: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                data: Schema.Array(
                  Schema.suspend(
                    (): Schema.Codec<Striperefund> => Striperefund,
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
              title: "RefundList",
              description:
                "A list of refunds that have been applied to the charge.",
            }),
            Schema.Null,
          ]),
        ),
        review: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripereview> => Stripereview),
            ]).annotate({
              description:
                "ID of the review associated with this charge if one exists.",
            }),
            Schema.Null,
          ]),
        ),
        shipping: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeshipping]).annotate({
              description: "Shipping information for the charge.",
            }),
            Schema.Null,
          ]),
        ),
        source_transfer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetransfer> => Stripetransfer,
              ),
            ]).annotate({
              description:
                "The transfer ID which created this charge. Only present if the charge came from another Stripe account. [See the Connect documentation](https://docs.stripe.com/connect/destination-charges) for details.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For a non-card charge, text that appears on the customer's statement as the statement descriptor. This value overrides the account's default statement descriptor. For information about requirements, including the 22-character limit, see [the Statement Descriptor docs](https://docs.stripe.com/get-started/account/statement-descriptors).\n\nFor a card charge, this value is ignored unless you don't specify a `statement_descriptor_suffix`, in which case this value is used as the suffix.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        statement_descriptor_suffix: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Provides information about a card charge. Concatenated to the account's [statement descriptor prefix](https://docs.stripe.com/get-started/account/statement-descriptors#static) to form the complete statement descriptor that appears on the customer's statement. If the account has no prefix value, the suffix is concatenated to the account's statement descriptor.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["failed", "pending", "succeeded"]).annotate({
          description:
            "The status of the payment is either `succeeded`, `pending`, or `failed`.",
        }),
        transfer: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.suspend((): Schema.Codec<Stripetransfer> => Stripetransfer),
          ]).annotate({
            description:
              "ID of the transfer to the `destination` account (only applicable if the charge was created using the `destination` parameter).",
          }),
        ),
        transfer_data: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripecharge_transfer_data]).annotate({
              description:
                "An optional dictionary including the account to automatically transfer to as part of a destination charge. [See the Connect documentation](https://docs.stripe.com/connect/destination-charges) for details.",
            }),
            Schema.Null,
          ]),
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
      title: "Charge",
      description:
        "The `Charge` object represents a single attempt to move money into your Stripe account.\nPaymentIntent confirmation is the most common way to create Charges, but [Account Debits](https://docs.stripe.com/connect/account-debits) may also create Charges.\nThe create and capture methods are deprecated and will be deleted soon. If your integration uses either of them, you need to update it to use a different payment flow, such as [the Payment Intents API](https://docs.stripe.com/payments/payment-intents).",
      identifier: "Stripecharge",
    }),
);
export const Striperefund = Schema.suspend(
  (): Schema.Codec<Striperefund> =>
    Schema.StructWithRest(
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
        charge: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
            ]).annotate({ description: "ID of the charge that's refunded." }),
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
        customer: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripecustomer> => Stripecustomer,
              ),
              Stripedeleted_customer,
            ]).annotate({ description: "ID of the customer of this refund." }),
            Schema.Null,
          ]),
        ),
        customer_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ID of the account of this refund.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        description: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "An arbitrary string attached to the object. You can use this for displaying to users (available on non-card refunds only).",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        destination_details: Schema.optionalKey(
          Striperefund_destination_details,
        ),
        failure_balance_transaction: Schema.optionalKey(
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
              "After the refund fails, this balance transaction describes the adjustment made on your account balance that reverses the initial balance transaction.",
          }),
        ),
        failure_reason: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Provides the reason for the refund failure. Possible values are: `lost_or_stolen_card`, `expired_or_canceled_card`, `charge_for_pending_refund_disputed`, `insufficient_funds`, `declined`, `merchant_request`, or `unknown`.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        instructions_email: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "For payment methods without native refund support (for example, Konbini, PromptPay), provide an email address for the customer to receive refund instructions.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
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
        next_action: Schema.optionalKey(Striperefund_next_action),
        object: Schema.Literal("refund").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
              ),
            ]).annotate({
              description: "ID of the PaymentIntent that's refunded.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_method> => Stripepayment_method,
              ),
            ]).annotate({
              description:
                "ID of the payment method associated with this refund.",
            }),
            Schema.Null,
          ]),
        ),
        pending_reason: Schema.optionalKey(
          Schema.Literals([
            "charge_pending",
            "insufficient_funds",
            "processing",
          ]).annotate({
            description:
              "Provides the reason for why the refund is pending. Possible values are: `processing`, `insufficient_funds`, or `charge_pending`.",
          }),
        ),
        presentment_details: Schema.optionalKey(
          Stripepayment_flows_payment_intent_presentment_details,
        ),
        reason: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "duplicate",
              "expired_uncaptured_charge",
              "fraudulent",
              "requested_by_customer",
            ]).annotate({
              description:
                "Reason for the refund, which is either user-provided (`duplicate`, `fraudulent`, or `requested_by_customer`) or generated by Stripe internally (`expired_uncaptured_charge`).",
            }),
            Schema.Null,
          ]),
        ),
        receipt_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "This is the transaction number that appears on email receipts sent for this refund.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        source_transfer_reversal: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetransfer_reversal> =>
                  Stripetransfer_reversal,
              ),
            ]).annotate({
              description:
                "The transfer reversal that's associated with the refund. Only present if the charge came from another Stripe account.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Status of the refund. This can be `pending`, `requires_action`, `succeeded`, `failed`, or `canceled`. Learn more about [failed refunds](https://docs.stripe.com/refunds#failed-refunds).",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        transfer_reversal: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetransfer_reversal> =>
                  Stripetransfer_reversal,
              ),
            ]).annotate({
              description:
                "This refers to the transfer reversal object if the accompanying transfer reverses. This is only applicable if the charge was created using the destination parameter.",
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
      title: "Refund",
      description:
        "Refund objects allow you to refund a previously created charge that isn't\nrefunded yet. Funds are refunded to the credit or debit card that's\ninitially charged.\n\nRelated guide: [Refunds](https://docs.stripe.com/refunds)",
      identifier: "Striperefund",
    }),
);
export const Stripedispute = Schema.suspend(
  (): Schema.Codec<Stripedispute> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description:
            "Disputed amount. Usually the amount of the charge, but it can differ (usually because of currency fluctuation or because only part of the order is disputed).",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        balance_transactions: Schema.Array(
          Schema.suspend(
            (): Schema.Codec<Stripebalance_transaction> =>
              Stripebalance_transaction,
          ),
        ).annotate({
          description:
            "List of zero, one, or two balance transactions that show funds withdrawn and reinstated to your Stripe account as a result of this dispute.",
        }),
        charge: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend((): Schema.Codec<Stripecharge> => Stripecharge),
        ]).annotate({ description: "ID of the charge that's disputed." }),
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
        enhanced_eligibility_types: Schema.Array(
          Schema.Literals([
            "mastercard_compliance",
            "visa_compelling_evidence_3",
            "visa_compliance",
          ]),
        ).annotate({
          description:
            "List of eligibility types that are included in `enhanced_evidence`.",
        }),
        evidence: Stripedispute_evidence,
        evidence_details: Stripedispute_evidence_details,
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        intended_submission_method: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "manual",
              "prefer_manual",
              "prefer_smart_disputes",
              "smart_disputes",
            ]).annotate({
              description: "Intended submission method for the dispute.",
            }),
            Schema.Null,
          ]),
        ),
        is_charge_refundable: Schema.Boolean.annotate({
          description:
            "If true, it's still possible to refund the disputed payment. After the payment has been fully refunded, no further funds are withdrawn from your Stripe account as a result of this dispute.",
        }),
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
        object: Schema.Literal("dispute").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        payment_intent: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripepayment_intent> => Stripepayment_intent,
              ),
            ]).annotate({
              description: "ID of the PaymentIntent that's disputed.",
            }),
            Schema.Null,
          ]),
        ),
        payment_method_details: Schema.optionalKey(
          Stripedispute_payment_method_details,
        ),
        reason: Schema.String.annotate({
          description:
            "Reason given by cardholder for dispute. Possible values are `bank_cannot_process`, `check_returned`, `credit_not_processed`, `customer_initiated`, `debit_not_authorized`, `duplicate`, `fraudulent`, `general`, `incorrect_account_details`, `insufficient_funds`, `noncompliant`, `product_not_received`, `product_unacceptable`, `subscription_canceled`, or `unrecognized`. Learn more about [dispute reasons](https://docs.stripe.com/disputes/categories).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals([
          "appeal_needs_response",
          "appeal_under_review",
          "lost",
          "needs_response",
          "prevented",
          "under_review",
          "warning_closed",
          "warning_needs_response",
          "warning_under_review",
          "won",
        ]).annotate({
          description:
            "The current status of a dispute. Possible values include:`warning_needs_response`, `warning_under_review`, `warning_closed`, `needs_response`, `under_review`, `appeal_needs_response`, `appeal_under_review`, `won`, `lost`, or `prevented`.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Dispute",
      description:
        "A dispute occurs when a customer questions your charge with their card issuer.\nWhen this happens, you have the opportunity to respond to the dispute with\nevidence that shows that the charge is legitimate.\n\nRelated guide: [Disputes and fraud](https://docs.stripe.com/disputes)",
      identifier: "Stripedispute",
    }),
);
export const Striperefund_destination_details_afterpay_clearpay =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_afterpay_clearpay",
    description: "",
    identifier: "Striperefund_destination_details_afterpay_clearpay",
  });
export const Striperefund_destination_details_blik = Schema.StructWithRest(
  Schema.Struct({
    network_decline_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "For refunds declined by the network, a decline code provided by the network which indicates the reason the refund failed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_blik",
  description: "",
  identifier: "Striperefund_destination_details_blik",
});
export const Striperefund_destination_details_br_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_br_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_br_bank_transfer",
  });
export const Striperefund_destination_details_card = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.String.annotate({
        description: "Value of the reference number assigned to the refund.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reference_status: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Status of the reference number on the refund. This can be `pending`, `available` or `unavailable`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    reference_type: Schema.optionalKey(
      Schema.String.annotate({
        description: "Type of the reference number assigned to the refund.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    type: Schema.Literals(["pending", "refund", "reversal"]).annotate({
      description:
        "The type of refund. This can be `refund`, `reversal`, or `pending`.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "refund_destination_details_card",
  description: "",
  identifier: "Striperefund_destination_details_card",
});
export const Striperefund_destination_details_crypto = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The transaction hash of the refund.",
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
  title: "refund_destination_details_crypto",
  description: "",
  identifier: "Striperefund_destination_details_crypto",
});
export const Striperefund_destination_details_eu_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_eu_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_eu_bank_transfer",
  });
export const Striperefund_destination_details_gb_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_gb_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_gb_bank_transfer",
  });
export const Striperefund_destination_details_jp_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_jp_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_jp_bank_transfer",
  });
export const Striperefund_destination_details_klarna = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_klarna",
  description: "",
  identifier: "Striperefund_destination_details_klarna",
});
export const Striperefund_destination_details_mb_way = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_mb_way",
  description: "",
  identifier: "Striperefund_destination_details_mb_way",
});
export const Striperefund_destination_details_multibanco =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_multibanco",
    description: "",
    identifier: "Striperefund_destination_details_multibanco",
  });
export const Striperefund_destination_details_mx_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_mx_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_mx_bank_transfer",
  });
export const Striperefund_destination_details_p24 = Schema.StructWithRest(
  Schema.Struct({
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_p24",
  description: "",
  identifier: "Striperefund_destination_details_p24",
});
export const Striperefund_destination_details_paypal = Schema.StructWithRest(
  Schema.Struct({
    network_decline_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "For refunds declined by the network, a decline code provided by the network which indicates the reason the refund failed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_paypal",
  description: "",
  identifier: "Striperefund_destination_details_paypal",
});
export const Striperefund_destination_details_swish = Schema.StructWithRest(
  Schema.Struct({
    network_decline_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "For refunds declined by the network, a decline code provided by the network which indicates the reason the refund failed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "The reference assigned to the refund.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    reference_status: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
  title: "refund_destination_details_swish",
  description: "",
  identifier: "Striperefund_destination_details_swish",
});
export const Striperefund_destination_details_th_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_th_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_th_bank_transfer",
  });
export const Striperefund_destination_details_us_bank_transfer =
  Schema.StructWithRest(
    Schema.Struct({
      reference: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reference assigned to the refund.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reference_status: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Status of the reference on the refund. This can be `pending`, `available` or `unavailable`.",
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
    title: "refund_destination_details_us_bank_transfer",
    description: "",
    identifier: "Striperefund_destination_details_us_bank_transfer",
  });
export const Stripedispute_appeal_card = Schema.StructWithRest(
  Schema.Struct({
    reason_for_filing: Schema.optionalKey(
      Schema.String.annotate({
        description: "The reason for filing the appeal.",
      }).check(
        Schema.isMaxCodePoints(20000).annotate({
          expected: "a string with at most 20000 code points",
        }),
      ),
    ),
    supporting_files: Schema.optionalKey(
      Schema.Array(
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ).annotate({
        description:
          "One or more document IDs returned by a [file upload](https://docs.stripe.com/api#create_file) with a `purpose` value of `dispute_evidence` to support the appeal.",
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
  title: "DisputeAppealCard",
  description: "",
  identifier: "Stripedispute_appeal_card",
});
export const Stripedispute_enhanced_evidence_mastercard_compliance =
  Schema.StructWithRest(
    Schema.Struct({
      fee_acknowledged: Schema.Boolean.annotate({
        description:
          "A field acknowledging the fee incurred when countering a Mastercard compliance dispute. If this field is set to true, evidence can be submitted for the compliance dispute.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DisputeEnhancedEvidenceMastercardCompliance",
    description: "",
    identifier: "Stripedispute_enhanced_evidence_mastercard_compliance",
  });
export const Stripedispute_transaction_shipping_address = Schema.StructWithRest(
  Schema.Struct({
    city: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description: "City, district, suburb, town, or village.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    country: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line1: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 1, such as the street, PO Box, or company name.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    line2: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "Address line 2, such as the apartment, suite, unit, or building.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    postal_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({ description: "ZIP or postal code." }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.Null,
      ]),
    ),
    state: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).",
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
  title: "DisputeTransactionShippingAddress",
  description: "",
  identifier: "Stripedispute_transaction_shipping_address",
});
export const Stripedispute_enhanced_evidence_visa_compliance =
  Schema.StructWithRest(
    Schema.Struct({
      fee_acknowledged: Schema.Boolean.annotate({
        description:
          "A field acknowledging the fee incurred when countering a Visa compliance dispute. If this field is set to true, evidence can be submitted for the compliance dispute. Stripe collects a 500 USD (or local equivalent) amount to cover the network costs associated with resolving compliance disputes. Stripe refunds the 500 USD network fee if you win the dispute.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DisputeEnhancedEvidenceVisaCompliance",
    description: "",
    identifier: "Stripedispute_enhanced_evidence_visa_compliance",
  });
export const Stripedispute_enhanced_eligibility_mastercard_compliance =
  Schema.StructWithRest(
    Schema.Struct({
      status: Schema.Literals([
        "fee_acknowledged",
        "requires_fee_acknowledgement",
      ]).annotate({ description: "Mastercard compliance eligibility status." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DisputeEnhancedEligibilityMastercardCompliance",
    description: "",
    identifier: "Stripedispute_enhanced_eligibility_mastercard_compliance",
  });
export const Stripedispute_enhanced_eligibility_visa_compelling_evidence3 =
  Schema.StructWithRest(
    Schema.Struct({
      required_actions: Schema.Array(
        Schema.Literals([
          "missing_customer_identifiers",
          "missing_disputed_transaction_description",
          "missing_merchandise_or_services",
          "missing_prior_undisputed_transaction_description",
          "missing_prior_undisputed_transactions",
        ]),
      ).annotate({
        description:
          "List of actions required to qualify dispute for Visa Compelling Evidence 3.0 evidence submission.",
      }),
      status: Schema.Literals([
        "not_qualified",
        "qualified",
        "requires_action",
      ]).annotate({
        description: "Visa Compelling Evidence 3.0 eligibility status.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DisputeEnhancedEligibilityVisaCompellingEvidence3",
    description: "",
    identifier: "Stripedispute_enhanced_eligibility_visa_compelling_evidence3",
  });
export const Stripedispute_enhanced_eligibility_visa_compliance =
  Schema.StructWithRest(
    Schema.Struct({
      status: Schema.Literals([
        "fee_acknowledged",
        "requires_fee_acknowledgement",
      ]).annotate({ description: "Visa compliance eligibility status." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "DisputeEnhancedEligibilityVisaCompliance",
    description: "",
    identifier: "Stripedispute_enhanced_eligibility_visa_compliance",
  });
export const Stripedispute_payment_method_details_amazon_pay =
  Schema.StructWithRest(
    Schema.Struct({
      dispute_type: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["chargeback", "claim"]).annotate({
            description: "The AmazonPay dispute type, chargeback or claim",
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
    title: "DisputePaymentMethodDetailsAmazonPay",
    description: "",
    identifier: "Stripedispute_payment_method_details_amazon_pay",
  });
export const Stripedispute_payment_method_details_card = Schema.StructWithRest(
  Schema.Struct({
    brand: Schema.String.annotate({
      description:
        "Card brand. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `jcb`, `link`, `mastercard`, `unionpay`, `visa` or `unknown`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    case_type: Schema.Literals([
      "block",
      "chargeback",
      "compliance",
      "inquiry",
      "resolution",
    ]).annotate({
      description:
        "The type of dispute opened. Different case types may have varying fees and financial impact.",
    }),
    network: Schema.String.annotate({
      description:
        "Identifies which network this charge was processed on. Can be `amex`, `cartes_bancaires`, `diners`, `discover`, `eftpos_au`, `interac`, `jcb`, `link`, `mastercard`, `unionpay`, `visa`, or `unknown`.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
    network_reason_code: Schema.optionalKey(
      Schema.Union([
        Schema.String.annotate({
          description:
            "The card network's specific dispute reason code, which maps to one of Stripe's primary dispute categories to simplify response guidance. The [Network code map](https://stripe.com/docs/disputes/categories#network-code-map) lists all available dispute reason codes by network.",
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
  title: "DisputePaymentMethodDetailsCard",
  description: "",
  identifier: "Stripedispute_payment_method_details_card",
});
export const Stripedispute_payment_method_details_klarna =
  Schema.StructWithRest(
    Schema.Struct({
      chargeback_loss_reason_code: Schema.optionalKey(
        Schema.String.annotate({
          description:
            "Chargeback loss reason mapped by Stripe from Klarna's chargeback loss reason",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
      ),
      reason_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reason for the dispute as defined by Klarna",
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
    title: "DisputePaymentMethodDetailsKlarna",
    description: "",
    identifier: "Stripedispute_payment_method_details_klarna",
  });
export const Stripedispute_payment_method_details_paypal =
  Schema.StructWithRest(
    Schema.Struct({
      case_id: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The ID of the dispute in PayPal.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      reason_code: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The reason for the dispute as defined by PayPal",
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
    title: "DisputePaymentMethodDetailsPaypal",
    description: "",
    identifier: "Stripedispute_payment_method_details_paypal",
  });
export const Stripecharge_fraud_details = Schema.StructWithRest(
  Schema.Struct({
    stripe_report: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Assessments from Stripe. If set, the value is `fraudulent`.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
    user_report: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Assessments reported by you. If set, possible values of are `safe` and `fraudulent`.",
      }).check(
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
  title: "ChargeFraudDetails",
  description: "",
  identifier: "Stripecharge_fraud_details",
});
export const Stripecharge_transfer_data = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.optionalKey(
      Schema.Union([
        Schema.Number.annotate({
          description:
            "The amount transferred to the destination account, if specified. By default, the entire charge amount is transferred to the destination account.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        Schema.Null,
      ]),
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
        "ID of an existing, connected Stripe account to transfer funds to if `transfer_data` was specified in the charge request.",
    }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({
  title: "ChargeTransferData",
  description: "",
  identifier: "Stripecharge_transfer_data",
});
export const Striperefund_destination_details = Schema.suspend(
  (): Schema.Codec<Striperefund_destination_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        affirm: Schema.optionalKey(Stripedestination_details_unimplemented),
        afterpay_clearpay: Schema.optionalKey(
          Striperefund_destination_details_afterpay_clearpay,
        ),
        alipay: Schema.optionalKey(Stripedestination_details_unimplemented),
        alma: Schema.optionalKey(Stripedestination_details_unimplemented),
        amazon_pay: Schema.optionalKey(Stripedestination_details_unimplemented),
        au_bank_transfer: Schema.optionalKey(
          Stripedestination_details_unimplemented,
        ),
        blik: Schema.optionalKey(Striperefund_destination_details_blik),
        br_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_br_bank_transfer,
        ),
        card: Schema.optionalKey(Striperefund_destination_details_card),
        cashapp: Schema.optionalKey(Stripedestination_details_unimplemented),
        crypto: Schema.optionalKey(Striperefund_destination_details_crypto),
        customer_cash_balance: Schema.optionalKey(
          Stripedestination_details_unimplemented,
        ),
        eps: Schema.optionalKey(Stripedestination_details_unimplemented),
        eu_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_eu_bank_transfer,
        ),
        gb_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_gb_bank_transfer,
        ),
        giropay: Schema.optionalKey(Stripedestination_details_unimplemented),
        grabpay: Schema.optionalKey(Stripedestination_details_unimplemented),
        jp_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_jp_bank_transfer,
        ),
        klarna: Schema.optionalKey(Striperefund_destination_details_klarna),
        mb_way: Schema.optionalKey(Striperefund_destination_details_mb_way),
        multibanco: Schema.optionalKey(
          Striperefund_destination_details_multibanco,
        ),
        mx_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_mx_bank_transfer,
        ),
        nz_bank_transfer: Schema.optionalKey(
          Stripedestination_details_unimplemented,
        ),
        p24: Schema.optionalKey(Striperefund_destination_details_p24),
        paynow: Schema.optionalKey(Stripedestination_details_unimplemented),
        paypal: Schema.optionalKey(Striperefund_destination_details_paypal),
        pix: Schema.optionalKey(Stripedestination_details_unimplemented),
        revolut: Schema.optionalKey(Stripedestination_details_unimplemented),
        scalapay: Schema.optionalKey(Stripedestination_details_unimplemented),
        sofort: Schema.optionalKey(Stripedestination_details_unimplemented),
        swish: Schema.optionalKey(Striperefund_destination_details_swish),
        th_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_th_bank_transfer,
        ),
        twint: Schema.optionalKey(Stripedestination_details_unimplemented),
        type: Schema.String.annotate({
          description:
            "The type of transaction-specific details of the payment method used in the refund (e.g., `card`). An additional hash is included on `destination_details` with a name matching this value. It contains information specific to the refund transaction.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        us_bank_transfer: Schema.optionalKey(
          Striperefund_destination_details_us_bank_transfer,
        ),
        wechat_pay: Schema.optionalKey(Stripedestination_details_unimplemented),
        zip: Schema.optionalKey(Stripedestination_details_unimplemented),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "refund_destination_details",
      description: "",
      identifier: "Striperefund_destination_details",
    }),
);
export const Striperefund_next_action_display_details = Schema.suspend(
  (): Schema.Codec<Striperefund_next_action_display_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        email_sent: Stripeemail_sent,
        expires_at: Schema.Number.annotate({
          description: "The expiry timestamp.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "RefundNextActionDisplayDetails",
      description: "",
      identifier: "Striperefund_next_action_display_details",
    }),
);
export const Stripedispute_appeal = Schema.suspend(
  (): Schema.Codec<Stripedispute_appeal> =>
    Schema.StructWithRest(
      Schema.Struct({ card: Schema.optionalKey(Stripedispute_appeal_card) }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DisputeAppeal",
      description: "",
      identifier: "Stripedispute_appeal",
    }),
);
export const Stripedispute_visa_compelling_evidence3_disputed_transaction =
  Schema.suspend(
    (): Schema.Codec<Stripedispute_visa_compelling_evidence3_disputed_transaction> =>
      Schema.StructWithRest(
        Schema.Struct({
          customer_account_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "User Account ID used to log into business platform. Must be recognizable by the user.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_device_fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Unique identifier of the cardholder’s device derived from a combination of at least two hardware and software attributes. Must be at least 20 characters.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_device_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Unique identifier of the cardholder’s device such as a device serial number (e.g., International Mobile Equipment Identity [IMEI]). Must be at least 15 characters.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_email_address: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The email address of the customer.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_purchase_ip: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The IP address that the customer used when making the purchase.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          merchandise_or_services: Schema.optionalKey(
            Schema.Union([
              Schema.Literals(["merchandise", "services"]).annotate({
                description: "Categorization of disputed payment.",
              }),
              Schema.Null,
            ]),
          ),
          product_description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "A description of the product or service that was sold.",
              }).check(
                Schema.isMaxCodePoints(150000).annotate({
                  expected: "a string with at most 150000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          shipping_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripedispute_transaction_shipping_address,
              ]).annotate({
                description:
                  "The address to which a physical product was shipped. All fields are required for Visa Compelling Evidence 3.0 evidence submission.",
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
        title: "DisputeVisaCompellingEvidence3DisputedTransaction",
        description: "",
        identifier:
          "Stripedispute_visa_compelling_evidence3_disputed_transaction",
      }),
  );
export const Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction =
  Schema.suspend(
    (): Schema.Codec<Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction> =>
      Schema.StructWithRest(
        Schema.Struct({
          charge: Schema.String.annotate({
            description:
              "Stripe charge ID for the Visa Compelling Evidence 3.0 eligible prior charge.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          customer_account_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "User Account ID used to log into business platform. Must be recognizable by the user.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_device_fingerprint: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Unique identifier of the cardholder’s device derived from a combination of at least two hardware and software attributes. Must be at least 20 characters.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_device_id: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "Unique identifier of the cardholder’s device such as a device serial number (e.g., International Mobile Equipment Identity [IMEI]). Must be at least 15 characters.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_email_address: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description: "The email address of the customer.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          customer_purchase_ip: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "The IP address that the customer used when making the purchase.",
              }).check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          product_description: Schema.optionalKey(
            Schema.Union([
              Schema.String.annotate({
                description:
                  "A description of the product or service that was sold.",
              }).check(
                Schema.isMaxCodePoints(150000).annotate({
                  expected: "a string with at most 150000 code points",
                }),
              ),
              Schema.Null,
            ]),
          ),
          shipping_address: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripedispute_transaction_shipping_address,
              ]).annotate({
                description:
                  "The address to which a physical product was shipped. All fields are required for Visa Compelling Evidence 3.0 evidence submission.",
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
        title: "DisputeVisaCompellingEvidence3PriorUndisputedTransaction",
        description: "",
        identifier:
          "Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction",
      }),
  );
export const Stripedispute_enhanced_eligibility = Schema.suspend(
  (): Schema.Codec<Stripedispute_enhanced_eligibility> =>
    Schema.StructWithRest(
      Schema.Struct({
        mastercard_compliance: Schema.optionalKey(
          Stripedispute_enhanced_eligibility_mastercard_compliance,
        ),
        visa_compelling_evidence_3: Schema.optionalKey(
          Stripedispute_enhanced_eligibility_visa_compelling_evidence3,
        ),
        visa_compliance: Schema.optionalKey(
          Stripedispute_enhanced_eligibility_visa_compliance,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DisputeEnhancedEligibility",
      description: "",
      identifier: "Stripedispute_enhanced_eligibility",
    }),
);
export const Stripedispute_payment_method_details = Schema.suspend(
  (): Schema.Codec<Stripedispute_payment_method_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        amazon_pay: Schema.optionalKey(
          Stripedispute_payment_method_details_amazon_pay,
        ),
        card: Schema.optionalKey(Stripedispute_payment_method_details_card),
        klarna: Schema.optionalKey(Stripedispute_payment_method_details_klarna),
        paypal: Schema.optionalKey(Stripedispute_payment_method_details_paypal),
        type: Schema.Literals([
          "amazon_pay",
          "card",
          "klarna",
          "paypal",
        ]).annotate({ description: "Payment method type." }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DisputePaymentMethodDetails",
      description: "",
      identifier: "Stripedispute_payment_method_details",
    }),
);
export const Stripecharge_outcome = Schema.suspend(
  (): Schema.Codec<Stripecharge_outcome> =>
    Schema.StructWithRest(
      Schema.Struct({
        advice_code: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "confirm_card_data",
              "do_not_try_again",
              "try_again_later",
            ]).annotate({
              description:
                "An enumerated value providing a more detailed explanation on [how to proceed with an error](https://docs.stripe.com/declines#retrying-issuer-declines).",
            }),
            Schema.Null,
          ]),
        ),
        network_advice_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For charges declined by the network, a 2 digit code which indicates the advice returned by the network on how to proceed with an error.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        network_decline_code: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "For charges declined by the network, an alphanumeric code which indicates the reason the charge failed.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        network_status: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                'Possible values are `approved_by_network`, `declined_by_network`, `not_sent_to_network`, and `reversed_after_approval`. The value `reversed_after_approval` indicates the payment was [blocked by Stripe](https://docs.stripe.com/declines#blocked-payments) after bank authorization, and may temporarily appear as "pending" on a cardholder\'s statement.',
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        reason: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An enumerated value providing a more detailed explanation of the outcome's `type`. Charges blocked by Radar's default block rule have the value `highest_risk_level`. Charges placed in review by Radar's default review rule have the value `elevated_risk_level`. Charges blocked because the payment is unlikely to be authorized have the value `low_probability_of_authorization`. Charges authorized, blocked, or placed in review by custom rules have the value `rule`. See [understanding declines](https://docs.stripe.com/declines) for more details.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        risk_level: Schema.optionalKey(
          Schema.String.annotate({
            description:
              "Stripe Radar's evaluation of the riskiness of the payment. Possible values for evaluated payments are `normal`, `elevated`, `highest`. For non-card payments, and card-based payments predating the public assignment of risk levels, this field will have the value `not_assessed`. In the event of an error in the evaluation, this field will have the value `unknown`. This field is only available with Radar.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
        ),
        risk_score: Schema.optionalKey(
          Schema.Number.annotate({
            description:
              "Stripe Radar's evaluation of the riskiness of the payment. Possible values for evaluated payments are between 0 and 100. For non-card payments, card-based payments predating the public assignment of risk scores, or in the event of an error during evaluation, this field will not be present. This field is only available with Radar for Fraud Teams.",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
        ),
        rule: Schema.optionalKey(
          Schema.Union([
            Schema.String.check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Striperadar_rule,
          ]).annotate({
            description:
              "The ID of the Radar rule that matched the payment, if applicable.",
          }),
        ),
        seller_message: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A human-readable description of the outcome type and reason, designed for you (the recipient of the payment), not your customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        type: Schema.String.annotate({
          description:
            "Possible values are `authorized`, `manual_review`, `issuer_declined`, `blocked`, and `invalid`. See [understanding declines](https://docs.stripe.com/declines) and [Radar reviews](https://docs.stripe.com/radar/reviews) for details.",
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
      title: "ChargeOutcome",
      description: "",
      identifier: "Stripecharge_outcome",
    }),
);
export const Striperefund_next_action = Schema.suspend(
  (): Schema.Codec<Striperefund_next_action> =>
    Schema.StructWithRest(
      Schema.Struct({
        display_details: Schema.optionalKey(
          Striperefund_next_action_display_details,
        ),
        type: Schema.String.annotate({
          description: "Type of the next action to perform.",
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
      title: "RefundNextAction",
      description: "",
      identifier: "Striperefund_next_action",
    }),
);
export const Stripedispute_enhanced_evidence_visa_compelling_evidence3 =
  Schema.suspend(
    (): Schema.Codec<Stripedispute_enhanced_evidence_visa_compelling_evidence3> =>
      Schema.StructWithRest(
        Schema.Struct({
          disputed_transaction: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripedispute_visa_compelling_evidence3_disputed_transaction,
              ]).annotate({
                description:
                  "Disputed transaction details for Visa Compelling Evidence 3.0 evidence submission.",
              }),
              Schema.Null,
            ]),
          ),
          prior_undisputed_transactions: Schema.Array(
            Stripedispute_visa_compelling_evidence3_prior_undisputed_transaction,
          ).annotate({
            description:
              "List of exactly two prior undisputed transaction objects for Visa Compelling Evidence 3.0 evidence submission.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "DisputeEnhancedEvidenceVisaCompellingEvidence3",
        description: "",
        identifier: "Stripedispute_enhanced_evidence_visa_compelling_evidence3",
      }),
  );
export const Stripedispute_evidence_details = Schema.suspend(
  (): Schema.Codec<Stripedispute_evidence_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        due_by: Schema.optionalKey(
          Schema.Union([
            Schema.Number.annotate({
              description:
                "Date by which evidence must be submitted in order to successfully challenge dispute. Will be 0 if the customer's bank or credit card company doesn't allow a response for this particular dispute.",
              format: "unix-time",
            }).check(Schema.isInt().annotate({ expected: "an integer" })),
            Schema.Null,
          ]),
        ),
        enhanced_eligibility: Stripedispute_enhanced_eligibility,
        has_evidence: Schema.Boolean.annotate({
          description: "Whether evidence has been staged for this dispute.",
        }),
        past_due: Schema.Boolean.annotate({
          description:
            "Whether the last evidence submission was submitted past the due date. Defaults to `false` if no evidence submissions have occurred. If `true`, then delivery of the latest evidence is *not* guaranteed.",
        }),
        submission_count: Schema.Number.annotate({
          description:
            "The number of times evidence has been submitted. Typically, you may only submit evidence once.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        submission_method: Schema.Literals([
          "manual",
          "not_submitted",
          "smart_disputes",
        ]).annotate({
          description:
            "Whether the dispute was submitted manually, with Smart Disputes, or not submitted.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DisputeEvidenceDetails",
      description: "",
      identifier: "Stripedispute_evidence_details",
    }),
);
export const Stripedispute_enhanced_evidence = Schema.suspend(
  (): Schema.Codec<Stripedispute_enhanced_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        mastercard_compliance: Schema.optionalKey(
          Stripedispute_enhanced_evidence_mastercard_compliance,
        ),
        visa_compelling_evidence_3: Schema.optionalKey(
          Stripedispute_enhanced_evidence_visa_compelling_evidence3,
        ),
        visa_compliance: Schema.optionalKey(
          Stripedispute_enhanced_evidence_visa_compliance,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "DisputeEnhancedEvidence",
      description: "",
      identifier: "Stripedispute_enhanced_evidence",
    }),
);
export const Stripedispute_evidence = Schema.suspend(
  (): Schema.Codec<Stripedispute_evidence> =>
    Schema.StructWithRest(
      Schema.Struct({
        access_activity_log: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Any server or activity logs showing proof that the customer accessed or downloaded the purchased digital product. This information should include IP addresses, corresponding timestamps, and any detailed recorded activity.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        appeal: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripedispute_appeal]).annotate({
              description: "Appeal evidence submitted during the appeal stage.",
            }),
            Schema.Null,
          ]),
        ),
        billing_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The billing address provided by the customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        cancellation_policy: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your subscription cancellation policy, as shown to the customer.",
            }),
            Schema.Null,
          ]),
        ),
        cancellation_policy_disclosure: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An explanation of how and when the customer was shown your refund policy prior to purchase.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        cancellation_rebuttal: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A justification for why the customer's subscription was not canceled.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_communication: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any communication with the customer that you feel is relevant to your case. Examples include emails proving that the customer received the product or service, or demonstrating their use of or satisfaction with the product or service.",
            }),
            Schema.Null,
          ]),
        ),
        customer_email_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The email address of the customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The name of the customer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_purchase_ip: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The IP address that the customer used when making the purchase.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        customer_signature: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) A relevant document or contract showing the customer's signature.",
            }),
            Schema.Null,
          ]),
        ),
        duplicate_charge_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation for the prior charge that can uniquely identify the charge, such as a receipt, shipping label, work order, etc. This document should be paired with a similar document from the disputed payment that proves the two payments are separate.",
            }),
            Schema.Null,
          ]),
        ),
        duplicate_charge_explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "An explanation of the difference between the disputed charge versus the prior charge that appears to be a duplicate.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        duplicate_charge_id: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The Stripe ID for the prior charge which appears to be a duplicate of the disputed charge.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        enhanced_evidence: Stripedispute_enhanced_evidence,
        product_description: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A description of the product or service that was sold.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        receipt: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any receipt or message sent to the customer notifying them of the charge.",
            }),
            Schema.Null,
          ]),
        ),
        refund_policy: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Your refund policy, as shown to the customer.",
            }),
            Schema.Null,
          ]),
        ),
        refund_policy_disclosure: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Documentation demonstrating that the customer was shown your refund policy prior to purchase.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        refund_refusal_explanation: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A justification for why the customer is not entitled to a refund.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        service_date: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The date on which the customer received or began receiving the purchased service, in a clear human-readable format.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        service_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation showing proof that a service was provided to the customer. This could include a copy of a signed contract, work order, or other form of written agreement.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_address: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The address to which a physical product was shipped. You should try to include as complete address information as possible.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        shipping_carrier: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc. If multiple carriers were used for this purchase, please separate them with commas.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        shipping_date: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The date on which a physical product began its route to the shipping address, in a clear human-readable format.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        shipping_documentation: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Documentation showing proof that a product was shipped to the customer at the same address the customer provided to you. This could include a copy of the shipment receipt, shipping label, etc. It should show the customer's full shipping address, if possible.",
            }),
            Schema.Null,
          ]),
        ),
        shipping_tracking_number: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The tracking number for a physical product, obtained from the delivery service. If multiple tracking numbers were generated for this purchase, please separate them with commas.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        uncategorized_file: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Stripefile,
            ]).annotate({
              description:
                "(ID of a [file upload](https://stripe.com/docs/guides/file-upload)) Any additional evidence or statements.",
            }),
            Schema.Null,
          ]),
        ),
        uncategorized_text: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "Any additional evidence or statements.",
            }).check(
              Schema.isMaxCodePoints(150000).annotate({
                expected: "a string with at most 150000 code points",
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
      title: "DisputeEvidence",
      description: "",
      identifier: "Stripedispute_evidence",
    }),
);
