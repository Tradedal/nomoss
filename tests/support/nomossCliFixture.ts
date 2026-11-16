import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  Layer,
  Path,
  Ref,
  Schema,
  Stdio,
  Terminal,
} from "effect";
import { KeyValueStore } from "effect/persistence";
import { ChildProcessSpawner } from "effect/process";
import type { ResourceNode } from "../../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../../src/core/resource/resourceGraphBuilder.js";
import {
  ResourceStackDeclarationFailed,
  ResourceStackDefinition,
} from "../../src/core/stack/resourceStackDefinition.js";
import {
  type ResourceApplicationPreparation,
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../../src/core/stack/resourceStackOperations.js";
import {
  QueuePropsSchema,
  type QueueResource,
  QueueResourceSchema,
  registerQueue,
} from "../../src/providers/aws/resources/generated/sqs/queue/index.js";
import { awsCloudControlStackTestLayer } from "./awsCloudControlFixture.js";

const nomossCliPlatformTestLayer = Layer.mergeAll(
  FileSystem.layerNoop({}),
  KeyValueStore.layerMemory,
  Path.layer,
  Stdio.layerTest({}),
  Layer.succeed(
    Terminal.Terminal,
    Terminal.make({
      columns: Effect.succeed(80),
      rows: Effect.succeed(24),
      size: Effect.die("CLI fixture does not watch terminal resize"),
      readInput: Effect.die("CLI fixture does not read interactive input"),
      readLine: Effect.die("CLI fixture does not read interactive input"),
      display: () => Effect.void,
    }),
  ),
  Layer.succeed(
    ChildProcessSpawner.ChildProcessSpawner,
    ChildProcessSpawner.make(() =>
      Effect.die("CLI fixture does not launch child processes"),
    ),
  ),
);

export const selectedQueue: ResourceNode = {
  key: { logicalId: "SelectedQueue" },
  schema: QueueResourceSchema,
  props: { QueueName: "selected-application" },
  outputs: {},
};

/**
 * The NomossCliFixture service lets workflow tests change the desired queues
 * between stack operations while keeping the same application graph. Selection
 * changes affect future declarations; resources retained by an existing plan
 * still belong to that plan.
 */
export class NomossCliFixture extends Context.Service<NomossCliFixture>()(
  "nomoss/tests/support/nomossCliFixture",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphBuilder;
      const desired = yield* Ref.make<ReadonlyArray<ResourceNode>>([
        selectedQueue,
      ]);

      /**
       * The declareResources service method lets a test declaration register
       * its selected queues through production validation and registration.
       * The returned entities can supply applied URLs to the application's
       * result function after successful stack execution.
       */
      const declareResources = Effect.fn("NomossCliFixture.declareResources")(
        function* () {
          const resources = yield* Ref.get(desired);

          const declared: ReadonlyArray<QueueResource> = yield* Effect.forEach(
            resources,
            (resource) =>
              Schema.decodeUnknownEffect(QueuePropsSchema)(resource.props).pipe(
                Effect.flatMap((props) =>
                  registerQueue({ key: resource.key, props }),
                ),
                Effect.provideService(ResourceGraphBuilder, graph),
              ),
          );
          return declared;
        },
      );

      return {
        /**
         * The setDesiredResources service method lets tests choose the queues
         * for the next declaration without changing an already prepared plan
         * or its saved resources.
         */
        setDesiredResources: (resources: ReadonlyArray<ResourceNode>) =>
          Ref.set(desired, resources),
        declareResources,
      };
    }),
  },
) {}

/**
 * The nomossCliStackDefinition Effect supplies workflow tests with a stack
 * declaration whose apply result contains the selected queues' URLs. Each
 * preparation reads NomossCliFixture's current selection; a retained plan
 * continues to compute URLs for its own declared queues.
 */
export const nomossCliStackDefinition = Effect.gen(function* () {
  const operations = yield* ResourceStackOperations;
  yield* operations.beginDeclaration("selected-stack");
  const fixture = yield* NomossCliFixture;
  const queues = yield* fixture.declareResources();
  const prepared: ResourceApplicationPreparation<{
    readonly queueUrls: ReadonlyArray<string>;
  }> = yield* operations.prepare("selected-stack", () => ({
    queueUrls: Arr.map(queues, (queue) => queue.outputs.QueueUrl),
  }));
  return prepared;
}).pipe(
  Effect.scoped,
  Effect.catchCause((cause) =>
    Effect.fail(
      new ResourceStackDeclarationFailed({
        stackName: "selected-stack",
        cause,
      }),
    ),
  ),
);

const nomossCliDefinitionTestLayer = Layer.effect(
  ResourceStackDefinition,
  nomossCliStackDefinition,
);

const nomossCliServicesTestLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(Layer.effect(NomossCliFixture, NomossCliFixture.make)),
  Layer.provideMerge(awsCloudControlStackTestLayer),
  Layer.provideMerge(nomossCliPlatformTestLayer),
);

/**
 * The nomossCliApplicationTestLayer Layer supplies CLI commands with a prepared
 * declaration and the services that execute it. Its controlled transport and
 * in-memory persistence let tests observe provider requests and saved resources
 * without accessing local application files or launching child processes.
 */
export const nomossCliApplicationTestLayer = nomossCliDefinitionTestLayer.pipe(
  Layer.provideMerge(nomossCliServicesTestLayer),
);
