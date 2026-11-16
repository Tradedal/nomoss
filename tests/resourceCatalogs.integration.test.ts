import { expect, layer } from "@effect/vitest";
import { Effect, FileSystem, Schema } from "effect";
import { QueueOutputCatalog } from "../src/providers/aws/resources/generated/sqs/queue/index.js";
import { ResourceCatalogs } from "../tools/codegen/resourceCatalogs.js";
import { ResourceDefinition } from "../tools/codegen/resourceSchemas.js";
import { resourceSchemaTestLayer } from "./support/resourceCatalogFixture.js";

layer(resourceSchemaTestLayer)("Resource output catalogs", (it) => {
  it.effect(
    "The queue output catalog preserves Registry identity and source fields",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const resourceCatalogs = yield* ResourceCatalogs;

        const definition = yield* fs
          .readFileString(
            "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-sqs-queue.json",
          )
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(Schema.fromJsonString(ResourceDefinition)),
            ),
          );

        const catalog = yield* resourceCatalogs.buildCatalog(
          {
            provider: "AWS",
            service: "CloudFormation",
            name: "aws-sqs-queue.json",
            format: "CloudFormation",
          },
          definition,
        );

        expect(catalog).toMatchSnapshot();
        expect(QueueOutputCatalog).toEqual([catalog]);
      }),
  );
});
