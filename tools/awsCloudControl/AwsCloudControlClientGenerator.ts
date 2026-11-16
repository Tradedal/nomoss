import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  Match,
  Path,
  Record,
  Schema,
  String as Str,
  Stream,
} from "effect";
import { Digest } from "effect/crypto";
import { HttpClient, HttpClientResponse } from "effect/http";
import { ChildProcess, ChildProcessSpawner } from "effect/process";
import {
  type OpenApiSpecification,
  SourceCorrectionRegistry,
} from "../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../codegen/operationCatalogs.js";
import { TypeScriptModulePublisher } from "../typeScriptModulePublisher.js";
import { AwsOpenApiDocument, SmithyDependencies } from "./model.js";
import { AwsOpenApi } from "./openApi.js";
import { AwsOpenApiTypeScript } from "./typeScript.js";

export class AwsCloudControlGenerationError extends Data.TaggedError(
  "AwsCloudControlGenerationError",
)<{ readonly message: string }> {}

/**
 * AwsCloudControlClientGenerator produces the client contracts from the
 * published AWS model. Its maintenance API supports verified converter setup,
 * OpenAPI publication, and TypeScript rendering or publication. Generated
 * operations retain shared AWS execution through the internal client.
 */
export class AwsCloudControlClientGenerator extends Context.Service<AwsCloudControlClientGenerator>()(
  "nomoss/tools/awsCloudControl/AwsCloudControlClientGenerator",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const processes = yield* ChildProcessSpawner.ChildProcessSpawner;
      const publisher = yield* TypeScriptModulePublisher;
      const http = HttpClient.filterStatusOk(yield* HttpClient.HttpClient);
      const openApi = yield* AwsOpenApi;
      const typeScript = yield* AwsOpenApiTypeScript;
      const digest = yield* Digest.Digest;
      const catalogs = yield* OperationCatalogs;

      /**
       * Prepares the classpath for verified Smithy artifacts
       * and the compiled AWS JSON extension. Java SPI resources are included
       * so Smithy's converter can discover that protocol implementation.
       */
      const prepareSmithyConverter = Effect.fn(
        "AwsCloudControlClientGenerator.prepareSmithyConverter",
      )(function* (directory: string) {
        const dependencies = yield* fs
          .readFileString(path.join(directory, "smithy-dependencies.json"))
          .pipe(
            Effect.flatMap(
              Schema.decodeUnknownEffect(
                Schema.fromJsonString(SmithyDependencies),
              ),
            ),
          );

        yield* fs.makeDirectory(
          path.join(".cache", "nomoss", "smithy", dependencies.version),
          { recursive: true },
        );

        const jars = yield* Effect.forEach(dependencies.artifacts, (artifact) =>
          Effect.gen(function* () {
            const jar: string = path.join(
              ".cache",
              "nomoss",
              "smithy",
              dependencies.version,
              `${artifact.name}.jar`,
            );

            const cached = yield* fs.exists(jar);

            const bytes: Uint8Array = yield* Match.value(cached).pipe(
              Match.when(true, () => fs.stream(jar)),
              Match.orElse(() =>
                HttpClientResponse.stream(
                  http.get(
                    `https://repo.maven.apache.org/maven2/software/amazon/smithy/${artifact.name}/${dependencies.version}/${artifact.name}-${dependencies.version}.jar`,
                  ),
                ),
              ),
              Stream.mkUint8Array,
            );

            yield* digest.digestHex(Digest.sha256, bytes).pipe(
              Effect.filterOrFail(
                (checksum) => checksum === artifact.sha256,
                () =>
                  new AwsCloudControlGenerationError({
                    message: `Checksum mismatch for ${jar}; remove the cached file before retrying`,
                  }),
              ),
            );

            yield* fs
              .writeFile(jar, bytes)
              .pipe(Effect.when(Effect.succeed(!cached)));
            return jar;
          }),
        );

        const separator = Match.value(path.sep).pipe(
          Match.when("\\", () => ";"),
          Match.orElse(() => ":"),
        );

        const classes = path.join(
          ".cache",
          "nomoss",
          "smithy",
          dependencies.version,
          "classes",
        );

        yield* fs.makeDirectory(classes, { recursive: true });

        const exitCode = yield* processes.exitCode(
          ChildProcess.make(
            "javac",
            [
              "-cp",
              Arr.join(jars, separator),
              "-d",
              classes,
              path.join(directory, "Convert.java"),
              path.join(directory, "AwsJsonOpenApiExtension.java"),
            ],
            { stdout: "inherit", stderr: "inherit" },
          ),
        );

        yield* Effect.fail(
          new AwsCloudControlGenerationError({
            message: `Smithy OpenAPI extension compilation failed (${exitCode})`,
          }),
        ).pipe(Effect.when(Effect.succeed(exitCode !== 0)));

        const classpath: string = Arr.join(
          [...jars, classes, directory],
          separator,
        );

        return classpath;
      });

      /**
       * Converts the selected Smithy service to OpenAPI documents and
       * returns them for generation. It replaces previous documents so removed
       * upstream operations cannot survive in the checked-in contract.
       */
      const convertSmithyModel = Effect.fn(
        "AwsCloudControlClientGenerator.convertSmithyModel",
      )(function* (input: {
        readonly modelPath: string;
        readonly serviceId: string;
        readonly documentsDirectory: string;
        readonly classpath: string;
      }) {
        yield* fs.remove(input.documentsDirectory, {
          recursive: true,
          force: true,
        });

        yield* Effect.scoped(
          Effect.gen(function* () {
            const process = yield* processes.spawn(
              ChildProcess.make("java", [
                "--class-path",
                input.classpath,
                "Convert",
                input.modelPath,
                input.serviceId,
                input.documentsDirectory,
              ]),
            );

            const [stderr, exitCode] = yield* Effect.all(
              [
                Stream.mkString(Stream.decodeText(process.stderr)),
                process.exitCode,
              ],
              { concurrency: "unbounded" },
            );

            yield* Effect.fail(
              new AwsCloudControlGenerationError({
                message: `Smithy conversion failed (${exitCode}): ${stderr}`,
              }),
            ).pipe(Effect.when(Effect.succeed(exitCode !== 0)));
          }),
        );

        const files = yield* fs.readDirectory(input.documentsDirectory);
        const registry = yield* fs
          .readFileString("tools/awsCloudControl/corrections.json")
          .pipe(
            Effect.flatMap(
              Schema.decodeEffect(
                Schema.fromJsonString(SourceCorrectionRegistry),
              ),
            ),
          );
        const documents: ReadonlyArray<OpenApiSpecification> =
          yield* Effect.forEach(
            Arr.sort(Arr.filter(files, Str.endsWith(".json")), Str.Order),
            (file) =>
              fs.readFileString(path.join(input.documentsDirectory, file)).pipe(
                Effect.flatMap(
                  Schema.decodeEffect(Schema.fromJsonString(Schema.JsonObject)),
                ),
                Effect.flatMap((snapshot) =>
                  catalogs.prepareOpenApiDocument(
                    {
                      provider: "AWS",
                      service: input.serviceId,
                      name: file,
                      format: "Smithy",
                    },
                    snapshot,
                    registry,
                  ),
                ),
              ),
          );

        return documents;
      });

      /**
       * Emits generated TypeScript for inspection before
       * publication. Data and HTTP contracts come from published OpenAPI
       * documents, with invocation delegated to AwsClient.
       */
      const emitClientModule = Effect.fn(
        "AwsCloudControlClientGenerator.emitClientModule",
      )(function* (
        documents: ReadonlyArray<OpenApiSpecification>,
        serviceName: string,
      ) {
        const providerDocuments = yield* Effect.forEach(documents, (document) =>
          Schema.decodeUnknownEffect(AwsOpenApiDocument)(document),
        );
        const first = yield* Effect.fromOption(Arr.head(providerDocuments));
        const definitions = openApi.collectSchemaDefinitions(providerDocuments);
        const discovered = yield* Effect.forEach(documents, (document, index) =>
          Effect.gen(function* () {
            const providerDocument = providerDocuments[index];
            const operation = yield* Effect.fromOption(
              Arr.head(Record.values(providerDocument.paths)),
            );
            const catalog = yield* catalogs.buildOperationCatalog(
              {
                provider: "AWS",
                service: providerDocument["x-aws-service"].service,
                name: `${operation.post.operationId}.json`,
                format: "Smithy",
              },
              document,
            );
            return catalog;
          }),
        );
        const operations = yield* openApi.bindClientOperations(discovered);
        const module = typeScript.createModule();

        yield* catalogs.emitOperationCatalog(
          module,
          `${Str.uncapitalize(serviceName)}OperationCatalog`,
          Arr.flatMap(discovered, (catalog) => catalog.metadata),
        );

        yield* typeScript.emitSchemas(module, definitions, operations);
        yield* typeScript.emitOperations(module, serviceName, operations);
        typeScript.emitClient(
          module,
          serviceName,
          first["x-aws-service"],
          operations,
        );

        const source: string = module.getFullText();

        return source;
      });

      /**
       * Client publication replaces the checked-in source only after the formatter
       * and lint validator accept it. Rejected source leaves the previous module
       * intact.
       */
      const publishClientModule = Effect.fn(
        "AwsCloudControlClientGenerator.publishClientModule",
      )(function* (input: {
        readonly outputPath: string;
        readonly source: string;
      }) {
        const publishedPath: string = yield* publisher.publishModule(
          input.outputPath,
          input.source,
        );

        return publishedPath;
      });

      return {
        prepareSmithyConverter,
        convertSmithyModel,
        emitClientModule,
        publishClientModule,
      };
    }),
  },
) {}
