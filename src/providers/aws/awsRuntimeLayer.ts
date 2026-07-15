import { Layer } from "effect";

import { resourceModelLayer } from "../../core/runtimeLayer.js";
import { AwsStackLifecycle } from "./awsStackLifecycle.js";
import { StackCatalog } from "./sampleStack.js";
import { StackWorkflowRenderer } from "./stackWorkflow.js";

export const stackCatalogLayerLive = Layer.effect(
  StackCatalog,
  StackCatalog.make,
);

export const awsStackLifecycleLayerLive = Layer.effect(
  AwsStackLifecycle,
  AwsStackLifecycle.make,
);

export const stackWorkflowRendererLayerLive = Layer.effect(
  StackWorkflowRenderer,
  StackWorkflowRenderer.make,
).pipe(Layer.provideMerge(resourceModelLayer));
