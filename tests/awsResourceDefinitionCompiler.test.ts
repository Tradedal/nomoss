import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Graph, Option, Schema } from "effect";
import {
  CloudFormationPropertyReferencesAnnotationId,
  ResourceModel,
  ResourceOutput,
} from "../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../src/core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../src/core/resource/resourceOutputResolver.js";
import {
  KeyOutputsSchema,
  KeyPropsSchema,
  registerKey,
} from "../src/providers/aws/resources/generated/kms/key/index.js";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
  QueueResourceSchema,
  registerQueue,
} from "../src/providers/aws/resources/generated/sqs/queue/index.js";
import { awsResourceDeclarationTestLayer } from "./support/awsResourceDefinitionFixture.js";

layer(awsResourceDeclarationTestLayer, { buildPerTest: true })(
  "Generated AWS resource declarations",
  (it) => {
    it.effect(
      "A declared queue keeps its configured properties and AWS resource type",
      () =>
        Effect.gen(function* () {
          const graph = yield* ResourceGraphStore;
          const declaration = yield* registerQueue({
            key: { logicalId: "GeneratedQueue" },
            props: { QueueName: "generated-queue" },
          });

          const snapshot = yield* graph.snapshot;

          const resources = Arr.fromIterable(
            Graph.values(Graph.topo(snapshot)),
          );

          assert.strictEqual(resources.length, 1);
          assert.deepStrictEqual(resources[0].key, declaration.key);
          assert.deepStrictEqual(resources[0].schema, QueueResourceSchema);
          assert.deepStrictEqual(resources[0].props, {
            QueueName: "generated-queue",
          });
        }),
    );

    it.effect("Concurrent declarations keep all 128 queues", () =>
      Effect.gen(function* () {
        const graph = yield* ResourceGraphStore;

        yield* Effect.forEach(
          Arr.range(1, 128),
          (index) =>
            registerQueue({
              key: { logicalId: `Queue${index}` },
              props: { QueueName: `queue-${index}` },
            }),
          { concurrency: 16, discard: true },
        );

        const logicalIds = yield* graph.topologicalLogicalIds;

        assert.strictEqual(logicalIds.length, 128);
        assert.strictEqual(new Set(logicalIds).size, 128);
      }),
    );

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

    it.effect(
      "The queue encryption setting identifies the KMS resources it can reference",
      () =>
        Effect.sync(() => {
          const references = Option.getOrThrow(
            Option.fromUndefinedOr(
              Schema.resolveAnnotations(
                QueuePropsSchema.fields.KmsMasterKeyId,
              )?.[CloudFormationPropertyReferencesAnnotationId],
            ),
          );

          assert.deepStrictEqual(references, [
            {
              targetCloudFormationType: "AWS::KMS::Key",
              targetPropertyPath: "/properties/Arn",
            },
            {
              targetCloudFormationType: "AWS::KMS::Key",
              targetPropertyPath: "/properties/KeyId",
            },
            {
              targetCloudFormationType: "AWS::KMS::Alias",
              targetPropertyPath: "/properties/AliasName",
            },
          ]);
        }),
    );
  },
);
