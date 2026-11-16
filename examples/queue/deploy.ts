import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Effect, Layer, Option } from "effect";
import {
  localState,
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "nomoss/core";
import { AwsRegion, awsCloudControlStackLayerLive } from "nomoss/providers/aws";
import { queueStack, queueStackDefinition } from "./stack.js";

const queueApplicationLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(awsCloudControlStackLayerLive),
  Layer.provide(localState()),
  Layer.provide(Layer.succeed(AwsRegion, Option.some(queueStack.region))),
  Layer.provide(NodeServices.layer),
);

NodeRuntime.runMain(
  Effect.gen(function* () {
    const operations = yield* ResourceStackOperations;
    const prepared = yield* queueStackDefinition;
    const result = yield* operations.apply(prepared);
    yield* Console.log(result.outputs);
    const queueUrl: string = result.outputs.queueUrl;
    return queueUrl;
  }).pipe(Effect.provide(queueApplicationLayer)),
);
