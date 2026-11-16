import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  Path,
  Record,
  Schema,
  String as Str,
} from "effect";
import { Project } from "ts-morph";
import { ResourceCatalog } from "../../codegen/resourceSchemas.js";
import type { TypeScriptModuleSource } from "../../typeScriptModulePublisher.js";
import { StripeResourceBindingsEmitter } from "./stripeResourceBindingsEmitter.js";
import { StripeResourceDeclarations } from "./stripeResourceDeclarations.js";

/**
 * The StripeResourceDeclarationCompiler service lets generation changes refresh
 * resource declarations without recompiling provider requests and responses.
 * It reads the published catalog and existing bindings, then uses the full
 * generator's emitters to replace the entity classes and declaration factories.
 * Provider clients and output projections remain in the candidate modules.
 */
export class StripeResourceDeclarationCompiler extends Context.Service<StripeResourceDeclarationCompiler>()(
  "nomoss/tools/stripe/generator/stripeResourceDeclarationCompiler",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const declarations = yield* StripeResourceDeclarations;
      const emitter = yield* StripeResourceBindingsEmitter;

      /**
       * The prepareModules service method returns candidate sources for the
       * publisher to validate before replacing existing files. The catalog
       * selects the bindings to refresh under outputDirectory. Each binding
       * must contain its generated entity class, identity schema, and factory;
       * a missing declaration or unreadable binding stops preparation. The
       * returned set also includes the factory module that applications use
       * to register declarations in the shared resource graph.
       */
      const prepareModules = Effect.fn(
        "StripeResourceDeclarationCompiler.prepareModules",
      )(function* (outputDirectory: string, catalog: unknown) {
        const resources =
          yield* Schema.decodeUnknownEffect(ResourceCatalog)(catalog);
        const executable = Arr.filter(
          Record.values(resources),
          (resource) =>
            resource.operations !== undefined ||
            resource.source.format === "JsonSchema",
        );

        const project = new Project({ useInMemoryFileSystem: true });
        const bindings = yield* Effect.forEach(
          executable,
          Effect.fnUntraced(function* (resource) {
            const [, , name] = Str.split(resource.typeName, "::");
            const outputPath = path.join(
              outputDirectory,
              "resourceBindings",
              `${name}.ts`,
            );
            const source = yield* fs.readFileString(outputPath);

            const module = project.createSourceFile(
              `resourceBindings/${name}.ts`,
              source,
            );
            const refreshed = yield* declarations.refreshResourceDeclaration(
              module,
              resource,
            );

            const artifact: TypeScriptModuleSource = {
              outputPath,
              source: refreshed.getFullText(),
            };

            return artifact;
          }),
        );

        const factory = yield* emitter.emitResourceDeclarations(
          project,
          executable,
        );
        const modules: ReadonlyArray<TypeScriptModuleSource> = [
          ...bindings,
          {
            outputPath: path.join(outputDirectory, "resourceDeclarations.ts"),
            source: factory.getFullText(),
          },
        ];

        return modules;
      });

      return { prepareModules };
    }),
  },
) {}
