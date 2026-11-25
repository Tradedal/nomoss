import { Effect, Layer, Match } from "effect";
import {
  type ResourceCommand,
  type ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../../../core/resource/lifecycle.js";
import { ResourceCommandExecutionFailed } from "../../../core/resource/resourceCommandPolicy.js";
import { awsCloudControlCommandPolicyTag } from "../../resourceCommandPolicyLayer.js";
import { AwsCloudControlResourceLifecycle } from "./resourceLifecycle.js";

/**
 * awsCloudControlResourceCommandMetadataLayer registers Cloud Control resource
 * operations for core command dispatch in the application's runtime. Other
 * configured providers retain separate registrations in the same graph.
 */
export const awsCloudControlResourceCommandMetadataLayer = Layer.unwrap(
  Effect.gen(function* () {
    const lifecycle = yield* AwsCloudControlResourceLifecycle;

    /**
     * execute supports resource reads and Apply decisions for creation, update,
     * and destruction. Other requests, including an Apply Delete decision,
     * return ResourceCommandUnsupported inside ResourceCommandExecutionFailed.
     */
    const execute = Effect.fn("AwsCloudControlResourceCommandMetadata.execute")(
      function* (command: ResourceCommand) {
        const result: ResourceCommandResult = yield* Effect.mapError(
          Match.value(command).pipe(
            Match.tag("Apply", ({ decision }) =>
              Match.value(decision).pipe(
                Match.tag("Create", ({ node }) =>
                  lifecycle.createResource(node),
                ),
                Match.tag("Update", ({ node, current }) =>
                  lifecycle.updateResource(node, current),
                ),
                Match.tag("Destroy", ({ node }) =>
                  lifecycle.destroyResource(node),
                ),
                Match.orElse(() =>
                  Effect.fail(new ResourceCommandUnsupported({ command })),
                ),
              ),
            ),
            Match.tag("Read", ({ node }) => lifecycle.readResource(node)),
            Match.orElse(() =>
              Effect.fail(new ResourceCommandUnsupported({ command })),
            ),
          ),
          (cause) => new ResourceCommandExecutionFailed({ command, cause }),
        );

        return result;
      },
    );

    const registration = Layer.succeed(awsCloudControlCommandPolicyTag, {
      execute,
    });

    return registration;
  }),
);
