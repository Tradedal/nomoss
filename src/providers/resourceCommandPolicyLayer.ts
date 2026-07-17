import { Context, Effect, Layer, Match, Option } from "effect";

import {
  type ResourceCommand,
  ResourceCommandUnsupported,
} from "../core/lifecycle.js";
import type { ResourceSchemaAnnotation } from "../core/model.js";
import { resourceSchemaString } from "../core/model.js";
import {
  ResourceCommandExecutionFailed,
  type ResourceCommandFailure,
  ResourceCommandPolicy,
} from "../core/resourceCommandPolicy.js";
import { QueueResourcePolicy } from "./aws/awsQueueResourcePolicy.js";
import { StripeBillingConfigurationExportResourcePolicy } from "./stripe/stripeBillingConfigurationExportResourcePolicy.js";
import { StripeBillingPortalConfigurationResourcePolicy } from "./stripe/stripeBillingPortalConfigurationResourcePolicy.js";
import { StripeCustomerResourcePolicy } from "./stripe/stripeCustomerResourcePolicy.js";
import { StripePriceResourcePolicy } from "./stripe/stripePriceResourcePolicy.js";
import { StripeProductResourcePolicy } from "./stripe/stripeProductResourcePolicy.js";
import { StripeWebhookEndpointResourcePolicy } from "./stripe/stripeWebhookEndpointResourcePolicy.js";

/**
 * Persisted resource commands carry schema metadata, not live provider service
 * references. This private command target is the runtime service resolved from
 * that metadata before stack lifecycle asks a provider to apply or delete a
 * resource node.
 */
type ProviderResourceCommandPolicy = {
  readonly execute: (
    command: ResourceCommand,
  ) => ReturnType<(typeof ResourceCommandPolicy)["Service"]["execute"]>;
};

/**
 * The schema annotation string is the stable Effect service key shared by the
 * persisted resource graph and the provider layer graph. It lets command
 * execution find the provider operation for a node without importing provider
 * modules into core lifecycle code.
 *
 * Effect principle used here:
 * - `Context.Service` defines a service tag. The tag is the lookup key.
 * - `Layer.succeed(tag, service)` provides an implementation for that tag.
 * - `Effect.serviceOption(tag)` asks the current runtime context whether an
 *   implementation for that tag was provided.
 *
 * This file derives the tag from resource schema metadata. Provider metadata
 * layers provide `{ execute }` at that tag. Command execution resolves the tag
 * from the running Effect context and calls the provided `execute` function.
 *
 * Example for Stripe prices:
 *
 * Schema source:
 * `StripePricePropsSchema = annotateResourceSchema(PostPricesInput, {
 *   provider: "stripe",
 *   service: "billing",
 *   resource: "price",
 *   operation: "create",
 *   stateSecretOutputKeys: [],
 * })`
 *
 * Persisted node metadata:
 * `node.schema = {
 *   provider: "stripe",
 *   service: "billing",
 *   resource: "price",
 *   operation: "create",
 *   stateSecretOutputKeys: [],
 * }`
 *
 * Service key:
 * `resourceSchemaString(node.schema)` => `stripe:billing:price:create`
 * `providerCommandPolicyTag(node.schema)` =>
 * `nomoss/providers/resourceCommandPolicyLayer/stripe:billing:price:create`
 *
 * Execution path:
 * `stripePriceResourceCommandMetadataLayer`
 *   => `bindProviderCommandPolicy(StripePriceResourcePolicy)`
 *   => `Layer.succeed(providerCommandPolicyTag(schema), { execute })`
 *
 * When stack lifecycle submits an apply/delete command,
 * `providerResourceCommandPolicyLayerLive` reads `command.node.schema`, builds
 * the same tag, resolves it with `Effect.serviceOption`, and calls the resolved
 * service's `execute(command)`. For the key above, that `execute` delegates to
 * `StripePriceResourcePolicy.execute`.
 */
const providerCommandPolicyTag = (schema: ResourceSchemaAnnotation) =>
  Context.Service<ProviderResourceCommandPolicy, ProviderResourceCommandPolicy>(
    `nomoss/providers/resourceCommandPolicyLayer/${resourceSchemaString(schema)}`,
  );

const providerCommandError = (
  command: ResourceCommand,
  cause: ResourceCommandFailure,
) =>
  new ResourceCommandExecutionFailed({
    command,
    cause,
  });

/**
 * Provider policy metadata preserves the provider's own service method and
 * changes only its error at the runtime registration point. Stack lifecycle
 * receives one command contract while provider policies retain their local
 * implementation and failure types.
 */
/**
 * Provider modules contribute schema-keyed command metadata beside their normal
 * resource policy services. Maintaining this list explicitly keeps provider
 * assembly visible while command selection stays data-driven through the
 * resource node schema.
 *
 * A queue command and a Stripe price command both enter stack lifecycle as the
 * same `ResourceCommand` shape. The schema on the command node selects the
 * matching metadata-provided service; no command-name switch is needed.
 */
export const awsQueueResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(QueueResourcePolicy, ({ schema, execute }) =>
    Layer.succeed(providerCommandPolicyTag(schema), {
      execute: (command) =>
        execute(command).pipe(
          Effect.mapError((cause) => providerCommandError(command, cause)),
        ),
    }),
  ),
);

export const stripeCustomerResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeCustomerResourcePolicy, ({ schema, execute }) =>
    Layer.succeed(providerCommandPolicyTag(schema), {
      execute: (command) =>
        execute(command).pipe(
          Effect.mapError((cause) => providerCommandError(command, cause)),
        ),
    }),
  ),
);

export const stripeProductResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeProductResourcePolicy, ({ schema, execute }) =>
    Layer.succeed(providerCommandPolicyTag(schema), {
      execute: (command) =>
        execute(command).pipe(
          Effect.mapError((cause) => providerCommandError(command, cause)),
        ),
    }),
  ),
);

export const stripePriceResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripePriceResourcePolicy, ({ schema, execute }) =>
    Layer.succeed(providerCommandPolicyTag(schema), {
      execute: (command) =>
        execute(command).pipe(
          Effect.mapError((cause) => providerCommandError(command, cause)),
        ),
    }),
  ),
);

export const stripeWebhookEndpointResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeWebhookEndpointResourcePolicy, ({ schema, execute }) =>
    Layer.succeed(providerCommandPolicyTag(schema), {
      execute: (command) =>
        execute(command).pipe(
          Effect.mapError((cause) => providerCommandError(command, cause)),
        ),
    }),
  ),
);

export const stripeBillingPortalConfigurationResourceCommandMetadataLayer =
  Layer.unwrap(
    Effect.map(
      StripeBillingPortalConfigurationResourcePolicy,
      ({ schema, execute }) =>
        Layer.succeed(providerCommandPolicyTag(schema), {
          execute: (command) =>
            execute(command).pipe(
              Effect.mapError((cause) => providerCommandError(command, cause)),
            ),
        }),
    ),
  );

export const stripeBillingConfigurationExportResourceCommandMetadataLayer =
  Layer.unwrap(
    Effect.map(
      StripeBillingConfigurationExportResourcePolicy,
      ({ schema, execute }) =>
        Layer.succeed(providerCommandPolicyTag(schema), {
          execute: (command) =>
            execute(command).pipe(
              Effect.mapError((cause) => providerCommandError(command, cause)),
            ),
        }),
    ),
  );

/**
 * Stack lifecycle depends on the core `ResourceCommandPolicy` service, while
 * each command names a persisted resource node. This layer resolves that node's
 * schema metadata to the active provider command service and runs the provider
 * operation through the shared Effect layer graph.
 *
 * Apply commands read the target node from the planner decision. Delete commands
 * already carry the target node. Both forms use the node schema for provider
 * selection, then delegate unchanged command data to the provider policy.
 */
export const providerResourceCommandPolicyLayerLive = Layer.effect(
  ResourceCommandPolicy,
  Effect.gen(function* () {
    return {
      execute: Effect.fn("ProviderResourceCommandPolicy.execute")(
        function* (command) {
          const commandNode = Match.value(command).pipe(
            Match.when({ _tag: "Apply" }, ({ decision }) => decision.node),
            Match.orElse(({ node }) => node),
          );

          const policyOption = yield* Effect.serviceOption(
            providerCommandPolicyTag(commandNode.schema),
          );

          const policy = yield* Option.match(policyOption, {
            onNone: () =>
              Effect.fail(
                new ResourceCommandExecutionFailed({
                  command,
                  cause: new ResourceCommandUnsupported({ command }),
                }),
              ),
            onSome: Effect.succeed,
          });

          return yield* policy.execute(command);
        },
      ),
    };
  }),
);
