import {
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
  ResourceStackDefinition,
  resourceStackDeclarationResult,
} from "../../src/core/stack/resourceStackDefinition.js";
import { resourceStackOperationsLayer } from "../../src/core/stack/resourceStackOperations.js";
import {
  QueuePropsSchema,
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

export class NomossCliFixture extends Context.Service<NomossCliFixture>()(
  "nomoss/tests/support/nomossCliFixture",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphBuilder;
      const desired = yield* Ref.make<ReadonlyArray<ResourceNode>>([
        selectedQueue,
      ]);

      const declareResources = Effect.fn("NomossCliFixture.declareResources")(
        function* () {
          const resources = yield* Ref.get(desired);

          yield* Effect.forEach(
            resources,
            (resource) =>
              Schema.decodeUnknownEffect(QueuePropsSchema)(resource.props).pipe(
                Effect.flatMap((props) =>
                  registerQueue({ key: resource.key, props }),
                ),
                Effect.provideService(ResourceGraphBuilder, graph),
              ),
            { discard: true },
          );
        },
      );

      return {
        setDesiredResources: (resources: ReadonlyArray<ResourceNode>) =>
          Ref.set(desired, resources),
        declareResources,
      };
    }),
  },
) {}

/**
 * The CLI fixture supplies an application declaration with controlled AWS
 * responses and in-memory state. Commands exercise the shared stack graph
 * without reading or changing local application files.
 */
const nomossCliDefinitionTestLayer = Layer.effect(
  ResourceStackDefinition,
  Effect.gen(function* () {
    const fixture = yield* NomossCliFixture;
    const stackName = "selected-stack";

    return {
      stackName,
      description: "Selected CLI application",
      program: fixture.declareResources().pipe(
        Effect.exit,
        Effect.flatMap((result) =>
          resourceStackDeclarationResult(stackName, result),
        ),
      ),
    };
  }),
);

export const nomossCliApplicationTestLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(nomossCliDefinitionTestLayer),
  Layer.provideMerge(Layer.effect(NomossCliFixture, NomossCliFixture.make)),
  Layer.provideMerge(awsCloudControlStackTestLayer),
  Layer.provideMerge(nomossCliPlatformTestLayer),
);
