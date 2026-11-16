import { assert, layer } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { expectTypeOf } from "vitest";
import {
  ResourceModel,
  ResourceOutput,
  ResourceOutputSchema,
} from "../src/core/resource/model.js";
import {
  ResourceOutputResolver,
  resourceOutputResolverLayer,
} from "../src/core/resource/resourceOutputResolver.js";
import {
  KeyOutputsSchema,
  KeyPropsSchema,
} from "../src/providers/aws/resources/generated/kms/key/index.js";
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

  it.effect("The applied queue ARN is available to dependent resources", () =>
    Effect.gen(function* () {
      const model = yield* ResourceModel;
      const resolver = yield* ResourceOutputResolver;
      const queue = yield* model.nodeFromResource(queueInput);

      const arn = yield* resolver.resolveOutput(
        new ResourceOutput(queue.key, "Arn", Schema.String),
        [queue],
      );

      expectTypeOf(arn).toEqualTypeOf<string>();
      expectTypeOf<ResourceOutput<number>>().not.toExtend<
        ResourceOutput<string>
      >();
      expectTypeOf<ResourceOutput<string>>().not.toHaveProperty("source");
      expectTypeOf<ResourceOutput<string>>().not.toHaveProperty("property");
      assert.strictEqual(arn, queueInput.outputs.Arn);
    }),
  );

  it.effect(
    "Saved queue inputs restore their encryption-key output and resolve its applied value",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const resolver = yield* ResourceOutputResolver;
        const keyArn = "arn:aws:kms:us-east-1:123456789012:key/encryption-key";
        const key = yield* model.nodeFromResource({
          key: { logicalId: "EncryptionKey" },
          propsSchema: KeyPropsSchema,
          outputsSchema: KeyOutputsSchema,
          props: {},
          outputs: { Arn: keyArn },
        });
        const declared = yield* model.nodeFromResource({
          key: { logicalId: "EncryptedQueue" },
          propsSchema: QueuePropsSchema,
          outputsSchema: QueueOutputsSchema,
          props: {
            KmsMasterKeyId: new ResourceOutput(
              key.key,
              "Arn",
              Schema.requiredKey(KeyOutputsSchema.fields.Arn),
            ),
          },
        });
        const restored = yield* model.decodeProps(declared, QueuePropsSchema);
        const encryptionKey = yield* Schema.decodeUnknownEffect(
          ResourceOutputSchema(Schema.String),
        )(restored.KmsMasterKeyId);
        const arn = yield* resolver.resolveOutput(encryptionKey, [key]);

        expectTypeOf(arn).toEqualTypeOf<string>();
        assert.strictEqual(arn, keyArn);
        assert.deepStrictEqual(declared.props, {
          KmsMasterKeyId: {
            _tag: "ResourceOutputRef",
            source: key.key,
            property: "Arn",
          },
        });
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
      assert.deepStrictEqual(missingSource, missingField);
    }),
  );

  it.effect("A reference to a missing bucket tag is rejected", () =>
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
