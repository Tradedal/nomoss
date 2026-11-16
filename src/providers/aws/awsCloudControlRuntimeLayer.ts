import { Layer, Option } from "effect";
import { SecureRandom } from "effect/crypto";
import { FetchHttpClient, HttpClient } from "effect/http";
import { resourceModelLayer } from "../../core/resource/model.js";
import { resourceStackRuntimeLayer } from "../../core/runtime/stackRuntimeLayer.js";
import { providerResourceCommandPolicyLayerLive } from "../resourceCommandPolicyLayer.js";
import { AwsCloudControlRequestTracker } from "./awsCloudControlRequestTracker.js";
import { awsCloudControlResourceCommandMetadataLayer } from "./awsCloudControlResourceCommandPolicyLayer.js";
import { AwsCloudControlResourceLifecycle } from "./awsCloudControlResourceLifecycle.js";
import { AwsClient } from "./client/awsClient.js";
import {
  AwsClientConfig,
  AwsRegion,
  awsClientConfigLayer,
} from "./client/awsClientConfig.js";
import { AwsCloudControlClient } from "./client/awsCloudControlClient.js";
import { AwsRequestSigner } from "./client/awsRequestSigner.js";
import { AwsResponseDecoder } from "./client/awsResponseDecoder.js";
import { AwsRetryPolicy } from "./client/awsRetryPolicy.js";

export const awsClientLayer = Layer.effect(AwsClient, AwsClient.make).pipe(
  Layer.provide(
    Layer.mergeAll(
      Layer.effect(AwsRequestSigner, AwsRequestSigner.make),
      Layer.effect(AwsResponseDecoder, AwsResponseDecoder.make),
      Layer.effect(AwsRetryPolicy, AwsRetryPolicy.make),
      SecureRandom.layerWebCrypto,
    ),
  ),
);

const awsClientConfigurationLayerLive = Layer.merge(
  awsClientConfigLayer,
  FetchHttpClient.layer,
);

export const awsClientLayerLive = awsClientLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);

export const awsCloudControlClientLayer = Layer.effect(
  AwsCloudControlClient,
  AwsCloudControlClient.make,
).pipe(Layer.provideMerge(awsClientLayer));

export const awsCloudControlClientLayerLive = awsCloudControlClientLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);

/**
 * awsCloudControlResourceLifecycleLayer shares AWS invocation, generated
 * operations, and request tracking for resource execution. Applications and
 * tests can supply configuration and HTTP transport to the same assembly.
 */
export const awsCloudControlResourceLifecycleLayer = Layer.effect(
  AwsCloudControlResourceLifecycle,
  AwsCloudControlResourceLifecycle.make,
).pipe(
  Layer.provideMerge(
    Layer.effect(
      AwsCloudControlRequestTracker,
      AwsCloudControlRequestTracker.make,
    ),
  ),
  Layer.provideMerge(awsCloudControlClientLayer),
  Layer.provideMerge(resourceModelLayer),
);

export const awsCloudControlResourceLifecycleLayerLive =
  awsCloudControlResourceLifecycleLayer.pipe(
    Layer.provide(awsClientConfigurationLayerLive),
  );

/**
 * awsCloudControlResourceCommandLayer registers production Cloud Control
 * lifecycle operations for resource dispatch. Configuration and transport
 * remain dependencies for live applications and controlled HTTP tests.
 */
export const awsCloudControlResourceCommandLayer =
  awsCloudControlResourceCommandMetadataLayer.pipe(
    Layer.provideMerge(awsCloudControlResourceLifecycleLayer),
  );

export const awsCloudControlResourceCommandLayerLive =
  awsCloudControlResourceCommandLayer.pipe(
    Layer.provide(awsClientConfigurationLayerLive),
  );

/**
 * awsCloudControlCommandPolicyLayer executes core resource commands through
 * the registered Cloud Control provider. Registrations remain available in the
 * output runtime because dispatch resolves them during command execution.
 */
export const awsCloudControlCommandPolicyLayer =
  providerResourceCommandPolicyLayerLive.pipe(
    Layer.provideMerge(awsCloudControlResourceCommandLayer),
  );

/**
 * awsCloudControlStackLayer combines AWS command execution with the production
 * stack runtime. Applications supply AWS configuration, HTTP transport, state
 * storage, and the secret policy. The Layer assembles the internal services.
 */
export const awsCloudControlStackLayer = resourceStackRuntimeLayer.pipe(
  Layer.provideMerge(awsCloudControlCommandPolicyLayer),
);

export const awsCloudControlStackLayerLive = awsCloudControlStackLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);

/**
 * The providers function applies configuration and HTTP transport to every
 * Cloud Control command in the application graph. Omitted services use
 * environment configuration and fetch. The region option overrides environment
 * configuration; a supplied clientConfig retains its own region. Compose the
 * returned Layer with the application's core services and storage.
 */
export const providers = (
  options: {
    readonly region?: string;
    readonly clientConfig?: AwsClientConfig["Service"];
    readonly httpClient?: HttpClient.HttpClient;
  } = {},
) => {
  const configuration = Option.match(
    Option.fromUndefinedOr(options.clientConfig),
    {
      onNone: () => awsClientConfigLayer,
      onSome: (config) => Layer.succeed(AwsClientConfig, config),
    },
  ).pipe(
    Layer.provide(
      Layer.succeed(AwsRegion, Option.fromUndefinedOr(options.region)),
    ),
  );

  const transport = Option.match(Option.fromUndefinedOr(options.httpClient), {
    onNone: () => FetchHttpClient.layer,
    onSome: (http) => Layer.succeed(HttpClient.HttpClient, http),
  });

  const provider = awsCloudControlCommandPolicyLayer.pipe(
    Layer.provideMerge([configuration, transport]),
  );

  return provider;
};
