import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { assert, it } from "@effect/vitest";
import {
  Array as Arr,
  ConfigProvider,
  Context,
  Deferred,
  Effect,
  Fiber,
  Layer,
  Match,
  Option,
  Ref,
  Terminal,
} from "effect";
import { TerminalCapabilities } from "effect/cli";
import { KeyValueStore } from "effect/persistence";
import { TestClock, TestConsole } from "effect/testing";
import { AWSQueue } from "nomoss/providers/aws/sqs/queue";
import {
  type ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../src/core/resource/lifecycle.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandPolicy,
} from "../src/core/resource/resourceCommandPolicy.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { resourceStackRuntimeLayer } from "../src/core/runtime/stackRuntimeLayer.js";
import {
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../src/core/state/stateSecretService.js";

const queues = ["Orders", "Invoices", "Dispatch", "Exports", "Receipts"];

const QueueResponses = Context.Service<Deferred.Deferred<void>>(
  "nomoss/tests/QueueResponses",
);

const provider = Layer.effect(
  ResourceCommandPolicy,
  Effect.gen(function* () {
    const started = yield* Ref.make(0);
    const allStarted = yield* Deferred.make<void>();
    const responses = yield* QueueResponses;
    const receiptsRemovalFailed = yield* Ref.make(false);

    const createQueue = Effect.fnUntraced(function* ({
      decision: { node },
    }: Extract<ResourceCommand, { _tag: "Apply" }>) {
      // The provider returns queue URLs once every request is in flight.
      // A default cap below the batch size would stall this deployment.
      const requests = yield* Ref.updateAndGet(started, (count) => count + 1);

      yield* Deferred.succeed(allStarted, undefined).pipe(
        Effect.when(Effect.succeed(requests === queues.length)),
      );

      yield* Deferred.await(allStarted);
      yield* Deferred.await(responses);

      return ResourceCommandResult.Created({
        node: {
          ...node,
          cloudControlIdentifier: `${node.key.logicalId.toLowerCase()}-id`,
          outputs: { QueueUrl: `https://sqs.example/${node.key.logicalId}` },
        },
      });
    });

    return {
      execute: (command) =>
        Match.value(command).pipe(
          Match.when(
            { _tag: "Apply", decision: { _tag: "Update" } },
            ({ decision: { node, current } }) =>
              Effect.succeed(
                ResourceCommandResult.Updated({
                  node: { ...current, props: node.props },
                }),
              ),
          ),
          Match.when(
            { _tag: "Apply", decision: { _tag: "Destroy" } },
            (command) =>
              Effect.gen(function* () {
                const { node } = command.decision;
                const shouldFail = node.key.logicalId === "Receipts";

                const failedBefore = yield* Ref.getAndSet(
                  receiptsRemovalFailed,
                  true,
                ).pipe(Effect.when(Effect.succeed(shouldFail)));

                yield* Effect.fail(
                  new ResourceCommandExecutionFailed({
                    command,
                    cause: {
                      _tag: "QueueRemovalUnavailable",
                      message: "Temporary queue removal failure",
                    },
                  }),
                ).pipe(
                  Effect.when(
                    Effect.succeed(Option.contains(failedBefore, false)),
                  ),
                );

                return ResourceCommandResult.Destroyed({ node });
              }),
          ),
          Match.tag("Apply", createQueue),
          Match.orElse(() =>
            Effect.fail(
              new ResourceCommandExecutionFailed({
                command,
                cause: new ResourceCommandUnsupported({ command }),
              }),
            ),
          ),
        ),
    };
  }),
);

const queueResources = Effect.fnUntraced(function* (
  visibilityTimeout: number,
  ordersVisibilityTimeout = visibilityTimeout,
) {
  const resources = yield* Effect.forEach(queues, (logicalId) => {
    const timeout = Match.value(logicalId).pipe(
      Match.when("Orders", () => ordersVisibilityTimeout),
      Match.orElse(() => visibilityTimeout),
    );

    return AWSQueue({
      logicalId,
      props: {
        QueueName: logicalId.toLowerCase(),
        VisibilityTimeout: timeout,
        Tags: [{ Key: "source", Value: "pending" }],
      },
    });
  });

  return () => resources.map((resource) => resource.QueueUrl);
});

const dependentQueueResources = Effect.fnUntraced(function* (
  ordersVisibilityTimeout = 45,
) {
  const outputs = yield* queueResources(45, ordersVisibilityTimeout);
  const graph = yield* ResourceGraphStore;

  yield* graph.addDependency(
    { logicalId: "Receipts" },
    { logicalId: "Orders" },
    { kind: "prerequisite", reason: "Orders uses Receipts" },
  );

  yield* Effect.forEach(
    [
      ["Orders", "Invoices"],
      ["Invoices", "Dispatch"],
    ],
    ([source, target]) =>
      graph.addDependency(
        { logicalId: source },
        { logicalId: target },
        {
          kind: "property",
          property: ["Tags", "0", "Value"],
          sourceProperty: "QueueUrl",
        },
      ),
    { discard: true },
  );

  return outputs;
});

const runtime = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(resourceStackRuntimeLayer),
  Layer.provide([
    provider,
    KeyValueStore.layerMemory,
    StateSecretServiceDefaultLayer,
    NodeFileSystem.layer,
    NodePath.layer,
  ]),
  Layer.provideMerge(Layer.effect(QueueResponses, Deferred.make<void>())),
  Layer.provideMerge(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.provideMerge(TestConsole.layer),
);

it.effect(
  "Queue workflow reports dependency rechecks as unchanged and retries teardown after removing its declarations",
  () =>
    Effect.gen(function* () {
      const operations = yield* ResourceStackOperations;
      const responses = yield* QueueResponses;

      const prepared = yield* operations.Stack(
        "queue-workflow",
        queueResources(30),
      );

      const frames = yield* Ref.make<ReadonlyArray<string>>([]);
      const firstFrame = yield* Deferred.make<string>();

      const terminal = Terminal.make({
        columns: Effect.succeed(80),
        rows: Effect.succeed(24),
        size: Effect.die("Unused terminal resize input"),
        readInput: Effect.die("Unused terminal key input"),
        readLine: Effect.die("Unused terminal line input"),
        display: (frame) =>
          Ref.update(frames, (lines) => [...lines, frame]).pipe(
            Effect.andThen(() => Deferred.succeed(firstFrame, frame)),
            Effect.asVoid,
          ),
      });

      const terminalContext = Context.make(Terminal.Terminal, terminal).pipe(
        Context.add(TerminalCapabilities.TerminalCapabilities, {
          canAnimate: true,
          canColor: false,
          canPrompt: false,
        }),
      );

      const deployment = yield* operations
        .renderCreate(prepared)
        .pipe(Effect.provideContext(terminalContext), Effect.forkScoped);

      const running = yield* Deferred.await(firstFrame);

      assert.include(running, "create running");

      // The queue deployment waits for its concurrent provider requests.
      // Advancing time during that wait verifies the duration shown to the
      // operator. See node_modules/effect/src/testing/TestClock.ts (adjust).
      yield* TestClock.adjust("2 seconds");

      yield* Deferred.succeed(responses, undefined);

      const applied = yield* Fiber.join(deployment);

      const displayed = yield* Ref.get(frames);

      assert.include(displayed.join(""), "✓ aws:sqs:queue/Orders  created");
      assert.include(displayed.join(""), "id=orders-id");

      assert.deepStrictEqual(applied.outputs, [
        "https://sqs.example/Orders",
        "https://sqs.example/Invoices",
        "https://sqs.example/Dispatch",
        "https://sqs.example/Exports",
        "https://sqs.example/Receipts",
      ]);

      const createdSummary = Arr.join(
        Arr.map(yield* TestConsole.logLines, String),
        "\n",
      );

      assert.include(
        createdSummary,
        'Stack "queue-workflow" deployed in 2.0s.',
      );
      assert.include(
        createdSummary,
        "Resources: 5 created, 0 updated, 0 replaced, 0 deleted, 0 unchanged.",
      );

      const next = yield* operations.Stack(
        "queue-workflow",
        dependentQueueResources(),
      );

      yield* operations
        .renderUpdate(next, true)
        .pipe(Effect.provideContext(terminalContext));

      const plan = yield* TestConsole.logLines;
      const updated = yield* Ref.get(frames);

      assert.include(plan.join("\n"), "-   VisibilityTimeout: 30");
      assert.include(plan.join("\n"), "+   VisibilityTimeout: 45");
      assert.include(updated.join(""), "✓ aws:sqs:queue/Orders  updated");
      assert.include(
        Arr.join(Arr.map(plan, String), "\n"),
        "Resources: 0 created, 5 updated, 0 replaced, 0 deleted, 0 unchanged.",
      );

      yield* operations
        .renderUpdate(next)
        .pipe(Effect.provideContext(terminalContext));

      const unchangedSummary = Arr.join(
        Arr.map(yield* TestConsole.logLines, String),
        "\n",
      );

      assert.include(
        unchangedSummary,
        "Resources: 0 created, 0 updated, 0 replaced, 0 deleted, 5 unchanged.",
      );

      // The queue workflow changes Orders while its URL stays stable. Its
      // dependent queues must appear as unchanged in terminal output and totals.
      yield* Effect.forEach(
        [
          { canAnimate: true, visibilityTimeout: 60 },
          { canAnimate: false, visibilityTimeout: 75 },
        ],
        Effect.fnUntraced(function* ({ canAnimate, visibilityTimeout }) {
          yield* Ref.set(frames, []);

          const before = yield* TestConsole.logLines;
          const changed = yield* operations.Stack(
            "queue-workflow",
            dependentQueueResources(visibilityTimeout),
          );
          yield* operations
            .renderUpdate(changed)
            .pipe(
              Effect.provideContext(
                Context.add(
                  terminalContext,
                  TerminalCapabilities.TerminalCapabilities,
                  { canAnimate, canColor: false, canPrompt: false },
                ),
              ),
            );

          const logs = Arr.join(
            Arr.map(
              Arr.drop(yield* TestConsole.logLines, before.length),
              String,
            ),
            "\n",
          );
          const displayed = Arr.join(yield* Ref.get(frames), "");
          const progress = Match.value(canAnimate).pipe(
            Match.when(true, () => displayed),
            Match.orElse(() => logs),
          );

          assert.include(progress, "✓ aws:sqs:queue/Invoices  unchanged");
          assert.include(progress, "✓ aws:sqs:queue/Dispatch  unchanged");
          assert.notInclude(progress, "✓ aws:sqs:queue/Invoices  updated");
          assert.notInclude(progress, "✓ aws:sqs:queue/Dispatch  updated");
          assert.include(
            logs,
            "Resources: 0 created, 1 updated, 0 replaced, 0 deleted, 4 unchanged.",
          );
        }),
        { discard: true },
      );

      const empty = yield* operations.Stack(
        "queue-workflow",
        Effect.succeed(() => undefined),
      );

      const error = yield* operations
        .renderDestroy(empty)
        .pipe(Effect.provideContext(terminalContext), Effect.flip);

      assert.instanceOf(error, ResourceCommandExecutionFailed);

      const retry = yield* operations.planDestroyPrepared(empty);
      const remaining = retry.plan.destroy
        .flat()
        .map(({ node }) => node.key.logicalId);

      assert.include(remaining, "Receipts");
      assert.notInclude(remaining, "Orders");

      const removed = yield* operations
        .renderDestroy(empty)
        .pipe(Effect.provideContext(terminalContext));

      const teardown = yield* Ref.get(frames);

      assert.isTrue(removed.destroyed);
      assert.sameMembers(
        removed.resources.map(({ key }) => key.logicalId),
        remaining,
      );
      assert.include(teardown.join(""), "✓ aws:sqs:queue/Orders  destroyed");

      const removedSummary = Arr.join(
        Arr.map(yield* TestConsole.logLines, String),
        "\n",
      );

      assert.include(
        removedSummary,
        `Resources: 0 created, 0 updated, 0 replaced, ${removed.resources.length} deleted, 0 unchanged.`,
      );

      const finished = yield* operations.planDestroyPrepared(empty);

      assert.isEmpty(finished.plan.destroy);
    }).pipe(Effect.provide(runtime), Effect.timeout("3 seconds")),
);
