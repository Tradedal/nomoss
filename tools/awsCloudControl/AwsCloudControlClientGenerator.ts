import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  Match,
  Option,
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
import {
  AwsOpenApiDocument,
  AwsOpenApiService,
  SmithyDependencies,
} from "./model.js";
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

        const workspace = yield* fs.makeTempDirectoryScoped({
          prefix: "nomoss-smithy-",
        });

        const jars = yield* Effect.forEach(
          dependencies.artifacts,
          (artifact) =>
            Effect.gen(function* () {
              const jar = path.join(workspace, `${artifact.name}.jar`);
              const bytes = yield* Stream.mkUint8Array(
                HttpClientResponse.stream(
                  http.get(
                    `https://repo.maven.apache.org/maven2/software/amazon/smithy/${artifact.name}/${dependencies.version}/${artifact.name}-${dependencies.version}.jar`,
                  ),
                ),
              );

              yield* digest.digestHex(Digest.sha256, bytes).pipe(
                Effect.filterOrFail(
                  (checksum) => checksum === artifact.sha256,
                  () =>
                    new AwsCloudControlGenerationError({
                      message: `Checksum mismatch for ${artifact.name}@${dependencies.version}`,
                    }),
                ),
              );

              yield* fs.writeFile(jar, bytes);
              return jar;
            }),
          { concurrency: 4 },
        );

        const separator = Match.value(path.sep).pipe(
          Match.when("\\", () => ";"),
          Match.orElse(() => ":"),
        );

        const classes = path.join(workspace, "classes");

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
              path.join(
                "tools",
                "awsServiceResources",
                "AwsQueryOpenApiProtocol.java",
              ),
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
        readonly operations?: ReadonlyArray<string>;
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
                ...(input.operations ?? []),
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
       * The emitClientModule service method requires at least one operation
       * document. Every document must agree on the rules for one AWS service
       * because the client uses those rules for all its operations. Callers
       * can inspect the returned TypeScript before publication.
       */
      const emitClientModule = Effect.fn(
        "AwsCloudControlClientGenerator.emitClientModule",
      )(function* (
        documents: ReadonlyArray<OpenApiSpecification>,
        serviceName: string,
        unsignedOperations: ReadonlyArray<string> = [],
      ) {
        const providerDocuments = yield* Effect.forEach(documents, (document) =>
          Schema.decodeUnknownEffect(AwsOpenApiDocument)(document),
        );
        const first = yield* Effect.fromOption(Arr.head(providerDocuments));
        const serviceDefinition = first["x-aws-service"];
        const equivalentService = Schema.toEquivalence(AwsOpenApiService);

        yield* Effect.forEach(providerDocuments, (document) => {
          const selectedService = document["x-aws-service"];

          return Effect.succeed(selectedService).pipe(
            Effect.filterOrFail(
              (selected) => equivalentService(serviceDefinition, selected),
              () =>
                new AwsCloudControlGenerationError({
                  message: `Operation documents must describe the same AWS service and execution rules: ${selectedService.service}`,
                }),
            ),
          );
        });

        const definitions =
          yield* openApi.collectSchemaDefinitions(providerDocuments);

        const discovered = yield* Effect.forEach(documents, (document, index) =>
          Effect.gen(function* () {
            const providerDocument = providerDocuments[index];

            const operation = yield* Effect.fromOption(
              Arr.head(
                Arr.flatMap(
                  Record.values(providerDocument.paths),
                  Record.values,
                ),
              ),
            );

            const catalog = yield* catalogs.buildOperationCatalog(
              {
                provider: "AWS",
                service: providerDocument["x-aws-service"].service,
                name: `${operation.operationId}.json`,
                format: "Smithy",
              },
              document,
            );

            return catalog;
          }),
        );

        const operations = Arr.map(
          yield* openApi.bindClientOperations(discovered),
          (operation) => ({
            ...operation,
            unsigned: Option.liftPredicate(true as const, () =>
              Arr.contains(unsignedOperations, operation.name),
            ).pipe(Option.getOrUndefined),
          }),
        );

        const module = typeScript.createModule(serviceDefinition.protocol);

        yield* typeScript.emitSchemas(module, definitions, operations);
        yield* typeScript.emitOperations(module, serviceName, operations);
        typeScript.emitClient(
          module,
          serviceName,
          serviceDefinition,
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
