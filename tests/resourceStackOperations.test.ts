import { assert, layer } from "@effect/vitest";
import {
  Array as Arr,
  Context,
  Deferred,
  Effect,
  Exit,
  Fiber,
  Layer,
  Match,
  Option,
  Schema,
  Scope,
} from "effect";
import { KeyValueStore } from "effect/persistence";
import { PlanAction } from "../src/core/resource/model.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceStackDefinition } from "../src/core/stack/resourceStackDefinition.js";
import { ResourceStackOperations } from "../src/core/stack/resourceStackOperations.js";
import { StackWorkflowRenderer } from "../src/core/stack/stackWorkflowRenderer.js";
import { EnvironmentStateSchema } from "../src/core/state/resourceState.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import {
  createResourceOperation,
  DeleteResourceInput,
} from "../src/providers/aws/client/generated/cloudControl.js";
import {
  AwsCloudControlFixture,
  awsConfiguredStackTestLayer,
  awsStackOperationsTestLayer,
  declareQueueLookupStack,
  declareQueueStack,
} from "./support/awsCloudControlFixture.js";
import {
  NomossCliFixture,
  nomossCliApplicationTestLayer,
  nomossCliStackDefinition,
  selectedQueue,
} from "./support/nomossCliFixture.js";
import {
  declareBillingStack,
  StripeLifecycleFixture,
  stripeConfiguredStackTestLayer,
  stripePrice,
  stripeProduct,
  stripeStackOperationsTestLayer,
} from "./support/stripeLifecycleFixture.js";

layer(nomossCliApplicationTestLayer, { buildPerTest: true })(
  "ResourceStackOperations",
  (it) => {
    it.effect(
      "Applications receive their queue configuration after creation and an unchanged apply",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const definition = yield* nomossCliStackDefinition;
          const aws = yield* AwsCloudControlFixture;
          const properties = yield* Schema.encodeEffect(
            Schema.fromJsonString(Schema.Json),
          )({ QueueName: "selected-application", QueueUrl: "queue-1" });

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "create-1" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "queue-1",
              },
            }),
            Response.json({ ResourceDescription: { Properties: properties } }),
          ]);

          const created = yield* operations.renderApply(definition);
          const unchanged = yield* operations.apply(definition);
          const queueUrl: string = unchanged.outputs.queueUrls[0];

          assert.strictEqual(created.applied, true);
          assert.deepStrictEqual(created.outputs, { queueUrls: ["queue-1"] });
          assert.strictEqual(unchanged.applied, false);
          assert.strictEqual(queueUrl, "queue-1");
          assert.deepStrictEqual(unchanged.outputs, created.outputs);
          assert.strictEqual(
            (yield* aws.requestsFor(createResourceOperation)).length,
            1,
          );
        }),
    );

    it.effect(
      "An application can recover a missing queue ARN through reconciliation without recreating its applied queue",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const aws = yield* AwsCloudControlFixture;
          const states = yield* ResourceStateStore;
          const definition = yield* operations
            .beginDeclaration("queue-permissions")
            .pipe(
              Effect.andThen(NomossCliFixture),
              Effect.flatMap((fixture) => fixture.declareResources()),
              Effect.flatMap((queues) =>
                operations.prepare("queue-permissions", () => ({
                  queueArns: Arr.map(queues, (queue) => queue.outputs.Arn),
                })),
              ),
              Effect.scoped,
            );
          const encode = Schema.encodeEffect(
            Schema.fromJsonString(Schema.Json),
          );
          const queueArn =
            "arn:aws:sqs:us-east-1:000000000000:selected-application";
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
                Properties: yield* encode({
                  QueueName: "selected-application",
                  QueueUrl: "queue-1",
                }),
              },
            }),
            Response.json({
              ResourceDescription: {
                Properties: yield* encode({
                  QueueName: "selected-application",
                  QueueUrl: "queue-1",
                  Arn: queueArn,
                }),
              },
            }),
          ]);

          const unavailable = yield* operations.apply(definition).pipe(
            Effect.flip,
            Effect.flatMap((failure) =>
              Match.value(failure).pipe(
                Match.tag("ResourceStackOutputFailed", (failure) =>
                  Effect.succeed(failure),
                ),
                Match.orElse((unexpected) => Effect.fail(unexpected)),
              ),
            ),
          );
          const applied = yield* states.loadResources(definition.stackName);

          assert.strictEqual(unavailable.stackName, definition.stackName);
          assert.deepInclude(unavailable.cause, {
            _tag: "ResourceOutputResolutionMissing",
            property: "Arn",
          });
          assert.strictEqual(applied.length, 1);
          assert.strictEqual(applied[0].cloudControlIdentifier, "queue-1");

          yield* operations.reconcile(definition);
          const recovered = yield* operations.apply(definition);
          const publishedArn: string = recovered.outputs.queueArns[0];

          assert.strictEqual(publishedArn, queueArn);
          assert.strictEqual(recovered.applied, false);
          assert.strictEqual(
            (yield* aws.requestsFor(createResourceOperation)).length,
            1,
          );
        }),
    );

    it.effect("Preparing another stack leaves an earlier plan unchanged", () =>
      Effect.gen(function* () {
        const operations = yield* ResourceStackOperations;
        const definition = yield* nomossCliStackDefinition;
        const fixture = yield* NomossCliFixture;
        const original = definition;

        yield* fixture.setDesiredResources([
          { ...selectedQueue, key: { logicalId: "NextQueue" } },
        ]);

        const next = yield* nomossCliStackDefinition;

        const repeated = yield* nomossCliStackDefinition;

        const originalPlan = yield* operations.planPrepared(original);

        const nextPlan = yield* operations.planPrepared(next);
        const repeatedPlan = yield* operations.planPrepared(repeated);

        assert.deepStrictEqual(
          Arr.map(
            Arr.flatten(originalPlan.plan.createOrUpdate),
            (action) => action.node.key.logicalId,
          ),
          ["SelectedQueue"],
        );
        assert.deepStrictEqual(
          Arr.map(
            Arr.flatten(nextPlan.plan.createOrUpdate),
            (action) => action.node.key.logicalId,
          ),
          ["NextQueue"],
        );
        assert.deepStrictEqual(repeatedPlan.plan, nextPlan.plan);
      }),
    );

    it.effect(
      "A failed declaration leaves no partial resources in the next plan",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const fixture = yield* NomossCliFixture;
          const graph = yield* ResourceGraphStore;

          yield* fixture.setDesiredResources([selectedQueue, selectedQueue]);

          const failure = yield* nomossCliStackDefinition.pipe(Effect.flip);

          assert.strictEqual(failure._tag, "ResourceStackDeclarationFailed");
          assert.deepStrictEqual(yield* graph.topologicalLogicalIds, []);

          yield* fixture.setDesiredResources([selectedQueue]);

          const planned = yield* operations.planPrepared(
            yield* nomossCliStackDefinition,
          );

          assert.strictEqual(
            Arr.flatten(planned.plan.createOrUpdate).length,
            1,
          );
        }),
    );

    it.effect(
      "Applying a reviewed plan uses the resources shown in that plan",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const definition = yield* nomossCliStackDefinition;
          const fixture = yield* NomossCliFixture;
          const aws = yield* AwsCloudControlFixture;
          const states = yield* ResourceStateStore;
          const planned = yield* operations.renderPlan(definition);

          yield* fixture.setDesiredResources([
            { ...selectedQueue, key: { logicalId: "DifferentQueue" } },
          ]);

          yield* nomossCliStackDefinition;

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
            Arr.map(saved, (node) => node.key.logicalId),
            ["SelectedQueue"],
          );
          assert.strictEqual(saved[0].cloudControlIdentifier, "queue-1");
          const queueUrl: string = result.outputs.queueUrls[0];
          assert.strictEqual(queueUrl, "queue-1");
          assert.strictEqual((yield* aws.getRequests()).length, 3);
        }),
    );

    it.effect(
      "Changes to saved lifecycle state invalidate an earlier apply plan",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const states = yield* ResourceStateStore;
          const renderer = yield* StackWorkflowRenderer;
          const aws = yield* AwsCloudControlFixture;
          const { stackName } = yield* ResourceStackDefinition;

          yield* states.saveResources(stackName, [selectedQueue]);

          const planned = yield* operations.planPrepared(
            yield* nomossCliStackDefinition,
          );

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
      "A changed resource identity invalidates an earlier teardown plan",
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

          const prepared = yield* nomossCliStackDefinition;

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
      "Applying a teardown plan clears the stack's saved resources",
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

          const prepared = yield* nomossCliStackDefinition;

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

layer(awsConfiguredStackTestLayer, { buildPerTest: true })(
  "Configured stack operations",
  (it) => {
    it.effect(
      "Planning stops a declaration's provider lookup while retaining its reviewed queue for apply",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const aws = yield* AwsCloudControlFixture;
          const pending = yield* aws.enqueuePendingResponse();
          const stack = yield* declareQueueLookupStack("scoped-queue", pending);
          const reviewed = yield* operations.planPrepared(stack);

          assert.isTrue(
            Option.isSome(yield* Deferred.poll(pending.interrupted)),
          );

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

          const applied = yield* operations.applyPrepared(reviewed);

          assert.deepStrictEqual(applied.outputs, { queueUrl: "queue-1" });
          assert.strictEqual(applied.applied, true);
        }).pipe(Effect.provide(awsStackOperationsTestLayer)),
    );

    it.effect(
      "Closing an application interrupts reconciliation and preserves its queue for a new runtime",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;
          const storage = yield* KeyValueStore.KeyValueStore;
          const owner = yield* Effect.acquireRelease(Scope.make(), (scope) =>
            Scope.close(scope, Exit.void),
          );
          const services = yield* Layer.buildWithScope(
            awsStackOperationsTestLayer,
            owner,
          );
          const operations = Context.get(services, ResourceStackOperations);
          const stack = yield* declareQueueStack("interrupted-queue").pipe(
            Effect.provideContext(services),
          );

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

          const created = yield* operations
            .apply(stack)
            .pipe(Effect.provideContext(services));
          const pending = yield* aws.enqueuePendingResponse();
          const reconciliation = yield* operations
            .reconcile(stack)
            .pipe(Effect.provideContext(services), Effect.forkChild);

          yield* Deferred.await(pending.received);
          yield* Scope.close(owner, Exit.void);

          const stopped = yield* Fiber.await(reconciliation);
          const saved = yield* KeyValueStore.toSchemaStore(
            storage,
            EnvironmentStateSchema,
          )
            .get(`${stack.stackName}.json`)
            .pipe(Effect.flatMap(Effect.fromOption));
          const restored = yield* declareQueueStack("interrupted-queue").pipe(
            Effect.flatMap((prepared) =>
              ResourceStackOperations.pipe(
                Effect.flatMap((reopened) => reopened.apply(prepared)),
              ),
            ),
            Effect.provide(awsStackOperationsTestLayer),
          );

          assert.isTrue(Exit.hasInterrupts(stopped));
          assert.isTrue(
            Option.isSome(yield* Deferred.poll(pending.interrupted)),
          );
          assert.strictEqual(saved.resources[0]._tag, "Created");
          assert.strictEqual(
            saved.resources[0].node.cloudControlIdentifier,
            "queue-1",
          );
          assert.strictEqual(restored.applied, false);
          assert.deepStrictEqual(restored.outputs, created.outputs);
          assert.deepStrictEqual(restored.outputs, { queueUrl: "queue-1" });
        }).pipe(Effect.scoped),
    );

    it.effect(
      "A configured queue publishes its URL after reviewed creation and unchanged apply, then removes its saved resource on destroy",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const aws = yield* AwsCloudControlFixture;
          const storage = yield* KeyValueStore.KeyValueStore;
          const stack = yield* declareQueueStack("configured-queue");
          const reviewed = yield* operations.planPrepared(stack);

          assert.deepStrictEqual(yield* aws.getRequests(), []);

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

          const created = yield* operations.applyPrepared(reviewed);
          const reused = yield* operations
            .applyPrepared(reviewed)
            .pipe(Effect.flip);
          const unchanged = yield* operations.apply(stack);
          const queueUrl: string = created.outputs.queueUrl;
          const saved = yield* KeyValueStore.toSchemaStore(
            storage,
            EnvironmentStateSchema,
          )
            .get(`${stack.stackName}.json`)
            .pipe(Effect.flatMap(Effect.fromOption));

          assert.strictEqual(created.applied, true);
          assert.strictEqual(queueUrl, "queue-1");
          assert.deepInclude(reused, {
            _tag: "ResourcePlanUnavailable",
            reason: "PlanUsed",
          });
          assert.strictEqual(unchanged.applied, false);
          assert.deepStrictEqual(unchanged.outputs, created.outputs);
          assert.strictEqual(
            saved.resources[0].node.cloudControlIdentifier,
            "queue-1",
          );

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "delete-1" } }),
            Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
          ]);

          const removed = yield* operations.destroy(stack);
          const remaining = yield* KeyValueStore.toSchemaStore(
            storage,
            EnvironmentStateSchema,
          )
            .get(`${stack.stackName}.json`)
            .pipe(Effect.flatMap(Effect.fromOption));

          assert.strictEqual(removed.destroyed, true);
          assert.deepStrictEqual(remaining.resources, []);
        }).pipe(Effect.provide(awsStackOperationsTestLayer)),
    );

    it.effect(
      "A reviewed queue declaration executes after another declaration is prepared for the same stack",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const aws = yield* AwsCloudControlFixture;
          const original = yield* declareQueueStack(
            "reviewed-queue",
            "original-queue",
          );
          const alternative = yield* declareQueueStack(
            "reviewed-queue",
            "alternative-queue",
          );
          const reviewed = yield* operations.planPrepared(original);
          const later = yield* operations.planPrepared(alternative);

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "create-1" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "original-url",
              },
            }),
            Response.json({
              ResourceDescription: {
                Properties:
                  '{"QueueName":"original-queue","QueueUrl":"original-url"}',
              },
            }),
          ]);

          const applied = yield* operations.applyPrepared(reviewed);
          const invalidated = yield* operations
            .applyPrepared(later)
            .pipe(Effect.flip);
          const [created] = yield* aws.requestsFor(createResourceOperation);

          assert.strictEqual(applied.outputs.queueUrl, "original-url");
          assert.include(created.DesiredState, '"original-queue"');
          assert.deepInclude(invalidated, {
            _tag: "ResourcePlanInvalidated",
            stackName: original.stackName,
          });
          assert.strictEqual(
            (yield* aws.requestsFor(createResourceOperation)).length,
            1,
          );
        }).pipe(Effect.provide(awsStackOperationsTestLayer)),
    );

    it.effect(
      "A reopened application restores its configured queue URL without creating another queue",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;

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

          const created = yield* declareQueueStack("restored-queue").pipe(
            Effect.flatMap((prepared) =>
              ResourceStackOperations.pipe(
                Effect.flatMap((operations) => operations.apply(prepared)),
              ),
            ),
            Effect.provide(awsStackOperationsTestLayer),
          );
          const restored = yield* declareQueueStack("restored-queue").pipe(
            Effect.flatMap((prepared) =>
              ResourceStackOperations.pipe(
                Effect.flatMap((operations) => operations.apply(prepared)),
              ),
            ),
            Effect.provide(awsStackOperationsTestLayer),
          );

          assert.strictEqual(created.applied, true);
          assert.strictEqual(restored.applied, false);
          assert.deepStrictEqual(restored.outputs, { queueUrl: "queue-1" });
          assert.strictEqual(
            (yield* aws.requestsFor(createResourceOperation)).length,
            1,
          );
        }),
    );

    it.effect(
      "Another operations instance cannot execute a reviewed queue plan that its owner can still apply",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const aws = yield* AwsCloudControlFixture;
          const stack = yield* declareQueueStack("owned-queue");
          const reviewed = yield* operations.planPrepared(stack);
          const foreign = yield* ResourceStackOperations.pipe(
            Effect.flatMap((other) => other.applyPrepared(reviewed)),
            Effect.flip,
            Effect.provide(Layer.fresh(awsStackOperationsTestLayer)),
          );

          assert.deepInclude(foreign, {
            _tag: "ResourcePlanUnavailable",
            reason: "RuntimeMismatch",
          });
          assert.deepStrictEqual(yield* aws.getRequests(), []);

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

          const applied = yield* operations.applyPrepared(reviewed);

          assert.deepStrictEqual(applied.outputs, { queueUrl: "queue-1" });
        }).pipe(Effect.provide(awsStackOperationsTestLayer)),
    );

    it.effect(
      "Closing an application makes its unused queue plan unavailable before provider mutation",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;
          const retained = yield* ResourceStackOperations.pipe(
            Effect.flatMap((operations) =>
              declareQueueStack("closed-queue").pipe(
                Effect.flatMap(operations.planPrepared),
                Effect.map((reviewed) => ({ operations, reviewed })),
              ),
            ),
            Effect.provide(awsStackOperationsTestLayer),
          );
          const failure = yield* retained.operations
            .applyPrepared(retained.reviewed)
            .pipe(Effect.flip);

          assert.deepInclude(failure, {
            _tag: "ResourcePlanUnavailable",
            reason: "RuntimeClosed",
          });
          assert.deepStrictEqual(yield* aws.getRequests(), []);
        }),
    );
  },
);

layer(stripeConfiguredStackTestLayer, { buildPerTest: true })(
  "Configured billing stack operations",
  (it) => {
    it.effect(
      "A configured billing stack creates a price for its declared product and publishes both provider IDs",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const fixture = yield* StripeLifecycleFixture;
          const storage = yield* KeyValueStore.KeyValueStore;
          const stack = yield* declareBillingStack("configured-billing");

          yield* fixture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* fixture.enqueueResponses("POST", "/v1/prices", [
            Response.json(stripePrice),
          ]);

          const reviewed = yield* operations.planPrepared(stack);
          const applied = yield* operations.applyPrepared(reviewed);
          const unchanged = yield* operations.apply(stack);
          const [request] = yield* fixture.requestsFor("POST", "/v1/prices");
          const requestBody = yield* Effect.promise(() => request.text());
          const saved = yield* KeyValueStore.toSchemaStore(
            storage,
            EnvironmentStateSchema,
          )
            .get(`${stack.stackName}.json`)
            .pipe(Effect.flatMap(Effect.fromOption));

          assert.deepStrictEqual(applied.outputs, {
            productId: stripeProduct.id,
            priceId: stripePrice.id,
          });
          assert.strictEqual(
            new URLSearchParams(requestBody).get("product"),
            stripeProduct.id,
          );
          assert.strictEqual(unchanged.applied, false);
          assert.deepStrictEqual(unchanged.outputs, applied.outputs);
          assert.deepInclude(
            Arr.findFirst(
              saved.resources,
              ({ node }) => node.key.logicalId === "Product",
            ).pipe(
              Option.map(({ node }) => node.outputs),
              Option.getOrUndefined,
            ),
            { ProductId: stripeProduct.id },
          );
          assert.deepInclude(
            Arr.findFirst(
              saved.resources,
              ({ node }) => node.key.logicalId === "MonthlyPrice",
            ).pipe(
              Option.map(({ node }) => node.outputs),
              Option.getOrUndefined,
            ),
            { PriceId: stripePrice.id },
          );
        }).pipe(Effect.provide(stripeStackOperationsTestLayer)),
    );
  },
);
