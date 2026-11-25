import { Effect, Predicate, Record, Schema } from "effect";
import type { ResourceKey } from "../../../../core/resource/model.js";
import { ResourceGraphBuilder } from "../../../../core/resource/resourceGraphBuilder.js";
import {
  createStripeAccountDeclaration,
  type StripeAccountResource,
} from "./resourceBindings/Account.js";
import {
  createStripeAccountTokenDeclaration,
  type StripeAccountTokenResource,
} from "./resourceBindings/AccountToken.js";
import {
  createStripeApplePayDomainDeclaration,
  type StripeApplePayDomainResource,
} from "./resourceBindings/ApplePayDomain.js";
import {
  createStripeAppsInstallDeclaration,
  type StripeAppsInstallResource,
} from "./resourceBindings/AppsInstall.js";
import {
  createStripeBankAccountDeclaration,
  type StripeBankAccountResource,
} from "./resourceBindings/BankAccount.js";
import {
  createStripeBillingAlertDeclaration,
  type StripeBillingAlertResource,
} from "./resourceBindings/BillingAlert.js";
import {
  createStripeBillingConfigurationExportDeclaration,
  type StripeBillingConfigurationExportResource,
} from "./resourceBindings/BillingConfigurationExport.js";
import {
  createStripeBillingCreditGrantDeclaration,
  type StripeBillingCreditGrantResource,
} from "./resourceBindings/BillingCreditGrant.js";
import {
  createStripeBillingFeedbackOptionDeclaration,
  type StripeBillingFeedbackOptionResource,
} from "./resourceBindings/BillingFeedbackOption.js";
import {
  createStripeBillingMeterDeclaration,
  type StripeBillingMeterResource,
} from "./resourceBindings/BillingMeter.js";
import {
  createStripeBillingPortalConfigurationDeclaration,
  type StripeBillingPortalConfigurationResource,
} from "./resourceBindings/BillingPortalConfiguration.js";
import {
  createStripeCardDeclaration,
  type StripeCardResource,
} from "./resourceBindings/Card.js";
import {
  createStripeChargeDeclaration,
  type StripeChargeResource,
} from "./resourceBindings/Charge.js";
import {
  createStripeCheckoutSessionDeclaration,
  type StripeCheckoutSessionResource,
} from "./resourceBindings/CheckoutSession.js";
import {
  createStripeClimateOrderDeclaration,
  type StripeClimateOrderResource,
} from "./resourceBindings/ClimateOrder.js";
import {
  createStripeCouponDeclaration,
  type StripeCouponResource,
} from "./resourceBindings/Coupon.js";
import {
  createStripeCreditNoteDeclaration,
  type StripeCreditNoteResource,
} from "./resourceBindings/CreditNote.js";
import {
  createStripeCustomerDeclaration,
  type StripeCustomerResource,
} from "./resourceBindings/Customer.js";
import {
  createStripeEntitlementsFeatureDeclaration,
  type StripeEntitlementsFeatureResource,
} from "./resourceBindings/EntitlementsFeature.js";
import {
  createStripeEventDestinationDeclaration,
  type StripeEventDestinationResource,
} from "./resourceBindings/EventDestination.js";
import {
  createStripeFileLinkDeclaration,
  type StripeFileLinkResource,
} from "./resourceBindings/FileLink.js";
import {
  createStripeFinancialAddressDeclaration,
  type StripeFinancialAddressResource,
} from "./resourceBindings/FinancialAddress.js";
import {
  createStripeFinancialConnectionsSessionDeclaration,
  type StripeFinancialConnectionsSessionResource,
} from "./resourceBindings/FinancialConnectionsSession.js";
import {
  createStripeForwardingRequestDeclaration,
  type StripeForwardingRequestResource,
} from "./resourceBindings/ForwardingRequest.js";
import {
  createStripeGBBankAccountDeclaration,
  type StripeGBBankAccountResource,
} from "./resourceBindings/GBBankAccount.js";
import {
  createStripeIdentityVerificationSessionDeclaration,
  type StripeIdentityVerificationSessionResource,
} from "./resourceBindings/IdentityVerificationSession.js";
import {
  createStripeInboundTransferDeclaration,
  type StripeInboundTransferResource,
} from "./resourceBindings/InboundTransfer.js";
import {
  createStripeInvoiceDeclaration,
  type StripeInvoiceResource,
} from "./resourceBindings/Invoice.js";
import {
  createStripeInvoiceitemDeclaration,
  type StripeInvoiceitemResource,
} from "./resourceBindings/Invoiceitem.js";
import {
  createStripeIssuingCardDeclaration,
  type StripeIssuingCardResource,
} from "./resourceBindings/IssuingCard.js";
import {
  createStripeIssuingCardholderDeclaration,
  type StripeIssuingCardholderResource,
} from "./resourceBindings/IssuingCardholder.js";
import {
  createStripeIssuingDisputeDeclaration,
  type StripeIssuingDisputeResource,
} from "./resourceBindings/IssuingDispute.js";
import {
  createStripeIssuingPersonalizationDesignDeclaration,
  type StripeIssuingPersonalizationDesignResource,
} from "./resourceBindings/IssuingPersonalizationDesign.js";
import {
  createStripeOutboundPaymentDeclaration,
  type StripeOutboundPaymentResource,
} from "./resourceBindings/OutboundPayment.js";
import {
  createStripeOutboundSetupIntentDeclaration,
  type StripeOutboundSetupIntentResource,
} from "./resourceBindings/OutboundSetupIntent.js";
import {
  createStripePaymentIntentDeclaration,
  type StripePaymentIntentResource,
} from "./resourceBindings/PaymentIntent.js";
import {
  createStripePaymentLinkDeclaration,
  type StripePaymentLinkResource,
} from "./resourceBindings/PaymentLink.js";
import {
  createStripePaymentMethodDeclaration,
  type StripePaymentMethodResource,
} from "./resourceBindings/PaymentMethod.js";
import {
  createStripePaymentMethodConfigurationDeclaration,
  type StripePaymentMethodConfigurationResource,
} from "./resourceBindings/PaymentMethodConfiguration.js";
import {
  createStripePaymentMethodDomainDeclaration,
  type StripePaymentMethodDomainResource,
} from "./resourceBindings/PaymentMethodDomain.js";
import {
  createStripePayoutDeclaration,
  type StripePayoutResource,
} from "./resourceBindings/Payout.js";
import {
  createStripePayoutIntentDeclaration,
  type StripePayoutIntentResource,
} from "./resourceBindings/PayoutIntent.js";
import {
  createStripePlanDeclaration,
  type StripePlanResource,
} from "./resourceBindings/Plan.js";
import {
  createStripePriceDeclaration,
  type StripePriceResource,
} from "./resourceBindings/Price.js";
import {
  createStripeProductDeclaration,
  type StripeProductResource,
} from "./resourceBindings/Product.js";
import {
  createStripeProductCatalogImportDeclaration,
  type StripeProductCatalogImportResource,
} from "./resourceBindings/ProductCatalogImport.js";
import {
  createStripeProductCatalogTrialOfferDeclaration,
  type StripeProductCatalogTrialOfferResource,
} from "./resourceBindings/ProductCatalogTrialOffer.js";
import {
  createStripePromotionCodeDeclaration,
  type StripePromotionCodeResource,
} from "./resourceBindings/PromotionCode.js";
import {
  createStripeQuoteDeclaration,
  type StripeQuoteResource,
} from "./resourceBindings/Quote.js";
import {
  createStripeRadarValueListDeclaration,
  type StripeRadarValueListResource,
} from "./resourceBindings/RadarValueList.js";
import {
  createStripeRadarValueListItemDeclaration,
  type StripeRadarValueListItemResource,
} from "./resourceBindings/RadarValueListItem.js";
import {
  createStripeRecipientVerificationDeclaration,
  type StripeRecipientVerificationResource,
} from "./resourceBindings/RecipientVerification.js";
import {
  createStripeRefundDeclaration,
  type StripeRefundResource,
} from "./resourceBindings/Refund.js";
import {
  createStripeReportingReportRunDeclaration,
  type StripeReportingReportRunResource,
} from "./resourceBindings/ReportingReportRun.js";
import {
  createStripeSetupIntentDeclaration,
  type StripeSetupIntentResource,
} from "./resourceBindings/SetupIntent.js";
import {
  createStripeShippingRateDeclaration,
  type StripeShippingRateResource,
} from "./resourceBindings/ShippingRate.js";
import {
  createStripeSourceDeclaration,
  type StripeSourceResource,
} from "./resourceBindings/Source.js";
import {
  createStripeSubscriptionDeclaration,
  type StripeSubscriptionResource,
} from "./resourceBindings/Subscription.js";
import {
  createStripeSubscriptionItemDeclaration,
  type StripeSubscriptionItemResource,
} from "./resourceBindings/SubscriptionItem.js";
import {
  createStripeSubscriptionScheduleDeclaration,
  type StripeSubscriptionScheduleResource,
} from "./resourceBindings/SubscriptionSchedule.js";
import {
  createStripeTaxIdDeclaration,
  type StripeTaxIdResource,
} from "./resourceBindings/TaxId.js";
import {
  createStripeTaxLocationDeclaration,
  type StripeTaxLocationResource,
} from "./resourceBindings/TaxLocation.js";
import {
  createStripeTaxRateDeclaration,
  type StripeTaxRateResource,
} from "./resourceBindings/TaxRate.js";
import {
  createStripeTaxRegistrationDeclaration,
  type StripeTaxRegistrationResource,
} from "./resourceBindings/TaxRegistration.js";
import {
  createStripeTerminalConfigurationDeclaration,
  type StripeTerminalConfigurationResource,
} from "./resourceBindings/TerminalConfiguration.js";
import {
  createStripeTerminalLocationDeclaration,
  type StripeTerminalLocationResource,
} from "./resourceBindings/TerminalLocation.js";
import {
  createStripeTerminalReaderDeclaration,
  type StripeTerminalReaderResource,
} from "./resourceBindings/TerminalReader.js";
import {
  createStripeTestHelpersTestClockDeclaration,
  type StripeTestHelpersTestClockResource,
} from "./resourceBindings/TestHelpersTestClock.js";
import {
  createStripeThreeDSecureAuthenticationDeclaration,
  type StripeThreeDSecureAuthenticationResource,
} from "./resourceBindings/ThreeDSecureAuthentication.js";
import {
  createStripeTokenDeclaration,
  type StripeTokenResource,
} from "./resourceBindings/Token.js";
import {
  createStripeTopupDeclaration,
  type StripeTopupResource,
} from "./resourceBindings/Topup.js";
import {
  createStripeTransferDeclaration,
  type StripeTransferResource,
} from "./resourceBindings/Transfer.js";
import {
  createStripeTreasuryCreditReversalDeclaration,
  type StripeTreasuryCreditReversalResource,
} from "./resourceBindings/TreasuryCreditReversal.js";
import {
  createStripeTreasuryDebitReversalDeclaration,
  type StripeTreasuryDebitReversalResource,
} from "./resourceBindings/TreasuryDebitReversal.js";
import {
  createStripeTreasuryFinancialAccountDeclaration,
  type StripeTreasuryFinancialAccountResource,
} from "./resourceBindings/TreasuryFinancialAccount.js";
import {
  createStripeTreasuryInboundTransferDeclaration,
  type StripeTreasuryInboundTransferResource,
} from "./resourceBindings/TreasuryInboundTransfer.js";
import {
  createStripeTreasuryOutboundPaymentDeclaration,
  type StripeTreasuryOutboundPaymentResource,
} from "./resourceBindings/TreasuryOutboundPayment.js";
import {
  createStripeTreasuryOutboundTransferDeclaration,
  type StripeTreasuryOutboundTransferResource,
} from "./resourceBindings/TreasuryOutboundTransfer.js";
import {
  createStripeUSBankAccountDeclaration,
  type StripeUSBankAccountResource,
} from "./resourceBindings/USBankAccount.js";
import {
  createStripeV1AccountDeclaration,
  type StripeV1AccountResource,
} from "./resourceBindings/V1Account.js";
import {
  createStripeWebhookEndpointDeclaration,
  type StripeWebhookEndpointResource,
} from "./resourceBindings/WebhookEndpoint.js";
import {
  type StripeAccountPropsEntity,
  StripeAccountPropsEntitySchema,
} from "./resourceInputs/StripeAccountPropsEntitySchema.js";
import { StripeAccountPropsSchema } from "./resourceInputs/StripeAccountPropsSchema.js";
import {
  type StripeAccountTokenPropsEntity,
  StripeAccountTokenPropsEntitySchema,
} from "./resourceInputs/StripeAccountTokenPropsEntitySchema.js";
import { StripeAccountTokenPropsSchema } from "./resourceInputs/StripeAccountTokenPropsSchema.js";
import {
  type StripeApplePayDomainPropsEntity,
  StripeApplePayDomainPropsEntitySchema,
} from "./resourceInputs/StripeApplePayDomainPropsEntitySchema.js";
import { StripeApplePayDomainPropsSchema } from "./resourceInputs/StripeApplePayDomainPropsSchema.js";
import {
  type StripeAppsInstallPropsEntity,
  StripeAppsInstallPropsEntitySchema,
} from "./resourceInputs/StripeAppsInstallPropsEntitySchema.js";
import { StripeAppsInstallPropsSchema } from "./resourceInputs/StripeAppsInstallPropsSchema.js";
import {
  type StripeBankAccountPropsEntity,
  StripeBankAccountPropsEntitySchema,
} from "./resourceInputs/StripeBankAccountPropsEntitySchema.js";
import { StripeBankAccountPropsSchema } from "./resourceInputs/StripeBankAccountPropsSchema.js";
import {
  type StripeBillingAlertPropsEntity,
  StripeBillingAlertPropsEntitySchema,
} from "./resourceInputs/StripeBillingAlertPropsEntitySchema.js";
import { StripeBillingAlertPropsSchema } from "./resourceInputs/StripeBillingAlertPropsSchema.js";
import {
  type StripeBillingConfigurationExportPropsEntity,
  StripeBillingConfigurationExportPropsEntitySchema,
} from "./resourceInputs/StripeBillingConfigurationExportPropsEntitySchema.js";
import { StripeBillingConfigurationExportPropsSchema } from "./resourceInputs/StripeBillingConfigurationExportPropsSchema.js";
import {
  type StripeBillingCreditGrantPropsEntity,
  StripeBillingCreditGrantPropsEntitySchema,
} from "./resourceInputs/StripeBillingCreditGrantPropsEntitySchema.js";
import { StripeBillingCreditGrantPropsSchema } from "./resourceInputs/StripeBillingCreditGrantPropsSchema.js";
import {
  type StripeBillingFeedbackOptionPropsEntity,
  StripeBillingFeedbackOptionPropsEntitySchema,
} from "./resourceInputs/StripeBillingFeedbackOptionPropsEntitySchema.js";
import { StripeBillingFeedbackOptionPropsSchema } from "./resourceInputs/StripeBillingFeedbackOptionPropsSchema.js";
import {
  type StripeBillingMeterPropsEntity,
  StripeBillingMeterPropsEntitySchema,
} from "./resourceInputs/StripeBillingMeterPropsEntitySchema.js";
import { StripeBillingMeterPropsSchema } from "./resourceInputs/StripeBillingMeterPropsSchema.js";
import {
  type StripeBillingPortalConfigurationPropsEntity,
  StripeBillingPortalConfigurationPropsEntitySchema,
} from "./resourceInputs/StripeBillingPortalConfigurationPropsEntitySchema.js";
import { StripeBillingPortalConfigurationPropsSchema } from "./resourceInputs/StripeBillingPortalConfigurationPropsSchema.js";
import {
  type StripeCardPropsEntity,
  StripeCardPropsEntitySchema,
} from "./resourceInputs/StripeCardPropsEntitySchema.js";
import { StripeCardPropsSchema } from "./resourceInputs/StripeCardPropsSchema.js";
import {
  type StripeChargePropsEntity,
  StripeChargePropsEntitySchema,
} from "./resourceInputs/StripeChargePropsEntitySchema.js";
import { StripeChargePropsSchema } from "./resourceInputs/StripeChargePropsSchema.js";
import {
  type StripeCheckoutSessionPropsEntity,
  StripeCheckoutSessionPropsEntitySchema,
} from "./resourceInputs/StripeCheckoutSessionPropsEntitySchema.js";
import { StripeCheckoutSessionPropsSchema } from "./resourceInputs/StripeCheckoutSessionPropsSchema.js";
import {
  type StripeClimateOrderPropsEntity,
  StripeClimateOrderPropsEntitySchema,
} from "./resourceInputs/StripeClimateOrderPropsEntitySchema.js";
import { StripeClimateOrderPropsSchema } from "./resourceInputs/StripeClimateOrderPropsSchema.js";
import {
  type StripeCouponPropsEntity,
  StripeCouponPropsEntitySchema,
} from "./resourceInputs/StripeCouponPropsEntitySchema.js";
import { StripeCouponPropsSchema } from "./resourceInputs/StripeCouponPropsSchema.js";
import {
  type StripeCreditNotePropsEntity,
  StripeCreditNotePropsEntitySchema,
} from "./resourceInputs/StripeCreditNotePropsEntitySchema.js";
import { StripeCreditNotePropsSchema } from "./resourceInputs/StripeCreditNotePropsSchema.js";
import {
  type StripeCustomerPropsEntity,
  StripeCustomerPropsEntitySchema,
} from "./resourceInputs/StripeCustomerPropsEntitySchema.js";
import { StripeCustomerPropsSchema } from "./resourceInputs/StripeCustomerPropsSchema.js";
import {
  type StripeEntitlementsFeaturePropsEntity,
  StripeEntitlementsFeaturePropsEntitySchema,
} from "./resourceInputs/StripeEntitlementsFeaturePropsEntitySchema.js";
import { StripeEntitlementsFeaturePropsSchema } from "./resourceInputs/StripeEntitlementsFeaturePropsSchema.js";
import {
  type StripeEventDestinationPropsEntity,
  StripeEventDestinationPropsEntitySchema,
} from "./resourceInputs/StripeEventDestinationPropsEntitySchema.js";
import { StripeEventDestinationPropsSchema } from "./resourceInputs/StripeEventDestinationPropsSchema.js";
import {
  type StripeFileLinkPropsEntity,
  StripeFileLinkPropsEntitySchema,
} from "./resourceInputs/StripeFileLinkPropsEntitySchema.js";
import { StripeFileLinkPropsSchema } from "./resourceInputs/StripeFileLinkPropsSchema.js";
import {
  type StripeFinancialAddressPropsEntity,
  StripeFinancialAddressPropsEntitySchema,
} from "./resourceInputs/StripeFinancialAddressPropsEntitySchema.js";
import { StripeFinancialAddressPropsSchema } from "./resourceInputs/StripeFinancialAddressPropsSchema.js";
import {
  type StripeFinancialConnectionsSessionPropsEntity,
  StripeFinancialConnectionsSessionPropsEntitySchema,
} from "./resourceInputs/StripeFinancialConnectionsSessionPropsEntitySchema.js";
import { StripeFinancialConnectionsSessionPropsSchema } from "./resourceInputs/StripeFinancialConnectionsSessionPropsSchema.js";
import {
  type StripeForwardingRequestPropsEntity,
  StripeForwardingRequestPropsEntitySchema,
} from "./resourceInputs/StripeForwardingRequestPropsEntitySchema.js";
import { StripeForwardingRequestPropsSchema } from "./resourceInputs/StripeForwardingRequestPropsSchema.js";
import {
  type StripeGBBankAccountPropsEntity,
  StripeGBBankAccountPropsEntitySchema,
} from "./resourceInputs/StripeGBBankAccountPropsEntitySchema.js";
import { StripeGBBankAccountPropsSchema } from "./resourceInputs/StripeGBBankAccountPropsSchema.js";
import {
  type StripeIdentityVerificationSessionPropsEntity,
  StripeIdentityVerificationSessionPropsEntitySchema,
} from "./resourceInputs/StripeIdentityVerificationSessionPropsEntitySchema.js";
import { StripeIdentityVerificationSessionPropsSchema } from "./resourceInputs/StripeIdentityVerificationSessionPropsSchema.js";
import {
  type StripeInboundTransferPropsEntity,
  StripeInboundTransferPropsEntitySchema,
} from "./resourceInputs/StripeInboundTransferPropsEntitySchema.js";
import { StripeInboundTransferPropsSchema } from "./resourceInputs/StripeInboundTransferPropsSchema.js";
import {
  type StripeInvoiceitemPropsEntity,
  StripeInvoiceitemPropsEntitySchema,
} from "./resourceInputs/StripeInvoiceitemPropsEntitySchema.js";
import { StripeInvoiceitemPropsSchema } from "./resourceInputs/StripeInvoiceitemPropsSchema.js";
import {
  type StripeInvoicePropsEntity,
  StripeInvoicePropsEntitySchema,
} from "./resourceInputs/StripeInvoicePropsEntitySchema.js";
import { StripeInvoicePropsSchema } from "./resourceInputs/StripeInvoicePropsSchema.js";
import {
  type StripeIssuingCardholderPropsEntity,
  StripeIssuingCardholderPropsEntitySchema,
} from "./resourceInputs/StripeIssuingCardholderPropsEntitySchema.js";
import { StripeIssuingCardholderPropsSchema } from "./resourceInputs/StripeIssuingCardholderPropsSchema.js";
import {
  type StripeIssuingCardPropsEntity,
  StripeIssuingCardPropsEntitySchema,
} from "./resourceInputs/StripeIssuingCardPropsEntitySchema.js";
import { StripeIssuingCardPropsSchema } from "./resourceInputs/StripeIssuingCardPropsSchema.js";
import {
  type StripeIssuingDisputePropsEntity,
  StripeIssuingDisputePropsEntitySchema,
} from "./resourceInputs/StripeIssuingDisputePropsEntitySchema.js";
import { StripeIssuingDisputePropsSchema } from "./resourceInputs/StripeIssuingDisputePropsSchema.js";
import {
  type StripeIssuingPersonalizationDesignPropsEntity,
  StripeIssuingPersonalizationDesignPropsEntitySchema,
} from "./resourceInputs/StripeIssuingPersonalizationDesignPropsEntitySchema.js";
import { StripeIssuingPersonalizationDesignPropsSchema } from "./resourceInputs/StripeIssuingPersonalizationDesignPropsSchema.js";
import {
  type StripeOutboundPaymentPropsEntity,
  StripeOutboundPaymentPropsEntitySchema,
} from "./resourceInputs/StripeOutboundPaymentPropsEntitySchema.js";
import { StripeOutboundPaymentPropsSchema } from "./resourceInputs/StripeOutboundPaymentPropsSchema.js";
import {
  type StripeOutboundSetupIntentPropsEntity,
  StripeOutboundSetupIntentPropsEntitySchema,
} from "./resourceInputs/StripeOutboundSetupIntentPropsEntitySchema.js";
import { StripeOutboundSetupIntentPropsSchema } from "./resourceInputs/StripeOutboundSetupIntentPropsSchema.js";
import {
  type StripePaymentIntentPropsEntity,
  StripePaymentIntentPropsEntitySchema,
} from "./resourceInputs/StripePaymentIntentPropsEntitySchema.js";
import { StripePaymentIntentPropsSchema } from "./resourceInputs/StripePaymentIntentPropsSchema.js";
import {
  type StripePaymentLinkPropsEntity,
  StripePaymentLinkPropsEntitySchema,
} from "./resourceInputs/StripePaymentLinkPropsEntitySchema.js";
import { StripePaymentLinkPropsSchema } from "./resourceInputs/StripePaymentLinkPropsSchema.js";
import {
  type StripePaymentMethodConfigurationPropsEntity,
  StripePaymentMethodConfigurationPropsEntitySchema,
} from "./resourceInputs/StripePaymentMethodConfigurationPropsEntitySchema.js";
import { StripePaymentMethodConfigurationPropsSchema } from "./resourceInputs/StripePaymentMethodConfigurationPropsSchema.js";
import {
  type StripePaymentMethodDomainPropsEntity,
  StripePaymentMethodDomainPropsEntitySchema,
} from "./resourceInputs/StripePaymentMethodDomainPropsEntitySchema.js";
import { StripePaymentMethodDomainPropsSchema } from "./resourceInputs/StripePaymentMethodDomainPropsSchema.js";
import {
  type StripePaymentMethodPropsEntity,
  StripePaymentMethodPropsEntitySchema,
} from "./resourceInputs/StripePaymentMethodPropsEntitySchema.js";
import { StripePaymentMethodPropsSchema } from "./resourceInputs/StripePaymentMethodPropsSchema.js";
import {
  type StripePayoutIntentPropsEntity,
  StripePayoutIntentPropsEntitySchema,
} from "./resourceInputs/StripePayoutIntentPropsEntitySchema.js";
import { StripePayoutIntentPropsSchema } from "./resourceInputs/StripePayoutIntentPropsSchema.js";
import {
  type StripePayoutPropsEntity,
  StripePayoutPropsEntitySchema,
} from "./resourceInputs/StripePayoutPropsEntitySchema.js";
import { StripePayoutPropsSchema } from "./resourceInputs/StripePayoutPropsSchema.js";
import {
  type StripePlanPropsEntity,
  StripePlanPropsEntitySchema,
} from "./resourceInputs/StripePlanPropsEntitySchema.js";
import { StripePlanPropsSchema } from "./resourceInputs/StripePlanPropsSchema.js";
import {
  type StripePricePropsEntity,
  StripePricePropsEntitySchema,
} from "./resourceInputs/StripePricePropsEntitySchema.js";
import { StripePricePropsSchema } from "./resourceInputs/StripePricePropsSchema.js";
import {
  type StripeProductCatalogImportPropsEntity,
  StripeProductCatalogImportPropsEntitySchema,
} from "./resourceInputs/StripeProductCatalogImportPropsEntitySchema.js";
import { StripeProductCatalogImportPropsSchema } from "./resourceInputs/StripeProductCatalogImportPropsSchema.js";
import {
  type StripeProductCatalogTrialOfferPropsEntity,
  StripeProductCatalogTrialOfferPropsEntitySchema,
} from "./resourceInputs/StripeProductCatalogTrialOfferPropsEntitySchema.js";
import { StripeProductCatalogTrialOfferPropsSchema } from "./resourceInputs/StripeProductCatalogTrialOfferPropsSchema.js";
import {
  type StripeProductPropsEntity,
  StripeProductPropsEntitySchema,
} from "./resourceInputs/StripeProductPropsEntitySchema.js";
import { StripeProductPropsSchema } from "./resourceInputs/StripeProductPropsSchema.js";
import {
  type StripePromotionCodePropsEntity,
  StripePromotionCodePropsEntitySchema,
} from "./resourceInputs/StripePromotionCodePropsEntitySchema.js";
import { StripePromotionCodePropsSchema } from "./resourceInputs/StripePromotionCodePropsSchema.js";
import {
  type StripeQuotePropsEntity,
  StripeQuotePropsEntitySchema,
} from "./resourceInputs/StripeQuotePropsEntitySchema.js";
import { StripeQuotePropsSchema } from "./resourceInputs/StripeQuotePropsSchema.js";
import {
  type StripeRadarValueListItemPropsEntity,
  StripeRadarValueListItemPropsEntitySchema,
} from "./resourceInputs/StripeRadarValueListItemPropsEntitySchema.js";
import { StripeRadarValueListItemPropsSchema } from "./resourceInputs/StripeRadarValueListItemPropsSchema.js";
import {
  type StripeRadarValueListPropsEntity,
  StripeRadarValueListPropsEntitySchema,
} from "./resourceInputs/StripeRadarValueListPropsEntitySchema.js";
import { StripeRadarValueListPropsSchema } from "./resourceInputs/StripeRadarValueListPropsSchema.js";
import {
  type StripeRecipientVerificationPropsEntity,
  StripeRecipientVerificationPropsEntitySchema,
} from "./resourceInputs/StripeRecipientVerificationPropsEntitySchema.js";
import { StripeRecipientVerificationPropsSchema } from "./resourceInputs/StripeRecipientVerificationPropsSchema.js";
import {
  type StripeRefundPropsEntity,
  StripeRefundPropsEntitySchema,
} from "./resourceInputs/StripeRefundPropsEntitySchema.js";
import { StripeRefundPropsSchema } from "./resourceInputs/StripeRefundPropsSchema.js";
import {
  type StripeReportingReportRunPropsEntity,
  StripeReportingReportRunPropsEntitySchema,
} from "./resourceInputs/StripeReportingReportRunPropsEntitySchema.js";
import { StripeReportingReportRunPropsSchema } from "./resourceInputs/StripeReportingReportRunPropsSchema.js";
import {
  type StripeSetupIntentPropsEntity,
  StripeSetupIntentPropsEntitySchema,
} from "./resourceInputs/StripeSetupIntentPropsEntitySchema.js";
import { StripeSetupIntentPropsSchema } from "./resourceInputs/StripeSetupIntentPropsSchema.js";
import {
  type StripeShippingRatePropsEntity,
  StripeShippingRatePropsEntitySchema,
} from "./resourceInputs/StripeShippingRatePropsEntitySchema.js";
import { StripeShippingRatePropsSchema } from "./resourceInputs/StripeShippingRatePropsSchema.js";
import {
  type StripeSourcePropsEntity,
  StripeSourcePropsEntitySchema,
} from "./resourceInputs/StripeSourcePropsEntitySchema.js";
import { StripeSourcePropsSchema } from "./resourceInputs/StripeSourcePropsSchema.js";
import {
  type StripeSubscriptionItemPropsEntity,
  StripeSubscriptionItemPropsEntitySchema,
} from "./resourceInputs/StripeSubscriptionItemPropsEntitySchema.js";
import { StripeSubscriptionItemPropsSchema } from "./resourceInputs/StripeSubscriptionItemPropsSchema.js";
import {
  type StripeSubscriptionPropsEntity,
  StripeSubscriptionPropsEntitySchema,
} from "./resourceInputs/StripeSubscriptionPropsEntitySchema.js";
import { StripeSubscriptionPropsSchema } from "./resourceInputs/StripeSubscriptionPropsSchema.js";
import {
  type StripeSubscriptionSchedulePropsEntity,
  StripeSubscriptionSchedulePropsEntitySchema,
} from "./resourceInputs/StripeSubscriptionSchedulePropsEntitySchema.js";
import { StripeSubscriptionSchedulePropsSchema } from "./resourceInputs/StripeSubscriptionSchedulePropsSchema.js";
import {
  type StripeTaxIdPropsEntity,
  StripeTaxIdPropsEntitySchema,
} from "./resourceInputs/StripeTaxIdPropsEntitySchema.js";
import { StripeTaxIdPropsSchema } from "./resourceInputs/StripeTaxIdPropsSchema.js";
import {
  type StripeTaxLocationPropsEntity,
  StripeTaxLocationPropsEntitySchema,
} from "./resourceInputs/StripeTaxLocationPropsEntitySchema.js";
import { StripeTaxLocationPropsSchema } from "./resourceInputs/StripeTaxLocationPropsSchema.js";
import {
  type StripeTaxRatePropsEntity,
  StripeTaxRatePropsEntitySchema,
} from "./resourceInputs/StripeTaxRatePropsEntitySchema.js";
import { StripeTaxRatePropsSchema } from "./resourceInputs/StripeTaxRatePropsSchema.js";
import {
  type StripeTaxRegistrationPropsEntity,
  StripeTaxRegistrationPropsEntitySchema,
} from "./resourceInputs/StripeTaxRegistrationPropsEntitySchema.js";
import { StripeTaxRegistrationPropsSchema } from "./resourceInputs/StripeTaxRegistrationPropsSchema.js";
import {
  type StripeTerminalConfigurationPropsEntity,
  StripeTerminalConfigurationPropsEntitySchema,
} from "./resourceInputs/StripeTerminalConfigurationPropsEntitySchema.js";
import { StripeTerminalConfigurationPropsSchema } from "./resourceInputs/StripeTerminalConfigurationPropsSchema.js";
import {
  type StripeTerminalLocationPropsEntity,
  StripeTerminalLocationPropsEntitySchema,
} from "./resourceInputs/StripeTerminalLocationPropsEntitySchema.js";
import { StripeTerminalLocationPropsSchema } from "./resourceInputs/StripeTerminalLocationPropsSchema.js";
import {
  type StripeTerminalReaderPropsEntity,
  StripeTerminalReaderPropsEntitySchema,
} from "./resourceInputs/StripeTerminalReaderPropsEntitySchema.js";
import { StripeTerminalReaderPropsSchema } from "./resourceInputs/StripeTerminalReaderPropsSchema.js";
import {
  type StripeTestHelpersTestClockPropsEntity,
  StripeTestHelpersTestClockPropsEntitySchema,
} from "./resourceInputs/StripeTestHelpersTestClockPropsEntitySchema.js";
import { StripeTestHelpersTestClockPropsSchema } from "./resourceInputs/StripeTestHelpersTestClockPropsSchema.js";
import {
  type StripeThreeDSecureAuthenticationPropsEntity,
  StripeThreeDSecureAuthenticationPropsEntitySchema,
} from "./resourceInputs/StripeThreeDSecureAuthenticationPropsEntitySchema.js";
import { StripeThreeDSecureAuthenticationPropsSchema } from "./resourceInputs/StripeThreeDSecureAuthenticationPropsSchema.js";
import {
  type StripeTokenPropsEntity,
  StripeTokenPropsEntitySchema,
} from "./resourceInputs/StripeTokenPropsEntitySchema.js";
import { StripeTokenPropsSchema } from "./resourceInputs/StripeTokenPropsSchema.js";
import {
  type StripeTopupPropsEntity,
  StripeTopupPropsEntitySchema,
} from "./resourceInputs/StripeTopupPropsEntitySchema.js";
import { StripeTopupPropsSchema } from "./resourceInputs/StripeTopupPropsSchema.js";
import {
  type StripeTransferPropsEntity,
  StripeTransferPropsEntitySchema,
} from "./resourceInputs/StripeTransferPropsEntitySchema.js";
import { StripeTransferPropsSchema } from "./resourceInputs/StripeTransferPropsSchema.js";
import {
  type StripeTreasuryCreditReversalPropsEntity,
  StripeTreasuryCreditReversalPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryCreditReversalPropsEntitySchema.js";
import { StripeTreasuryCreditReversalPropsSchema } from "./resourceInputs/StripeTreasuryCreditReversalPropsSchema.js";
import {
  type StripeTreasuryDebitReversalPropsEntity,
  StripeTreasuryDebitReversalPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryDebitReversalPropsEntitySchema.js";
import { StripeTreasuryDebitReversalPropsSchema } from "./resourceInputs/StripeTreasuryDebitReversalPropsSchema.js";
import {
  type StripeTreasuryFinancialAccountPropsEntity,
  StripeTreasuryFinancialAccountPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryFinancialAccountPropsEntitySchema.js";
import { StripeTreasuryFinancialAccountPropsSchema } from "./resourceInputs/StripeTreasuryFinancialAccountPropsSchema.js";
import {
  type StripeTreasuryInboundTransferPropsEntity,
  StripeTreasuryInboundTransferPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryInboundTransferPropsEntitySchema.js";
import { StripeTreasuryInboundTransferPropsSchema } from "./resourceInputs/StripeTreasuryInboundTransferPropsSchema.js";
import {
  type StripeTreasuryOutboundPaymentPropsEntity,
  StripeTreasuryOutboundPaymentPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryOutboundPaymentPropsEntitySchema.js";
import { StripeTreasuryOutboundPaymentPropsSchema } from "./resourceInputs/StripeTreasuryOutboundPaymentPropsSchema.js";
import {
  type StripeTreasuryOutboundTransferPropsEntity,
  StripeTreasuryOutboundTransferPropsEntitySchema,
} from "./resourceInputs/StripeTreasuryOutboundTransferPropsEntitySchema.js";
import { StripeTreasuryOutboundTransferPropsSchema } from "./resourceInputs/StripeTreasuryOutboundTransferPropsSchema.js";
import {
  type StripeUSBankAccountPropsEntity,
  StripeUSBankAccountPropsEntitySchema,
} from "./resourceInputs/StripeUSBankAccountPropsEntitySchema.js";
import { StripeUSBankAccountPropsSchema } from "./resourceInputs/StripeUSBankAccountPropsSchema.js";
import {
  type StripeV1AccountPropsEntity,
  StripeV1AccountPropsEntitySchema,
} from "./resourceInputs/StripeV1AccountPropsEntitySchema.js";
import { StripeV1AccountPropsSchema } from "./resourceInputs/StripeV1AccountPropsSchema.js";
import {
  type StripeWebhookEndpointDeclarationPropsEntity,
  StripeWebhookEndpointDeclarationPropsEntitySchema,
} from "./resourceInputs/StripeWebhookEndpointDeclarationPropsEntitySchema.js";
import { StripeWebhookEndpointDeclarationPropsSchema } from "./resourceInputs/StripeWebhookEndpointDeclarationPropsSchema.js";
import {
  StripeAccountOutputsSchema,
  StripeAccountTokenOutputsSchema,
  StripeApplePayDomainOutputsSchema,
  StripeAppsInstallOutputsSchema,
  StripeBankAccountOutputsSchema,
  StripeBillingAlertOutputsSchema,
  StripeBillingConfigurationExportOutputsSchema,
  StripeBillingCreditGrantOutputsSchema,
  StripeBillingFeedbackOptionOutputsSchema,
  StripeBillingMeterOutputsSchema,
  StripeBillingPortalConfigurationOutputsSchema,
  StripeCardOutputsSchema,
  StripeChargeOutputsSchema,
  StripeCheckoutSessionOutputsSchema,
  StripeClimateOrderOutputsSchema,
  StripeCouponOutputsSchema,
  StripeCreditNoteOutputsSchema,
  StripeCustomerOutputsSchema,
  StripeEntitlementsFeatureOutputsSchema,
  StripeEventDestinationOutputsSchema,
  StripeFileLinkOutputsSchema,
  StripeFinancialAddressOutputsSchema,
  StripeFinancialConnectionsSessionOutputsSchema,
  StripeForwardingRequestOutputsSchema,
  StripeGBBankAccountOutputsSchema,
  StripeIdentityVerificationSessionOutputsSchema,
  StripeInboundTransferOutputsSchema,
  StripeInvoiceitemOutputsSchema,
  StripeInvoiceOutputsSchema,
  StripeIssuingCardholderOutputsSchema,
  StripeIssuingCardOutputsSchema,
  StripeIssuingDisputeOutputsSchema,
  StripeIssuingPersonalizationDesignOutputsSchema,
  StripeOutboundPaymentOutputsSchema,
  StripeOutboundSetupIntentOutputsSchema,
  StripePaymentIntentOutputsSchema,
  StripePaymentLinkOutputsSchema,
  StripePaymentMethodConfigurationOutputsSchema,
  StripePaymentMethodDomainOutputsSchema,
  StripePaymentMethodOutputsSchema,
  StripePayoutIntentOutputsSchema,
  StripePayoutOutputsSchema,
  StripePlanOutputsSchema,
  StripePriceOutputsSchema,
  StripeProductCatalogImportOutputsSchema,
  StripeProductCatalogTrialOfferOutputsSchema,
  StripeProductOutputsSchema,
  StripePromotionCodeOutputsSchema,
  StripeQuoteOutputsSchema,
  StripeRadarValueListItemOutputsSchema,
  StripeRadarValueListOutputsSchema,
  StripeRecipientVerificationOutputsSchema,
  StripeRefundOutputsSchema,
  StripeReportingReportRunOutputsSchema,
  StripeSetupIntentOutputsSchema,
  StripeShippingRateOutputsSchema,
  StripeSourceOutputsSchema,
  StripeSubscriptionItemOutputsSchema,
  StripeSubscriptionOutputsSchema,
  StripeSubscriptionScheduleOutputsSchema,
  StripeTaxIdOutputsSchema,
  StripeTaxLocationOutputsSchema,
  StripeTaxRateOutputsSchema,
  StripeTaxRegistrationOutputsSchema,
  StripeTerminalConfigurationOutputsSchema,
  StripeTerminalLocationOutputsSchema,
  StripeTerminalReaderOutputsSchema,
  StripeTestHelpersTestClockOutputsSchema,
  StripeThreeDSecureAuthenticationOutputsSchema,
  StripeTokenOutputsSchema,
  StripeTopupOutputsSchema,
  StripeTransferOutputsSchema,
  StripeTreasuryCreditReversalOutputsSchema,
  StripeTreasuryDebitReversalOutputsSchema,
  StripeTreasuryFinancialAccountOutputsSchema,
  StripeTreasuryInboundTransferOutputsSchema,
  StripeTreasuryOutboundPaymentOutputsSchema,
  StripeTreasuryOutboundTransferOutputsSchema,
  StripeUSBankAccountOutputsSchema,
  StripeV1AccountOutputsSchema,
  StripeWebhookEndpointOutputsSchema,
} from "./resourceOutputs.js";

/**
 * The makeStripeResourceDeclarations Effect supplies the declaration methods
 * used by StripeResources. Run it in the stack's shared graph so declarations
 * register schemas in the resource model that will validate applied outputs.
 *
 */
export const makeStripeResourceDeclarations = Effect.gen(function* () {
  const graph = yield* ResourceGraphBuilder;

  /**
   * The V1Account declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const V1Account = Effect.fn("StripeResources.V1Account")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeV1AccountPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeV1AccountPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeV1AccountPropsEntitySchema,
      outputsSchema: StripeV1AccountOutputsSchema,
      requestSchema: StripeV1AccountPropsSchema,
      props,
    });

    const resource: StripeV1AccountResource = createStripeV1AccountDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The BankAccount declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BankAccount = Effect.fn("StripeResources.BankAccount")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeBankAccountPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeBankAccountPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeBankAccountPropsEntitySchema,
        outputsSchema: StripeBankAccountOutputsSchema,
        requestSchema: StripeBankAccountPropsSchema,
        props,
      });

      const resource: StripeBankAccountResource =
        createStripeBankAccountDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Card declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Card = Effect.fn("StripeResources.Card")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeCardPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeCardPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeCardPropsEntitySchema,
      outputsSchema: StripeCardOutputsSchema,
      requestSchema: StripeCardPropsSchema,
      props,
    });

    const resource: StripeCardResource = createStripeCardDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The ApplePayDomain declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ApplePayDomain = Effect.fn("StripeResources.ApplePayDomain")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeApplePayDomainPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeApplePayDomainPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeApplePayDomainPropsEntitySchema,
        outputsSchema: StripeApplePayDomainOutputsSchema,
        requestSchema: StripeApplePayDomainPropsSchema,
        props,
      });

      const resource: StripeApplePayDomainResource =
        createStripeApplePayDomainDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The AppsInstall declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const AppsInstall = Effect.fn("StripeResources.AppsInstall")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeAppsInstallPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeAppsInstallPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeAppsInstallPropsEntitySchema,
        outputsSchema: StripeAppsInstallOutputsSchema,
        requestSchema: StripeAppsInstallPropsSchema,
        props,
      });

      const resource: StripeAppsInstallResource =
        createStripeAppsInstallDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The BillingAlert declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingAlert = Effect.fn("StripeResources.BillingAlert")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeBillingAlertPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeBillingAlertPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeBillingAlertPropsEntitySchema,
        outputsSchema: StripeBillingAlertOutputsSchema,
        requestSchema: StripeBillingAlertPropsSchema,
        props,
      });

      const resource: StripeBillingAlertResource =
        createStripeBillingAlertDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The BillingCreditGrant declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingCreditGrant = Effect.fn("StripeResources.BillingCreditGrant")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeBillingCreditGrantPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeBillingCreditGrantPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeBillingCreditGrantPropsEntitySchema,
        outputsSchema: StripeBillingCreditGrantOutputsSchema,
        requestSchema: StripeBillingCreditGrantPropsSchema,
        props,
      });

      const resource: StripeBillingCreditGrantResource =
        createStripeBillingCreditGrantDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The BillingFeedbackOption declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingFeedbackOption = Effect.fn(
    "StripeResources.BillingFeedbackOption",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeBillingFeedbackOptionPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeBillingFeedbackOptionPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeBillingFeedbackOptionPropsEntitySchema,
      outputsSchema: StripeBillingFeedbackOptionOutputsSchema,
      requestSchema: StripeBillingFeedbackOptionPropsSchema,
      props,
    });

    const resource: StripeBillingFeedbackOptionResource =
      createStripeBillingFeedbackOptionDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The BillingMeter declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingMeter = Effect.fn("StripeResources.BillingMeter")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeBillingMeterPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeBillingMeterPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeBillingMeterPropsEntitySchema,
        outputsSchema: StripeBillingMeterOutputsSchema,
        requestSchema: StripeBillingMeterPropsSchema,
        props,
      });

      const resource: StripeBillingMeterResource =
        createStripeBillingMeterDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The BillingPortalConfiguration declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingPortalConfiguration = Effect.fn(
    "StripeResources.BillingPortalConfiguration",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeBillingPortalConfigurationPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeBillingPortalConfigurationPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeBillingPortalConfigurationPropsEntitySchema,
      outputsSchema: StripeBillingPortalConfigurationOutputsSchema,
      requestSchema: StripeBillingPortalConfigurationPropsSchema,
      props,
    });

    const resource: StripeBillingPortalConfigurationResource =
      createStripeBillingPortalConfigurationDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The Charge declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Charge = Effect.fn("StripeResources.Charge")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeChargePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeChargePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeChargePropsEntitySchema,
      outputsSchema: StripeChargeOutputsSchema,
      requestSchema: StripeChargePropsSchema,
      props,
    });

    const resource: StripeChargeResource = createStripeChargeDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Refund declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Refund = Effect.fn("StripeResources.Refund")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeRefundPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeRefundPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeRefundPropsEntitySchema,
      outputsSchema: StripeRefundOutputsSchema,
      requestSchema: StripeRefundPropsSchema,
      props,
    });

    const resource: StripeRefundResource = createStripeRefundDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The CheckoutSession declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const CheckoutSession = Effect.fn("StripeResources.CheckoutSession")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeCheckoutSessionPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeCheckoutSessionPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeCheckoutSessionPropsEntitySchema,
        outputsSchema: StripeCheckoutSessionOutputsSchema,
        requestSchema: StripeCheckoutSessionPropsSchema,
        props,
      });

      const resource: StripeCheckoutSessionResource =
        createStripeCheckoutSessionDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The ClimateOrder declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ClimateOrder = Effect.fn("StripeResources.ClimateOrder")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeClimateOrderPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeClimateOrderPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeClimateOrderPropsEntitySchema,
        outputsSchema: StripeClimateOrderOutputsSchema,
        requestSchema: StripeClimateOrderPropsSchema,
        props,
      });

      const resource: StripeClimateOrderResource =
        createStripeClimateOrderDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Coupon declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Coupon = Effect.fn("StripeResources.Coupon")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeCouponPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeCouponPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeCouponPropsEntitySchema,
      outputsSchema: StripeCouponOutputsSchema,
      requestSchema: StripeCouponPropsSchema,
      props,
    });

    const resource: StripeCouponResource = createStripeCouponDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The CreditNote declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const CreditNote = Effect.fn("StripeResources.CreditNote")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeCreditNotePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeCreditNotePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeCreditNotePropsEntitySchema,
      outputsSchema: StripeCreditNoteOutputsSchema,
      requestSchema: StripeCreditNotePropsSchema,
      props,
    });

    const resource: StripeCreditNoteResource =
      createStripeCreditNoteDeclaration(key, props, declaration.outputs);

    return resource;
  });

  /**
   * The Customer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Customer = Effect.fn("StripeResources.Customer")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeCustomerPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeCustomerPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeCustomerPropsEntitySchema,
      outputsSchema: StripeCustomerOutputsSchema,
      requestSchema: StripeCustomerPropsSchema,
      props,
    });

    const resource: StripeCustomerResource = createStripeCustomerDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Subscription declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Subscription = Effect.fn("StripeResources.Subscription")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeSubscriptionPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeSubscriptionPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeSubscriptionPropsEntitySchema,
        outputsSchema: StripeSubscriptionOutputsSchema,
        requestSchema: StripeSubscriptionPropsSchema,
        props,
      });

      const resource: StripeSubscriptionResource =
        createStripeSubscriptionDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The TaxId declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TaxId = Effect.fn("StripeResources.TaxId")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTaxIdPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTaxIdPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTaxIdPropsEntitySchema,
      outputsSchema: StripeTaxIdOutputsSchema,
      requestSchema: StripeTaxIdPropsSchema,
      props,
    });

    const resource: StripeTaxIdResource = createStripeTaxIdDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The EntitlementsFeature declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const EntitlementsFeature = Effect.fn("StripeResources.EntitlementsFeature")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeEntitlementsFeaturePropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeEntitlementsFeaturePropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeEntitlementsFeaturePropsEntitySchema,
        outputsSchema: StripeEntitlementsFeatureOutputsSchema,
        requestSchema: StripeEntitlementsFeaturePropsSchema,
        props,
      });

      const resource: StripeEntitlementsFeatureResource =
        createStripeEntitlementsFeatureDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The FileLink declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const FileLink = Effect.fn("StripeResources.FileLink")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeFileLinkPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeFileLinkPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeFileLinkPropsEntitySchema,
      outputsSchema: StripeFileLinkOutputsSchema,
      requestSchema: StripeFileLinkPropsSchema,
      props,
    });

    const resource: StripeFileLinkResource = createStripeFileLinkDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The FinancialConnectionsSession declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const FinancialConnectionsSession = Effect.fn(
    "StripeResources.FinancialConnectionsSession",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeFinancialConnectionsSessionPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeFinancialConnectionsSessionPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeFinancialConnectionsSessionPropsEntitySchema,
      outputsSchema: StripeFinancialConnectionsSessionOutputsSchema,
      requestSchema: StripeFinancialConnectionsSessionPropsSchema,
      props,
    });

    const resource: StripeFinancialConnectionsSessionResource =
      createStripeFinancialConnectionsSessionDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The ForwardingRequest declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ForwardingRequest = Effect.fn("StripeResources.ForwardingRequest")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeForwardingRequestPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeForwardingRequestPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeForwardingRequestPropsEntitySchema,
        outputsSchema: StripeForwardingRequestOutputsSchema,
        requestSchema: StripeForwardingRequestPropsSchema,
        props,
      });

      const resource: StripeForwardingRequestResource =
        createStripeForwardingRequestDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The IdentityVerificationSession declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const IdentityVerificationSession = Effect.fn(
    "StripeResources.IdentityVerificationSession",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeIdentityVerificationSessionPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeIdentityVerificationSessionPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeIdentityVerificationSessionPropsEntitySchema,
      outputsSchema: StripeIdentityVerificationSessionOutputsSchema,
      requestSchema: StripeIdentityVerificationSessionPropsSchema,
      props,
    });

    const resource: StripeIdentityVerificationSessionResource =
      createStripeIdentityVerificationSessionDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The Invoiceitem declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Invoiceitem = Effect.fn("StripeResources.Invoiceitem")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeInvoiceitemPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeInvoiceitemPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeInvoiceitemPropsEntitySchema,
        outputsSchema: StripeInvoiceitemOutputsSchema,
        requestSchema: StripeInvoiceitemPropsSchema,
        props,
      });

      const resource: StripeInvoiceitemResource =
        createStripeInvoiceitemDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Invoice declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Invoice = Effect.fn("StripeResources.Invoice")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeInvoicePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeInvoicePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeInvoicePropsEntitySchema,
      outputsSchema: StripeInvoiceOutputsSchema,
      requestSchema: StripeInvoicePropsSchema,
      props,
    });

    const resource: StripeInvoiceResource = createStripeInvoiceDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The IssuingCardholder declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const IssuingCardholder = Effect.fn("StripeResources.IssuingCardholder")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeIssuingCardholderPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeIssuingCardholderPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeIssuingCardholderPropsEntitySchema,
        outputsSchema: StripeIssuingCardholderOutputsSchema,
        requestSchema: StripeIssuingCardholderPropsSchema,
        props,
      });

      const resource: StripeIssuingCardholderResource =
        createStripeIssuingCardholderDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The IssuingCard declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const IssuingCard = Effect.fn("StripeResources.IssuingCard")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeIssuingCardPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeIssuingCardPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeIssuingCardPropsEntitySchema,
        outputsSchema: StripeIssuingCardOutputsSchema,
        requestSchema: StripeIssuingCardPropsSchema,
        props,
      });

      const resource: StripeIssuingCardResource =
        createStripeIssuingCardDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The IssuingDispute declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const IssuingDispute = Effect.fn("StripeResources.IssuingDispute")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeIssuingDisputePropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeIssuingDisputePropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeIssuingDisputePropsEntitySchema,
        outputsSchema: StripeIssuingDisputeOutputsSchema,
        requestSchema: StripeIssuingDisputePropsSchema,
        props,
      });

      const resource: StripeIssuingDisputeResource =
        createStripeIssuingDisputeDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The IssuingPersonalizationDesign declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const IssuingPersonalizationDesign = Effect.fn(
    "StripeResources.IssuingPersonalizationDesign",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeIssuingPersonalizationDesignPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeIssuingPersonalizationDesignPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeIssuingPersonalizationDesignPropsEntitySchema,
      outputsSchema: StripeIssuingPersonalizationDesignOutputsSchema,
      requestSchema: StripeIssuingPersonalizationDesignPropsSchema,
      props,
    });

    const resource: StripeIssuingPersonalizationDesignResource =
      createStripeIssuingPersonalizationDesignDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The PaymentIntent declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PaymentIntent = Effect.fn("StripeResources.PaymentIntent")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePaymentIntentPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePaymentIntentPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePaymentIntentPropsEntitySchema,
        outputsSchema: StripePaymentIntentOutputsSchema,
        requestSchema: StripePaymentIntentPropsSchema,
        props,
      });

      const resource: StripePaymentIntentResource =
        createStripePaymentIntentDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The PaymentLink declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PaymentLink = Effect.fn("StripeResources.PaymentLink")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePaymentLinkPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePaymentLinkPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePaymentLinkPropsEntitySchema,
        outputsSchema: StripePaymentLinkOutputsSchema,
        requestSchema: StripePaymentLinkPropsSchema,
        props,
      });

      const resource: StripePaymentLinkResource =
        createStripePaymentLinkDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The PaymentMethodConfiguration declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PaymentMethodConfiguration = Effect.fn(
    "StripeResources.PaymentMethodConfiguration",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripePaymentMethodConfigurationPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripePaymentMethodConfigurationPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripePaymentMethodConfigurationPropsEntitySchema,
      outputsSchema: StripePaymentMethodConfigurationOutputsSchema,
      requestSchema: StripePaymentMethodConfigurationPropsSchema,
      props,
    });

    const resource: StripePaymentMethodConfigurationResource =
      createStripePaymentMethodConfigurationDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The PaymentMethodDomain declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PaymentMethodDomain = Effect.fn("StripeResources.PaymentMethodDomain")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePaymentMethodDomainPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePaymentMethodDomainPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePaymentMethodDomainPropsEntitySchema,
        outputsSchema: StripePaymentMethodDomainOutputsSchema,
        requestSchema: StripePaymentMethodDomainPropsSchema,
        props,
      });

      const resource: StripePaymentMethodDomainResource =
        createStripePaymentMethodDomainDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The PaymentMethod declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PaymentMethod = Effect.fn("StripeResources.PaymentMethod")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePaymentMethodPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePaymentMethodPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePaymentMethodPropsEntitySchema,
        outputsSchema: StripePaymentMethodOutputsSchema,
        requestSchema: StripePaymentMethodPropsSchema,
        props,
      });

      const resource: StripePaymentMethodResource =
        createStripePaymentMethodDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Payout declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Payout = Effect.fn("StripeResources.Payout")(function* (input: {
    readonly logicalId: string;
    readonly props: StripePayoutPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripePayoutPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripePayoutPropsEntitySchema,
      outputsSchema: StripePayoutOutputsSchema,
      requestSchema: StripePayoutPropsSchema,
      props,
    });

    const resource: StripePayoutResource = createStripePayoutDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Plan declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Plan = Effect.fn("StripeResources.Plan")(function* (input: {
    readonly logicalId: string;
    readonly props: StripePlanPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripePlanPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripePlanPropsEntitySchema,
      outputsSchema: StripePlanOutputsSchema,
      requestSchema: StripePlanPropsSchema,
      props,
    });

    const resource: StripePlanResource = createStripePlanDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Price declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Price = Effect.fn("StripeResources.Price")(function* (input: {
    readonly logicalId: string;
    readonly props: StripePricePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripePricePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripePricePropsEntitySchema,
      outputsSchema: StripePriceOutputsSchema,
      requestSchema: StripePricePropsSchema,
      props,
    });

    const resource: StripePriceResource = createStripePriceDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The ProductCatalogTrialOffer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ProductCatalogTrialOffer = Effect.fn(
    "StripeResources.ProductCatalogTrialOffer",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeProductCatalogTrialOfferPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeProductCatalogTrialOfferPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeProductCatalogTrialOfferPropsEntitySchema,
      outputsSchema: StripeProductCatalogTrialOfferOutputsSchema,
      requestSchema: StripeProductCatalogTrialOfferPropsSchema,
      props,
    });

    const resource: StripeProductCatalogTrialOfferResource =
      createStripeProductCatalogTrialOfferDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The Product declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Product = Effect.fn("StripeResources.Product")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeProductPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeProductPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeProductPropsEntitySchema,
      outputsSchema: StripeProductOutputsSchema,
      requestSchema: StripeProductPropsSchema,
      props,
    });

    const resource: StripeProductResource = createStripeProductDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The PromotionCode declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PromotionCode = Effect.fn("StripeResources.PromotionCode")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePromotionCodePropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePromotionCodePropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePromotionCodePropsEntitySchema,
        outputsSchema: StripePromotionCodeOutputsSchema,
        requestSchema: StripePromotionCodePropsSchema,
        props,
      });

      const resource: StripePromotionCodeResource =
        createStripePromotionCodeDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Quote declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Quote = Effect.fn("StripeResources.Quote")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeQuotePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeQuotePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeQuotePropsEntitySchema,
      outputsSchema: StripeQuoteOutputsSchema,
      requestSchema: StripeQuotePropsSchema,
      props,
    });

    const resource: StripeQuoteResource = createStripeQuoteDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The RadarValueListItem declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const RadarValueListItem = Effect.fn("StripeResources.RadarValueListItem")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeRadarValueListItemPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeRadarValueListItemPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeRadarValueListItemPropsEntitySchema,
        outputsSchema: StripeRadarValueListItemOutputsSchema,
        requestSchema: StripeRadarValueListItemPropsSchema,
        props,
      });

      const resource: StripeRadarValueListItemResource =
        createStripeRadarValueListItemDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The RadarValueList declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const RadarValueList = Effect.fn("StripeResources.RadarValueList")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeRadarValueListPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeRadarValueListPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeRadarValueListPropsEntitySchema,
        outputsSchema: StripeRadarValueListOutputsSchema,
        requestSchema: StripeRadarValueListPropsSchema,
        props,
      });

      const resource: StripeRadarValueListResource =
        createStripeRadarValueListDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The ReportingReportRun declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ReportingReportRun = Effect.fn("StripeResources.ReportingReportRun")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeReportingReportRunPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeReportingReportRunPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeReportingReportRunPropsEntitySchema,
        outputsSchema: StripeReportingReportRunOutputsSchema,
        requestSchema: StripeReportingReportRunPropsSchema,
        props,
      });

      const resource: StripeReportingReportRunResource =
        createStripeReportingReportRunDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The SetupIntent declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const SetupIntent = Effect.fn("StripeResources.SetupIntent")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeSetupIntentPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeSetupIntentPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeSetupIntentPropsEntitySchema,
        outputsSchema: StripeSetupIntentOutputsSchema,
        requestSchema: StripeSetupIntentPropsSchema,
        props,
      });

      const resource: StripeSetupIntentResource =
        createStripeSetupIntentDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The ShippingRate declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ShippingRate = Effect.fn("StripeResources.ShippingRate")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeShippingRatePropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeShippingRatePropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeShippingRatePropsEntitySchema,
        outputsSchema: StripeShippingRateOutputsSchema,
        requestSchema: StripeShippingRatePropsSchema,
        props,
      });

      const resource: StripeShippingRateResource =
        createStripeShippingRateDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Source declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Source = Effect.fn("StripeResources.Source")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeSourcePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeSourcePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeSourcePropsEntitySchema,
      outputsSchema: StripeSourceOutputsSchema,
      requestSchema: StripeSourcePropsSchema,
      props,
    });

    const resource: StripeSourceResource = createStripeSourceDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The SubscriptionItem declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const SubscriptionItem = Effect.fn("StripeResources.SubscriptionItem")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeSubscriptionItemPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeSubscriptionItemPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeSubscriptionItemPropsEntitySchema,
        outputsSchema: StripeSubscriptionItemOutputsSchema,
        requestSchema: StripeSubscriptionItemPropsSchema,
        props,
      });

      const resource: StripeSubscriptionItemResource =
        createStripeSubscriptionItemDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The SubscriptionSchedule declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const SubscriptionSchedule = Effect.fn(
    "StripeResources.SubscriptionSchedule",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeSubscriptionSchedulePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeSubscriptionSchedulePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeSubscriptionSchedulePropsEntitySchema,
      outputsSchema: StripeSubscriptionScheduleOutputsSchema,
      requestSchema: StripeSubscriptionSchedulePropsSchema,
      props,
    });

    const resource: StripeSubscriptionScheduleResource =
      createStripeSubscriptionScheduleDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TaxLocation declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TaxLocation = Effect.fn("StripeResources.TaxLocation")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeTaxLocationPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeTaxLocationPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeTaxLocationPropsEntitySchema,
        outputsSchema: StripeTaxLocationOutputsSchema,
        requestSchema: StripeTaxLocationPropsSchema,
        props,
      });

      const resource: StripeTaxLocationResource =
        createStripeTaxLocationDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The TaxRegistration declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TaxRegistration = Effect.fn("StripeResources.TaxRegistration")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeTaxRegistrationPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeTaxRegistrationPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeTaxRegistrationPropsEntitySchema,
        outputsSchema: StripeTaxRegistrationOutputsSchema,
        requestSchema: StripeTaxRegistrationPropsSchema,
        props,
      });

      const resource: StripeTaxRegistrationResource =
        createStripeTaxRegistrationDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The TaxRate declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TaxRate = Effect.fn("StripeResources.TaxRate")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTaxRatePropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTaxRatePropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTaxRatePropsEntitySchema,
      outputsSchema: StripeTaxRateOutputsSchema,
      requestSchema: StripeTaxRatePropsSchema,
      props,
    });

    const resource: StripeTaxRateResource = createStripeTaxRateDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The TerminalConfiguration declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TerminalConfiguration = Effect.fn(
    "StripeResources.TerminalConfiguration",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTerminalConfigurationPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTerminalConfigurationPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTerminalConfigurationPropsEntitySchema,
      outputsSchema: StripeTerminalConfigurationOutputsSchema,
      requestSchema: StripeTerminalConfigurationPropsSchema,
      props,
    });

    const resource: StripeTerminalConfigurationResource =
      createStripeTerminalConfigurationDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TerminalLocation declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TerminalLocation = Effect.fn("StripeResources.TerminalLocation")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeTerminalLocationPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeTerminalLocationPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeTerminalLocationPropsEntitySchema,
        outputsSchema: StripeTerminalLocationOutputsSchema,
        requestSchema: StripeTerminalLocationPropsSchema,
        props,
      });

      const resource: StripeTerminalLocationResource =
        createStripeTerminalLocationDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The TerminalReader declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TerminalReader = Effect.fn("StripeResources.TerminalReader")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeTerminalReaderPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeTerminalReaderPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeTerminalReaderPropsEntitySchema,
        outputsSchema: StripeTerminalReaderOutputsSchema,
        requestSchema: StripeTerminalReaderPropsSchema,
        props,
      });

      const resource: StripeTerminalReaderResource =
        createStripeTerminalReaderDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The TestHelpersTestClock declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TestHelpersTestClock = Effect.fn(
    "StripeResources.TestHelpersTestClock",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTestHelpersTestClockPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTestHelpersTestClockPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTestHelpersTestClockPropsEntitySchema,
      outputsSchema: StripeTestHelpersTestClockOutputsSchema,
      requestSchema: StripeTestHelpersTestClockPropsSchema,
      props,
    });

    const resource: StripeTestHelpersTestClockResource =
      createStripeTestHelpersTestClockDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The ThreeDSecureAuthentication declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ThreeDSecureAuthentication = Effect.fn(
    "StripeResources.ThreeDSecureAuthentication",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeThreeDSecureAuthenticationPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeThreeDSecureAuthenticationPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeThreeDSecureAuthenticationPropsEntitySchema,
      outputsSchema: StripeThreeDSecureAuthenticationOutputsSchema,
      requestSchema: StripeThreeDSecureAuthenticationPropsSchema,
      props,
    });

    const resource: StripeThreeDSecureAuthenticationResource =
      createStripeThreeDSecureAuthenticationDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The Token declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Token = Effect.fn("StripeResources.Token")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTokenPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTokenPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTokenPropsEntitySchema,
      outputsSchema: StripeTokenOutputsSchema,
      requestSchema: StripeTokenPropsSchema,
      props,
    });

    const resource: StripeTokenResource = createStripeTokenDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Topup declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Topup = Effect.fn("StripeResources.Topup")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTopupPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTopupPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTopupPropsEntitySchema,
      outputsSchema: StripeTopupOutputsSchema,
      requestSchema: StripeTopupPropsSchema,
      props,
    });

    const resource: StripeTopupResource = createStripeTopupDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The Transfer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Transfer = Effect.fn("StripeResources.Transfer")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTransferPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTransferPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTransferPropsEntitySchema,
      outputsSchema: StripeTransferOutputsSchema,
      requestSchema: StripeTransferPropsSchema,
      props,
    });

    const resource: StripeTransferResource = createStripeTransferDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The TreasuryCreditReversal declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryCreditReversal = Effect.fn(
    "StripeResources.TreasuryCreditReversal",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryCreditReversalPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryCreditReversalPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryCreditReversalPropsEntitySchema,
      outputsSchema: StripeTreasuryCreditReversalOutputsSchema,
      requestSchema: StripeTreasuryCreditReversalPropsSchema,
      props,
    });

    const resource: StripeTreasuryCreditReversalResource =
      createStripeTreasuryCreditReversalDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TreasuryDebitReversal declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryDebitReversal = Effect.fn(
    "StripeResources.TreasuryDebitReversal",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryDebitReversalPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryDebitReversalPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryDebitReversalPropsEntitySchema,
      outputsSchema: StripeTreasuryDebitReversalOutputsSchema,
      requestSchema: StripeTreasuryDebitReversalPropsSchema,
      props,
    });

    const resource: StripeTreasuryDebitReversalResource =
      createStripeTreasuryDebitReversalDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TreasuryFinancialAccount declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryFinancialAccount = Effect.fn(
    "StripeResources.TreasuryFinancialAccount",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryFinancialAccountPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryFinancialAccountPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryFinancialAccountPropsEntitySchema,
      outputsSchema: StripeTreasuryFinancialAccountOutputsSchema,
      requestSchema: StripeTreasuryFinancialAccountPropsSchema,
      props,
    });

    const resource: StripeTreasuryFinancialAccountResource =
      createStripeTreasuryFinancialAccountDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TreasuryInboundTransfer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryInboundTransfer = Effect.fn(
    "StripeResources.TreasuryInboundTransfer",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryInboundTransferPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryInboundTransferPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryInboundTransferPropsEntitySchema,
      outputsSchema: StripeTreasuryInboundTransferOutputsSchema,
      requestSchema: StripeTreasuryInboundTransferPropsSchema,
      props,
    });

    const resource: StripeTreasuryInboundTransferResource =
      createStripeTreasuryInboundTransferDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TreasuryOutboundPayment declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryOutboundPayment = Effect.fn(
    "StripeResources.TreasuryOutboundPayment",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryOutboundPaymentPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryOutboundPaymentPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryOutboundPaymentPropsEntitySchema,
      outputsSchema: StripeTreasuryOutboundPaymentOutputsSchema,
      requestSchema: StripeTreasuryOutboundPaymentPropsSchema,
      props,
    });

    const resource: StripeTreasuryOutboundPaymentResource =
      createStripeTreasuryOutboundPaymentDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The TreasuryOutboundTransfer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const TreasuryOutboundTransfer = Effect.fn(
    "StripeResources.TreasuryOutboundTransfer",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeTreasuryOutboundTransferPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeTreasuryOutboundTransferPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeTreasuryOutboundTransferPropsEntitySchema,
      outputsSchema: StripeTreasuryOutboundTransferOutputsSchema,
      requestSchema: StripeTreasuryOutboundTransferPropsSchema,
      props,
    });

    const resource: StripeTreasuryOutboundTransferResource =
      createStripeTreasuryOutboundTransferDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The WebhookEndpoint declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const WebhookEndpoint = Effect.fn("StripeResources.WebhookEndpoint")(
    function* (
      input: {
        readonly logicalId: string;
        readonly props: StripeWebhookEndpointDeclarationPropsEntity["endpoint"];
      } & Omit<StripeWebhookEndpointDeclarationPropsEntity, "endpoint">,
    ) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeUnknownEffect(
        Schema.toType(StripeWebhookEndpointDeclarationPropsEntitySchema),
      )(
        Record.filter(
          {
            endpoint: input.props,
            rotationKey: input.rotationKey,
          },
          Predicate.isNotUndefined,
        ),
      );

      yield* declaration.register({
        propsSchema: StripeWebhookEndpointDeclarationPropsEntitySchema,
        outputsSchema: StripeWebhookEndpointOutputsSchema,
        requestSchema: StripeWebhookEndpointDeclarationPropsSchema,
        props,
      });

      const resource: StripeWebhookEndpointResource =
        createStripeWebhookEndpointDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The ProductCatalogImport declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const ProductCatalogImport = Effect.fn(
    "StripeResources.ProductCatalogImport",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeProductCatalogImportPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeProductCatalogImportPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeProductCatalogImportPropsEntitySchema,
      outputsSchema: StripeProductCatalogImportOutputsSchema,
      requestSchema: StripeProductCatalogImportPropsSchema,
      props,
    });

    const resource: StripeProductCatalogImportResource =
      createStripeProductCatalogImportDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The AccountToken declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const AccountToken = Effect.fn("StripeResources.AccountToken")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeAccountTokenPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeAccountTokenPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeAccountTokenPropsEntitySchema,
        outputsSchema: StripeAccountTokenOutputsSchema,
        requestSchema: StripeAccountTokenPropsSchema,
        props,
      });

      const resource: StripeAccountTokenResource =
        createStripeAccountTokenDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The Account declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const Account = Effect.fn("StripeResources.Account")(function* (input: {
    readonly logicalId: string;
    readonly props: StripeAccountPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeAccountPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeAccountPropsEntitySchema,
      outputsSchema: StripeAccountOutputsSchema,
      requestSchema: StripeAccountPropsSchema,
      props,
    });

    const resource: StripeAccountResource = createStripeAccountDeclaration(
      key,
      props,
      declaration.outputs,
    );

    return resource;
  });

  /**
   * The EventDestination declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const EventDestination = Effect.fn("StripeResources.EventDestination")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeEventDestinationPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeEventDestinationPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeEventDestinationPropsEntitySchema,
        outputsSchema: StripeEventDestinationOutputsSchema,
        requestSchema: StripeEventDestinationPropsSchema,
        props,
      });

      const resource: StripeEventDestinationResource =
        createStripeEventDestinationDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The GBBankAccount declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const GBBankAccount = Effect.fn("StripeResources.GBBankAccount")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeGBBankAccountPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeGBBankAccountPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeGBBankAccountPropsEntitySchema,
        outputsSchema: StripeGBBankAccountOutputsSchema,
        requestSchema: StripeGBBankAccountPropsSchema,
        props,
      });

      const resource: StripeGBBankAccountResource =
        createStripeGBBankAccountDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The USBankAccount declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const USBankAccount = Effect.fn("StripeResources.USBankAccount")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeUSBankAccountPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeUSBankAccountPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeUSBankAccountPropsEntitySchema,
        outputsSchema: StripeUSBankAccountOutputsSchema,
        requestSchema: StripeUSBankAccountPropsSchema,
        props,
      });

      const resource: StripeUSBankAccountResource =
        createStripeUSBankAccountDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The FinancialAddress declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const FinancialAddress = Effect.fn("StripeResources.FinancialAddress")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeFinancialAddressPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeFinancialAddressPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeFinancialAddressPropsEntitySchema,
        outputsSchema: StripeFinancialAddressOutputsSchema,
        requestSchema: StripeFinancialAddressPropsSchema,
        props,
      });

      const resource: StripeFinancialAddressResource =
        createStripeFinancialAddressDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The InboundTransfer declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const InboundTransfer = Effect.fn("StripeResources.InboundTransfer")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeInboundTransferPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeInboundTransferPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeInboundTransferPropsEntitySchema,
        outputsSchema: StripeInboundTransferOutputsSchema,
        requestSchema: StripeInboundTransferPropsSchema,
        props,
      });

      const resource: StripeInboundTransferResource =
        createStripeInboundTransferDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The OutboundPayment declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const OutboundPayment = Effect.fn("StripeResources.OutboundPayment")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeOutboundPaymentPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeOutboundPaymentPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeOutboundPaymentPropsEntitySchema,
        outputsSchema: StripeOutboundPaymentOutputsSchema,
        requestSchema: StripeOutboundPaymentPropsSchema,
        props,
      });

      const resource: StripeOutboundPaymentResource =
        createStripeOutboundPaymentDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The OutboundSetupIntent declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const OutboundSetupIntent = Effect.fn("StripeResources.OutboundSetupIntent")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripeOutboundSetupIntentPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripeOutboundSetupIntentPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripeOutboundSetupIntentPropsEntitySchema,
        outputsSchema: StripeOutboundSetupIntentOutputsSchema,
        requestSchema: StripeOutboundSetupIntentPropsSchema,
        props,
      });

      const resource: StripeOutboundSetupIntentResource =
        createStripeOutboundSetupIntentDeclaration(
          key,
          props,
          declaration.outputs,
        );

      return resource;
    },
  );

  /**
   * The PayoutIntent declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const PayoutIntent = Effect.fn("StripeResources.PayoutIntent")(
    function* (input: {
      readonly logicalId: string;
      readonly props: StripePayoutIntentPropsEntity;
    }) {
      const key: ResourceKey = { logicalId: input.logicalId };

      const declaration = yield* graph.resource(key);

      const props = yield* Schema.decodeEffect(
        Schema.toType(StripePayoutIntentPropsEntitySchema),
      )(input.props);

      yield* declaration.register({
        propsSchema: StripePayoutIntentPropsEntitySchema,
        outputsSchema: StripePayoutIntentOutputsSchema,
        requestSchema: StripePayoutIntentPropsSchema,
        props,
      });

      const resource: StripePayoutIntentResource =
        createStripePayoutIntentDeclaration(key, props, declaration.outputs);

      return resource;
    },
  );

  /**
   * The RecipientVerification declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const RecipientVerification = Effect.fn(
    "StripeResources.RecipientVerification",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeRecipientVerificationPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeRecipientVerificationPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeRecipientVerificationPropsEntitySchema,
      outputsSchema: StripeRecipientVerificationOutputsSchema,
      requestSchema: StripeRecipientVerificationPropsSchema,
      props,
    });

    const resource: StripeRecipientVerificationResource =
      createStripeRecipientVerificationDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  /**
   * The BillingConfigurationExport declaration method registers a managed resource and its
   * dependencies for the stack to apply. Relationship fields accept compatible
   * resource entities before their applied values exist. The returned entity
   * exposes output values after apply through the stack that owns the declaration.
   */
  const BillingConfigurationExport = Effect.fn(
    "StripeResources.BillingConfigurationExport",
  )(function* (input: {
    readonly logicalId: string;
    readonly props: StripeBillingConfigurationExportPropsEntity;
  }) {
    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(
      Schema.toType(StripeBillingConfigurationExportPropsEntitySchema),
    )(input.props);

    yield* declaration.register({
      propsSchema: StripeBillingConfigurationExportPropsEntitySchema,
      outputsSchema: StripeBillingConfigurationExportOutputsSchema,
      requestSchema: StripeBillingConfigurationExportPropsSchema,
      props,
    });

    const resource: StripeBillingConfigurationExportResource =
      createStripeBillingConfigurationExportDeclaration(
        key,
        props,
        declaration.outputs,
      );

    return resource;
  });

  return {
    V1Account,
    BankAccount,
    Card,
    ApplePayDomain,
    AppsInstall,
    BillingAlert,
    BillingCreditGrant,
    BillingFeedbackOption,
    BillingMeter,
    BillingPortalConfiguration,
    Charge,
    Refund,
    CheckoutSession,
    ClimateOrder,
    Coupon,
    CreditNote,
    Customer,
    Subscription,
    TaxId,
    EntitlementsFeature,
    FileLink,
    FinancialConnectionsSession,
    ForwardingRequest,
    IdentityVerificationSession,
    Invoiceitem,
    Invoice,
    IssuingCardholder,
    IssuingCard,
    IssuingDispute,
    IssuingPersonalizationDesign,
    PaymentIntent,
    PaymentLink,
    PaymentMethodConfiguration,
    PaymentMethodDomain,
    PaymentMethod,
    Payout,
    Plan,
    Price,
    ProductCatalogTrialOffer,
    Product,
    PromotionCode,
    Quote,
    RadarValueListItem,
    RadarValueList,
    ReportingReportRun,
    SetupIntent,
    ShippingRate,
    Source,
    SubscriptionItem,
    SubscriptionSchedule,
    TaxLocation,
    TaxRegistration,
    TaxRate,
    TerminalConfiguration,
    TerminalLocation,
    TerminalReader,
    TestHelpersTestClock,
    ThreeDSecureAuthentication,
    Token,
    Topup,
    Transfer,
    TreasuryCreditReversal,
    TreasuryDebitReversal,
    TreasuryFinancialAccount,
    TreasuryInboundTransfer,
    TreasuryOutboundPayment,
    TreasuryOutboundTransfer,
    WebhookEndpoint,
    ProductCatalogImport,
    AccountToken,
    Account,
    EventDestination,
    GBBankAccount,
    USBankAccount,
    FinancialAddress,
    InboundTransfer,
    OutboundPayment,
    OutboundSetupIntent,
    PayoutIntent,
    RecipientVerification,
    BillingConfigurationExport,
  };
});
