import { NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  Layer,
  Match,
  Option,
  Order,
  Path,
  Record,
  String as Str,
} from "effect";
import {
  Node,
  Project,
  type SourceFile,
  SyntaxKind,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import { call, identifier, literal, print } from "./codegen/typeScriptNodes.js";
import {
  TypeScriptModulePublisher,
  typeScriptModulePublisherLayer,
} from "./typeScriptModulePublisher.js";

const awsRoot = "providers/aws";
const managementRoot = `${awsRoot}/management`;
const generatedRoot = `${awsRoot}/generated`;
const registryPath = `${generatedRoot}/managementRegistry.ts`;

type ManagementDirectory = "mappings" | "operations";

interface ManagementRegistration {
  readonly key: string;
  readonly declarationPath: string;
  readonly sourcePath: string;
  readonly moduleSpecifier: string;
  readonly exportName: string;
  readonly directory: ManagementDirectory;
}

class AwsManagementRegistrationInvalid extends Data.TaggedError(
  "AwsManagementRegistrationInvalid",
)<{ readonly message: string }> {}

/**
 * The mappingExport pattern extracts "GroupPolicy" from
 * "makeGroupPolicyManagement" to identify the resource in saved state.
 * An export such as "iamLifecycleSettings" can share the module without
 * a registry entry.
 */
const mappingExport = /^make([A-Z][A-Za-z0-9]*)Management$/;

/**
 * The operationExport pattern extracts "AccessKey" from
 * "AccessKeyManagement" so the registry can select the service constructor.
 * An error class such as "ResourceIdentityMismatch" has no registry entry.
 */
const operationExport = /^([A-Z][A-Za-z0-9]*)Management$/;

/**
 * The sourceExtension pattern converts "group.ts" to "group.js" for the
 * runtime import. It leaves "group.js" unchanged.
 */
const sourceExtension = /\.ts$/;

const exportedMappings = (source: SourceFile) => {
  const exports = Arr.filter(source.getVariableStatements(), (statement) =>
    statement.hasExportKeyword(),
  );

  return Arr.flatMap(exports, (statement) =>
    Arr.flatMap(statement.getDeclarations(), (declaration) =>
      Option.liftPredicate(Node.isIdentifier)(declaration.getNameNode()).pipe(
        Option.map((name) => name.getText()),
        Option.toArray,
      ),
    ),
  );
};

const exportedOperations = (source: SourceFile) => {
  const exports = Arr.filter(source.getClasses(), (declaration) =>
    declaration.hasExportKeyword(),
  );

  return Arr.flatMap(exports, (declaration) =>
    Option.toArray(Option.fromUndefinedOr(declaration.getName())),
  );
};

const registrationOrder = Order.mapInput(
  Order.String,
  (registration: ManagementRegistration) => registration.key,
);

const loaderDeclaration = (
  registration: ManagementRegistration,
  importKeyword: ts.Expression,
) => {
  const factory = ts.factory;
  const key = literal(registration.key);
  const module = identifier("module");
  const exported = factory.createPropertyAccessExpression(
    module,
    registration.exportName,
  );

  const definition = Match.value(registration.directory).pipe(
    Match.when("mappings", () => exported),
    Match.when("operations", () =>
      factory.createPropertyAccessExpression(exported, "make"),
    ),
    Match.exhaustive,
  );

  const loadModule = call(importKeyword, [
    literal(registration.moduleSpecifier),
  ]);

  ts.addSyntheticLeadingComment(
    loadModule,
    ts.SyntaxKind.SingleLineCommentTrivia,
    " biome-ignore lint/plugin: Defer this import until a stack command requests the saved resource type.",
    true,
  );

  const arrow = (
    parameters: ReadonlyArray<ts.ParameterDeclaration>,
    body: ts.Expression,
  ) =>
    factory.createArrowFunction(
      undefined,
      undefined,
      parameters,
      undefined,
      undefined,
      body,
    );

  const load = arrow([], loadModule);
  const select = arrow(
    [factory.createParameterDeclaration(undefined, undefined, module)],
    definition,
  );

  const loader = call(identifier("loadAwsManagementDefinition"), [
    key,
    load,
    select,
  ]);

  return factory.createPropertyAssignment(key, loader);
};

const renderRegistry = (
  registrations: ReadonlyArray<ManagementRegistration>,
  importKeyword: ts.Expression,
) => {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile(registryPath);

  const entries = Arr.map(
    Arr.sort(registrations, registrationOrder),
    (registration) => loaderDeclaration(registration, importKeyword),
  );

  source.addImportDeclaration({
    moduleSpecifier: "../management/resourceManagementModule.js",
    namedImports: ["loadAwsManagementDefinition"],
  });

  source.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    docs: [
      {
        description: [
          "The awsManagementLoaders registry lets teardown find the AWS lifecycle",
          "from the resource type in saved state after you remove its declaration.",
          "Run `yarn generate:aws-management` after a change to a management export.",
        ].join("\n"),
      },
    ],
    declarations: [
      {
        name: "awsManagementLoaders",
        initializer: print(
          ts.factory.createObjectLiteralExpression(entries, true),
        ),
      },
    ],
  });

  const registry = source
    .getVariableDeclarationOrThrow("awsManagementLoaders")
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);

  const entryLines = Arr.map(
    Arr.drop(registry.getProperties(), 1),
    (property) => property.getStartLinePos(),
  );

  Arr.forEach(Arr.reverse(entryLines), (position) => {
    source.insertText(position, "\n");
  });

  return source.getFullText();
};

/**
 * The AwsManagementRegistryCompiler service uses exports under each AWS
 * service directory as the source for the runtime registry. An exported
 * mapping provides the lifecycle definition directly. An operation class
 * provides it through its service constructor.
 */
class AwsManagementRegistryCompiler extends Context.Service<AwsManagementRegistryCompiler>()(
  "nomoss/tools/compileAwsManagementRegistry/AwsManagementRegistryCompiler",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const publisher = yield* TypeScriptModulePublisher;

      const project = new Project({ useInMemoryFileSystem: true });

      /**
       * The readRegistrations operation uses the service directory and the
       * export name to identify a resource. Each IAM inline policy has a
       * separate key even though the three definitions share a module.
       */
      const readRegistrations = Effect.fn(
        "AwsManagementRegistryCompiler.readRegistrations",
      )(function* (directory: ManagementDirectory, sourcePath: string) {
        const content = yield* fs.readFileString(sourcePath);

        const source = project.createSourceFile(sourcePath, content, {
          overwrite: true,
        });

        const service = path.basename(path.dirname(sourcePath));
        const moduleSpecifier = Str.replace(
          sourceExtension,
          ".js",
        )(path.relative(generatedRoot, sourcePath));

        const { names, pattern } = Match.value(directory).pipe(
          Match.when("mappings", () => ({
            names: exportedMappings(source),
            pattern: mappingExport,
          })),
          Match.when("operations", () => ({
            names: exportedOperations(source),
            pattern: operationExport,
          })),
          Match.exhaustive,
        );

        return Arr.flatMap(names, (exportName) =>
          Str.match(pattern)(exportName).pipe(
            Option.flatMap(Arr.get(1)),
            Option.map(Str.toLowerCase),
            Option.map(
              (resource): ManagementRegistration => ({
                key: `${service}:${resource}:create`,
                declarationPath: path.join(
                  generatedRoot,
                  "resources",
                  service,
                  `${resource}.ts`,
                ),
                sourcePath,
                moduleSpecifier,
                exportName,
                directory,
              }),
            ),
            Option.toArray,
          ),
        );
      });

      /**
       * The discoverRegistrations operation searches TypeScript modules
       * directly under each AWS service directory. Definition authors can
       * put helper modules deeper in that directory.
       *
       * @see ../refs/effect/packages/effect/src/FileSystem.ts (glob paths are relative to the supplied root)
       */
      const discoverRegistrations = Effect.fn(
        "AwsManagementRegistryCompiler.discoverRegistrations",
      )(function* (directory: ManagementDirectory) {
        const root = path.join(managementRoot, directory);
        const files = yield* fs.glob("*/*.ts", { root });

        const registrations = yield* Effect.forEach(files, (file) =>
          readRegistrations(directory, path.join(root, file)),
        );

        return Arr.flatten(registrations);
      });

      /**
       * The validateRegistrations operation checks that each key identifies
       * exactly one definition with a generated declaration. If two definitions
       * claim the same key, the error names each export and its source path.
       */
      const validateRegistrations = Effect.fn(
        "AwsManagementRegistryCompiler.validateRegistrations",
      )(function* (registrations: ReadonlyArray<ManagementRegistration>) {
        const byKey = Arr.groupBy(
          registrations,
          (registration) => registration.key,
        );

        const duplicates = Arr.filter(
          Record.toEntries(byKey),
          ([, definitions]) => definitions.length > 1,
        );

        yield* Effect.forEach(
          duplicates,
          ([key, definitions]) => {
            const exports = Arr.map(
              definitions,
              ({ sourcePath, exportName }) => `${sourcePath} (${exportName})`,
            );

            return Effect.fail(
              new AwsManagementRegistrationInvalid({
                message: `${key} has multiple management exports: ${Arr.join(exports, ", ")}`,
              }),
            );
          },
          { discard: true },
        );

        yield* Effect.forEach(
          registrations,
          ({ declarationPath, sourcePath, exportName }) =>
            fs.exists(declarationPath).pipe(
              Effect.filterOrFail(
                (exists) => exists,
                () =>
                  new AwsManagementRegistrationInvalid({
                    message: `${sourcePath}: ${exportName} has no generated declaration at ${declarationPath}`,
                  }),
              ),
            ),
          { discard: true },
        );
      });

      /**
       * The compile service method returns the path of the registry that stack
       * commands import. If registration or candidate source validation fails,
       * the previous registry remains available.
       *
       * @see typeScriptModulePublisher.ts (publishModule validates the candidate before it writes the destination)
       */
      const compile = Effect.fn("AwsManagementRegistryCompiler.compile")(
        function* () {
          const mappings = yield* discoverRegistrations("mappings");
          const operations = yield* discoverRegistrations("operations");

          const registrations = Arr.appendAll(mappings, operations);

          yield* validateRegistrations(registrations);

          // The import keyword node must be an expression for createCallExpression.
          // TypeScript's createToken signature only promises a keyword node.
          // See node_modules/@ts-morph/common/lib/typescript.d.ts (NodeFactory and isExpression).
          const token: ts.Node = ts.factory.createToken(
            ts.SyntaxKind.ImportKeyword,
          );
          const importKeyword = yield* Effect.succeed(token).pipe(
            Effect.filterOrFail(
              ts.isExpression,
              () =>
                new AwsManagementRegistrationInvalid({
                  message: "TypeScript did not create an import expression.",
                }),
            ),
          );

          const source = renderRegistry(registrations, importKeyword);

          const publishedPath: string = yield* publisher.publishModule(
            registryPath,
            source,
          );

          return publishedPath;
        },
      );

      return { compile };
    }),
  },
) {}

const compilerLayer = Layer.effect(
  AwsManagementRegistryCompiler,
  AwsManagementRegistryCompiler.make,
).pipe(
  Layer.provide(typeScriptModulePublisherLayer),
  Layer.provide(NodeServices.layer),
);

AwsManagementRegistryCompiler.use((compiler) => compiler.compile()).pipe(
  Effect.provide(compilerLayer),
  NodeRuntime.runMain,
);
