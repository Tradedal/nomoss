import { AwsRetryProgress } from "@tradedal/aws-client-core";
import { Cache, Effect, Layer, Match, Option, Record, Unify } from "effect";
import { ResourceCommandProgress } from "../../../src/core/resource/resourceCommandPolicy.js";
import {
  ResourceCommandPolicyResolver,
  resourceCommandPolicy,
} from "../../../src/providers/resourceCommandPolicyLayer.js";
import { awsManagementLoaders } from "../generated/managementRegistry.js";

type AwsManagementLoader =
  (typeof awsManagementLoaders)[keyof typeof awsManagementLoaders];

/**
 * The awsResourceManagementRegistryLayer Layer resolves native AWS commands
 * from the resource type in stack state. If the registry has no entry, the
 * caller gets None. If an entry exists and its module fails to load, the
 * caller gets an error for that type. Concurrent commands for one type share
 * its initialization within the application runtime.
 *
 * @see ../../../refs/effect/packages/effect/src/Cache.ts (make and get)
 */
export const awsResourceManagementRegistryLayer = Layer.effect(
  ResourceCommandPolicyResolver,
  Effect.gen(function* () {
    const loaders: Readonly<Record<string, AwsManagementLoader>> =
      awsManagementLoaders;

    const cache = yield* Cache.make({
      capacity: Record.size(loaders),
      lookup: (resourceType: string) =>
        Record.get(loaders, resourceType).pipe(
          Option.map((load) =>
            Unify.unify(load).pipe(
              Effect.flatMap((definition) => Unify.unify(definition)),
              Effect.map(({ execute }) =>
                resourceCommandPolicy((command) =>
                  Effect.gen(function* () {
                    const progress = yield* ResourceCommandProgress;

                    return yield* Unify.unify(execute(command)).pipe(
                      Effect.provideService(AwsRetryProgress, progress),
                    );
                  }),
                ),
              ),
            ),
          ),
          Effect.transposeOption,
        ),
    });

    return {
      resolve: ({ provider, service, resource, operation }) =>
        Match.value(provider).pipe(
          Match.when("aws", () =>
            Cache.get(cache, `${service}:${resource}:${operation}`),
          ),
          Match.orElse(() => Effect.succeedNone),
        ),
    };
  }),
);
