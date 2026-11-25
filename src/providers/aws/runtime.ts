import { Layer } from "effect";
import { Digest } from "effect/crypto";
import { resourceStackRuntimeLayer } from "../../core/runtime/stackRuntimeLayer.js";
import { providerResourceCommandPolicyLayerLive } from "../resourceCommandPolicyLayer.js";
import {
  awsClientConfigurationLayerLive,
  awsClientLayer,
} from "./client/awsClient.js";
import { httpApiCommands } from "./resources/apiGatewayV2/httpApi.js";
import { awsNativeResourceCommandLayer } from "./resources/generated/native/resourceCommands.js";
import { grantCommands } from "./resources/iam/grantCommands.js";
import { roleCommands } from "./resources/iam/role.js";
import { functionCommands } from "./resources/lambda/function.js";
import { permissionCommands } from "./resources/lambda/permission.js";
import { stateMachineCommands } from "./resources/stepFunctions/stateMachine.js";

export {
  AwsClientConfig,
  AwsRegion,
  awsClientConfigLayer,
} from "./client/awsClientConfig.js";

/**
 * The awsServiceResourceCommandLayer Layer makes native AWS registrations
 * available to the stack runtime. Every registration uses the same AWS
 * client and the resource schemas registered by the application.
 *
 * @see ../../../../command-options-fund/refs/effect-website/apps/web/src/content/docs/v4/requirements-management/layers.mdx#merging-layers
 */
export const awsServiceResourceCommandLayer = Layer.mergeAll(
  awsNativeResourceCommandLayer,
  stateMachineCommands,
  httpApiCommands,
  roleCommands,
  grantCommands,
  functionCommands,
  permissionCommands,
).pipe(
  Layer.provideMerge(awsClientLayer),
  Layer.provide(Digest.layerWebCrypto),
);

/**
 * The AwsProviderLive Layer registers native AWS resource commands for stack
 * execution. Applications use Layer.provide to supply AWS client configuration
 * and HTTP transport when they assemble the stack runtime.
 *
 * @see ../../../../command-options-fund/refs/effect-website/apps/web/src/content/docs/v4/requirements-management/layers.mdx#composing-layers
 */
export const AwsProviderLive = providerResourceCommandPolicyLayerLive.pipe(
  Layer.provideMerge(awsServiceResourceCommandLayer),
);

/**
 * The awsNativeStackLayer Layer connects native command execution to core's
 * stack runtime. Applications supply state storage, the secret policy, AWS
 * configuration, and HTTP transport in the same graph as their declarations.
 */
export const awsNativeStackLayer = resourceStackRuntimeLayer.pipe(
  Layer.provideMerge(AwsProviderLive),
);

/**
 * The awsNativeStackLayerLive Layer lets a stack execute native AWS commands
 * with environment credentials and fetch transport. The application supplies
 * state storage and its secret policy through the same runtime.
 */
export const awsNativeStackLayerLive = awsNativeStackLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);
