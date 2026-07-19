import { Layer } from "effect";

import { ResourceModel } from "../resource/model.js";
import { ResourceGraphBuilder } from "../resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../resource/resourceOutputResolver.js";
import { ResourcePolicy } from "../resource/resourcePolicy.js";
import { ResourcePlanner } from "../stack/planner.js";
import { ResourceStackLifecycle } from "../stack/resourceStackLifecycle.js";
import { ResourceStackOperations } from "../stack/resourceStackOperations.js";
import { StackWorkflowRenderer } from "../stack/stackWorkflowRenderer.js";
import { PhysicalNameStore } from "../state/physicalNameStore.js";
import { StateSecretServiceDefaultLayer } from "../state/stateSecretService.js";
import { ResourceStateStore } from "../state/stateStore.js";

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
