import {
  Array as Arr,
  Context,
  Effect,
  JsonPointer,
  Layer,
  Match,
  Option,
  Record,
  String as Str,
} from "effect";
import {
  type FunctionDeclaration,
  type GetAccessorDeclarationStructure,
  type OptionalKind,
  Scope,
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatementStructure,
} from "ts-morph";
import { ResourceTypeSchema } from "../../../src/core/resource/model.js";
import { ResourceSourceInvalid } from "../../codegen/resourceErrors.js";
import type { ResourceOutputCatalog } from "../../codegen/resourceSchemas.js";
import { jsonExpression } from "../../codegen/typeScriptJson.js";
import {
  access,
  call,
  constant,
  identifier,
  literal,
  print,
} from "./typeScriptNodes.js";

const factory = ts.factory;

/**
 * The StripeResourceDeclarations service emits entities that applications can
 * pass into related declarations before a provider creates those resources.
 * Generated output properties read the owning stack's applied values through
 * its output binding. Catalog selections determine the saved identities and
 * creation secrets that those properties must retain after later observations.
 */
export class StripeResourceDeclarations extends Context.Service<StripeResourceDeclarations>()(
  "nomoss/tools/stripe/generator/stripeResourceDeclarations",
  {
    make: Effect.sync(() => {
      /**
       * The emitOutputProjection service method gives callers a function that
       * selects values to save from a validated provider or local response.
       * For a field marked retainOnRead, a null or absent value falls back to
       * the previous output. The field stays absent from saved JSON when
       * neither value is available. The caller must validate responses before
       * projection and supply a stateType that contains the selected fields.
       */
      const emitOutputProjection = Effect.fn(
        "StripeResourceDeclarations.emitOutputProjection",
      )(
        (
          module: SourceFile,
          resource: ResourceOutputCatalog,
          stateType: ts.TypeNode,
        ) =>
          Effect.sync(() => {
            const [provider, , name] = Str.split(resource.typeName, "::");

            const outputsType = factory.createTypeReferenceNode(
              `${provider}${name}Outputs`,
            );
            const inputOutputs = Record.filter(
              resource.outputs,
              (output) => output.inputParameter !== undefined,
            );
            const resultType = Match.value(inputOutputs).pipe(
              Match.when(Record.isEmptyRecord, () => outputsType),
              Match.orElse(() =>
                factory.createTypeReferenceNode("Omit", [
                  outputsType,
                  factory.createUnionTypeNode(
                    Arr.map(Record.keys(inputOutputs), (name) =>
                      factory.createLiteralTypeNode(literal(name)),
                    ),
                  ),
                ]),
              ),
            );

            const retained = Record.filter(
              resource.outputs,
              (output) => output.retainOnRead === true,
            );

            const fields = Arr.map(
              Record.toEntries(
                Record.filter(
                  resource.outputs,
                  (output) =>
                    output.retainOnRead !== true &&
                    output.inputParameter === undefined,
                ),
              ),
              ([name, output]) => {
                const field = JsonPointer.unescapeToken(
                  Str.substring(1)(output.valuePath),
                );
                const providerValue = access(identifier("state"), field);

                const property: ts.PropertyAssignment =
                  factory.createPropertyAssignment(
                    literal(name),
                    providerValue,
                  );

                return property;
              },
            );

            /**
             * The projectRetained helper keeps a secret available to dependent
             * resources when Stripe returns it only at creation. If neither
             * the observation nor saved state supplies a value, the projected
             * JSON must omit that optional field.
             */
            const projectRetained = (
              names: ReadonlyArray<string>,
              properties: ReadonlyArray<ts.PropertyAssignment>,
            ): ts.Expression =>
              Arr.matchLeft(names, {
                onEmpty: () =>
                  factory.createObjectLiteralExpression(properties, true),
                onNonEmpty: (name, rest) => {
                  const absent = factory.createArrowFunction(
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createParenthesizedExpression(
                      projectRetained(rest, properties),
                    ),
                  );
                  const value = identifier(`${Str.uncapitalize(name)}Value`);
                  const present = factory.createArrowFunction(
                    undefined,
                    undefined,
                    [
                      factory.createParameterDeclaration(
                        undefined,
                        undefined,
                        value,
                      ),
                    ],
                    undefined,
                    factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    factory.createParenthesizedExpression(
                      projectRetained(rest, [
                        ...properties,
                        factory.createPropertyAssignment(literal(name), value),
                      ]),
                    ),
                  );
                  const observed = factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                      identifier("Option"),
                      "fromNullishOr",
                    ),
                    undefined,
                    [identifier(Str.uncapitalize(name))],
                  );

                  const projection: ts.Expression =
                    factory.createCallExpression(
                      factory.createPropertyAccessExpression(
                        identifier("Option"),
                        "match",
                      ),
                      undefined,
                      [
                        observed,
                        factory.createObjectLiteralExpression(
                          [
                            factory.createPropertyAssignment("onNone", absent),
                            factory.createPropertyAssignment("onSome", present),
                          ],
                          true,
                        ),
                      ],
                    );

                  return projection;
                },
              });

            const selectedFields = Arr.map(
              Record.values(
                Record.filter(
                  resource.outputs,
                  (output) => output.inputParameter === undefined,
                ),
              ),
              (output) =>
                factory.createLiteralTypeNode(
                  literal(
                    JsonPointer.unescapeToken(
                      Str.substring(1)(output.valuePath),
                    ),
                  ),
                ),
            );

            const inputType = factory.createTypeReferenceNode("Pick", [
              stateType,
              factory.createUnionTypeNode(selectedFields),
            ]);
            const identityDocumentation = Match.value(inputOutputs).pipe(
              Match.when(Record.isEmptyRecord, () => ""),
              Match.orElse(
                () =>
                  "\nStripeResourcePolicy supplies identity fields from creation parameters\nbefore ResourceModel validates the complete saved outputs.",
              ),
            );

            const declaration = module.addFunction({
              isExported: true,
              leadingTrivia: (writer) => writer.blankLine(),
              name: `project${provider}${name}Outputs`,
              parameters: [
                {
                  name: "state",
                  type: print(inputType),
                },
                ...Arr.match(Record.keys(retained), {
                  onEmpty: () => [],
                  onNonEmpty: () => [
                    {
                      name: "previous",
                      type: print(outputsType),
                      hasQuestionToken: true,
                    },
                  ],
                }),
              ],
              returnType: print(resultType),
              docs: [
                {
                  description: (writer) =>
                    writer
                      .newLine()
                      .writeLine(
                        `The project${provider}${name}Outputs function selects values to save`,
                      )
                      .writeLine(
                        "from a validated response. Fields marked retainOnRead use saved values",
                      )
                      .write("when the response omits them.")
                      .write(identityDocumentation),
                },
              ],
            });

            declaration.addVariableStatements(
              Arr.map(Record.toEntries(retained), ([name, output]) => {
                const field = JsonPointer.unescapeToken(
                  Str.substring(1)(output.valuePath),
                );
                const observed = access(identifier("state"), field);
                const saved = access(identifier("previous"), name, true);

                const value = factory.createBinaryExpression(
                  observed,
                  factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
                  saved,
                );

                const selected: OptionalKind<VariableStatementStructure> = {
                  declarationKind: VariableDeclarationKind.Const,
                  declarations: [
                    { name: Str.uncapitalize(name), initializer: print(value) },
                  ],
                };

                return selected;
              }),
            );

            const outputValue = projectRetained(Record.keys(retained), fields);
            const outputDeclaration = constant(
              "outputs",
              outputValue,
              resultType,
            );

            declaration.addStatements([
              (writer) => writer.blankLine().write(print(outputDeclaration)),
              (writer) =>
                writer
                  .blankLine()
                  .write(
                    print(factory.createReturnStatement(identifier("outputs"))),
                  ),
            ]);

            const projection: FunctionDeclaration = declaration;

            return projection;
          }),
      );

      /**
       * The emitResourceDeclaration service method gives generated declarations
       * a resource identity that relationship schemas can recognize before apply.
       * Callers supply validated props; output values retain their provider
       * schemas for reads after execution.
       */
      const emitResourceDeclaration = Effect.fn(
        "StripeResourceDeclarations.emitResourceDeclaration",
      )(function* (
        module: SourceFile,
        resource: ResourceOutputCatalog,
        propsType: ts.TypeNode,
      ) {
        const [provider, service, name] = Str.split(resource.typeName, "::");

        Option.getOrElse(
          Option.fromUndefinedOr(
            module.getImportDeclaration(
              "../../../../../core/resource/resourceOutputBinding.js",
            ),
          ),
          () =>
            module.addImportDeclaration({
              moduleSpecifier:
                "../../../../../core/resource/resourceOutputBinding.js",
              namedImports: ["ResourceOutputBinding"],
            }),
        );

        const effectImport = Option.getOrElse(
          Option.fromUndefinedOr(module.getImportDeclaration("effect")),
          () => module.addImportDeclaration({ moduleSpecifier: "effect" }),
        );
        Option.getOrElse(
          Arr.findFirst(
            effectImport.getNamedImports(),
            (item) => item.getName() === "Schema",
          ),
          () => effectImport.addNamedImport("Schema"),
        );
        const resourceName = yield* Option.fromUndefinedOr(
          resource.resource,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message:
                  "A resource declaration requires its dispatch identity",
              }),
          ),
        );
        const resourceIdentity = ResourceTypeSchema.make({
          provider: "stripe",
          service: Str.toLowerCase(service),
          resource: resourceName,
        });
        const identityType: ts.TypeLiteralNode = factory.createTypeLiteralNode(
          Arr.map(Record.toEntries(resourceIdentity), ([field, value]) =>
            factory.createPropertySignature(
              [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
              field,
              undefined,
              factory.createLiteralTypeNode(literal(value)),
            ),
          ),
        );
        const entityType: ts.TypeReferenceNode =
          factory.createTypeReferenceNode("ResourceEntity", [identityType]);
        const identitySchemaName = `${provider}${name}ResourceTypeSchema`;
        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: identitySchemaName,
              initializer: print(
                call(access(identifier("Schema"), "Struct"), [
                  factory.createObjectLiteralExpression(
                    Arr.map(
                      Record.toEntries(resourceIdentity),
                      ([field, value]) =>
                        factory.createPropertyAssignment(
                          field,
                          call(access(identifier("Schema"), "Literal"), [
                            literal(value),
                          ]),
                        ),
                    ),
                  ),
                ]),
              ),
            },
          ],
        });

        const resultType = factory.createTypeReferenceNode(
          `${provider}${name}Resource`,
          [factory.createTypeReferenceNode("Props")],
        );

        const fields = Arr.map(
          Record.toEntries(resource.outputs),
          ([outputName, output]) => {
            const field = factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(
                identifier(`${provider}${name}OutputsSchema`),
                "fields",
              ),
              outputName,
            );

            const schema = Match.value(output.required).pipe(
              Match.when(true, () => field),
              Match.orElse(() =>
                factory.createCallExpression(
                  factory.createPropertyAccessExpression(
                    identifier("Schema"),
                    "requiredKey",
                  ),
                  undefined,
                  [field],
                ),
              ),
            );

            const outputType = factory.createIndexedAccessTypeNode(
              factory.createTypeReferenceNode("Required", [
                factory.createTypeReferenceNode(`${provider}${name}Outputs`),
              ]),
              factory.createLiteralTypeNode(literal(outputName)),
            );
            const property: OptionalKind<GetAccessorDeclarationStructure> = {
              name: outputName,
              returnType: print(outputType),
              docs: [
                {
                  description: (writer) =>
                    writer
                      .newLine()
                      .writeLine(
                        "Successful lifecycle writes update this value for declarations owned by the stack.",
                      )
                      .write(
                        "Reading an unavailable value throws ResourceOutputResolutionMissing.",
                      ),
                },
              ],
              statements: [
                print(
                  constant(
                    "value",
                    call(access(identifier("ResourceOutputBinding"), "value"), [
                      access(factory.createThis(), "binding"),
                      access(factory.createThis(), "key"),
                      literal(outputName),
                      schema,
                    ]),
                    outputType,
                  ),
                ),
                print(factory.createReturnStatement(identifier("value"))),
              ],
            };
            return property;
          },
        );

        module.addClass({
          isExported: true,
          name: `${provider}${name}Resource`,
          typeParameters: [{ name: "Props", default: print(propsType) }],
          extends: print(entityType),
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    `The ${provider}${name}Resource class retains its owning stack across declarations.`,
                  )
                  .write(
                    "Applied output properties are ordinary values maintained by the lifecycle.",
                  ),
            },
          ],
          ctors: [
            {
              parameters: [
                { name: "key", type: "ResourceKey" },
                { name: "props", type: "Props", isReadonly: true },
                {
                  name: "binding",
                  type: "ResourceOutputBinding",
                  hasQuestionToken: true,
                  scope: Scope.Private,
                  isReadonly: true,
                },
              ],
              statements: [
                print(
                  factory.createExpressionStatement(
                    call(factory.createSuper(), [
                      factory.createObjectLiteralExpression([
                        factory.createShorthandPropertyAssignment("key"),
                        factory.createPropertyAssignment(
                          "resourceType",
                          jsonExpression(resourceIdentity),
                        ),
                      ]),
                    ]),
                  ),
                ),
              ],
            },
          ],
          getAccessors: fields,
        });

        const declaration = module.addFunction({
          isExported: true,
          name: `create${provider}${name}Declaration`,
          leadingTrivia: (writer) => writer.blankLine(),
          typeParameters: [{ name: "Props" }],
          parameters: [
            { name: "key", type: "ResourceKey" },
            { name: "props", type: "Props" },
            {
              name: "binding",
              type: "ResourceOutputBinding",
              hasQuestionToken: true,
            },
          ],
          returnType: print(resultType),
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    "Callers must validate properties before constructing the declaration.",
                  )
                  .writeLine(
                    "Compatible resources can depend on it before apply supplies provider values.",
                  )
                  .write(
                    "Reading applied outputs requires a binding to the owning stack.",
                  ),
            },
          ],
        });

        declaration.addVariableStatement({
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: "resource",
              type: print(resultType),
              initializer: print(
                factory.createNewExpression(
                  identifier(`${provider}${name}Resource`),
                  [factory.createTypeReferenceNode("Props")],
                  [
                    identifier("key"),
                    identifier("props"),
                    identifier("binding"),
                  ],
                ),
              ),
            },
          ],
        });
        declaration.addStatements((writer) =>
          writer
            .blankLine()
            .write(
              print(factory.createReturnStatement(identifier("resource"))),
            ),
        );

        const generated: FunctionDeclaration = declaration;

        return generated;
      });

      /**
       * The refreshResourceDeclaration service method lets the declaration
       * compiler apply emitter changes to an existing binding while preserving
       * its provider client and output projection. The catalog supplies the
       * resource identity and outputs, and the existing class supplies its
       * default property type. A missing class, identity schema, or factory
       * stops the refresh. The returned module is a candidate for validation
       * before publication.
       */
      const refreshResourceDeclaration = Effect.fn(
        "StripeResourceDeclarations.refreshResourceDeclaration",
      )(function* (module: SourceFile, resource: ResourceOutputCatalog) {
        const [provider, , name] = Str.split(resource.typeName, "::");

        const declaration = module.getClassOrThrow(
          `${provider}${name}Resource`,
        );
        const propsType = declaration
          .getTypeParameters()[0]
          .getDefaultOrThrow().compilerNode;

        declaration.remove();
        module
          .getVariableDeclarationOrThrow(`${provider}${name}ResourceTypeSchema`)
          .getVariableStatementOrThrow()
          .remove();
        module
          .getFunctionOrThrow(`create${provider}${name}Declaration`)
          .remove();

        yield* emitResourceDeclaration(module, resource, propsType);

        const refreshed: SourceFile = module;

        return refreshed;
      });

      return {
        emitOutputProjection,
        emitResourceDeclaration,
        refreshResourceDeclaration,
      };
    }),
  },
) {}

export const stripeResourceDeclarationsLayer = Layer.effect(
  StripeResourceDeclarations,
  StripeResourceDeclarations.make,
);
