import { Array as Arr, Context, Effect, Layer, Option, Record } from "effect";
import { stripeApiVersion } from "../../src/providers/stripe/client/generated/configuration.js";
import type { StripeBillingConfigurationExportResource } from "../../src/providers/stripe/client/generated/resourceBindings/BillingConfigurationExport.js";
import type { StripeBillingPortalConfigurationResource } from "../../src/providers/stripe/client/generated/resourceBindings/BillingPortalConfiguration.js";
import type { StripePriceResource } from "../../src/providers/stripe/client/generated/resourceBindings/Price.js";
import type { StripeProductResource } from "../../src/providers/stripe/client/generated/resourceBindings/Product.js";
import type { StripeWebhookEndpointResource } from "../../src/providers/stripe/client/generated/resourceBindings/WebhookEndpoint.js";
import type { StripeBillingConfigurationExportPropsEntity } from "../../src/providers/stripe/client/generated/resourceInputs/StripeBillingConfigurationExportPropsEntitySchema.js";
import { StripeResources } from "../../src/providers/stripe/management/resources.js";

export interface StripeOfferDeclaration {
  readonly product: StripeProductResource;
  readonly price: StripePriceResource;
}

export interface StripeBillingScenario {
  readonly offers: Readonly<Record<string, StripeOfferDeclaration>>;
  readonly portal: StripeBillingPortalConfigurationResource;
  readonly webhook: Option.Option<StripeWebhookEndpointResource>;
  readonly configuration: Option.Option<
    StripeBillingConfigurationExportResource<StripeBillingConfigurationExportPropsEntity>
  >;
}

/**
 * Each billing scenario declares which monthly offers users can switch to in
 * the Stripe portal. The export scenario also writes the provider IDs the
 * application needs to open the portal and use the offers.
 */
export class StripeBillingFixture extends Context.Service<StripeBillingFixture>()(
  "nomoss/tests/support/stripeBillingFixture",
  {
    make: Effect.gen(function* () {
      const stripe = yield* StripeResources;

      // CLEANUP_Q [resource-entities] Applications can declare a billing offer and its portal
      // using related resource entities, apply the infrastructure, and publish its resulting values.
      // Updating the offer keeps the portal and published configuration consistent.
      const billingOffer = Effect.fn("StripeBillingFixture.billingOffer")(
        function* (name: string, logicalId: string, unitAmount: number) {
          const metadata = { nomoss_integration: name };

          const product = yield* stripe.Product({
            logicalId: `${logicalId}Product`,
            props: { name: `${name} ${logicalId}`, metadata },
          });

          const price = yield* stripe.Price({
            logicalId: `${logicalId}MonthlyPrice`,
            props: {
              product,
              currency: "usd",
              active: true,
              recurring: { interval: "month" },
              unit_amount: unitAmount,
              nickname: `${name} ${logicalId}`,
              metadata,
            },
          });

          const offer: StripeOfferDeclaration = {
            product,
            price,
          };

          return offer;
        },
      );

      const billingPortal = Effect.fn("StripeBillingFixture.billingPortal")(
        function* (
          name: string,
          offers: ReadonlyArray<StripeOfferDeclaration>,
        ) {
          const portal: StripeBillingPortalConfigurationResource =
            yield* stripe.BillingPortalConfiguration({
              logicalId: "BillingPortal",
              props: {
                name,
                business_profile: { headline: name },
                default_return_url: "https://example.test/billing",
                features: {
                  invoice_history: { enabled: true },
                  payment_method_update: { enabled: true },
                  subscription_update: {
                    enabled: true,
                    default_allowed_updates: ["price"],
                    proration_behavior: "none",
                    products: Arr.map(offers, (offer) => ({
                      product: offer.product,
                      prices: [offer.price],
                    })),
                  },
                },
                metadata: { nomoss_integration: name },
              },
            });

          return portal;
        },
      );

      const singleOffer = Effect.fn("StripeBillingFixture.singleOffer")(
        function* (name: string, unitAmount: number) {
          const starter = yield* billingOffer(name, "Starter", unitAmount);
          const portal = yield* billingPortal(name, [starter]);

          const application: StripeBillingScenario = {
            offers: { starter },
            portal,
            webhook: Option.none(),
            configuration: Option.none(),
          };

          return application;
        },
      );

      const twoOffers = Effect.fn("StripeBillingFixture.twoOffers")(function* (
        name: string,
        unitAmount: number,
      ) {
        const starter = yield* billingOffer(name, "Starter", unitAmount);
        const active = yield* billingOffer(name, "Active", 300);
        const portal = yield* billingPortal(name, [starter, active]);

        const application: StripeBillingScenario = {
          offers: { starter, active },
          portal,
          webhook: Option.none(),
          configuration: Option.none(),
        };

        return application;
      });

      const exportedCatalog = Effect.fn("StripeBillingFixture.exportedCatalog")(
        function* (name: string, unitAmount: number, outputPath: string) {
          const starter = yield* billingOffer(name, "Starter", unitAmount);
          const active = yield* billingOffer(name, "Active", 300);
          const advanced = yield* billingOffer(name, "Advanced", 500);
          const offers = { starter, active, advanced };
          const portal = yield* billingPortal(name, Record.values(offers));

          const webhook = yield* stripe.WebhookEndpoint({
            logicalId: "BillingEvents",
            props: {
              api_version: stripeApiVersion,
              url: `https://example.test/stripe/${name}`,
              enabled_events: ["checkout.session.completed"],
              description: name,
              metadata: { nomoss_integration: name },
            },
          });

          const configuration = yield* stripe.BillingConfigurationExport({
            logicalId: "BillingConfiguration",
            props: {
              apiVersion: stripeApiVersion,
              billingPortalConfigurationId: portal,
              mode: "test",
              outputPath,
              products: {
                starter: starter.product,
                active: active.product,
                advanced: advanced.product,
              },
              prices: {
                starterMonthly: starter.price,
                activeMonthly: active.price,
                advancedMonthly: advanced.price,
              },
              webhookEndpoint: { id: webhook },
            },
          });

          const application: StripeBillingScenario = {
            offers,
            portal,
            webhook: Option.some(webhook),
            configuration: Option.some(configuration),
          };

          return application;
        },
      );

      return {
        singleOffer,
        twoOffers,
        exportedCatalog,
      };
    }),
  },
) {}

export const stripeBillingFixtureLayer = Layer.effect(
  StripeBillingFixture,
  StripeBillingFixture.make,
);
