// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Effect, Schema } from "effect";
import { StripeClient } from "../stripeClient.js";
import type { StripeOperation } from "../stripeClientModel.js";
import { stripeApiBaseUrl, stripeApiVersion } from "./configuration.js";
import {
  Stripedeleted_webhook_endpoint,
  Stripeerror,
  Stripewebhook_endpoint,
} from "./models/common.js";

export type GetWebhookEndpointsInput = {
  readonly ending_before?: string;
  readonly expand?: ReadonlyArray<string>;
  readonly limit?: number;
  readonly starting_after?: string;
};
export type GetWebhookEndpointsOutput = {
  readonly data: ReadonlyArray<Stripewebhook_endpoint>;
  readonly has_more: boolean;
  readonly object: "list";
  readonly url: string;
} & { readonly [x: string]: Schema.Json };
export type GetWebhookEndpointsError = Stripeerror;
export type PostWebhookEndpointsInput = {
  readonly api_version?:
    | "2011-01-01"
    | "2011-06-21"
    | "2011-06-28"
    | "2011-08-01"
    | "2011-09-15"
    | "2011-11-17"
    | "2012-02-23"
    | "2012-03-25"
    | "2012-06-18"
    | "2012-06-28"
    | "2012-07-09"
    | "2012-09-24"
    | "2012-10-26"
    | "2012-11-07"
    | "2013-02-11"
    | "2013-02-13"
    | "2013-07-05"
    | "2013-08-12"
    | "2013-08-13"
    | "2013-10-29"
    | "2013-12-03"
    | "2014-01-31"
    | "2014-03-13"
    | "2014-03-28"
    | "2014-05-19"
    | "2014-06-13"
    | "2014-06-17"
    | "2014-07-22"
    | "2014-07-26"
    | "2014-08-04"
    | "2014-08-20"
    | "2014-09-08"
    | "2014-10-07"
    | "2014-11-05"
    | "2014-11-20"
    | "2014-12-08"
    | "2014-12-17"
    | "2014-12-22"
    | "2015-01-11"
    | "2015-01-26"
    | "2015-02-10"
    | "2015-02-16"
    | "2015-02-18"
    | "2015-03-24"
    | "2015-04-07"
    | "2015-06-15"
    | "2015-07-07"
    | "2015-07-13"
    | "2015-07-28"
    | "2015-08-07"
    | "2015-08-19"
    | "2015-09-03"
    | "2015-09-08"
    | "2015-09-23"
    | "2015-10-01"
    | "2015-10-12"
    | "2015-10-16"
    | "2016-02-03"
    | "2016-02-19"
    | "2016-02-22"
    | "2016-02-23"
    | "2016-02-29"
    | "2016-03-07"
    | "2016-06-15"
    | "2016-07-06"
    | "2016-10-19"
    | "2017-01-27"
    | "2017-02-14"
    | "2017-04-06"
    | "2017-05-25"
    | "2017-06-05"
    | "2017-08-15"
    | "2017-12-14"
    | "2018-01-23"
    | "2018-02-05"
    | "2018-02-06"
    | "2018-02-28"
    | "2018-05-21"
    | "2018-07-27"
    | "2018-08-23"
    | "2018-09-06"
    | "2018-09-24"
    | "2018-10-31"
    | "2018-11-08"
    | "2019-02-11"
    | "2019-02-19"
    | "2019-03-14"
    | "2019-05-16"
    | "2019-08-14"
    | "2019-09-09"
    | "2019-10-08"
    | "2019-10-17"
    | "2019-11-05"
    | "2019-12-03"
    | "2020-03-02"
    | "2020-08-27"
    | "2022-08-01"
    | "2022-11-15"
    | "2023-08-16"
    | "2023-10-16"
    | "2024-04-10"
    | "2024-06-20"
    | "2024-09-30.acacia"
    | "2024-10-28.acacia"
    | "2024-11-20.acacia"
    | "2024-12-18.acacia"
    | "2025-01-27.acacia"
    | "2025-02-24.acacia"
    | "2025-03-01.dashboard"
    | "2025-03-31.basil"
    | "2025-04-30.basil"
    | "2025-05-28.basil"
    | "2025-06-30.basil"
    | "2025-07-30.basil"
    | "2025-08-27.basil"
    | "2025-09-30.clover"
    | "2025-10-29.clover"
    | "2025-11-17.clover"
    | "2025-12-15.clover"
    | "2026-01-28.clover"
    | "2026-02-25.clover"
    | "2026-03-25.dahlia"
    | "2026-04-22.dahlia"
    | "2026-05-27.dahlia"
    | "2026-06-24.dahlia"
    | "2026-07-29.dahlia"
    | "2026-08-26.dahlia"
    | "2026-09-30.endive"
    | "2026-10-28.endive";
  readonly connect?: boolean;
  readonly description?: string | "";
  readonly enabled_events: ReadonlyArray<
    | "*"
    | "account.application.authorized"
    | "account.application.deauthorized"
    | "account.external_account.created"
    | "account.external_account.deleted"
    | "account.external_account.updated"
    | "account.updated"
    | "application_fee.created"
    | "application_fee.refund.updated"
    | "application_fee.refunded"
    | "apps.install.created"
    | "apps.install.deleted"
    | "apps.install.updated"
    | "balance.available"
    | "balance_settings.updated"
    | "billing.alert.triggered"
    | "billing.credit_balance_transaction.created"
    | "billing.credit_grant.created"
    | "billing.credit_grant.updated"
    | "billing.meter.created"
    | "billing.meter.deactivated"
    | "billing.meter.reactivated"
    | "billing.meter.updated"
    | "billing_portal.configuration.created"
    | "billing_portal.configuration.updated"
    | "billing_portal.session.created"
    | "capability.updated"
    | "cash_balance.funds_available"
    | "charge.captured"
    | "charge.dispute.closed"
    | "charge.dispute.created"
    | "charge.dispute.funds_reinstated"
    | "charge.dispute.funds_withdrawn"
    | "charge.dispute.updated"
    | "charge.expired"
    | "charge.failed"
    | "charge.pending"
    | "charge.refund.updated"
    | "charge.refunded"
    | "charge.succeeded"
    | "charge.updated"
    | "checkout.session.async_payment_failed"
    | "checkout.session.async_payment_succeeded"
    | "checkout.session.completed"
    | "checkout.session.expired"
    | "climate.order.canceled"
    | "climate.order.created"
    | "climate.order.delayed"
    | "climate.order.delivered"
    | "climate.order.product_substituted"
    | "climate.product.created"
    | "climate.product.pricing_updated"
    | "coupon.created"
    | "coupon.deleted"
    | "coupon.updated"
    | "credit_note.created"
    | "credit_note.updated"
    | "credit_note.voided"
    | "customer.created"
    | "customer.deleted"
    | "customer.discount.created"
    | "customer.discount.deleted"
    | "customer.discount.updated"
    | "customer.source.created"
    | "customer.source.deleted"
    | "customer.source.expiring"
    | "customer.source.updated"
    | "customer.subscription.created"
    | "customer.subscription.deleted"
    | "customer.subscription.paused"
    | "customer.subscription.pending_update_applied"
    | "customer.subscription.pending_update_expired"
    | "customer.subscription.resumed"
    | "customer.subscription.trial_will_end"
    | "customer.subscription.updated"
    | "customer.tax_id.created"
    | "customer.tax_id.deleted"
    | "customer.tax_id.updated"
    | "customer.updated"
    | "customer_cash_balance_transaction.created"
    | "entitlements.active_entitlement_summary.updated"
    | "file.created"
    | "financial_connections.account.account_numbers_updated"
    | "financial_connections.account.created"
    | "financial_connections.account.deactivated"
    | "financial_connections.account.disconnected"
    | "financial_connections.account.expected_deactivation_date_updated"
    | "financial_connections.account.reactivated"
    | "financial_connections.account.refreshed_balance"
    | "financial_connections.account.refreshed_ownership"
    | "financial_connections.account.refreshed_transactions"
    | "financial_connections.account.supported_payment_method_types_updated"
    | "financial_connections.account.upcoming_account_number_expiry"
    | "financial_connections.account.upcoming_deactivation"
    | "financial_connections.authorization.expected_deactivation_date_updated"
    | "financial_connections.authorization.upcoming_deactivation"
    | "identity.verification_session.canceled"
    | "identity.verification_session.created"
    | "identity.verification_session.processing"
    | "identity.verification_session.redacted"
    | "identity.verification_session.requires_input"
    | "identity.verification_session.verified"
    | "invoice.created"
    | "invoice.deleted"
    | "invoice.finalization_failed"
    | "invoice.finalized"
    | "invoice.marked_uncollectible"
    | "invoice.overdue"
    | "invoice.overpaid"
    | "invoice.paid"
    | "invoice.payment_action_required"
    | "invoice.payment_attempt_required"
    | "invoice.payment_failed"
    | "invoice.payment_succeeded"
    | "invoice.sent"
    | "invoice.upcoming"
    | "invoice.updated"
    | "invoice.voided"
    | "invoice.will_be_due"
    | "invoice_payment.paid"
    | "invoiceitem.created"
    | "invoiceitem.deleted"
    | "issuing_authorization.created"
    | "issuing_authorization.request"
    | "issuing_authorization.updated"
    | "issuing_card.created"
    | "issuing_card.updated"
    | "issuing_cardholder.created"
    | "issuing_cardholder.updated"
    | "issuing_dispute.closed"
    | "issuing_dispute.created"
    | "issuing_dispute.funds_reinstated"
    | "issuing_dispute.funds_rescinded"
    | "issuing_dispute.submitted"
    | "issuing_dispute.updated"
    | "issuing_personalization_design.activated"
    | "issuing_personalization_design.deactivated"
    | "issuing_personalization_design.rejected"
    | "issuing_personalization_design.updated"
    | "issuing_token.created"
    | "issuing_token.updated"
    | "issuing_transaction.created"
    | "issuing_transaction.purchase_details_receipt_updated"
    | "issuing_transaction.updated"
    | "mandate.updated"
    | "payment_intent.amount_capturable_updated"
    | "payment_intent.canceled"
    | "payment_intent.created"
    | "payment_intent.partially_funded"
    | "payment_intent.payment_failed"
    | "payment_intent.processing"
    | "payment_intent.requires_action"
    | "payment_intent.succeeded"
    | "payment_link.created"
    | "payment_link.updated"
    | "payment_method.attached"
    | "payment_method.automatically_updated"
    | "payment_method.detached"
    | "payment_method.updated"
    | "payout.canceled"
    | "payout.created"
    | "payout.failed"
    | "payout.paid"
    | "payout.reconciliation_completed"
    | "payout.updated"
    | "person.created"
    | "person.deleted"
    | "person.updated"
    | "plan.created"
    | "plan.deleted"
    | "plan.updated"
    | "price.created"
    | "price.deleted"
    | "price.updated"
    | "product.created"
    | "product.deleted"
    | "product.updated"
    | "promotion_code.created"
    | "promotion_code.updated"
    | "quote.accepted"
    | "quote.canceled"
    | "quote.created"
    | "quote.finalized"
    | "radar.early_fraud_warning.created"
    | "radar.early_fraud_warning.updated"
    | "refund.created"
    | "refund.failed"
    | "refund.updated"
    | "reporting.report_run.failed"
    | "reporting.report_run.succeeded"
    | "reporting.report_type.updated"
    | "reserve.hold.created"
    | "reserve.hold.updated"
    | "reserve.plan.created"
    | "reserve.plan.disabled"
    | "reserve.plan.expired"
    | "reserve.plan.updated"
    | "reserve.release.created"
    | "review.closed"
    | "review.opened"
    | "setup_intent.canceled"
    | "setup_intent.created"
    | "setup_intent.requires_action"
    | "setup_intent.setup_failed"
    | "setup_intent.succeeded"
    | "sigma.scheduled_query_run.created"
    | "source.canceled"
    | "source.chargeable"
    | "source.failed"
    | "source.mandate_notification"
    | "source.refund_attributes_required"
    | "source.transaction.created"
    | "source.transaction.updated"
    | "subscription_schedule.aborted"
    | "subscription_schedule.canceled"
    | "subscription_schedule.completed"
    | "subscription_schedule.created"
    | "subscription_schedule.expiring"
    | "subscription_schedule.released"
    | "subscription_schedule.updated"
    | "tax.settings.updated"
    | "tax_rate.created"
    | "tax_rate.updated"
    | "terminal.reader.action_failed"
    | "terminal.reader.action_succeeded"
    | "terminal.reader.action_updated"
    | "test_helpers.test_clock.advancing"
    | "test_helpers.test_clock.created"
    | "test_helpers.test_clock.deleted"
    | "test_helpers.test_clock.internal_failure"
    | "test_helpers.test_clock.ready"
    | "three_d_secure.authentication.canceled"
    | "three_d_secure.authentication.challenge_started"
    | "three_d_secure.authentication.errored"
    | "three_d_secure.authentication.failed"
    | "three_d_secure.authentication.requires_challenge"
    | "three_d_secure.authentication.requires_submission"
    | "three_d_secure.authentication.succeeded"
    | "topup.canceled"
    | "topup.created"
    | "topup.failed"
    | "topup.reversed"
    | "topup.succeeded"
    | "transfer.created"
    | "transfer.reversed"
    | "transfer.updated"
    | "treasury.credit_reversal.created"
    | "treasury.credit_reversal.posted"
    | "treasury.debit_reversal.completed"
    | "treasury.debit_reversal.created"
    | "treasury.debit_reversal.initial_credit_granted"
    | "treasury.financial_account.closed"
    | "treasury.financial_account.created"
    | "treasury.financial_account.features_status_updated"
    | "treasury.inbound_transfer.canceled"
    | "treasury.inbound_transfer.created"
    | "treasury.inbound_transfer.failed"
    | "treasury.inbound_transfer.succeeded"
    | "treasury.outbound_payment.canceled"
    | "treasury.outbound_payment.created"
    | "treasury.outbound_payment.expected_arrival_date_updated"
    | "treasury.outbound_payment.failed"
    | "treasury.outbound_payment.posted"
    | "treasury.outbound_payment.returned"
    | "treasury.outbound_payment.tracking_details_updated"
    | "treasury.outbound_transfer.canceled"
    | "treasury.outbound_transfer.created"
    | "treasury.outbound_transfer.expected_arrival_date_updated"
    | "treasury.outbound_transfer.failed"
    | "treasury.outbound_transfer.posted"
    | "treasury.outbound_transfer.returned"
    | "treasury.outbound_transfer.tracking_details_updated"
    | "treasury.received_credit.created"
    | "treasury.received_credit.failed"
    | "treasury.received_credit.succeeded"
    | "treasury.received_debit.created"
  >;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly url: string;
};
export type PostWebhookEndpointsOutput = Stripewebhook_endpoint;
export type PostWebhookEndpointsError = Stripeerror;
export type GetWebhookEndpointsWebhookEndpointInput = {
  readonly expand?: ReadonlyArray<string>;
  readonly webhook_endpoint: string;
};
export type GetWebhookEndpointsWebhookEndpointOutput = Stripewebhook_endpoint;
export type GetWebhookEndpointsWebhookEndpointError = Stripeerror;
export type PostWebhookEndpointsWebhookEndpointInput = {
  readonly description?: string | "";
  readonly disabled?: boolean;
  readonly enabled_events?: ReadonlyArray<
    | "*"
    | "account.application.authorized"
    | "account.application.deauthorized"
    | "account.external_account.created"
    | "account.external_account.deleted"
    | "account.external_account.updated"
    | "account.updated"
    | "application_fee.created"
    | "application_fee.refund.updated"
    | "application_fee.refunded"
    | "apps.install.created"
    | "apps.install.deleted"
    | "apps.install.updated"
    | "balance.available"
    | "balance_settings.updated"
    | "billing.alert.triggered"
    | "billing.credit_balance_transaction.created"
    | "billing.credit_grant.created"
    | "billing.credit_grant.updated"
    | "billing.meter.created"
    | "billing.meter.deactivated"
    | "billing.meter.reactivated"
    | "billing.meter.updated"
    | "billing_portal.configuration.created"
    | "billing_portal.configuration.updated"
    | "billing_portal.session.created"
    | "capability.updated"
    | "cash_balance.funds_available"
    | "charge.captured"
    | "charge.dispute.closed"
    | "charge.dispute.created"
    | "charge.dispute.funds_reinstated"
    | "charge.dispute.funds_withdrawn"
    | "charge.dispute.updated"
    | "charge.expired"
    | "charge.failed"
    | "charge.pending"
    | "charge.refund.updated"
    | "charge.refunded"
    | "charge.succeeded"
    | "charge.updated"
    | "checkout.session.async_payment_failed"
    | "checkout.session.async_payment_succeeded"
    | "checkout.session.completed"
    | "checkout.session.expired"
    | "climate.order.canceled"
    | "climate.order.created"
    | "climate.order.delayed"
    | "climate.order.delivered"
    | "climate.order.product_substituted"
    | "climate.product.created"
    | "climate.product.pricing_updated"
    | "coupon.created"
    | "coupon.deleted"
    | "coupon.updated"
    | "credit_note.created"
    | "credit_note.updated"
    | "credit_note.voided"
    | "customer.created"
    | "customer.deleted"
    | "customer.discount.created"
    | "customer.discount.deleted"
    | "customer.discount.updated"
    | "customer.source.created"
    | "customer.source.deleted"
    | "customer.source.expiring"
    | "customer.source.updated"
    | "customer.subscription.created"
    | "customer.subscription.deleted"
    | "customer.subscription.paused"
    | "customer.subscription.pending_update_applied"
    | "customer.subscription.pending_update_expired"
    | "customer.subscription.resumed"
    | "customer.subscription.trial_will_end"
    | "customer.subscription.updated"
    | "customer.tax_id.created"
    | "customer.tax_id.deleted"
    | "customer.tax_id.updated"
    | "customer.updated"
    | "customer_cash_balance_transaction.created"
    | "entitlements.active_entitlement_summary.updated"
    | "file.created"
    | "financial_connections.account.account_numbers_updated"
    | "financial_connections.account.created"
    | "financial_connections.account.deactivated"
    | "financial_connections.account.disconnected"
    | "financial_connections.account.expected_deactivation_date_updated"
    | "financial_connections.account.reactivated"
    | "financial_connections.account.refreshed_balance"
    | "financial_connections.account.refreshed_ownership"
    | "financial_connections.account.refreshed_transactions"
    | "financial_connections.account.supported_payment_method_types_updated"
    | "financial_connections.account.upcoming_account_number_expiry"
    | "financial_connections.account.upcoming_deactivation"
    | "financial_connections.authorization.expected_deactivation_date_updated"
    | "financial_connections.authorization.upcoming_deactivation"
    | "identity.verification_session.canceled"
    | "identity.verification_session.created"
    | "identity.verification_session.processing"
    | "identity.verification_session.redacted"
    | "identity.verification_session.requires_input"
    | "identity.verification_session.verified"
    | "invoice.created"
    | "invoice.deleted"
    | "invoice.finalization_failed"
    | "invoice.finalized"
    | "invoice.marked_uncollectible"
    | "invoice.overdue"
    | "invoice.overpaid"
    | "invoice.paid"
    | "invoice.payment_action_required"
    | "invoice.payment_attempt_required"
    | "invoice.payment_failed"
    | "invoice.payment_succeeded"
    | "invoice.sent"
    | "invoice.upcoming"
    | "invoice.updated"
    | "invoice.voided"
    | "invoice.will_be_due"
    | "invoice_payment.paid"
    | "invoiceitem.created"
    | "invoiceitem.deleted"
    | "issuing_authorization.created"
    | "issuing_authorization.request"
    | "issuing_authorization.updated"
    | "issuing_card.created"
    | "issuing_card.updated"
    | "issuing_cardholder.created"
    | "issuing_cardholder.updated"
    | "issuing_dispute.closed"
    | "issuing_dispute.created"
    | "issuing_dispute.funds_reinstated"
    | "issuing_dispute.funds_rescinded"
    | "issuing_dispute.submitted"
    | "issuing_dispute.updated"
    | "issuing_personalization_design.activated"
    | "issuing_personalization_design.deactivated"
    | "issuing_personalization_design.rejected"
    | "issuing_personalization_design.updated"
    | "issuing_token.created"
    | "issuing_token.updated"
    | "issuing_transaction.created"
    | "issuing_transaction.purchase_details_receipt_updated"
    | "issuing_transaction.updated"
    | "mandate.updated"
    | "payment_intent.amount_capturable_updated"
    | "payment_intent.canceled"
    | "payment_intent.created"
    | "payment_intent.partially_funded"
    | "payment_intent.payment_failed"
    | "payment_intent.processing"
    | "payment_intent.requires_action"
    | "payment_intent.succeeded"
    | "payment_link.created"
    | "payment_link.updated"
    | "payment_method.attached"
    | "payment_method.automatically_updated"
    | "payment_method.detached"
    | "payment_method.updated"
    | "payout.canceled"
    | "payout.created"
    | "payout.failed"
    | "payout.paid"
    | "payout.reconciliation_completed"
    | "payout.updated"
    | "person.created"
    | "person.deleted"
    | "person.updated"
    | "plan.created"
    | "plan.deleted"
    | "plan.updated"
    | "price.created"
    | "price.deleted"
    | "price.updated"
    | "product.created"
    | "product.deleted"
    | "product.updated"
    | "promotion_code.created"
    | "promotion_code.updated"
    | "quote.accepted"
    | "quote.canceled"
    | "quote.created"
    | "quote.finalized"
    | "radar.early_fraud_warning.created"
    | "radar.early_fraud_warning.updated"
    | "refund.created"
    | "refund.failed"
    | "refund.updated"
    | "reporting.report_run.failed"
    | "reporting.report_run.succeeded"
    | "reporting.report_type.updated"
    | "reserve.hold.created"
    | "reserve.hold.updated"
    | "reserve.plan.created"
    | "reserve.plan.disabled"
    | "reserve.plan.expired"
    | "reserve.plan.updated"
    | "reserve.release.created"
    | "review.closed"
    | "review.opened"
    | "setup_intent.canceled"
    | "setup_intent.created"
    | "setup_intent.requires_action"
    | "setup_intent.setup_failed"
    | "setup_intent.succeeded"
    | "sigma.scheduled_query_run.created"
    | "source.canceled"
    | "source.chargeable"
    | "source.failed"
    | "source.mandate_notification"
    | "source.refund_attributes_required"
    | "source.transaction.created"
    | "source.transaction.updated"
    | "subscription_schedule.aborted"
    | "subscription_schedule.canceled"
    | "subscription_schedule.completed"
    | "subscription_schedule.created"
    | "subscription_schedule.expiring"
    | "subscription_schedule.released"
    | "subscription_schedule.updated"
    | "tax.settings.updated"
    | "tax_rate.created"
    | "tax_rate.updated"
    | "terminal.reader.action_failed"
    | "terminal.reader.action_succeeded"
    | "terminal.reader.action_updated"
    | "test_helpers.test_clock.advancing"
    | "test_helpers.test_clock.created"
    | "test_helpers.test_clock.deleted"
    | "test_helpers.test_clock.internal_failure"
    | "test_helpers.test_clock.ready"
    | "three_d_secure.authentication.canceled"
    | "three_d_secure.authentication.challenge_started"
    | "three_d_secure.authentication.errored"
    | "three_d_secure.authentication.failed"
    | "three_d_secure.authentication.requires_challenge"
    | "three_d_secure.authentication.requires_submission"
    | "three_d_secure.authentication.succeeded"
    | "topup.canceled"
    | "topup.created"
    | "topup.failed"
    | "topup.reversed"
    | "topup.succeeded"
    | "transfer.created"
    | "transfer.reversed"
    | "transfer.updated"
    | "treasury.credit_reversal.created"
    | "treasury.credit_reversal.posted"
    | "treasury.debit_reversal.completed"
    | "treasury.debit_reversal.created"
    | "treasury.debit_reversal.initial_credit_granted"
    | "treasury.financial_account.closed"
    | "treasury.financial_account.created"
    | "treasury.financial_account.features_status_updated"
    | "treasury.inbound_transfer.canceled"
    | "treasury.inbound_transfer.created"
    | "treasury.inbound_transfer.failed"
    | "treasury.inbound_transfer.succeeded"
    | "treasury.outbound_payment.canceled"
    | "treasury.outbound_payment.created"
    | "treasury.outbound_payment.expected_arrival_date_updated"
    | "treasury.outbound_payment.failed"
    | "treasury.outbound_payment.posted"
    | "treasury.outbound_payment.returned"
    | "treasury.outbound_payment.tracking_details_updated"
    | "treasury.outbound_transfer.canceled"
    | "treasury.outbound_transfer.created"
    | "treasury.outbound_transfer.expected_arrival_date_updated"
    | "treasury.outbound_transfer.failed"
    | "treasury.outbound_transfer.posted"
    | "treasury.outbound_transfer.returned"
    | "treasury.outbound_transfer.tracking_details_updated"
    | "treasury.received_credit.created"
    | "treasury.received_credit.failed"
    | "treasury.received_credit.succeeded"
    | "treasury.received_debit.created"
  >;
  readonly expand?: ReadonlyArray<string>;
  readonly metadata?: { readonly [x: string]: string } | "";
  readonly url?: string;
  readonly webhook_endpoint: string;
};
export type PostWebhookEndpointsWebhookEndpointOutput = Stripewebhook_endpoint;
export type PostWebhookEndpointsWebhookEndpointError = Stripeerror;
export type DeleteWebhookEndpointsWebhookEndpointInput = {
  readonly webhook_endpoint: string;
};
export type DeleteWebhookEndpointsWebhookEndpointOutput =
  Stripedeleted_webhook_endpoint;
export type DeleteWebhookEndpointsWebhookEndpointError = Stripeerror;

export const GetWebhookEndpointsInput = Schema.Struct({
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
export const GetWebhookEndpointsOutput = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Stripewebhook_endpoint),
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
          new globalThis.RegExp("^\\/v1\\/webhook_endpoints", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^\\/v1\\/webhook_endpoints",
        }),
      ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ title: "NotificationWebhookEndpointList", description: "" });
export const GetWebhookEndpointsError = Stripeerror;
export const PostWebhookEndpointsInput = Schema.Struct({
  api_version: Schema.optionalKey(
    Schema.Literals([
      "2011-01-01",
      "2011-06-21",
      "2011-06-28",
      "2011-08-01",
      "2011-09-15",
      "2011-11-17",
      "2012-02-23",
      "2012-03-25",
      "2012-06-18",
      "2012-06-28",
      "2012-07-09",
      "2012-09-24",
      "2012-10-26",
      "2012-11-07",
      "2013-02-11",
      "2013-02-13",
      "2013-07-05",
      "2013-08-12",
      "2013-08-13",
      "2013-10-29",
      "2013-12-03",
      "2014-01-31",
      "2014-03-13",
      "2014-03-28",
      "2014-05-19",
      "2014-06-13",
      "2014-06-17",
      "2014-07-22",
      "2014-07-26",
      "2014-08-04",
      "2014-08-20",
      "2014-09-08",
      "2014-10-07",
      "2014-11-05",
      "2014-11-20",
      "2014-12-08",
      "2014-12-17",
      "2014-12-22",
      "2015-01-11",
      "2015-01-26",
      "2015-02-10",
      "2015-02-16",
      "2015-02-18",
      "2015-03-24",
      "2015-04-07",
      "2015-06-15",
      "2015-07-07",
      "2015-07-13",
      "2015-07-28",
      "2015-08-07",
      "2015-08-19",
      "2015-09-03",
      "2015-09-08",
      "2015-09-23",
      "2015-10-01",
      "2015-10-12",
      "2015-10-16",
      "2016-02-03",
      "2016-02-19",
      "2016-02-22",
      "2016-02-23",
      "2016-02-29",
      "2016-03-07",
      "2016-06-15",
      "2016-07-06",
      "2016-10-19",
      "2017-01-27",
      "2017-02-14",
      "2017-04-06",
      "2017-05-25",
      "2017-06-05",
      "2017-08-15",
      "2017-12-14",
      "2018-01-23",
      "2018-02-05",
      "2018-02-06",
      "2018-02-28",
      "2018-05-21",
      "2018-07-27",
      "2018-08-23",
      "2018-09-06",
      "2018-09-24",
      "2018-10-31",
      "2018-11-08",
      "2019-02-11",
      "2019-02-19",
      "2019-03-14",
      "2019-05-16",
      "2019-08-14",
      "2019-09-09",
      "2019-10-08",
      "2019-10-17",
      "2019-11-05",
      "2019-12-03",
      "2020-03-02",
      "2020-08-27",
      "2022-08-01",
      "2022-11-15",
      "2023-08-16",
      "2023-10-16",
      "2024-04-10",
      "2024-06-20",
      "2024-09-30.acacia",
      "2024-10-28.acacia",
      "2024-11-20.acacia",
      "2024-12-18.acacia",
      "2025-01-27.acacia",
      "2025-02-24.acacia",
      "2025-03-01.dashboard",
      "2025-03-31.basil",
      "2025-04-30.basil",
      "2025-05-28.basil",
      "2025-06-30.basil",
      "2025-07-30.basil",
      "2025-08-27.basil",
      "2025-09-30.clover",
      "2025-10-29.clover",
      "2025-11-17.clover",
      "2025-12-15.clover",
      "2026-01-28.clover",
      "2026-02-25.clover",
      "2026-03-25.dahlia",
      "2026-04-22.dahlia",
      "2026-05-27.dahlia",
      "2026-06-24.dahlia",
      "2026-07-29.dahlia",
      "2026-08-26.dahlia",
      "2026-09-30.endive",
      "2026-10-28.endive",
    ]).annotate({
      description:
        "Events sent to this endpoint will be generated with this Stripe Version instead of your account's default Stripe Version.",
    }),
  ),
  connect: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Whether this endpoint should receive events from connected accounts (`true`), or from your account (`false`). Defaults to `false`.",
    }),
  ),
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description: "An optional description of what the webhook is used for.",
    }),
  ),
  enabled_events: Schema.Array(
    Schema.Literals([
      "*",
      "account.application.authorized",
      "account.application.deauthorized",
      "account.external_account.created",
      "account.external_account.deleted",
      "account.external_account.updated",
      "account.updated",
      "application_fee.created",
      "application_fee.refund.updated",
      "application_fee.refunded",
      "apps.install.created",
      "apps.install.deleted",
      "apps.install.updated",
      "balance.available",
      "balance_settings.updated",
      "billing.alert.triggered",
      "billing.credit_balance_transaction.created",
      "billing.credit_grant.created",
      "billing.credit_grant.updated",
      "billing.meter.created",
      "billing.meter.deactivated",
      "billing.meter.reactivated",
      "billing.meter.updated",
      "billing_portal.configuration.created",
      "billing_portal.configuration.updated",
      "billing_portal.session.created",
      "capability.updated",
      "cash_balance.funds_available",
      "charge.captured",
      "charge.dispute.closed",
      "charge.dispute.created",
      "charge.dispute.funds_reinstated",
      "charge.dispute.funds_withdrawn",
      "charge.dispute.updated",
      "charge.expired",
      "charge.failed",
      "charge.pending",
      "charge.refund.updated",
      "charge.refunded",
      "charge.succeeded",
      "charge.updated",
      "checkout.session.async_payment_failed",
      "checkout.session.async_payment_succeeded",
      "checkout.session.completed",
      "checkout.session.expired",
      "climate.order.canceled",
      "climate.order.created",
      "climate.order.delayed",
      "climate.order.delivered",
      "climate.order.product_substituted",
      "climate.product.created",
      "climate.product.pricing_updated",
      "coupon.created",
      "coupon.deleted",
      "coupon.updated",
      "credit_note.created",
      "credit_note.updated",
      "credit_note.voided",
      "customer.created",
      "customer.deleted",
      "customer.discount.created",
      "customer.discount.deleted",
      "customer.discount.updated",
      "customer.source.created",
      "customer.source.deleted",
      "customer.source.expiring",
      "customer.source.updated",
      "customer.subscription.created",
      "customer.subscription.deleted",
      "customer.subscription.paused",
      "customer.subscription.pending_update_applied",
      "customer.subscription.pending_update_expired",
      "customer.subscription.resumed",
      "customer.subscription.trial_will_end",
      "customer.subscription.updated",
      "customer.tax_id.created",
      "customer.tax_id.deleted",
      "customer.tax_id.updated",
      "customer.updated",
      "customer_cash_balance_transaction.created",
      "entitlements.active_entitlement_summary.updated",
      "file.created",
      "financial_connections.account.account_numbers_updated",
      "financial_connections.account.created",
      "financial_connections.account.deactivated",
      "financial_connections.account.disconnected",
      "financial_connections.account.expected_deactivation_date_updated",
      "financial_connections.account.reactivated",
      "financial_connections.account.refreshed_balance",
      "financial_connections.account.refreshed_ownership",
      "financial_connections.account.refreshed_transactions",
      "financial_connections.account.supported_payment_method_types_updated",
      "financial_connections.account.upcoming_account_number_expiry",
      "financial_connections.account.upcoming_deactivation",
      "financial_connections.authorization.expected_deactivation_date_updated",
      "financial_connections.authorization.upcoming_deactivation",
      "identity.verification_session.canceled",
      "identity.verification_session.created",
      "identity.verification_session.processing",
      "identity.verification_session.redacted",
      "identity.verification_session.requires_input",
      "identity.verification_session.verified",
      "invoice.created",
      "invoice.deleted",
      "invoice.finalization_failed",
      "invoice.finalized",
      "invoice.marked_uncollectible",
      "invoice.overdue",
      "invoice.overpaid",
      "invoice.paid",
      "invoice.payment_action_required",
      "invoice.payment_attempt_required",
      "invoice.payment_failed",
      "invoice.payment_succeeded",
      "invoice.sent",
      "invoice.upcoming",
      "invoice.updated",
      "invoice.voided",
      "invoice.will_be_due",
      "invoice_payment.paid",
      "invoiceitem.created",
      "invoiceitem.deleted",
      "issuing_authorization.created",
      "issuing_authorization.request",
      "issuing_authorization.updated",
      "issuing_card.created",
      "issuing_card.updated",
      "issuing_cardholder.created",
      "issuing_cardholder.updated",
      "issuing_dispute.closed",
      "issuing_dispute.created",
      "issuing_dispute.funds_reinstated",
      "issuing_dispute.funds_rescinded",
      "issuing_dispute.submitted",
      "issuing_dispute.updated",
      "issuing_personalization_design.activated",
      "issuing_personalization_design.deactivated",
      "issuing_personalization_design.rejected",
      "issuing_personalization_design.updated",
      "issuing_token.created",
      "issuing_token.updated",
      "issuing_transaction.created",
      "issuing_transaction.purchase_details_receipt_updated",
      "issuing_transaction.updated",
      "mandate.updated",
      "payment_intent.amount_capturable_updated",
      "payment_intent.canceled",
      "payment_intent.created",
      "payment_intent.partially_funded",
      "payment_intent.payment_failed",
      "payment_intent.processing",
      "payment_intent.requires_action",
      "payment_intent.succeeded",
      "payment_link.created",
      "payment_link.updated",
      "payment_method.attached",
      "payment_method.automatically_updated",
      "payment_method.detached",
      "payment_method.updated",
      "payout.canceled",
      "payout.created",
      "payout.failed",
      "payout.paid",
      "payout.reconciliation_completed",
      "payout.updated",
      "person.created",
      "person.deleted",
      "person.updated",
      "plan.created",
      "plan.deleted",
      "plan.updated",
      "price.created",
      "price.deleted",
      "price.updated",
      "product.created",
      "product.deleted",
      "product.updated",
      "promotion_code.created",
      "promotion_code.updated",
      "quote.accepted",
      "quote.canceled",
      "quote.created",
      "quote.finalized",
      "radar.early_fraud_warning.created",
      "radar.early_fraud_warning.updated",
      "refund.created",
      "refund.failed",
      "refund.updated",
      "reporting.report_run.failed",
      "reporting.report_run.succeeded",
      "reporting.report_type.updated",
      "reserve.hold.created",
      "reserve.hold.updated",
      "reserve.plan.created",
      "reserve.plan.disabled",
      "reserve.plan.expired",
      "reserve.plan.updated",
      "reserve.release.created",
      "review.closed",
      "review.opened",
      "setup_intent.canceled",
      "setup_intent.created",
      "setup_intent.requires_action",
      "setup_intent.setup_failed",
      "setup_intent.succeeded",
      "sigma.scheduled_query_run.created",
      "source.canceled",
      "source.chargeable",
      "source.failed",
      "source.mandate_notification",
      "source.refund_attributes_required",
      "source.transaction.created",
      "source.transaction.updated",
      "subscription_schedule.aborted",
      "subscription_schedule.canceled",
      "subscription_schedule.completed",
      "subscription_schedule.created",
      "subscription_schedule.expiring",
      "subscription_schedule.released",
      "subscription_schedule.updated",
      "tax.settings.updated",
      "tax_rate.created",
      "tax_rate.updated",
      "terminal.reader.action_failed",
      "terminal.reader.action_succeeded",
      "terminal.reader.action_updated",
      "test_helpers.test_clock.advancing",
      "test_helpers.test_clock.created",
      "test_helpers.test_clock.deleted",
      "test_helpers.test_clock.internal_failure",
      "test_helpers.test_clock.ready",
      "three_d_secure.authentication.canceled",
      "three_d_secure.authentication.challenge_started",
      "three_d_secure.authentication.errored",
      "three_d_secure.authentication.failed",
      "three_d_secure.authentication.requires_challenge",
      "three_d_secure.authentication.requires_submission",
      "three_d_secure.authentication.succeeded",
      "topup.canceled",
      "topup.created",
      "topup.failed",
      "topup.reversed",
      "topup.succeeded",
      "transfer.created",
      "transfer.reversed",
      "transfer.updated",
      "treasury.credit_reversal.created",
      "treasury.credit_reversal.posted",
      "treasury.debit_reversal.completed",
      "treasury.debit_reversal.created",
      "treasury.debit_reversal.initial_credit_granted",
      "treasury.financial_account.closed",
      "treasury.financial_account.created",
      "treasury.financial_account.features_status_updated",
      "treasury.inbound_transfer.canceled",
      "treasury.inbound_transfer.created",
      "treasury.inbound_transfer.failed",
      "treasury.inbound_transfer.succeeded",
      "treasury.outbound_payment.canceled",
      "treasury.outbound_payment.created",
      "treasury.outbound_payment.expected_arrival_date_updated",
      "treasury.outbound_payment.failed",
      "treasury.outbound_payment.posted",
      "treasury.outbound_payment.returned",
      "treasury.outbound_payment.tracking_details_updated",
      "treasury.outbound_transfer.canceled",
      "treasury.outbound_transfer.created",
      "treasury.outbound_transfer.expected_arrival_date_updated",
      "treasury.outbound_transfer.failed",
      "treasury.outbound_transfer.posted",
      "treasury.outbound_transfer.returned",
      "treasury.outbound_transfer.tracking_details_updated",
      "treasury.received_credit.created",
      "treasury.received_credit.failed",
      "treasury.received_credit.succeeded",
      "treasury.received_debit.created",
    ]),
  ).annotate({
    description:
      "The list of events to enable for this endpoint. You may specify `['*']` to enable all events, except those that require explicit selection.",
  }),
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
  url: Schema.String.annotate({
    description: "The URL of the webhook endpoint.",
  }),
});
export const PostWebhookEndpointsOutput = Stripewebhook_endpoint;
export const PostWebhookEndpointsError = Stripeerror;
export const GetWebhookEndpointsWebhookEndpointInput = Schema.Struct({
  expand: Schema.optionalKey(
    Schema.Array(
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
    ),
  ),
  webhook_endpoint: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const GetWebhookEndpointsWebhookEndpointOutput = Stripewebhook_endpoint;
export const GetWebhookEndpointsWebhookEndpointError = Stripeerror;
export const PostWebhookEndpointsWebhookEndpointInput = Schema.Struct({
  description: Schema.optionalKey(
    Schema.Union([
      Schema.String.check(
        Schema.isMaxCodePoints(5000).annotate({
          expected: "a string with at most 5000 code points",
        }),
      ),
      Schema.Literal(""),
    ]).annotate({
      description: "An optional description of what the webhook is used for.",
    }),
  ),
  disabled: Schema.optionalKey(
    Schema.Boolean.annotate({
      description: "Disable the webhook endpoint if set to true.",
    }),
  ),
  enabled_events: Schema.optionalKey(
    Schema.Array(
      Schema.Literals([
        "*",
        "account.application.authorized",
        "account.application.deauthorized",
        "account.external_account.created",
        "account.external_account.deleted",
        "account.external_account.updated",
        "account.updated",
        "application_fee.created",
        "application_fee.refund.updated",
        "application_fee.refunded",
        "apps.install.created",
        "apps.install.deleted",
        "apps.install.updated",
        "balance.available",
        "balance_settings.updated",
        "billing.alert.triggered",
        "billing.credit_balance_transaction.created",
        "billing.credit_grant.created",
        "billing.credit_grant.updated",
        "billing.meter.created",
        "billing.meter.deactivated",
        "billing.meter.reactivated",
        "billing.meter.updated",
        "billing_portal.configuration.created",
        "billing_portal.configuration.updated",
        "billing_portal.session.created",
        "capability.updated",
        "cash_balance.funds_available",
        "charge.captured",
        "charge.dispute.closed",
        "charge.dispute.created",
        "charge.dispute.funds_reinstated",
        "charge.dispute.funds_withdrawn",
        "charge.dispute.updated",
        "charge.expired",
        "charge.failed",
        "charge.pending",
        "charge.refund.updated",
        "charge.refunded",
        "charge.succeeded",
        "charge.updated",
        "checkout.session.async_payment_failed",
        "checkout.session.async_payment_succeeded",
        "checkout.session.completed",
        "checkout.session.expired",
        "climate.order.canceled",
        "climate.order.created",
        "climate.order.delayed",
        "climate.order.delivered",
        "climate.order.product_substituted",
        "climate.product.created",
        "climate.product.pricing_updated",
        "coupon.created",
        "coupon.deleted",
        "coupon.updated",
        "credit_note.created",
        "credit_note.updated",
        "credit_note.voided",
        "customer.created",
        "customer.deleted",
        "customer.discount.created",
        "customer.discount.deleted",
        "customer.discount.updated",
        "customer.source.created",
        "customer.source.deleted",
        "customer.source.expiring",
        "customer.source.updated",
        "customer.subscription.created",
        "customer.subscription.deleted",
        "customer.subscription.paused",
        "customer.subscription.pending_update_applied",
        "customer.subscription.pending_update_expired",
        "customer.subscription.resumed",
        "customer.subscription.trial_will_end",
        "customer.subscription.updated",
        "customer.tax_id.created",
        "customer.tax_id.deleted",
        "customer.tax_id.updated",
        "customer.updated",
        "customer_cash_balance_transaction.created",
        "entitlements.active_entitlement_summary.updated",
        "file.created",
        "financial_connections.account.account_numbers_updated",
        "financial_connections.account.created",
        "financial_connections.account.deactivated",
        "financial_connections.account.disconnected",
        "financial_connections.account.expected_deactivation_date_updated",
        "financial_connections.account.reactivated",
        "financial_connections.account.refreshed_balance",
        "financial_connections.account.refreshed_ownership",
        "financial_connections.account.refreshed_transactions",
        "financial_connections.account.supported_payment_method_types_updated",
        "financial_connections.account.upcoming_account_number_expiry",
        "financial_connections.account.upcoming_deactivation",
        "financial_connections.authorization.expected_deactivation_date_updated",
        "financial_connections.authorization.upcoming_deactivation",
        "identity.verification_session.canceled",
        "identity.verification_session.created",
        "identity.verification_session.processing",
        "identity.verification_session.redacted",
        "identity.verification_session.requires_input",
        "identity.verification_session.verified",
        "invoice.created",
        "invoice.deleted",
        "invoice.finalization_failed",
        "invoice.finalized",
        "invoice.marked_uncollectible",
        "invoice.overdue",
        "invoice.overpaid",
        "invoice.paid",
        "invoice.payment_action_required",
        "invoice.payment_attempt_required",
        "invoice.payment_failed",
        "invoice.payment_succeeded",
        "invoice.sent",
        "invoice.upcoming",
        "invoice.updated",
        "invoice.voided",
        "invoice.will_be_due",
        "invoice_payment.paid",
        "invoiceitem.created",
        "invoiceitem.deleted",
        "issuing_authorization.created",
        "issuing_authorization.request",
        "issuing_authorization.updated",
        "issuing_card.created",
        "issuing_card.updated",
        "issuing_cardholder.created",
        "issuing_cardholder.updated",
        "issuing_dispute.closed",
        "issuing_dispute.created",
        "issuing_dispute.funds_reinstated",
        "issuing_dispute.funds_rescinded",
        "issuing_dispute.submitted",
        "issuing_dispute.updated",
        "issuing_personalization_design.activated",
        "issuing_personalization_design.deactivated",
        "issuing_personalization_design.rejected",
        "issuing_personalization_design.updated",
        "issuing_token.created",
        "issuing_token.updated",
        "issuing_transaction.created",
        "issuing_transaction.purchase_details_receipt_updated",
        "issuing_transaction.updated",
        "mandate.updated",
        "payment_intent.amount_capturable_updated",
        "payment_intent.canceled",
        "payment_intent.created",
        "payment_intent.partially_funded",
        "payment_intent.payment_failed",
        "payment_intent.processing",
        "payment_intent.requires_action",
        "payment_intent.succeeded",
        "payment_link.created",
        "payment_link.updated",
        "payment_method.attached",
        "payment_method.automatically_updated",
        "payment_method.detached",
        "payment_method.updated",
        "payout.canceled",
        "payout.created",
        "payout.failed",
        "payout.paid",
        "payout.reconciliation_completed",
        "payout.updated",
        "person.created",
        "person.deleted",
        "person.updated",
        "plan.created",
        "plan.deleted",
        "plan.updated",
        "price.created",
        "price.deleted",
        "price.updated",
        "product.created",
        "product.deleted",
        "product.updated",
        "promotion_code.created",
        "promotion_code.updated",
        "quote.accepted",
        "quote.canceled",
        "quote.created",
        "quote.finalized",
        "radar.early_fraud_warning.created",
        "radar.early_fraud_warning.updated",
        "refund.created",
        "refund.failed",
        "refund.updated",
        "reporting.report_run.failed",
        "reporting.report_run.succeeded",
        "reporting.report_type.updated",
        "reserve.hold.created",
        "reserve.hold.updated",
        "reserve.plan.created",
        "reserve.plan.disabled",
        "reserve.plan.expired",
        "reserve.plan.updated",
        "reserve.release.created",
        "review.closed",
        "review.opened",
        "setup_intent.canceled",
        "setup_intent.created",
        "setup_intent.requires_action",
        "setup_intent.setup_failed",
        "setup_intent.succeeded",
        "sigma.scheduled_query_run.created",
        "source.canceled",
        "source.chargeable",
        "source.failed",
        "source.mandate_notification",
        "source.refund_attributes_required",
        "source.transaction.created",
        "source.transaction.updated",
        "subscription_schedule.aborted",
        "subscription_schedule.canceled",
        "subscription_schedule.completed",
        "subscription_schedule.created",
        "subscription_schedule.expiring",
        "subscription_schedule.released",
        "subscription_schedule.updated",
        "tax.settings.updated",
        "tax_rate.created",
        "tax_rate.updated",
        "terminal.reader.action_failed",
        "terminal.reader.action_succeeded",
        "terminal.reader.action_updated",
        "test_helpers.test_clock.advancing",
        "test_helpers.test_clock.created",
        "test_helpers.test_clock.deleted",
        "test_helpers.test_clock.internal_failure",
        "test_helpers.test_clock.ready",
        "three_d_secure.authentication.canceled",
        "three_d_secure.authentication.challenge_started",
        "three_d_secure.authentication.errored",
        "three_d_secure.authentication.failed",
        "three_d_secure.authentication.requires_challenge",
        "three_d_secure.authentication.requires_submission",
        "three_d_secure.authentication.succeeded",
        "topup.canceled",
        "topup.created",
        "topup.failed",
        "topup.reversed",
        "topup.succeeded",
        "transfer.created",
        "transfer.reversed",
        "transfer.updated",
        "treasury.credit_reversal.created",
        "treasury.credit_reversal.posted",
        "treasury.debit_reversal.completed",
        "treasury.debit_reversal.created",
        "treasury.debit_reversal.initial_credit_granted",
        "treasury.financial_account.closed",
        "treasury.financial_account.created",
        "treasury.financial_account.features_status_updated",
        "treasury.inbound_transfer.canceled",
        "treasury.inbound_transfer.created",
        "treasury.inbound_transfer.failed",
        "treasury.inbound_transfer.succeeded",
        "treasury.outbound_payment.canceled",
        "treasury.outbound_payment.created",
        "treasury.outbound_payment.expected_arrival_date_updated",
        "treasury.outbound_payment.failed",
        "treasury.outbound_payment.posted",
        "treasury.outbound_payment.returned",
        "treasury.outbound_payment.tracking_details_updated",
        "treasury.outbound_transfer.canceled",
        "treasury.outbound_transfer.created",
        "treasury.outbound_transfer.expected_arrival_date_updated",
        "treasury.outbound_transfer.failed",
        "treasury.outbound_transfer.posted",
        "treasury.outbound_transfer.returned",
        "treasury.outbound_transfer.tracking_details_updated",
        "treasury.received_credit.created",
        "treasury.received_credit.failed",
        "treasury.received_credit.succeeded",
        "treasury.received_debit.created",
      ]),
    ).annotate({
      description:
        "The list of events to enable for this endpoint. You may specify `['*']` to enable all events, except those that require explicit selection.",
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
  metadata: Schema.optionalKey(
    Schema.Union([
      Schema.Record(Schema.String, Schema.String),
      Schema.Literal(""),
    ]).annotate({
      description:
        "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
    }),
  ),
  url: Schema.optionalKey(
    Schema.String.annotate({ description: "The URL of the webhook endpoint." }),
  ),
  webhook_endpoint: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const PostWebhookEndpointsWebhookEndpointOutput = Stripewebhook_endpoint;
export const PostWebhookEndpointsWebhookEndpointError = Stripeerror;
export const DeleteWebhookEndpointsWebhookEndpointInput = Schema.Struct({
  webhook_endpoint: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const DeleteWebhookEndpointsWebhookEndpointOutput =
  Stripedeleted_webhook_endpoint;
export const DeleteWebhookEndpointsWebhookEndpointError = Stripeerror;
/**
 * The GetWebhookEndpointsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetWebhookEndpointsOperation: StripeOperation & {
  readonly input: typeof GetWebhookEndpointsInput;
  readonly output: typeof GetWebhookEndpointsOutput;
  readonly error: typeof GetWebhookEndpointsError;
} = {
  name: "GetWebhookEndpoints",
  method: "GET",
  path: "/v1/webhook_endpoints",
  pathParameters: [],
  queryParameters: ["ending_before", "expand", "limit", "starting_after"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetWebhookEndpointsInput,
  output: GetWebhookEndpointsOutput,
  error: GetWebhookEndpointsError,
};
/**
 * The PostWebhookEndpointsOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostWebhookEndpointsOperation: StripeOperation & {
  readonly input: typeof PostWebhookEndpointsInput;
  readonly output: typeof PostWebhookEndpointsOutput;
  readonly error: typeof PostWebhookEndpointsError;
} = {
  name: "PostWebhookEndpoints",
  method: "POST",
  path: "/v1/webhook_endpoints",
  pathParameters: [],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostWebhookEndpointsInput,
  output: PostWebhookEndpointsOutput,
  error: PostWebhookEndpointsError,
};
/**
 * The GetWebhookEndpointsWebhookEndpointOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const GetWebhookEndpointsWebhookEndpointOperation: StripeOperation & {
  readonly input: typeof GetWebhookEndpointsWebhookEndpointInput;
  readonly output: typeof GetWebhookEndpointsWebhookEndpointOutput;
  readonly error: typeof GetWebhookEndpointsWebhookEndpointError;
} = {
  name: "GetWebhookEndpointsWebhookEndpoint",
  method: "GET",
  path: "/v1/webhook_endpoints/{webhook_endpoint}",
  pathParameters: ["webhook_endpoint"],
  queryParameters: ["expand"],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: GetWebhookEndpointsWebhookEndpointInput,
  output: GetWebhookEndpointsWebhookEndpointOutput,
  error: GetWebhookEndpointsWebhookEndpointError,
};
/**
 * The PostWebhookEndpointsWebhookEndpointOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const PostWebhookEndpointsWebhookEndpointOperation: StripeOperation & {
  readonly input: typeof PostWebhookEndpointsWebhookEndpointInput;
  readonly output: typeof PostWebhookEndpointsWebhookEndpointOutput;
  readonly error: typeof PostWebhookEndpointsWebhookEndpointError;
} = {
  name: "PostWebhookEndpointsWebhookEndpoint",
  method: "POST",
  path: "/v1/webhook_endpoints/{webhook_endpoint}",
  pathParameters: ["webhook_endpoint"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: PostWebhookEndpointsWebhookEndpointInput,
  output: PostWebhookEndpointsWebhookEndpointOutput,
  error: PostWebhookEndpointsWebhookEndpointError,
};
/**
 * The DeleteWebhookEndpointsWebhookEndpointOperation value selects the schemas
 * that validate requests and decode responses for this API version.
 */
export const DeleteWebhookEndpointsWebhookEndpointOperation: StripeOperation & {
  readonly input: typeof DeleteWebhookEndpointsWebhookEndpointInput;
  readonly output: typeof DeleteWebhookEndpointsWebhookEndpointOutput;
  readonly error: typeof DeleteWebhookEndpointsWebhookEndpointError;
} = {
  name: "DeleteWebhookEndpointsWebhookEndpoint",
  method: "DELETE",
  path: "/v1/webhook_endpoints/{webhook_endpoint}",
  pathParameters: ["webhook_endpoint"],
  queryParameters: [],
  contentType: "application/x-www-form-urlencoded",
  apiVersion: stripeApiVersion,
  baseUrl: stripeApiBaseUrl,
  input: DeleteWebhookEndpointsWebhookEndpointInput,
  output: DeleteWebhookEndpointsWebhookEndpointOutput,
  error: DeleteWebhookEndpointsWebhookEndpointError,
};
/**
 * The makeWebhookEndpointsClient Effect obtains the application's StripeClient service.
 * Its result exposes functions with the contracts fixed by this specification.
 */
export const makeWebhookEndpointsClient = Effect.gen(function* () {
  const client = yield* StripeClient;
  /**
   * The GetWebhookEndpoints function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetWebhookEndpoints = Effect.fn("webhookEndpoints.GetWebhookEndpoints")(
    function* (input: GetWebhookEndpointsInput) {
      const response: GetWebhookEndpointsOutput = yield* client.invoke(
        GetWebhookEndpointsOperation,
        input,
      );
      return response;
    },
  );
  /**
   * The PostWebhookEndpoints function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostWebhookEndpoints = Effect.fn(
    "webhookEndpoints.PostWebhookEndpoints",
  )(function* (input: PostWebhookEndpointsInput) {
    const response: PostWebhookEndpointsOutput = yield* client.invoke(
      PostWebhookEndpointsOperation,
      input,
    );
    return response;
  });
  /**
   * The GetWebhookEndpointsWebhookEndpoint function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const GetWebhookEndpointsWebhookEndpoint = Effect.fn(
    "webhookEndpoints.GetWebhookEndpointsWebhookEndpoint",
  )(function* (input: GetWebhookEndpointsWebhookEndpointInput) {
    const response: GetWebhookEndpointsWebhookEndpointOutput =
      yield* client.invoke(GetWebhookEndpointsWebhookEndpointOperation, input);
    return response;
  });
  /**
   * The PostWebhookEndpointsWebhookEndpoint function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const PostWebhookEndpointsWebhookEndpoint = Effect.fn(
    "webhookEndpoints.PostWebhookEndpointsWebhookEndpoint",
  )(function* (input: PostWebhookEndpointsWebhookEndpointInput) {
    const response: PostWebhookEndpointsWebhookEndpointOutput =
      yield* client.invoke(PostWebhookEndpointsWebhookEndpointOperation, input);
    return response;
  });
  /**
   * The DeleteWebhookEndpointsWebhookEndpoint function validates its request before it invokes Stripe.
   * The result is the decoded response. Failures in transport or validation
   * and modeled Stripe errors propagate to the caller.
   */
  const DeleteWebhookEndpointsWebhookEndpoint = Effect.fn(
    "webhookEndpoints.DeleteWebhookEndpointsWebhookEndpoint",
  )(function* (input: DeleteWebhookEndpointsWebhookEndpointInput) {
    const response: DeleteWebhookEndpointsWebhookEndpointOutput =
      yield* client.invoke(
        DeleteWebhookEndpointsWebhookEndpointOperation,
        input,
      );
    return response;
  });
  return {
    GetWebhookEndpoints,
    PostWebhookEndpoints,
    GetWebhookEndpointsWebhookEndpoint,
    PostWebhookEndpointsWebhookEndpoint,
    DeleteWebhookEndpointsWebhookEndpoint,
  };
});
