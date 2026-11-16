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

export interface StripeExampleApplication {
  readonly offers: Readonly<Record<string, StripeOfferDeclaration>>;
  readonly portal: StripeBillingPortalConfigurationResource;
  readonly webhook: Option.Option<StripeWebhookEndpointResource>;
  readonly configuration: Option.Option<
    StripeBillingConfigurationExportResource<StripeBillingConfigurationExportPropsEntity>
  >;
}

/**
 * The apps configure portal subscription changes from their declared products
 * and prices. The export app also writes their ids and the portal and webhook
 * ids to the application configuration file.
 */
export class StripeExampleApps extends Context.Service<StripeExampleApps>()(
  "nomoss/examples/stripe/apps/StripeExampleApps",
  {
    make: Effect.gen(function* () {
      const stripe = yield* StripeResources;

      // CLEANUP_Q [resource-entities] Applications can declare a billing offer and its portal
      // using related resource entities, apply the infrastructure, and publish its resulting values.
      // Updating the offer keeps the portal and published configuration consistent.
      const declareOffer = Effect.fn("StripeExampleApps.declareOffer")(
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

      const declarePortal = Effect.fn("StripeExampleApps.declarePortal")(
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

      const declareSingleOffer = Effect.fn(
        "StripeExampleApps.declareSingleOffer",
      )(function* (name: string, unitAmount: number) {
        const starter = yield* declareOffer(name, "Starter", unitAmount);
        const portal = yield* declarePortal(name, [starter]);

        const application: StripeExampleApplication = {
          offers: { starter },
          portal,
          webhook: Option.none(),
          configuration: Option.none(),
        };

        return application;
      });

      const declareTwoOffers = Effect.fn("StripeExampleApps.declareTwoOffers")(
        function* (name: string, unitAmount: number) {
          const starter = yield* declareOffer(name, "Starter", unitAmount);
          const active = yield* declareOffer(name, "Active", 300);
          const portal = yield* declarePortal(name, [starter, active]);

          const application: StripeExampleApplication = {
            offers: { starter, active },
            portal,
            webhook: Option.none(),
            configuration: Option.none(),
          };

          return application;
        },
      );

      const declareExportedCatalog = Effect.fn(
        "StripeExampleApps.declareExportedCatalog",
      )(function* (name: string, unitAmount: number, outputPath: string) {
        const starter = yield* declareOffer(name, "Starter", unitAmount);
        const active = yield* declareOffer(name, "Active", 300);
        const advanced = yield* declareOffer(name, "Advanced", 500);
        const offers = { starter, active, advanced };
        const portal = yield* declarePortal(name, Record.values(offers));

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

        const application: StripeExampleApplication = {
          offers,
          portal,
          webhook: Option.some(webhook),
          configuration: Option.some(configuration),
        };

        return application;
      });

      return {
        declareOffer,
        declarePortal,
        declareSingleOffer,
        declareTwoOffers,
        declareExportedCatalog,
      };
    }),
  },
) {}

export const stripeExampleAppsLayer = Layer.effect(
  StripeExampleApps,
  StripeExampleApps.make,
);
