import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Path,
  Record,
  type SchemaRepresentation,
  String as Str,
  Tuple,
} from "effect";
import {
  type ImportDeclarationStructure,
  Node,
  type OptionalKind,
  Project,
  QuoteKind,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import type {
  OperationCatalog,
  OperationMetadata,
} from "../../codegen/catalogSchemas.js";
import type {
  JsonSchemaResourcePreparation,
  OpenApiResourceCatalog,
  OpenApiResourcePreparation,
  ResourceOutputCatalog,
} from "../../codegen/resourceSchemas.js";
import { literal, print } from "../../codegen/typeScriptNodes.js";
import type { StripeOpenApiInvocation, StripeOpenApiSource } from "../model.js";
import { StripeCatalogEmitter } from "./stripeCatalogEmitter.js";
import { StripeClientEmitter } from "./stripeClientEmitter.js";
import { StripeResourceBindingsEmitter } from "./stripeResourceBindingsEmitter.js";
import { StripeResourceInputs } from "./stripeResourceInputs.js";
import { StripeSchemaEmitter } from "./stripeSchemaEmitter.js";

/**
 * The StripeModuleEmitter service assigns each shared model to its manifest's
 * family module. Each client module owns its operation contracts and callable
 * API. Resource declarations import those contracts and the shared models.
 * Family selection does not restrict resource discovery.
 */
export class StripeModuleEmitter extends Context.Service<StripeModuleEmitter>()(
  "nomoss/tools/stripe/generator/stripeModuleEmitter",
  {
    make: Effect.gen(function* () {
      const path = yield* Path.Path;
      const catalogEmitter = yield* StripeCatalogEmitter;
      const schemaEmitter = yield* StripeSchemaEmitter;
      const clientEmitter = yield* StripeClientEmitter;
      const bindingsEmitter = yield* StripeResourceBindingsEmitter;
      const resourceInputs = yield* StripeResourceInputs;

      /**
       * The resolveImports service method lets generated modules use schemas
       * declared in other modules. The caller must first create every schema,
       * including custom schemas for declarations, and supply its owner as a
       * path relative to the project root. The result keeps the supplied module
       * order. References used only in types receive type-only imports. Imports
       * for external runtime services remain the responsibility of their emitters.
       */
      const resolveImports = Effect.fn("StripeModuleEmitter.resolveImports")(
        function* (
          modules: ReadonlyArray<SourceFile>,
          owners: Readonly<Record<string, string>>,
        ) {
          yield* Effect.forEach(
            modules,
            (module) =>
              Effect.sync(() => {
                const current = path.relative("/", module.getFilePath());

                const importedNames = Arr.flatMap(
                  module.getImportDeclarations(),
                  (declaration) =>
                    Arr.map(declaration.getNamedImports(), (binding) =>
                      binding.getName(),
                    ),
                );

                const references = Arr.flatMap(
                  module.getDescendantsOfKind(ts.SyntaxKind.Identifier),
                  (node) =>
                    Record.get(owners, node.getText()).pipe(
                      Option.filter(
                        (owner) =>
                          owner !== current &&
                          !Arr.contains(importedNames, node.getText()),
                      ),
                      Option.map((owner) =>
                        Tuple.make(
                          owner,
                          node.getText(),
                          Arr.some(node.getAncestors(), Node.isTypeNode),
                        ),
                      ),
                      Option.toArray,
                    ),
                );

                const imports = Arr.map(
                  Record.toEntries(Arr.groupBy(references, ([owner]) => owner)),
                  ([owner, references]) => {
                    const relative = path.relative(
                      path.dirname(current),
                      owner,
                    );
                    const prefix = Match.value(
                      Str.startsWith(".")(relative),
                    ).pipe(
                      Match.when(true, () => ""),
                      Match.orElse(() => "./"),
                    );

                    const declaration: OptionalKind<ImportDeclarationStructure> =
                      {
                        moduleSpecifier: Str.replaceAll(
                          path.sep,
                          "/",
                        )(Str.replace(/\.ts$/, ".js")(`${prefix}${relative}`)),
                        namedImports: Arr.map(
                          Arr.dedupe(Arr.map(references, ([, name]) => name)),
                          (name) => ({
                            name,
                            isTypeOnly: Arr.every(
                              Arr.filter(
                                references,
                                ([, reference]) => reference === name,
                              ),
                              ([, , typeOnly]) => typeOnly,
                            ),
                          }),
                        ),
                      };

                    return declaration;
                  },
                );

                module.addImportDeclarations(imports);
              }),
            { discard: true },
          );

          const resolved: ReadonlyArray<SourceFile> = modules;

          return resolved;
        },
      );

      /**
       * The emitModules service method returns a complete client that callers
       * can inspect before publication changes any files. The CodeDocument roots
       * must follow the supplied order of operations and resources, and metadata
       * must identify selected operations. The returned modules give resource
       * declarations their validation and dispatch rules, with imports resolved
       * for shared schemas. Failures in compilation or binding propagate and
       * leave published files unchanged.
       */
      const emitModules = Effect.fn("StripeModuleEmitter.emitModules")(
        function* (
          source: typeof StripeOpenApiSource.Type,
          catalog: OperationCatalog,
          operations: ReadonlyArray<StripeOpenApiInvocation>,
          code: SchemaRepresentation.CodeDocument,
          metadata: ReadonlyArray<OperationMetadata>,
          resources: ReadonlyArray<ResourceOutputCatalog>,
          localResources: ReadonlyArray<JsonSchemaResourcePreparation>,
          resourceCatalog: OpenApiResourceCatalog,
          unresolved: OpenApiResourcePreparation["unresolved"],
        ) {
          const project = new Project({
            useInMemoryFileSystem: true,
            manipulationSettings: { quoteKind: QuoteKind.Double },
          });

          /**
           * The root names give public contracts their validation schemas.
           * Their positions must match compilation so an operation cannot
           * expose another operation's input or output schema.
           */
          const operationNames = Arr.flatMap(operations, (operation) =>
            Arr.map(
              ["Input", "Output", "Error"],
              (suffix) => `${operation.name}${suffix}`,
            ),
          );

          const resourceNames = Arr.map(resources, (resource) => {
            const [provider, , name] = Str.split(resource.typeName, "::");

            return `${provider}${name}OutputsSchema`;
          });

          const responseNames = Arr.map(
            Arr.filter(
              resources,
              (resource) => resource.responseSchema !== undefined,
            ),
            (resource) =>
              `${Str.split(resource.typeName, "::")[0]}${Str.split(resource.typeName, "::")[2]}ResponseSchema`,
          );
          const rootNames = [
            ...operationNames,
            ...resourceNames,
            ...responseNames,
          ];

          const sharedNames = Arr.appendAll(
            Record.keys(code.references.recursives),
            Arr.map(
              code.references.nonRecursives,
              (reference) => reference.$ref,
            ),
          );

          const modelAssignments = Arr.map(sharedNames, (name) => {
            const family = Arr.findFirst(
              Record.toEntries(source.modelModules),
              ([, prefixes]) =>
                Arr.some(prefixes, (prefix) =>
                  Str.startsWith(`stripe${prefix}`)(Str.toLowerCase(name)),
                ),
            ).pipe(
              Option.map(([module]) => module),
              Option.getOrElse(() => source.defaultModelModule),
            );

            return Tuple.make(name, `models/${family}.ts`);
          });

          const operationAssignments = Arr.flatMap(operations, (operation) =>
            Arr.map(["Input", "Output", "Error"], (suffix) =>
              Tuple.make(
                `${operation.name}${suffix}`,
                `${operation.client}.ts`,
              ),
            ),
          );

          const outputAssignments = Arr.map(
            [...resourceNames, ...responseNames],
            (name) => Tuple.make(name, "resourceOutputs.ts"),
          );

          const schemaAssignments: ReadonlyArray<
            readonly [name: string, modulePath: string]
          > = Arr.appendAll(
            Arr.appendAll(modelAssignments, operationAssignments),
            outputAssignments,
          );

          const models = yield* Effect.forEach(
            Record.toEntries(
              Arr.groupBy(schemaAssignments, ([, file]) => file),
            ),
            ([file, entries]) =>
              schemaEmitter.emitSchemaModule(
                project,
                file,
                Arr.map(entries, ([name]) => name),
                code,
                rootNames,
                Str.startsWith("models/")(file),
              ),
          );

          const clients = yield* Effect.forEach(
            Record.toEntries(
              Arr.groupBy(operations, (operation) => operation.client),
            ),
            ([name, operations]) =>
              clientEmitter.emitClientModule(project, name, operations),
          );

          /**
           * The configuration module fixes the API version associated with
           * these schemas. An application can change the destination through
           * its transport and retain this version's validation contract.
           */
          const configuration = project.createSourceFile("configuration.ts");

          configuration.addVariableStatements(
            Arr.map(
              Record.toEntries({
                stripeOpenApiRevision: source.revision,
                stripeApiVersion: catalog.document.info.version,
                stripeApiBaseUrl: catalog.document.servers[0].url,
              }),
              ([name, value]) => ({
                isExported: true,
                declarationKind: VariableDeclarationKind.Const,
                declarations: [{ name, initializer: print(literal(value)) }],
              }),
            ),
          );

          const index = project.createSourceFile("index.ts");

          const operationMetadataModule =
            yield* catalogEmitter.emitOperationCatalogModule(
              project,
              metadata,
              operations,
            );

          const resourceMetadataModule =
            yield* catalogEmitter.emitResourceCatalogModule(
              project,
              resourceCatalog,
              resources,
              unresolved,
            );

          const bindings = yield* Effect.forEach(resources, (resource) =>
            bindingsEmitter.emitResourceBindingsModule(
              project,
              resource,
              operations,
              resourceCatalog,
            ),
          );

          const commands = yield* bindingsEmitter.emitResourceCommandLayer(
            project,
            resources,
            operations,
          );
          const declarations = yield* bindingsEmitter.emitResourceDeclarations(
            project,
            resources,
          );

          /**
           * The declaration schemas accept dependencies whose values become
           * available during resource execution. Provider invocation schemas
           * require resolved values and cannot validate those declarations.
           */
          const inputContracts: ReadonlyArray<"values" | "entities"> = [
            "values",
            "entities",
          ];
          const inputs = Arr.flatten(
            yield* Effect.forEach(inputContracts, (contract) =>
              resourceInputs.emitResourceInputModules(
                project,
                catalog,
                resourceCatalog,
                contract,
                [],
                localResources,
              ),
            ),
          );

          const executableResources = Arr.filter(
            resources,
            (resource) =>
              resource.operations !== undefined ||
              resource.source.format === "JsonSchema",
          );
          const roots = Arr.flatMap(executableResources, (resource) => {
            const [provider, , name] = Str.split(resource.typeName, "::");
            return [
              resource.propsSchema ?? `${provider}${name}PropsSchema`,
              ...Option.toArray(
                Option.fromUndefinedOr(resource.declaration).pipe(
                  Option.map(() => `${provider}${name}DeclarationPropsSchema`),
                ),
              ),
            ];
          });

          /**
           * The owners map must include schemas for declarations before imports
           * can be resolved. Their references need the same single declaration
           * for each shared model as the provider contracts.
           */
          const inputAssignments = Arr.flatMap(inputs, (module) =>
            Arr.map(module.getVariableDeclarations(), (declaration) =>
              Tuple.make(
                declaration.getName(),
                path.relative("/", module.getFilePath()),
              ),
            ),
          );

          const owners: Readonly<Record<string, string>> = Record.fromEntries(
            Arr.appendAll(schemaAssignments, inputAssignments),
          );

          const modules = Arr.dedupeWith(
            [
              ...models,
              ...clients,
              ...inputs,
              ...bindings,
              commands,
              declarations,
            ],
            (left, right) => left.getFilePath() === right.getFilePath(),
          );

          yield* resolveImports(modules, owners);

          const resourceExports = Arr.map(resources, (resource) => ({
            moduleSpecifier: `./resourceBindings/${Str.split(resource.typeName, "::")[2]}.js`,
          }));
          const inputExports = Arr.map(
            Arr.flatMap(roots, (name) => [
              name,
              Str.replace(/Schema$/, "EntitySchema")(name),
            ]),
            (name) => ({
              moduleSpecifier: `./resourceInputs/${name}.js`,
            }),
          );
          const clientNames = Arr.dedupe(
            Arr.map(operations, (operation) => operation.client),
          );
          const clientExports = Arr.map(clientNames, (client) => ({
            moduleSpecifier: `./${client}.js`,
          }));

          index.addExportDeclarations([
            { moduleSpecifier: "./configuration.js" },
            { moduleSpecifier: "./catalog.js" },
            { moduleSpecifier: "./resourceCatalog.js" },
            { moduleSpecifier: "./resourceOutputs.js" },
            { moduleSpecifier: "./resourceCommands.js" },
            { moduleSpecifier: "./resourceDeclarations.js" },
            ...resourceExports,
            ...inputExports,
            ...Arr.flatMap(localResources, (resource) =>
              Option.fromUndefinedOr(resource.catalog.documentSchema).pipe(
                Option.map((schema) => ({
                  moduleSpecifier: `./resourceInputs/${schema}.js`,
                })),
                Option.toArray,
              ),
            ),
            ...clientExports,
          ]);

          const generated: ReadonlyArray<SourceFile> = [
            ...modules,
            operationMetadataModule,
            resourceMetadataModule,
            configuration,
            index,
          ];

          return generated;
        },
      );

      return { resolveImports, emitModules };
    }),
  },
) {}

export const stripeModuleEmitterLayer = Layer.effect(
  StripeModuleEmitter,
  StripeModuleEmitter.make,
);
