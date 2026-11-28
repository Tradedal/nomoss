import { awsClientLayer } from "@nomoss/aws";
import { awsClientConfigLayerFromProvider } from "@nomoss/aws/config";
import { Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { awsDefaultCredentialsLayer } from "./awsDefaultCredentials.js";

export {
  AwsStsCredentials,
  awsAssumeRoleCredentialsLayer,
} from "./awsAssumeRole.js";
export { awsDefaultCredentialsLayer } from "./awsDefaultCredentials.js";

/**
 * The awsClientConfigLayer Layer lets an application choose its HTTP transport
 * while using the same AWS profile for region selection and credential discovery.
 * The application can construct its clients before signing in. Credential
 * discovery runs when a request needs a signature.
 *
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (provide)
 */
export const awsClientConfigLayer = awsClientConfigLayerFromProvider.pipe(
  Layer.provide(awsDefaultCredentialsLayer),
);

/**
 * The awsClientConfigurationLayerLive Layer lets stacks and generated clients
 * in one application use the same credential session and Fetch transport.
 *
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (provideMerge)
 */
export const awsClientConfigurationLayerLive = awsClientConfigLayer.pipe(
  Layer.provideMerge(FetchHttpClient.layer),
);

/**
 * The awsClientLayerLive Layer lets an application call a generated client
 * outside a stack using its environment or shared AWS profile.
 *
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (provide)
 */
export const awsClientLayerLive = awsClientLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);
