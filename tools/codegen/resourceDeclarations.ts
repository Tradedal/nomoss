import {
  Array as Arr,
  Context,
  Effect,
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
} from "ts-morph";
import { ResourceTypeSchema } from "../../src/core/resource/model.js";
import type { ProviderId } from "../../src/providers/provider.js";
import { ResourceSourceInvalid } from "./resourceErrors.js";
import type { ResourceOutputCatalog } from "./resourceSchemas.js";
import { jsonExpression } from "./typeScriptJson.js";
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
 * Generated entities keep their declaration identity before provider creation
 * and read applied outputs from their owning stack. Providers share this
 * contract so relationships and output access use the same core services.
 */
export class ResourceDeclarations extends Context.Service<ResourceDeclarations>()(
  "nomoss/tools/codegen/resourceDeclarations",
  {
    make: Effect.sync(() => {
      /**
       * The emitResourceDeclaration service method gives generated declarations
       * a resource identity that relationship schemas can recognize before apply.
       * Callers supply validated props; output values retain their provider
       * schemas for reads after execution. The output binding import must
       * resolve from the generated module's publication directory.
       */
      const emitResourceDeclaration = Effect.fn(
        "ResourceDeclarations.emitResourceDeclaration",
      )(function* (
        module: SourceFile,
        resource: ResourceOutputCatalog,
        propsType: ts.TypeNode,
        providerId: ProviderId,
        outputBindingModule: string,
      ) {
        const [provider, service, name] = Str.split(resource.typeName, "::");

        Option.getOrElse(
          Option.fromUndefinedOr(
            module.getImportDeclaration(outputBindingModule),
          ),
          () =>
            module.addImportDeclaration({
              moduleSpecifier: outputBindingModule,
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
          provider: providerId,
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
       * before publication. The output binding import must resolve from the
       * existing module's publication directory.
       */
      const refreshResourceDeclaration = Effect.fn(
        "ResourceDeclarations.refreshResourceDeclaration",
      )(function* (
        module: SourceFile,
        resource: ResourceOutputCatalog,
        providerId: ProviderId,
        outputBindingModule: string,
      ) {
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

        yield* emitResourceDeclaration(
          module,
          resource,
          propsType,
          providerId,
          outputBindingModule,
        );

        const refreshed: SourceFile = module;

        return refreshed;
      });
      return { emitResourceDeclaration, refreshResourceDeclaration };
    }),
  },
) {}

export const resourceDeclarationsLayer = Layer.effect(
  ResourceDeclarations,
  ResourceDeclarations.make,
);
