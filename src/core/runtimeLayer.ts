import { Layer } from "effect";

import { ResourceModel } from "./model.js";
import { PhysicalNameStore } from "./physicalNameStore.js";
import { ResourcePlanner } from "./planner.js";
import { ResourceGraphBuilder } from "./resourceGraphBuilder.js";
import { ResourceGraphStore } from "./resourceGraphStore.js";
import { ResourceOutputResolver } from "./resourceOutputResolver.js";
import { ResourcePolicy } from "./resourcePolicy.js";
import { ResourceStackLifecycle } from "./resourceStackLifecycle.js";
import { ResourceStackOperations } from "./resourceStackOperations.js";
import { StackWorkflowRenderer } from "./stackWorkflowRenderer.js";
import { StateSecretServiceDefaultLayer } from "./stateSecretService.js";
import { ResourceStateStore } from "./stateStore.js";

export const resourceModelLayer = Layer.effect(
  ResourceModel,
  ResourceModel.make,
);

export const resourceGraphStoreLayer = Layer.effect(
  ResourceGraphStore,
  ResourceGraphStore.make,
).pipe(Layer.provideMerge(resourceModelLayer));

export const resourceGraphBuilderLayer = Layer.effect(
  ResourceGraphBuilder,
  ResourceGraphBuilder.make,
).pipe(Layer.provideMerge(resourceModelLayer));

export const resourcePlannerLayer = Layer.effect(
  ResourcePlanner,
  ResourcePlanner.make,
).pipe(Layer.provideMerge(resourceModelLayer));

export const resourceOutputResolverLayer = Layer.effect(
  ResourceOutputResolver,
  ResourceOutputResolver.make,
);

export const resourcePolicyLayer = Layer.effect(
  ResourcePolicy,
  ResourcePolicy.make,
);

export const physicalNameStoreLayer = Layer.effect(
  PhysicalNameStore,
  PhysicalNameStore.make,
);

export const resourceStateStoreBaseLayer = Layer.effect(
  ResourceStateStore,
  ResourceStateStore.make,
);

export const resourceStateStoreLayer = resourceStateStoreBaseLayer.pipe(
  Layer.provideMerge(StateSecretServiceDefaultLayer),
);

export const resourceStackLifecycleLayer = Layer.effect(
  ResourceStackLifecycle,
  ResourceStackLifecycle.make,
);

export const resourceStackOperationsLayer = Layer.effect(
  ResourceStackOperations,
  ResourceStackOperations.make,
);

export const stackWorkflowRendererLayer = Layer.effect(
  StackWorkflowRenderer,
  StackWorkflowRenderer.make,
);
