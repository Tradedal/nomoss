import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  Layer,
  Path,
  Schema,
} from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/process";

/**
 * The TypeScriptModuleValidationFailed error class reports the candidate
 * destination and Biome exit code after validation rejects a module. The
 * existing destination remains unchanged.
 */
export class TypeScriptModuleValidationFailed extends Data.TaggedError(
  "TypeScriptModuleValidationFailed",
)<{ readonly outputPath: string; readonly exitCode: number }> {}

/**
 * The TypeScriptModulesValidationFailed error class identifies a candidate batch
 * that Biome rejected before publication. Its directory identifies the intended
 * output, and its exit code accompanies the diagnostics printed by Biome.
 */
export class TypeScriptModulesValidationFailed extends Data.TaggedError(
  "TypeScriptModulesValidationFailed",
)<{ readonly outputDirectory: string; readonly exitCode: number }> {}

/**
 * The TypeScriptModuleSource schema pairs candidate source with its intended
 * destination so validation can finish before an existing module is replaced.
 */
export const TypeScriptModuleSource = Schema.Struct({
  outputPath: Schema.NonEmptyString,
  source: Schema.String,
});
export type TypeScriptModuleSource = typeof TypeScriptModuleSource.Type;

/**
 * The TypeScriptModulePublisher service lets generators validate candidate
 * modules before replacing files that applications import. It applies the
 * repository's Biome configuration to temporary files, and validation failures
 * leave existing destinations intact. Batch publication validates every
 * candidate before the first write. Filesystem failures during publication
 * can leave a partially written batch.
 */
export class TypeScriptModulePublisher extends Context.Service<TypeScriptModulePublisher>()(
  "nomoss/tools/typeScriptModulePublisher",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const processes = yield* ChildProcessSpawner.ChildProcessSpawner;

      /**
       * The formatModules service method prepares candidate sources for review
       * or subsequent lint validation. Biome parses, formats, and organizes
       * imports in temporary files under the repository's tools directory so
       * its configured rules apply. Destination paths are retained in the
       * returned candidates, and a parse failure preserves existing files.
       */
      const formatModules = Effect.fn(
        "TypeScriptModulePublisher.formatModules",
      )(function* (
        outputDirectory: string,
        modules: ReadonlyArray<TypeScriptModuleSource>,
      ) {
        yield* Effect.annotateCurrentSpan({
          "codegen.module_count": modules.length,
        });

        const directory = yield* fs.makeTempDirectoryScoped({
          directory: path.resolve("tools"),
          prefix: ".codegen-",
        });

        const candidates = yield* Effect.forEach(modules, (module) =>
          Effect.gen(function* () {
            const candidate = path.join(
              directory,
              path.relative(outputDirectory, module.outputPath),
            );

            yield* fs.makeDirectory(path.dirname(candidate), {
              recursive: true,
            });
            yield* fs.writeFileString(candidate, module.source);

            const prepared = { outputPath: module.outputPath, candidate };

            return prepared;
          }),
        );

        const preparation = yield* processes.spawn(
          ChildProcess.make(
            "yarn",
            ["biome", "check", "--write", "--linter-enabled=false", directory],
            {
              stdout: "inherit",
              stderr: "inherit",
            },
          ),
        );

        yield* preparation.exitCode.pipe(
          Effect.filterOrFail(
            (exitCode) => exitCode === 0,
            (exitCode) =>
              new TypeScriptModulesValidationFailed({
                outputDirectory,
                exitCode,
              }),
          ),
          Effect.withSpan("TypeScriptModulePublisher.prepareModules"),
        );

        const formatted: ReadonlyArray<TypeScriptModuleSource> =
          yield* Effect.forEach(candidates, ({ outputPath, candidate }) =>
            fs
              .readFileString(candidate)
              .pipe(Effect.map((source) => ({ outputPath, source }))),
          );

        return formatted;
      }, Effect.scoped);

      /**
       * The validateModules service method checks formatted candidates against
       * the repository's Biome rules before a generator publishes them. It
       * returns the accepted candidates unchanged. A parser, formatting, or
       * lint diagnostic fails the complete batch with
       * TypeScriptModulesValidationFailed and leaves destinations intact.
       */
      const validateModules = Effect.fn(
        "TypeScriptModulePublisher.validateModules",
      )(function* (
        outputDirectory: string,
        modules: ReadonlyArray<TypeScriptModuleSource>,
      ) {
        yield* Effect.annotateCurrentSpan({
          "codegen.module_count": modules.length,
        });

        const directory = yield* fs.makeTempDirectoryScoped({
          directory: path.resolve("tools"),
          prefix: ".codegen-",
        });

        yield* Effect.forEach(modules, (module) =>
          Effect.gen(function* () {
            const candidate = path.join(
              directory,
              path.relative(outputDirectory, module.outputPath),
            );

            yield* fs.makeDirectory(path.dirname(candidate), {
              recursive: true,
            });
            yield* fs.writeFileString(candidate, module.source);
          }),
        );

        const validation = yield* processes.spawn(
          ChildProcess.make(
            "yarn",
            ["biome", "check", "--error-on-warnings", directory],
            { stdout: "inherit", stderr: "inherit" },
          ),
        );

        yield* validation.exitCode.pipe(
          Effect.filterOrFail(
            (exitCode) => exitCode === 0,
            (exitCode) =>
              new TypeScriptModulesValidationFailed({
                outputDirectory,
                exitCode,
              }),
          ),
        );

        const validated: ReadonlyArray<TypeScriptModuleSource> = modules;

        return validated;
      }, Effect.scoped);

      /**
       * The formatModule service method returns source text only after the parser,
       * formatter, and lint validator accept it. A validation failure leaves
       * the caller's destination unchanged.
       */
      const formatModule = Effect.fn("TypeScriptModulePublisher.formatModule")(
        function* (outputPath: string, source: string) {
          yield* Effect.annotateCurrentSpan({ "codegen.module": outputPath });
          const formatted = yield* formatModules(path.dirname(outputPath), [
            { outputPath, source },
          ]).pipe(
            Effect.flatMap((modules) =>
              validateModules(path.dirname(outputPath), modules),
            ),
            Effect.catchTag(
              "TypeScriptModulesValidationFailed",
              ({ exitCode }) =>
                Effect.fail(
                  new TypeScriptModuleValidationFailed({
                    outputPath,
                    exitCode,
                  }),
                ),
            ),
          );

          const first = yield* Arr.head(formatted).pipe(Effect.fromOption);
          const module: string = first.source;

          return module;
        },
      );

      /**
       * The publishModule service method returns the destination path after it
       * formats, validates, and writes the candidate source. Validation failures
       * preserve the previous file. Failures in directory creation or the file
       * write propagate.
       */
      const publishModule = Effect.fn(
        "TypeScriptModulePublisher.publishModule",
      )(function* (outputPath: string, source: string) {
        const module = yield* formatModule(outputPath, source);

        yield* fs.makeDirectory(path.dirname(outputPath), { recursive: true });
        yield* fs.writeFileString(outputPath, module);

        const publishedPath: string = outputPath;

        return publishedPath;
      });

      /**
       * The publishModules service method publishes a batch only after every
       * candidate passes formatting and lint validation. Validation failures
       * preserve all destinations. It returns the written paths and leaves
       * unrelated files in place. A filesystem failure propagates and can leave
       * files written earlier in the batch at their new contents.
       */
      const publishModules = Effect.fn(
        "TypeScriptModulePublisher.publishModules",
      )(function* (
        outputDirectory: string,
        modules: ReadonlyArray<TypeScriptModuleSource>,
      ) {
        const formatted = yield* formatModules(outputDirectory, modules);
        const validated = yield* validateModules(outputDirectory, formatted);

        const published: ReadonlyArray<string> = yield* Effect.forEach(
          validated,
          Effect.fnUntraced(function* (module) {
            yield* fs.makeDirectory(path.dirname(module.outputPath), {
              recursive: true,
            });
            yield* fs.writeFileString(module.outputPath, module.source);

            return module.outputPath;
          }),
        );

        return published;
      });

      return {
        formatModules,
        validateModules,
        formatModule,
        publishModule,
        publishModules,
      };
    }),
  },
) {}

/**
 * The typeScriptModulePublisherLayer Layer requires filesystem, path, and
 * process services from the caller's shared graph.
 */
export const typeScriptModulePublisherLayer = Layer.effect(
  TypeScriptModulePublisher,
  TypeScriptModulePublisher.make,
);
