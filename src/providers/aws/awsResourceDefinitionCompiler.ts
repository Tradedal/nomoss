/**
 * CloudFormation Registry resource models describe the properties CloudFormation
 * accepts and the properties it returns, while the OOB relationship file records
 * which property values can consume another resource's output. This compiler
 * turns one pair of those checked-in sources into the Nomoss schema and graph
 * declaration module that stack code registers for that AWS resource.
 */
import {
  Array as Arr,
  Context,
  Data,
  Effect,
  FileSystem,
  JsonSchema,
  Match,
  Option,
  Path,
  Record,
  Result,
  Schema,
  SchemaRepresentation,
} from "effect";
import * as ChildProcess from "effect/unstable/process/ChildProcess";
import { ChildProcessSpawner } from "effect/unstable/process/ChildProcessSpawner";
import * as ts from "typescript-ast";

/**
 * One checked-in Registry document and the shared relationship source describe
 * the CloudFormation contract for a resource module. The loader validates both
 * files before rendering can derive generated schemas from their contents.
 */
const ReadCloudFormationResourceDefinitionInputSchema = Schema.Struct({
  registrySchemaPath: Schema.NonEmptyString,
  relationshipsPath: Schema.NonEmptyString,
});

/**
 * Publishing replaces the directory assigned to one generated resource module.
 * The rendered module is accepted only through this contract so stale sibling
 * artifacts cannot survive a later generation run.
 */
const PublishNomossResourceModuleInputSchema = Schema.Struct({
  outputPath: Schema.NonEmptyString,
  renderedModule: Schema.NonEmptyString,
});

/**
 * CloudFormation Registry documents are the source of the generated resource's
 * property and output contracts. `readOnlyProperties` separates provider-returned
 * values from registerable properties before the graph builder decodes a node.
 */
const RegistryResourceSchema = Schema.Struct({
  typeName: Schema.TemplateLiteralParser([
    "AWS::",
    Schema.NonEmptyString,
    "::",
    Schema.NonEmptyString,
  ]),
  properties: Schema.Record(Schema.String, Schema.Json),
  definitions: Schema.optional(Schema.Record(Schema.String, Schema.Json)),
  primaryIdentifier: Schema.optional(Schema.Array(Schema.NonEmptyString)),
  readOnlyProperties: Schema.optional(Schema.Array(Schema.NonEmptyString)),
  createOnlyProperties: Schema.optional(Schema.Array(Schema.NonEmptyString)),
});

/**
 * The CDK service-spec relationship document identifies Registry properties that
 * accept another CloudFormation resource's output. The generated property schema
 * carries these targets so graph registration can add an ordering edge when a
 * stack supplies a `ResourceOutputRef`.
 */
const CloudFormationRelationshipsSchema = Schema.Record(
  Schema.NonEmptyString,
  Schema.Struct({
    relationships: Schema.optional(
      Schema.Record(
        Schema.NonEmptyString,
        Schema.Array(
          Schema.Struct({
            cloudformationType: Schema.NonEmptyString,
            propertyPath: Schema.NonEmptyString,
          }),
        ),
      ),
    ),
  }),
);

type CloudFormationResourceDefinition = {
  readonly registry: Schema.Schema.Type<typeof RegistryResourceSchema>;
  readonly cloudFormationRelationships: Schema.Schema.Type<
    typeof CloudFormationRelationshipsSchema
  >;
};

/**
 * A generated module is only handed to stack code after Biome formats it. This
 * error preserves the output path and formatter exit code so the generation
 * command can report the artifact that was not made reviewable.
 */
export class AwsResourceDefinitionFormatFailed extends Data.TaggedError(
  "AwsResourceDefinitionFormatFailed",
)<{
  readonly outputPath: string;
  readonly exitCode: number;
}> {}

/**
 * A generated resource module imports runtime graph services separately from
 * type-only lifecycle contracts. Keeping that distinction in this declaration
 * lets the compiler derive the module imports from one named generation decision
 * instead of repeating TypeScript import assembly at every generated resource.
 */
type GeneratedModuleImport = Data.TaggedEnum<{
  readonly RuntimeImport: {
    readonly modulePath: string;
    readonly names: ReadonlyArray<string>;
  };
  readonly TypeImport: {
    readonly modulePath: string;
    readonly names: ReadonlyArray<string>;
  };
}>;

const GeneratedModuleImport = Data.taggedEnum<GeneratedModuleImport>();

/**
 * TypeScript receives an import declaration only after the generated module has
 * decided whether its names participate in runtime graph registration or only
 * describe the lifecycle contract. The generated module otherwise has no
 * reason to know how TypeScript encodes that distinction.
 */
const renderGeneratedModuleImport = (input: GeneratedModuleImport) =>
  Match.value(input).pipe(
    Match.tagsExhaustive({
      RuntimeImport: ({ modulePath, names }) =>
        ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false,
            undefined,
            ts.factory.createNamedImports(
              Arr.map(names, (name) =>
                ts.factory.createImportSpecifier(
                  false,
                  undefined,
                  ts.factory.createIdentifier(name),
                ),
              ),
            ),
          ),
          ts.factory.createStringLiteral(modulePath),
        ),
      TypeImport: ({ modulePath, names }) =>
        ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            true,
            undefined,
            ts.factory.createNamedImports(
              Arr.map(names, (name) =>
                ts.factory.createImportSpecifier(
                  false,
                  undefined,
                  ts.factory.createIdentifier(name),
                ),
              ),
            ),
          ),
          ts.factory.createStringLiteral(modulePath),
        ),
    }),
  );

/**
 * Stack declarations consume generated Nomoss schemas and graph registration
 * functions, not raw CloudFormation JSON. This service compiles the checked-in
 * Registry model and relationship facts into that module while keeping the
 * filesystem and formatter process in the generator runtime.
 */
export class AwsResourceDefinitionCompiler extends Context.Service<AwsResourceDefinitionCompiler>()(
  "nomoss/providers/aws/awsResourceDefinitionCompiler",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const childProcesses = yield* ChildProcessSpawner;

      return {
        /**
         * A generation command starts from the CloudFormation Registry document
         * and CDK relationship source recorded for one AWS resource. Rendering
         * uses the decoded result so it never has to reopen or reinterpret files.
         */
        readCloudFormationResourceDefinition: Effect.fn(
          "AwsResourceDefinitionCompiler.readCloudFormationResourceDefinition",
        )(function* (input: unknown) {
          const request = yield* Schema.decodeUnknownEffect(
            ReadCloudFormationResourceDefinitionInputSchema,
          )(input);
          const registry = yield* Schema.decodeUnknownEffect(
            Schema.fromJsonString(RegistryResourceSchema),
          )(yield* fs.readFileString(request.registrySchemaPath));
          const cloudFormationRelationships = yield* Schema.decodeUnknownEffect(
            Schema.fromJsonString(CloudFormationRelationshipsSchema),
          )(yield* fs.readFileString(request.relationshipsPath));
          const definition: CloudFormationResourceDefinition = {
            registry,
            cloudFormationRelationships,
          };

          return definition;
        }),

        /**
         * The decoded Registry resource determines the generated Nomoss schema,
         * graph registration contract, and lifecycle service surface. This method
         * renders that module without writing a filesystem artifact, allowing
         * callers that compile several resources to choose their publication step.
         */
        renderNomossResourceModule: Effect.fn(
          "AwsResourceDefinitionCompiler.renderNomossResourceModule",
        )(function* (definition: CloudFormationResourceDefinition) {
          const { registry, cloudFormationRelationships } = definition;
          const [, service, , resource] = registry.typeName;
          const cloudFormationType = `AWS::${service}::${resource}`;
          const propertyReferenceImports: ReadonlyArray<string> = Record.get(
            cloudFormationRelationships,
            cloudFormationType,
          ).pipe(
            Option.flatMap((relationshipDefinition) =>
              Option.fromUndefinedOr(relationshipDefinition.relationships),
            ),
            Option.filter((relationships) =>
              Option.isSome(Arr.head(Record.keys(relationships))),
            ),
            Option.match({
              onNone: () => [],
              onSome: () => [
                "CloudFormationPropertyReferencesAnnotationId",
                "ResourceOutputRefSchema",
              ],
            }),
          );
          /**
           * The Registry marks provider-returned fields with JSON pointers under
           * `readOnlyProperties`. Stack declarations must not submit those fields,
           * while output resolution needs them in the generated output contract.
           */
          const readonlyProperties = Arr.map(
            Option.fromUndefinedOr(registry.readOnlyProperties).pipe(
              Option.getOrElse(() => []),
              Arr.filter((pointer) => /^\/properties\/[^/]+$/.test(pointer)),
            ),
            (pointer) => pointer.slice("/properties/".length),
          );
          /**
           * Registering a resource decodes only CloudFormation properties that a
           * stack may provide. The generated props schema excludes the Registry's
           * read-only fields so graph nodes cannot treat provider outputs as input.
           */
          const propsProperties = Arr.filter(
            Arr.map(Record.toEntries(registry.properties), ([name]) => name),
            (name) => !Arr.contains(readonlyProperties, name),
          );
          /**
           * Effect's JSON Schema representation needs a complete object document
           * for each generated contract. Registry definitions stay attached here
           * because property schemas may refer to them through JSON Schema refs.
           */
          const resourceSchema = (
            names: ReadonlyArray<string>,
          ): JsonSchema.JsonSchema =>
            ({
              type: "object",
              properties: Record.fromEntries(
                Arr.filterMap(names, (name) =>
                  Record.get(registry.properties, name).pipe(
                    Option.map((property) => [name, property] as const),
                    Option.match({
                      onNone: () => Result.failVoid,
                      onSome: Result.succeed,
                    }),
                  ),
                ),
              ),
              definitions: registry.definitions,
              additionalProperties: false,
            }) as JsonSchema.JsonSchema;
          /**
           * The Effect schema representation supplies runtime schema expressions
           * for the Registry object. This operation turns those expressions into
           * TypeScript AST statements so the property-reference pass can attach
           * graph metadata without constructing source code strings by hand.
           *
           * Props emit the Registry definition statements. Outputs reuse them,
           * because both contracts originate from the same Registry document and
           * duplicate declarations would make the generated module invalid.
           */
          const effectSchemaStatements = (
            name: string,
            schema: JsonSchema.JsonSchema,
            includeReferences = true,
          ) => {
            const source = SchemaRepresentation.toCodeDocument(
              SchemaRepresentation.toMultiDocument(
                SchemaRepresentation.fromJsonSchemaDocument(
                  JsonSchema.fromSchemaDraft07(schema),
                ),
              ),
            );
            /**
             * SchemaRepresentation returns a runtime expression rather than an
             * AST node. Parsing that expression preserves Effect's own schema
             * contract while making the surrounding generated declaration safe to
             * inspect and transform as TypeScript.
             */
            const runtimeExpression = (runtime: string) =>
              Match.value(
                ts.createSourceFile(
                  `${name}.ts`,
                  runtime,
                  ts.ScriptTarget.Latest,
                  false,
                  ts.ScriptKind.TS,
                ).statements[0],
              ).pipe(
                Match.when(
                  ts.isExpressionStatement,
                  (statement) => statement.expression,
                ),
                Match.orElse(() => {
                  throw new Error(
                    `Expected an Effect schema runtime expression for ${name}`,
                  );
                }),
              );
            /**
             * Registry definitions become named schema declarations before the
             * generated props schema uses them. The output schema deliberately
             * omits this block and reuses the same declarations.
             */
            const referenceStatements = Match.value(includeReferences).pipe(
              Match.when(true, () =>
                Arr.map(source.references.nonRecursives, ({ $ref, code }) =>
                  ts.factory.createVariableStatement(
                    undefined,
                    ts.factory.createVariableDeclarationList(
                      [
                        ts.factory.createVariableDeclaration(
                          ts.factory.createIdentifier($ref),
                          undefined,
                          undefined,
                          runtimeExpression(code.runtime),
                        ),
                      ],
                      ts.NodeFlags.Const,
                    ),
                  ),
                ),
              ),
              Match.orElse(() => [] as ReadonlyArray<ts.Statement>),
            );
            /**
             * This declaration is the generated props or outputs root schema that
             * stack registration and provider output decoding import by name.
             */
            const schemaStatement = ts.factory.createVariableStatement(
              undefined,
              ts.factory.createVariableDeclarationList(
                [
                  ts.factory.createVariableDeclaration(
                    ts.factory.createIdentifier(name),
                    undefined,
                    undefined,
                    runtimeExpression(source.codes[0].runtime),
                  ),
                ],
                ts.NodeFlags.Const,
              ),
            );
            /**
             * Property-reference annotation updates run over the complete emitted
             * schema statement sequence so nested Registry definitions and the
             * root props declaration remain one coherent generated module.
             */
            const schemaStatements = Arr.append(
              referenceStatements,
              schemaStatement,
            );
            /**
             * Only the generated props root can receive CloudFormation property
             * relationships: output schemas describe values already produced by
             * the resource and cannot introduce graph dependencies. Matching the
             * AST here keeps the OOB relationship fact on the exact property
             * schema that later receives a `ResourceOutputRef`.
             */
            return Arr.map(schemaStatements, (statement) => {
              if (
                name !== propsSource ||
                !ts.isVariableStatement(statement) ||
                statement.declarationList.declarations.length !== 1
              ) {
                return statement;
              }
              const declaration = statement.declarationList.declarations[0];
              if (
                !ts.isIdentifier(declaration.name) ||
                declaration.name.text !== propsSource ||
                declaration.initializer === undefined ||
                !ts.isCallExpression(declaration.initializer) ||
                declaration.initializer.arguments.length !== 1 ||
                !ts.isObjectLiteralExpression(
                  declaration.initializer.arguments[0],
                )
              ) {
                return statement;
              }
              /**
               * Each property is retained unchanged unless the checked-in OOB
               * relationship source names it. Related properties accept a graph
               * output reference in addition to their Registry value and carry
               * the source targets as schema metadata for graph registration.
               */
              const properties = Arr.map(
                declaration.initializer.arguments[0].properties,
                (schemaProperty) => {
                  if (
                    !ts.isPropertyAssignment(schemaProperty) ||
                    (!ts.isIdentifier(schemaProperty.name) &&
                      !ts.isStringLiteral(schemaProperty.name))
                  ) {
                    return schemaProperty;
                  }
                  return Record.get(
                    cloudFormationRelationships,
                    cloudFormationType,
                  ).pipe(
                    Option.flatMap((relationshipDefinition) =>
                      Option.fromUndefinedOr(
                        relationshipDefinition.relationships,
                      ),
                    ),
                    Option.flatMap((relationships) =>
                      Record.get(relationships, schemaProperty.name.text),
                    ),
                    Option.match({
                      onNone: () => schemaProperty,
                      onSome: (targets) => {
                        const referenceValueSchema = call(
                          access(value("Schema"), "Union"),
                          [
                            ts.factory.createArrayLiteralExpression([
                              schemaProperty.initializer,
                              value("ResourceOutputRefSchema"),
                            ]),
                          ],
                        );
                        const referencePropertySchema = Match.value(
                          schemaProperty.initializer,
                        ).pipe(
                          Match.when(
                            (initializer): initializer is ts.CallExpression =>
                              ts.isCallExpression(initializer) &&
                              ts.isPropertyAccessExpression(
                                initializer.expression,
                              ) &&
                              initializer.expression.name.text ===
                                "optionalKey",
                            (initializer) =>
                              ts.factory.updateCallExpression(
                                initializer,
                                initializer.expression,
                                initializer.typeArguments,
                                [
                                  call(access(value("Schema"), "Union"), [
                                    ts.factory.createArrayLiteralExpression([
                                      initializer.arguments[0],
                                      value("ResourceOutputRefSchema"),
                                    ]),
                                  ]),
                                ],
                              ),
                          ),
                          Match.orElse(() => referenceValueSchema),
                        );

                        return ts.factory.updatePropertyAssignment(
                          schemaProperty,
                          schemaProperty.name,
                          call(access(referencePropertySchema, "annotate"), [
                            ts.factory.createObjectLiteralExpression([
                              ts.factory.createPropertyAssignment(
                                ts.factory.createComputedPropertyName(
                                  value(
                                    "CloudFormationPropertyReferencesAnnotationId",
                                  ),
                                ),
                                ts.factory.createArrayLiteralExpression(
                                  Arr.map(targets, (target) =>
                                    ts.factory.createObjectLiteralExpression([
                                      property(
                                        "targetCloudFormationType",
                                        ts.factory.createStringLiteral(
                                          target.cloudformationType,
                                        ),
                                      ),
                                      property(
                                        "targetPropertyPath",
                                        ts.factory.createStringLiteral(
                                          target.propertyPath,
                                        ),
                                      ),
                                    ]),
                                  ),
                                  true,
                                ),
                              ),
                            ]),
                          ]),
                        );
                      },
                    }),
                  );
                },
              );
              return ts.factory.updateVariableStatement(
                statement,
                statement.modifiers,
                ts.factory.updateVariableDeclarationList(
                  statement.declarationList,
                  [
                    ts.factory.updateVariableDeclaration(
                      declaration,
                      declaration.name,
                      declaration.exclamationToken,
                      declaration.type,
                      ts.factory.updateCallExpression(
                        declaration.initializer,
                        declaration.initializer.expression,
                        declaration.initializer.typeArguments,
                        [
                          ts.factory.updateObjectLiteralExpression(
                            declaration.initializer.arguments[0],
                            properties,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            });
          };
          const propsSource = `${resource}PropsSource`;
          const outputsSource = `${resource}OutputsSource`;
          const propsSchema = `${resource}PropsSchema`;
          const outputsSchema = `${resource}OutputsSchema`;
          const props = `${resource}Props`;
          const outputs = `${resource}Outputs`;
          const lifecycle = `${resource}Lifecycle`;
          const lifecycleService = `${resource}LifecycleService`;
          const identifier = ts.factory.createIdentifier;
          const exported = ts.factory.createModifier(
            ts.SyntaxKind.ExportKeyword,
          );
          const readonly = ts.factory.createModifier(
            ts.SyntaxKind.ReadonlyKeyword,
          );
          const value = (name: string) => identifier(name);
          const property = (name: string, initializer: ts.Expression) =>
            ts.factory.createPropertyAssignment(value(name), initializer);
          const access = (target: ts.Expression, name: string) =>
            ts.factory.createPropertyAccessExpression(target, value(name));
          const call = (
            target: ts.Expression,
            argumentsList: ReadonlyArray<ts.Expression> = [],
          ) =>
            ts.factory.createCallExpression(target, undefined, argumentsList);
          /**
           * Stack code imports this module to decode Registry properties, register
           * the resource in the graph, and provide its lifecycle implementation to
           * the provider command layer. The AST below is the complete public
           * module contract for that one CloudFormation resource.
           */
          const resourceModule = ts.factory.createSourceFile(
            [
              ...Arr.map(
                [
                  GeneratedModuleImport.RuntimeImport({
                    modulePath: "effect",
                    names: ["Context", "Effect", "Layer", "Schema"],
                  }),
                  GeneratedModuleImport.RuntimeImport({
                    modulePath: "@nomoss/core",
                    names: [
                      "annotateResourceSchema",
                      "ResourceSchemaAnnotationSchema",
                      "ResourceGraphBuilder",
                      ...propertyReferenceImports,
                    ],
                  }),
                  GeneratedModuleImport.TypeImport({
                    modulePath: "@nomoss/core",
                    names: ["ResourceCommand"],
                  }),
                  GeneratedModuleImport.TypeImport({
                    modulePath: "@nomoss/core",
                    names: ["ResourceCommandPolicy"],
                  }),
                  GeneratedModuleImport.TypeImport({
                    modulePath: "@nomoss/core",
                    names: ["ResourceKey"],
                  }),
                  GeneratedModuleImport.RuntimeImport({
                    modulePath: "@nomoss/providers",
                    names: ["providerCommandPolicyTag"],
                  }),
                ],
                renderGeneratedModuleImport,
              ),
              ...effectSchemaStatements(
                propsSource,
                resourceSchema(propsProperties),
              ),
              ...effectSchemaStatements(
                outputsSource,
                resourceSchema(readonlyProperties),
                false,
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(`${resource}ResourceSchema`),
                      undefined,
                      undefined,
                      call(
                        access(value("ResourceSchemaAnnotationSchema"), "make"),
                        [
                          ts.factory.createObjectLiteralExpression([
                            property(
                              "provider",
                              ts.factory.createStringLiteral("aws"),
                            ),
                            property(
                              "service",
                              ts.factory.createStringLiteral(
                                service.toLowerCase(),
                              ),
                            ),
                            property(
                              "resource",
                              ts.factory.createStringLiteral(
                                resource.toLowerCase(),
                              ),
                            ),
                            property(
                              "operation",
                              ts.factory.createStringLiteral("create"),
                            ),
                            property(
                              "stateSecretOutputKeys",
                              ts.factory.createArrayLiteralExpression(),
                            ),
                          ]),
                        ],
                      ),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(propsSchema),
                      undefined,
                      undefined,
                      call(value("annotateResourceSchema"), [
                        value(propsSource),
                        value(`${resource}ResourceSchema`),
                      ]),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(outputsSchema),
                      undefined,
                      undefined,
                      value(outputsSource),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              ts.factory.createTypeAliasDeclaration(
                [exported],
                value(props),
                undefined,
                ts.factory.createTypeReferenceNode(
                  ts.factory.createQualifiedName(
                    ts.factory.createQualifiedName(
                      value("Schema"),
                      value("Schema"),
                    ),
                    value("Type"),
                  ),
                  [ts.factory.createTypeQueryNode(value(propsSchema))],
                ),
              ),
              ts.factory.createTypeAliasDeclaration(
                [exported],
                value(outputs),
                undefined,
                ts.factory.createTypeReferenceNode(
                  ts.factory.createQualifiedName(
                    ts.factory.createQualifiedName(
                      value("Schema"),
                      value("Schema"),
                    ),
                    value("Type"),
                  ),
                  [ts.factory.createTypeQueryNode(value(outputsSchema))],
                ),
              ),
              ts.factory.createTypeAliasDeclaration(
                [exported],
                value(lifecycle),
                undefined,
                ts.factory.createTypeLiteralNode([
                  ts.factory.createPropertySignature(
                    [readonly],
                    value("resolvePendingOutputs"),
                    undefined,
                    ts.factory.createFunctionTypeNode(
                      undefined,
                      [
                        ts.factory.createParameterDeclaration(
                          undefined,
                          undefined,
                          value("input"),
                          undefined,
                          ts.factory.createTypeLiteralNode([
                            ts.factory.createPropertySignature(
                              [readonly],
                              value("key"),
                              undefined,
                              ts.factory.createTypeReferenceNode(
                                value("ResourceKey"),
                                undefined,
                              ),
                            ),
                            ts.factory.createPropertySignature(
                              [readonly],
                              value("props"),
                              undefined,
                              ts.factory.createTypeReferenceNode(
                                value(props),
                                undefined,
                              ),
                            ),
                          ]),
                        ),
                      ],
                      ts.factory.createTypeReferenceNode(value("ReturnType"), [
                        ts.factory.createIndexedAccessTypeNode(
                          ts.factory.createTypeQueryNode(value(outputsSchema)),
                          ts.factory.createLiteralTypeNode(
                            ts.factory.createStringLiteral("makeEffect"),
                          ),
                        ),
                      ]),
                    ),
                  ),
                  ts.factory.createPropertySignature(
                    [readonly],
                    value("execute"),
                    undefined,
                    ts.factory.createFunctionTypeNode(
                      undefined,
                      [
                        ts.factory.createParameterDeclaration(
                          undefined,
                          undefined,
                          value("command"),
                          undefined,
                          ts.factory.createTypeReferenceNode(
                            value("ResourceCommand"),
                            undefined,
                          ),
                        ),
                      ],
                      ts.factory.createTypeReferenceNode(value("ReturnType"), [
                        ts.factory.createIndexedAccessTypeNode(
                          ts.factory.createIndexedAccessTypeNode(
                            ts.factory.createTypeQueryNode(
                              value("ResourceCommandPolicy"),
                            ),
                            ts.factory.createLiteralTypeNode(
                              ts.factory.createStringLiteral("Service"),
                            ),
                          ),
                          ts.factory.createLiteralTypeNode(
                            ts.factory.createStringLiteral("execute"),
                          ),
                        ),
                      ]),
                    ),
                  ),
                ]),
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(lifecycleService),
                      undefined,
                      undefined,
                      ts.factory.createCallExpression(
                        access(value("Context"), "Service"),
                        [
                          ts.factory.createTypeReferenceNode(
                            value(lifecycle),
                            undefined,
                          ),
                          ts.factory.createTypeReferenceNode(
                            value(lifecycle),
                            undefined,
                          ),
                        ],
                        [
                          ts.factory.createStringLiteral(
                            `nomoss/providers/aws/generated/${service.toLowerCase()}/${resource.toLowerCase()}/lifecycle`,
                          ),
                        ],
                      ),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(`register${resource}`),
                      undefined,
                      undefined,
                      call(
                        call(access(value("Effect"), "fn"), [
                          ts.factory.createStringLiteral(
                            `${resource}.register`,
                          ),
                        ]),
                        [
                          ts.factory.createFunctionExpression(
                            undefined,
                            ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
                            undefined,
                            undefined,
                            [
                              ts.factory.createParameterDeclaration(
                                undefined,
                                undefined,
                                value("input"),
                                undefined,
                                ts.factory.createTypeLiteralNode([
                                  ts.factory.createPropertySignature(
                                    [readonly],
                                    value("key"),
                                    undefined,
                                    ts.factory.createTypeReferenceNode(
                                      value("ResourceKey"),
                                      undefined,
                                    ),
                                  ),
                                  ts.factory.createPropertySignature(
                                    [readonly],
                                    value("props"),
                                    undefined,
                                    ts.factory.createTypeReferenceNode(
                                      value(props),
                                      undefined,
                                    ),
                                  ),
                                ]),
                              ),
                            ],
                            undefined,
                            ts.factory.createBlock(
                              [
                                ts.factory.createVariableStatement(
                                  undefined,
                                  ts.factory.createVariableDeclarationList(
                                    [
                                      ts.factory.createVariableDeclaration(
                                        value("graphResource"),
                                        undefined,
                                        undefined,
                                        ts.factory.createYieldExpression(
                                          ts.factory.createToken(
                                            ts.SyntaxKind.AsteriskToken,
                                          ),
                                          call(
                                            access(
                                              ts.factory.createYieldExpression(
                                                ts.factory.createToken(
                                                  ts.SyntaxKind.AsteriskToken,
                                                ),
                                                value("ResourceGraphBuilder"),
                                              ),
                                              "resource",
                                            ),
                                            [access(value("input"), "key")],
                                          ),
                                        ),
                                      ),
                                    ],
                                    ts.NodeFlags.Const,
                                  ),
                                ),
                                ts.factory.createVariableStatement(
                                  undefined,
                                  ts.factory.createVariableDeclarationList(
                                    [
                                      ts.factory.createVariableDeclaration(
                                        value("resourceProps"),
                                        undefined,
                                        undefined,
                                        ts.factory.createYieldExpression(
                                          ts.factory.createToken(
                                            ts.SyntaxKind.AsteriskToken,
                                          ),
                                          call(
                                            access(
                                              value(propsSchema),
                                              "makeEffect",
                                            ),
                                            [access(value("input"), "props")],
                                          ),
                                        ),
                                      ),
                                    ],
                                    ts.NodeFlags.Const,
                                  ),
                                ),
                                ts.factory.createVariableStatement(
                                  undefined,
                                  ts.factory.createVariableDeclarationList(
                                    [
                                      ts.factory.createVariableDeclaration(
                                        value("resourceOutputs"),
                                        undefined,
                                        undefined,
                                        ts.factory.createYieldExpression(
                                          ts.factory.createToken(
                                            ts.SyntaxKind.AsteriskToken,
                                          ),
                                          call(
                                            access(
                                              ts.factory.createYieldExpression(
                                                ts.factory.createToken(
                                                  ts.SyntaxKind.AsteriskToken,
                                                ),
                                                value(lifecycleService),
                                              ),
                                              "resolvePendingOutputs",
                                            ),
                                            [
                                              ts.factory.createObjectLiteralExpression(
                                                [
                                                  property(
                                                    "key",
                                                    access(
                                                      value("input"),
                                                      "key",
                                                    ),
                                                  ),
                                                  property(
                                                    "props",
                                                    value("resourceProps"),
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ],
                                    ts.NodeFlags.Const,
                                  ),
                                ),
                                ts.factory.createExpressionStatement(
                                  ts.factory.createYieldExpression(
                                    ts.factory.createToken(
                                      ts.SyntaxKind.AsteriskToken,
                                    ),
                                    call(
                                      access(
                                        value("graphResource"),
                                        "register",
                                      ),
                                      [
                                        ts.factory.createObjectLiteralExpression(
                                          [
                                            property(
                                              "propsSchema",
                                              value(propsSchema),
                                            ),
                                            property(
                                              "outputsSchema",
                                              value(outputsSchema),
                                            ),
                                            property(
                                              "props",
                                              value("resourceProps"),
                                            ),
                                            property(
                                              "outputs",
                                              value("resourceOutputs"),
                                            ),
                                          ],
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                ts.factory.createReturnStatement(
                                  ts.factory.createObjectLiteralExpression([
                                    property(
                                      "key",
                                      access(value("input"), "key"),
                                    ),
                                    property("props", value("resourceProps")),
                                    property(
                                      "outputs",
                                      value("resourceOutputs"),
                                    ),
                                  ]),
                                ),
                              ],
                              true,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
              ts.factory.createVariableStatement(
                [exported],
                ts.factory.createVariableDeclarationList(
                  [
                    ts.factory.createVariableDeclaration(
                      value(`${resource}ResourceCommandPolicyLayer`),
                      undefined,
                      undefined,
                      call(access(value("Layer"), "unwrap"), [
                        call(access(value("Effect"), "map"), [
                          value(lifecycleService),
                          ts.factory.createArrowFunction(
                            undefined,
                            undefined,
                            [
                              ts.factory.createParameterDeclaration(
                                undefined,
                                undefined,
                                value("lifecycle"),
                              ),
                            ],
                            undefined,
                            undefined,
                            call(access(value("Layer"), "succeed"), [
                              call(value("providerCommandPolicyTag"), [
                                value(`${resource}ResourceSchema`),
                              ]),
                              ts.factory.createObjectLiteralExpression([
                                property(
                                  "execute",
                                  access(value("lifecycle"), "execute"),
                                ),
                              ]),
                            ]),
                          ),
                        ]),
                      ]),
                    ),
                  ],
                  ts.NodeFlags.Const,
                ),
              ),
            ],
            ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
            ts.NodeFlags.None,
          );
          const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
          });
          /**
           * Each top-level declaration is printed separately so schemas, service
           * contracts, registration, and command-layer wiring remain visibly
           * separated after Biome formats the generated module.
           */
          const rendered = Arr.join(
            Arr.map(resourceModule.statements, (statement) =>
              printer.printNode(
                ts.EmitHint.Unspecified,
                statement,
                resourceModule,
              ),
            ),
            "\n\n",
          );
          return rendered;
        }),

        /**
         * One generated module directory belongs to one Registry resource. This
         * method replaces that directory, writes the rendered module, and invokes
         * Biome before another stack consumer can import the artifact.
         */
        publishNomossResourceModule: Effect.fn(
          "AwsResourceDefinitionCompiler.publishNomossResourceModule",
        )(function* (input: unknown) {
          const publication = yield* Schema.decodeUnknownEffect(
            PublishNomossResourceModuleInputSchema,
          )(input);
          const outputDirectory = path.dirname(publication.outputPath);
          // The directory contains only artifacts for this Registry resource.
          // Replacing it prevents removed declarations from surviving a later run.
          yield* fs.remove(outputDirectory, { recursive: true, force: true });
          yield* fs.makeDirectory(outputDirectory, {
            recursive: true,
          });
          yield* fs.writeFileString(
            publication.outputPath,
            publication.renderedModule,
          );
          yield* Effect.scoped(
            childProcesses
              .spawn(
                ChildProcess.make("yarn", [
                  "biome",
                  "check",
                  "--write",
                  publication.outputPath,
                ]),
              )
              .pipe(
                Effect.flatMap((process) => process.exitCode),
                Effect.filterOrFail(
                  (exitCode) => exitCode === 0,
                  (exitCode) =>
                    new AwsResourceDefinitionFormatFailed({
                      outputPath: publication.outputPath,
                      exitCode,
                    }),
                ),
              ),
          );
        }),
      };
    }),
  },
) {}
