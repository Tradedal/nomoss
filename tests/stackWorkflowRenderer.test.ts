import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect } from "effect";
import { TestConsole } from "effect/testing";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "nomoss/providers/aws/cloud-control/sqs/queue";
import { PlanAction, ResourceModel } from "../src/core/resource/model.js";
import {
  StackWorkflowRenderer,
  stackWorkflowRendererLayer,
} from "../src/core/stack/stackWorkflowRenderer.js";

layer(stackWorkflowRendererLayer, { buildPerTest: true })(
  "StackWorkflowRenderer",
  (it) => {
    it.effect(
      "Deletion results display the removed queue and its provider id",
      () =>
        Effect.gen(function* () {
          const renderer = yield* StackWorkflowRenderer;
          const model = yield* ResourceModel;
          const queue = yield* model.nodeFromResource({
            key: { logicalId: "SelectedQueue" },
            propsSchema: QueuePropsSchema,
            outputsSchema: QueueOutputsSchema,
            props: { QueueName: "selected-application" },
            outputs: {},
          });

          yield* renderer.renderApplyResult({
            stackName: "delete-only",
            plan: {
              delete: [
                [
                  PlanAction.Delete({
                    node: {
                      ...queue,
                      cloudControlIdentifier: "queue-1",
                    },
                  }),
                ],
              ],
              createOrUpdate: [],
              destroy: [],
            },
            applied: true,
            resources: [],
          });

          const output = Arr.join(
            Arr.map(yield* TestConsole.logLines, String),
            "\n",
          );

          assert.include(output, "SelectedQueue deleted");
          assert.include(output, "id=queue-1");
          assert.notInclude(output, "no changes");
        }),
    );
  },
);
