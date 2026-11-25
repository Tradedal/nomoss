import {
  Array as Arr,
  Context,
  Effect,
  type JsonSchema,
  Match,
  Option,
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
import type {
  AwsOpenApiDocument,
  AwsOpenApiInvocation,
  AwsOpenApiService,
} from "./model.js";

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

const isSchemaCall = (
  node: ts.Node,
): node is ts.CallExpression & {
  readonly expression: ts.PropertyAccessExpression;
} =>
  ts.isCallExpression(node) &&
  ts.isPropertyAccessExpression(node.expression) &&
  ts.isIdentifier(node.expression.expression) &&
  node.expression.expression.text === "Schema";

/**
 * The restJsonSchemaCall function keeps generated structures compatible with
 * AWS replies that omit optional members and return new enum values.
 *
 * @see ../../refs/smithy/docs/source-2.0/spec/simple-types.rst (enum is a specialization of string)
 * @see ../../refs/smithy/smithy-aws-protocol-tests/model/restJson1/json-structs.smithy (RestJsonDoesntDeserializeNullStructureValues)
 */
const restJsonSchemaCall = (
  node: ts.CallExpression & {
    readonly expression: ts.PropertyAccessExpression;
  },
) => {
  const argument = Arr.head(node.arguments);
  const stringEnum = Option.exists(
    argument,
    (values) =>
      ts.isArrayLiteralExpression(values) &&
      Arr.every(values.elements, ts.isStringLiteral),
  );

  return Match.value({ method: node.expression.name.text, stringEnum }).pipe(
    Match.when({ method: "optionalKey" }, () =>
      call(factory.createIdentifier("optionalRestJsonMember"), node.arguments),
    ),
    Match.when({ method: "Literals", stringEnum: true }, () =>
      call(access("Schema", "Union"), [
        factory.createArrayLiteralExpression([
          node,
          access("Schema", "String"),
        ]),
      ]),
    ),
    Match.orElse(() => node),
  );
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
 * The AwsOpenApiTypeScript service generates Effect schemas and callable AWS operations
 * from the normalized OpenAPI model. Its client bindings use AwsClient so
 * generated services share execution behavior and validation contracts.
 */
export class AwsOpenApiTypeScript extends Context.Service<AwsOpenApiTypeScript>()(
  "nomoss/tools/awsCloudControl/typeScript/AwsOpenApiTypeScript",
  {
    make: Effect.gen(function* () {
      const compilation = yield* SchemaCompilation;
      /**
       * The createModule service method opens a TypeScript module with the
       * imports needed for the selected protocol. Later emission uses that
       * module for both schemas and callable operations.
       */
      const createModule = (
        protocol: (typeof AwsOpenApiService.Type)["protocol"],
      ) => {
        const project = new Project({
          useInMemoryFileSystem: true,
          manipulationSettings: { quoteKind: QuoteKind.Double },
        });

        const module: SourceFile = project.createSourceFile("client.ts");

        const httpImports = Match.value(protocol).pipe(
          Match.when("awsQuery", () => []),
          Match.when("restJson1", () => ["HttpApi", "HttpApiGroup"]),
          Match.orElse(() => ["HttpApi", "HttpApiEndpoint", "HttpApiGroup"]),
        );

        const modelImports = Match.value(protocol).pipe(
          Match.when("awsQuery", () => [
            "AwsServiceDefinition",
            "AwsQueryOperation",
          ]),
          Match.when("restJson1", () => ["AwsServiceDefinition"]),
          Match.orElse(() => ["AwsServiceDefinition", "AwsJsonRpcOperation"]),
        );

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
          ...Match.value(protocol).pipe(
            Match.when("awsQuery", () => []),
            Match.orElse(() => [
              {
                moduleSpecifier: "effect/http-api",
                namedImports: httpImports,
              },
            ]),
          ),
          { moduleSpecifier: "../awsClient.js", namedImports: ["AwsClient"] },
          {
            moduleSpecifier: "../awsClientModel.js",
            isTypeOnly: true,
            namedImports: modelImports,
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
              ...Option.toArray(Option.fromNullOr(operation.output)),
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

          const restJson = Arr.some(
            operations,
            (operation) => operation.rest !== undefined,
          );

          yield* Effect.sync(() => {
            module.transform((traversal) =>
              Match.value(traversal.visitChildren()).pipe(
                Match.when(isSchemaCall, restJsonSchemaCall),
                Match.orElse((node) => node),
              ),
            );
          }).pipe(Effect.when(Effect.succeed(restJson)));

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
          const prefix = Str.camelCase(serviceName);
          const httpOperations = Arr.filter(
            operations,
            (operation) => operation.query === undefined,
          );
          const responseImports = Match.value(
            Arr.some(
              httpOperations,
              (operation) =>
                operation.output === null && operation.rest !== undefined,
            ),
          ).pipe(
            Match.when(true, () => [
              {
                moduleSpecifier: "effect/http-api",
                namedImports: ["HttpApiSchema"],
              },
            ]),
            Match.orElse(() => []),
          );

          module.addImportDeclarations(responseImports);

          const rpcResponseImports = Match.value(
            Arr.some(
              httpOperations,
              (operation) =>
                operation.output === null && operation.rest === undefined,
            ),
          ).pipe(
            Match.when(true, () => [
              {
                moduleSpecifier: "../awsHttpOperation.js",
                namedImports: ["awsJsonRpcEmptyOutput"],
              },
            ]),
            Match.orElse(() => []),
          );

          module.addImportDeclarations(rpcResponseImports);

          const restImports = Match.value(
            Arr.some(operations, (operation) => operation.rest !== undefined),
          ).pipe(
            Match.when(true, () => [
              {
                moduleSpecifier: "../awsClientModel.js",
                isTypeOnly: true,
                namedImports: ["AwsRestJsonOperation"],
              },
              {
                moduleSpecifier: "../awsHttpOperation.js",
                namedImports: ["awsHttpEndpoint", "optionalRestJsonMember"],
              },
            ]),
            Match.orElse(() => []),
          );

          module.addImportDeclarations(restImports);

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
              Arr.map(errors, ({ code, ...error }) =>
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
                      ...Arr.map(
                        Option.toArray(Option.fromUndefinedOr(code)),
                        (value) =>
                          factory.createPropertyAssignment(
                            "code",
                            factory.createStringLiteral(value),
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
                  output: outputSchema,
                  errors: _errors,
                  ...metadata
                } = operation;

                const output = outputSchema ?? `${operation.name}Output`;

                // The emitOperations method selects the JSON RPC reply codec
                // for operations whose output has no modeled members. That
                // protocol accepts empty bodies and empty JSON objects; see
                // refs/smithy/docs/source-2.0/aws/protocols/aws-json.rst.template,
                // Empty body serialization.
                Option.match(Option.fromNullOr(outputSchema), {
                  onNone: () =>
                    emitConstant(
                      module,
                      output,
                      Match.value(operation).pipe(
                        Match.when({ query: Match.defined }, () =>
                          access("Schema", "Void"),
                        ),
                        Match.when({ rest: Match.defined }, ({ rest }) =>
                          call(access("HttpApiSchema", "Empty"), [
                            factory.createNumericLiteral(rest.status),
                          ]),
                        ),
                        Match.orElse(() =>
                          call(
                            factory.createIdentifier("awsJsonRpcEmptyOutput"),
                            [
                              factory.createStringLiteral(
                                operation.headers["content-type"],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  onSome: () => undefined,
                });

                const operationTypeName = Match.value(operation).pipe(
                  Match.when(
                    { query: Match.defined },
                    () => "AwsQueryOperation",
                  ),
                  Match.when({ rest: undefined }, () => "AwsJsonRpcOperation"),
                  Match.orElse(() => "AwsRestJsonOperation"),
                );

                const schemaFields = Arr.map(
                  Record.toEntries({ input, output }),
                  ([field, name]) =>
                    factory.createPropertySignature(
                      [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
                      field,
                      undefined,
                      factory.createTypeQueryNode(
                        factory.createIdentifier(name),
                      ),
                    ),
                );

                const operationType = factory.createIntersectionTypeNode([
                  factory.createTypeReferenceNode(operationTypeName),
                  factory.createTypeLiteralNode(schemaFields),
                ]);

                const declaredMetadata = Record.filter(
                  metadata,
                  (value) => value !== undefined,
                );

                const properties = Arr.map(
                  Record.toEntries(declaredMetadata),
                  ([name, value]) =>
                    factory.createPropertyAssignment(
                      name,
                      jsonExpression(value),
                    ),
                );

                const operationExpression =
                  factory.createObjectLiteralExpression(
                    [
                      ...properties,
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
                  );

                emitConstant(
                  module,
                  `${methodName}Operation`,
                  operationExpression,
                  printer.printNode(
                    ts.EmitHint.Unspecified,
                    operationType,
                    expressionFile,
                  ),
                );

                const emitEndpoint = () =>
                  emitConstant(
                    module,
                    `${methodName}Endpoint`,
                    Match.value(operation.rest).pipe(
                      Match.when(undefined, () =>
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
                      ),
                      Match.orElse(() =>
                        call(factory.createIdentifier("awsHttpEndpoint"), [
                          factory.createStringLiteral(operation.name),
                          factory.createIdentifier(`${methodName}Operation`),
                        ]),
                      ),
                    ),
                  );

                yield* Effect.sync(emitEndpoint).pipe(
                  Effect.when(Effect.succeed(operation.query === undefined)),
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

          yield* Effect.sync(() => {
            const group = call(
              factory.createPropertyAccessExpression(
                call(access("HttpApiGroup", "make"), [
                  factory.createStringLiteral(Str.toLowerCase(serviceName)),
                ]),
                "add",
              ),
              Arr.map(httpOperations, (operation) =>
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
          }).pipe(
            Effect.when(Effect.succeed(Arr.isArrayNonEmpty(httpOperations))),
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
        const serviceIdentifier = `${Str.camelCase(serviceName)}Service`;
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

        declaration.addJsDoc({
          description: `The make${serviceName}Client constructor supplies callable ${serviceName} operations through the shared AwsClient service. Calls validate inputs and responses with the generated schemas and retain typed request, response, and provider failures.`,
        });

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

        // The emitClient service method attaches documentation through
        // ts-morph's JSDocableNode API so regeneration preserves each method's
        // validation and execution contract. See node_modules/ts-morph/lib/ts-morph.d.ts,
        // JSDocableNode.addJsDoc and VariableStatementStructure.docs.
        Arr.forEach(operations, (operation) => {
          const name = Str.uncapitalize(operation.name);

          block.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            docs: [
              {
                description: `The ${name} function invokes AWS ${operation.name} through the shared client. Its Effect returns the decoded ${operation.output ?? "void"} result after a successful response; validation and provider failures remain in the error channel.`,
              },
            ],
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
          });
        });

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
