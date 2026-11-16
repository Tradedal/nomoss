import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  Match,
  Record,
  Schema,
} from "effect";
import type { SourceFile } from "ts-morph";
import { OpenApiResourceBindings } from "../../codegen/openApiResourceBindings.js";
import { OpenApiResourceSchemas } from "../../codegen/openApiResourceSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import { ResourceCatalogs } from "../../codegen/resourceCatalogs.js";
import {
  JsonSchemaResourceSource,
  type OpenApiResourceHints,
} from "../../codegen/resourceSchemas.js";
import { StripeOpenApiDocument, StripeOpenApiSource } from "../model.js";
import { StripeModuleEmitter } from "./stripeModuleEmitter.js";
import { StripeModulePublisher } from "./stripeModulePublisher.js";
import { StripeOperationBindings } from "./stripeOperationBindings.js";
import { StripeSchemaCompiler } from "./stripeSchemaCompiler.js";
import { StripeSourceLoader } from "./stripeSourceLoader.js";

/**
 * The StripeClientGenerator service produces one client for resources found
 * in Stripe's pinned specification and local resources registered by the
 * application. It allows inspection of that client before publication can
 * replace the existing files.
 */
export class StripeClientGenerator extends Context.Service<StripeClientGenerator>()(
  "nomoss/tools/stripe/generator/stripeClientGenerator",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const catalogs = yield* OperationCatalogs;
      const resourceCatalogs = yield* ResourceCatalogs;
      const resourceSchemas = yield* OpenApiResourceSchemas;
      const resourceBindings = yield* OpenApiResourceBindings;

      const loader = yield* StripeSourceLoader;
      const bindings = yield* StripeOperationBindings;
      const compiler = yield* StripeSchemaCompiler;
      const emitter = yield* StripeModuleEmitter;
      const publisher = yield* StripeModulePublisher;

      /**
       * The renderModules service method returns the selected client modules
       * for review and leaves published files unchanged. Operation IDs restrict
       * discovery and compilation to those API operations; an empty selection
       * includes every operation. The caller must supply the original
       * specification selected by openapi-source.json in
       * referenceDirectory. The local manifest declares input contracts and
       * document projections for application resources.
       *
       * The method fails for an invalid manifest, a checksum mismatch, or a
       * missing local property. Failures in source correction, resource discovery,
       * schema compilation, or module emission also propagate. The
       * complete operation works in memory and preserves existing output files.
       */
      const renderModules = Effect.fn("StripeClientGenerator.renderModules")(
        function* (
          referenceDirectory: string,
          operationIds: ReadonlyArray<string> = [],
        ) {
          const source = yield* fs
            .readFileString("tools/stripe/openapi-source.json")
            .pipe(
              Effect.flatMap(
                Schema.decodeEffect(Schema.fromJsonString(StripeOpenApiSource)),
              ),
            );

          const specification = yield* loader.loadOpenApiDocument(
            referenceDirectory,
            source,
          );

          /**
           * The catalog used for discovery retains the corrected definitions
           * that establish relationships between resources. The catalog used
           * for compilation expresses their nullable constraints in a form
           * that Effect's schema importer can consume.
           */
          const sourceCatalog = yield* catalogs.buildOperationCatalog(
            {
              provider: "Stripe",
              service: "Stripe",
              name: source.specification,
              format: "OpenApi",
            },
            specification,
            operationIds,
          );

          const graph = yield* resourceSchemas.buildGraph(sourceCatalog);

          const hints = yield* Match.value(operationIds.length).pipe(
            Match.when(0, () => Effect.succeed(source.resourceHints)),
            Match.orElse(() =>
              Effect.gen(function* () {
                const candidates = yield* resourceBindings.discoverResources(
                  sourceCatalog,
                  graph,
                  source.resourceHints,
                );

                const selected: OpenApiResourceHints = Record.filter(
                  source.resourceHints,
                  (_, name) =>
                    Arr.some(
                      candidates.resources,
                      (resource) => resource.name === name,
                    ),
                );

                return selected;
              }),
            ),
          );

          const discovered = yield* resourceCatalogs.buildDiscoveredCatalog(
            sourceCatalog,
            hints,
            source.resourceNamespace,
            graph,
          );

          const normalized = yield* resourceSchemas.normalizeNullability(
            sourceCatalog,
            graph,
          );

          const catalog = yield* catalogs.buildOperationCatalog(
            sourceCatalog.source,
            normalized,
            operationIds,
          );

          const document = yield* Schema.decodeUnknownEffect(
            StripeOpenApiDocument,
          )(normalized);

          /**
           * The prepared catalog keeps a resource available for inspection
           * when its creation request uses an unsupported encoding. Its issues
           * explain why the published metadata has no executable client for
           * that resource.
           */
          const preparation = yield* bindings.prepareResourceClients(
            catalog,
            discovered,
          );

          const discoveredResources = preparation.resources;

          const operations = yield* bindings.bindClientOperations(
            catalog,
            source,
            discoveredResources,
          );

          const apiResources = Arr.filter(
            Record.values(discoveredResources),
            (resource) => resource.operations !== undefined,
          );

          const localSource = yield* fs
            .readFileString("tools/stripe/local-resource-source.json")
            .pipe(
              Effect.flatMap(
                Schema.decodeEffect(
                  Schema.fromJsonString(JsonSchemaResourceSource),
                ),
              ),
            );

          /**
           * The JsonSchemaResourceSource declaration selects document fields
           * from the same input contract that validates the local resource.
           * Those projections preserve each selected field's constraints.
           */
          const localResources =
            yield* resourceCatalogs.prepareJsonSchemaResources(localSource);

          const resources = Arr.appendAll(
            apiResources,
            Arr.map(localResources, (resource) => resource.catalog),
          );

          /**
           * The root schemas receive their public names by position during
           * emission. Compilation and emission must therefore receive the same
           * order of operations and resources so each saved output receives
           * the validator selected for its source field.
           */
          const code = yield* compiler.compileSchemas(
            document,
            operations,
            resources,
          );

          const metadata = Arr.filter(catalog.metadata, (metadata) =>
            Arr.some(
              operations,
              (operation) => operation.name === metadata.operationId,
            ),
          );

          const modules = yield* emitter.emitModules(
            source,
            catalog,
            operations,
            code,
            metadata,
            resources,
            localResources,
            discoveredResources,
            preparation.unresolved,
          );

          const rendered: ReadonlyArray<SourceFile> = modules;

          return rendered;
        },
      );

      /**
       * The generate service method makes the selected client available in
       * outputDirectory and returns its TypeScript paths. The caller must
       * dedicate that directory to replaceable artifacts and supply the pinned
       * specification with its upstream LICENSE in referenceDirectory. The
       * returned paths exclude LICENSE, which publication still includes.
       * Operation IDs use the same selection as renderModules, including its
       * full-generation behavior when the selection is empty.
       *
       * The method leaves existing output intact if rendering or formatting
       * fails. A filesystem failure after publication begins can leave an
       * incomplete client and does not restore the previous files. Such failures
       * propagate to the caller.
       */
      const generate = Effect.fn("StripeClientGenerator.generate")(function* (
        referenceDirectory: string,
        outputDirectory: string,
        operationIds: ReadonlyArray<string> = [],
      ) {
        const modules = yield* renderModules(referenceDirectory, operationIds);

        const published: ReadonlyArray<string> =
          yield* publisher.publishModules(
            referenceDirectory,
            outputDirectory,
            modules,
          );

        return published;
      });

      return { renderModules, generate };
    }),
  },
) {}
