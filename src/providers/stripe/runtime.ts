import { Layer, Option } from "effect";
import { FetchHttpClient, HttpClient } from "effect/http";
import { resourceStackRuntimeLayer } from "../../core/runtime/stackRuntimeLayer.js";
import { providerResourceCommandPolicyLayerLive } from "../resourceCommandPolicyLayer.js";
import { stripeGeneratedResourceCommandLayer } from "./client/generated/resourceCommands.js";
import { stripeClientLayer } from "./client/stripeClient.js";
import {
  StripeClientConfig,
  stripeClientConfigLayer,
} from "./client/stripeClientConfig.js";
import {
  StripeResources,
  stripeResourcesLayer,
} from "./management/resources.js";

/**
 * The stripeResourceCommandLayer Layer makes generated provider and file
 * commands available under the identities retained in saved resources.
 * Compose it with declarations in the shared application graph so execution
 * uses their registered output schemas. Callers supply Stripe configuration,
 * HTTP transport, and the filesystem used for application documents.
 */
export const stripeResourceCommandLayer =
  stripeGeneratedResourceCommandLayer.pipe(
    Layer.provideMerge(stripeClientLayer),
  );

export const stripeResourceCommandLayerLive = stripeResourceCommandLayer.pipe(
  Layer.provide([stripeClientConfigLayer, FetchHttpClient.layer]),
);

const stripeCommandsLayer = providerResourceCommandPolicyLayerLive.pipe(
  Layer.provideMerge(stripeResourceCommandLayer),
);

/**
 * stripeStackLayer combines billing declarations and registered provider
 * commands with the production stack runtime. Registration tags remain in the
 * stack runtime because dispatch resolves them when each command executes.
 * Persistence, secret storage, and provider I/O are supplied by the application.
 */
export const stripeStackLayer = stripeResourcesLayer.pipe(
  Layer.provideMerge(resourceStackRuntimeLayer),
  Layer.provideMerge(stripeCommandsLayer),
);

/**
 * The providers function shares configuration and HTTP transport between
 * declarations and commands. Omitted services use environment configuration
 * and fetch. Compose the returned Layer with the application's shared resource
 * graph, core services, and storage.
 */
export const providers = (
  options: {
    readonly clientConfig?: StripeClientConfig["Service"];
    readonly httpClient?: HttpClient.HttpClient;
  } = {},
) => {
  const configuration = Option.match(
    Option.fromUndefinedOr(options.clientConfig),
    {
      onNone: () => stripeClientConfigLayer,
      onSome: (config) => Layer.succeed(StripeClientConfig, config),
    },
  );
  const transport = Option.match(Option.fromUndefinedOr(options.httpClient), {
    onNone: () => FetchHttpClient.layer,
    onSome: (http) => Layer.succeed(HttpClient.HttpClient, http),
  });
  const provider = Layer.merge(
    Layer.effect(StripeResources, StripeResources.make),
    stripeCommandsLayer,
  ).pipe(Layer.provideMerge([configuration, transport]));

  return provider;
};
