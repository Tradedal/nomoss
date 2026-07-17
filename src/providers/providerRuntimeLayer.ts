import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Layer } from "effect";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";

import {
  physicalNameStoreLayer,
  resourceGraphStoreLayer,
  resourceModelLayer,
  resourceOutputResolverLayer,
  resourcePlannerLayer,
  resourcePolicyLayer,
  resourceStackLifecycleLayer,
  resourceStateStoreBaseLayer,
  stackWorkflowRendererLayer,
} from "../core/runtimeLayer.js";
import { ConfiguredStateSecretServiceLayer } from "../core/stateSecretService.js";
import {
  awsQueueResourcePolicyLayerLive,
  awsResourcesLayerLive,
} from "./aws/awsProviderLayer.js";
import {
  awsQueueResourceCommandMetadataLayer,
  providerResourceCommandPolicyLayerLive,
  stripeBillingConfigurationExportResourceCommandMetadataLayer,
  stripeBillingPortalConfigurationResourceCommandMetadataLayer,
  stripeCustomerResourceCommandMetadataLayer,
  stripePriceResourceCommandMetadataLayer,
  stripeProductResourceCommandMetadataLayer,
  stripeWebhookEndpointResourceCommandMetadataLayer,
} from "./resourceCommandPolicyLayer.js";
import {
  stripeBillingConfigurationExportResourcePolicyLayerLive,
  stripeBillingPortalConfigurationResourcePolicyLayerLive,
  stripeCustomerResourcePolicyLayerLive,
  stripePriceResourcePolicyLayerLive,
  stripeProductResourcePolicyLayerLive,
  stripeResourcesLayerLive,
  stripeWebhookEndpointResourcePolicyLayerLive,
} from "./stripe/stripeRuntimeLayer.js";

const configuredStateSecretServiceWithNodeServicesLayer =
  ConfiguredStateSecretServiceLayer.pipe(Layer.provide(NodeServices.layer));
const resourceStateStoreWithNodeFileSystemLayer =
  resourceStateStoreBaseLayer.pipe(
    Layer.provideMerge(NodeFileSystem.layer),
    Layer.provideMerge(configuredStateSecretServiceWithNodeServicesLayer),
  );
const physicalNameStoreWithNodeFileSystemLayer = physicalNameStoreLayer.pipe(
  Layer.provide(NodeFileSystem.layer),
);
const providerResourcesLayer = Layer.mergeAll(
  awsResourcesLayerLive,
  stripeResourcesLayerLive,
).pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
  Layer.provideMerge(physicalNameStoreWithNodeFileSystemLayer),
);
const providerResourcePolicyLayer = Layer.mergeAll(
  awsQueueResourcePolicyLayerLive(),
  stripeCustomerResourcePolicyLayerLive,
  stripeProductResourcePolicyLayerLive,
  stripePriceResourcePolicyLayerLive,
  stripeWebhookEndpointResourcePolicyLayerLive,
  stripeBillingPortalConfigurationResourcePolicyLayerLive,
  stripeBillingConfigurationExportResourcePolicyLayerLive.pipe(
    Layer.provide(NodeFileSystem.layer),
  ),
);
/**
 * Nomoss assembles provider command metadata from the same provider policy
 * services that implement resource operations. This maintained list wires the
 * modules together, while runtime command selection still comes from each
 * persisted resource node's schema metadata.
 */
const providerCommandMetadataLayer = Layer.mergeAll(
  awsQueueResourceCommandMetadataLayer,
  stripeCustomerResourceCommandMetadataLayer,
  stripeProductResourceCommandMetadataLayer,
  stripePriceResourceCommandMetadataLayer,
  stripeWebhookEndpointResourceCommandMetadataLayer,
  stripeBillingPortalConfigurationResourceCommandMetadataLayer,
  stripeBillingConfigurationExportResourceCommandMetadataLayer,
).pipe(Layer.provideMerge(providerResourcePolicyLayer));
const providerCommandPolicyLayer = providerResourceCommandPolicyLayerLive.pipe(
  Layer.provideMerge(providerCommandMetadataLayer),
);
const resourceStackLifecycleWithProviderCommandsLayer =
  resourceStackLifecycleLayer.pipe(
    Layer.provideMerge(
      Layer.mergeAll(
        resourceGraphStoreLayer,
        resourceStateStoreWithNodeFileSystemLayer,
        resourcePlannerLayer,
        providerCommandPolicyLayer,
      ),
    ),
    Layer.provideMerge(resourceOutputResolverLayer),
  );

/**
 * Mixed-provider stack operations use this layer to run resource declaration,
 * provider command policies, state persistence, and rendering in one Nomoss
 * runtime. This layer shares graph, state, and physical-name services because
 * rebuilding them in consumers would split declaration from lifecycle
 * execution.
 */
export const providerRuntimeLayerLive = Layer.mergeAll(
  FetchHttpClient.layer,
  resourceGraphStoreLayer,
  resourceModelLayer,
  resourceOutputResolverLayer,
  resourcePlannerLayer,
  resourcePolicyLayer,
  resourceStateStoreWithNodeFileSystemLayer,
  physicalNameStoreWithNodeFileSystemLayer,
  providerResourcesLayer,
  providerCommandPolicyLayer,
  resourceStackLifecycleWithProviderCommandsLayer,
  stackWorkflowRendererLayer,
);
