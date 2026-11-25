import { Effect, Layer, Option } from "effect";
import { FetchHttpClient } from "effect/http";
import { localState } from "nomoss/core";
import {
  AwsProviderLive,
  AwsRegion,
  awsClientConfigLayer,
} from "nomoss/providers/aws";
import { AWSQueue } from "nomoss/providers/aws/sqs/queue";

const awsRegion = Layer.succeed(AwsRegion, Option.some("us-east-1"));
const awsConfig = awsClientConfigLayer.pipe(Layer.provide(awsRegion));

export const queueStack = {
  name: "native-queue",
  providers: AwsProviderLive.pipe(
    Layer.provide([awsConfig, FetchHttpClient.layer]),
  ),
  state: localState(),
  resources: Effect.gen(function* () {
    const queue = yield* AWSQueue({
      logicalId: "Queue",
      props: {
        QueueName: "nomoss-native-sqs-example",
        VisibilityTimeout: 30,
      },
    });

    return () => ({ queueUrl: queue.QueueUrl });
  }),
};
