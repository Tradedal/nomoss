import {
  Array as Arr,
  Context,
  Effect,
  JsonPointer,
  JsonSchema,
  Match,
  Option,
  Record,
  Schema,
  SchemaRepresentation,
  String as Str,
} from "effect";
import {
  Project,
  QuoteKind,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
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
          // This project only edits source. Publication typechecks the emitted
          // declarations in the configured project with the standard libraries.
          // See node_modules/ts-morph/lib/ts-morph.d.ts (ProjectOptions).
          skipLoadingLibFiles: true,
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

      return {
        createModule,
        importSchemas,
        compileSchemas,
        emitSchema,
        emitRecursiveSchema,
        emitSchemas,
      };
    }),
  },
) {}
