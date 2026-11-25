import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Graph, Layer, Schema } from "effect";
import {
  KeyOutputsSchema,
  KeyPropsSchema,
  registerKey,
} from "nomoss/providers/aws/cloud-control/kms/key";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
  registerQueue,
} from "nomoss/providers/aws/cloud-control/sqs/queue";
import { ResourceModel, ResourceOutput } from "../src/core/resource/model.js";
import {
  ResourceGraphBuilder,
  resourceGraphBuilderLayer,
} from "../src/core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import {
  ResourceOutputResolver,
  resourceOutputResolverLayer,
} from "../src/core/resource/resourceOutputResolver.js";

const awsResourceDeclarationTestLayer = Layer.merge(
  resourceGraphBuilderLayer,
  resourceOutputResolverLayer,
);

layer(awsResourceDeclarationTestLayer, { buildPerTest: true })(
  "Generated AWS resource declarations",
  (it) => {
    it.effect("A queue can use its encryption key's applied ARN", () =>
      Effect.gen(function* () {
        const builder = yield* ResourceGraphBuilder;
        const graph = yield* ResourceGraphStore;
        const resolver = yield* ResourceOutputResolver;
        const key = { logicalId: "EncryptionKey" };
        const declaration = yield* builder.resource(key);

        yield* declaration.register({
          propsSchema: KeyPropsSchema,
          outputsSchema: KeyOutputsSchema,
          props: {},
          outputs: {
            Arn: "arn:aws:kms:us-east-1:123456789012:key/generated",
          },
        });

        yield* registerQueue({
          key: { logicalId: "GeneratedQueue" },
          props: {
            QueueName: "generated-queue",
            KmsMasterKeyId: new ResourceOutput(
              key,
              "Arn",
              Schema.requiredKey(KeyOutputsSchema.fields.Arn),
            ),
          },
        });

        const snapshot = yield* graph.snapshot;
        const resources = Arr.fromIterable(Graph.values(Graph.topo(snapshot)));

        const dependencies = yield* graph.dependencyEdgesOf(snapshot, {
          logicalId: "GeneratedQueue",
        });

        const resolved = yield* resolver.resolveNode(
          resources[1],
          resources,
          dependencies,
        );

        const props = yield* Schema.decodeUnknownEffect(
          Schema.toType(QueuePropsSchema),
        )(resolved.props);

        assert.deepStrictEqual(
          Arr.map(resources, (node) => node.key.logicalId),
          ["EncryptionKey", "GeneratedQueue"],
        );
        assert.strictEqual(
          props.KmsMasterKeyId,
          "arn:aws:kms:us-east-1:123456789012:key/generated",
        );
      }),
    );

    it.effect(
      "KMS policies can reference a queue ARN inside nested conditions",
      () =>
        Effect.gen(function* () {
          const model = yield* ResourceModel;
          const graph = yield* ResourceGraphStore;
          const resolver = yield* ResourceOutputResolver;
          const source = yield* registerQueue({
            key: { logicalId: "SourceQueue" },
            props: { QueueName: "source" },
          });

          const policy = <Arn extends string | ResourceOutput<string>>(
            arn: Arn,
          ) => ({
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: { Service: "sqs.amazonaws.com" },
                Action: ["kms:Decrypt", "kms:GenerateDataKey"],
                Resource: "*",
                Condition: {
                  StringEquals: { "kms:EncryptionContext:queue.arn": [arn] },
                },
              },
            ],
          });

          yield* registerKey({
            key: { logicalId: "EncryptionKey" },
            props: {
              KeyPolicy: policy(
                new ResourceOutput(
                  source.key,
                  "Arn",
                  Schema.requiredKey(QueueOutputsSchema.fields.Arn),
                ),
              ),
            },
          });

          const snapshot = yield* graph.snapshot;
          const [queue, key] = Arr.fromIterable(
            Graph.values(Graph.topo(snapshot)),
          );

          const appliedQueue = yield* model.withOutputs(queue, {
            Arn: "arn:aws:sqs:us-east-1:123456789012:source",
          });

          const dependencies = yield* graph.dependencyEdgesOf(
            snapshot,
            key.key,
          );

          const resolved = yield* resolver.resolveNode(
            key,
            [appliedQueue],
            dependencies,
          );

          assert.strictEqual(dependencies.length, 1);
          assert.deepStrictEqual(resolved.props, {
            KeyPolicy: policy("arn:aws:sqs:us-east-1:123456789012:source"),
          });
        }),
    );
  },
);
