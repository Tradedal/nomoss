import { Effect } from "effect";
import { TestConsole } from "effect/testing";

import { assert, describe, it } from "@effect/vitest";

import { PlanDecision, ResourceCommandResult } from "../src/core/lifecycle.js";
import { ResourceNodeSchema } from "../src/core/model.js";
import { resourceModelLayer } from "../src/core/runtimeLayer.js";
import { StackWorkflowRenderer } from "../src/providers/aws/stackWorkflow.js";

describe("AWS stack workflow renderer", () => {
  it.effect(
    "renders provider-confirmed resource results with elapsed time",
    () =>
      Effect.gen(function* () {
        const node = yield* ResourceNodeSchema.makeEffect({
          key: { logicalId: "Uploads" },
          schema: {
            provider: "aws",
            service: "s3",
            resource: "bucket",
            operation: "create",
            stateSecretOutputKeys: [],
          },
          props: {},
          outputs: {},
        });
        const decision = PlanDecision.Create({ node });
        const renderer = yield* StackWorkflowRenderer.make.pipe(
          Effect.provide(resourceModelLayer),
        );
        yield* renderer.renderApplyResult({
          report: {
            stackName: "upload-events",
            decisions: new Map([[node.key.logicalId, decision]]),
            changed: [decision],
          },
          applied: true,
          resources: [
            {
              result: ResourceCommandResult.Created({ node }),
              durationMillis: 412,
            },
          ],
          durationMillis: 1_310,
        });
        const lines = yield* TestConsole.logLines;

        assert.deepStrictEqual(lines, [
          'Stack "upload-events"',
          "✓ created aws:s3:bucket Uploads  412ms",
          "1 resource created in 1.31s",
        ]);
      }).pipe(Effect.provide(TestConsole.layer)),
  );
});
