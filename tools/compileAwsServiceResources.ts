import { NodeCrypto, NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Data,
  Effect,
  Layer,
  Option,
  String as Str,
} from "effect";
import { FetchHttpClient } from "effect/http";
import { NomossTracingLive } from "../src/core/runtime/tracing.js";
import { awsClientDirectory, awsServiceClients } from "./awsClientPackages.js";
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

class AwsServiceClientNotFound extends Data.TaggedError(
  "AwsServiceClientNotFound",
)<{ readonly serviceId: string }> {}

Effect.gen(function* () {
  const sources = yield* AwsServiceResourceSources;
  const operations = yield* AwsServiceOperationGeneration;
  const publisher = yield* TypeScriptModulePublisher;

  // Verify pinned sources before rendering the operation contracts. The module
  // publisher validates the rendered source before replacing the client file.
  const prepared = yield* sources
    .prepare(process.argv[2] ?? "tools/awsServiceResources/sources/sqs.json")
    .pipe(Effect.withSpan("codegen.sources.prepare"));
  yield* Effect.annotateCurrentSpan({
    "codegen.aws.service": prepared.source.smithy.serviceId,
  });
  const outputPath = yield* Effect.fromOption(
    Option.fromUndefinedOr(process.argv[3]).pipe(
      Option.orElse(() =>
        Arr.findFirst(
          awsServiceClients,
          ({ serviceId }) => serviceId === prepared.source.smithy.serviceId,
        ).pipe(
          Option.map(
            ({ service }) => `${awsClientDirectory}/${service}/index.ts`,
          ),
        ),
      ),
    ),
    () =>
      new AwsServiceClientNotFound({
        serviceId: prepared.source.smithy.serviceId,
      }),
  );
  const serviceName = Str.split(prepared.definition.typeName, "::")[1];
  const source = yield* operations.renderClient(prepared, serviceName);
  const published = yield* publisher.publishModule(outputPath, source);

  yield* Effect.logInfo("Generated native AWS operation contracts", {
    published,
  });
}).pipe(
  Effect.withSpan("codegen.aws.client"),
  Effect.provide([generationLayer, NomossTracingLive]),
  NodeRuntime.runMain,
);
