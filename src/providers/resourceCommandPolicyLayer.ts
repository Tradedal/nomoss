import { Context, Effect, Layer, Match, Option } from "effect";

import {
  type ResourceCommand,
  type ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../core/lifecycle.js";
import type { ResourceSchemaAnnotation } from "../core/model.js";
import { resourceSchemaString } from "../core/model.js";
import {
  ResourceCommandExecutionFailed,
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
  ) => Effect.Effect<
    ResourceCommandResult,
    ResourceCommandUnsupported | ResourceCommandExecutionFailed
  >;
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

const providerCommandError = (command: ResourceCommand, cause: unknown) =>
  Match.value(cause).pipe(
    Match.when(
      (error: unknown) => error instanceof ResourceCommandUnsupported,
      (error) => error,
    ),
    Match.orElse(
      () =>
        new ResourceCommandExecutionFailed({
          command,
          cause,
        }),
    ),
  );

/**
 * Provider policies keep provider-specific failure types inside their own
 * services. The metadata binding exposes the stack lifecycle command contract:
 * a command result, an explicit missing-operation failure, or an execution
 * failure carrying the provider cause.
 *
 * The binding is what makes provider additions local: adding a provider command
 * path means providing a resource policy service with a schema and `execute`,
 * then adding its metadata layer to the provider runtime assembly.
 */
const bindProviderCommandPolicy = <CommandError>(policy: {
  readonly schema: ResourceSchemaAnnotation;
  readonly execute: (
    command: ResourceCommand,
  ) => Effect.Effect<ResourceCommandResult, CommandError>;
}) =>
  Layer.succeed(providerCommandPolicyTag(policy.schema), {
    execute: (command) =>
      policy
        .execute(command)
        .pipe(Effect.mapError((cause) => providerCommandError(command, cause))),
  });

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
  Effect.map(QueueResourcePolicy, bindProviderCommandPolicy),
);

export const stripeCustomerResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeCustomerResourcePolicy, bindProviderCommandPolicy),
);

export const stripeProductResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeProductResourcePolicy, bindProviderCommandPolicy),
);

export const stripePriceResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripePriceResourcePolicy, bindProviderCommandPolicy),
);

export const stripeWebhookEndpointResourceCommandMetadataLayer = Layer.unwrap(
  Effect.map(StripeWebhookEndpointResourcePolicy, bindProviderCommandPolicy),
);

export const stripeBillingPortalConfigurationResourceCommandMetadataLayer =
  Layer.unwrap(
    Effect.map(
      StripeBillingPortalConfigurationResourcePolicy,
      bindProviderCommandPolicy,
    ),
  );

export const stripeBillingConfigurationExportResourceCommandMetadataLayer =
  Layer.unwrap(
    Effect.map(
      StripeBillingConfigurationExportResourcePolicy,
      bindProviderCommandPolicy,
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
              Effect.fail(new ResourceCommandUnsupported({ command })),
            onSome: Effect.succeed,
          });

          return yield* policy.execute(command);
        },
      ),
    };
  }),
);
