// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import { Stripebank_account, Stripecard } from "./models/paymentSources.js";

export type StripeV1AccountOutputs = { readonly V1AccountId: string };
export type StripeBankAccountOutputs = {
  readonly BankAccountId: string;
  readonly AccountId: string;
};
export type StripeCardOutputs = {
  readonly CardId: string;
  readonly AccountId: string;
};
export type StripeApplePayDomainOutputs = { readonly ApplePayDomainId: string };
export type StripeAppsInstallOutputs = { readonly AppsInstallId: string };
export type StripeBillingAlertOutputs = { readonly BillingAlertId: string };
export type StripeBillingCreditGrantOutputs = {
  readonly BillingCreditGrantId: string;
};
export type StripeBillingFeedbackOptionOutputs = {
  readonly BillingFeedbackOptionId: string;
};
export type StripeBillingMeterOutputs = { readonly BillingMeterId: string };
export type StripeBillingPortalConfigurationOutputs = {
  readonly BillingPortalConfigurationId: string;
};
export type StripeChargeOutputs = { readonly ChargeId: string };
export type StripeRefundOutputs = { readonly RefundId: string };
export type StripeCheckoutSessionOutputs = {
  readonly CheckoutSessionId: string;
};
export type StripeClimateOrderOutputs = { readonly ClimateOrderId: string };
export type StripeCouponOutputs = { readonly CouponId: string };
export type StripeCreditNoteOutputs = { readonly CreditNoteId: string };
export type StripeCustomerOutputs = { readonly CustomerId: string };
export type StripeSubscriptionOutputs = { readonly SubscriptionId: string };
export type StripeTaxIdOutputs = { readonly TaxIdId: string };
export type StripeEntitlementsFeatureOutputs = {
  readonly EntitlementsFeatureId: string;
};
export type StripeFileLinkOutputs = { readonly FileLinkId: string };
export type StripeFinancialConnectionsSessionOutputs = {
  readonly FinancialConnectionsSessionId: string;
};
export type StripeForwardingRequestOutputs = {
  readonly ForwardingRequestId: string;
};
export type StripeIdentityVerificationSessionOutputs = {
  readonly IdentityVerificationSessionId: string;
};
export type StripeInvoiceitemOutputs = { readonly InvoiceitemId: string };
export type StripeInvoiceOutputs = { readonly InvoiceId: string };
export type StripeIssuingCardholderOutputs = {
  readonly IssuingCardholderId: string;
};
export type StripeIssuingCardOutputs = { readonly IssuingCardId: string };
export type StripeIssuingDisputeOutputs = { readonly IssuingDisputeId: string };
export type StripeIssuingPersonalizationDesignOutputs = {
  readonly IssuingPersonalizationDesignId: string;
};
export type StripePaymentIntentOutputs = { readonly PaymentIntentId: string };
export type StripePaymentLinkOutputs = { readonly PaymentLinkId: string };
export type StripePaymentMethodConfigurationOutputs = {
  readonly PaymentMethodConfigurationId: string;
};
export type StripePaymentMethodDomainOutputs = {
  readonly PaymentMethodDomainId: string;
};
export type StripePaymentMethodOutputs = { readonly PaymentMethodId: string };
export type StripePayoutOutputs = { readonly PayoutId: string };
export type StripePlanOutputs = { readonly PlanId: string };
export type StripePriceOutputs = { readonly PriceId: string };
export type StripeProductCatalogTrialOfferOutputs = {
  readonly ProductCatalogTrialOfferId: string;
};
export type StripeProductOutputs = { readonly ProductId: string };
export type StripePromotionCodeOutputs = { readonly PromotionCodeId: string };
export type StripeQuoteOutputs = { readonly QuoteId: string };
export type StripeRadarValueListItemOutputs = {
  readonly RadarValueListItemId: string;
};
export type StripeRadarValueListOutputs = { readonly RadarValueListId: string };
export type StripeReportingReportRunOutputs = {
  readonly ReportingReportRunId: string;
};
export type StripeSetupIntentOutputs = { readonly SetupIntentId: string };
export type StripeShippingRateOutputs = { readonly ShippingRateId: string };
export type StripeSourceOutputs = { readonly SourceId: string };
export type StripeSubscriptionItemOutputs = {
  readonly SubscriptionItemId: string;
};
export type StripeSubscriptionScheduleOutputs = {
  readonly SubscriptionScheduleId: string;
};
export type StripeTaxLocationOutputs = { readonly TaxLocationId: string };
export type StripeTaxRegistrationOutputs = {
  readonly TaxRegistrationId: string;
};
export type StripeTaxRateOutputs = { readonly TaxRateId: string };
export type StripeTerminalConfigurationOutputs = {
  readonly TerminalConfigurationId: string;
};
export type StripeTerminalLocationOutputs = {
  readonly TerminalLocationId: string;
};
export type StripeTerminalReaderOutputs = { readonly TerminalReaderId: string };
export type StripeTestHelpersTestClockOutputs = {
  readonly TestHelpersTestClockId: string;
};
export type StripeThreeDSecureAuthenticationOutputs = {
  readonly ThreeDSecureAuthenticationId: string;
};
export type StripeTokenOutputs = { readonly TokenId: string };
export type StripeTopupOutputs = { readonly TopupId: string };
export type StripeTransferOutputs = { readonly TransferId: string };
export type StripeTreasuryCreditReversalOutputs = {
  readonly TreasuryCreditReversalId: string;
};
export type StripeTreasuryDebitReversalOutputs = {
  readonly TreasuryDebitReversalId: string;
};
export type StripeTreasuryFinancialAccountOutputs = {
  readonly TreasuryFinancialAccountId: string;
};
export type StripeTreasuryInboundTransferOutputs = {
  readonly TreasuryInboundTransferId: string;
};
export type StripeTreasuryOutboundPaymentOutputs = {
  readonly TreasuryOutboundPaymentId: string;
};
export type StripeTreasuryOutboundTransferOutputs = {
  readonly TreasuryOutboundTransferId: string;
};
export type StripeWebhookEndpointOutputs = {
  readonly WebhookEndpointId: string;
  readonly WebhookSigningSecret?: string;
};
export type StripeProductCatalogImportOutputs = {
  readonly ProductCatalogImportId: string;
};
export type StripeAccountTokenOutputs = { readonly AccountTokenId: string };
export type StripeAccountOutputs = { readonly AccountId: string };
export type StripeEventDestinationOutputs = {
  readonly EventDestinationId: string;
};
export type StripeGBBankAccountOutputs = { readonly GBBankAccountId: string };
export type StripeUSBankAccountOutputs = { readonly USBankAccountId: string };
export type StripeFinancialAddressOutputs = {
  readonly FinancialAddressId: string;
};
export type StripeInboundTransferOutputs = {
  readonly InboundTransferId: string;
};
export type StripeOutboundPaymentOutputs = {
  readonly OutboundPaymentId: string;
};
export type StripeOutboundSetupIntentOutputs = {
  readonly OutboundSetupIntentId: string;
};
export type StripePayoutIntentOutputs = { readonly PayoutIntentId: string };
export type StripeRecipientVerificationOutputs = {
  readonly RecipientVerificationId: string;
};
export type StripeBillingConfigurationExportOutputs = {
  readonly OutputPath: string;
};
export type StripeBankAccountResponse = Stripebank_account;
export type StripeCardResponse = Stripecard;

export const StripeV1AccountOutputsSchema = Schema.Struct({
  V1AccountId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBankAccountOutputsSchema = Schema.Struct({
  BankAccountId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  AccountId: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeCardOutputsSchema = Schema.Struct({
  CardId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  AccountId: Schema.String.check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeApplePayDomainOutputsSchema = Schema.Struct({
  ApplePayDomainId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeAppsInstallOutputsSchema = Schema.Struct({
  AppsInstallId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBillingAlertOutputsSchema = Schema.Struct({
  BillingAlertId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBillingCreditGrantOutputsSchema = Schema.Struct({
  BillingCreditGrantId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBillingFeedbackOptionOutputsSchema = Schema.Struct({
  BillingFeedbackOptionId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBillingMeterOutputsSchema = Schema.Struct({
  BillingMeterId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeBillingPortalConfigurationOutputsSchema = Schema.Struct({
  BillingPortalConfigurationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeChargeOutputsSchema = Schema.Struct({
  ChargeId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeRefundOutputsSchema = Schema.Struct({
  RefundId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeCheckoutSessionOutputsSchema = Schema.Struct({
  CheckoutSessionId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeClimateOrderOutputsSchema = Schema.Struct({
  ClimateOrderId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeCouponOutputsSchema = Schema.Struct({
  CouponId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeCreditNoteOutputsSchema = Schema.Struct({
  CreditNoteId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeCustomerOutputsSchema = Schema.Struct({
  CustomerId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeSubscriptionOutputsSchema = Schema.Struct({
  SubscriptionId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTaxIdOutputsSchema = Schema.Struct({
  TaxIdId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeEntitlementsFeatureOutputsSchema = Schema.Struct({
  EntitlementsFeatureId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeFileLinkOutputsSchema = Schema.Struct({
  FileLinkId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeFinancialConnectionsSessionOutputsSchema = Schema.Struct({
  FinancialConnectionsSessionId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeForwardingRequestOutputsSchema = Schema.Struct({
  ForwardingRequestId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeIdentityVerificationSessionOutputsSchema = Schema.Struct({
  IdentityVerificationSessionId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeInvoiceitemOutputsSchema = Schema.Struct({
  InvoiceitemId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeInvoiceOutputsSchema = Schema.Struct({
  InvoiceId: Schema.String.annotate({
    description:
      "Unique identifier for the object. For preview invoices created using the [create preview](https://stripe.com/docs/api/invoices/create_preview) endpoint, this id will be prefixed with `upcoming_in`.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeIssuingCardholderOutputsSchema = Schema.Struct({
  IssuingCardholderId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeIssuingCardOutputsSchema = Schema.Struct({
  IssuingCardId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeIssuingDisputeOutputsSchema = Schema.Struct({
  IssuingDisputeId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeIssuingPersonalizationDesignOutputsSchema = Schema.Struct({
  IssuingPersonalizationDesignId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePaymentIntentOutputsSchema = Schema.Struct({
  PaymentIntentId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePaymentLinkOutputsSchema = Schema.Struct({
  PaymentLinkId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePaymentMethodConfigurationOutputsSchema = Schema.Struct({
  PaymentMethodConfigurationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePaymentMethodDomainOutputsSchema = Schema.Struct({
  PaymentMethodDomainId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePaymentMethodOutputsSchema = Schema.Struct({
  PaymentMethodId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePayoutOutputsSchema = Schema.Struct({
  PayoutId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePlanOutputsSchema = Schema.Struct({
  PlanId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePriceOutputsSchema = Schema.Struct({
  PriceId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeProductCatalogTrialOfferOutputsSchema = Schema.Struct({
  ProductCatalogTrialOfferId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeProductOutputsSchema = Schema.Struct({
  ProductId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripePromotionCodeOutputsSchema = Schema.Struct({
  PromotionCodeId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeQuoteOutputsSchema = Schema.Struct({
  QuoteId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeRadarValueListItemOutputsSchema = Schema.Struct({
  RadarValueListItemId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeRadarValueListOutputsSchema = Schema.Struct({
  RadarValueListId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeReportingReportRunOutputsSchema = Schema.Struct({
  ReportingReportRunId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeSetupIntentOutputsSchema = Schema.Struct({
  SetupIntentId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeShippingRateOutputsSchema = Schema.Struct({
  ShippingRateId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeSourceOutputsSchema = Schema.Struct({
  SourceId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeSubscriptionItemOutputsSchema = Schema.Struct({
  SubscriptionItemId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeSubscriptionScheduleOutputsSchema = Schema.Struct({
  SubscriptionScheduleId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTaxLocationOutputsSchema = Schema.Struct({
  TaxLocationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTaxRegistrationOutputsSchema = Schema.Struct({
  TaxRegistrationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTaxRateOutputsSchema = Schema.Struct({
  TaxRateId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTerminalConfigurationOutputsSchema = Schema.Struct({
  TerminalConfigurationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTerminalLocationOutputsSchema = Schema.Struct({
  TerminalLocationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTerminalReaderOutputsSchema = Schema.Struct({
  TerminalReaderId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTestHelpersTestClockOutputsSchema = Schema.Struct({
  TestHelpersTestClockId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeThreeDSecureAuthenticationOutputsSchema = Schema.Struct({
  ThreeDSecureAuthenticationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTokenOutputsSchema = Schema.Struct({
  TokenId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTopupOutputsSchema = Schema.Struct({
  TopupId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTransferOutputsSchema = Schema.Struct({
  TransferId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryCreditReversalOutputsSchema = Schema.Struct({
  TreasuryCreditReversalId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryDebitReversalOutputsSchema = Schema.Struct({
  TreasuryDebitReversalId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryFinancialAccountOutputsSchema = Schema.Struct({
  TreasuryFinancialAccountId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryInboundTransferOutputsSchema = Schema.Struct({
  TreasuryInboundTransferId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryOutboundPaymentOutputsSchema = Schema.Struct({
  TreasuryOutboundPaymentId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeTreasuryOutboundTransferOutputsSchema = Schema.Struct({
  TreasuryOutboundTransferId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
});
export const StripeWebhookEndpointOutputsSchema = Schema.Struct({
  WebhookEndpointId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }).check(
    Schema.isMaxCodePoints(5000).annotate({
      expected: "a string with at most 5000 code points",
    }),
  ),
  WebhookSigningSecret: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The endpoint's secret, used to generate [webhook signatures](https://docs.stripe.com/webhooks/signatures). Only returned at creation.",
    }).check(
      Schema.isMaxCodePoints(5000).annotate({
        expected: "a string with at most 5000 code points",
      }),
    ),
  ),
});
export const StripeProductCatalogImportOutputsSchema = Schema.Struct({
  ProductCatalogImportId: Schema.String.annotate({
    description: "The unique identifier for this ProductCatalogImport.",
  }),
});
export const StripeAccountTokenOutputsSchema = Schema.Struct({
  AccountTokenId: Schema.String.annotate({
    description: "Unique identifier for the token.",
  }),
});
export const StripeAccountOutputsSchema = Schema.Struct({
  AccountId: Schema.String.annotate({
    description: "Unique identifier for the Account.",
  }),
});
export const StripeEventDestinationOutputsSchema = Schema.Struct({
  EventDestinationId: Schema.String.annotate({
    description: "Unique identifier for the object.",
  }),
});
export const StripeGBBankAccountOutputsSchema = Schema.Struct({
  GBBankAccountId: Schema.String.annotate({
    description: "The ID of the GBBankAccount object.",
  }),
});
export const StripeUSBankAccountOutputsSchema = Schema.Struct({
  USBankAccountId: Schema.String.annotate({
    description: "The ID of the USBankAccount object.",
  }),
});
export const StripeFinancialAddressOutputsSchema = Schema.Struct({
  FinancialAddressId: Schema.String.annotate({
    description: "The ID of the FinancialAddress.",
  }),
});
export const StripeInboundTransferOutputsSchema = Schema.Struct({
  InboundTransferId: Schema.String.annotate({
    description: "Unique identifier for the InboundTransfer.",
  }),
});
export const StripeOutboundPaymentOutputsSchema = Schema.Struct({
  OutboundPaymentId: Schema.String.annotate({
    description: "Unique identifier for the OutboundPayment.",
  }),
});
export const StripeOutboundSetupIntentOutputsSchema = Schema.Struct({
  OutboundSetupIntentId: Schema.String.annotate({
    description: "ID of the outbound setup intent.",
  }),
});
export const StripePayoutIntentOutputsSchema = Schema.Struct({
  PayoutIntentId: Schema.String.annotate({
    description: "Unique identifier for the PayoutIntent.",
  }),
});
export const StripeRecipientVerificationOutputsSchema = Schema.Struct({
  RecipientVerificationId: Schema.String.annotate({
    description: "The ID of the RecipientVerification.",
  }),
});
export const StripeBillingConfigurationExportOutputsSchema = Schema.Struct({
  OutputPath: Schema.String.check(
    Schema.isMinLength(1).annotate({
      expected: "a value with a length of at least 1",
    }),
  ),
});
export const StripeBankAccountResponseSchema = Stripebank_account;
export const StripeCardResponseSchema = Stripecard;
