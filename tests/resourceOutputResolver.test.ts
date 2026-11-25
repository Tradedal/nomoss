import { assert, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  BucketOutputsSchema,
  BucketPropsSchema,
} from "nomoss/providers/aws/cloud-control/s3/bucket";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "nomoss/providers/aws/cloud-control/sqs/queue";
import { ResourceModel, ResourceOutput } from "../src/core/resource/model.js";
import {
  ResourceOutputResolver,
  resourceOutputResolverLayer,
} from "../src/core/resource/resourceOutputResolver.js";

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
    "A bucket tag receives its queue's ARN without losing the bucket's identity",
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

  it.effect("A missing queue ARN prevents output resolution", () =>
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const resolver = yield* ResourceOutputResolver;
      const queue = yield* model.nodeFromResource({
        ...queueInput,
        outputs: {},
      });

      const reference = new ResourceOutput(queue.key, "Arn", Schema.String);

      const missingSource = yield* resolver
        .resolveOutput(reference, [], Schema.String)
        .pipe(Effect.flip);
      const missingField = yield* resolver
        .resolveOutput(reference, [queue], Schema.String)
        .pipe(Effect.flip);

      assert.strictEqual(missingSource._tag, "ResourceOutputResolutionMissing");
      assert.strictEqual(missingField._tag, "ResourceOutputResolutionMissing");
    }),
  );

  it.effect("A reference to a missing bucket tag is rejected", () =>
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const resolver = yield* ResourceOutputResolver;
      const queue = yield* model.nodeFromResource(queueInput);
      const bucket = yield* model.nodeFromResource({
        key: { logicalId: "Bucket" },
        propsSchema: BucketPropsSchema,
        outputsSchema: BucketOutputsSchema,
        props: { Tags: [] },
        outputs: {},
      });

      const failure = yield* resolver
        .resolveNode(
          bucket,
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
          ],
        )
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, "ResourceOutputPropertyPathInvalid");
    }),
  );
});
