import { Layer } from "effect";

import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodeServices from "@effect/platform-node/NodeServices";

import {
  physicalNameStoreLayer as corePhysicalNameStoreLayer,
  resourceStateStoreBaseLayer as coreResourceStateStoreLayer,
  resourceGraphStoreLayer,
  resourcePlannerLayer,
} from "./core/runtimeLayer.js";
import { ConfiguredStateSecretServiceLayer } from "./core/stateSecretService.js";
import { NomossTracingLive } from "./core/tracing.js";
import {
  AwsProviderRuntime,
  awsResourcesLayerLive,
} from "./providers/aws/awsProviderLayer.js";
import {
  awsStackLifecycleLayerLive,
  stackCatalogLayerLive,
  stackWorkflowRendererLayerLive,
} from "./providers/aws/awsRuntimeLayer.js";

const physicalNameStoreWithNodeFileSystemLayer = Layer.provide(
  corePhysicalNameStoreLayer,
  NodeFileSystem.layer,
);
const resourceStateStoreWithNodeFileSystemLayer = Layer.provide(
  coreResourceStateStoreLayer,
  Layer.merge(
    NodeFileSystem.layer,
    ConfiguredStateSecretServiceLayer.pipe(Layer.provide(NodeServices.layer)),
  ),
);
const awsResourcesLayer = awsResourcesLayerLive.pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
  Layer.provideMerge(physicalNameStoreWithNodeFileSystemLayer),
);

export const nomossCliRuntimeLayer = awsStackLifecycleLayerLive.pipe(
  Layer.provideMerge(awsResourcesLayer),
  Layer.provideMerge(resourceStateStoreWithNodeFileSystemLayer),
  Layer.provideMerge(stackCatalogLayerLive),
  Layer.provideMerge(stackWorkflowRendererLayerLive),
  Layer.provideMerge(resourcePlannerLayer),
  Layer.provideMerge(Layer.effect(AwsProviderRuntime, AwsProviderRuntime.make)),
  Layer.provideMerge(NodeServices.layer),
  Layer.provideMerge(NomossTracingLive),
);
