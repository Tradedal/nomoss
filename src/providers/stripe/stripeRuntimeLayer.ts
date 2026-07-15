import { CredentialsFromEnv } from "@distilled.cloud/stripe";
import { Layer } from "effect";

import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

import {
  resourceGraphBuilderLayer,
  resourceGraphStoreLayer,
  resourceModelLayer,
} from "../../core/runtimeLayer.js";
import { StripeBillingConfigurationExportLifecycle } from "./stripeBillingConfigurationExport.js";
import { StripeBillingConfigurationExportResourcePolicy } from "./stripeBillingConfigurationExportResourcePolicy.js";
import { StripeBillingPortalConfigurationLifecycle } from "./stripeBillingPortalConfiguration.js";
import { StripeBillingPortalConfigurationResourcePolicy } from "./stripeBillingPortalConfigurationResourcePolicy.js";
import { StripeCustomerLifecycle } from "./stripeCustomer.js";
import { StripeCustomerResourcePolicy } from "./stripeCustomerResourcePolicy.js";
import { StripePriceLifecycle } from "./stripePrice.js";
import { StripePriceResourcePolicy } from "./stripePriceResourcePolicy.js";
import { StripeProductLifecycle } from "./stripeProduct.js";
import { StripeProductResourcePolicy } from "./stripeProductResourcePolicy.js";
import { StripeResources } from "./stripeResources.js";
import { StripeWebhookEndpointLifecycle } from "./stripeWebhookEndpoint.js";
import { StripeWebhookEndpointResourcePolicy } from "./stripeWebhookEndpointResourcePolicy.js";

const stripeOperationDependenciesLayer = CredentialsFromEnv.pipe(
  Layer.provide(FetchHttpClient.layer),
);

/**
 * Every Stripe provider layer uses the same generated operation credentials and
 * HTTP client. Products, Prices, Portal configuration, webhooks, and exports
 * therefore run through the Nomoss provider graph rather than ad hoc setup
 * scripts.
 */
export const stripeCustomerLifecycleLayerLive = Layer.effect(
  StripeCustomerLifecycle,
  StripeCustomerLifecycle.make,
).pipe(Layer.provideMerge(stripeOperationDependenciesLayer));

export const stripeProductLifecycleLayerLive = Layer.effect(
  StripeProductLifecycle,
  StripeProductLifecycle.make,
).pipe(Layer.provideMerge(stripeOperationDependenciesLayer));

export const stripePriceLifecycleLayerLive = Layer.effect(
  StripePriceLifecycle,
  StripePriceLifecycle.make,
).pipe(Layer.provideMerge(stripeOperationDependenciesLayer));

export const stripeWebhookEndpointLifecycleLayerLive = Layer.effect(
  StripeWebhookEndpointLifecycle,
  StripeWebhookEndpointLifecycle.make,
).pipe(Layer.provideMerge(stripeOperationDependenciesLayer));

export const stripeBillingPortalConfigurationLifecycleLayerLive = Layer.effect(
  StripeBillingPortalConfigurationLifecycle,
  StripeBillingPortalConfigurationLifecycle.make,
).pipe(Layer.provideMerge(stripeOperationDependenciesLayer));

export const stripeBillingConfigurationExportLifecycleLayerLive = Layer.effect(
  StripeBillingConfigurationExportLifecycle,
  StripeBillingConfigurationExportLifecycle.make,
);

export const stripeResourcesLayerLive = Layer.effect(
  StripeResources,
  StripeResources.make,
).pipe(Layer.provideMerge(resourceGraphBuilderLayer));

export const stripeCustomerResourcePolicyLayerLive = Layer.effect(
  StripeCustomerResourcePolicy,
  StripeCustomerResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeCustomerLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
);

export const stripeProductResourcePolicyLayerLive = Layer.effect(
  StripeProductResourcePolicy,
  StripeProductResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeProductLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
);

export const stripePriceResourcePolicyLayerLive = Layer.effect(
  StripePriceResourcePolicy,
  StripePriceResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripePriceLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
);

export const stripeWebhookEndpointResourcePolicyLayerLive = Layer.effect(
  StripeWebhookEndpointResourcePolicy,
  StripeWebhookEndpointResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeWebhookEndpointLifecycleLayerLive),
  Layer.provideMerge(resourceModelLayer),
);

export const stripeBillingPortalConfigurationResourcePolicyLayerLive =
  Layer.effect(
    StripeBillingPortalConfigurationResourcePolicy,
    StripeBillingPortalConfigurationResourcePolicy.make,
  ).pipe(
    Layer.provideMerge(stripeBillingPortalConfigurationLifecycleLayerLive),
    Layer.provideMerge(resourceModelLayer),
  );

export const stripeBillingConfigurationExportResourcePolicyLayerLive =
  Layer.effect(
    StripeBillingConfigurationExportResourcePolicy,
    StripeBillingConfigurationExportResourcePolicy.make,
  ).pipe(
    Layer.provideMerge(stripeBillingConfigurationExportLifecycleLayerLive),
    Layer.provideMerge(resourceModelLayer),
  );

const stripeResourceGraphLayerLiveResources = stripeResourcesLayerLive.pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
);

/**
 * Standalone Nomoss programs use this graph layer when they need only Stripe
 * resources and the shared graph store.
 */
export const stripeResourceGraphLayerLive = Layer.mergeAll(
  resourceGraphStoreLayer,
  stripeResourceGraphLayerLiveResources,
);
