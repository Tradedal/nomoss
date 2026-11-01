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
  SchemaRepresentation,
  Stream,
} from "effect";
import * as HttpClient from "effect/http/HttpClient";
import * as ChildProcess from "effect/process/ChildProcess";
import { ChildProcessSpawner } from "effect/process/ChildProcessSpawner";

const JsonObject = Schema.Record(Schema.String, Schema.Json);
const Identifier = Schema.String.check(
  Schema.isPattern(/^[A-Za-z_][A-Za-z0-9_]*$/),
);

const SmithyDependencies = Schema.Struct({
  version: Schema.NonEmptyString,
  artifacts: Schema.NonEmptyArray(
    Schema.Struct({
      name: Schema.NonEmptyString,
      sha256: Schema.NonEmptyString,
    }),
  ),
});

/** This contract describes converter output, rather than AWS message contents. */
const CloudControlModel = Schema.Struct({
  service: Schema.NonEmptyString,
  version: Schema.NonEmptyString,
  protocol: Schema.Literal("awsJson1_0"),
  signingName: Schema.NonEmptyString,
  endpointRules: JsonObject,
  operations: Schema.NonEmptyArray(
    Schema.Struct({
      name: Identifier,
      input: Identifier,
      output: Identifier,
      target: Schema.NonEmptyString,
      headers: Schema.Record(Schema.String, Schema.String),
      errors: Schema.Array(
        Schema.Struct({
          name: Identifier,
          fault: Schema.Literals(["client", "server"]),
          httpStatus: Schema.Int,
          retryable: Schema.NullOr(JsonObject),
        }),
      ),
      idempotencyTokens: Schema.Array(Identifier),
      pagination: JsonObject,
      waiters: JsonObject,
    }),
  ),
  schemas: Schema.NonEmptyArray(
    Schema.Struct({ name: Identifier, schema: JsonObject }),
  ),
  definitions: Schema.Record(Schema.String, JsonObject),
});

type CloudControlError =
  (typeof CloudControlModel.Type.operations)[number]["errors"][number];

export class AwsCloudControlGenerationError extends Data.TaggedError(
  "AwsCloudControlGenerationError",
)<{ readonly message: string }> {}

export class AwsCloudControlClientGenerator extends Context.Service<AwsCloudControlClientGenerator>()(
  "nomoss/tools/awsCloudControl/AwsCloudControlClientGenerator",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const processes = yield* ChildProcessSpawner;
      const http = HttpClient.filterStatusOk(yield* HttpClient.HttpClient);

      const generator = {
        /** Download pinned converter dependencies and verify cached files too. */
        prepareConverter: Effect.fn(
          "AwsCloudControlClientGenerator.prepareConverter",
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
          const classpath: string = yield* Effect.forEach(
            dependencies.artifacts,
            (artifact) =>
              Effect.gen(function* () {
                const jar = path.join(
                  ".cache",
                  "nomoss",
                  "smithy",
                  dependencies.version,
                  `${artifact.name}.jar`,
                );
                const bytes = yield* Match.value(yield* fs.exists(jar)).pipe(
                  Match.when(true, () => fs.readFile(jar)),
                  Match.orElse(() =>
                    http
                      .get(
                        `https://repo.maven.apache.org/maven2/software/amazon/smithy/${artifact.name}/${dependencies.version}/${artifact.name}-${dependencies.version}.jar`,
                      )
                      .pipe(
                        Effect.flatMap((response) => response.arrayBuffer),
                        Effect.map((buffer) => new Uint8Array(buffer)),
                      ),
                  ),
                );
                yield* Effect.tryPromise({
                  try: () =>
                    globalThis.crypto.subtle.digest(
                      "SHA-256",
                      new Uint8Array(bytes),
                    ),
                  catch: (error) =>
                    new AwsCloudControlGenerationError({
                      message: `Cannot verify ${artifact.name}: ${String(error)}`,
                    }),
                }).pipe(
                  Effect.map((hash) =>
                    Arr.map(Arr.fromIterable(new Uint8Array(hash)), (byte) =>
                      byte.toString(16).padStart(2, "0"),
                    ).join(""),
                  ),
                  Effect.filterOrFail(
                    (digest) => digest === artifact.sha256,
                    () =>
                      new AwsCloudControlGenerationError({
                        message: `Checksum mismatch for ${jar}; remove the cached file before retrying`,
                      }),
                  ),
                );
                yield* fs.writeFile(jar, bytes);
                return jar;
              }),
          ).pipe(
            Effect.map((jars) => jars.join(path.sep === "\\" ? ";" : ":")),
          );
          return classpath;
        }),

        /** Amazon's converter supplies every request, response, and modeled error. */
        readModel: Effect.fn("AwsCloudControlClientGenerator.readModel")(
          function* (input: {
            readonly modelPath: string;
            readonly converterDirectory: string;
            readonly classpath: string;
          }) {
            const model = yield* Effect.scoped(
              Effect.gen(function* () {
                const process = yield* processes.spawn(
                  ChildProcess.make("java", [
                    "--class-path",
                    input.classpath,
                    path.join(input.converterDirectory, "Convert.java"),
                    input.modelPath,
                    "com.amazonaws.cloudcontrol#CloudApiService",
                  ]),
                );
                const [stdout, stderr, exitCode] = yield* Effect.all(
                  [
                    Stream.mkString(Stream.decodeText(process.stdout)),
                    Stream.mkString(Stream.decodeText(process.stderr)),
                    process.exitCode,
                  ],
                  { concurrency: "unbounded" },
                );
                yield* Effect.succeed(exitCode).pipe(
                  Effect.filterOrFail(
                    (code) => code === 0,
                    () =>
                      new AwsCloudControlGenerationError({
                        message: `Smithy conversion failed (${exitCode}): ${stderr}`,
                      }),
                  ),
                );
                return yield* Schema.decodeEffect(
                  Schema.fromJsonString(CloudControlModel),
                )(stdout);
              }),
            );
            return model;
          },
        ),

        renderClient: Effect.fn("AwsCloudControlClientGenerator.renderClient")(
          function* (model: typeof CloudControlModel.Type) {
            const code = yield* Effect.try({
              try: () =>
                SchemaRepresentation.toCodeDocument(
                  SchemaRepresentation.toRepresentations(
                    Arr.map(
                      SchemaRepresentation.fromJsonSchemaMultiDocument(
                        {
                          dialect: "draft-2020-12",
                          schemas: Arr.map(
                            model.schemas,
                            (entry) => entry.schema,
                          ),
                          definitions: model.definitions,
                        },
                        {
                          patterns: "apply",
                          onEnter: ({ description: _description, ...schema }) =>
                            schema,
                        },
                      ),
                      (schema) => schema.ast,
                    ),
                  ),
                ),
              catch: (error) =>
                new AwsCloudControlGenerationError({
                  message: `Effect schema generation failed: ${String(error)}`,
                }),
            }).pipe(
              Effect.filterOrFail(
                (code) =>
                  code.artifacts.length === 0 &&
                  Record.keys(code.references.recursives).length === 0,
                () =>
                  new AwsCloudControlGenerationError({
                    message:
                      "Cloud Control model requires unsupported schema artifacts or recursive definitions",
                  }),
              ),
            );
            const source: string = [
              "// Generated from the official AWS Cloud Control Smithy model. Do not edit.",
              "// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.",
              'import * as HttpApi from "effect/http-api/HttpApi";\nimport * as HttpApiEndpoint from "effect/http-api/HttpApiEndpoint";\nimport * as HttpApiGroup from "effect/http-api/HttpApiGroup";\nimport * as Schema from "effect/Schema";',
              ...Arr.map(
                code.references.nonRecursives,
                (entry) =>
                  `export const ${entry.$ref} = ${entry.code.runtime};\nexport type ${entry.$ref} = typeof ${entry.$ref}.Type;`,
              ),
              ...Arr.map(
                model.schemas,
                (entry, index) =>
                  `export const ${entry.name} = ${code.codes[index].runtime};\nexport type ${entry.name} = typeof ${entry.name}.Type;`,
              ),
              `export const cloudControlService = ${yield* Schema.encodeEffect(
                Schema.fromJsonString(Schema.Json),
              )({
                service: model.service,
                version: model.version,
                protocol: model.protocol,
                signingName: model.signingName,
                endpointRules: model.endpointRules,
              })};`,
              `export const cloudControlErrors = {\n${yield* Effect.forEach(
                Arr.dedupeWith(
                  Arr.flatMap(
                    model.operations,
                    (operation) => operation.errors,
                  ),
                  (left: CloudControlError, right: CloudControlError) =>
                    left.name === right.name,
                ),
                (error) =>
                  Schema.encodeEffect(Schema.fromJsonString(Schema.Json))(
                    error,
                  ).pipe(
                    Effect.map(
                      (metadata) =>
                        `${error.name}: { ...${metadata}, schema: ${error.name} },`,
                    ),
                  ),
              ).pipe(Effect.map(Arr.join("\n")))}\n};`,
              `export const cloudControlOperations = {\n${yield* Effect.forEach(
                model.operations,
                (operation) =>
                  Effect.gen(function* () {
                    const declaration: string = `${operation.name}: {\n...${yield* Schema.encodeEffect(Schema.fromJsonString(Schema.Json))(Record.remove(operation, "errors"))},\ninput: ${operation.input}, output: ${operation.output},\nerrors: [${Arr.map(operation.errors, (error) => `cloudControlErrors.${error.name}`).join(",")}],\n},`;
                    return declaration;
                  }),
              ).pipe(Effect.map(Arr.join("\n")))}\n};`,
              `export const cloudControlApi = HttpApi.make("CloudControl").add(\nHttpApiGroup.make("cloudcontrol", { topLevel: true }).add(\n${Arr.map(model.operations, (operation) => `HttpApiEndpoint.make("POST")("${operation.name}", "/", { payload: ${operation.input}, success: ${operation.output} }),`).join("\n")}\n));`,
              "",
            ].join("\n\n");
            return source;
          },
        ),

        publishClient: Effect.fn(
          "AwsCloudControlClientGenerator.publishClient",
        )(function* (input: {
          readonly outputPath: string;
          readonly source: string;
        }) {
          yield* fs.makeDirectory(path.dirname(input.outputPath), {
            recursive: true,
          });
          yield* fs.writeFileString(input.outputPath, input.source);
          yield* processes
            .exitCode(
              ChildProcess.make("yarn", [
                "biome",
                "format",
                "--write",
                input.outputPath,
              ]),
            )
            .pipe(
              Effect.filterOrFail(
                (exitCode) => exitCode === 0,
                (exitCode) =>
                  new AwsCloudControlGenerationError({
                    message: `Formatting failed for ${input.outputPath} (${exitCode})`,
                  }),
              ),
            );
        }),
      };
      return generator;
    }),
  },
) {}
