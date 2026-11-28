import { Array as Arr, Context, Effect, Layer, Option, Schema } from "effect";
import { Digest } from "effect/crypto";
import {
  type ResourceNode,
  resourceGeneration,
} from "../../../src/core/resource/model.js";
import { ResourceCommandStackName } from "../../../src/core/resource/resourceCommandPolicy.js";

/**
 * The AwsResourceMapping service gives stack commands repeatable names when
 * the declaration omits a name. A retry can address the same resource name
 * if the first request reached AWS before the stack could save the result.
 *
 * @see ../../../docs/application/aws-resource-lifecycle-management.md (Resource policy and recovery)
 */
export class AwsResourceMapping extends Context.Service<AwsResourceMapping>()(
  "nomoss/providers/aws/management/resourceMapping/AwsResourceMapping",
  {
    make: Effect.gen(function* () {
      const digest = yield* Digest.Digest;

      const json = Schema.fromJsonString(Schema.Json);

      /**
       * The identityHash service method returns a hash scoped to the named stack
       * and the resource's logical ID. Pass the identity values in the same order
       * on retry to reproduce that hash.
       *
       * @see ../../../refs/effect/packages/effect/src/crypto/Digest.ts (digestHex)
       */
      const identityHash = Effect.fn("AwsResourceMapping.identityHash")(
        function* (node: ResourceNode, identity: ReadonlyArray<Schema.Json>) {
          const owner = yield* ResourceCommandStackName.pipe(
            Effect.flatMap(Effect.fromOption),
          );

          const key = Arr.appendAll([owner, node.key.logicalId], identity);
          const seed = yield* Schema.encodeEffect(json)(key);

          const hash: string = yield* digest.digestHex(
            Digest.sha256,
            new TextEncoder().encode(seed),
          );

          return hash;
        },
      );

      /**
       * The resolveName service method returns an explicit name verbatim. If you
       * omit the name, the method uses the resource generation and fits the result
       * to the supplied length limit. A retry uses the same generation; a
       * replacement uses a new one.
       *
       * @see ../../../docs/application/resource-operations.md (Create and replace a resource)
       */
      const resolveName = Effect.fn("AwsResourceMapping.resolveName")(
        function* (
          node: ResourceNode,
          name: string | undefined,
          maximumLength: number,
        ) {
          const explicitName = Option.fromUndefinedOr(name);

          return yield* Option.match(explicitName, {
            onSome: Effect.succeed,
            onNone: Effect.fnUntraced(function* () {
              const generation = resourceGeneration(node);
              const hash = yield* identityHash(node, [generation]);
              return `nomoss-${hash}`.substring(0, maximumLength);
            }),
          });
        },
      );

      return { resolveName };
    }),
  },
) {}

export const awsResourceMappingLayer = Layer.effect(
  AwsResourceMapping,
  AwsResourceMapping.make,
);
