import { assert, layer } from "@effect/vitest";
import { Effect } from "effect";
import { TestConsole } from "effect/testing";
import { PlanAction, ResourceModel } from "../src/core/resource/model.js";
import {
  StackWorkflowRenderer,
  stackWorkflowRendererLayer,
} from "../src/core/stack/stackWorkflowRenderer.js";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "../src/providers/aws/resources/generated/sqs/queue/index.js";

layer(stackWorkflowRendererLayer, { buildPerTest: true })(
  "StackWorkflowRenderer",
  (it) => {
    it.effect(
      "shows the deleted queue and its identifier when apply only deleted resources",
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

          const output = (yield* TestConsole.logLines).join("\n");

          assert.include(output, "SelectedQueue deleted");
          assert.include(output, "id=queue-1");
          assert.notInclude(output, "no changes");
        }),
    );
  },
);
