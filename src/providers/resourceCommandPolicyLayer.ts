import { Context, Effect, Layer, Match, Option } from "effect";
import {
  type ResourceCommand,
  type ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../core/resource/lifecycle.js";
import type { ResourceSchemaAnnotation } from "../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandPolicy,
} from "../core/resource/resourceCommandPolicy.js";

/**
 * ProviderResourceCommandPolicy is the execution contract each registered
 * provider implements. Its service tag is derived from persisted resource
 * metadata so later commands can locate the same resource capability.
 */
interface ProviderResourceCommandPolicy {
  readonly execute: (
    command: ResourceCommand,
  ) => ReturnType<(typeof ResourceCommandPolicy)["Service"]["execute"]>;
}

/**
 * providerCommandPolicyTag identifies the registration for a resource schema.
 * Providers supply the implementation in the same runtime as command execution.
 */
export const providerCommandPolicyTag = (schema: ResourceSchemaAnnotation) =>
  Context.Service<ProviderResourceCommandPolicy, ProviderResourceCommandPolicy>(
    `nomoss/providers/resourceCommandPolicyLayer/${schema.provider}:${schema.service}:${schema.resource}:${schema.operation}`,
  );

/**
 * awsCloudControlCommandPolicyTag registers the common lifecycle used by
 * Cloud Control resources. Their saved metadata selects the resource type for
 * each invocation, so separate type registrations are unnecessary.
 */
export const awsCloudControlCommandPolicyTag = Context.Service<
  ProviderResourceCommandPolicy,
  ProviderResourceCommandPolicy
>("nomoss/providers/resourceCommandPolicyLayer/aws-cloud-control");

/**
 * The providerResourceCommandPolicyLayerLive Layer uses provider registrations
 * from the application's runtime. An absent registration produces a typed unsupported
 * command that retains the original request for diagnosis.
 */
export const providerResourceCommandPolicyLayerLive = Layer.effect(
  ResourceCommandPolicy,
  Effect.sync(() => {
    /**
     * execute selects the provider registration identified by the command's
     * resource metadata. Resource context continues into provider spans and logs
     * so a read or mutation remains attributable to the same logical resource.
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

        const tag = Option.match(
          Option.fromUndefinedOr(node.schema.cloudControl),
          {
            onNone: () => providerCommandPolicyTag(node.schema),
            onSome: () => awsCloudControlCommandPolicyTag,
          },
        );

        const policy = yield* Effect.serviceOption(tag).pipe(
          Effect.flatMap(Effect.fromOption),
          Effect.mapError(
            () =>
              new ResourceCommandExecutionFailed({
                command,
                cause: new ResourceCommandUnsupported({ command }),
              }),
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
