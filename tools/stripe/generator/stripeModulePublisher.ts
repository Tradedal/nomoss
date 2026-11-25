import { Array as Arr, Context, Effect, FileSystem, Layer, Path } from "effect";
import type { SourceFile } from "ts-morph";
import { TypeScriptModulePublisher } from "../../typeScriptModulePublisher.js";

/**
 * The StripeModulePublisher service requires a directory whose existing
 * contents may be replaced. Published clients include the upstream LICENSE.
 * A filesystem failure after replacement begins can leave an incomplete client.
 */
export class StripeModulePublisher extends Context.Service<StripeModulePublisher>()(
  "nomoss/tools/stripe/generator/stripeModulePublisher",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const publisher = yield* TypeScriptModulePublisher;

      /**
       * The publishModules service method makes a client available in
       * outputDirectory and returns its TypeScript paths in module order.
       * The caller must reserve that directory for replaceable artifacts and
       * supply the upstream LICENSE in referenceDirectory. The returned paths
       * exclude LICENSE even though publication includes that file.
       *
       * The method preserves existing output if parsing or formatting fails.
       * Once replacement begins, a filesystem failure can leave partial output
       * and does not restore the previous contents.
       */
      const publishModules = Effect.fn("StripeModulePublisher.publishModules")(
        function* (
          referenceDirectory: string,
          outputDirectory: string,
          modules: ReadonlyArray<SourceFile>,
        ) {
          const formatted = yield* publisher.formatModules(
            outputDirectory,
            Arr.map(modules, (module) => ({
              outputPath: path.join(
                outputDirectory,
                path.relative("/", module.getFilePath()),
              ),
              source: module.getFullText(),
            })),
          );

          yield* Effect.when(
            fs.remove(outputDirectory, { recursive: true }),
            fs.exists(outputDirectory),
          );

          yield* Effect.forEach(formatted, ({ outputPath, source }) =>
            fs
              .makeDirectory(path.dirname(outputPath), { recursive: true })
              .pipe(Effect.andThen(fs.writeFileString(outputPath, source))),
          );

          yield* fs.copyFile(
            path.join(referenceDirectory, "LICENSE"),
            path.join(outputDirectory, "LICENSE"),
          );

          const published: ReadonlyArray<string> = Arr.map(
            formatted,
            ({ outputPath }) => outputPath,
          );

          return published;
        },
      );

      return { publishModules };
    }),
  },
) {}

export const stripeModulePublisherLayer = Layer.effect(
  StripeModulePublisher,
  StripeModulePublisher.make,
);
