import { Effect, Layer } from "effect";
import {
  ResourceModel,
  type ResourceNode,
} from "../../src/core/resource/model.js";
import { resourceGraphBuilderLayer } from "../../src/core/resource/resourceGraphBuilder.js";
import { resourceOutputResolverLayer } from "../../src/core/resource/resourceOutputResolver.js";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "../../src/providers/aws/resources/generated/sqs/queue/index.js";

/**
 * awsResourceDeclarationTestLayer supplies the shared graph and output schemas
 * for generated resource declarations. Declaration and reference resolution
 * use production services and do not require AWS configuration or transport.
 */
export const awsResourceDeclarationTestLayer = Layer.merge(
  resourceGraphBuilderLayer,
  resourceOutputResolverLayer,
);

/**
 * cloudControlQueue constructs a validated queue node for direct provider
 * operation tests. Its output schema is registered through the same model
 * operation used by resource declarations, independently of HTTP test setup.
 */
export const cloudControlQueue = Effect.gen(function* () {
  const model = yield* ResourceModel;

  const node: ResourceNode = yield* model.nodeFromResource({
    key: { logicalId: "TestQueue" },
    propsSchema: QueuePropsSchema,
    outputsSchema: QueueOutputsSchema,
    props: { QueueName: "first" },
    outputs: {},
  });

  return node;
});
