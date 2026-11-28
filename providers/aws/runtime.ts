import { awsClientLayer } from "@nomoss/aws";
import { awsClientConfigurationLayerLive } from "@nomoss/aws/credentials";
import { Layer } from "effect";
import { Digest } from "effect/crypto";
import { resourceModelLayer } from "../../src/core/resource/model.js";
import { resourceStabilizationLayer } from "../../src/core/resource/resourceStabilization.js";
import { resourceStackRuntimeLayer } from "../../src/core/runtime/stackRuntimeLayer.js";
import { providerResourceCommandPolicyLayerLive } from "../../src/providers/resourceCommandPolicyLayer.js";
import { AwsEnvironment } from "./awsEnvironment.js";
import { awsResourceManagementRegistryLayer } from "./management/resourceManagementRegistry.js";
import { awsResourceMappingLayer } from "./management/resourceMapping.js";

export { AwsClientConfig, AwsRegion } from "@nomoss/aws/config";
export { awsClientConfigLayer } from "@nomoss/aws/credentials";
export {
  AwsEnvironment,
  type AwsResolvedEnvironment,
} from "./awsEnvironment.js";

export const awsServiceResourceCommandLayer =
  awsResourceManagementRegistryLayer.pipe(
    Layer.provide([
      resourceModelLayer,
      resourceStabilizationLayer,
      awsResourceMappingLayer.pipe(Layer.provide(Digest.layerWebCrypto)),
    ]),
    Layer.provideMerge(awsClientLayer),
  );

export const AwsProviderLive = providerResourceCommandPolicyLayerLive.pipe(
  Layer.provideMerge(awsServiceResourceCommandLayer),
);

/**
 * The awsNativeStackLayer Layer connects native command execution to core's
 * stack runtime. Applications supply state storage, the secret policy, AWS
 * configuration, and HTTP transport in the same graph as their declarations.
 */
export const awsNativeStackLayer = AwsEnvironment.layer.pipe(
  Layer.provideMerge(
    resourceStackRuntimeLayer.pipe(Layer.provideMerge(AwsProviderLive)),
  ),
);

/**
 * The awsNativeStackLayerLive Layer lets a stack execute native AWS commands
 * with environment credentials and fetch transport. The application supplies
 * state storage and its secret policy through the same runtime.
 */
export const awsNativeStackLayerLive = awsNativeStackLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);
