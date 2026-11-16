import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Match, Schema } from "effect";
import { ResourceOutput } from "../src/core/resource/model.js";

import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceStackLifecycle } from "../src/core/stack/resourceStackLifecycle.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import {
  createResourceOperation,
  deleteResourceOperation,
  updateResourceOperation,
} from "../src/providers/aws/client/generated/cloudControl.js";
import {
  KeyOutputsSchema,
  registerKey,
} from "../src/providers/aws/resources/generated/kms/key/index.js";
import {
  QueuePropsSchema,
  registerQueue,
} from "../src/providers/aws/resources/generated/sqs/queue/index.js";
import {
  AwsCloudControlFixture,
  awsCloudControlStackTestLayer,
} from "./support/awsCloudControlFixture.js";

layer(awsCloudControlStackTestLayer, { buildPerTest: true })(
  "ResourceStackLifecycle with AWS resources",
  (it) => {
    it.effect(
      "Invalid key outputs prevent the dependent queue from being created",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const key = yield* registerKey({
            key: { logicalId: "EncryptionKey" },
            props: {},
          });

          yield* registerQueue({
            key: { logicalId: "Queue" },
            props: {
              QueueName: "blocked-queue",
              KmsMasterKeyId: new ResourceOutput(
                key.key,
                "Arn",
                Schema.requiredKey(KeyOutputsSchema.fields.Arn),
              ),
            },
          });

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "create-key" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "invalid-key",
              },
            }),
            Response.json({
              ResourceDescription: {
                Properties: '{"KeyId":"invalid-key","Arn":42}',
              },
            }),
          ]);

          const prepared = yield* lifecycle.prepare("invalid-outputs");
          const failure = yield* lifecycle.apply(prepared).pipe(Effect.flip);
          const createdResources = yield* aws.requestsFor(
            createResourceOperation,
          );

          const states =
            yield* stateStore.loadResourceStates("invalid-outputs");

          const keyState = yield* Arr.findFirst(
            states,
            (state) => state.node.key.logicalId === key.key.logicalId,
          ).pipe(Effect.fromOption);

          assert.strictEqual(failure._tag, "ResourceCommandExecutionFailed");
          assert.deepStrictEqual(
            Arr.map(createdResources, (input) => input.TypeName),
            ["AWS::KMS::Key"],
          );
          assert.strictEqual(
            Match.value(keyState).pipe(
              Match.tag("Creating", ({ lastFailure }) => lastFailure?.errorTag),
              Match.orElse(() => undefined),
            ),
            "SchemaError",
          );
        }),
    );

    it.effect(
      "Queue updates keep resource identities and teardown removes the queue before its key",
      () =>
        Effect.gen(function* () {
          const aws = yield* AwsCloudControlFixture;
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;

          const key = yield* registerKey({
            key: { logicalId: "EncryptionKey" },
            props: {},
          });

          const queue = yield* registerQueue({
            key: { logicalId: "Queue" },
            props: {
              QueueName: "workflow-queue",
              DelaySeconds: 0,
              KmsMasterKeyId: new ResourceOutput(
                key.key,
                "Arn",
                Schema.requiredKey(KeyOutputsSchema.fields.Arn),
              ),
            },
          });

          const keyArn = "arn:aws:kms:us-east-1:123456789012:key/workflow-key";
          const queueUrl =
            "https://sqs.us-east-1.amazonaws.com/123456789012/workflow-queue";
          const keyProperties = yield* Schema.encodeEffect(
            Schema.fromJsonString(Schema.Json),
          )({ KeyId: "workflow-key", Arn: keyArn });
          const queueProperties = yield* Schema.encodeEffect(
            Schema.fromJsonString(Schema.Json),
          )({
            QueueName: "workflow-queue",
            DelaySeconds: 0,
            KmsMasterKeyId: keyArn,
            QueueUrl: queueUrl,
          });

          const updatedProperties = yield* Schema.encodeEffect(
            Schema.fromJsonString(Schema.Json),
          )({
            QueueName: "workflow-queue",
            DelaySeconds: 5,
            KmsMasterKeyId: keyArn,
            QueueUrl: queueUrl,
          });

          const prepared = yield* lifecycle.prepare("workflow");

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "create-key" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "workflow-key",
              },
            }),
            Response.json({
              ResourceDescription: { Properties: keyProperties },
            }),
            Response.json({ ProgressEvent: { RequestToken: "create-queue" } }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: queueUrl,
              },
            }),
            Response.json({
              ResourceDescription: { Properties: queueProperties },
            }),
          ]);

          yield* lifecycle.apply(prepared);
          const createdResources = yield* aws.requestsFor(
            createResourceOperation,
          );

          const createQueue = yield* Arr.findFirst(
            createdResources,
            (input) => input.TypeName === "AWS::SQS::Queue",
          ).pipe(Effect.fromOption);

          const sentProps = yield* Schema.decodeEffect(
            Schema.fromJsonString(QueuePropsSchema),
          )(createQueue.DesiredState);

          assert.strictEqual(sentProps.KmsMasterKeyId, keyArn);
          assert.strictEqual(queue.outputs.QueueUrl, queueUrl);

          const savedAfterCreate = yield* stateStore.loadResources("workflow");

          assert.deepStrictEqual(
            Arr.map(savedAfterCreate, (node) => node.cloudControlIdentifier),
            ["workflow-key", queueUrl],
          );

          yield* graph.reset;

          const declaredKey = yield* registerKey({ key: key.key, props: {} });
          yield* registerQueue({
            key: queue.key,
            props: {
              QueueName: "workflow-queue",
              DelaySeconds: 5,
              KmsMasterKeyId: new ResourceOutput(
                declaredKey.key,
                "Arn",
                Schema.requiredKey(KeyOutputsSchema.fields.Arn),
              ),
            },
          });

          const changed = yield* lifecycle.prepare("workflow");

          yield* aws.enqueueResponses([
            Response.json({
              ResourceDescription: { Properties: keyProperties },
            }),
            Response.json({
              ResourceDescription: { Properties: queueProperties },
            }),
          ]);

          const reconciled = yield* lifecycle.reconcile(changed);

          assert.deepStrictEqual(reconciled.missing, []);
          assert.deepStrictEqual(
            Arr.map(
              reconciled.resources,
              (node) => node.cloudControlIdentifier,
            ),
            ["workflow-key", queueUrl],
          );

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "update-queue" } }),
            Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
            Response.json({
              ResourceDescription: { Properties: updatedProperties },
            }),
          ]);

          yield* lifecycle.apply(changed);
          const updates = yield* aws.requestsFor(updateResourceOperation);

          const update = yield* Arr.head(updates).pipe(Effect.fromOption);

          assert.strictEqual(update.Identifier, queueUrl);
          assert.deepStrictEqual(
            yield* Schema.decodeEffect(Schema.fromJsonString(Schema.Json))(
              update.PatchDocument,
            ),
            [{ op: "replace", path: "/DelaySeconds", value: 5 }],
          );
          assert.strictEqual(queue.outputs.QueueUrl, queueUrl);

          const savedAfterUpdate = yield* stateStore.loadResources("workflow");

          assert.deepStrictEqual(
            Arr.map(savedAfterUpdate, (node) => node.cloudControlIdentifier),
            ["workflow-key", queueUrl],
          );

          const savedQueue = yield* Arr.findFirst(
            savedAfterUpdate,
            (node) => node.key.logicalId === queue.key.logicalId,
          ).pipe(Effect.fromOption);

          assert.deepStrictEqual(savedQueue.props, {
            QueueName: "workflow-queue",
            DelaySeconds: 5,
            KmsMasterKeyId: keyArn,
          });

          const unchanged = yield* lifecycle.plan(changed);

          assert.deepStrictEqual(unchanged.plan.createOrUpdate, []);
          assert.deepStrictEqual(unchanged.plan.delete, []);

          yield* aws.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "delete-queue" } }),
            Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
            Response.json({ ProgressEvent: { RequestToken: "delete-key" } }),
            Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
          ]);

          yield* lifecycle.destroy(changed);

          const deleted = yield* aws.requestsFor(deleteResourceOperation);

          assert.deepStrictEqual(
            Arr.map(deleted, (input) => input.Identifier),
            [queueUrl, "workflow-key"],
          );
          assert.deepStrictEqual(
            yield* stateStore.loadResources("workflow"),
            [],
          );
        }),
    );
  },
);
