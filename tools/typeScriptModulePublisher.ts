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
import { Project } from "ts-morph";

const candidateDirectory = "tools/generated";

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

/** The TypeScriptModuleTypeError reports compiler diagnostics for candidate modules before publication. */
export class TypeScriptModuleTypeError extends Data.TaggedError(
  "TypeScriptModuleTypeError",
)<{
  readonly message: string;
}> {}

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
 * modules before replacing files that applications import. It checks temporary
 * files using the repository's rules for generated source, and validation failures
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
       * The prepareWorkspace operation lets Biome check unpublished modules
       * outside the checkout. The generated directory makes Biome apply the
       * same plugin file filters as it does to published generated modules.
       *
       * @see ../../command-options-fund/refs/effect/packages/effect/src/FileSystem.ts (makeTempDirectoryScoped)
       */
      const prepareWorkspace = Effect.fn(
        "TypeScriptModulePublisher.prepareWorkspace",
      )(function* () {
        const workspace = yield* fs.makeTempDirectoryScoped();

        yield* Effect.forEach(
          ["biome.jsonc", ".gitignore", "node_modules"],
          (name) => fs.symlink(path.resolve(name), path.join(workspace, name)),
        );
        yield* fs.makeDirectory(path.join(workspace, candidateDirectory), {
          recursive: true,
        });

        return workspace;
      });

      /**
       * The formatModules service method prepares candidate sources for review
       * or subsequent lint validation. Biome parses, formats, and organizes
       * imports with the repository's Biome configuration. Each result retains
       * its destination, and a parse failure preserves existing files.
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

        const workspace = yield* prepareWorkspace();
        const directory = path.join(workspace, candidateDirectory);

        const candidates = yield* Effect.forEach(
          modules,
          Effect.fnUntraced(function* (module) {
            // Preserve the candidate's path relative to the output directory.
            // Biome then visits nested modules under the same directory layout.
            const relative = path.relative(outputDirectory, module.outputPath);
            const candidate = path.join(directory, relative);

            yield* fs.makeDirectory(path.dirname(candidate), {
              recursive: true,
            });
            yield* fs.writeFileString(candidate, module.source);

            return { outputPath: module.outputPath, candidate };
          }),
        );

        const preparation = yield* processes.spawn(
          ChildProcess.make(
            path.resolve("node_modules/.bin/biome"),
            ["check", "--write", "--linter-enabled=false", candidateDirectory],
            {
              cwd: workspace,
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
          Effect.withSpan("codegen.biome.format"),
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
       * the repository's rules for generated source before publication. It
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

        const workspace = yield* prepareWorkspace();
        const directory = path.join(workspace, candidateDirectory);

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
            path.resolve("node_modules/.bin/biome"),
            ["check", "--error-on-warnings", candidateDirectory],
            { cwd: workspace, stdout: "inherit", stderr: "inherit" },
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
          Effect.withSpan("codegen.biome.validate"),
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
          const directory = path.dirname(outputPath);
          const candidate = { outputPath, source };

          const formatted = yield* formatModules(directory, [candidate]).pipe(
            Effect.flatMap((modules) => validateModules(directory, modules)),
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
        yield* fs
          .writeFileString(outputPath, module)
          .pipe(Effect.withSpan("codegen.write"));

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
        ).pipe(Effect.withSpan("codegen.write"));

        return published;
      });

      /**
       * The checkModuleTypes service method checks imports and inferred types
       * with all candidate files present at their publication paths in memory.
       * Project.createSourceFile overlays the candidates before TypeScript checks
       * them. See node_modules/ts-morph/lib/ts-morph.d.ts (Project and SourceFile.getPreEmitDiagnostics).
       */
      const checkModuleTypes = Effect.fn(
        "TypeScriptModulePublisher.checkModuleTypes",
      )((modules: ReadonlyArray<TypeScriptModuleSource>) =>
        Effect.try(() => {
          const project = new Project({
            tsConfigFilePath: "tsconfig.json",
            skipAddingFilesFromTsConfig: true,
          });

          const candidates = Arr.map(modules, ({ outputPath, source }) =>
            project.createSourceFile(outputPath, source, { overwrite: true }),
          );
          // Register the whole batch before resolving imports. A generated
          // command can then import another candidate that has never been written.
          const diagnostics = Arr.flatMap(candidates, (candidate) =>
            candidate.getPreEmitDiagnostics(),
          );

          return project.formatDiagnosticsWithColorAndContext(diagnostics);
        }).pipe(
          Effect.filterOrFail(
            (message) => message.length === 0,
            (message) => new TypeScriptModuleTypeError({ message }),
          ),
          Effect.withSpan("codegen.typescript.check"),
        ),
      );

      return {
        checkModuleTypes,
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
