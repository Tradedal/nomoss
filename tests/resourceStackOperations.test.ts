import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import { PlanAction } from "../src/core/resource/model.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceStackDefinition } from "../src/core/stack/resourceStackDefinition.js";
import { ResourceStackOperations } from "../src/core/stack/resourceStackOperations.js";
import { StackWorkflowRenderer } from "../src/core/stack/stackWorkflowRenderer.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import { DeleteResourceInput } from "../src/providers/aws/client/generated/cloudControl.js";
import { AwsCloudControlFixture } from "./support/awsCloudControlFixture.js";
import {
  NomossCliFixture,
  nomossCliApplicationTestLayer,
  selectedQueue,
} from "./support/nomossCliFixture.js";

layer(nomossCliApplicationTestLayer, { buildPerTest: true })(
  "ResourceStackOperations",
  (it) => {
    it.effect(
      "starts fresh declarations while preserving earlier prepared graphs",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const fixture = yield* NomossCliFixture;
          const original = yield* operations.prepare();

          yield* fixture.setDesiredResources([
            { ...selectedQueue, key: { logicalId: "NextQueue" } },
          ]);

          const next = yield* operations.prepare();

          const repeated = yield* operations.prepare();

          const originalPlan = yield* operations.planPrepared(original);

          const nextPlan = yield* operations.planPrepared(next);
          const repeatedPlan = yield* operations.planPrepared(repeated);

          assert.deepStrictEqual(
            Arr.flatten(originalPlan.plan.createOrUpdate).map(
              (action) => action.node.key.logicalId,
            ),
            ["SelectedQueue"],
          );
          assert.deepStrictEqual(
            Arr.flatten(nextPlan.plan.createOrUpdate).map(
              (action) => action.node.key.logicalId,
            ),
            ["NextQueue"],
          );
          assert.deepStrictEqual(repeatedPlan.plan, nextPlan.plan);
        }),
    );

    it.effect(
      "clears a failed partial declaration before the next preparation",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const fixture = yield* NomossCliFixture;
          const graph = yield* ResourceGraphStore;

          yield* fixture.setDesiredResources([selectedQueue, selectedQueue]);

          const failure = yield* operations.prepare().pipe(Effect.flip);

          assert.strictEqual(failure._tag, "ResourceStackDeclarationFailed");
          assert.deepStrictEqual(yield* graph.topologicalLogicalIds, []);

          yield* fixture.setDesiredResources([selectedQueue]);

          const planned = yield* operations.plan();

          assert.strictEqual(
            Arr.flatten(planned.plan.createOrUpdate).length,
            1,
          );
        }),
    );

    it.effect(
      "executes a captured apply plan after a new declaration is prepared",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const fixture = yield* NomossCliFixture;
          const aws = yield* AwsCloudControlFixture;
          const states = yield* ResourceStateStore;
          const renderer = yield* StackWorkflowRenderer;

          const planned = yield* operations.plan();

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          yield* fixture.setDesiredResources([
            { ...selectedQueue, key: { logicalId: "DifferentQueue" } },
          ]);

          yield* operations.prepare();

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "create-1" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "queue-1",
              },
            }),
            Response.json({
              ResourceDescription: {
                Properties:
                  '{"QueueName":"selected-application","QueueUrl":"queue-1"}',
              },
            }),
          ]);

          const result = yield* operations.applyPrepared(planned);

          const saved = yield* states.loadResources(planned.stackName);

          assert.deepStrictEqual(result.plan, planned.plan);
          assert.deepStrictEqual(
            saved.map((node) => node.key.logicalId),
            ["SelectedQueue"],
          );
          assert.strictEqual(saved[0].cloudControlIdentifier, "queue-1");
          assert.strictEqual((yield* aws.getRequests()).length, 3);
        }),
    );

    it.effect(
      "rejects a displayed apply plan when lifecycle state changes without changing resource values",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const states = yield* ResourceStateStore;
          const renderer = yield* StackWorkflowRenderer;
          const aws = yield* AwsCloudControlFixture;
          const { stackName } = yield* ResourceStackDefinition;

          yield* states.saveResources(stackName, [selectedQueue]);

          const planned = yield* operations.plan();

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          yield* states.markResourceStarted(
            stackName,
            PlanAction.Update({ node: selectedQueue, current: selectedQueue }),
          );

          const failure = yield* operations
            .applyPrepared(planned)
            .pipe(Effect.flip);

          assert.strictEqual(failure._tag, "ResourcePlanInvalidated");
          assert.deepStrictEqual(yield* states.loadResources(stackName), [
            selectedQueue,
          ]);
          assert.deepStrictEqual(yield* aws.getRequests(), []);
        }),
    );

    it.effect(
      "rejects a displayed destroy plan when saved resource identity changes",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const states = yield* ResourceStateStore;
          const aws = yield* AwsCloudControlFixture;
          const renderer = yield* StackWorkflowRenderer;
          const { stackName } = yield* ResourceStackDefinition;
          const current = {
            ...selectedQueue,
            cloudControlIdentifier: "original-queue",
          };

          yield* states.saveResources(stackName, [current]);

          const prepared = yield* operations.prepare();

          const planned = yield* operations.planDestroyPrepared(prepared);

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          yield* states.saveResources(stackName, [
            { ...current, cloudControlIdentifier: "replacement-queue" },
          ]);

          const failure = yield* operations
            .destroyPrepared(planned)
            .pipe(Effect.flip);

          assert.strictEqual(failure._tag, "ResourcePlanInvalidated");
          assert.strictEqual(
            (yield* states.loadResources(stackName))[0].cloudControlIdentifier,
            "replacement-queue",
          );
          assert.deepStrictEqual(yield* aws.getRequests(), []);
        }),
    );

    it.effect(
      "executes a displayed destroy plan and clears its saved resources",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const states = yield* ResourceStateStore;
          const renderer = yield* StackWorkflowRenderer;
          const aws = yield* AwsCloudControlFixture;
          const { stackName } = yield* ResourceStackDefinition;

          yield* states.saveResources(stackName, [
            { ...selectedQueue, cloudControlIdentifier: "queue-1" },
          ]);

          const prepared = yield* operations.prepare();

          const planned = yield* operations.planDestroyPrepared(prepared);

          yield* renderer.renderPlan({
            stackName: planned.stackName,
            plan: planned.plan,
          });

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "delete-1" } }),
            Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
          ]);

          const result = yield* operations.destroyPrepared(planned);

          assert.deepStrictEqual(result.plan, planned.plan);
          assert.deepStrictEqual(yield* states.loadResources(stackName), []);

          const [request] = yield* aws.getRequests();

          const payload = yield* Effect.promise(() => request.text()).pipe(
            Effect.flatMap(
              Schema.decodeEffect(Schema.fromJsonString(DeleteResourceInput)),
            ),
          );

          assert.strictEqual(payload.Identifier, "queue-1");
        }),
    );
  },
);
