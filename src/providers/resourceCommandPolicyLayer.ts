import { Context, Effect, Layer, Match, Option } from "effect";
import {
  type ResourceCommand,
  type ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../core/resource/lifecycle.js";
import type { ResourceSchemaAnnotation } from "../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  type ResourceCommandFailure,
  ResourceCommandPolicy,
} from "../core/resource/resourceCommandPolicy.js";

type ProviderResourceCommandPolicy = ResourceCommandPolicy["Service"];

/**
 * The ResourceCommandPolicyResolver service can select a policy from saved
 * metadata after a resource disappears from the declaration. It reports
 * absence for unsupported types and reports initialization failures separately.
 *
 * @see ../../node_modules/effect/src/Context.ts (Service)
 */
export class ResourceCommandPolicyResolver extends Context.Service<
  ResourceCommandPolicyResolver,
  {
    readonly resolve: (
      schema: ResourceSchemaAnnotation,
    ) => Effect.Effect<
      Option.Option<ProviderResourceCommandPolicy>,
      ResourceCommandFailure
    >;
  }
>()(
  "nomoss/providers/resourceCommandPolicyLayer/ResourceCommandPolicyResolver",
) {}

/**
 * The providerCommandPolicyTag function identifies the registration for a
 * resource schema. Providers supply it in the runtime that issues commands.
 *
 * @see ../../node_modules/effect/src/Context.ts (Service)
 */
export const providerCommandPolicyTag = (schema: ResourceSchemaAnnotation) =>
  Context.Service<ProviderResourceCommandPolicy, ProviderResourceCommandPolicy>(
    `nomoss/providers/resourceCommandPolicyLayer/${schema.provider}:${schema.service}:${schema.resource}:${schema.operation}`,
  );

/**
 * The resourceCommandPolicy function keeps the provider's failure attached to
 * its command. The stack can record the failed action while diagnostics still
 * have the original cause.
 *
 * @see ../../node_modules/effect/src/Effect.ts (mapError)
 */
export const resourceCommandPolicy = <Failure extends ResourceCommandFailure>(
  execute: (
    command: ResourceCommand,
  ) => Effect.Effect<ResourceCommandResult, Failure>,
): ProviderResourceCommandPolicy => ({
  execute: (command) =>
    execute(command).pipe(
      Effect.mapError(
        (cause) => new ResourceCommandExecutionFailed({ command, cause }),
      ),
    ),
});

/**
 * The registerResourceCommands function lets a provider register one executor
 * for several type identifiers. A caller can keep an old identifier as an
 * alias when saved resources still use it.
 *
 * @see ../../node_modules/effect/src/Context.ts (make and add)
 */
export const registerResourceCommands = <
  Failure extends ResourceCommandFailure,
>(
  execute: (
    command: ResourceCommand,
  ) => Effect.Effect<ResourceCommandResult, Failure>,
  tag: Context.Key<
    ProviderResourceCommandPolicy,
    ProviderResourceCommandPolicy
  >,
  ...aliases: ReadonlyArray<
    Context.Key<ProviderResourceCommandPolicy, ProviderResourceCommandPolicy>
  >
) => {
  const policy = resourceCommandPolicy(execute);

  return aliases.reduce(
    (registrations, alias) => Context.add(registrations, alias, policy),
    Context.make(tag, policy),
  );
};

/**
 * The providerResourceCommandPolicyLayerLive Layer checks the application's
 * registrations before asking a resolver to load a policy. If neither source
 * has a policy for the saved type, dispatch returns an unsupported command.
 *
 * @see ../../node_modules/effect/src/Effect.ts (serviceOption)
 */
export const providerResourceCommandPolicyLayerLive = Layer.effect(
  ResourceCommandPolicy,
  Effect.sync(() => {
    /**
     * The execute service method accepts the schema on a saved node, including
     * for deletion after the declaration has gone. Its failure retains the
     * original command so diagnostics can identify the affected resource.
     */
    const execute = Effect.fn("ProviderResourceCommandPolicy.execute")(
      function* (command: ResourceCommand) {
        const node = Match.value(command).pipe(
          Match.tag("Apply", ({ decision }) => decision.node),
          Match.orElse(({ node }) => node),
        );

        const operation = Match.value(command).pipe(
          Match.tag("Apply", ({ decision }) => decision._tag),
          Match.orElse((command) => command._tag),
        );

        const resourceAttributes = {
          "nomoss.resource.logical_id": node.key.logicalId,
          "nomoss.resource.operation": operation,
          "nomoss.resource.provider": node.schema.provider,
          "nomoss.resource.service": node.schema.service,
          "nomoss.resource.type":
            node.schema.cloudControl?.typeName ?? node.schema.resource,
        };

        yield* Effect.annotateCurrentSpan(resourceAttributes);

        // A saved Cloud Control identity cannot address a native AWS resource.
        yield* Effect.fail(
          new ResourceCommandExecutionFailed({
            command,
            cause: new ResourceCommandUnsupported({ command }),
          }),
        ).pipe(
          Effect.when(Effect.succeed(node.schema.cloudControl !== undefined)),
        );

        const policy = yield* Effect.serviceOption(
          providerCommandPolicyTag(node.schema),
        ).pipe(
          Effect.flatMap((registered) =>
            Option.match(registered, {
              onSome: Effect.succeedSome,
              onNone: () =>
                Effect.serviceOption(ResourceCommandPolicyResolver).pipe(
                  Effect.flatMap((resolver) =>
                    Option.match(resolver, {
                      onNone: () => Effect.succeedNone,
                      onSome: ({ resolve }) => resolve(node.schema),
                    }),
                  ),
                  Effect.mapError(
                    (cause) =>
                      new ResourceCommandExecutionFailed({ command, cause }),
                  ),
                ),
            }),
          ),
          Effect.flatMap((registered) =>
            Effect.fromOption(
              registered,
              () =>
                new ResourceCommandExecutionFailed({
                  command,
                  cause: new ResourceCommandUnsupported({ command }),
                }),
            ),
          ),
        );

        const result: ResourceCommandResult = yield* policy
          .execute(command)
          .pipe(
            Effect.annotateSpans(resourceAttributes),
            Effect.annotateLogs(resourceAttributes),
          );

        return result;
      },
    );

    return { execute };
  }),
);
