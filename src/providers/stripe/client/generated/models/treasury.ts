// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  Stripeaddress,
  Stripeinbound_transfers,
  Stripeoutbound_payments_payment_method_details,
  Stripeoutbound_transfers_payment_method_details,
  Stripereceived_payment_method_details_financial_account,
} from "./common.js";
import { Stripeissuing_authorization } from "./issuing.js";
import { Stripepayout } from "./transfers.js";

export type Stripetreasury_transaction = {
  readonly amount: number;
  readonly balance_impact: Stripetreasury_transactions_resource_balance_impact;
  readonly created: number;
  readonly currency: string;
  readonly description: string;
  readonly entries?:
    | ({
        readonly data: ReadonlyArray<Stripetreasury_transaction_entry>;
        readonly has_more: boolean;
        readonly object: "list";
        readonly url: string;
      } & { readonly [x: string]: Schema.Json })
    | null;
  readonly financial_account: string;
  readonly flow?: string | null;
  readonly flow_details?: Stripetreasury_transactions_resource_flow_details | null;
  readonly flow_type:
    | "credit_reversal"
    | "debit_reversal"
    | "inbound_transfer"
    | "issuing_authorization"
    | "other"
    | "outbound_payment"
    | "outbound_transfer"
    | "received_credit"
    | "received_debit";
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "treasury.transaction";
  readonly status: "open" | "posted" | "void";
  readonly status_transitions: Stripetreasury_transactions_resource_abstract_transaction_resource_status_transitions;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_transactions_resource_flow_details = {
  readonly credit_reversal?: Stripetreasury_credit_reversal;
  readonly debit_reversal?: Stripetreasury_debit_reversal;
  readonly inbound_transfer?: Stripetreasury_inbound_transfer;
  readonly issuing_authorization?: Stripeissuing_authorization;
  readonly outbound_payment?: Stripetreasury_outbound_payment;
  readonly outbound_transfer?: Stripetreasury_outbound_transfer;
  readonly received_credit?: Stripetreasury_received_credit;
  readonly received_debit?: Stripetreasury_received_debit;
  readonly type:
    | "credit_reversal"
    | "debit_reversal"
    | "inbound_transfer"
    | "issuing_authorization"
    | "other"
    | "outbound_payment"
    | "outbound_transfer"
    | "received_credit"
    | "received_debit";
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_debit = {
  readonly amount: number;
  readonly created: number;
  readonly currency: string;
  readonly description: string;
  readonly failure_code?:
    | "account_closed"
    | "account_frozen"
    | "insufficient_funds"
    | "international_transaction"
    | "other"
    | null;
  readonly financial_account?: string | null;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly initiating_payment_method_details?: Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details;
  readonly linked_flows: Stripetreasury_received_debits_resource_linked_flows;
  readonly livemode: boolean;
  readonly network: "ach" | "card" | "stripe";
  readonly object: "treasury.received_debit";
  readonly reversal_details?: Stripetreasury_received_debits_resource_reversal_details | null;
  readonly status: "failed" | "succeeded";
  readonly transaction?: string | Stripetreasury_transaction | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_credit = {
  readonly amount: number;
  readonly created: number;
  readonly currency: string;
  readonly description: string;
  readonly failure_code?:
    | "account_closed"
    | "account_frozen"
    | "international_transaction"
    | "other"
    | null;
  readonly financial_account?: string | null;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly initiating_payment_method_details: Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details;
  readonly linked_flows: Stripetreasury_received_credits_resource_linked_flows;
  readonly livemode: boolean;
  readonly network: "ach" | "card" | "rtp" | "stripe" | "us_domestic_wire";
  readonly object: "treasury.received_credit";
  readonly reversal_details?: Stripetreasury_received_credits_resource_reversal_details | null;
  readonly status: "failed" | "succeeded";
  readonly transaction?: string | Stripetreasury_transaction | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_credits_resource_linked_flows = {
  readonly credit_reversal?: string | null;
  readonly issuing_authorization?: string | null;
  readonly issuing_transaction?: string | null;
  readonly source_flow?: string | null;
  readonly source_flow_details?: Stripetreasury_received_credits_resource_source_flows_details | null;
  readonly source_flow_type?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_credits_resource_source_flows_details = {
  readonly credit_reversal?: Stripetreasury_credit_reversal;
  readonly outbound_payment?: Stripetreasury_outbound_payment;
  readonly outbound_transfer?: Stripetreasury_outbound_transfer;
  readonly payout?: Stripepayout;
  readonly type:
    | "credit_reversal"
    | "other"
    | "outbound_payment"
    | "outbound_transfer"
    | "payout";
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfer = {
  readonly amount: number;
  readonly cancelable: boolean;
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly destination_payment_method?: string | null;
  readonly destination_payment_method_details: Stripeoutbound_transfers_payment_method_details;
  readonly expected_arrival_date: number;
  readonly financial_account: string;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "treasury.outbound_transfer";
  readonly returned_details?: Stripetreasury_outbound_transfers_resource_returned_details | null;
  readonly statement_descriptor: string;
  readonly status: "canceled" | "failed" | "posted" | "processing" | "returned";
  readonly status_transitions: Stripetreasury_outbound_transfers_resource_status_transitions;
  readonly tracking_details?: Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details | null;
  readonly transaction: string | Stripetreasury_transaction;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfers_resource_returned_details = {
  readonly code:
    | "account_closed"
    | "account_frozen"
    | "bank_account_restricted"
    | "bank_ownership_changed"
    | "declined"
    | "incorrect_account_holder_name"
    | "invalid_account_number"
    | "invalid_currency"
    | "no_account"
    | "other";
  readonly transaction: string | Stripetreasury_transaction;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payment = {
  readonly amount: number;
  readonly cancelable: boolean;
  readonly created: number;
  readonly currency: string;
  readonly customer?: string | null;
  readonly description?: string | null;
  readonly destination_payment_method?: string | null;
  readonly destination_payment_method_details?: Stripeoutbound_payments_payment_method_details | null;
  readonly end_user_details?: Stripetreasury_outbound_payments_resource_outbound_payment_resource_end_user_details | null;
  readonly expected_arrival_date: number;
  readonly financial_account: string;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "treasury.outbound_payment";
  readonly returned_details?: Stripetreasury_outbound_payments_resource_returned_status | null;
  readonly statement_descriptor: string;
  readonly status: "canceled" | "failed" | "posted" | "processing" | "returned";
  readonly status_transitions: Stripetreasury_outbound_payments_resource_outbound_payment_resource_status_transitions;
  readonly tracking_details?: Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details | null;
  readonly transaction: string | Stripetreasury_transaction;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payments_resource_returned_status = {
  readonly code:
    | "account_closed"
    | "account_frozen"
    | "bank_account_restricted"
    | "bank_ownership_changed"
    | "declined"
    | "incorrect_account_holder_name"
    | "invalid_account_number"
    | "invalid_currency"
    | "no_account"
    | "other";
  readonly transaction: string | Stripetreasury_transaction;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_credit_reversal = {
  readonly amount: number;
  readonly created: number;
  readonly currency: string;
  readonly financial_account: string;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly network: "ach" | "stripe";
  readonly object: "treasury.credit_reversal";
  readonly received_credit: string;
  readonly status: "canceled" | "posted" | "processing";
  readonly status_transitions: Stripetreasury_received_credits_resource_status_transitions;
  readonly transaction?: string | Stripetreasury_transaction | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_inbound_transfer = {
  readonly amount: number;
  readonly cancelable: boolean;
  readonly created: number;
  readonly currency: string;
  readonly description?: string | null;
  readonly failure_details?: Stripetreasury_inbound_transfers_resource_failure_details | null;
  readonly financial_account: string;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly linked_flows: Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly object: "treasury.inbound_transfer";
  readonly origin_payment_method?: string | null;
  readonly origin_payment_method_details?: Stripeinbound_transfers | null;
  readonly returned?: boolean | null;
  readonly statement_descriptor: string;
  readonly status: "canceled" | "failed" | "processing" | "succeeded";
  readonly status_transitions: Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions;
  readonly transaction?: string | Stripetreasury_transaction | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_debit_reversal = {
  readonly amount: number;
  readonly created: number;
  readonly currency: string;
  readonly financial_account?: string | null;
  readonly hosted_regulatory_receipt_url?: string | null;
  readonly id: string;
  readonly linked_flows?: Stripetreasury_received_debits_resource_debit_reversal_linked_flows | null;
  readonly livemode: boolean;
  readonly metadata: { readonly [x: string]: string };
  readonly network: "ach" | "card";
  readonly object: "treasury.debit_reversal";
  readonly received_debit: string;
  readonly status: "failed" | "processing" | "succeeded";
  readonly status_transitions: Stripetreasury_received_debits_resource_status_transitions;
  readonly transaction?: string | Stripetreasury_transaction | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_transaction_entry = {
  readonly balance_impact: Stripetreasury_transactions_resource_balance_impact;
  readonly created: number;
  readonly currency: string;
  readonly effective_at: number;
  readonly financial_account: string;
  readonly flow?: string | null;
  readonly flow_details?: Stripetreasury_transactions_resource_flow_details | null;
  readonly flow_type:
    | "credit_reversal"
    | "debit_reversal"
    | "inbound_transfer"
    | "issuing_authorization"
    | "other"
    | "outbound_payment"
    | "outbound_transfer"
    | "received_credit"
    | "received_debit";
  readonly id: string;
  readonly livemode: boolean;
  readonly object: "treasury.transaction_entry";
  readonly transaction: string | Stripetreasury_transaction;
  readonly type:
    | "credit_reversal"
    | "credit_reversal_posting"
    | "debit_reversal"
    | "inbound_transfer"
    | "inbound_transfer_return"
    | "issuing_authorization_hold"
    | "issuing_authorization_release"
    | "other"
    | "outbound_payment"
    | "outbound_payment_cancellation"
    | "outbound_payment_failure"
    | "outbound_payment_posting"
    | "outbound_payment_return"
    | "outbound_transfer"
    | "outbound_transfer_cancellation"
    | "outbound_transfer_failure"
    | "outbound_transfer_posting"
    | "outbound_transfer_return"
    | "received_credit"
    | "received_debit";
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_credits_resource_status_transitions = {
  readonly posted_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_transactions_resource_balance_impact = {
  readonly cash: number;
  readonly inbound_pending: number;
  readonly outbound_pending: number;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_debits_resource_debit_reversal_linked_flows =
  { readonly issuing_dispute?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetreasury_received_debits_resource_status_transitions = {
  readonly completed_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_inbound_transfers_resource_failure_details = {
  readonly code:
    | "account_closed"
    | "account_frozen"
    | "bank_account_restricted"
    | "bank_ownership_changed"
    | "debit_not_authorized"
    | "incorrect_account_holder_address"
    | "incorrect_account_holder_name"
    | "incorrect_account_holder_tax_id"
    | "insufficient_funds"
    | "invalid_account_number"
    | "invalid_currency"
    | "no_account"
    | "other";
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows =
  { readonly received_debit?: string | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions =
  {
    readonly canceled_at?: number | null;
    readonly failed_at?: number | null;
    readonly succeeded_at?: number | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payments_resource_outbound_payment_resource_end_user_details =
  { readonly ip_address?: string | null; readonly present: boolean } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetreasury_outbound_payments_resource_outbound_payment_resource_status_transitions =
  {
    readonly canceled_at?: number | null;
    readonly failed_at?: number | null;
    readonly posted_at?: number | null;
    readonly returned_at?: number | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payments_resource_ach_tracking_details = {
  readonly trace_id: string;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payments_resource_us_domestic_wire_tracking_details =
  {
    readonly chips?: string | null;
    readonly imad?: string | null;
    readonly omad?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfers_resource_status_transitions = {
  readonly canceled_at?: number | null;
  readonly failed_at?: number | null;
  readonly posted_at?: number | null;
  readonly returned_at?: number | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfers_resource_ach_tracking_details = {
  readonly trace_id: string;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfers_resource_us_domestic_wire_tracking_details =
  {
    readonly chips?: string | null;
    readonly imad?: string | null;
    readonly omad?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_shared_resource_initiating_payment_method_details_us_bank_account =
  {
    readonly bank_name?: string | null;
    readonly last4?: string | null;
    readonly routing_number?: string | null;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_credits_resource_reversal_details = {
  readonly deadline?: number | null;
  readonly restricted_reason?:
    | "already_reversed"
    | "deadline_passed"
    | "network_restricted"
    | "other"
    | "source_flow_restricted"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_debits_resource_linked_flows = {
  readonly debit_reversal?: string | null;
  readonly inbound_transfer?: string | null;
  readonly issuing_authorization?: string | null;
  readonly issuing_transaction?: string | null;
  readonly payout?: string | null;
  readonly topup?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_received_debits_resource_reversal_details = {
  readonly deadline?: number | null;
  readonly restricted_reason?:
    | "already_reversed"
    | "deadline_passed"
    | "network_restricted"
    | "other"
    | "source_flow_restricted"
    | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_transactions_resource_abstract_transaction_resource_status_transitions =
  { readonly posted_at?: number | null; readonly void_at?: number | null } & {
    readonly [x: string]: Schema.Json;
  };
export type Stripetreasury_financial_accounts_resource_balance = {
  readonly cash: { readonly [x: string]: number };
  readonly inbound_pending: { readonly [x: string]: number };
  readonly outbound_pending: { readonly [x: string]: number };
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_toggles_setting_status_details =
  {
    readonly code:
      | "activating"
      | "capability_not_requested"
      | "financial_account_closed"
      | "rejected_other"
      | "rejected_unsupported_business"
      | "requirements_past_due"
      | "requirements_pending_verification"
      | "restricted_by_platform"
      | "restricted_other";
    readonly resolution?:
      | "contact_stripe"
      | "provide_information"
      | "remove_restriction"
      | null;
    readonly restriction?: "inbound_flows" | "outbound_flows";
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_aba_record = {
  readonly account_holder_name: string;
  readonly account_number?: string | null;
  readonly account_number_last4: string;
  readonly bank_name: string;
  readonly routing_number: string;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_platform_restrictions = {
  readonly inbound_flows?: "restricted" | "unrestricted" | null;
  readonly outbound_flows?: "restricted" | "unrestricted" | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_closed_status_details = {
  readonly reasons: ReadonlyArray<
    "account_rejected" | "closed_by_platform" | "other"
  >;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_shared_resource_billing_details = {
  readonly address: Stripeaddress;
  readonly email?: string | null;
  readonly name?: string | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details =
  {
    readonly ach?: Stripetreasury_outbound_payments_resource_ach_tracking_details;
    readonly type: "ach" | "us_domestic_wire";
    readonly us_domestic_wire?: Stripetreasury_outbound_payments_resource_us_domestic_wire_tracking_details;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details =
  {
    readonly ach?: Stripetreasury_outbound_transfers_resource_ach_tracking_details;
    readonly type: "ach" | "us_domestic_wire";
    readonly us_domestic_wire?: Stripetreasury_outbound_transfers_resource_us_domestic_wire_tracking_details;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_toggle_settings = {
  readonly requested: boolean;
  readonly status: "active" | "pending" | "restricted";
  readonly status_details: ReadonlyArray<Stripetreasury_financial_accounts_resource_toggles_setting_status_details>;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_aba_toggle_settings = {
  readonly requested: boolean;
  readonly status: "active" | "pending" | "restricted";
  readonly status_details: ReadonlyArray<Stripetreasury_financial_accounts_resource_toggles_setting_status_details>;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings =
  {
    readonly requested: boolean;
    readonly status: "active" | "pending" | "restricted";
    readonly status_details: ReadonlyArray<Stripetreasury_financial_accounts_resource_toggles_setting_status_details>;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings =
  {
    readonly requested: boolean;
    readonly status: "active" | "pending" | "restricted";
    readonly status_details: ReadonlyArray<Stripetreasury_financial_accounts_resource_toggles_setting_status_details>;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_financial_address = {
  readonly aba?: Stripetreasury_financial_accounts_resource_aba_record;
  readonly supported_networks?: ReadonlyArray<
    "ach" | "rtp" | "us_domestic_wire"
  >;
  readonly type: "aba";
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_status_details = {
  readonly closed?: Stripetreasury_financial_accounts_resource_closed_status_details | null;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details =
  {
    readonly balance?: "payments";
    readonly billing_details: Stripetreasury_shared_resource_billing_details;
    readonly financial_account?: Stripereceived_payment_method_details_financial_account;
    readonly issuing_card?: string;
    readonly type:
      | "balance"
      | "financial_account"
      | "issuing_card"
      | "stripe"
      | "us_bank_account";
    readonly us_bank_account?: Stripetreasury_shared_resource_initiating_payment_method_details_us_bank_account;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_financial_addresses_features =
  {
    readonly aba?: Stripetreasury_financial_accounts_resource_aba_toggle_settings;
  } & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_inbound_transfers = {
  readonly ach?: Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_outbound_payments = {
  readonly ach?: Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings;
  readonly us_domestic_wire?: Stripetreasury_financial_accounts_resource_toggle_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_accounts_resource_outbound_transfers = {
  readonly ach?: Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings;
  readonly us_domestic_wire?: Stripetreasury_financial_accounts_resource_toggle_settings;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_account_features = {
  readonly card_issuing?: Stripetreasury_financial_accounts_resource_toggle_settings;
  readonly deposit_insurance?: Stripetreasury_financial_accounts_resource_toggle_settings;
  readonly financial_addresses?: Stripetreasury_financial_accounts_resource_financial_addresses_features;
  readonly inbound_transfers?: Stripetreasury_financial_accounts_resource_inbound_transfers;
  readonly intra_stripe_flows?: Stripetreasury_financial_accounts_resource_toggle_settings;
  readonly object: "treasury.financial_account_features";
  readonly outbound_payments?: Stripetreasury_financial_accounts_resource_outbound_payments;
  readonly outbound_transfers?: Stripetreasury_financial_accounts_resource_outbound_transfers;
} & { readonly [x: string]: Schema.Json };
export type Stripetreasury_financial_account = {
  readonly active_features?: ReadonlyArray<
    | "card_issuing"
    | "deposit_insurance"
    | "financial_addresses.aba"
    | "financial_addresses.aba.forwarding"
    | "inbound_transfers.ach"
    | "intra_stripe_flows"
    | "outbound_payments.ach"
    | "outbound_payments.us_domestic_wire"
    | "outbound_transfers.ach"
    | "outbound_transfers.us_domestic_wire"
    | "remote_deposit_capture"
  >;
  readonly balance: Stripetreasury_financial_accounts_resource_balance;
  readonly country: string;
  readonly created: number;
  readonly features?: Stripetreasury_financial_account_features;
  readonly financial_addresses: ReadonlyArray<Stripetreasury_financial_accounts_resource_financial_address>;
  readonly id: string;
  readonly is_default?: boolean;
  readonly livemode: boolean;
  readonly metadata?: { readonly [x: string]: string } | null;
  readonly nickname?: string | null;
  readonly object: "treasury.financial_account";
  readonly pending_features?: ReadonlyArray<
    | "card_issuing"
    | "deposit_insurance"
    | "financial_addresses.aba"
    | "financial_addresses.aba.forwarding"
    | "inbound_transfers.ach"
    | "intra_stripe_flows"
    | "outbound_payments.ach"
    | "outbound_payments.us_domestic_wire"
    | "outbound_transfers.ach"
    | "outbound_transfers.us_domestic_wire"
    | "remote_deposit_capture"
  >;
  readonly platform_restrictions?: Stripetreasury_financial_accounts_resource_platform_restrictions | null;
  readonly restricted_features?: ReadonlyArray<
    | "card_issuing"
    | "deposit_insurance"
    | "financial_addresses.aba"
    | "financial_addresses.aba.forwarding"
    | "inbound_transfers.ach"
    | "intra_stripe_flows"
    | "outbound_payments.ach"
    | "outbound_payments.us_domestic_wire"
    | "outbound_transfers.ach"
    | "outbound_transfers.us_domestic_wire"
    | "remote_deposit_capture"
  >;
  readonly status: "closed" | "open";
  readonly status_details: Stripetreasury_financial_accounts_resource_status_details;
  readonly supported_currencies: ReadonlyArray<string>;
} & { readonly [x: string]: Schema.Json };

export const Stripetreasury_transaction = Schema.suspend(
  (): Schema.Codec<Stripetreasury_transaction> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        balance_impact: Stripetreasury_transactions_resource_balance_impact,
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
        description: Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        entries: Schema.optionalKey(
          Schema.Union([
            Schema.StructWithRest(
              Schema.Struct({
                data: Schema.Array(
                  Schema.suspend(
                    (): Schema.Codec<Stripetreasury_transaction_entry> =>
                      Stripetreasury_transaction_entry,
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
                })
                  .check(
                    Schema.isMaxCodePoints(5000).annotate({
                      expected: "a string with at most 5000 code points",
                    }),
                  )
                  .check(
                    Schema.isPattern(
                      new globalThis.RegExp(
                        "^\\/v1\\/treasury\\/transaction_entries",
                        "u",
                      ),
                    ).annotate({
                      expected:
                        "a string matching the RegExp ^\\/v1\\/treasury\\/transaction_entries",
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
              title: "TreasuryTransactionsResourceTransactionEntryList",
              description:
                "A list of TransactionEntries that are part of this Transaction. This cannot be expanded in any list endpoints.",
            }),
            Schema.Null,
          ]),
        ),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount associated with this object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        flow: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "ID of the flow that created the Transaction.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        flow_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transactions_resource_flow_details> =>
                  Stripetreasury_transactions_resource_flow_details,
              ),
            ]).annotate({
              description: "Details of the flow that created the Transaction.",
            }),
            Schema.Null,
          ]),
        ),
        flow_type: Schema.Literals([
          "credit_reversal",
          "debit_reversal",
          "inbound_transfer",
          "issuing_authorization",
          "other",
          "outbound_payment",
          "outbound_transfer",
          "received_credit",
          "received_debit",
        ]).annotate({
          description: "Type of the flow that created the Transaction.",
        }),
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
        object: Schema.Literal("treasury.transaction").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        status: Schema.Literals(["open", "posted", "void"]).annotate({
          description: "Status of the Transaction.",
        }),
        status_transitions:
          Stripetreasury_transactions_resource_abstract_transaction_resource_status_transitions,
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Transaction",
      description:
        "Legacy Transactions are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Transactions](https://docs.stripe.com/api/v2/money-management/transactions) instead of building a new v1 integration.\n\nTransactions represent changes to a [FinancialAccount's](https://docs.stripe.com/api#financial_accounts) balance.",
      identifier: "Stripetreasury.transaction",
    }),
);
export const Stripetreasury_transactions_resource_flow_details =
  Schema.StructWithRest(
    Schema.Struct({
      credit_reversal: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_credit_reversal> =>
            Stripetreasury_credit_reversal,
        ),
      ),
      debit_reversal: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_debit_reversal> =>
            Stripetreasury_debit_reversal,
        ),
      ),
      inbound_transfer: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_inbound_transfer> =>
            Stripetreasury_inbound_transfer,
        ),
      ),
      issuing_authorization: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripeissuing_authorization> =>
            Stripeissuing_authorization,
        ),
      ),
      outbound_payment: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_outbound_payment> =>
            Stripetreasury_outbound_payment,
        ),
      ),
      outbound_transfer: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_outbound_transfer> =>
            Stripetreasury_outbound_transfer,
        ),
      ),
      received_credit: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_received_credit> =>
            Stripetreasury_received_credit,
        ),
      ),
      received_debit: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_received_debit> =>
            Stripetreasury_received_debit,
        ),
      ),
      type: Schema.Literals([
        "credit_reversal",
        "debit_reversal",
        "inbound_transfer",
        "issuing_authorization",
        "other",
        "outbound_payment",
        "outbound_transfer",
        "received_credit",
        "received_debit",
      ]).annotate({
        description:
          "Type of the flow that created the Transaction. Set to the same value as `flow_type`.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryTransactionsResourceFlowDetails",
    description: "",
    identifier: "Stripetreasury_transactions_resource_flow_details",
  });
export const Stripetreasury_received_debit = Schema.suspend(
  (): Schema.Codec<Stripetreasury_received_debit> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        description: Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        failure_code: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "account_closed",
              "account_frozen",
              "insufficient_funds",
              "international_transaction",
              "other",
            ]).annotate({
              description:
                "Reason for the failure. A ReceivedDebit might fail because the FinancialAccount doesn't have sufficient funds, is closed, or is frozen.",
            }),
            Schema.Null,
          ]),
        ),
        financial_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The FinancialAccount that funds were pulled from.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        initiating_payment_method_details: Schema.optionalKey(
          Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details,
        ),
        linked_flows: Stripetreasury_received_debits_resource_linked_flows,
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        network: Schema.Literals(["ach", "card", "stripe"]).annotate({
          description: "The network used for the ReceivedDebit.",
        }),
        object: Schema.Literal("treasury.received_debit").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        reversal_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_received_debits_resource_reversal_details,
            ]).annotate({
              description:
                "Details describing when a ReceivedDebit might be reversed.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["failed", "succeeded"]).annotate({
          description:
            "Status of the ReceivedDebit. ReceivedDebits are created with a status of either `succeeded` (approved) or `failed` (declined). The failure reason can be found under the `failure_code`.",
        }),
        transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transaction> =>
                  Stripetreasury_transaction,
              ),
            ]).annotate({
              description: "The Transaction associated with this object.",
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
      title: "ReceivedDebit",
      description:
        "Legacy ReceivedDebits are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Received Debits](https://docs.stripe.com/api/v2/money-management/received-debits?api-version=preview) instead of building a new v1 integration.\n\nReceivedDebits represent funds pulled from a [FinancialAccount](https://docs.stripe.com/api#financial_accounts). These are not initiated from the FinancialAccount.",
      identifier: "Stripetreasury.received_debit",
    }),
);
export const Stripetreasury_received_credit = Schema.suspend(
  (): Schema.Codec<Stripetreasury_received_credit> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        description: Schema.String.annotate({
          description:
            "An arbitrary string attached to the object. Often useful for displaying to users.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        failure_code: Schema.optionalKey(
          Schema.Union([
            Schema.Literals([
              "account_closed",
              "account_frozen",
              "international_transaction",
              "other",
            ]).annotate({
              description:
                "Reason for the failure. A ReceivedCredit might fail because the receiving FinancialAccount is closed or frozen.",
            }),
            Schema.Null,
          ]),
        ),
        financial_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The FinancialAccount that received the funds.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        initiating_payment_method_details:
          Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details,
        linked_flows: Schema.suspend(
          (): Schema.Codec<Stripetreasury_received_credits_resource_linked_flows> =>
            Stripetreasury_received_credits_resource_linked_flows,
        ),
        livemode: Schema.Boolean.annotate({
          description:
            "If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.",
        }),
        network: Schema.Literals([
          "ach",
          "card",
          "rtp",
          "stripe",
          "us_domestic_wire",
        ]).annotate({ description: "The rails used to send the funds." }),
        object: Schema.Literal("treasury.received_credit").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        reversal_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_received_credits_resource_reversal_details,
            ]).annotate({
              description:
                "Details describing when a ReceivedCredit may be reversed.",
            }),
            Schema.Null,
          ]),
        ),
        status: Schema.Literals(["failed", "succeeded"]).annotate({
          description:
            "Status of the ReceivedCredit. ReceivedCredits are created either `succeeded` (approved) or `failed` (declined). If a ReceivedCredit is declined, the failure reason can be found in the `failure_code` field.",
        }),
        transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transaction> =>
                  Stripetreasury_transaction,
              ),
            ]).annotate({
              description: "The Transaction associated with this object.",
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
      title: "ReceivedCredit",
      description:
        "Legacy ReceivedCredits are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Received Credits](https://docs.stripe.com/api/v2/money-management/received-credits?api-version=preview) instead of building a new v1 integration.\n\nReceivedCredits represent funds sent to a [FinancialAccount](https://docs.stripe.com/api#financial_accounts) (for example, via ACH or wire). These money movements are not initiated from the FinancialAccount.",
      identifier: "Stripetreasury.received_credit",
    }),
);
export const Stripetreasury_received_credits_resource_linked_flows =
  Schema.StructWithRest(
    Schema.Struct({
      credit_reversal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The CreditReversal created as a result of this ReceivedCredit being reversed.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      issuing_authorization: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedCredit was created due to an [Issuing Authorization](https://docs.stripe.com/api#issuing_authorizations) object.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      issuing_transaction: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedCredit is also viewable as an [Issuing transaction](https://docs.stripe.com/api#issuing_transactions) object.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      source_flow: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "ID of the source flow. Set if `network` is `stripe` and the source flow is visible to the user. Examples of source flows include OutboundPayments, payouts, or CreditReversals.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      source_flow_details: Schema.optionalKey(
        Schema.Union([
          Schema.Union([
            Schema.suspend(
              (): Schema.Codec<Stripetreasury_received_credits_resource_source_flows_details> =>
                Stripetreasury_received_credits_resource_source_flows_details,
            ),
          ]).annotate({
            description: "The expandable object of the source flow.",
          }),
          Schema.Null,
        ]),
      ),
      source_flow_type: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The type of flow that originated the ReceivedCredit (for example, `outbound_payment`).",
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
    title: "TreasuryReceivedCreditsResourceLinkedFlows",
    description: "",
    identifier: "Stripetreasury_received_credits_resource_linked_flows",
  });
export const Stripetreasury_received_credits_resource_source_flows_details =
  Schema.StructWithRest(
    Schema.Struct({
      credit_reversal: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_credit_reversal> =>
            Stripetreasury_credit_reversal,
        ),
      ),
      outbound_payment: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_outbound_payment> =>
            Stripetreasury_outbound_payment,
        ),
      ),
      outbound_transfer: Schema.optionalKey(
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_outbound_transfer> =>
            Stripetreasury_outbound_transfer,
        ),
      ),
      payout: Schema.optionalKey(
        Schema.suspend((): Schema.Codec<Stripepayout> => Stripepayout),
      ),
      type: Schema.Literals([
        "credit_reversal",
        "other",
        "outbound_payment",
        "outbound_transfer",
        "payout",
      ]).annotate({
        description:
          "The type of the source flow that originated the ReceivedCredit.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryReceivedCreditsResourceSourceFlowsDetails",
    description: "",
    identifier: "Stripetreasury_received_credits_resource_source_flows_details",
  });
export const Stripetreasury_outbound_transfer = Schema.suspend(
  (): Schema.Codec<Stripetreasury_outbound_transfer> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        cancelable: Schema.Boolean.annotate({
          description:
            "Returns `true` if the object can be canceled, and `false` otherwise.",
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
        destination_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The PaymentMethod used as the payment instrument for an OutboundTransfer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        destination_payment_method_details:
          Stripeoutbound_transfers_payment_method_details,
        expected_arrival_date: Schema.Number.annotate({
          description:
            "The date when funds are expected to arrive in the destination account.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount that funds were pulled from.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        object: Schema.Literal("treasury.outbound_transfer").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        returned_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_outbound_transfers_resource_returned_details> =>
                  Stripetreasury_outbound_transfers_resource_returned_details,
              ),
            ]).annotate({
              description:
                "Details about a returned OutboundTransfer. Only set when the status is `returned`.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.String.annotate({
          description:
            "Information about the OutboundTransfer to be sent to the recipient account.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals([
          "canceled",
          "failed",
          "posted",
          "processing",
          "returned",
        ]).annotate({
          description:
            'Current status of the OutboundTransfer: `processing`, `failed`, `canceled`, `posted`, `returned`. An OutboundTransfer is `processing` if it has been created and is pending. The status changes to `posted` once the OutboundTransfer has been "confirmed" and funds have left the account, or to `failed` or `canceled`. If an OutboundTransfer fails to arrive at its destination, its status will change to `returned`.',
        }),
        status_transitions:
          Stripetreasury_outbound_transfers_resource_status_transitions,
        tracking_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details,
            ]).annotate({
              description:
                "Details about network-specific tracking information if available.",
            }),
            Schema.Null,
          ]),
        ),
        transaction: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripetreasury_transaction> =>
              Stripetreasury_transaction,
          ),
        ]).annotate({
          description: "The Transaction associated with this object.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "OutboundTransfer",
      description:
        "Legacy OutboundTransfers are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Outbound Transfers](https://docs.stripe.com/api/v2/money-management/outbound-transfers?api-version=preview) instead of building a new v1 integration.\n\nUse [OutboundTransfers](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/out-of/outbound-transfers) to transfer funds from a [FinancialAccount](https://docs.stripe.com/api#financial_accounts) to a PaymentMethod belonging to the same entity. To send funds to a different party, use [OutboundPayments](https://docs.stripe.com/api#outbound_payments) instead. You can send funds over ACH rails or through a domestic wire transfer to a user's own external bank account.\n\nSimulate OutboundTransfer state changes with the `/v1/test_helpers/treasury/outbound_transfers` endpoints. These methods can only be called on test mode objects.\n\nRelated guide: [Moving money with Treasury using OutboundTransfer objects](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/out-of/outbound-transfers)",
      identifier: "Stripetreasury.outbound_transfer",
    }),
);
export const Stripetreasury_outbound_transfers_resource_returned_details =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.Literals([
        "account_closed",
        "account_frozen",
        "bank_account_restricted",
        "bank_ownership_changed",
        "declined",
        "incorrect_account_holder_name",
        "invalid_account_number",
        "invalid_currency",
        "no_account",
        "other",
      ]).annotate({ description: "Reason for the return." }),
      transaction: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_transaction> =>
            Stripetreasury_transaction,
        ),
      ]).annotate({
        description: "The Transaction associated with this object.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryOutboundTransfersResourceReturnedDetails",
    description: "",
    identifier: "Stripetreasury_outbound_transfers_resource_returned_details",
  });
export const Stripetreasury_outbound_payment = Schema.suspend(
  (): Schema.Codec<Stripetreasury_outbound_payment> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        cancelable: Schema.Boolean.annotate({
          description:
            "Returns `true` if the object can be canceled, and `false` otherwise.",
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
            Schema.String.annotate({
              description:
                "ID of the [customer](https://docs.stripe.com/api/customers) to whom an OutboundPayment is sent.",
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
        destination_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The PaymentMethod via which an OutboundPayment is sent. This field can be empty if the OutboundPayment was created using `destination_payment_method_data`.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        destination_payment_method_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripeoutbound_payments_payment_method_details,
            ]).annotate({
              description:
                "Details about the PaymentMethod for an OutboundPayment.",
            }),
            Schema.Null,
          ]),
        ),
        end_user_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_outbound_payments_resource_outbound_payment_resource_end_user_details,
            ]).annotate({ description: "Details about the end user." }),
            Schema.Null,
          ]),
        ),
        expected_arrival_date: Schema.Number.annotate({
          description:
            "The date when funds are expected to arrive in the destination account.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount that funds were pulled from.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        object: Schema.Literal("treasury.outbound_payment").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        returned_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_outbound_payments_resource_returned_status> =>
                  Stripetreasury_outbound_payments_resource_returned_status,
              ),
            ]).annotate({
              description:
                "Details about a returned OutboundPayment. Only set when the status is `returned`.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.String.annotate({
          description:
            "The description that appears on the receiving end for an OutboundPayment (for example, bank statement for external bank transfer).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals([
          "canceled",
          "failed",
          "posted",
          "processing",
          "returned",
        ]).annotate({
          description:
            'Current status of the OutboundPayment: `processing`, `failed`, `posted`, `returned`, `canceled`. An OutboundPayment is `processing` if it has been created and is pending. The status changes to `posted` once the OutboundPayment has been "confirmed" and funds have left the account, or to `failed` or `canceled`. If an OutboundPayment fails to arrive at its destination, its status will change to `returned`.',
        }),
        status_transitions:
          Stripetreasury_outbound_payments_resource_outbound_payment_resource_status_transitions,
        tracking_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details,
            ]).annotate({
              description:
                "Details about network-specific tracking information if available.",
            }),
            Schema.Null,
          ]),
        ),
        transaction: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripetreasury_transaction> =>
              Stripetreasury_transaction,
          ),
        ]).annotate({
          description: "The Transaction associated with this object.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "Outbound Payment",
      description:
        "Legacy OutboundPayments are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Outbound Payments](https://docs.stripe.com/api/v2/money-management/outbound-payments) instead of building a new v1 integration.\n\nUse [OutboundPayments](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/out-of/outbound-payments) to send funds to another party's external bank account or [FinancialAccount](https://docs.stripe.com/api#financial_accounts). To send money to an account belonging to the same user, use an [OutboundTransfer](https://docs.stripe.com/api#outbound_transfers).\n\nSimulate OutboundPayment state changes with the `/v1/test_helpers/treasury/outbound_payments` endpoints. These methods can only be called on test mode objects.\n\nRelated guide: [Moving money with Treasury using OutboundPayment objects](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/out-of/outbound-payments)",
      identifier: "Stripetreasury.outbound_payment",
    }),
);
export const Stripetreasury_outbound_payments_resource_returned_status =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.Literals([
        "account_closed",
        "account_frozen",
        "bank_account_restricted",
        "bank_ownership_changed",
        "declined",
        "incorrect_account_holder_name",
        "invalid_account_number",
        "invalid_currency",
        "no_account",
        "other",
      ]).annotate({ description: "Reason for the return." }),
      transaction: Schema.Union([
        Schema.String.check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        Schema.suspend(
          (): Schema.Codec<Stripetreasury_transaction> =>
            Stripetreasury_transaction,
        ),
      ]).annotate({
        description: "The Transaction associated with this object.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryOutboundPaymentsResourceReturnedStatus",
    description: "",
    identifier: "Stripetreasury_outbound_payments_resource_returned_status",
  });
export const Stripetreasury_credit_reversal = Schema.suspend(
  (): Schema.Codec<Stripetreasury_credit_reversal> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount to reverse funds from.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        network: Schema.Literals(["ach", "stripe"]).annotate({
          description: "The rails used to reverse the funds.",
        }),
        object: Schema.Literal("treasury.credit_reversal").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        received_credit: Schema.String.annotate({
          description: "The ReceivedCredit being reversed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals(["canceled", "posted", "processing"]).annotate({
          description: "Status of the CreditReversal",
        }),
        status_transitions:
          Stripetreasury_received_credits_resource_status_transitions,
        transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transaction> =>
                  Stripetreasury_transaction,
              ),
            ]).annotate({
              description: "The Transaction associated with this object.",
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
      title: "CreditReversal",
      description:
        "Legacy CreditReversals are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Received Credits](https://docs.stripe.com/api/v2/money-management/received-credits?api-version=preview) instead of building a new v1 integration.\n\nYou can reverse some [ReceivedCredits](https://docs.stripe.com/api#received_credits) depending on their network and source flow. Reversing a ReceivedCredit leads to the creation of a new object known as a CreditReversal.",
      identifier: "Stripetreasury.credit_reversal",
    }),
);
export const Stripetreasury_inbound_transfer = Schema.suspend(
  (): Schema.Codec<Stripetreasury_inbound_transfer> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        cancelable: Schema.Boolean.annotate({
          description:
            "Returns `true` if the InboundTransfer is able to be canceled.",
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
        failure_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_inbound_transfers_resource_failure_details,
            ]).annotate({
              description:
                "Details about this InboundTransfer's failure. Will be set when `status=failed` or `returned=true`.",
            }),
            Schema.Null,
          ]),
        ),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount that received the funds.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        linked_flows:
          Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows,
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
        object: Schema.Literal("treasury.inbound_transfer").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        origin_payment_method: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "The origin payment method to be debited for an InboundTransfer.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        origin_payment_method_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([Stripeinbound_transfers]).annotate({
              description:
                "Details about the PaymentMethod for an InboundTransfer.",
            }),
            Schema.Null,
          ]),
        ),
        returned: Schema.optionalKey(
          Schema.Union([
            Schema.Boolean.annotate({
              description:
                "Returns `true` if the funds for an InboundTransfer were returned after the InboundTransfer went to the `succeeded` state.",
            }),
            Schema.Null,
          ]),
        ),
        statement_descriptor: Schema.String.annotate({
          description:
            "Statement descriptor shown when funds are debited from the source. Not all payment networks support `statement_descriptor`.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals([
          "canceled",
          "failed",
          "processing",
          "succeeded",
        ]).annotate({
          description:
            'Status of the InboundTransfer: `processing`, `succeeded`, `failed`, and `canceled`. An InboundTransfer is `processing` if it is created and pending. The status changes to `succeeded` once the funds have been "confirmed" and a `transaction` is created and posted. The status changes to `failed` if the transfer fails.',
        }),
        status_transitions:
          Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions,
        transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transaction> =>
                  Stripetreasury_transaction,
              ),
            ]).annotate({
              description: "The Transaction associated with this object.",
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
      title: "InboundTransfer",
      description:
        "Legacy InboundTransfers are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Inbound Transfers](https://docs.stripe.com/api/v2/money-management/inbound-transfers) instead of building a new v1 integration.\n\nUse [InboundTransfers](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/into/inbound-transfers) to add funds to your [FinancialAccount](https://docs.stripe.com/api#financial_accounts) via a PaymentMethod that is owned by you. The funds will be transferred via an ACH debit.\n\nRelated guide: [Moving money with Treasury using InboundTransfer objects](https://docs.stripe.com/docs/treasury/moving-money/financial-accounts/into/inbound-transfers)",
      identifier: "Stripetreasury.inbound_transfer",
    }),
);
export const Stripetreasury_debit_reversal = Schema.suspend(
  (): Schema.Codec<Stripetreasury_debit_reversal> =>
    Schema.StructWithRest(
      Schema.Struct({
        amount: Schema.Number.annotate({
          description: "Amount (in cents) transferred.",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
        financial_account: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The FinancialAccount to reverse funds from.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        hosted_regulatory_receipt_url: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "A [hosted transaction receipt](https://docs.stripe.com/treasury/moving-money/regulatory-receipts) URL that is provided when money movement is considered regulated under Stripe's money transmission licenses.",
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
        linked_flows: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_received_debits_resource_debit_reversal_linked_flows,
            ]).annotate({
              description: "Other flows linked to a DebitReversal.",
            }),
            Schema.Null,
          ]),
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
        network: Schema.Literals(["ach", "card"]).annotate({
          description: "The rails used to reverse the funds.",
        }),
        object: Schema.Literal("treasury.debit_reversal").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        received_debit: Schema.String.annotate({
          description: "The ReceivedDebit being reversed.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        status: Schema.Literals(["failed", "processing", "succeeded"]).annotate(
          { description: "Status of the DebitReversal" },
        ),
        status_transitions:
          Stripetreasury_received_debits_resource_status_transitions,
        transaction: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.String.check(
                Schema.isMaxCodePoints(5000).annotate({
                  expected: "a string with at most 5000 code points",
                }),
              ),
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transaction> =>
                  Stripetreasury_transaction,
              ),
            ]).annotate({
              description: "The Transaction associated with this object.",
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
      title: "DebitReversal",
      description:
        "Legacy DebitReversals are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect).\n\nYou can reverse some [ReceivedDebits](https://docs.stripe.com/api#received_debits) depending on their network and source flow. Reversing a ReceivedDebit leads to the creation of a new object known as a DebitReversal.",
      identifier: "Stripetreasury.debit_reversal",
    }),
);
export const Stripetreasury_transaction_entry = Schema.suspend(
  (): Schema.Codec<Stripetreasury_transaction_entry> =>
    Schema.StructWithRest(
      Schema.Struct({
        balance_impact: Stripetreasury_transactions_resource_balance_impact,
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
        effective_at: Schema.Number.annotate({
          description:
            "When the TransactionEntry will impact the FinancialAccount's balance.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        financial_account: Schema.String.annotate({
          description: "The FinancialAccount associated with this object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        flow: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description:
                "Token of the flow associated with the TransactionEntry.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        flow_details: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Schema.suspend(
                (): Schema.Codec<Stripetreasury_transactions_resource_flow_details> =>
                  Stripetreasury_transactions_resource_flow_details,
              ),
            ]).annotate({
              description:
                "Details of the flow associated with the TransactionEntry.",
            }),
            Schema.Null,
          ]),
        ),
        flow_type: Schema.Literals([
          "credit_reversal",
          "debit_reversal",
          "inbound_transfer",
          "issuing_authorization",
          "other",
          "outbound_payment",
          "outbound_transfer",
          "received_credit",
          "received_debit",
        ]).annotate({
          description: "Type of the flow associated with the TransactionEntry.",
        }),
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
        object: Schema.Literal("treasury.transaction_entry").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        transaction: Schema.Union([
          Schema.String.check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.suspend(
            (): Schema.Codec<Stripetreasury_transaction> =>
              Stripetreasury_transaction,
          ),
        ]).annotate({
          description: "The Transaction associated with this object.",
        }),
        type: Schema.Literals([
          "credit_reversal",
          "credit_reversal_posting",
          "debit_reversal",
          "inbound_transfer",
          "inbound_transfer_return",
          "issuing_authorization_hold",
          "issuing_authorization_release",
          "other",
          "outbound_payment",
          "outbound_payment_cancellation",
          "outbound_payment_failure",
          "outbound_payment_posting",
          "outbound_payment_return",
          "outbound_transfer",
          "outbound_transfer_cancellation",
          "outbound_transfer_failure",
          "outbound_transfer_posting",
          "outbound_transfer_return",
          "received_credit",
          "received_debit",
        ]).annotate({
          description:
            "The specific money movement that generated the TransactionEntry.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "TransactionEntry",
      description:
        "Legacy TransactionEntries are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Transaction Entries](https://docs.stripe.com/api/v2/money-management/transaction-entries) instead of building a new v1 integration.\n\nTransactionEntries represent individual units of money movements within a single [Transaction](https://docs.stripe.com/api#transactions).",
      identifier: "Stripetreasury.transaction_entry",
    }),
);
export const Stripetreasury_received_credits_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      posted_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when the CreditReversal changed status to `posted`",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "TreasuryReceivedCreditsResourceStatusTransitions",
    description: "",
    identifier: "Stripetreasury_received_credits_resource_status_transitions",
  });
export const Stripetreasury_transactions_resource_balance_impact =
  Schema.StructWithRest(
    Schema.Struct({
      cash: Schema.Number.annotate({
        description: "The change made to funds the user can spend right now.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      inbound_pending: Schema.Number.annotate({
        description:
          "The change made to funds that are not spendable yet, but will become available at a later time.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
      outbound_pending: Schema.Number.annotate({
        description:
          "The change made to funds in the account, but not spendable because they are being held for pending outbound flows.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BalanceImpactResource",
    description: "Change to a FinancialAccount's balance",
    identifier: "Stripetreasury_transactions_resource_balance_impact",
  });
export const Stripetreasury_received_debits_resource_debit_reversal_linked_flows =
  Schema.StructWithRest(
    Schema.Struct({
      issuing_dispute: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if there is an Issuing dispute associated with the DebitReversal.",
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
    title: "TreasuryReceivedDebitsResourceDebitReversalLinkedFlows",
    description: "",
    identifier:
      "Stripetreasury_received_debits_resource_debit_reversal_linked_flows",
  });
export const Stripetreasury_received_debits_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      completed_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when the DebitReversal changed status to `completed`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "TreasuryReceivedDebitsResourceStatusTransitions",
    description: "",
    identifier: "Stripetreasury_received_debits_resource_status_transitions",
  });
export const Stripetreasury_inbound_transfers_resource_failure_details =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.Literals([
        "account_closed",
        "account_frozen",
        "bank_account_restricted",
        "bank_ownership_changed",
        "debit_not_authorized",
        "incorrect_account_holder_address",
        "incorrect_account_holder_name",
        "incorrect_account_holder_tax_id",
        "insufficient_funds",
        "invalid_account_number",
        "invalid_currency",
        "no_account",
        "other",
      ]).annotate({ description: "Reason for the failure." }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryInboundTransfersResourceFailureDetails",
    description: "",
    identifier: "Stripetreasury_inbound_transfers_resource_failure_details",
  });
export const Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows =
  Schema.StructWithRest(
    Schema.Struct({
      received_debit: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "If funds for this flow were returned after the flow went to the `succeeded` state, this field contains a reference to the ReceivedDebit return.",
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
    title: "TreasuryInboundTransfersResourceInboundTransferResourceLinkedFlows",
    description: "",
    identifier:
      "Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_linked_flows",
  });
export const Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an InboundTransfer changed status to `canceled`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      failed_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an InboundTransfer changed status to `failed`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      succeeded_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an InboundTransfer changed status to `succeeded`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      "TreasuryInboundTransfersResourceInboundTransferResourceStatusTransitions",
    description: "",
    identifier:
      "Stripetreasury_inbound_transfers_resource_inbound_transfer_resource_status_transitions",
  });
export const Stripetreasury_outbound_payments_resource_outbound_payment_resource_end_user_details =
  Schema.StructWithRest(
    Schema.Struct({
      ip_address: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "IP address of the user initiating the OutboundPayment. Set if `present` is set to `true`. IP address collection is required for risk and compliance reasons. This will be used to help determine if the OutboundPayment is authorized or should be blocked.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      present: Schema.Boolean.annotate({
        description:
          "`true` if the OutboundPayment creation request is being made on behalf of an end user by a platform. Otherwise, `false`.",
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
      "TreasuryOutboundPaymentsResourceOutboundPaymentResourceEndUserDetails",
    description: "",
    identifier:
      "Stripetreasury_outbound_payments_resource_outbound_payment_resource_end_user_details",
  });
export const Stripetreasury_outbound_payments_resource_outbound_payment_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundPayment changed status to `canceled`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      failed_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundPayment changed status to `failed`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      posted_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundPayment changed status to `posted`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      returned_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundPayment changed status to `returned`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      "TreasuryOutboundPaymentsResourceOutboundPaymentResourceStatusTransitions",
    description: "",
    identifier:
      "Stripetreasury_outbound_payments_resource_outbound_payment_resource_status_transitions",
  });
export const Stripetreasury_outbound_payments_resource_ach_tracking_details =
  Schema.StructWithRest(
    Schema.Struct({
      trace_id: Schema.String.annotate({
        description:
          "ACH trace ID of the OutboundPayment for payments sent over the `ach` network.",
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
    title: "TreasuryOutboundPaymentsResourceACHTrackingDetails",
    description: "",
    identifier:
      "Stripetreasury_outbound_payments_resource_ach_tracking_details",
  });
export const Stripetreasury_outbound_payments_resource_us_domestic_wire_tracking_details =
  Schema.StructWithRest(
    Schema.Struct({
      chips: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "CHIPS System Sequence Number (SSN) of the OutboundPayment for payments sent over the `us_domestic_wire` network.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      imad: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "IMAD of the OutboundPayment for payments sent over the `us_domestic_wire` network.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      omad: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "OMAD of the OutboundPayment for payments sent over the `us_domestic_wire` network.",
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
    title: "TreasuryOutboundPaymentsResourceUSDomesticWireTrackingDetails",
    description: "",
    identifier:
      "Stripetreasury_outbound_payments_resource_us_domestic_wire_tracking_details",
  });
export const Stripetreasury_outbound_transfers_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      canceled_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundTransfer changed status to `canceled`",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      failed_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundTransfer changed status to `failed`",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      posted_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundTransfer changed status to `posted`",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      returned_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when an OutboundTransfer changed status to `returned`",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
    title: "TreasuryOutboundTransfersResourceStatusTransitions",
    description: "",
    identifier: "Stripetreasury_outbound_transfers_resource_status_transitions",
  });
export const Stripetreasury_outbound_transfers_resource_ach_tracking_details =
  Schema.StructWithRest(
    Schema.Struct({
      trace_id: Schema.String.annotate({
        description:
          "ACH trace ID of the OutboundTransfer for transfers sent over the `ach` network.",
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
    title: "TreasuryOutboundTransfersResourceACHTrackingDetails",
    description: "",
    identifier:
      "Stripetreasury_outbound_transfers_resource_ach_tracking_details",
  });
export const Stripetreasury_outbound_transfers_resource_us_domestic_wire_tracking_details =
  Schema.StructWithRest(
    Schema.Struct({
      chips: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "CHIPS System Sequence Number (SSN) of the OutboundTransfer for transfers sent over the `us_domestic_wire` network.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      imad: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "IMAD of the OutboundTransfer for transfers sent over the `us_domestic_wire` network.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      omad: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "OMAD of the OutboundTransfer for transfers sent over the `us_domestic_wire` network.",
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
    title: "TreasuryOutboundTransfersResourceUSDomesticWireTrackingDetails",
    description: "",
    identifier:
      "Stripetreasury_outbound_transfers_resource_us_domestic_wire_tracking_details",
  });
export const Stripetreasury_shared_resource_initiating_payment_method_details_us_bank_account =
  Schema.StructWithRest(
    Schema.Struct({
      bank_name: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "Bank name." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      last4: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The last four digits of the bank account number.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      routing_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description: "The routing number for the bank account.",
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
    title: "TreasurySharedResourceInitiatingPaymentMethodDetailsUSBankAccount",
    description: "",
    identifier:
      "Stripetreasury_shared_resource_initiating_payment_method_details_us_bank_account",
  });
export const Stripetreasury_received_credits_resource_reversal_details =
  Schema.StructWithRest(
    Schema.Struct({
      deadline: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Time before which a ReceivedCredit can be reversed.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      restricted_reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "already_reversed",
            "deadline_passed",
            "network_restricted",
            "other",
            "source_flow_restricted",
          ]).annotate({
            description: "Set if a ReceivedCredit cannot be reversed.",
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
    title: "TreasuryReceivedCreditsResourceReversalDetails",
    description: "",
    identifier: "Stripetreasury_received_credits_resource_reversal_details",
  });
export const Stripetreasury_received_debits_resource_linked_flows =
  Schema.StructWithRest(
    Schema.Struct({
      debit_reversal: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "The DebitReversal created as a result of this ReceivedDebit being reversed.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      inbound_transfer: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedDebit is associated with an InboundTransfer's return of funds.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      issuing_authorization: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedDebit was created due to an [Issuing Authorization](https://docs.stripe.com/api#issuing_authorizations) object.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      issuing_transaction: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedDebit is also viewable as an [Issuing Dispute](https://docs.stripe.com/api#issuing_disputes) object.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      payout: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedDebit was created due to a [Payout](https://docs.stripe.com/api#payouts) object.",
          }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      topup: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({
            description:
              "Set if the ReceivedDebit was created due to a [Topup](https://docs.stripe.com/api#topups) object.",
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
    title: "TreasuryReceivedDebitsResourceLinkedFlows",
    description: "",
    identifier: "Stripetreasury_received_debits_resource_linked_flows",
  });
export const Stripetreasury_received_debits_resource_reversal_details =
  Schema.StructWithRest(
    Schema.Struct({
      deadline: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description: "Time before which a ReceivedDebit can be reversed.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      restricted_reason: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "already_reversed",
            "deadline_passed",
            "network_restricted",
            "other",
            "source_flow_restricted",
          ]).annotate({
            description: "Set if a ReceivedDebit can't be reversed.",
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
    title: "TreasuryReceivedDebitsResourceReversalDetails",
    description: "",
    identifier: "Stripetreasury_received_debits_resource_reversal_details",
  });
export const Stripetreasury_transactions_resource_abstract_transaction_resource_status_transitions =
  Schema.StructWithRest(
    Schema.Struct({
      posted_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when the Transaction changed status to `posted`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
          Schema.Null,
        ]),
      ),
      void_at: Schema.optionalKey(
        Schema.Union([
          Schema.Number.annotate({
            description:
              "Timestamp describing when the Transaction changed status to `void`.",
            format: "unix-time",
          }).check(Schema.isInt().annotate({ expected: "an integer" })),
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
      "TreasuryTransactionsResourceAbstractTransactionResourceStatusTransitions",
    description: "",
    identifier:
      "Stripetreasury_transactions_resource_abstract_transaction_resource_status_transitions",
  });
export const Stripetreasury_financial_accounts_resource_balance =
  Schema.StructWithRest(
    Schema.Struct({
      cash: Schema.Record(Schema.String, Schema.Int).annotate({
        description: "Funds the user can spend right now.",
      }),
      inbound_pending: Schema.Record(Schema.String, Schema.Int).annotate({
        description:
          "Funds not spendable yet, but will become available at a later time.",
      }),
      outbound_pending: Schema.Record(Schema.String, Schema.Int).annotate({
        description:
          "Funds in the account, but not spendable because they are being held for pending outbound flows.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "BalanceResource",
    description: "Balance information for the FinancialAccount",
    identifier: "Stripetreasury_financial_accounts_resource_balance",
  });
export const Stripetreasury_financial_accounts_resource_toggles_setting_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      code: Schema.Literals([
        "activating",
        "capability_not_requested",
        "financial_account_closed",
        "rejected_other",
        "rejected_unsupported_business",
        "requirements_past_due",
        "requirements_pending_verification",
        "restricted_by_platform",
        "restricted_other",
      ]).annotate({
        description:
          "Represents the reason why the status is `pending` or `restricted`.",
      }),
      resolution: Schema.optionalKey(
        Schema.Union([
          Schema.Literals([
            "contact_stripe",
            "provide_information",
            "remove_restriction",
          ]).annotate({
            description:
              "Represents what the user should do, if anything, to activate the Feature.",
          }),
          Schema.Null,
        ]),
      ),
      restriction: Schema.optionalKey(
        Schema.Literals(["inbound_flows", "outbound_flows"]).annotate({
          description:
            "The `platform_restrictions` that are restricting this Feature.",
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
    title: "StatusDetailsResource",
    description:
      "Additional details on the FinancialAccount Features information.",
    identifier:
      "Stripetreasury_financial_accounts_resource_toggles_setting_status_details",
  });
export const Stripetreasury_financial_accounts_resource_aba_record =
  Schema.StructWithRest(
    Schema.Struct({
      account_holder_name: Schema.String.annotate({
        description:
          "The name of the person or business that owns the bank account.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      account_number: Schema.optionalKey(
        Schema.Union([
          Schema.String.annotate({ description: "The account number." }).check(
            Schema.isMaxCodePoints(5000).annotate({
              expected: "a string with at most 5000 code points",
            }),
          ),
          Schema.Null,
        ]),
      ),
      account_number_last4: Schema.String.annotate({
        description: "The last four characters of the account number.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      bank_name: Schema.String.annotate({
        description: "Name of the bank.",
      }).check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      routing_number: Schema.String.annotate({
        description: "Routing number for the account.",
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
    title: "ABARecord",
    description:
      "ABA Records contain U.S. bank account details per the ABA format.",
    identifier: "Stripetreasury_financial_accounts_resource_aba_record",
  });
export const Stripetreasury_financial_accounts_resource_platform_restrictions =
  Schema.StructWithRest(
    Schema.Struct({
      inbound_flows: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["restricted", "unrestricted"]).annotate({
            description: "Restricts all inbound money movement.",
          }),
          Schema.Null,
        ]),
      ),
      outbound_flows: Schema.optionalKey(
        Schema.Union([
          Schema.Literals(["restricted", "unrestricted"]).annotate({
            description: "Restricts all outbound money movement.",
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
    title: "FinancialAccountPlatformRestriction",
    description:
      "Restrictions that a Connect Platform has placed on this FinancialAccount.",
    identifier:
      "Stripetreasury_financial_accounts_resource_platform_restrictions",
  });
export const Stripetreasury_financial_accounts_resource_closed_status_details =
  Schema.StructWithRest(
    Schema.Struct({
      reasons: Schema.Array(
        Schema.Literals(["account_rejected", "closed_by_platform", "other"]),
      ).annotate({
        description:
          "The array that contains reasons for a FinancialAccount closure.",
      }),
    }),
    [
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
    ],
  ).annotate({
    title: "TreasuryFinancialAccountsResourceClosedStatusDetails",
    description: "",
    identifier:
      "Stripetreasury_financial_accounts_resource_closed_status_details",
  });
export const Stripetreasury_shared_resource_billing_details = Schema.suspend(
  (): Schema.Codec<Stripetreasury_shared_resource_billing_details> =>
    Schema.StructWithRest(
      Schema.Struct({
        address: Stripeaddress,
        email: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Email address." }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        name: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({ description: "Full name." }).check(
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
      title: "TreasurySharedResourceBillingDetails",
      description: "",
      identifier: "Stripetreasury_shared_resource_billing_details",
    }),
);
export const Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Stripetreasury_outbound_payments_resource_ach_tracking_details,
          ),
          type: Schema.Literals(["ach", "us_domestic_wire"]).annotate({
            description: "The US bank account network used to send funds.",
          }),
          us_domestic_wire: Schema.optionalKey(
            Stripetreasury_outbound_payments_resource_us_domestic_wire_tracking_details,
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
          "TreasuryOutboundPaymentsResourceOutboundPaymentResourceTrackingDetails",
        description: "",
        identifier:
          "Stripetreasury_outbound_payments_resource_outbound_payment_resource_tracking_details",
      }),
  );
export const Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Stripetreasury_outbound_transfers_resource_ach_tracking_details,
          ),
          type: Schema.Literals(["ach", "us_domestic_wire"]).annotate({
            description: "The US bank account network used to send funds.",
          }),
          us_domestic_wire: Schema.optionalKey(
            Stripetreasury_outbound_transfers_resource_us_domestic_wire_tracking_details,
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
          "TreasuryOutboundTransfersResourceOutboundTransferResourceTrackingDetails",
        description: "",
        identifier:
          "Stripetreasury_outbound_transfers_resource_outbound_transfer_resource_tracking_details",
      }),
  );
export const Stripetreasury_financial_accounts_resource_toggle_settings =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_toggle_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          requested: Schema.Boolean.annotate({
            description:
              "Whether the FinancialAccount should have the Feature.",
          }),
          status: Schema.Literals(["active", "pending", "restricted"]).annotate(
            { description: "Whether the Feature is operational." },
          ),
          status_details: Schema.Array(
            Stripetreasury_financial_accounts_resource_toggles_setting_status_details,
          ).annotate({
            description:
              "Additional details; includes at least one entry when the status is not `active`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TreasuryFinancialAccountsResourceToggleSettings",
        description: "Toggle settings for enabling/disabling a feature",
        identifier:
          "Stripetreasury_financial_accounts_resource_toggle_settings",
      }),
  );
export const Stripetreasury_financial_accounts_resource_aba_toggle_settings =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_aba_toggle_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          requested: Schema.Boolean.annotate({
            description:
              "Whether the FinancialAccount should have the Feature.",
          }),
          status: Schema.Literals(["active", "pending", "restricted"]).annotate(
            { description: "Whether the Feature is operational." },
          ),
          status_details: Schema.Array(
            Stripetreasury_financial_accounts_resource_toggles_setting_status_details,
          ).annotate({
            description:
              "Additional details; includes at least one entry when the status is not `active`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TreasuryFinancialAccountsResourceAbaToggleSettings",
        description:
          "Toggle settings for enabling/disabling the ABA address feature",
        identifier:
          "Stripetreasury_financial_accounts_resource_aba_toggle_settings",
      }),
  );
export const Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          requested: Schema.Boolean.annotate({
            description:
              "Whether the FinancialAccount should have the Feature.",
          }),
          status: Schema.Literals(["active", "pending", "restricted"]).annotate(
            { description: "Whether the Feature is operational." },
          ),
          status_details: Schema.Array(
            Stripetreasury_financial_accounts_resource_toggles_setting_status_details,
          ).annotate({
            description:
              "Additional details; includes at least one entry when the status is not `active`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TreasuryFinancialAccountsResourceInboundAchToggleSettings",
        description:
          "Toggle settings for enabling/disabling an inbound ACH specific feature",
        identifier:
          "Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings",
      }),
  );
export const Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings> =>
      Schema.StructWithRest(
        Schema.Struct({
          requested: Schema.Boolean.annotate({
            description:
              "Whether the FinancialAccount should have the Feature.",
          }),
          status: Schema.Literals(["active", "pending", "restricted"]).annotate(
            { description: "Whether the Feature is operational." },
          ),
          status_details: Schema.Array(
            Stripetreasury_financial_accounts_resource_toggles_setting_status_details,
          ).annotate({
            description:
              "Additional details; includes at least one entry when the status is not `active`.",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "TreasuryFinancialAccountsResourceOutboundAchToggleSettings",
        description:
          "Toggle settings for enabling/disabling an outbound ACH specific feature",
        identifier:
          "Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings",
      }),
  );
export const Stripetreasury_financial_accounts_resource_financial_address =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_financial_address> =>
      Schema.StructWithRest(
        Schema.Struct({
          aba: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_aba_record,
          ),
          supported_networks: Schema.optionalKey(
            Schema.Array(
              Schema.Literals(["ach", "rtp", "us_domestic_wire"]),
            ).annotate({
              description: "The list of networks that the address supports",
            }),
          ),
          type: Schema.Literal("aba").annotate({
            description: "The type of financial address",
          }),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "FinancialAddress",
        description:
          "FinancialAddresses contain identifying information that resolves to a FinancialAccount.",
        identifier:
          "Stripetreasury_financial_accounts_resource_financial_address",
      }),
  );
export const Stripetreasury_financial_accounts_resource_status_details =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_status_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          closed: Schema.optionalKey(
            Schema.Union([
              Schema.Union([
                Stripetreasury_financial_accounts_resource_closed_status_details,
              ]).annotate({
                description:
                  "Details related to the closure of this FinancialAccount",
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
        title: "TreasuryFinancialAccountsResourceStatusDetails",
        description: "",
        identifier: "Stripetreasury_financial_accounts_resource_status_details",
      }),
  );
export const Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details> =>
      Schema.StructWithRest(
        Schema.Struct({
          balance: Schema.optionalKey(
            Schema.Literal("payments").annotate({
              description: "Set when `type` is `balance`.",
            }),
          ),
          billing_details: Stripetreasury_shared_resource_billing_details,
          financial_account: Schema.optionalKey(
            Stripereceived_payment_method_details_financial_account,
          ),
          issuing_card: Schema.optionalKey(
            Schema.String.annotate({
              description:
                "Set when `type` is `issuing_card`. This is an [Issuing Card](https://docs.stripe.com/api#issuing_cards) ID.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
          ),
          type: Schema.Literals([
            "balance",
            "financial_account",
            "issuing_card",
            "stripe",
            "us_bank_account",
          ]).annotate({
            description:
              "Polymorphic type matching the originating money movement's source. This can be an external account, a Stripe balance, or a FinancialAccount.",
          }),
          us_bank_account: Schema.optionalKey(
            Stripetreasury_shared_resource_initiating_payment_method_details_us_bank_account,
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
          "TreasurySharedResourceInitiatingPaymentMethodDetailsInitiatingPaymentMethodDetails",
        description: "",
        identifier:
          "Stripetreasury_shared_resource_initiating_payment_method_details_initiating_payment_method_details",
      }),
  );
export const Stripetreasury_financial_accounts_resource_financial_addresses_features =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_financial_addresses_features> =>
      Schema.StructWithRest(
        Schema.Struct({
          aba: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_aba_toggle_settings,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "FinancialAddressesFeaturesResource",
        description:
          "Settings related to Financial Addresses features on a Financial Account",
        identifier:
          "Stripetreasury_financial_accounts_resource_financial_addresses_features",
      }),
  );
export const Stripetreasury_financial_accounts_resource_inbound_transfers =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_inbound_transfers> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_inbound_ach_toggle_settings,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "InboundTransfer",
        description:
          "InboundTransfers contains inbound transfers features for a FinancialAccount.",
        identifier:
          "Stripetreasury_financial_accounts_resource_inbound_transfers",
      }),
  );
export const Stripetreasury_financial_accounts_resource_outbound_payments =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_outbound_payments> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings,
          ),
          us_domestic_wire: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_toggle_settings,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "OutboundPaymentsResource",
        description:
          "Settings related to Outbound Payments features on a Financial Account",
        identifier:
          "Stripetreasury_financial_accounts_resource_outbound_payments",
      }),
  );
export const Stripetreasury_financial_accounts_resource_outbound_transfers =
  Schema.suspend(
    (): Schema.Codec<Stripetreasury_financial_accounts_resource_outbound_transfers> =>
      Schema.StructWithRest(
        Schema.Struct({
          ach: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_outbound_ach_toggle_settings,
          ),
          us_domestic_wire: Schema.optionalKey(
            Stripetreasury_financial_accounts_resource_toggle_settings,
          ),
        }),
        [
          Schema.Record(
            Schema.String,
            Schema.Json.annotate({ expected: "JSON value" }),
          ),
        ],
      ).annotate({
        title: "OutboundTransfer",
        description:
          "OutboundTransfers contains outbound transfers features for a FinancialAccount.",
        identifier:
          "Stripetreasury_financial_accounts_resource_outbound_transfers",
      }),
  );
export const Stripetreasury_financial_account_features = Schema.suspend(
  (): Schema.Codec<Stripetreasury_financial_account_features> =>
    Schema.StructWithRest(
      Schema.Struct({
        card_issuing: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_toggle_settings,
        ),
        deposit_insurance: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_toggle_settings,
        ),
        financial_addresses: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_financial_addresses_features,
        ),
        inbound_transfers: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_inbound_transfers,
        ),
        intra_stripe_flows: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_toggle_settings,
        ),
        object: Schema.Literal("treasury.financial_account_features").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        outbound_payments: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_outbound_payments,
        ),
        outbound_transfers: Schema.optionalKey(
          Stripetreasury_financial_accounts_resource_outbound_transfers,
        ),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "FinancialAccount Feature",
      description:
        "Encodes whether a FinancialAccount has access to a particular Feature, with a `status` enum and associated `status_details`.\nStripe or the platform can control Features via the requested field.",
      identifier: "Stripetreasury.financial_account_features",
    }),
);
export const Stripetreasury_financial_account = Schema.suspend(
  (): Schema.Codec<Stripetreasury_financial_account> =>
    Schema.StructWithRest(
      Schema.Struct({
        active_features: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ).annotate({
            description:
              "The array of paths to active Features in the Features hash.",
          }),
        ),
        balance: Stripetreasury_financial_accounts_resource_balance,
        country: Schema.String.annotate({
          description:
            "Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        created: Schema.Number.annotate({
          description:
            "Time at which the object was created. Measured in seconds since the Unix epoch.",
          format: "unix-time",
        }).check(Schema.isInt().annotate({ expected: "an integer" })),
        features: Schema.optionalKey(Stripetreasury_financial_account_features),
        financial_addresses: Schema.Array(
          Stripetreasury_financial_accounts_resource_financial_address,
        ).annotate({
          description:
            "The set of credentials that resolve to a FinancialAccount.",
        }),
        id: Schema.String.annotate({
          description: "Unique identifier for the object.",
        }).check(
          Schema.isMaxCodePoints(5000).annotate({
            expected: "a string with at most 5000 code points",
          }),
        ),
        is_default: Schema.optionalKey(Schema.Boolean),
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
        nickname: Schema.optionalKey(
          Schema.Union([
            Schema.String.annotate({
              description: "The nickname for the FinancialAccount.",
            }).check(
              Schema.isMaxCodePoints(5000).annotate({
                expected: "a string with at most 5000 code points",
              }),
            ),
            Schema.Null,
          ]),
        ),
        object: Schema.Literal("treasury.financial_account").annotate({
          description:
            "String representing the object's type. Objects of the same type share the same value.",
        }),
        pending_features: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ).annotate({
            description:
              "The array of paths to pending Features in the Features hash.",
          }),
        ),
        platform_restrictions: Schema.optionalKey(
          Schema.Union([
            Schema.Union([
              Stripetreasury_financial_accounts_resource_platform_restrictions,
            ]).annotate({
              description:
                "The set of functionalities that the platform can restrict on the FinancialAccount.",
            }),
            Schema.Null,
          ]),
        ),
        restricted_features: Schema.optionalKey(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ).annotate({
            description:
              "The array of paths to restricted Features in the Features hash.",
          }),
        ),
        status: Schema.Literals(["closed", "open"]).annotate({
          description: "Status of this FinancialAccount.",
        }),
        status_details:
          Stripetreasury_financial_accounts_resource_status_details,
        supported_currencies: Schema.Array(Schema.String).annotate({
          description:
            "The currencies the FinancialAccount can hold a balance in. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.",
        }),
      }),
      [
        Schema.Record(
          Schema.String,
          Schema.Json.annotate({ expected: "JSON value" }),
        ),
      ],
    ).annotate({
      title: "FinancialAccount",
      description:
        "Legacy FinancialAccounts are part of the v1 version of Treasury for platforms and do not support many of the features introduced in [Treasury for platforms v2](https://docs.stripe.com/treasury/connect). Use [Financial Accounts](https://docs.stripe.com/api/v2/money-management/financial-accounts) instead of building a new v1 integration.\n\nStripe Treasury for Platforms provides users with a container for money called a FinancialAccount that is separate from their Payments balance.\nFinancialAccounts serve as the source and destination of Treasury for Platform’s money movement APIs.",
      identifier: "Stripetreasury.financial_account",
    }),
);
