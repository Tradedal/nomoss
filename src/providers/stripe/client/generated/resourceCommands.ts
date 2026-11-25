import { Layer } from "effect";
import { jsonFileResourcePolicyRegistration } from "../../../file/resourcePolicy.js";
import { stripeResourcePolicyRegistration } from "../../management/resourcePolicy.js";
import {
  GetV2CoreAccountsIdOperation,
  PostV2CoreAccountsIdOperation,
  PostV2CoreAccountsOperation,
} from "./accounts.js";
import {
  DeleteApplePayDomainsDomainOperation,
  GetApplePayDomainsDomainOperation,
  PostApplePayDomainsOperation,
} from "./applePayDomains.js";
import {
  GetAppsInstallsIdOperation,
  PostAppsInstallsIdOperation,
  PostAppsInstallsOperation,
} from "./appsInstalls.js";
import {
  GetBillingAlertsIdOperation,
  PostBillingAlertsOperation,
} from "./billingAlerts.js";
import {
  GetBillingCreditGrantsIdOperation,
  PostBillingCreditGrantsIdOperation,
  PostBillingCreditGrantsOperation,
} from "./billingCreditGrants.js";
import {
  GetBillingFeedbackOptionsIdOperation,
  PostBillingFeedbackOptionsIdOperation,
  PostBillingFeedbackOptionsOperation,
} from "./billingFeedbackOptions.js";
import {
  GetBillingMetersIdOperation,
  PostBillingMetersIdOperation,
  PostBillingMetersOperation,
} from "./billingMeters.js";
import {
  GetBillingPortalConfigurationsConfigurationOperation,
  type PostBillingPortalConfigurationsConfigurationInput,
  PostBillingPortalConfigurationsConfigurationOperation,
  PostBillingPortalConfigurationsOperation,
} from "./billingPortalConfigurations.js";
import {
  GetChargesChargeOperation,
  PostChargesChargeOperation,
  PostChargesOperation,
} from "./charges.js";
import {
  GetCheckoutSessionsSessionOperation,
  PostCheckoutSessionsOperation,
  PostCheckoutSessionsSessionOperation,
} from "./checkoutSessions.js";
import {
  GetClimateOrdersOrderOperation,
  PostClimateOrdersOperation,
  PostClimateOrdersOrderOperation,
} from "./climateOrders.js";
import {
  GetV2CommerceProductCatalogImportsIdOperation,
  PostV2CommerceProductCatalogImportsOperation,
} from "./commerceProductCatalogImports.js";
import {
  GetV2CoreAccountTokensIdOperation,
  PostV2CoreAccountTokensOperation,
} from "./coreAccountTokens.js";
import {
  DeleteV2CoreEventDestinationsIdOperation,
  GetV2CoreEventDestinationsIdOperation,
  PostV2CoreEventDestinationsIdOperation,
  PostV2CoreEventDestinationsOperation,
} from "./coreEventDestinations.js";
import {
  GetV2CoreVaultGbBankAccountsIdOperation,
  PostV2CoreVaultGbBankAccountsOperation,
} from "./coreVaultGbBankAccounts.js";
import {
  GetV2CoreVaultUsBankAccountsIdOperation,
  PostV2CoreVaultUsBankAccountsIdOperation,
  PostV2CoreVaultUsBankAccountsOperation,
} from "./coreVaultUsBankAccounts.js";
import {
  DeleteCouponsCouponOperation,
  GetCouponsCouponOperation,
  PostCouponsCouponOperation,
  PostCouponsOperation,
} from "./coupons.js";
import {
  GetCreditNotesIdOperation,
  PostCreditNotesIdOperation,
  PostCreditNotesOperation,
} from "./creditNotes.js";
import {
  DeleteCustomersCustomerOperation,
  GetCustomersCustomerOperation,
  PostCustomersCustomerOperation,
  PostCustomersOperation,
} from "./customers.js";
import {
  GetEntitlementsFeaturesIdOperation,
  PostEntitlementsFeaturesIdOperation,
  PostEntitlementsFeaturesOperation,
} from "./entitlementsFeatures.js";
import {
  GetFileLinksLinkOperation,
  PostFileLinksLinkOperation,
  PostFileLinksOperation,
} from "./fileLinks.js";
import {
  GetFinancialConnectionsSessionsSessionOperation,
  PostFinancialConnectionsSessionsOperation,
} from "./financialConnectionsSessions.js";
import {
  GetForwardingRequestsIdOperation,
  PostForwardingRequestsOperation,
} from "./forwardingRequests.js";
import {
  GetIdentityVerificationSessionsSessionOperation,
  PostIdentityVerificationSessionsOperation,
  PostIdentityVerificationSessionsSessionOperation,
} from "./identityVerificationSessions.js";
import {
  DeleteInvoiceitemsInvoiceitemOperation,
  GetInvoiceitemsInvoiceitemOperation,
  PostInvoiceitemsInvoiceitemOperation,
  PostInvoiceitemsOperation,
} from "./invoiceitems.js";
import {
  DeleteInvoicesInvoiceOperation,
  GetInvoicesInvoiceOperation,
  PostInvoicesInvoiceOperation,
  PostInvoicesOperation,
} from "./invoices.js";
import {
  GetIssuingCardholdersCardholderOperation,
  PostIssuingCardholdersCardholderOperation,
  PostIssuingCardholdersOperation,
} from "./issuingCardholders.js";
import {
  GetIssuingCardsCardOperation,
  PostIssuingCardsCardOperation,
  PostIssuingCardsOperation,
} from "./issuingCards.js";
import {
  GetIssuingDisputesDisputeOperation,
  PostIssuingDisputesDisputeOperation,
  PostIssuingDisputesOperation,
} from "./issuingDisputes.js";
import {
  GetIssuingPersonalizationDesignsPersonalizationDesignOperation,
  PostIssuingPersonalizationDesignsOperation,
  PostIssuingPersonalizationDesignsPersonalizationDesignOperation,
} from "./issuingPersonalizationDesigns.js";
import {
  GetV2MoneyManagementFinancialAddressesIdOperation,
  PostV2MoneyManagementFinancialAddressesOperation,
} from "./moneyManagementFinancialAddresses.js";
import {
  GetV2MoneyManagementInboundTransfersIdOperation,
  PostV2MoneyManagementInboundTransfersOperation,
} from "./moneyManagementInboundTransfers.js";
import {
  GetV2MoneyManagementOutboundPaymentsIdOperation,
  PostV2MoneyManagementOutboundPaymentsOperation,
} from "./moneyManagementOutboundPayments.js";
import {
  GetV2MoneyManagementOutboundSetupIntentsIdOperation,
  PostV2MoneyManagementOutboundSetupIntentsIdOperation,
  PostV2MoneyManagementOutboundSetupIntentsOperation,
} from "./moneyManagementOutboundSetupIntents.js";
import {
  GetV2MoneyManagementPayoutIntentsIdOperation,
  PostV2MoneyManagementPayoutIntentsIdOperation,
  PostV2MoneyManagementPayoutIntentsOperation,
} from "./moneyManagementPayoutIntents.js";
import {
  GetV2MoneyManagementRecipientVerificationsIdOperation,
  PostV2MoneyManagementRecipientVerificationsOperation,
} from "./moneyManagementRecipientVerifications.js";
import {
  GetPaymentIntentsIntentOperation,
  PostPaymentIntentsIntentOperation,
  PostPaymentIntentsOperation,
} from "./paymentIntents.js";
import {
  GetPaymentLinksPaymentLinkOperation,
  PostPaymentLinksOperation,
  PostPaymentLinksPaymentLinkOperation,
} from "./paymentLinks.js";
import {
  GetPaymentMethodConfigurationsConfigurationOperation,
  PostPaymentMethodConfigurationsConfigurationOperation,
  PostPaymentMethodConfigurationsOperation,
} from "./paymentMethodConfigurations.js";
import {
  GetPaymentMethodDomainsPaymentMethodDomainOperation,
  PostPaymentMethodDomainsOperation,
  PostPaymentMethodDomainsPaymentMethodDomainOperation,
} from "./paymentMethodDomains.js";
import {
  GetPaymentMethodsPaymentMethodOperation,
  PostPaymentMethodsOperation,
  PostPaymentMethodsPaymentMethodOperation,
} from "./paymentMethods.js";
import {
  GetPayoutsPayoutOperation,
  PostPayoutsOperation,
  PostPayoutsPayoutOperation,
} from "./payouts.js";
import {
  DeletePlansPlanOperation,
  GetPlansPlanOperation,
  PostPlansOperation,
  PostPlansPlanOperation,
} from "./plans.js";
import {
  GetPricesPriceOperation,
  PostPricesOperation,
  type PostPricesPriceInput,
  PostPricesPriceOperation,
} from "./prices.js";
import {
  GetProductCatalogTrialOffersIdOperation,
  PostProductCatalogTrialOffersIdOperation,
  PostProductCatalogTrialOffersOperation,
} from "./productCatalogTrialOffers.js";
import {
  GetProductsIdOperation,
  type PostProductsIdInput,
  PostProductsIdOperation,
  PostProductsOperation,
} from "./products.js";
import {
  GetPromotionCodesPromotionCodeOperation,
  PostPromotionCodesOperation,
  PostPromotionCodesPromotionCodeOperation,
} from "./promotionCodes.js";
import {
  GetQuotesQuoteOperation,
  PostQuotesOperation,
  PostQuotesQuoteOperation,
} from "./quotes.js";
import {
  DeleteRadarValueListItemsItemOperation,
  GetRadarValueListItemsItemOperation,
  PostRadarValueListItemsOperation,
} from "./radarValueListItems.js";
import {
  DeleteRadarValueListsValueListOperation,
  GetRadarValueListsValueListOperation,
  PostRadarValueListsOperation,
  PostRadarValueListsValueListOperation,
} from "./radarValueLists.js";
import {
  GetRefundsRefundOperation,
  PostRefundsOperation,
  PostRefundsRefundOperation,
} from "./refunds.js";
import {
  GetReportingReportRunsReportRunOperation,
  PostReportingReportRunsOperation,
} from "./reportingReportRuns.js";
import {
  bindStripeAccountReadInput,
  projectStripeAccountOutputs,
} from "./resourceBindings/Account.js";
import {
  bindStripeAccountTokenReadInput,
  projectStripeAccountTokenOutputs,
} from "./resourceBindings/AccountToken.js";
import {
  bindStripeApplePayDomainReadInput,
  projectStripeApplePayDomainOutputs,
} from "./resourceBindings/ApplePayDomain.js";
import {
  bindStripeAppsInstallReadInput,
  projectStripeAppsInstallOutputs,
} from "./resourceBindings/AppsInstall.js";
import {
  bindStripeBankAccountReadInput,
  projectStripeBankAccountOutputs,
} from "./resourceBindings/BankAccount.js";
import {
  bindStripeBillingAlertReadInput,
  projectStripeBillingAlertOutputs,
} from "./resourceBindings/BillingAlert.js";
import {
  bindStripeBillingCreditGrantReadInput,
  projectStripeBillingCreditGrantOutputs,
} from "./resourceBindings/BillingCreditGrant.js";
import {
  bindStripeBillingFeedbackOptionReadInput,
  projectStripeBillingFeedbackOptionOutputs,
} from "./resourceBindings/BillingFeedbackOption.js";
import {
  bindStripeBillingMeterReadInput,
  projectStripeBillingMeterOutputs,
} from "./resourceBindings/BillingMeter.js";
import {
  bindStripeBillingPortalConfigurationReadInput,
  projectStripeBillingPortalConfigurationOutputs,
} from "./resourceBindings/BillingPortalConfiguration.js";
import {
  bindStripeCardReadInput,
  projectStripeCardOutputs,
} from "./resourceBindings/Card.js";
import {
  bindStripeChargeReadInput,
  projectStripeChargeOutputs,
} from "./resourceBindings/Charge.js";
import {
  bindStripeCheckoutSessionReadInput,
  projectStripeCheckoutSessionOutputs,
} from "./resourceBindings/CheckoutSession.js";
import {
  bindStripeClimateOrderReadInput,
  projectStripeClimateOrderOutputs,
} from "./resourceBindings/ClimateOrder.js";
import {
  bindStripeCouponReadInput,
  projectStripeCouponOutputs,
} from "./resourceBindings/Coupon.js";
import {
  bindStripeCreditNoteReadInput,
  projectStripeCreditNoteOutputs,
} from "./resourceBindings/CreditNote.js";
import {
  bindStripeCustomerReadInput,
  projectStripeCustomerOutputs,
} from "./resourceBindings/Customer.js";
import {
  bindStripeEntitlementsFeatureReadInput,
  projectStripeEntitlementsFeatureOutputs,
} from "./resourceBindings/EntitlementsFeature.js";
import {
  bindStripeEventDestinationReadInput,
  projectStripeEventDestinationOutputs,
} from "./resourceBindings/EventDestination.js";
import {
  bindStripeFileLinkReadInput,
  projectStripeFileLinkOutputs,
} from "./resourceBindings/FileLink.js";
import {
  bindStripeFinancialAddressReadInput,
  projectStripeFinancialAddressOutputs,
} from "./resourceBindings/FinancialAddress.js";
import {
  bindStripeFinancialConnectionsSessionReadInput,
  projectStripeFinancialConnectionsSessionOutputs,
} from "./resourceBindings/FinancialConnectionsSession.js";
import {
  bindStripeForwardingRequestReadInput,
  projectStripeForwardingRequestOutputs,
} from "./resourceBindings/ForwardingRequest.js";
import {
  bindStripeGBBankAccountReadInput,
  projectStripeGBBankAccountOutputs,
} from "./resourceBindings/GBBankAccount.js";
import {
  bindStripeIdentityVerificationSessionReadInput,
  projectStripeIdentityVerificationSessionOutputs,
} from "./resourceBindings/IdentityVerificationSession.js";
import {
  bindStripeInboundTransferReadInput,
  projectStripeInboundTransferOutputs,
} from "./resourceBindings/InboundTransfer.js";
import {
  bindStripeInvoiceReadInput,
  projectStripeInvoiceOutputs,
} from "./resourceBindings/Invoice.js";
import {
  bindStripeInvoiceitemReadInput,
  projectStripeInvoiceitemOutputs,
} from "./resourceBindings/Invoiceitem.js";
import {
  bindStripeIssuingCardReadInput,
  projectStripeIssuingCardOutputs,
} from "./resourceBindings/IssuingCard.js";
import {
  bindStripeIssuingCardholderReadInput,
  projectStripeIssuingCardholderOutputs,
} from "./resourceBindings/IssuingCardholder.js";
import {
  bindStripeIssuingDisputeReadInput,
  projectStripeIssuingDisputeOutputs,
} from "./resourceBindings/IssuingDispute.js";
import {
  bindStripeIssuingPersonalizationDesignReadInput,
  projectStripeIssuingPersonalizationDesignOutputs,
} from "./resourceBindings/IssuingPersonalizationDesign.js";
import {
  bindStripeOutboundPaymentReadInput,
  projectStripeOutboundPaymentOutputs,
} from "./resourceBindings/OutboundPayment.js";
import {
  bindStripeOutboundSetupIntentReadInput,
  projectStripeOutboundSetupIntentOutputs,
} from "./resourceBindings/OutboundSetupIntent.js";
import {
  bindStripePaymentIntentReadInput,
  projectStripePaymentIntentOutputs,
} from "./resourceBindings/PaymentIntent.js";
import {
  bindStripePaymentLinkReadInput,
  projectStripePaymentLinkOutputs,
} from "./resourceBindings/PaymentLink.js";
import {
  bindStripePaymentMethodReadInput,
  projectStripePaymentMethodOutputs,
} from "./resourceBindings/PaymentMethod.js";
import {
  bindStripePaymentMethodConfigurationReadInput,
  projectStripePaymentMethodConfigurationOutputs,
} from "./resourceBindings/PaymentMethodConfiguration.js";
import {
  bindStripePaymentMethodDomainReadInput,
  projectStripePaymentMethodDomainOutputs,
} from "./resourceBindings/PaymentMethodDomain.js";
import {
  bindStripePayoutReadInput,
  projectStripePayoutOutputs,
} from "./resourceBindings/Payout.js";
import {
  bindStripePayoutIntentReadInput,
  projectStripePayoutIntentOutputs,
} from "./resourceBindings/PayoutIntent.js";
import {
  bindStripePlanReadInput,
  projectStripePlanOutputs,
} from "./resourceBindings/Plan.js";
import {
  bindStripePriceReadInput,
  projectStripePriceOutputs,
} from "./resourceBindings/Price.js";
import {
  bindStripeProductReadInput,
  projectStripeProductOutputs,
} from "./resourceBindings/Product.js";
import {
  bindStripeProductCatalogImportReadInput,
  projectStripeProductCatalogImportOutputs,
} from "./resourceBindings/ProductCatalogImport.js";
import {
  bindStripeProductCatalogTrialOfferReadInput,
  projectStripeProductCatalogTrialOfferOutputs,
} from "./resourceBindings/ProductCatalogTrialOffer.js";
import {
  bindStripePromotionCodeReadInput,
  projectStripePromotionCodeOutputs,
} from "./resourceBindings/PromotionCode.js";
import {
  bindStripeQuoteReadInput,
  projectStripeQuoteOutputs,
} from "./resourceBindings/Quote.js";
import {
  bindStripeRadarValueListReadInput,
  projectStripeRadarValueListOutputs,
} from "./resourceBindings/RadarValueList.js";
import {
  bindStripeRadarValueListItemReadInput,
  projectStripeRadarValueListItemOutputs,
} from "./resourceBindings/RadarValueListItem.js";
import {
  bindStripeRecipientVerificationReadInput,
  projectStripeRecipientVerificationOutputs,
} from "./resourceBindings/RecipientVerification.js";
import {
  bindStripeRefundReadInput,
  projectStripeRefundOutputs,
} from "./resourceBindings/Refund.js";
import {
  bindStripeReportingReportRunReadInput,
  projectStripeReportingReportRunOutputs,
} from "./resourceBindings/ReportingReportRun.js";
import {
  bindStripeSetupIntentReadInput,
  projectStripeSetupIntentOutputs,
} from "./resourceBindings/SetupIntent.js";
import {
  bindStripeShippingRateReadInput,
  projectStripeShippingRateOutputs,
} from "./resourceBindings/ShippingRate.js";
import {
  bindStripeSourceReadInput,
  projectStripeSourceOutputs,
} from "./resourceBindings/Source.js";
import {
  bindStripeSubscriptionReadInput,
  projectStripeSubscriptionOutputs,
} from "./resourceBindings/Subscription.js";
import {
  bindStripeSubscriptionItemReadInput,
  projectStripeSubscriptionItemOutputs,
} from "./resourceBindings/SubscriptionItem.js";
import {
  bindStripeSubscriptionScheduleReadInput,
  projectStripeSubscriptionScheduleOutputs,
} from "./resourceBindings/SubscriptionSchedule.js";
import {
  bindStripeTaxIdReadInput,
  projectStripeTaxIdOutputs,
} from "./resourceBindings/TaxId.js";
import {
  bindStripeTaxLocationReadInput,
  projectStripeTaxLocationOutputs,
} from "./resourceBindings/TaxLocation.js";
import {
  bindStripeTaxRateReadInput,
  projectStripeTaxRateOutputs,
} from "./resourceBindings/TaxRate.js";
import {
  bindStripeTaxRegistrationReadInput,
  projectStripeTaxRegistrationOutputs,
} from "./resourceBindings/TaxRegistration.js";
import {
  bindStripeTerminalConfigurationReadInput,
  projectStripeTerminalConfigurationOutputs,
} from "./resourceBindings/TerminalConfiguration.js";
import {
  bindStripeTerminalLocationReadInput,
  projectStripeTerminalLocationOutputs,
} from "./resourceBindings/TerminalLocation.js";
import {
  bindStripeTerminalReaderReadInput,
  projectStripeTerminalReaderOutputs,
} from "./resourceBindings/TerminalReader.js";
import {
  bindStripeTestHelpersTestClockReadInput,
  projectStripeTestHelpersTestClockOutputs,
} from "./resourceBindings/TestHelpersTestClock.js";
import {
  bindStripeThreeDSecureAuthenticationReadInput,
  projectStripeThreeDSecureAuthenticationOutputs,
} from "./resourceBindings/ThreeDSecureAuthentication.js";
import {
  bindStripeTokenReadInput,
  projectStripeTokenOutputs,
} from "./resourceBindings/Token.js";
import {
  bindStripeTopupReadInput,
  projectStripeTopupOutputs,
} from "./resourceBindings/Topup.js";
import {
  bindStripeTransferReadInput,
  projectStripeTransferOutputs,
} from "./resourceBindings/Transfer.js";
import {
  bindStripeTreasuryCreditReversalReadInput,
  projectStripeTreasuryCreditReversalOutputs,
} from "./resourceBindings/TreasuryCreditReversal.js";
import {
  bindStripeTreasuryDebitReversalReadInput,
  projectStripeTreasuryDebitReversalOutputs,
} from "./resourceBindings/TreasuryDebitReversal.js";
import {
  bindStripeTreasuryFinancialAccountReadInput,
  projectStripeTreasuryFinancialAccountOutputs,
} from "./resourceBindings/TreasuryFinancialAccount.js";
import {
  bindStripeTreasuryInboundTransferReadInput,
  projectStripeTreasuryInboundTransferOutputs,
} from "./resourceBindings/TreasuryInboundTransfer.js";
import {
  bindStripeTreasuryOutboundPaymentReadInput,
  projectStripeTreasuryOutboundPaymentOutputs,
} from "./resourceBindings/TreasuryOutboundPayment.js";
import {
  bindStripeTreasuryOutboundTransferReadInput,
  projectStripeTreasuryOutboundTransferOutputs,
} from "./resourceBindings/TreasuryOutboundTransfer.js";
import {
  bindStripeUSBankAccountReadInput,
  projectStripeUSBankAccountOutputs,
} from "./resourceBindings/USBankAccount.js";
import {
  bindStripeV1AccountReadInput,
  projectStripeV1AccountOutputs,
} from "./resourceBindings/V1Account.js";
import {
  bindStripeWebhookEndpointReadInput,
  projectStripeWebhookEndpointOutputs,
} from "./resourceBindings/WebhookEndpoint.js";
import { StripeAccountPropsSchema } from "./resourceInputs/StripeAccountPropsSchema.js";
import { StripeAccountTokenPropsSchema } from "./resourceInputs/StripeAccountTokenPropsSchema.js";
import { StripeApplePayDomainPropsSchema } from "./resourceInputs/StripeApplePayDomainPropsSchema.js";
import { StripeAppsInstallPropsSchema } from "./resourceInputs/StripeAppsInstallPropsSchema.js";
import { StripeBankAccountPropsSchema } from "./resourceInputs/StripeBankAccountPropsSchema.js";
import { StripeBillingAlertPropsSchema } from "./resourceInputs/StripeBillingAlertPropsSchema.js";
import { StripeBillingConfigurationExportDocumentSchema } from "./resourceInputs/StripeBillingConfigurationExportDocumentSchema.js";
import { StripeBillingConfigurationExportPropsSchema } from "./resourceInputs/StripeBillingConfigurationExportPropsSchema.js";
import { StripeBillingCreditGrantPropsSchema } from "./resourceInputs/StripeBillingCreditGrantPropsSchema.js";
import { StripeBillingFeedbackOptionPropsSchema } from "./resourceInputs/StripeBillingFeedbackOptionPropsSchema.js";
import { StripeBillingMeterPropsSchema } from "./resourceInputs/StripeBillingMeterPropsSchema.js";
import { StripeBillingPortalConfigurationPropsSchema } from "./resourceInputs/StripeBillingPortalConfigurationPropsSchema.js";
import { StripeCardPropsSchema } from "./resourceInputs/StripeCardPropsSchema.js";
import { StripeChargePropsSchema } from "./resourceInputs/StripeChargePropsSchema.js";
import { StripeCheckoutSessionPropsSchema } from "./resourceInputs/StripeCheckoutSessionPropsSchema.js";
import { StripeClimateOrderPropsSchema } from "./resourceInputs/StripeClimateOrderPropsSchema.js";
import { StripeCouponPropsSchema } from "./resourceInputs/StripeCouponPropsSchema.js";
import { StripeCreditNotePropsSchema } from "./resourceInputs/StripeCreditNotePropsSchema.js";
import { StripeCustomerPropsSchema } from "./resourceInputs/StripeCustomerPropsSchema.js";
import { StripeEntitlementsFeaturePropsSchema } from "./resourceInputs/StripeEntitlementsFeaturePropsSchema.js";
import { StripeEventDestinationPropsSchema } from "./resourceInputs/StripeEventDestinationPropsSchema.js";
import { StripeFileLinkPropsSchema } from "./resourceInputs/StripeFileLinkPropsSchema.js";
import { StripeFinancialAddressPropsSchema } from "./resourceInputs/StripeFinancialAddressPropsSchema.js";
import { StripeFinancialConnectionsSessionPropsSchema } from "./resourceInputs/StripeFinancialConnectionsSessionPropsSchema.js";
import { StripeForwardingRequestPropsSchema } from "./resourceInputs/StripeForwardingRequestPropsSchema.js";
import { StripeGBBankAccountPropsSchema } from "./resourceInputs/StripeGBBankAccountPropsSchema.js";
import { StripeIdentityVerificationSessionPropsSchema } from "./resourceInputs/StripeIdentityVerificationSessionPropsSchema.js";
import { StripeInboundTransferPropsSchema } from "./resourceInputs/StripeInboundTransferPropsSchema.js";
import { StripeInvoiceitemPropsSchema } from "./resourceInputs/StripeInvoiceitemPropsSchema.js";
import { StripeInvoicePropsSchema } from "./resourceInputs/StripeInvoicePropsSchema.js";
import { StripeIssuingCardholderPropsSchema } from "./resourceInputs/StripeIssuingCardholderPropsSchema.js";
import { StripeIssuingCardPropsSchema } from "./resourceInputs/StripeIssuingCardPropsSchema.js";
import { StripeIssuingDisputePropsSchema } from "./resourceInputs/StripeIssuingDisputePropsSchema.js";
import { StripeIssuingPersonalizationDesignPropsSchema } from "./resourceInputs/StripeIssuingPersonalizationDesignPropsSchema.js";
import { StripeOutboundPaymentPropsSchema } from "./resourceInputs/StripeOutboundPaymentPropsSchema.js";
import { StripeOutboundSetupIntentPropsSchema } from "./resourceInputs/StripeOutboundSetupIntentPropsSchema.js";
import { StripePaymentIntentPropsSchema } from "./resourceInputs/StripePaymentIntentPropsSchema.js";
import { StripePaymentLinkPropsSchema } from "./resourceInputs/StripePaymentLinkPropsSchema.js";
import { StripePaymentMethodConfigurationPropsSchema } from "./resourceInputs/StripePaymentMethodConfigurationPropsSchema.js";
import { StripePaymentMethodDomainPropsSchema } from "./resourceInputs/StripePaymentMethodDomainPropsSchema.js";
import { StripePaymentMethodPropsSchema } from "./resourceInputs/StripePaymentMethodPropsSchema.js";
import { StripePayoutIntentPropsSchema } from "./resourceInputs/StripePayoutIntentPropsSchema.js";
import { StripePayoutPropsSchema } from "./resourceInputs/StripePayoutPropsSchema.js";
import { StripePlanPropsSchema } from "./resourceInputs/StripePlanPropsSchema.js";
import { StripePricePropsSchema } from "./resourceInputs/StripePricePropsSchema.js";
import { StripeProductCatalogImportPropsSchema } from "./resourceInputs/StripeProductCatalogImportPropsSchema.js";
import { StripeProductCatalogTrialOfferPropsSchema } from "./resourceInputs/StripeProductCatalogTrialOfferPropsSchema.js";
import { StripeProductPropsSchema } from "./resourceInputs/StripeProductPropsSchema.js";
import { StripePromotionCodePropsSchema } from "./resourceInputs/StripePromotionCodePropsSchema.js";
import { StripeQuotePropsSchema } from "./resourceInputs/StripeQuotePropsSchema.js";
import { StripeRadarValueListItemPropsSchema } from "./resourceInputs/StripeRadarValueListItemPropsSchema.js";
import { StripeRadarValueListPropsSchema } from "./resourceInputs/StripeRadarValueListPropsSchema.js";
import { StripeRecipientVerificationPropsSchema } from "./resourceInputs/StripeRecipientVerificationPropsSchema.js";
import { StripeRefundPropsSchema } from "./resourceInputs/StripeRefundPropsSchema.js";
import { StripeReportingReportRunPropsSchema } from "./resourceInputs/StripeReportingReportRunPropsSchema.js";
import { StripeSetupIntentPropsSchema } from "./resourceInputs/StripeSetupIntentPropsSchema.js";
import { StripeShippingRatePropsSchema } from "./resourceInputs/StripeShippingRatePropsSchema.js";
import { StripeSourcePropsSchema } from "./resourceInputs/StripeSourcePropsSchema.js";
import { StripeSubscriptionItemPropsSchema } from "./resourceInputs/StripeSubscriptionItemPropsSchema.js";
import { StripeSubscriptionPropsSchema } from "./resourceInputs/StripeSubscriptionPropsSchema.js";
import { StripeSubscriptionSchedulePropsSchema } from "./resourceInputs/StripeSubscriptionSchedulePropsSchema.js";
import { StripeTaxIdPropsSchema } from "./resourceInputs/StripeTaxIdPropsSchema.js";
import { StripeTaxLocationPropsSchema } from "./resourceInputs/StripeTaxLocationPropsSchema.js";
import { StripeTaxRatePropsSchema } from "./resourceInputs/StripeTaxRatePropsSchema.js";
import { StripeTaxRegistrationPropsSchema } from "./resourceInputs/StripeTaxRegistrationPropsSchema.js";
import { StripeTerminalConfigurationPropsSchema } from "./resourceInputs/StripeTerminalConfigurationPropsSchema.js";
import { StripeTerminalLocationPropsSchema } from "./resourceInputs/StripeTerminalLocationPropsSchema.js";
import { StripeTerminalReaderPropsSchema } from "./resourceInputs/StripeTerminalReaderPropsSchema.js";
import { StripeTestHelpersTestClockPropsSchema } from "./resourceInputs/StripeTestHelpersTestClockPropsSchema.js";
import { StripeThreeDSecureAuthenticationPropsSchema } from "./resourceInputs/StripeThreeDSecureAuthenticationPropsSchema.js";
import { StripeTokenPropsSchema } from "./resourceInputs/StripeTokenPropsSchema.js";
import { StripeTopupPropsSchema } from "./resourceInputs/StripeTopupPropsSchema.js";
import { StripeTransferPropsSchema } from "./resourceInputs/StripeTransferPropsSchema.js";
import { StripeTreasuryCreditReversalPropsSchema } from "./resourceInputs/StripeTreasuryCreditReversalPropsSchema.js";
import { StripeTreasuryDebitReversalPropsSchema } from "./resourceInputs/StripeTreasuryDebitReversalPropsSchema.js";
import { StripeTreasuryFinancialAccountPropsSchema } from "./resourceInputs/StripeTreasuryFinancialAccountPropsSchema.js";
import { StripeTreasuryInboundTransferPropsSchema } from "./resourceInputs/StripeTreasuryInboundTransferPropsSchema.js";
import { StripeTreasuryOutboundPaymentPropsSchema } from "./resourceInputs/StripeTreasuryOutboundPaymentPropsSchema.js";
import { StripeTreasuryOutboundTransferPropsSchema } from "./resourceInputs/StripeTreasuryOutboundTransferPropsSchema.js";
import { StripeUSBankAccountPropsSchema } from "./resourceInputs/StripeUSBankAccountPropsSchema.js";
import { StripeV1AccountPropsSchema } from "./resourceInputs/StripeV1AccountPropsSchema.js";
import { StripeWebhookEndpointDeclarationPropsSchema } from "./resourceInputs/StripeWebhookEndpointDeclarationPropsSchema.js";
import {
  StripeAccountOutputsSchema,
  StripeAccountTokenOutputsSchema,
  StripeApplePayDomainOutputsSchema,
  StripeAppsInstallOutputsSchema,
  StripeBankAccountOutputsSchema,
  StripeBankAccountResponseSchema,
  StripeBillingAlertOutputsSchema,
  StripeBillingConfigurationExportOutputsSchema,
  StripeBillingCreditGrantOutputsSchema,
  StripeBillingFeedbackOptionOutputsSchema,
  StripeBillingMeterOutputsSchema,
  StripeBillingPortalConfigurationOutputsSchema,
  StripeCardOutputsSchema,
  StripeCardResponseSchema,
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
import {
  GetSetupIntentsIntentOperation,
  PostSetupIntentsIntentOperation,
  PostSetupIntentsOperation,
} from "./setupIntents.js";
import {
  GetShippingRatesShippingRateTokenOperation,
  PostShippingRatesOperation,
  PostShippingRatesShippingRateTokenOperation,
} from "./shippingRates.js";
import {
  GetSourcesSourceOperation,
  PostSourcesOperation,
  PostSourcesSourceOperation,
} from "./sources.js";
import {
  DeleteSubscriptionItemsItemOperation,
  GetSubscriptionItemsItemOperation,
  PostSubscriptionItemsItemOperation,
  PostSubscriptionItemsOperation,
} from "./subscriptionItems.js";
import {
  GetSubscriptionSchedulesScheduleOperation,
  PostSubscriptionSchedulesOperation,
  PostSubscriptionSchedulesScheduleOperation,
} from "./subscriptionSchedules.js";
import {
  DeleteSubscriptionsSubscriptionExposedIdOperation,
  GetSubscriptionsSubscriptionExposedIdOperation,
  PostSubscriptionsOperation,
  PostSubscriptionsSubscriptionExposedIdOperation,
} from "./subscriptions.js";
import {
  DeleteTaxIdsIdOperation,
  GetTaxIdsIdOperation,
  PostTaxIdsOperation,
} from "./taxIds.js";
import {
  GetTaxLocationsLocationOperation,
  PostTaxLocationsOperation,
} from "./taxLocations.js";
import {
  GetTaxRatesTaxRateOperation,
  PostTaxRatesOperation,
  PostTaxRatesTaxRateOperation,
} from "./taxRates.js";
import {
  GetTaxRegistrationsIdOperation,
  PostTaxRegistrationsIdOperation,
  PostTaxRegistrationsOperation,
} from "./taxRegistrations.js";
import {
  DeleteTerminalConfigurationsConfigurationOperation,
  GetTerminalConfigurationsConfigurationOperation,
  PostTerminalConfigurationsConfigurationOperation,
  PostTerminalConfigurationsOperation,
} from "./terminalConfigurations.js";
import {
  DeleteTerminalLocationsLocationOperation,
  GetTerminalLocationsLocationOperation,
  PostTerminalLocationsLocationOperation,
  PostTerminalLocationsOperation,
} from "./terminalLocations.js";
import {
  DeleteTerminalReadersReaderOperation,
  GetTerminalReadersReaderOperation,
  PostTerminalReadersOperation,
  PostTerminalReadersReaderOperation,
} from "./terminalReaders.js";
import {
  DeleteTestHelpersTestClocksTestClockOperation,
  GetTestHelpersTestClocksTestClockOperation,
  PostTestHelpersTestClocksOperation,
  PostTestHelpersTestClocksTestClockAdvanceOperation,
} from "./testHelpersTestClocks.js";
import {
  GetThreeDSecureAuthenticationsAuthenticationOperation,
  PostThreeDSecureAuthenticationsOperation,
} from "./threeDSecureAuthentications.js";
import { GetTokensTokenOperation, PostTokensOperation } from "./tokens.js";
import {
  GetTopupsTopupOperation,
  PostTopupsOperation,
  PostTopupsTopupOperation,
} from "./topups.js";
import {
  GetTransfersTransferOperation,
  PostTransfersOperation,
  PostTransfersTransferOperation,
} from "./transfers.js";
import {
  GetTreasuryCreditReversalsCreditReversalOperation,
  PostTreasuryCreditReversalsOperation,
} from "./treasuryCreditReversals.js";
import {
  GetTreasuryDebitReversalsDebitReversalOperation,
  PostTreasuryDebitReversalsOperation,
} from "./treasuryDebitReversals.js";
import {
  GetTreasuryFinancialAccountsFinancialAccountOperation,
  PostTreasuryFinancialAccountsFinancialAccountOperation,
  PostTreasuryFinancialAccountsOperation,
} from "./treasuryFinancialAccounts.js";
import {
  GetTreasuryInboundTransfersIdOperation,
  PostTreasuryInboundTransfersOperation,
} from "./treasuryInboundTransfers.js";
import {
  GetTreasuryOutboundPaymentsIdOperation,
  PostTreasuryOutboundPaymentsOperation,
} from "./treasuryOutboundPayments.js";
import {
  GetTreasuryOutboundTransfersOutboundTransferOperation,
  PostTreasuryOutboundTransfersOperation,
} from "./treasuryOutboundTransfers.js";
import {
  DeleteAccountsAccountExternalAccountsIdOperation,
  DeleteAccountsAccountOperation,
  GetAccountsAccountExternalAccountsIdOperation,
  GetAccountsAccountOperation,
  PostAccountsAccountExternalAccountsIdOperation,
  PostAccountsAccountExternalAccountsOperation,
  PostAccountsAccountOperation,
  PostAccountsOperation,
} from "./v1Accounts.js";
import {
  DeleteWebhookEndpointsWebhookEndpointOperation,
  GetWebhookEndpointsWebhookEndpointOperation,
  PostWebhookEndpointsOperation,
  PostWebhookEndpointsWebhookEndpointOperation,
} from "./webhookEndpoints.js";

const stripeV1AccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeV1AccountPropsSchema,
    outputsSchema: StripeV1AccountOutputsSchema,
    identify: bindStripeV1AccountReadInput,
    projectOutputs: projectStripeV1AccountOutputs,
    operations: {
      create: PostAccountsOperation,
      read: GetAccountsAccountOperation,
      update: PostAccountsAccountOperation,
      remove: DeleteAccountsAccountOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBankAccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBankAccountPropsSchema,
    outputsSchema: StripeBankAccountOutputsSchema,
    identify: bindStripeBankAccountReadInput,
    projectOutputs: projectStripeBankAccountOutputs,
    responseSchema: StripeBankAccountResponseSchema,
    inputOutputs: {
      AccountId: "account",
    },
    operations: {
      create: PostAccountsAccountExternalAccountsOperation,
      read: GetAccountsAccountExternalAccountsIdOperation,
      update: PostAccountsAccountExternalAccountsIdOperation,
      remove: DeleteAccountsAccountExternalAccountsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeCardResourceCommandMetadataLayer = stripeResourcePolicyRegistration(
  {
    propsSchema: StripeCardPropsSchema,
    outputsSchema: StripeCardOutputsSchema,
    identify: bindStripeCardReadInput,
    projectOutputs: projectStripeCardOutputs,
    responseSchema: StripeCardResponseSchema,
    inputOutputs: {
      AccountId: "account",
    },
    operations: {
      create: PostAccountsAccountExternalAccountsOperation,
      read: GetAccountsAccountExternalAccountsIdOperation,
      update: PostAccountsAccountExternalAccountsIdOperation,
      remove: DeleteAccountsAccountExternalAccountsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  },
);
const stripeApplePayDomainResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeApplePayDomainPropsSchema,
    outputsSchema: StripeApplePayDomainOutputsSchema,
    identify: bindStripeApplePayDomainReadInput,
    projectOutputs: projectStripeApplePayDomainOutputs,
    operations: {
      create: PostApplePayDomainsOperation,
      read: GetApplePayDomainsDomainOperation,
      remove: DeleteApplePayDomainsDomainOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeAppsInstallResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeAppsInstallPropsSchema,
    outputsSchema: StripeAppsInstallOutputsSchema,
    identify: bindStripeAppsInstallReadInput,
    projectOutputs: projectStripeAppsInstallOutputs,
    operations: {
      create: PostAppsInstallsOperation,
      read: GetAppsInstallsIdOperation,
      update: PostAppsInstallsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingAlertResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBillingAlertPropsSchema,
    outputsSchema: StripeBillingAlertOutputsSchema,
    identify: bindStripeBillingAlertReadInput,
    projectOutputs: projectStripeBillingAlertOutputs,
    operations: {
      create: PostBillingAlertsOperation,
      read: GetBillingAlertsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingCreditGrantResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBillingCreditGrantPropsSchema,
    outputsSchema: StripeBillingCreditGrantOutputsSchema,
    identify: bindStripeBillingCreditGrantReadInput,
    projectOutputs: projectStripeBillingCreditGrantOutputs,
    operations: {
      create: PostBillingCreditGrantsOperation,
      read: GetBillingCreditGrantsIdOperation,
      update: PostBillingCreditGrantsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingFeedbackOptionResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBillingFeedbackOptionPropsSchema,
    outputsSchema: StripeBillingFeedbackOptionOutputsSchema,
    identify: bindStripeBillingFeedbackOptionReadInput,
    projectOutputs: projectStripeBillingFeedbackOptionOutputs,
    operations: {
      create: PostBillingFeedbackOptionsOperation,
      read: GetBillingFeedbackOptionsIdOperation,
      update: PostBillingFeedbackOptionsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingMeterResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBillingMeterPropsSchema,
    outputsSchema: StripeBillingMeterOutputsSchema,
    identify: bindStripeBillingMeterReadInput,
    projectOutputs: projectStripeBillingMeterOutputs,
    operations: {
      create: PostBillingMetersOperation,
      read: GetBillingMetersIdOperation,
      update: PostBillingMetersIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingPortalConfigurationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeBillingPortalConfigurationPropsSchema,
    outputsSchema: StripeBillingPortalConfigurationOutputsSchema,
    identify: bindStripeBillingPortalConfigurationReadInput,
    projectOutputs: projectStripeBillingPortalConfigurationOutputs,
    operations: {
      create: PostBillingPortalConfigurationsOperation,
      read: GetBillingPortalConfigurationsConfigurationOperation,
      update: PostBillingPortalConfigurationsConfigurationOperation,
      remove: PostBillingPortalConfigurationsConfigurationOperation,
    },
    removalValues: {
      active: false,
    } satisfies Omit<
      PostBillingPortalConfigurationsConfigurationInput,
      "configuration"
    >,
    deletedResponseMeansMissing: false,
  });
const stripeChargeResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeChargePropsSchema,
    outputsSchema: StripeChargeOutputsSchema,
    identify: bindStripeChargeReadInput,
    projectOutputs: projectStripeChargeOutputs,
    operations: {
      create: PostChargesOperation,
      read: GetChargesChargeOperation,
      update: PostChargesChargeOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeRefundResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeRefundPropsSchema,
    outputsSchema: StripeRefundOutputsSchema,
    identify: bindStripeRefundReadInput,
    projectOutputs: projectStripeRefundOutputs,
    operations: {
      create: PostRefundsOperation,
      read: GetRefundsRefundOperation,
      update: PostRefundsRefundOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeCheckoutSessionResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeCheckoutSessionPropsSchema,
    outputsSchema: StripeCheckoutSessionOutputsSchema,
    identify: bindStripeCheckoutSessionReadInput,
    projectOutputs: projectStripeCheckoutSessionOutputs,
    operations: {
      create: PostCheckoutSessionsOperation,
      read: GetCheckoutSessionsSessionOperation,
      update: PostCheckoutSessionsSessionOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeClimateOrderResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeClimateOrderPropsSchema,
    outputsSchema: StripeClimateOrderOutputsSchema,
    identify: bindStripeClimateOrderReadInput,
    projectOutputs: projectStripeClimateOrderOutputs,
    operations: {
      create: PostClimateOrdersOperation,
      read: GetClimateOrdersOrderOperation,
      update: PostClimateOrdersOrderOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeCouponResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeCouponPropsSchema,
    outputsSchema: StripeCouponOutputsSchema,
    identify: bindStripeCouponReadInput,
    projectOutputs: projectStripeCouponOutputs,
    operations: {
      create: PostCouponsOperation,
      read: GetCouponsCouponOperation,
      update: PostCouponsCouponOperation,
      remove: DeleteCouponsCouponOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeCreditNoteResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeCreditNotePropsSchema,
    outputsSchema: StripeCreditNoteOutputsSchema,
    identify: bindStripeCreditNoteReadInput,
    projectOutputs: projectStripeCreditNoteOutputs,
    operations: {
      create: PostCreditNotesOperation,
      read: GetCreditNotesIdOperation,
      update: PostCreditNotesIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeCustomerResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeCustomerPropsSchema,
    outputsSchema: StripeCustomerOutputsSchema,
    identify: bindStripeCustomerReadInput,
    projectOutputs: projectStripeCustomerOutputs,
    operations: {
      create: PostCustomersOperation,
      read: GetCustomersCustomerOperation,
      update: PostCustomersCustomerOperation,
      remove: DeleteCustomersCustomerOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: true,
  });
const stripeSubscriptionResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeSubscriptionPropsSchema,
    outputsSchema: StripeSubscriptionOutputsSchema,
    identify: bindStripeSubscriptionReadInput,
    projectOutputs: projectStripeSubscriptionOutputs,
    operations: {
      create: PostSubscriptionsOperation,
      read: GetSubscriptionsSubscriptionExposedIdOperation,
      update: PostSubscriptionsSubscriptionExposedIdOperation,
      remove: DeleteSubscriptionsSubscriptionExposedIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTaxIdResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTaxIdPropsSchema,
    outputsSchema: StripeTaxIdOutputsSchema,
    identify: bindStripeTaxIdReadInput,
    projectOutputs: projectStripeTaxIdOutputs,
    operations: {
      create: PostTaxIdsOperation,
      read: GetTaxIdsIdOperation,
      remove: DeleteTaxIdsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeEntitlementsFeatureResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeEntitlementsFeaturePropsSchema,
    outputsSchema: StripeEntitlementsFeatureOutputsSchema,
    identify: bindStripeEntitlementsFeatureReadInput,
    projectOutputs: projectStripeEntitlementsFeatureOutputs,
    operations: {
      create: PostEntitlementsFeaturesOperation,
      read: GetEntitlementsFeaturesIdOperation,
      update: PostEntitlementsFeaturesIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeFileLinkResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeFileLinkPropsSchema,
    outputsSchema: StripeFileLinkOutputsSchema,
    identify: bindStripeFileLinkReadInput,
    projectOutputs: projectStripeFileLinkOutputs,
    operations: {
      create: PostFileLinksOperation,
      read: GetFileLinksLinkOperation,
      update: PostFileLinksLinkOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeFinancialConnectionsSessionResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeFinancialConnectionsSessionPropsSchema,
    outputsSchema: StripeFinancialConnectionsSessionOutputsSchema,
    identify: bindStripeFinancialConnectionsSessionReadInput,
    projectOutputs: projectStripeFinancialConnectionsSessionOutputs,
    operations: {
      create: PostFinancialConnectionsSessionsOperation,
      read: GetFinancialConnectionsSessionsSessionOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeForwardingRequestResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeForwardingRequestPropsSchema,
    outputsSchema: StripeForwardingRequestOutputsSchema,
    identify: bindStripeForwardingRequestReadInput,
    projectOutputs: projectStripeForwardingRequestOutputs,
    operations: {
      create: PostForwardingRequestsOperation,
      read: GetForwardingRequestsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeIdentityVerificationSessionResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeIdentityVerificationSessionPropsSchema,
    outputsSchema: StripeIdentityVerificationSessionOutputsSchema,
    identify: bindStripeIdentityVerificationSessionReadInput,
    projectOutputs: projectStripeIdentityVerificationSessionOutputs,
    operations: {
      create: PostIdentityVerificationSessionsOperation,
      read: GetIdentityVerificationSessionsSessionOperation,
      update: PostIdentityVerificationSessionsSessionOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeInvoiceitemResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeInvoiceitemPropsSchema,
    outputsSchema: StripeInvoiceitemOutputsSchema,
    identify: bindStripeInvoiceitemReadInput,
    projectOutputs: projectStripeInvoiceitemOutputs,
    operations: {
      create: PostInvoiceitemsOperation,
      read: GetInvoiceitemsInvoiceitemOperation,
      update: PostInvoiceitemsInvoiceitemOperation,
      remove: DeleteInvoiceitemsInvoiceitemOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeInvoiceResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeInvoicePropsSchema,
    outputsSchema: StripeInvoiceOutputsSchema,
    identify: bindStripeInvoiceReadInput,
    projectOutputs: projectStripeInvoiceOutputs,
    operations: {
      create: PostInvoicesOperation,
      read: GetInvoicesInvoiceOperation,
      update: PostInvoicesInvoiceOperation,
      remove: DeleteInvoicesInvoiceOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeIssuingCardholderResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeIssuingCardholderPropsSchema,
    outputsSchema: StripeIssuingCardholderOutputsSchema,
    identify: bindStripeIssuingCardholderReadInput,
    projectOutputs: projectStripeIssuingCardholderOutputs,
    operations: {
      create: PostIssuingCardholdersOperation,
      read: GetIssuingCardholdersCardholderOperation,
      update: PostIssuingCardholdersCardholderOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeIssuingCardResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeIssuingCardPropsSchema,
    outputsSchema: StripeIssuingCardOutputsSchema,
    identify: bindStripeIssuingCardReadInput,
    projectOutputs: projectStripeIssuingCardOutputs,
    operations: {
      create: PostIssuingCardsOperation,
      read: GetIssuingCardsCardOperation,
      update: PostIssuingCardsCardOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeIssuingDisputeResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeIssuingDisputePropsSchema,
    outputsSchema: StripeIssuingDisputeOutputsSchema,
    identify: bindStripeIssuingDisputeReadInput,
    projectOutputs: projectStripeIssuingDisputeOutputs,
    operations: {
      create: PostIssuingDisputesOperation,
      read: GetIssuingDisputesDisputeOperation,
      update: PostIssuingDisputesDisputeOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeIssuingPersonalizationDesignResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeIssuingPersonalizationDesignPropsSchema,
    outputsSchema: StripeIssuingPersonalizationDesignOutputsSchema,
    identify: bindStripeIssuingPersonalizationDesignReadInput,
    projectOutputs: projectStripeIssuingPersonalizationDesignOutputs,
    operations: {
      create: PostIssuingPersonalizationDesignsOperation,
      read: GetIssuingPersonalizationDesignsPersonalizationDesignOperation,
      update: PostIssuingPersonalizationDesignsPersonalizationDesignOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePaymentIntentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePaymentIntentPropsSchema,
    outputsSchema: StripePaymentIntentOutputsSchema,
    identify: bindStripePaymentIntentReadInput,
    projectOutputs: projectStripePaymentIntentOutputs,
    operations: {
      create: PostPaymentIntentsOperation,
      read: GetPaymentIntentsIntentOperation,
      update: PostPaymentIntentsIntentOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePaymentLinkResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePaymentLinkPropsSchema,
    outputsSchema: StripePaymentLinkOutputsSchema,
    identify: bindStripePaymentLinkReadInput,
    projectOutputs: projectStripePaymentLinkOutputs,
    operations: {
      create: PostPaymentLinksOperation,
      read: GetPaymentLinksPaymentLinkOperation,
      update: PostPaymentLinksPaymentLinkOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePaymentMethodConfigurationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePaymentMethodConfigurationPropsSchema,
    outputsSchema: StripePaymentMethodConfigurationOutputsSchema,
    identify: bindStripePaymentMethodConfigurationReadInput,
    projectOutputs: projectStripePaymentMethodConfigurationOutputs,
    operations: {
      create: PostPaymentMethodConfigurationsOperation,
      read: GetPaymentMethodConfigurationsConfigurationOperation,
      update: PostPaymentMethodConfigurationsConfigurationOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePaymentMethodDomainResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePaymentMethodDomainPropsSchema,
    outputsSchema: StripePaymentMethodDomainOutputsSchema,
    identify: bindStripePaymentMethodDomainReadInput,
    projectOutputs: projectStripePaymentMethodDomainOutputs,
    operations: {
      create: PostPaymentMethodDomainsOperation,
      read: GetPaymentMethodDomainsPaymentMethodDomainOperation,
      update: PostPaymentMethodDomainsPaymentMethodDomainOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePaymentMethodResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePaymentMethodPropsSchema,
    outputsSchema: StripePaymentMethodOutputsSchema,
    identify: bindStripePaymentMethodReadInput,
    projectOutputs: projectStripePaymentMethodOutputs,
    operations: {
      create: PostPaymentMethodsOperation,
      read: GetPaymentMethodsPaymentMethodOperation,
      update: PostPaymentMethodsPaymentMethodOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePayoutResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePayoutPropsSchema,
    outputsSchema: StripePayoutOutputsSchema,
    identify: bindStripePayoutReadInput,
    projectOutputs: projectStripePayoutOutputs,
    operations: {
      create: PostPayoutsOperation,
      read: GetPayoutsPayoutOperation,
      update: PostPayoutsPayoutOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePlanResourceCommandMetadataLayer = stripeResourcePolicyRegistration(
  {
    propsSchema: StripePlanPropsSchema,
    outputsSchema: StripePlanOutputsSchema,
    identify: bindStripePlanReadInput,
    projectOutputs: projectStripePlanOutputs,
    operations: {
      create: PostPlansOperation,
      read: GetPlansPlanOperation,
      update: PostPlansPlanOperation,
      remove: DeletePlansPlanOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  },
);
const stripePriceResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePricePropsSchema,
    outputsSchema: StripePriceOutputsSchema,
    identify: bindStripePriceReadInput,
    projectOutputs: projectStripePriceOutputs,
    operations: {
      create: PostPricesOperation,
      read: GetPricesPriceOperation,
      update: PostPricesPriceOperation,
      remove: PostPricesPriceOperation,
    },
    removalValues: {
      active: false,
      lookup_key: "",
    } satisfies Omit<PostPricesPriceInput, "price">,
    deletedResponseMeansMissing: false,
  });
const stripeProductCatalogTrialOfferResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeProductCatalogTrialOfferPropsSchema,
    outputsSchema: StripeProductCatalogTrialOfferOutputsSchema,
    identify: bindStripeProductCatalogTrialOfferReadInput,
    projectOutputs: projectStripeProductCatalogTrialOfferOutputs,
    operations: {
      create: PostProductCatalogTrialOffersOperation,
      read: GetProductCatalogTrialOffersIdOperation,
      update: PostProductCatalogTrialOffersIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeProductResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeProductPropsSchema,
    outputsSchema: StripeProductOutputsSchema,
    identify: bindStripeProductReadInput,
    projectOutputs: projectStripeProductOutputs,
    operations: {
      create: PostProductsOperation,
      read: GetProductsIdOperation,
      update: PostProductsIdOperation,
      remove: PostProductsIdOperation,
    },
    removalValues: {
      active: false,
    } satisfies Omit<PostProductsIdInput, "id">,
    deletedResponseMeansMissing: false,
  });
const stripePromotionCodeResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePromotionCodePropsSchema,
    outputsSchema: StripePromotionCodeOutputsSchema,
    identify: bindStripePromotionCodeReadInput,
    projectOutputs: projectStripePromotionCodeOutputs,
    operations: {
      create: PostPromotionCodesOperation,
      read: GetPromotionCodesPromotionCodeOperation,
      update: PostPromotionCodesPromotionCodeOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeQuoteResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeQuotePropsSchema,
    outputsSchema: StripeQuoteOutputsSchema,
    identify: bindStripeQuoteReadInput,
    projectOutputs: projectStripeQuoteOutputs,
    operations: {
      create: PostQuotesOperation,
      read: GetQuotesQuoteOperation,
      update: PostQuotesQuoteOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeRadarValueListItemResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeRadarValueListItemPropsSchema,
    outputsSchema: StripeRadarValueListItemOutputsSchema,
    identify: bindStripeRadarValueListItemReadInput,
    projectOutputs: projectStripeRadarValueListItemOutputs,
    operations: {
      create: PostRadarValueListItemsOperation,
      read: GetRadarValueListItemsItemOperation,
      remove: DeleteRadarValueListItemsItemOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeRadarValueListResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeRadarValueListPropsSchema,
    outputsSchema: StripeRadarValueListOutputsSchema,
    identify: bindStripeRadarValueListReadInput,
    projectOutputs: projectStripeRadarValueListOutputs,
    operations: {
      create: PostRadarValueListsOperation,
      read: GetRadarValueListsValueListOperation,
      update: PostRadarValueListsValueListOperation,
      remove: DeleteRadarValueListsValueListOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeReportingReportRunResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeReportingReportRunPropsSchema,
    outputsSchema: StripeReportingReportRunOutputsSchema,
    identify: bindStripeReportingReportRunReadInput,
    projectOutputs: projectStripeReportingReportRunOutputs,
    operations: {
      create: PostReportingReportRunsOperation,
      read: GetReportingReportRunsReportRunOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeSetupIntentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeSetupIntentPropsSchema,
    outputsSchema: StripeSetupIntentOutputsSchema,
    identify: bindStripeSetupIntentReadInput,
    projectOutputs: projectStripeSetupIntentOutputs,
    operations: {
      create: PostSetupIntentsOperation,
      read: GetSetupIntentsIntentOperation,
      update: PostSetupIntentsIntentOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeShippingRateResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeShippingRatePropsSchema,
    outputsSchema: StripeShippingRateOutputsSchema,
    identify: bindStripeShippingRateReadInput,
    projectOutputs: projectStripeShippingRateOutputs,
    operations: {
      create: PostShippingRatesOperation,
      read: GetShippingRatesShippingRateTokenOperation,
      update: PostShippingRatesShippingRateTokenOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeSourceResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeSourcePropsSchema,
    outputsSchema: StripeSourceOutputsSchema,
    identify: bindStripeSourceReadInput,
    projectOutputs: projectStripeSourceOutputs,
    operations: {
      create: PostSourcesOperation,
      read: GetSourcesSourceOperation,
      update: PostSourcesSourceOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeSubscriptionItemResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeSubscriptionItemPropsSchema,
    outputsSchema: StripeSubscriptionItemOutputsSchema,
    identify: bindStripeSubscriptionItemReadInput,
    projectOutputs: projectStripeSubscriptionItemOutputs,
    operations: {
      create: PostSubscriptionItemsOperation,
      read: GetSubscriptionItemsItemOperation,
      update: PostSubscriptionItemsItemOperation,
      remove: DeleteSubscriptionItemsItemOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeSubscriptionScheduleResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeSubscriptionSchedulePropsSchema,
    outputsSchema: StripeSubscriptionScheduleOutputsSchema,
    identify: bindStripeSubscriptionScheduleReadInput,
    projectOutputs: projectStripeSubscriptionScheduleOutputs,
    operations: {
      create: PostSubscriptionSchedulesOperation,
      read: GetSubscriptionSchedulesScheduleOperation,
      update: PostSubscriptionSchedulesScheduleOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTaxLocationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTaxLocationPropsSchema,
    outputsSchema: StripeTaxLocationOutputsSchema,
    identify: bindStripeTaxLocationReadInput,
    projectOutputs: projectStripeTaxLocationOutputs,
    operations: {
      create: PostTaxLocationsOperation,
      read: GetTaxLocationsLocationOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTaxRegistrationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTaxRegistrationPropsSchema,
    outputsSchema: StripeTaxRegistrationOutputsSchema,
    identify: bindStripeTaxRegistrationReadInput,
    projectOutputs: projectStripeTaxRegistrationOutputs,
    operations: {
      create: PostTaxRegistrationsOperation,
      read: GetTaxRegistrationsIdOperation,
      update: PostTaxRegistrationsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTaxRateResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTaxRatePropsSchema,
    outputsSchema: StripeTaxRateOutputsSchema,
    identify: bindStripeTaxRateReadInput,
    projectOutputs: projectStripeTaxRateOutputs,
    operations: {
      create: PostTaxRatesOperation,
      read: GetTaxRatesTaxRateOperation,
      update: PostTaxRatesTaxRateOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTerminalConfigurationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTerminalConfigurationPropsSchema,
    outputsSchema: StripeTerminalConfigurationOutputsSchema,
    identify: bindStripeTerminalConfigurationReadInput,
    projectOutputs: projectStripeTerminalConfigurationOutputs,
    operations: {
      create: PostTerminalConfigurationsOperation,
      read: GetTerminalConfigurationsConfigurationOperation,
      update: PostTerminalConfigurationsConfigurationOperation,
      remove: DeleteTerminalConfigurationsConfigurationOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTerminalLocationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTerminalLocationPropsSchema,
    outputsSchema: StripeTerminalLocationOutputsSchema,
    identify: bindStripeTerminalLocationReadInput,
    projectOutputs: projectStripeTerminalLocationOutputs,
    operations: {
      create: PostTerminalLocationsOperation,
      read: GetTerminalLocationsLocationOperation,
      update: PostTerminalLocationsLocationOperation,
      remove: DeleteTerminalLocationsLocationOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTerminalReaderResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTerminalReaderPropsSchema,
    outputsSchema: StripeTerminalReaderOutputsSchema,
    identify: bindStripeTerminalReaderReadInput,
    projectOutputs: projectStripeTerminalReaderOutputs,
    operations: {
      create: PostTerminalReadersOperation,
      read: GetTerminalReadersReaderOperation,
      update: PostTerminalReadersReaderOperation,
      remove: DeleteTerminalReadersReaderOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTestHelpersTestClockResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTestHelpersTestClockPropsSchema,
    outputsSchema: StripeTestHelpersTestClockOutputsSchema,
    identify: bindStripeTestHelpersTestClockReadInput,
    projectOutputs: projectStripeTestHelpersTestClockOutputs,
    operations: {
      create: PostTestHelpersTestClocksOperation,
      read: GetTestHelpersTestClocksTestClockOperation,
      update: PostTestHelpersTestClocksTestClockAdvanceOperation,
      remove: DeleteTestHelpersTestClocksTestClockOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeThreeDSecureAuthenticationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeThreeDSecureAuthenticationPropsSchema,
    outputsSchema: StripeThreeDSecureAuthenticationOutputsSchema,
    identify: bindStripeThreeDSecureAuthenticationReadInput,
    projectOutputs: projectStripeThreeDSecureAuthenticationOutputs,
    operations: {
      create: PostThreeDSecureAuthenticationsOperation,
      read: GetThreeDSecureAuthenticationsAuthenticationOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTokenResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTokenPropsSchema,
    outputsSchema: StripeTokenOutputsSchema,
    identify: bindStripeTokenReadInput,
    projectOutputs: projectStripeTokenOutputs,
    operations: {
      create: PostTokensOperation,
      read: GetTokensTokenOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTopupResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTopupPropsSchema,
    outputsSchema: StripeTopupOutputsSchema,
    identify: bindStripeTopupReadInput,
    projectOutputs: projectStripeTopupOutputs,
    operations: {
      create: PostTopupsOperation,
      read: GetTopupsTopupOperation,
      update: PostTopupsTopupOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTransferResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTransferPropsSchema,
    outputsSchema: StripeTransferOutputsSchema,
    identify: bindStripeTransferReadInput,
    projectOutputs: projectStripeTransferOutputs,
    operations: {
      create: PostTransfersOperation,
      read: GetTransfersTransferOperation,
      update: PostTransfersTransferOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryCreditReversalResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryCreditReversalPropsSchema,
    outputsSchema: StripeTreasuryCreditReversalOutputsSchema,
    identify: bindStripeTreasuryCreditReversalReadInput,
    projectOutputs: projectStripeTreasuryCreditReversalOutputs,
    operations: {
      create: PostTreasuryCreditReversalsOperation,
      read: GetTreasuryCreditReversalsCreditReversalOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryDebitReversalResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryDebitReversalPropsSchema,
    outputsSchema: StripeTreasuryDebitReversalOutputsSchema,
    identify: bindStripeTreasuryDebitReversalReadInput,
    projectOutputs: projectStripeTreasuryDebitReversalOutputs,
    operations: {
      create: PostTreasuryDebitReversalsOperation,
      read: GetTreasuryDebitReversalsDebitReversalOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryFinancialAccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryFinancialAccountPropsSchema,
    outputsSchema: StripeTreasuryFinancialAccountOutputsSchema,
    identify: bindStripeTreasuryFinancialAccountReadInput,
    projectOutputs: projectStripeTreasuryFinancialAccountOutputs,
    operations: {
      create: PostTreasuryFinancialAccountsOperation,
      read: GetTreasuryFinancialAccountsFinancialAccountOperation,
      update: PostTreasuryFinancialAccountsFinancialAccountOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryInboundTransferResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryInboundTransferPropsSchema,
    outputsSchema: StripeTreasuryInboundTransferOutputsSchema,
    identify: bindStripeTreasuryInboundTransferReadInput,
    projectOutputs: projectStripeTreasuryInboundTransferOutputs,
    operations: {
      create: PostTreasuryInboundTransfersOperation,
      read: GetTreasuryInboundTransfersIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryOutboundPaymentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryOutboundPaymentPropsSchema,
    outputsSchema: StripeTreasuryOutboundPaymentOutputsSchema,
    identify: bindStripeTreasuryOutboundPaymentReadInput,
    projectOutputs: projectStripeTreasuryOutboundPaymentOutputs,
    operations: {
      create: PostTreasuryOutboundPaymentsOperation,
      read: GetTreasuryOutboundPaymentsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeTreasuryOutboundTransferResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeTreasuryOutboundTransferPropsSchema,
    outputsSchema: StripeTreasuryOutboundTransferOutputsSchema,
    identify: bindStripeTreasuryOutboundTransferReadInput,
    projectOutputs: projectStripeTreasuryOutboundTransferOutputs,
    operations: {
      create: PostTreasuryOutboundTransfersOperation,
      read: GetTreasuryOutboundTransfersOutboundTransferOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeWebhookEndpointResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeWebhookEndpointDeclarationPropsSchema,
    outputsSchema: StripeWebhookEndpointOutputsSchema,
    identify: bindStripeWebhookEndpointReadInput,
    projectOutputs: projectStripeWebhookEndpointOutputs,
    request: {
      urlCredentials: [
        {
          propertyPath: ["url"],
          usernameConfig: "NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_USERNAME",
          passwordConfig: "NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_PASSWORD",
        },
      ],
      propertyPath: ["endpoint"],
    },
    operations: {
      create: PostWebhookEndpointsOperation,
      read: GetWebhookEndpointsWebhookEndpointOperation,
      update: PostWebhookEndpointsWebhookEndpointOperation,
      remove: DeleteWebhookEndpointsWebhookEndpointOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeProductCatalogImportResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeProductCatalogImportPropsSchema,
    outputsSchema: StripeProductCatalogImportOutputsSchema,
    identify: bindStripeProductCatalogImportReadInput,
    projectOutputs: projectStripeProductCatalogImportOutputs,
    operations: {
      create: PostV2CommerceProductCatalogImportsOperation,
      read: GetV2CommerceProductCatalogImportsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeAccountTokenResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeAccountTokenPropsSchema,
    outputsSchema: StripeAccountTokenOutputsSchema,
    identify: bindStripeAccountTokenReadInput,
    projectOutputs: projectStripeAccountTokenOutputs,
    operations: {
      create: PostV2CoreAccountTokensOperation,
      read: GetV2CoreAccountTokensIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeAccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeAccountPropsSchema,
    outputsSchema: StripeAccountOutputsSchema,
    identify: bindStripeAccountReadInput,
    projectOutputs: projectStripeAccountOutputs,
    operations: {
      create: PostV2CoreAccountsOperation,
      read: GetV2CoreAccountsIdOperation,
      update: PostV2CoreAccountsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeEventDestinationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeEventDestinationPropsSchema,
    outputsSchema: StripeEventDestinationOutputsSchema,
    identify: bindStripeEventDestinationReadInput,
    projectOutputs: projectStripeEventDestinationOutputs,
    operations: {
      create: PostV2CoreEventDestinationsOperation,
      read: GetV2CoreEventDestinationsIdOperation,
      update: PostV2CoreEventDestinationsIdOperation,
      remove: DeleteV2CoreEventDestinationsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeGBBankAccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeGBBankAccountPropsSchema,
    outputsSchema: StripeGBBankAccountOutputsSchema,
    identify: bindStripeGBBankAccountReadInput,
    projectOutputs: projectStripeGBBankAccountOutputs,
    operations: {
      create: PostV2CoreVaultGbBankAccountsOperation,
      read: GetV2CoreVaultGbBankAccountsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeUSBankAccountResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeUSBankAccountPropsSchema,
    outputsSchema: StripeUSBankAccountOutputsSchema,
    identify: bindStripeUSBankAccountReadInput,
    projectOutputs: projectStripeUSBankAccountOutputs,
    operations: {
      create: PostV2CoreVaultUsBankAccountsOperation,
      read: GetV2CoreVaultUsBankAccountsIdOperation,
      update: PostV2CoreVaultUsBankAccountsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeFinancialAddressResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeFinancialAddressPropsSchema,
    outputsSchema: StripeFinancialAddressOutputsSchema,
    identify: bindStripeFinancialAddressReadInput,
    projectOutputs: projectStripeFinancialAddressOutputs,
    operations: {
      create: PostV2MoneyManagementFinancialAddressesOperation,
      read: GetV2MoneyManagementFinancialAddressesIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeInboundTransferResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeInboundTransferPropsSchema,
    outputsSchema: StripeInboundTransferOutputsSchema,
    identify: bindStripeInboundTransferReadInput,
    projectOutputs: projectStripeInboundTransferOutputs,
    operations: {
      create: PostV2MoneyManagementInboundTransfersOperation,
      read: GetV2MoneyManagementInboundTransfersIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeOutboundPaymentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeOutboundPaymentPropsSchema,
    outputsSchema: StripeOutboundPaymentOutputsSchema,
    identify: bindStripeOutboundPaymentReadInput,
    projectOutputs: projectStripeOutboundPaymentOutputs,
    operations: {
      create: PostV2MoneyManagementOutboundPaymentsOperation,
      read: GetV2MoneyManagementOutboundPaymentsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeOutboundSetupIntentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeOutboundSetupIntentPropsSchema,
    outputsSchema: StripeOutboundSetupIntentOutputsSchema,
    identify: bindStripeOutboundSetupIntentReadInput,
    projectOutputs: projectStripeOutboundSetupIntentOutputs,
    operations: {
      create: PostV2MoneyManagementOutboundSetupIntentsOperation,
      read: GetV2MoneyManagementOutboundSetupIntentsIdOperation,
      update: PostV2MoneyManagementOutboundSetupIntentsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripePayoutIntentResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripePayoutIntentPropsSchema,
    outputsSchema: StripePayoutIntentOutputsSchema,
    identify: bindStripePayoutIntentReadInput,
    projectOutputs: projectStripePayoutIntentOutputs,
    operations: {
      create: PostV2MoneyManagementPayoutIntentsOperation,
      read: GetV2MoneyManagementPayoutIntentsIdOperation,
      update: PostV2MoneyManagementPayoutIntentsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeRecipientVerificationResourceCommandMetadataLayer =
  stripeResourcePolicyRegistration({
    propsSchema: StripeRecipientVerificationPropsSchema,
    outputsSchema: StripeRecipientVerificationOutputsSchema,
    identify: bindStripeRecipientVerificationReadInput,
    projectOutputs: projectStripeRecipientVerificationOutputs,
    operations: {
      create: PostV2MoneyManagementRecipientVerificationsOperation,
      read: GetV2MoneyManagementRecipientVerificationsIdOperation,
    },
    removalValues: {},
    deletedResponseMeansMissing: false,
  });
const stripeBillingConfigurationExportResourceCommandMetadataLayer =
  jsonFileResourcePolicyRegistration({
    propsSchema: StripeBillingConfigurationExportPropsSchema,
    documentSchema: StripeBillingConfigurationExportDocumentSchema,
    outputsSchema: StripeBillingConfigurationExportOutputsSchema,
    file: {
      pathProperty: "outputPath",
      pathOutput: "OutputPath",
    },
  });
/**
 * The stripeGeneratedResourceCommandLayer Layer lets stack commands find
 * the execution policy for each generated resource's saved identity.
 * Provider commands require StripeClient; file commands require the
 * application filesystem. Compose these registrations in the shared stack graph.
 *
 */
export const stripeGeneratedResourceCommandLayer = Layer.mergeAll(
  stripeV1AccountResourceCommandMetadataLayer,
  stripeBankAccountResourceCommandMetadataLayer,
  stripeCardResourceCommandMetadataLayer,
  stripeApplePayDomainResourceCommandMetadataLayer,
  stripeAppsInstallResourceCommandMetadataLayer,
  stripeBillingAlertResourceCommandMetadataLayer,
  stripeBillingCreditGrantResourceCommandMetadataLayer,
  stripeBillingFeedbackOptionResourceCommandMetadataLayer,
  stripeBillingMeterResourceCommandMetadataLayer,
  stripeBillingPortalConfigurationResourceCommandMetadataLayer,
  stripeChargeResourceCommandMetadataLayer,
  stripeRefundResourceCommandMetadataLayer,
  stripeCheckoutSessionResourceCommandMetadataLayer,
  stripeClimateOrderResourceCommandMetadataLayer,
  stripeCouponResourceCommandMetadataLayer,
  stripeCreditNoteResourceCommandMetadataLayer,
  stripeCustomerResourceCommandMetadataLayer,
  stripeSubscriptionResourceCommandMetadataLayer,
  stripeTaxIdResourceCommandMetadataLayer,
  stripeEntitlementsFeatureResourceCommandMetadataLayer,
  stripeFileLinkResourceCommandMetadataLayer,
  stripeFinancialConnectionsSessionResourceCommandMetadataLayer,
  stripeForwardingRequestResourceCommandMetadataLayer,
  stripeIdentityVerificationSessionResourceCommandMetadataLayer,
  stripeInvoiceitemResourceCommandMetadataLayer,
  stripeInvoiceResourceCommandMetadataLayer,
  stripeIssuingCardholderResourceCommandMetadataLayer,
  stripeIssuingCardResourceCommandMetadataLayer,
  stripeIssuingDisputeResourceCommandMetadataLayer,
  stripeIssuingPersonalizationDesignResourceCommandMetadataLayer,
  stripePaymentIntentResourceCommandMetadataLayer,
  stripePaymentLinkResourceCommandMetadataLayer,
  stripePaymentMethodConfigurationResourceCommandMetadataLayer,
  stripePaymentMethodDomainResourceCommandMetadataLayer,
  stripePaymentMethodResourceCommandMetadataLayer,
  stripePayoutResourceCommandMetadataLayer,
  stripePlanResourceCommandMetadataLayer,
  stripePriceResourceCommandMetadataLayer,
  stripeProductCatalogTrialOfferResourceCommandMetadataLayer,
  stripeProductResourceCommandMetadataLayer,
  stripePromotionCodeResourceCommandMetadataLayer,
  stripeQuoteResourceCommandMetadataLayer,
  stripeRadarValueListItemResourceCommandMetadataLayer,
  stripeRadarValueListResourceCommandMetadataLayer,
  stripeReportingReportRunResourceCommandMetadataLayer,
  stripeSetupIntentResourceCommandMetadataLayer,
  stripeShippingRateResourceCommandMetadataLayer,
  stripeSourceResourceCommandMetadataLayer,
  stripeSubscriptionItemResourceCommandMetadataLayer,
  stripeSubscriptionScheduleResourceCommandMetadataLayer,
  stripeTaxLocationResourceCommandMetadataLayer,
  stripeTaxRegistrationResourceCommandMetadataLayer,
  stripeTaxRateResourceCommandMetadataLayer,
  stripeTerminalConfigurationResourceCommandMetadataLayer,
  stripeTerminalLocationResourceCommandMetadataLayer,
  stripeTerminalReaderResourceCommandMetadataLayer,
  stripeTestHelpersTestClockResourceCommandMetadataLayer,
  stripeThreeDSecureAuthenticationResourceCommandMetadataLayer,
  stripeTokenResourceCommandMetadataLayer,
  stripeTopupResourceCommandMetadataLayer,
  stripeTransferResourceCommandMetadataLayer,
  stripeTreasuryCreditReversalResourceCommandMetadataLayer,
  stripeTreasuryDebitReversalResourceCommandMetadataLayer,
  stripeTreasuryFinancialAccountResourceCommandMetadataLayer,
  stripeTreasuryInboundTransferResourceCommandMetadataLayer,
  stripeTreasuryOutboundPaymentResourceCommandMetadataLayer,
  stripeTreasuryOutboundTransferResourceCommandMetadataLayer,
  stripeWebhookEndpointResourceCommandMetadataLayer,
  stripeProductCatalogImportResourceCommandMetadataLayer,
  stripeAccountTokenResourceCommandMetadataLayer,
  stripeAccountResourceCommandMetadataLayer,
  stripeEventDestinationResourceCommandMetadataLayer,
  stripeGBBankAccountResourceCommandMetadataLayer,
  stripeUSBankAccountResourceCommandMetadataLayer,
  stripeFinancialAddressResourceCommandMetadataLayer,
  stripeInboundTransferResourceCommandMetadataLayer,
  stripeOutboundPaymentResourceCommandMetadataLayer,
  stripeOutboundSetupIntentResourceCommandMetadataLayer,
  stripePayoutIntentResourceCommandMetadataLayer,
  stripeRecipientVerificationResourceCommandMetadataLayer,
  stripeBillingConfigurationExportResourceCommandMetadataLayer,
);
