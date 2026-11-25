import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Layer,
  Schema,
  String as Str,
} from "effect";
import {
  type OperationSource,
  SourceCorrectionRegistry,
} from "../../tools/codegen/catalogSchemas.js";
import {
  OperationCatalogs,
  operationCatalogsLayer,
} from "../../tools/codegen/operationCatalogs.js";

layer(operationCatalogsLayer.pipe(Layer.provideMerge(NodeServices.layer)))(
  "provider metadata generation",
  (it) => {
    it.effect(
      "The AWS operation catalog matches its Smithy service definitions",
      () =>
        Effect.gen(function* () {
          const fs = yield* FileSystem.FileSystem;
          const catalogs = yield* OperationCatalogs;
          const directory = "src/providers/aws/client/openapi/cloudControl";
          const names = yield* fs.readDirectory(directory);
          const registry = yield* fs
            .readFileString("tools/awsCloudControl/corrections.json")
            .pipe(
              Effect.flatMap(
                Schema.decodeEffect(
                  Schema.fromJsonString(SourceCorrectionRegistry),
                ),
              ),
            );
          const metadata = yield* Effect.forEach(
            Arr.sort(Arr.filter(names, Str.endsWith(".json")), Str.Order),
            (name) => {
              const source: OperationSource = {
                provider: "AWS",
                service: "com.amazonaws.cloudcontrol#CloudApiService",
                name,
                format: "Smithy",
              };
              return fs.readFileString(`${directory}/${name}`).pipe(
                Effect.flatMap(
                  Schema.decodeEffect(Schema.fromJsonString(Schema.JsonObject)),
                ),
                Effect.flatMap((snapshot) =>
                  catalogs.prepareOpenApiDocument(source, snapshot, registry),
                ),
                Effect.flatMap((document) =>
                  catalogs.buildOperationCatalog(source, document),
                ),
                Effect.map((catalog) => catalog.metadata),
              );
            },
          );

          expect(Arr.flatten(metadata)).toMatchSnapshot();
        }),
    );
  },
);
