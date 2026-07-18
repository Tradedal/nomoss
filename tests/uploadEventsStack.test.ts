import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Layer } from "effect";

import {
  uploadEventsStack,
  uploadEventsStackCatalogLayer,
} from "../examples/upload-events/stack.js";
import { PhysicalNameStore } from "../src/core/physicalNameStore.js";
import { ResourcePlanner } from "../src/core/planner.js";
import { ResourceGraphStore } from "../src/core/resourceGraphStore.js";
import { ResourceStackCatalog } from "../src/core/resourceStackCatalog.js";
import {
  resourceGraphStoreLayer,
  resourcePlannerLayer,
} from "../src/core/runtimeLayer.js";
import { awsResourcesLayerLive } from "../src/providers/aws/awsProviderLayer.js";

const physicalNameStoreLayer = Layer.succeed(
  PhysicalNameStore,
  PhysicalNameStore.of({
    bucketNameFor: Effect.fn("UploadEventsStackTest.bucketNameFor")(
      (logicalId: string) => Effect.succeed(`test-${logicalId.toLowerCase()}`),
    ),
    queueNameFor: Effect.fn("UploadEventsStackTest.queueNameFor")(
      (logicalId: string) => Effect.succeed(`test-${logicalId.toLowerCase()}`),
    ),
    deleteNames: Effect.fn("UploadEventsStackTest.deleteNames")(
      () => Effect.void,
    ),
  }),
);
const awsResourcesLayer = awsResourcesLayerLive.pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
  Layer.provideMerge(physicalNameStoreLayer),
);
const uploadEventsTestLayer = uploadEventsStackCatalogLayer.pipe(
  Layer.provideMerge(awsResourcesLayer),
  Layer.provideMerge(resourcePlannerLayer),
);

/**
 * This test exercises the upload-events application declaration without AWS.
 * Deterministic physical names keep the assertions local while the production
 * graph builder and planner verify the composition consumed by CLI workflows.
 */
describe("upload-events stack", () => {
  it.effect("declares its resources in dependency-safe batches", () =>
    Effect.gen(function* () {
      const catalog = yield* ResourceStackCatalog;
      const graphStore = yield* ResourceGraphStore;
      const planner = yield* ResourcePlanner;
      const stack = yield* catalog.get(uploadEventsStack.name);

      yield* catalog.declare(stack);

      const graph = yield* graphStore.snapshot;
      const logicalIds = yield* graphStore.topologicalLogicalIds;
      const batches = Arr.map(
        planner.createOrUpdateBatches(graph, []),
        (batch) => Arr.map(batch, (action) => action.node.key.logicalId),
      );

      assert.deepStrictEqual(stack, uploadEventsStack);
      assert.deepStrictEqual(logicalIds, [
        "Uploads",
        "UploadEvents",
        "UploadEventsPolicy",
        "UploadEventsNotification",
      ]);
      assert.deepStrictEqual(batches, [
        ["Uploads", "UploadEvents"],
        ["UploadEventsPolicy"],
        ["UploadEventsNotification"],
      ]);
    }).pipe(Effect.provide(uploadEventsTestLayer)),
  );
});
