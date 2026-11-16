import { Effect, Layer } from "effect";
import {
  type ResourceApplicationPreparation,
  ResourceStackDeclarationFailed,
  ResourceStackDefinition,
  ResourceStackOperations,
} from "nomoss/core";
import { registerQueue } from "nomoss/providers/aws";

export const queueStack = {
  stackName: "queue",
  description: "Nomoss Cloud Control queue example",
  region: "us-east-1",
} as const;

/**
 * The queueStackDefinition Effect prepares the queue through the supplied
 * application services. Each evaluation creates a fresh declaration; its
 * callback reads the URL after apply has saved the provider response.
 */
export const queueStackDefinition = Effect.gen(function* () {
  const operations = yield* ResourceStackOperations;
  yield* operations.beginDeclaration(queueStack.stackName);
  const queue = yield* registerQueue({
    key: { logicalId: "Queue" },
    props: {
      QueueName: "nomoss-cloud-control-example-v12",
      VisibilityTimeout: 31,
    },
  });

  const prepared: ResourceApplicationPreparation<{
    readonly queueUrl: string;
  }> = yield* operations.prepare(queueStack.stackName, () => ({
    queueUrl: queue.outputs.QueueUrl,
  }));
  return prepared;
}).pipe(
  Effect.scoped,
  Effect.catchCause((cause) =>
    Effect.fail(
      new ResourceStackDeclarationFailed({
        stackName: queueStack.stackName,
        cause,
      }),
    ),
  ),
);

export const queueStackDefinitionLayer = Layer.effect(
  ResourceStackDefinition,
  queueStackDefinition,
);
