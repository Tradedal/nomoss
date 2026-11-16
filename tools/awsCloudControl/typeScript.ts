import {
  Array as Arr,
  Context,
  Effect,
  type JsonSchema,
  Match,
  Record,
  type Schema,
  type SchemaRepresentation,
  String as Str,
} from "effect";
import {
  Project,
  QuoteKind,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import { SchemaCompilation } from "../codegen/schemaCompilation.js";
import type { AwsOpenApiDocument, AwsOpenApiInvocation } from "./model.js";

const factory = ts.factory;
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const expressionFile = ts.createSourceFile(
  "expression.ts",
  "",
  ts.ScriptTarget.Latest,
);

const printExpression = (expression: ts.Expression): string => {
  const source: string = printer.printNode(
    ts.EmitHint.Expression,
    expression,
    expressionFile,
  );

  return source;
};

const access = (
  name: string,
  property: string,
): ts.PropertyAccessExpression => {
  const expression: ts.PropertyAccessExpression =
    factory.createPropertyAccessExpression(
      factory.createIdentifier(name),
      property,
    );

  return expression;
};

const call = (
  expression: ts.Expression,
  arguments_: readonly ts.Expression[],
): ts.CallExpression => {
  const invocation: ts.CallExpression = factory.createCallExpression(
    expression,
    undefined,
    arguments_,
  );

  return invocation;
};

/**
 * jsonExpression represents AWS invocation metadata as TypeScript AST values.
 * String keys retain their exact spelling, and negative numbers remain valid
 * expressions. The helper does not require source templates.
 */
const jsonExpression = (value: Schema.Json): ts.Expression => {
  const expression: ts.Expression = Match.value(value).pipe(
    Match.when(Match.string, (value) => factory.createStringLiteral(value)),
    Match.when(Match.number, (value) =>
      Match.value(value < 0).pipe(
        Match.when(true, () =>
          factory.createPrefixUnaryExpression(
            ts.SyntaxKind.MinusToken,
            factory.createNumericLiteral(-value),
          ),
        ),
        Match.orElse(() => factory.createNumericLiteral(value)),
      ),
    ),
    Match.when(true, () => factory.createTrue()),
    Match.when(false, () => factory.createFalse()),
    Match.when(null, () => factory.createNull()),
    Match.when(Arr.isArray<Schema.Json>, (value) =>
      factory.createArrayLiteralExpression(
        Arr.map(value, jsonExpression),
        true,
      ),
    ),
    Match.orElse((value) =>
      factory.createObjectLiteralExpression(
        Arr.map(Record.toEntries(value), ([name, field]) =>
          factory.createPropertyAssignment(
            factory.createStringLiteral(name),
            jsonExpression(field),
          ),
        ),
        true,
      ),
    ),
  );

  return expression;
};

/**
 * AwsOpenApiTypeScript generates Effect schemas and callable AWS operations
 * from the normalized OpenAPI model. Its client bindings use AwsClient so
 * generated services share execution behavior and validation contracts.
 */
export class AwsOpenApiTypeScript extends Context.Service<AwsOpenApiTypeScript>()(
  "nomoss/tools/awsCloudControl/typeScript/AwsOpenApiTypeScript",
  {
    make: Effect.gen(function* () {
      const compilation = yield* SchemaCompilation;
      /**
       * createModule provides the imports used by compiled validation schemas
       * and public HTTP contracts. The returned ts-morph module supports later
       * declarations through the same AST.
       */
      const createModule = () => {
        const project = new Project({
          useInMemoryFileSystem: true,
          manipulationSettings: { quoteKind: QuoteKind.Double },
        });

        const module: SourceFile = project.createSourceFile("client.ts");

        module.addImportDeclarations([
          {
            moduleSpecifier: "effect",
            namedImports: ["Effect", "Schema"],
            leadingTrivia: (writer) =>
              writer
                .writeLine(
                  "// Generated from Smithy's official OpenAPI transformation. Do not edit.",
                )
                .writeLine(
                  "// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.",
                ),
          },
          {
            moduleSpecifier: "effect/http-api",
            namedImports: ["HttpApi", "HttpApiEndpoint", "HttpApiGroup"],
          },
          { moduleSpecifier: "../awsClient.js", namedImports: ["AwsClient"] },
          {
            moduleSpecifier: "../awsClientModel.js",
            namedImports: [
              { name: "AwsServiceDefinition", isTypeOnly: true },
              { name: "AwsJsonRpcOperation", isTypeOnly: true },
            ],
          },
        ]);

        return module;
      };

      const emitConstant = (
        module: SourceFile,
        name: string,
        expression: ts.Expression,
        type?: string,
      ) => {
        const declaration = module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          leadingTrivia: (writer) => writer.blankLine(),
          declarations: [
            { name, type, initializer: printExpression(expression) },
          ],
        });

        return declaration;
      };

      /**
       * The emitSchema helper gives consumers a value type and validation schema
       * from the same Effect-compiled contract used during operation execution.
       */
      const emitSchema = (
        module: SourceFile,
        name: string,
        code: SchemaRepresentation.Code,
      ) => {
        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          leadingTrivia: (writer) => writer.blankLine(),
          declarations: [{ name, initializer: code.runtime }],
        });

        const declaration = module.addTypeAlias({
          name,
          isExported: true,
          type: printer.printNode(
            ts.EmitHint.Unspecified,
            factory.createTypeQueryNode(
              factory.createQualifiedName(
                factory.createIdentifier(name),
                "Type",
              ),
            ),
            expressionFile,
          ),
        });

        return declaration;
      };

      /**
       * The emitSchemas service method uses Effect to compile request bodies,
       * responses, modeled errors, and their shared components. The emitted
       * references retain the same validation throughout the generated service.
       */
      const emitSchemas = Effect.fn("AwsOpenApiTypeScript.emitSchemas")(
        function* (
          module: SourceFile,
          definitions: JsonSchema.Definitions,
          operations: ReadonlyArray<AwsOpenApiInvocation>,
        ) {
          const names = Arr.dedupe(
            Arr.flatMap(operations, (operation) => [
              operation.input,
              operation.output,
              ...Arr.map(operation.errors, (error) => error.name),
            ]),
          );

          const first = yield* Effect.fromOption(Arr.head(names));

          const normalized = yield* compilation.normalizeSchemas(
            "3.1.0",
            [
              definitions[first],
              ...Arr.map(Arr.drop(names, 1), (name) => definitions[name]),
            ],
            definitions,
          );
          const imported = yield* compilation.importSchemas(normalized, {
            patterns: "apply",
            onEnter: ({ description: _description, ...schema }) => schema,
          });

          const code: SchemaRepresentation.CodeDocument =
            yield* compilation.compileSchemas(imported);

          Arr.forEach(code.references.nonRecursives, (reference) =>
            emitSchema(module, reference.$ref, reference.code),
          );
          Arr.forEach(names, (name, index) =>
            emitSchema(module, name, code.codes[index]),
          );

          return code;
        },
      );

      /**
       * The emitOperations service method derives HTTP contracts and AWS
       * execution metadata from each OpenAPI operation. Shared modeled error
       * declarations keep caller validation and retry handling on identical
       * schemas.
       */
      const emitOperations = Effect.fn("AwsOpenApiTypeScript.emitOperations")(
        function* (
          module: SourceFile,
          serviceName: string,
          operations: ReadonlyArray<AwsOpenApiInvocation>,
        ) {
          const prefix = Str.uncapitalize(serviceName);
          const errorCatalog = `${prefix}Errors`;
          const errors = Arr.dedupeWith(
            Arr.flatMap(operations, (operation) => operation.errors),
            (left: AwsOpenApiInvocation["errors"][number], right) =>
              left.name === right.name,
          );

          emitConstant(
            module,
            errorCatalog,
            factory.createObjectLiteralExpression(
              Arr.map(errors, (error) =>
                factory.createPropertyAssignment(
                  error.name,
                  factory.createObjectLiteralExpression(
                    [
                      ...Arr.map(Record.toEntries(error), ([name, value]) =>
                        factory.createPropertyAssignment(
                          name,
                          jsonExpression(value),
                        ),
                      ),
                      factory.createPropertyAssignment(
                        "schema",
                        factory.createIdentifier(error.name),
                      ),
                    ],
                    true,
                  ),
                ),
              ),
              true,
            ),
          );

          const errorsEqual = Arr.makeEquivalence(
            (left: AwsOpenApiInvocation["errors"][number], right) =>
              left.name === right.name,
          );

          const errorSets = Arr.dedupeWith(operations, (left, right) =>
            errorsEqual(left.errors, right.errors),
          );

          Arr.forEach(errorSets, (operation) =>
            emitConstant(
              module,
              `${Str.uncapitalize(operation.name)}Errors`,
              factory.createArrayLiteralExpression(
                Arr.map(operation.errors, (error) =>
                  access(errorCatalog, error.name),
                ),
                true,
              ),
            ),
          );

          yield* Effect.forEach(
            operations,
            (operation) =>
              Effect.gen(function* () {
                const methodName = Str.uncapitalize(operation.name);
                const errorSet = yield* Effect.fromOption(
                  Arr.findFirst(errorSets, (candidate) =>
                    errorsEqual(candidate.errors, operation.errors),
                  ),
                );

                const {
                  input,
                  output,
                  errors: _errors,
                  ...metadata
                } = operation;

                const operationType = factory.createIntersectionTypeNode([
                  factory.createTypeReferenceNode("AwsJsonRpcOperation"),
                  factory.createTypeLiteralNode(
                    Arr.map(
                      Record.toEntries({ input, output }),
                      ([field, name]) =>
                        factory.createPropertySignature(
                          [
                            factory.createModifier(
                              ts.SyntaxKind.ReadonlyKeyword,
                            ),
                          ],
                          field,
                          undefined,
                          factory.createTypeQueryNode(
                            factory.createIdentifier(name),
                          ),
                        ),
                    ),
                  ),
                ]);

                emitConstant(
                  module,
                  `${methodName}Operation`,
                  factory.createObjectLiteralExpression(
                    [
                      ...Arr.map(Record.toEntries(metadata), ([name, value]) =>
                        factory.createPropertyAssignment(
                          name,
                          jsonExpression(value),
                        ),
                      ),
                      factory.createPropertyAssignment(
                        "input",
                        factory.createIdentifier(input),
                      ),
                      factory.createPropertyAssignment(
                        "output",
                        factory.createIdentifier(output),
                      ),
                      factory.createPropertyAssignment(
                        "errors",
                        factory.createIdentifier(
                          `${Str.uncapitalize(errorSet.name)}Errors`,
                        ),
                      ),
                    ],
                    true,
                  ),
                  printer.printNode(
                    ts.EmitHint.Unspecified,
                    operationType,
                    expressionFile,
                  ),
                );

                emitConstant(
                  module,
                  `${methodName}Endpoint`,
                  call(
                    call(access("HttpApiEndpoint", "make"), [
                      factory.createStringLiteral(operation.method),
                    ]),
                    [
                      factory.createStringLiteral(operation.name),
                      factory.createStringLiteral(operation.path),
                      factory.createObjectLiteralExpression(
                        [
                          factory.createPropertyAssignment(
                            "payload",
                            factory.createIdentifier(input),
                          ),
                          factory.createPropertyAssignment(
                            "success",
                            factory.createIdentifier(output),
                          ),
                        ],
                        true,
                      ),
                    ],
                  ),
                );
              }),
            { discard: true },
          );

          emitConstant(
            module,
            `${prefix}Operations`,
            factory.createObjectLiteralExpression(
              Arr.map(operations, (operation) =>
                factory.createPropertyAssignment(
                  operation.name,
                  factory.createIdentifier(
                    `${Str.uncapitalize(operation.name)}Operation`,
                  ),
                ),
              ),
              true,
            ),
          );

          const group = call(
            factory.createPropertyAccessExpression(
              call(access("HttpApiGroup", "make"), [
                factory.createStringLiteral(Str.toLowerCase(serviceName)),
              ]),
              "add",
            ),
            Arr.map(operations, (operation) =>
              factory.createIdentifier(
                `${Str.uncapitalize(operation.name)}Endpoint`,
              ),
            ),
          );

          emitConstant(
            module,
            `${prefix}Api`,
            call(
              factory.createPropertyAccessExpression(
                call(access("HttpApi", "make"), [
                  factory.createStringLiteral(serviceName),
                ]),
                "add",
              ),
              [group],
            ),
          );
        },
      );

      /**
       * The emitClient helper connects generated service methods to the shared
       * AWS client. The generated constructor returns those methods explicitly
       * and keeps related operation bindings together.
       */
      const emitClient = (
        module: SourceFile,
        serviceName: string,
        service: AwsOpenApiDocument["x-aws-service"],
        operations: ReadonlyArray<AwsOpenApiInvocation>,
      ) => {
        const serviceIdentifier = `${Str.uncapitalize(serviceName)}Service`;
        emitConstant(
          module,
          serviceIdentifier,
          jsonExpression(service),
          "AwsServiceDefinition",
        );

        const methods = Arr.map(operations, (operation) =>
          Str.uncapitalize(operation.name),
        );

        const clientConstructor = factory.createFunctionExpression(
          undefined,
          factory.createToken(ts.SyntaxKind.AsteriskToken),
          undefined,
          undefined,
          [],
          undefined,
          factory.createBlock([], true),
        );

        const declaration = emitConstant(
          module,
          `make${serviceName}Client`,
          call(access("Effect", "gen"), [clientConstructor]),
        );

        const block = declaration.getFirstDescendantByKindOrThrow(
          ts.SyntaxKind.Block,
        );
        block.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: "aws",
              initializer: printExpression(
                factory.createYieldExpression(
                  factory.createToken(ts.SyntaxKind.AsteriskToken),
                  factory.createIdentifier("AwsClient"),
                ),
              ),
            },
          ],
        });

        block.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: "bindOperation",
              initializer: printExpression(
                call(access("aws", "bindOperation"), [
                  factory.createIdentifier(serviceIdentifier),
                ]),
              ),
            },
          ],
        });

        Arr.forEach(methods, (name) =>
          block.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            declarations: [
              {
                name,
                initializer: printExpression(
                  call(factory.createIdentifier("bindOperation"), [
                    factory.createIdentifier(`${name}Operation`),
                  ]),
                ),
              },
            ],
          }),
        );

        block
          .getStatements()[2]
          .prependWhitespace((writer) => writer.newLine());

        const publicApi = factory.createReturnStatement(
          factory.createObjectLiteralExpression(
            Arr.map(methods, (name) =>
              factory.createShorthandPropertyAssignment(name),
            ),
            true,
          ),
        );

        const statements = block.addStatements(
          printer.printNode(ts.EmitHint.Unspecified, publicApi, expressionFile),
        );
        Arr.forEach(statements, (statement) =>
          statement.prependWhitespace((writer) => writer.newLine()),
        );

        return declaration;
      };

      return { createModule, emitSchemas, emitOperations, emitClient };
    }),
  },
) {}
