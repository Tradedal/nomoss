import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as NodeServices from "@effect/platform-node/NodeServices";
import { Effect, Layer } from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import { AwsCloudControlClientGenerator } from "./awsCloudControl/AwsCloudControlClientGenerator.js";

Effect.gen(function* () {
  const generator = yield* AwsCloudControlClientGenerator;
  const classpath = yield* generator.prepareConverter("tools/awsCloudControl");
  const model = yield* generator.readModel({
    modelPath:
      process.argv[2] ??
      "refs/aws-api-models/models/cloudcontrol/service/2021-09-30/cloudcontrol-2021-09-30.json",
    converterDirectory: "tools/awsCloudControl",
    classpath,
  });
  const source = yield* generator.renderClient(model);
  yield* generator.publishClient({
    outputPath:
      process.argv[3] ?? "src/providers/aws/client/generated/cloudControl.ts",
    source,
  });
}).pipe(
  Effect.provide(
    Layer.effect(
      AwsCloudControlClientGenerator,
      AwsCloudControlClientGenerator.make,
    ).pipe(
      Layer.provide(Layer.merge(NodeServices.layer, FetchHttpClient.layer)),
    ),
  ),
  NodeRuntime.runMain,
);
