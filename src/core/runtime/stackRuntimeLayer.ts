import { Layer } from "effect";
import { resourceGraphBuilderLayer } from "../resource/resourceGraphBuilder.js";
import { resourceStackLifecycleLayer } from "../stack/resourceStackLifecycle.js";
import { stackWorkflowRendererLayer } from "../stack/stackWorkflowRenderer.js";

/**
 * resourceStackRuntimeLayer shares declaration, planning, and execution
 * services within an application's stack. Provider dispatch, KeyValueStore,
 * and secret storage remain application dependencies so execution uses the
 * same graph with the selected provider and persistence configuration.
 */
export const resourceStackRuntimeLayer = Layer.mergeAll(
  resourceGraphBuilderLayer,
  resourceStackLifecycleLayer,
  stackWorkflowRendererLayer,
);
