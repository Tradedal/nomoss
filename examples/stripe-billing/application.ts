import { Effect } from "effect";
import { localState } from "nomoss/core";
import { providers, StripeResources } from "nomoss/providers/stripe";

export const billingStack = {
  name: "stripe-billing",
  providers: providers(),
  state: localState(),
  resources: Effect.gen(function* () {
    const stripe = yield* StripeResources;
    const membership = yield* stripe.Product({
      logicalId: "Membership",
      props: { name: "Nomoss example membership" },
    });

    const monthly = yield* stripe.Price({
      logicalId: "Monthly",
      props: {
        product: membership,
        currency: "usd",
        unit_amount: 1000,
        recurring: { interval: "month" },
      },
    });
    const annual = yield* stripe.Price({
      logicalId: "Annual",
      props: {
        product: membership,
        currency: "usd",
        unit_amount: 10000,
        recurring: { interval: "year" },
      },
    });

    const portal = yield* stripe.BillingPortalConfiguration({
      logicalId: "MembershipPortal",
      props: {
        business_profile: { headline: "Manage your membership" },
        features: {
          subscription_update: {
            enabled: true,
            default_allowed_updates: ["price"],
            proration_behavior: "none",
            products: [{ product: membership, prices: [monthly, annual] }],
          },
        },
      },
    });

    return () => ({
      monthlyPriceId: monthly.PriceId,
      annualPriceId: annual.PriceId,
      portalId: portal.BillingPortalConfigurationId,
    });
  }),
};
