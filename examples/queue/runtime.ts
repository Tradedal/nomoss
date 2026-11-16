import { Layer, Option } from "effect";
import { Command } from "effect/cli";
import { nomossCliCommand } from "nomoss/cli";
import {
  ConfiguredStateSecretServiceLayer,
  resourceStackOperationsLayer,
  resourceStateFileStorageLayer,
} from "nomoss/core";
import { AwsRegion, awsCloudControlStackLayerLive } from "nomoss/providers/aws";
import { queueStack, queueStackDefinitionLayer } from "./stack.js";

const queueServicesLayer = awsCloudControlStackLayerLive.pipe(
  Layer.provideMerge(ConfiguredStateSecretServiceLayer),
  Layer.provide(resourceStateFileStorageLayer),
);

/**
 * Declare and execute through the queueStackRuntimeLayer Layer so planning
 * sees the registered resources and execution uses the same AWS configuration
 * and state service.
 */
export const queueStackRuntimeLayer = queueStackDefinitionLayer.pipe(
  Layer.provideMerge(
    resourceStackOperationsLayer.pipe(Layer.provideMerge(queueServicesLayer)),
  ),
  Layer.provide(Layer.succeed(AwsRegion, Option.some(queueStack.region))),
);

export const queueStackCommand = nomossCliCommand.pipe(
  Command.provide(queueStackRuntimeLayer),
);
