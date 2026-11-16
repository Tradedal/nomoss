import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { awsServiceResourceGenerationLayer } from "./awsServiceResources/generationLayer.js";
import { AwsServiceOperationGeneration } from "./awsServiceResources/operationGeneration.js";
import { AwsServiceResourceSources } from "./awsServiceResources/sourcePreparation.js";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

// Source verification, Smithy conversion, and publication use the command's
// shared platform services. Conversion files remain scoped to each rendering.
const generationLayer = Layer.merge(
  awsServiceResourceGenerationLayer,
  typeScriptModulePublisherLayer,
).pipe(
  Layer.provide([
    NodeServices.layer,
    NodeCrypto.layerDigest,
    FetchHttpClient.layer,
  ]),
);

Effect.gen(function* () {
  const sources = yield* AwsServiceResourceSources;
  const operations = yield* AwsServiceOperationGeneration;
  const publisher = yield* TypeScriptModulePublisher;

  // Verify pinned sources before rendering the operation contracts. The module
  // publisher validates the rendered source before replacing the client file.
  const prepared = yield* sources.prepare(
    process.argv[2] ?? "tools/awsServiceResources/sources/sqs.json",
  );
  const source = yield* operations.renderClient(prepared);
  const published = yield* publisher.publishModule(
    process.argv[3] ?? "src/providers/aws/client/generated/sqs.ts",
    source,
  );

  yield* Effect.logInfo("Generated native AWS operation contracts", {
    published,
  });
}).pipe(Effect.provide(generationLayer), NodeRuntime.runMain);
