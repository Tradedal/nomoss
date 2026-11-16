import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Graph, Layer, Match } from "effect";
import { KeyValueStore } from "effect/persistence";
import { ResourceModel } from "../src/core/resource/model.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../src/core/resource/resourceOutputResolver.js";
import { resourceStackRuntimeLayer } from "../src/core/runtime/stackRuntimeLayer.js";
import {
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../src/core/state/stateSecretService.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import { declareAWSBucket } from "../src/providers/aws/resources/generated/native/s3/bucket/index.js";
import { declareAWSTopic } from "../src/providers/aws/resources/generated/native/sns/topic/index.js";
import { declareAWSQueue } from "../src/providers/aws/resources/generated/native/sqs/queue/index.js";
import { providerResourceCommandPolicyLayerLive } from "../src/providers/resourceCommandPolicyLayer.js";

const declarationLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(resourceStackRuntimeLayer),
  Layer.provide(providerResourceCommandPolicyLayerLive),
  Layer.provide(StateSecretServiceDefaultLayer),
  Layer.provideMerge(KeyValueStore.layerMemory),
);

const declareNotifications = Effect.fn(
  "NativeResourceIntegration.declareNotifications",
)(function* (queueName: string) {
  const operations = yield* ResourceStackOperations;

  yield* operations.beginDeclaration("native-notifications");

  const queue = yield* declareAWSQueue({
    logicalId: "Events",
    props: { QueueName: queueName, VisibilityTimeout: 45 },
  });
  const topic = yield* declareAWSTopic({
    logicalId: "Broadcasts",
    props: {
      TopicName: "native-broadcasts",
      Subscription: [{ Protocol: "sqs", Endpoint: queue }],
    },
  });
  const bucket = yield* declareAWSBucket({
    logicalId: "Uploads",
    props: {
      BucketName: "native-uploads",
      LifecycleConfiguration: {
        Rules: [
          { Id: "ExpireUploads", Status: "Enabled", ExpirationInDays: 7 },
        ],
      },
      NotificationConfiguration: {
        QueueConfigurations: [{ Event: "s3:ObjectCreated:*", Queue: queue }],
        TopicConfigurations: [{ Event: "s3:ObjectRemoved:*", Topic: topic }],
      },
    },
  });

  const prepared = yield* operations.prepare("native-notifications", () => ({
    queueUrl: queue.QueueUrl,
    queueArn: queue.Arn,
    topicArn: topic.TopicArn,
    bucketArn: bucket.Arn,
  }));

  return prepared;
}, Effect.scoped);

layer(declarationLayer, { buildPerTest: true })(
  "Generated native AWS resource declarations",
  (it) => {
    it.effect(
      "A notification stack resolves resource entities and plans replacement of a renamed queue",
      () =>
        Effect.gen(function* () {
          const operations = yield* ResourceStackOperations;
          const model = yield* ResourceModel;
          const graph = yield* ResourceGraphStore;
          const resolver = yield* ResourceOutputResolver;
          const state = yield* ResourceStateStore;
          const prepared = yield* declareNotifications("native-events-v1");
          const plan = yield* operations.planPrepared(prepared);

          assert.deepStrictEqual(
            Arr.map(
              Arr.flatten(plan.plan.createOrUpdate),
              (action) => action.node.key.logicalId,
            ),
            ["Events", "Broadcasts", "Uploads"],
          );

          const resources = Arr.fromIterable(
            Graph.values(Graph.topo(prepared.desired)),
          );
          const queue = yield* Arr.findFirst(
            resources,
            (node) => node.key.logicalId === "Events",
          ).pipe(Effect.fromOption);
          const topic = yield* Arr.findFirst(
            resources,
            (node) => node.key.logicalId === "Broadcasts",
          ).pipe(Effect.fromOption);
          const bucket = yield* Arr.findFirst(
            resources,
            (node) => node.key.logicalId === "Uploads",
          ).pipe(Effect.fromOption);
          const queueArn =
            "arn:aws:sqs:us-east-1:123456789012:native-events-v1";
          const queueUrl =
            "https://sqs.us-east-1.amazonaws.com/123456789012/native-events-v1";
          const topicArn =
            "arn:aws:sns:us-east-1:123456789012:native-broadcasts";
          const bucketArn = "arn:aws:s3:::native-uploads";

          const appliedQueue = yield* model.withOutputs(queue, {
            QueueName: "native-events-v1",
            VisibilityTimeout: 45,
            QueueUrl: queueUrl,
            Arn: queueArn,
          });
          const topicDependencies = yield* graph.dependencyEdgesOf(
            prepared.desired,
            topic.key,
          );
          const resolvedTopic = yield* resolver.resolveNode(
            topic,
            [appliedQueue],
            topicDependencies,
          );
          const appliedTopic = yield* model.withOutputs(resolvedTopic, {
            TopicArn: topicArn,
          });
          const bucketDependencies = yield* graph.dependencyEdgesOf(
            prepared.desired,
            bucket.key,
          );
          const resolvedBucket = yield* resolver.resolveNode(
            bucket,
            [appliedQueue, appliedTopic],
            bucketDependencies,
          );
          const appliedBucket = yield* model.withOutputs(resolvedBucket, {
            Arn: bucketArn,
          });

          assert.deepStrictEqual(resolvedTopic.props, {
            TopicName: "native-broadcasts",
            Subscription: [{ Protocol: "sqs", Endpoint: queueArn }],
          });
          assert.deepStrictEqual(resolvedBucket.props, {
            BucketName: "native-uploads",
            LifecycleConfiguration: {
              Rules: [
                { Id: "ExpireUploads", Status: "Enabled", ExpirationInDays: 7 },
              ],
            },
            NotificationConfiguration: {
              QueueConfigurations: [
                { Event: "s3:ObjectCreated:*", Queue: queueArn },
              ],
              TopicConfigurations: [
                { Event: "s3:ObjectRemoved:*", Topic: topicArn },
              ],
            },
          });

          yield* state.saveResources("native-notifications", [
            appliedQueue,
            appliedTopic,
            appliedBucket,
          ]);

          assert.deepStrictEqual(prepared.output(), {
            queueUrl,
            queueArn,
            topicArn,
            bucketArn,
          });

          const changed = yield* declareNotifications("native-events-v2");
          const replacementPlan = yield* operations.planPrepared(changed);
          const replacement = yield* Arr.findFirst(
            Arr.flatten(replacementPlan.plan.createOrUpdate),
            (action) => action.node.key.logicalId === "Events",
          ).pipe(Effect.fromOption);
          const changes = Match.value(replacement).pipe(
            Match.tag("Replace", ({ operations }) =>
              Arr.map(operations, (operation) => operation._tag),
            ),
            Match.orElse(() =>
              assert.fail(
                "Renaming the queue must replace its provider resource",
              ),
            ),
          );

          assert.deepStrictEqual(changes, ["Create", "Destroy"]);
          assert.deepStrictEqual(
            Arr.map(
              Arr.flatten(replacementPlan.plan.createOrUpdate),
              (action) => action.node.key.logicalId,
            ),
            ["Events", "Broadcasts", "Uploads"],
          );
        }),
    );
  },
);
