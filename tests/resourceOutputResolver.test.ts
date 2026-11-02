import { assert, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  ResourceModel,
  resourceOutputRef,
} from "../src/core/resource/model.js";
import {
  ResourceOutputResolver,
  resourceOutputResolverLayer,
} from "../src/core/resource/resourceOutputResolver.js";
import {
  BucketOutputsSchema,
  BucketPropsSchema,
} from "../src/providers/aws/resources/generated/s3/bucket/index.js";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "../src/providers/aws/resources/generated/sqs/queue/index.js";

const queueInput = {
  key: { logicalId: "SourceQueue" },
  propsSchema: QueuePropsSchema,
  outputsSchema: QueueOutputsSchema,
  props: { QueueName: "source-queue" },
  outputs: { Arn: "arn:aws:sqs:us-east-1:123456789012:source-queue" },
};

layer(resourceOutputResolverLayer, {
  buildPerTest: true,
})("ResourceOutputResolver", (it) => {
  it.effect(
    "puts the queue ARN in a bucket tag and keeps the bucket's identifier and outputs",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const resolver = yield* ResourceOutputResolver;

        const queue = yield* model.nodeFromResource(queueInput);

        const bucket = yield* model.nodeFromResource({
          key: { logicalId: "TaggedBucket" },
          propsSchema: BucketPropsSchema,
          outputsSchema: BucketOutputsSchema,
          props: { Tags: [{ Key: "queue", Value: "pending" }] },
          outputs: {},
        });

        const resolved = yield* resolver.resolveNode(
          { ...bucket, cloudControlIdentifier: "managed-bucket" },
          [queue],
          [
            {
              source: queue.key,
              target: bucket.key,
              edge: {
                kind: "property",
                property: ["Tags", "0", "Value"],
                sourceProperty: "Arn",
              },
            },
            {
              source: { logicalId: "AbsentResource" },
              target: { logicalId: "OtherBucket" },
              edge: {
                kind: "property",
                property: ["Tags"],
                sourceProperty: "Arn",
              },
            },
            {
              source: { logicalId: "OrderingOnly" },
              target: bucket.key,
              edge: { kind: "prerequisite", reason: "Provider setup" },
            },
          ],
        );

        assert.deepStrictEqual(resolved.props, {
          Tags: [
            {
              Key: "queue",
              Value: "arn:aws:sqs:us-east-1:123456789012:source-queue",
            },
          ],
        });
        assert.strictEqual(resolved.cloudControlIdentifier, "managed-bucket");
        assert.deepStrictEqual(resolved.outputs, bucket.outputs);
      }),
  );

  it.effect("reads the applied queue ARN as a string", () =>
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const resolver = yield* ResourceOutputResolver;
      const queue = yield* model.nodeFromResource(queueInput);

      const arn = yield* resolver.resolveOutput(
        resourceOutputRef(queue.key, "Arn"),
        [queue],
        Schema.String,
      );

      assert.strictEqual(arn, queueInput.outputs.Arn);
    }),
  );

  it.effect("fails if the source queue or its Arn output is missing", () =>
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const resolver = yield* ResourceOutputResolver;
      const queue = yield* model.nodeFromResource({
        ...queueInput,
        outputs: {},
      });

      const reference = resourceOutputRef(queue.key, "Arn");

      const missingSource = yield* resolver
        .resolveOutput(reference, [], Schema.String)
        .pipe(Effect.flip);
      const missingField = yield* resolver
        .resolveOutput(reference, [queue], Schema.String)
        .pipe(Effect.flip);

      assert.strictEqual(missingSource._tag, "ResourceOutputResolutionMissing");
      assert.strictEqual(missingField._tag, "ResourceOutputResolutionMissing");
      assert.deepStrictEqual(missingSource, missingField);
    }),
  );

  it.effect(
    "fails when the dependency points to a tag that is absent from the resource's props",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const resolver = yield* ResourceOutputResolver;
        const queue = yield* model.nodeFromResource(queueInput);

        const failure = yield* resolver
          .resolveNode(
            queue,
            [queue],
            [
              {
                source: queue.key,
                target: queue.key,
                edge: {
                  kind: "property",
                  property: ["Tags", "0", "Value"],
                  sourceProperty: "Arn",
                },
              },
            ],
          )
          .pipe(Effect.flip);

        assert.strictEqual(failure._tag, "ResourceOutputPropertyPathInvalid");
      }),
  );
});
