import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Layer } from "effect";

import {
  uploadEventsStack,
  uploadEventsStackLayer,
} from "../examples/upload-events/stack.js";
import { PhysicalNameStore } from "../src/core/physicalNameStore.js";
import { ResourcePlanner } from "../src/core/planner.js";
import { ResourceGraphStore } from "../src/core/resourceGraphStore.js";
import { ResourceStackDefinition } from "../src/core/resourceStackDefinition.js";
import {
  resourceGraphStoreLayer,
  resourcePlannerLayer,
} from "../src/core/runtimeLayer.js";
import { awsResourcesLayerLive } from "../src/providers/aws/awsProviderLayer.js";

const physicalNameStoreLayer = Layer.succeed(PhysicalNameStore, {
  bucketNameFor: Effect.fn("UploadEventsStackTest.bucketNameFor")(
    (logicalId: string) => Effect.succeed(`test-${logicalId.toLowerCase()}`),
  ),
  queueNameFor: Effect.fn("UploadEventsStackTest.queueNameFor")(
    (logicalId: string) => Effect.succeed(`test-${logicalId.toLowerCase()}`),
  ),
  deleteNames: Effect.fn("UploadEventsStackTest.deleteNames")(
    () => Effect.void,
  ),
});
const awsResourcesLayer = awsResourcesLayerLive.pipe(
  Layer.provideMerge(resourceGraphStoreLayer),
  Layer.provideMerge(physicalNameStoreLayer),
);
const uploadEventsTestLayer = uploadEventsStackLayer.pipe(
  Layer.provideMerge(awsResourcesLayer),
  Layer.provideMerge(resourcePlannerLayer),
);

/**
 * This test runs the same `ResourceGraphStore` and `ResourcePlanner` services
 * as the CLI. Fixed names keep it from reading or writing Nomoss state.
 */
describe("upload-events stack", () => {
  it.effect("declares its resources in dependency-safe batches", () =>
    Effect.gen(function* () {
      const stackDefinition = yield* ResourceStackDefinition;
      const graphStore = yield* ResourceGraphStore;
      const planner = yield* ResourcePlanner;

      yield* stackDefinition.program;

      const graph = yield* graphStore.snapshot;
      const logicalIds = yield* graphStore.topologicalLogicalIds;
      const batches = Arr.map(
        planner.createOrUpdateBatches(graph, []),
        (batch) => Arr.map(batch, (action) => action.node.key.logicalId),
      );

      assert.deepStrictEqual(
        {
          name: stackDefinition.stackName,
          description: stackDefinition.description,
          region: stackDefinition.region,
        },
        uploadEventsStack,
      );
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
