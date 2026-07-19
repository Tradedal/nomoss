import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Graph, Layer, Option, Schema } from "effect";

import {
  annotateResourceSchema,
  CloudFormationPropertyReferencesAnnotationId,
  resourceOutputRef,
} from "../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../src/core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../src/core/resource/resourceOutputResolver.js";
import { resourceGraphStoreLayer } from "../src/core/runtime/runtimeLayer.js";
import {
  QueueLifecycleService,
  QueuePropsSchema,
  registerQueue,
} from "../src/providers/aws/resources/generated/sqs/queue/index.js";

describe("AWS resource definition compiler", () => {
  it.effect("registers the generated Queue resource in the graph", () =>
    Effect.gen(function* () {
      yield* registerQueue({
        key: { logicalId: "GeneratedQueue" },
        props: { QueueName: "generated-queue" },
      });
      const graphStore = yield* ResourceGraphStore;
      const graph = yield* graphStore.snapshot;
      const resources = Arr.fromIterable(Graph.values(Graph.topo(graph)));

      assert.deepStrictEqual(resources, [
        {
          key: { logicalId: "GeneratedQueue" },
          schema: {
            provider: "aws",
            service: "sqs",
            resource: "queue",
            operation: "create",
            stateSecretOutputKeys: [],
          },
          props: { QueueName: "generated-queue" },
          outputs: {
            QueueUrl: "nomoss:pending:sqs:GeneratedQueue",
            Arn: "nomoss:pending:sqs-arn:GeneratedQueue",
          },
        },
      ]);
    }).pipe(
      Effect.provide(
        Layer.provideMerge(
          Layer.provideMerge(
            Layer.effect(ResourceGraphBuilder, ResourceGraphBuilder.make),
            resourceGraphStoreLayer,
          ),
          Layer.succeed(QueueLifecycleService, {
            resolvePendingOutputs: () =>
              Effect.succeed({
                QueueUrl: "nomoss:pending:sqs:GeneratedQueue",
                Arn: "nomoss:pending:sqs-arn:GeneratedQueue",
              }),
            execute: () =>
              Effect.die(
                "Queue lifecycle execution is not part of graph registration",
              ),
          }),
        ),
      ),
    ),
  );

  it("places KMS targets on the KmsMasterKeyId property schema", () => {
    const property = Option.getOrThrow(
      Arr.findFirst(
        QueuePropsSchema.ast.propertySignatures,
        (signature) => signature.name === "KmsMasterKeyId",
      ),
    );
    const references = Option.getOrThrow(
      Option.fromUndefinedOr(
        property.type.annotations[CloudFormationPropertyReferencesAnnotationId],
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
  });

  it.effect(
    "registers an edge when KmsMasterKeyId receives a resource output reference",
    () =>
      Effect.gen(function* () {
        const graph = yield* ResourceGraphBuilder;
        const key = { logicalId: "EncryptionKey" };
        const keyResource = yield* graph.resource(key);
        const keyPropsSchema = annotateResourceSchema(Schema.Struct({}), {
          provider: "aws",
          service: "kms",
          resource: "key",
          operation: "create",
          stateSecretOutputKeys: [],
        });

        yield* keyResource.register({
          propsSchema: keyPropsSchema,
          outputsSchema: Schema.Struct({ Arn: Schema.String }),
          props: {},
          outputs: { Arn: "arn:aws:kms:us-east-1:123456789012:key/generated" },
        });
        yield* registerQueue({
          key: { logicalId: "GeneratedQueue" },
          props: {
            QueueName: "generated-queue",
            KmsMasterKeyId: resourceOutputRef(key, "Arn"),
          },
        });
        const graphStore = yield* ResourceGraphStore;
        const graphSnapshot = yield* graphStore.snapshot;
        const resources = Arr.fromIterable(
          Graph.values(Graph.topo(graphSnapshot)),
        );
        const resolver = yield* ResourceOutputResolver;
        const dependencies = yield* graphStore.dependencyEdgesOf({
          logicalId: "GeneratedQueue",
        });
        const resolvedQueue = yield* resolver.resolveNode(
          resources[1],
          resources,
          dependencies,
        );

        assert.deepStrictEqual(
          Arr.map(resources, (resource) => resource.key.logicalId),
          ["EncryptionKey", "GeneratedQueue"],
        );
        assert.strictEqual(
          (resolvedQueue.props as { readonly KmsMasterKeyId: string })
            .KmsMasterKeyId,
          "arn:aws:kms:us-east-1:123456789012:key/generated",
        );
      }).pipe(
        Effect.provide(
          Layer.provideMerge(
            Layer.provideMerge(
              Layer.effect(ResourceGraphBuilder, ResourceGraphBuilder.make),
              resourceGraphStoreLayer,
            ),
            Layer.provideMerge(
              Layer.effect(ResourceOutputResolver, ResourceOutputResolver.make),
              Layer.succeed(QueueLifecycleService, {
                resolvePendingOutputs: () =>
                  Effect.succeed({
                    QueueUrl: "nomoss:pending:sqs:GeneratedQueue",
                    Arn: "nomoss:pending:sqs-arn:GeneratedQueue",
                  }),
                execute: () =>
                  Effect.die(
                    "Queue lifecycle execution is not part of graph registration",
                  ),
              }),
            ),
          ),
        ),
      ),
  );
});
