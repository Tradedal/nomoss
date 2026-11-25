import {
  Array as Arr,
  Context,
  Effect,
  JsonPointer,
  JsonSchema,
  Match,
  Option,
  Predicate,
  Record,
  Schema,
  SchemaRepresentation,
  String as Str,
} from "effect";
import {
  type Block,
  Node,
  Project,
  type PropertyAccessExpression,
  type QualifiedName,
  QuoteKind,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import { jsonExpression } from "../codegen/typeScriptJson.js";
import type { CloudFormationResourceDefinition } from "./awsResourceDefinition.js";

const factory = ts.factory;
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const expressionFile = ts.createSourceFile(
  "expression.ts",
  "",
  ts.ScriptTarget.Latest,
);

const printExpression = (
  expression: ts.Expression,
  sourceFile: ts.SourceFile = expressionFile,
): string => {
  const source: string = printer.printNode(
    ts.EmitHint.Expression,
    expression,
    sourceFile,
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

const addBinding = (
  body: Block,
  name: string,
  expression: ts.Expression,
  type?: string,
) => {
  const declaration = body.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{ name, type, initializer: printExpression(expression) }],
  });

  return declaration;
};

/**
 * AwsResourceTypeScript generates resource inputs and applied output values from
 * Registry schemas. Effect compiles schemas, and ts-morph constructs
 * declarations that preserve the provider's output names for graph resolution.
 */
export class AwsResourceTypeScript extends Context.Service<AwsResourceTypeScript>()(
  "nomoss/tools/awsResources/awsResourceTypeScript",
  {
    make: Effect.sync(() => {
      const createModule = () => {
        const project = new Project({
          useInMemoryFileSystem: true,
          manipulationSettings: { quoteKind: QuoteKind.Double },
        });

        const module: SourceFile = project.createSourceFile("resource.ts");

        module.addImportDeclarations([
          {
            moduleSpecifier: "effect",
            namedImports: ["Effect", "Schema"],
            leadingTrivia: (writer) =>
              writer
                .writeLine(
                  "// Generated from the CloudFormation Registry resource schema. Do not edit.",
                )
                .writeLine(
                  "// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.",
                ),
          },
          {
            moduleSpecifier: "nomoss/core",
            namedImports: [
              "annotateResourceSchema",
              "ResourceSchemaAnnotationSchema",
              "ResourceGraphBuilder",
              "ResourceOutput",
              "ResourceOutputSchema",
              "ResourceInputJsonSchema",
              "CloudFormationPropertyReferencesAnnotationId",
              { name: "ResourceKey", isTypeOnly: true },
              { name: "ResourceInputJson", isTypeOnly: true },
            ],
          },
        ]);

        return module;
      };

      /**
       * The importSchemas helper preserves the Registry model's required
       * properties and shared definitions in its input and output schemas.
       * Effect handles schema normalization and validation compilation.
       *
       * Resources without read-only fields use Effect's empty Struct for their
       * output view. Provider model members remain available in persisted nodes.
       */
      const importSchemas = (definition: CloudFormationResourceDefinition) => {
        const { registry } = definition;
        const outputs = Record.keys(definition.outputCatalog.outputs);
        const props = Arr.filter(
          Record.keys(registry.properties),
          (name) =>
            !Arr.contains(
              registry.readOnlyProperties,
              `/properties/${JsonPointer.escapeToken(name)}`,
            ),
        );

        // Registry output classification separates writable declaration values
        // from saved outputs. Both views retain shared definitions, while each
        // view requires only the properties classified for that use.
        const schemas: ReadonlyArray<JsonSchema.JsonSchema> = [
          {
            type: "object",
            properties: Record.filter(registry.properties, (_, name) =>
              Arr.contains(props, name),
            ),
            required: Arr.filter(registry.required, (name) =>
              Arr.contains(props, name),
            ),
            definitions: registry.definitions,
            additionalProperties: false,
          },
          {
            type: "object",
            properties: Record.map(
              definition.outputCatalog.outputs,
              (output) => output.schema,
            ),
            required: Record.keys(
              Record.filter(
                definition.outputCatalog.outputs,
                (output) => output.required,
              ),
            ),
            definitions: registry.definitions,
            additionalProperties: false,
          },
        ];

        // Normalize both views through Effect's supported JSON Schema dialect.
        // Provider defaults remain annotations for generation; they do not fill
        // omitted application properties during declaration decoding.
        const documents = Arr.map(schemas, (schema) =>
          JsonSchema.fromSchemaDraft07(schema),
        );

        const imported = SchemaRepresentation.fromJsonSchemaMultiDocument(
          {
            dialect: "draft-2020-12",
            schemas: [documents[0].schema, documents[1].schema],
            definitions: documents[0].definitions,
          },
          {
            patterns: "apply",
            onEnter: ({ default: _default, ...schema }) => schema,
          },
        );

        const outputAst = Match.value(outputs.length).pipe(
          Match.when(0, () => Schema.Struct({}).ast),
          Match.orElse(() => imported[1].ast),
        );

        return [imported[0], Schema.make(outputAst)] as const;
      };

      /**
       * The compileSchemas helper compiles the Registry input and output views
       * together so their shared definitions have consistent generated names.
       */
      const compileSchemas = (definition: CloudFormationResourceDefinition) => {
        const imported = importSchemas(definition);
        const code: SchemaRepresentation.CodeDocument =
          SchemaRepresentation.toCodeDocument(
            SchemaRepresentation.toRepresentations([
              imported[0].ast,
              imported[1].ast,
            ]),
          );

        return code;
      };

      /**
       * The emitSchema helper preserves Registry constraints through the
       * validation expression compiled by Effect without another interpretation
       * of those constraints.
       */
      const emitSchema = (
        module: SourceFile,
        name: string,
        code: SchemaRepresentation.Code,
        isExported = false,
      ) => {
        const typeName = Match.value(Str.endsWith("Schema")(name)).pipe(
          Match.when(true, () => Str.substring(0, name.length - 6)(name)),
          Match.orElse(() => name),
        );
        const declaration = module.addTypeAlias({
          isExported,
          name: typeName,
          type: code.Type,
        });
        const type = declaration.getTypeNodeOrThrow().compilerNode;
        const modifiers = Match.value(isExported).pipe(
          Match.when(true, () => [
            factory.createModifier(ts.SyntaxKind.ExportKeyword),
          ]),
          Match.orElse(() => undefined),
        );
        const contract: ts.Statement = Option.match(
          Option.liftPredicate(type, ts.isTypeLiteralNode),
          {
            onNone: () =>
              factory.createTypeAliasDeclaration(
                modifiers,
                typeName,
                undefined,
                type,
              ),
            onSome: (literal) =>
              Match.value(literal.members.length).pipe(
                Match.when(0, () =>
                  factory.createTypeAliasDeclaration(
                    modifiers,
                    typeName,
                    undefined,
                    factory.createTypeQueryNode(
                      factory.createQualifiedName(
                        factory.createIdentifier(name),
                        "Type",
                      ),
                    ),
                  ),
                ),
                Match.orElse(() =>
                  factory.createInterfaceDeclaration(
                    modifiers,
                    typeName,
                    undefined,
                    undefined,
                    literal.members,
                  ),
                ),
              ),
          },
        );
        declaration.replaceWithText(
          printer.printNode(
            ts.EmitHint.Unspecified,
            contract,
            module.compilerNode,
          ),
        );
        const statement = module.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const,
          leadingTrivia: (writer) => writer.blankLine(),
          declarations: [{ name, initializer: code.runtime }],
        });

        return statement;
      };

      /**
       * The emitRecursiveSchema helper defers recursive references until their
       * model declarations are available. Their public types remain those
       * produced by Effect.
       */
      const emitRecursiveSchema = (
        module: SourceFile,
        name: string,
        code: SchemaRepresentation.Code,
      ) => {
        const statement = emitSchema(module, name, code);
        const declaration = statement.getDeclarations()[0];
        const deferred = factory.createArrowFunction(
          undefined,
          undefined,
          [],
          factory.createTypeReferenceNode("Schema.Codec", [
            factory.createTypeReferenceNode(name),
          ]),
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          declaration.getInitializerOrThrow().compilerNode,
        );
        declaration.setInitializer(
          printExpression(
            call(access("Schema", "suspend"), [deferred]),
            module.compilerNode,
          ),
        );

        return statement;
      };

      /**
       * The emitSchemas helper supplies property and output roots for resource
       * annotations and provider validation. Shared models have one declaration
       * so references in both roots retain the same definition.
       */
      const emitSchemas = (
        module: SourceFile,
        definition: CloudFormationResourceDefinition,
        code: SchemaRepresentation.CodeDocument,
        resourceName = Str.split(definition.registry.typeName, "::")[2],
      ) => {
        Arr.forEach(code.artifacts, (artifact) =>
          Match.value(artifact).pipe(
            Match.tag("Import", ({ importDeclaration }) => {
              module.addStatements(importDeclaration);
            }),
            Match.orElse(({ identifier, code }) => {
              emitSchema(module, identifier, code);
            }),
          ),
        );
        Arr.forEach(
          Record.toEntries(code.references.recursives),
          ([name, schema]) => emitRecursiveSchema(module, name, schema),
        );
        Arr.forEach(code.references.nonRecursives, ({ $ref, code }) =>
          emitSchema(module, $ref, code),
        );
        Arr.forEach(["Props", "Outputs"], (kind, index) => {
          const statement = emitSchema(
            module,
            `${resourceName}${kind}Schema`,
            code.codes[index],
            true,
          );
          statement.setIsExported(true);
        });
      };

      /**
       * The emitPropertyReferences helper adds output references to inputs whose
       * resource relationships establish allowed targets. Those inputs still
       * accept ordinary values, and unrelated validation remains intact because
       * only the compiled schema nodes for those inputs change.
       */
      const emitPropertyReferences = (
        module: SourceFile,
        definition: CloudFormationResourceDefinition,
      ) => {
        const { registry } = definition;
        const resource = Str.split(registry.typeName, "::")[2];
        const relationships = Record.get(
          definition.cloudFormationRelationships,
          registry.typeName,
        ).pipe(
          Option.map((entry) => entry.relationships),
          Option.getOrElse(() => ({})),
        );

        const propsSource = module
          .getVariableDeclarationOrThrow(`${resource}PropsSchema`)
          .getInitializerOrThrow();
        Arr.forEach(
          propsSource.getDescendantsOfKind(
            ts.SyntaxKind.PropertyAccessExpression,
          ),
          (expression) =>
            Match.value(
              Predicate.and(
                (expression: PropertyAccessExpression) =>
                  expression.getExpression().getText() === "Schema",
                (expression) => expression.getName() === "Json",
              )(expression),
            ).pipe(
              Match.when(true, () =>
                expression.replaceWithText(
                  printer.printNode(
                    ts.EmitHint.Expression,
                    factory.createIdentifier("ResourceInputJsonSchema"),
                    expressionFile,
                  ),
                ),
              ),
              Match.orElse(() => undefined),
            ),
        );
        const propsType = module.getInterfaceOrThrow(`${resource}Props`);
        Arr.forEach(
          propsType.getDescendantsOfKind(ts.SyntaxKind.QualifiedName),
          (type) =>
            Match.value(
              Predicate.and(
                (type: QualifiedName) => type.getLeft().getText() === "Schema",
                (type) => type.getRight().getText() === "Json",
              )(type),
            ).pipe(
              Match.when(true, () =>
                type.replaceWithText(
                  printExpression(
                    factory.createIdentifier("ResourceInputJson"),
                  ),
                ),
              ),
              Match.orElse(() => undefined),
            ),
        );

        const fields = module
          .getVariableDeclarationOrThrow(`${resource}PropsSchema`)
          .getInitializerOrThrow()
          .getFirstDescendantByKindOrThrow(
            ts.SyntaxKind.ObjectLiteralExpression,
          );

        Arr.forEach(Record.toEntries(relationships), ([name, targets]) =>
          Option.match(
            Option.fromUndefinedOr(
              fields.getProperty(
                Predicate.compose(Node.isPropertyAssignment, (property) =>
                  Match.value(property.getNameNode()).pipe(
                    Match.when(
                      Node.isStringLiteral,
                      (node) => node.getLiteralText() === name,
                    ),
                    Match.when(
                      Node.isIdentifier,
                      (node) => node.getText() === name,
                    ),
                    Match.orElse(() => false),
                  ),
                ),
              ),
            ),
            {
              onNone: () => undefined,
              onSome: (field) => {
                const property = field.asKindOrThrow(
                  ts.SyntaxKind.PropertyAssignment,
                );

                const source = property.getInitializerOrThrow();
                const fieldType = propsType.getPropertyOrThrow((property) =>
                  Match.value(property.getNameNode()).pipe(
                    Match.when(
                      Node.isStringLiteral,
                      (node) => node.getLiteralText() === name,
                    ),
                    Match.when(
                      Node.isIdentifier,
                      (node) => node.getText() === name,
                    ),
                    Match.orElse(() => false),
                  ),
                );
                fieldType.setType(
                  printer.printNode(
                    ts.EmitHint.Unspecified,
                    factory.createUnionTypeNode([
                      fieldType.getTypeNodeOrThrow().compilerNode,
                      factory.createTypeReferenceNode("ResourceOutput", [
                        fieldType.getTypeNodeOrThrow().compilerNode,
                      ]),
                    ]),
                    module.compilerNode,
                  ),
                );
                const schema = Match.value(
                  Arr.contains(registry.required, name),
                ).pipe(
                  Match.when(true, () => source.compilerNode),
                  Match.orElse(
                    () =>
                      source.asKindOrThrow(ts.SyntaxKind.CallExpression)
                        .compilerNode.arguments[0],
                  ),
                );

                const union = call(access("Schema", "Union"), [
                  factory.createArrayLiteralExpression([
                    schema,
                    call(factory.createIdentifier("ResourceOutputSchema"), [
                      schema,
                    ]),
                  ]),
                ]);

                const annotations = factory.createObjectLiteralExpression(
                  [
                    factory.createPropertyAssignment(
                      factory.createComputedPropertyName(
                        factory.createIdentifier(
                          "CloudFormationPropertyReferencesAnnotationId",
                        ),
                      ),
                      jsonExpression(
                        Arr.map(targets, (target) => ({
                          targetCloudFormationType: target.cloudformationType,
                          targetPropertyPath: target.propertyPath,
                        })),
                      ),
                    ),
                  ],
                  true,
                );

                const annotated = call(
                  factory.createPropertyAccessExpression(union, "annotate"),
                  [annotations],
                );

                const expression = Match.value(
                  Arr.contains(registry.required, name),
                ).pipe(
                  Match.when(true, () => annotated),
                  Match.orElse(() =>
                    call(access("Schema", "optionalKey"), [annotated]),
                  ),
                );

                property.setInitializer(
                  printExpression(expression, module.compilerNode),
                );
              },
            },
          ),
        );
      };

      /**
       * The emitResourceContract helper exposes outputs as references through
       * the generated schemas and declaration type. Registry identity and
       * property rules remain attached for later Cloud Control operations.
       */
      const emitResourceContract = (
        module: SourceFile,
        definition: CloudFormationResourceDefinition,
        outputBindingModule: string,
      ) => {
        const { registry } = definition;
        const [, service, resource] = Str.split(registry.typeName, "::");
        Arr.forEach(
          module.getImportDeclarationOrThrow("nomoss/core").getNamedImports(),
          (binding) =>
            Match.value(binding.getName()).pipe(
              Match.when("ResourceOutput", () => binding.setIsTypeOnly(true)),
              Match.orElse(() => undefined),
            ),
        );
        module.addImportDeclaration({
          moduleSpecifier: outputBindingModule,
          namedImports: ["ResourceOutputBinding"],
        });
        const annotation = jsonExpression({
          provider: "aws",
          service: Str.toLowerCase(service),
          resource: Str.toLowerCase(resource),
          operation: "create",
          stateSecretOutputKeys: [],
          cloudControl: {
            typeName: registry.typeName,
            primaryIdentifier: registry.primaryIdentifier,
            readOnlyProperties: registry.readOnlyProperties,
            createOnlyProperties: registry.createOnlyProperties,
            writeOnlyProperties: registry.writeOnlyProperties,
          },
        });

        const metadata = call(
          access("ResourceSchemaAnnotationSchema", "make"),
          [annotation],
        );

        const declaration = module.getVariableDeclarationOrThrow(
          `${resource}PropsSchema`,
        );
        const props = call(factory.createIdentifier("annotateResourceSchema"), [
          declaration.getInitializerOrThrow().compilerNode,
          factory.createIdentifier(`${resource}ResourceSchema`),
        ]);

        const initializer = printExpression(props, module.compilerNode);
        module.insertVariableStatement(
          declaration.getVariableStatementOrThrow().getChildIndex(),
          {
            isExported: true,
            declarationKind: VariableDeclarationKind.Const,
            declarations: [
              {
                name: `${resource}ResourceSchema`,
                initializer: printExpression(metadata),
              },
            ],
          },
        );
        declaration.setInitializer(initializer);
        const resourceType = module.addInterface({
          isExported: true,
          leadingTrivia: (writer) => writer.blankLine(),
          name: `${resource}Resource`,
          properties: [
            { name: "key", type: "ResourceKey", isReadonly: true },
            { name: "props", type: `${resource}Props`, isReadonly: true },
            {
              name: "outputs",
              isReadonly: true,
              type: printer.printNode(
                ts.EmitHint.Unspecified,
                factory.createMappedTypeNode(
                  factory.createToken(ts.SyntaxKind.ReadonlyKeyword),
                  factory.createTypeParameterDeclaration(
                    undefined,
                    "Key",
                    factory.createTypeOperatorNode(
                      ts.SyntaxKind.KeyOfKeyword,
                      factory.createTypeReferenceNode(`${resource}Outputs`),
                    ),
                  ),
                  undefined,
                  factory.createToken(ts.SyntaxKind.MinusToken),
                  factory.createIndexedAccessTypeNode(
                    factory.createTypeReferenceNode("Required", [
                      factory.createTypeReferenceNode(`${resource}Outputs`),
                    ]),
                    factory.createTypeReferenceNode("Key"),
                  ),
                  undefined,
                ),
                module.compilerNode,
              ),
            },
          ],
        });

        return resourceType;
      };

      /**
       * Applied fields remain associated with their declaration's owning stack.
       * Reading them requires a known provider value; preparation restores saved
       * values and successful execution publishes changes through shared state.
       */
      const emitResourceRegistration = (
        module: SourceFile,
        definition: CloudFormationResourceDefinition,
      ) => {
        const resource = Str.split(definition.registry.typeName, "::")[2];
        const parameter = factory.createParameterDeclaration(
          undefined,
          undefined,
          "input",
          undefined,
          factory.createTypeLiteralNode(
            Arr.map(
              Record.toEntries({
                key: "ResourceKey",
                props: `${resource}Props`,
              }),
              ([name, type]) =>
                factory.createPropertySignature(
                  [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
                  name,
                  undefined,
                  factory.createTypeReferenceNode(type),
                ),
            ),
          ),
        );

        const operation = factory.createFunctionExpression(
          undefined,
          factory.createToken(ts.SyntaxKind.AsteriskToken),
          undefined,
          undefined,
          [parameter],
          undefined,
          factory.createBlock([], true),
        );

        const registration = module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          leadingTrivia: (writer) => writer.blankLine(),
          declarations: [
            {
              name: `register${resource}`,
              initializer: printExpression(
                call(
                  call(access("Effect", "fn"), [
                    factory.createStringLiteral(`${resource}.register`),
                  ]),
                  [operation],
                ),
              ),
            },
          ],
        });

        const body = registration.getFirstDescendantByKindOrThrow(
          ts.SyntaxKind.Block,
        );

        const delegate = (expression: ts.Expression) =>
          factory.createYieldExpression(
            factory.createToken(ts.SyntaxKind.AsteriskToken),
            expression,
          );

        addBinding(
          body,
          "graph",
          delegate(factory.createIdentifier("ResourceGraphBuilder")),
        );
        addBinding(
          body,
          "graphResource",
          delegate(call(access("graph", "resource"), [access("input", "key")])),
        );
        addBinding(
          body,
          "resourceProps",
          delegate(
            call(
              call(access("Schema", "decodeEffect"), [
                factory.createIdentifier(`${resource}PropsSchema`),
              ]),
              [access("input", "props")],
            ),
          ),
          `${resource}Props`,
        );
        addBinding(
          body,
          "resourceOutputs",
          delegate(
            call(
              call(access("Schema", "decodeEffect"), [
                factory.createIdentifier(`${resource}OutputsSchema`),
              ]),
              [factory.createObjectLiteralExpression()],
            ),
          ),
          `${resource}Outputs`,
        );

        const register = factory.createExpressionStatement(
          delegate(
            call(access("graphResource", "register"), [
              factory.createObjectLiteralExpression(
                Arr.map(
                  Record.toEntries({
                    propsSchema: `${resource}PropsSchema`,
                    outputsSchema: `${resource}OutputsSchema`,
                    props: "resourceProps",
                    outputs: "resourceOutputs",
                  }),
                  ([name, value]) =>
                    factory.createPropertyAssignment(
                      name,
                      factory.createIdentifier(value),
                    ),
                ),
                true,
              ),
            ]),
          ),
        );
        body.addStatements(
          printer.printNode(ts.EmitHint.Unspecified, register, expressionFile),
        );

        const outputs = factory.createObjectLiteralExpression(
          Arr.map(Record.keys(definition.outputCatalog.outputs), (name) => {
            const type = factory.createIndexedAccessTypeNode(
              factory.createTypeReferenceNode("Required", [
                factory.createTypeReferenceNode(`${resource}Outputs`),
              ]),
              factory.createLiteralTypeNode(factory.createStringLiteral(name)),
            );
            const value = call(access("ResourceOutputBinding", "value"), [
              access("graphResource", "outputs"),
              access("input", "key"),
              factory.createStringLiteral(name),
              Match.value(definition.outputCatalog.outputs[name].required).pipe(
                Match.when(true, () =>
                  factory.createPropertyAccessExpression(
                    access(`${resource}OutputsSchema`, "fields"),
                    name,
                  ),
                ),
                Match.orElse(() =>
                  call(access("Schema", "requiredKey"), [
                    factory.createPropertyAccessExpression(
                      access(`${resource}OutputsSchema`, "fields"),
                      name,
                    ),
                  ]),
                ),
              ),
            ]);
            const property: ts.GetAccessorDeclaration =
              factory.createGetAccessorDeclaration(
                undefined,
                factory.createStringLiteral(name),
                [],
                type,
                factory.createBlock(
                  [
                    factory.createVariableStatement(
                      undefined,
                      factory.createVariableDeclarationList(
                        [
                          factory.createVariableDeclaration(
                            "value",
                            undefined,
                            type,
                            value,
                          ),
                        ],
                        ts.NodeFlags.Const,
                      ),
                    ),
                    factory.createReturnStatement(
                      factory.createIdentifier("value"),
                    ),
                  ],
                  true,
                ),
              );
            return property;
          }),
          true,
        );

        const declaration = factory.createObjectLiteralExpression(
          [
            factory.createPropertyAssignment("key", access("input", "key")),
            factory.createPropertyAssignment(
              "props",
              factory.createIdentifier("resourceProps"),
            ),
            factory.createPropertyAssignment("outputs", outputs),
          ],
          true,
        );
        addBinding(body, "resource", declaration, `${resource}Resource`);
        body.addStatements(
          printer.printNode(
            ts.EmitHint.Unspecified,
            factory.createReturnStatement(factory.createIdentifier("resource")),
            expressionFile,
          ),
        );

        Arr.forEach(Arr.drop(body.getStatements(), 2), (statement) =>
          statement.prependWhitespace((writer) => writer.newLine()),
        );

        return registration;
      };

      return {
        createModule,
        importSchemas,
        compileSchemas,
        emitSchema,
        emitRecursiveSchema,
        emitSchemas,
        emitPropertyReferences,
        emitResourceContract,
        emitResourceRegistration,
      };
    }),
  },
) {}
