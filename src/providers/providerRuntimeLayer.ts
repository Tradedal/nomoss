import { NodeServices } from "@effect/platform-node";
import { Layer } from "effect";
import { resourceStackRuntimeLayer } from "../core/runtime/stackRuntimeLayer.js";
import { ConfiguredStateSecretServiceLayer } from "../core/state/stateSecretService.js";
import { resourceStateFileStorageLayer } from "../core/state/stateStore.js";
import { awsCloudControlResourceCommandLayerLive } from "./aws/awsCloudControlRuntimeLayer.js";
import { providerResourceCommandPolicyLayerLive } from "./resourceCommandPolicyLayer.js";
import { stripeResourcesLayer } from "./stripe/management/resources.js";
import { stripeResourceCommandLayerLive } from "./stripe/runtime.js";

const providerCommandsLayer = providerResourceCommandPolicyLayerLive.pipe(
  Layer.provideMerge([
    stripeResourceCommandLayerLive,
    awsCloudControlResourceCommandLayerLive,
  ]),
);

const providerStackServicesLayer = resourceStackRuntimeLayer.pipe(
  Layer.provideMerge(providerCommandsLayer),
  Layer.provideMerge(ConfiguredStateSecretServiceLayer),
  Layer.provide(resourceStateFileStorageLayer),
  Layer.provideMerge(NodeServices.layer),
);

/**
 * providerRuntimeLayerLive connects the production AWS and Stripe registrations
 * to one stack runtime. Provider composition belongs to its domain module;
 * application configuration selects live I/O and persistence here.
 */
export const providerRuntimeLayerLive = stripeResourcesLayer.pipe(
  Layer.provideMerge(providerStackServicesLayer),
);
