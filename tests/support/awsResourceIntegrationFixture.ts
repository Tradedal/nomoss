import { NodeServices } from "@effect/platform-node";
import { layer } from "@effect/vitest";
import { AwsProfile, AwsRegion } from "@tradedal/aws-client-core/config";
import { AwsRegionName } from "@tradedal/aws-client-core/model";
import { awsClientConfigLayer } from "@tradedal/aws-credentials";
import { Config, Effect, Layer, Option, Schema } from "effect";
import { SecureRandom } from "effect/crypto";
import { FetchHttpClient } from "effect/http";
import { awsNativeStackLayer } from "nomoss/providers/aws";
import { resourceStackOperationsLayer } from "../../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { resourceStateFileStorageLayer } from "../../src/core/state/stateStore.js";
import { resourceLifecycleTestLayer } from "./resourceLifecycleCase.js";

/**
 * The awsIntegrationConfigLayer Layer uses the production credential chain
 * with the account and region selected for live test resources.
 *
 * @see ../../refs/effect/packages/effect/src/Layer.ts (unwrap and provide)
 */
export const awsIntegrationConfigLayer = Layer.unwrap(
  Effect.gen(function* () {
    const profile = yield* Config.NonEmptyString(
      "NOMOSS_AWS_INTEGRATION_PROFILE",
    );
    const region = yield* Config.NonEmptyString(
      "NOMOSS_AWS_INTEGRATION_REGION",
    ).pipe(Config.withDefault("us-east-1"));

    const awsRegion = yield* Schema.decodeEffect(AwsRegionName)(region);

    return awsClientConfigLayer.pipe(
      Layer.provide([
        Layer.succeed(AwsProfile, Option.some(profile)),
        Layer.succeed(AwsRegion, Option.some(awsRegion)),
      ]),
    );
  }),
);

/**
 * The awsNativeResourceSuite function exercises the same AWS operations as a
 * native stack. IAM resources can supply prerequisites in the case declaration
 * so the stack removes them in dependency order, even on a failed case.
 *
 * @see ../../refs/effect/packages/vitest/src/index.ts (layer and buildPerTest)
 */
export const awsNativeResourceSuite = layer(
  resourceLifecycleTestLayer.pipe(
    Layer.provideMerge(resourceStackOperationsLayer),
    Layer.provideMerge(awsNativeStackLayer),
    Layer.provideMerge(
      Layer.provideMerge(awsIntegrationConfigLayer, FetchHttpClient.layer),
    ),
    Layer.provide(StateSecretServiceDefaultLayer),
    Layer.provideMerge(resourceStateFileStorageLayer),
    Layer.provideMerge(NodeServices.layer),
    Layer.provideMerge(SecureRandom.layerWebCrypto),
  ),
  { buildPerTest: true, excludeTestServices: true },
);
