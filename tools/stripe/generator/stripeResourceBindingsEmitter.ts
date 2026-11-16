import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Predicate,
  Record,
  Schema,
  String as Str,
} from "effect";
import {
  type Project,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import { ResourceSourceInvalid } from "../../codegen/resourceErrors.js";
import type {
  OpenApiResourceCatalog,
  ResourceOutputCatalog,
} from "../../codegen/resourceSchemas.js";
import { ResourceReadBinding } from "../../codegen/resourceSchemas.js";
import { jsonExpression } from "../../codegen/typeScriptJson.js";
import type { StripeOpenApiInvocation } from "../model.js";
import { StripeResourceClientEmitter } from "./stripeResourceClientEmitter.js";
import { StripeResourceDeclarations } from "./stripeResourceDeclarations.js";
import {
  access,
  call,
  constant,
  effectFunction,
  identifier,
  literal,
  print,
  property,
  yieldAll,
} from "./typeScriptNodes.js";

const factory = ts.factory;

/**
 * The StripeResourceBindingsEmitter service gives provider and local resources
 * the same contracts for declarations and saved outputs. A provider resource
 * also has a client for creation and reads of its saved identity. Local input
 * and document contracts use the same native schema compiler as provider inputs.
 */
export class StripeResourceBindingsEmitter extends Context.Service<StripeResourceBindingsEmitter>()(
  "nomoss/tools/stripe/generator/stripeResourceBindingsEmitter",
  {
    make: Effect.gen(function* () {
      const declarations = yield* StripeResourceDeclarations;
      const clients = yield* StripeResourceClientEmitter;

      /**
       * The emitResourceBindingsModule service method lets callers declare a
       * resource's dependencies and select the outputs to save after execution.
       * The returned module belongs to the supplied project, which must already
       * contain resourceOutputs.ts for the selected resource.
       *
       * A resource from OpenAPI must have executable create and read operations
       * and a discovered schema for creation. Missing selections fail with
       * ResourceSourceInvalid or NoSuchElementError. A JSON Schema resource
       * requires its generated value and entity input contracts in the same
       * project. Other source formats fail with ResourceSourceInvalid.
       */
      const emitResourceBindingsModule = Effect.fn(
        "StripeResourceBindingsEmitter.emitResourceBindingsModule",
      )(function* (
        project: Project,
        resource: ResourceOutputCatalog,
        operations: ReadonlyArray<StripeOpenApiInvocation>,
        resourceCatalog: OpenApiResourceCatalog,
      ) {
        const resourceName = Str.split(resource.typeName, "::")[2];
        const module = project.createSourceFile(
          `resourceBindings/${resourceName}.ts`,
        );

        const executionImports = Match.value(resource.source.format).pipe(
          Match.when("OpenApi", () => ["Context", "Effect", "Layer"]),
          Match.orElse(() => []),
        );

        const retentionImports = Match.value(
          Arr.some(
            Record.values(resource.outputs),
            (output) => output.retainOnRead === true,
          ),
        ).pipe(
          Match.when(true, () => ["Option"]),
          Match.orElse(() => []),
        );

        const schemaImports = ["Schema"];

        const effectImports = Arr.appendAll(
          Arr.appendAll(executionImports, retentionImports),
          schemaImports,
        );
        const effectDeclarations = Option.some({
          moduleSpecifier: "effect",
          namedImports: effectImports,
        }).pipe(
          Option.filter(() => effectImports.length > 0),
          Option.toArray,
        );

        module.addImportDeclarations(effectDeclarations);

        module.addImportDeclaration({
          moduleSpecifier: "../../../../../core/resource/model.js",
          namedImports: [
            "ResourceEntity",
            { name: "ResourceKey", isTypeOnly: true },
          ],
        });

        yield* Match.value(resource.source.format).pipe(
          Match.when("OpenApi", () =>
            Effect.gen(function* () {
              /**
               * The provider resource module lets creation consume resolved
               * props while reads use the identity in saved outputs. Both
               * operations require the contracts used by the direct client so
               * validation remains consistent across these callers.
               */
              const binding = yield* Effect.fromOption(
                Option.fromUndefinedOr(resource.operations),
              );

              const create = yield* Effect.fromOption(
                Arr.findFirst(
                  operations,
                  (operation) => operation.name === binding.create,
                ),
                () =>
                  new ResourceSourceInvalid({
                    typeName: resource.typeName,
                    message: `Creation operation ${binding.create} has no generated client`,
                  }),
              );

              const read = yield* Effect.fromOption(
                Arr.findFirst(
                  operations,
                  (operation) => operation.name === binding.read.operationId,
                ),
                () =>
                  new ResourceSourceInvalid({
                    typeName: resource.typeName,
                    message: `Read operation ${binding.read.operationId} has no generated client`,
                  }),
              );

              const update = yield* Effect.forEach(
                Option.toArray(Option.fromUndefinedOr(binding.update)),
                (selected) =>
                  Arr.findFirst(
                    operations,
                    (operation) => operation.name === selected.operationId,
                  ).pipe(
                    Effect.fromOption,
                    Effect.mapError(
                      () =>
                        new ResourceSourceInvalid({
                          typeName: resource.typeName,
                          message: `Update operation ${selected.operationId} has no generated client`,
                        }),
                    ),
                  ),
              );

              const [provider, , name] = Str.split(resource.typeName, "::");

              const discovered = yield* Record.get(
                resourceCatalog,
                resource.typeName,
              ).pipe(
                Effect.fromOption,
                Effect.mapError(
                  () =>
                    new ResourceSourceInvalid({
                      typeName: resource.typeName,
                      message:
                        "Resource binding has no discovered creation schema",
                    }),
                ),
              );

              const [inputProvider, , inputResource] = Str.split(
                discovered.typeName,
                "::",
              );
              const inputName =
                discovered.propsSchema ??
                `${inputProvider}${inputResource}PropsSchema`;

              module.addImportDeclaration({
                moduleSpecifier: `../resourceInputs/${inputName}.js`,
                isTypeOnly: true,
                namedImports: [Str.replace(/Schema$/, "")(inputName)],
              });
              const entityInputName = Option.match(
                Option.fromUndefinedOr(discovered.declaration),
                {
                  onNone: () =>
                    Str.replace(/Schema$/, "EntitySchema")(inputName),
                  onSome: () =>
                    `${provider}${name}DeclarationPropsEntitySchema`,
                },
              );
              module.addImportDeclaration({
                moduleSpecifier: `../resourceInputs/${entityInputName}.js`,
                isTypeOnly: true,
                namedImports: [Str.replace(/Schema$/, "")(entityInputName)],
              });

              module.addImportDeclarations([
                {
                  moduleSpecifier: "../resourceOutputs.js",
                  namedImports: [
                    `${provider}${name}OutputsSchema`,
                    { name: `${provider}${name}Outputs`, isTypeOnly: true },
                  ],
                },
                {
                  moduleSpecifier: `../${create.client}.js`,
                  namedImports: [
                    `${create.name}Input`,
                    { name: `${create.name}Output`, isTypeOnly: true },
                  ],
                },
                {
                  moduleSpecifier: `../${read.client}.js`,
                  isTypeOnly: true,
                  namedImports: [`${read.name}Input`, `${read.name}Output`],
                },
              ]);

              module.addImportDeclarations(
                Arr.map(update, (operation) => ({
                  moduleSpecifier: `../${operation.client}.js`,
                  namedImports: [
                    `${operation.name}Input`,
                    { name: `${operation.name}Output`, isTypeOnly: true },
                  ],
                })),
              );

              yield* declarations.emitOutputProjection(
                module,
                resource,
                factory.createTypeReferenceNode(`${create.name}Output`),
              );

              yield* clients.emitReadInputBinding(module, resource, read);

              yield* clients.emitResourceClient(
                module,
                resource,
                create,
                read,
                Arr.head(update).pipe(Option.getOrUndefined),
              );

              yield* declarations.emitResourceDeclaration(
                module,
                resource,
                factory.createTypeReferenceNode(
                  Str.replace(/Schema$/, "")(entityInputName),
                ),
              );
            }),
          ),
          Match.when("JsonSchema", () =>
            Effect.gen(function* () {
              const [provider, , name] = Str.split(resource.typeName, "::");
              const propsSchema = yield* Option.fromUndefinedOr(
                resource.propsSchema,
              ).pipe(Effect.fromOption);
              const entitySchema = Str.replace(
                /Schema$/,
                "EntitySchema",
              )(propsSchema);
              const entityType = Str.replace(/Schema$/, "")(entitySchema);

              module.addImportDeclarations([
                {
                  moduleSpecifier: `../resourceInputs/${entitySchema}.js`,
                  isTypeOnly: true,
                  namedImports: [entityType],
                },
                {
                  moduleSpecifier: "../resourceOutputs.js",
                  namedImports: [
                    `${provider}${name}OutputsSchema`,
                    { name: `${provider}${name}Outputs`, isTypeOnly: true },
                  ],
                },
              ]);

              yield* declarations.emitResourceDeclaration(
                module,
                resource,
                factory.createTypeReferenceNode(entityType),
              );
            }),
          ),
          Match.orElse(() =>
            Effect.fail(
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message:
                  "Stripe bindings require an OpenAPI or JSON Schema source",
              }),
            ),
          ),
        );

        const generated: SourceFile = module;

        return generated;
      });

      /**
       * The emitFileCommandRegistrations service method lets generated local
       * resources use the stack's command dispatch alongside provider resources.
       * Each registration supplies the file policy with validators for resolved
       * properties, published content, and saved outputs. The returned identifiers
       * compose into the generated command Layer. Missing schema or path
       * selections fail emission before publication.
       */
      const emitFileCommandRegistrations = Effect.fn(
        "StripeResourceBindingsEmitter.emitFileCommandRegistrations",
      )(function* (
        module: SourceFile,
        resources: ReadonlyArray<ResourceOutputCatalog>,
      ) {
        const files = Arr.filter(
          resources,
          (resource) => resource.file !== undefined,
        );

        const registrations = yield* Effect.forEach(
          files,
          Effect.fnUntraced(function* (resource) {
            const [provider, , name] = Str.split(resource.typeName, "::");
            const propsSchema = yield* Option.fromUndefinedOr(
              resource.propsSchema,
            ).pipe(Effect.fromOption);
            const documentSchema = yield* Option.fromUndefinedOr(
              resource.documentSchema,
            ).pipe(Effect.fromOption);
            const file = yield* Option.fromUndefinedOr(resource.file).pipe(
              Effect.fromOption,
            );
            const registrationName = `stripe${name}ResourceCommandMetadataLayer`;

            module.addImportDeclarations([
              {
                moduleSpecifier: `./resourceInputs/${propsSchema}.js`,
                namedImports: [propsSchema],
              },
              {
                moduleSpecifier: `./resourceInputs/${documentSchema}.js`,
                namedImports: [documentSchema],
              },
              {
                moduleSpecifier: "./resourceOutputs.js",
                namedImports: [`${provider}${name}OutputsSchema`],
              },
            ]);

            const definition = factory.createObjectLiteralExpression(
              [
                property("propsSchema", identifier(propsSchema)),
                property("documentSchema", identifier(documentSchema)),
                property(
                  "outputsSchema",
                  identifier(`${provider}${name}OutputsSchema`),
                ),
                property("file", jsonExpression(file)),
              ],
              true,
            );

            module.addVariableStatement({
              declarationKind: VariableDeclarationKind.Const,
              declarations: [
                {
                  name: registrationName,
                  initializer: print(
                    call(identifier("jsonFileResourcePolicyRegistration"), [
                      definition,
                    ]),
                  ),
                },
              ],
            });

            const registration: ts.Identifier = identifier(registrationName);

            return registration;
          }),
        );

        module.addImportDeclarations(
          Option.some({
            moduleSpecifier: "../../../file/resourcePolicy.js",
            namedImports: ["jsonFileResourcePolicyRegistration"],
          }).pipe(
            Option.filter(() => files.length > 0),
            Option.toArray,
          ),
        );

        const emitted: ReadonlyArray<ts.Identifier> = registrations;

        return emitted;
      });

      /**
       * The emitResourceCommandLayer service method requires generated clients
       * for creation, reads, and each selected mutation. Its Layer shares
       * the application's StripeClient and ResourceModel with stack execution.
       * Updates use the selected operation when it shares the saved identity
       * mapping used by reads. The policy rejects changes that its update
       * contract cannot represent. Other changes still need an explicit policy.
       * Missing selected clients fail emission before publication.
       */
      const emitResourceCommandLayer = Effect.fn(
        "StripeResourceBindingsEmitter.emitResourceCommandLayer",
      )(function* (
        project: Project,
        resources: ReadonlyArray<ResourceOutputCatalog>,
        operations: ReadonlyArray<StripeOpenApiInvocation>,
      ) {
        const module = project.createSourceFile("resourceCommands.ts");
        module.addImportDeclaration({
          moduleSpecifier: "effect",
          namedImports: ["Layer"],
        });
        const executable = Arr.filter(
          resources,
          Predicate.and(
            (resource: ResourceOutputCatalog) =>
              resource.source.format === "OpenApi",
            (resource) => Predicate.isNotUndefined(resource.operations),
          ),
        );

        const configurations = yield* Effect.forEach(executable, (resource) =>
          Effect.gen(function* () {
            const bindings = yield* Option.fromUndefinedOr(
              resource.operations,
            ).pipe(Effect.fromOption);
            const remove = Option.fromUndefinedOr(bindings.remove);
            const update = Option.fromUndefinedOr(bindings.update).pipe(
              Option.filter((binding) =>
                Schema.toEquivalence(ResourceReadBinding.fields.parameters)(
                  binding.parameters,
                  bindings.read.parameters,
                ),
              ),
            );
            const selected = yield* Effect.forEach(
              Arr.appendAll(
                [
                  bindings.create,
                  bindings.read.operationId,
                  ...Option.toArray(
                    Option.map(remove, (binding) => binding.operationId),
                  ),
                ],
                Option.toArray(
                  Option.map(update, (binding) => binding.operationId),
                ),
              ),
              (name) =>
                Arr.findFirst(
                  operations,
                  (operation) => operation.name === name,
                ).pipe(
                  Effect.fromOption,
                  Effect.mapError(
                    () =>
                      new ResourceSourceInvalid({
                        typeName: resource.typeName,
                        operationId: name,
                        message: `Stack execution requires a generated client for ${name}`,
                      }),
                  ),
                ),
            );
            const [provider, , name] = Str.split(resource.typeName, "::");

            // Fixed removal values must satisfy the selected operation's input
            // type. Saved outputs supply the identity separately, so those
            // parameters are omitted from the type applied to fixed values.
            const fixedRemoval = remove.pipe(
              Option.flatMap((binding) =>
                Option.fromUndefinedOr(binding.values).pipe(
                  Option.map((values) => ({ ...binding, values })),
                ),
              ),
            );
            const removalInput = fixedRemoval.pipe(
              Option.flatMap((binding) =>
                Arr.findFirst(
                  selected,
                  (operation) => operation.name === binding.operationId,
                ),
              ),
            );

            module.addImportDeclarations(
              removalInput.pipe(
                Option.map((operation) => ({
                  moduleSpecifier: `./${operation.client}.js`,
                  namedImports: [
                    { name: `${operation.name}Input`, isTypeOnly: true },
                  ],
                })),
                Option.toArray,
              ),
            );

            const propsSchema = Option.match(
              Option.fromUndefinedOr(resource.declaration),
              {
                onNone: () =>
                  resource.propsSchema ?? `${provider}${name}PropsSchema`,
                onSome: () => `${provider}${name}DeclarationPropsSchema`,
              },
            );
            const layerName = `stripe${name}ResourceCommandMetadataLayer`;
            module.addImportDeclarations([
              {
                moduleSpecifier: `./resourceInputs/${propsSchema}.js`,
                namedImports: [propsSchema],
              },
              {
                moduleSpecifier: "./resourceOutputs.js",
                namedImports: [
                  `${provider}${name}OutputsSchema`,
                  ...Option.toArray(
                    Option.fromUndefinedOr(resource.responseSchema).pipe(
                      Option.map(() => `${provider}${name}ResponseSchema`),
                    ),
                  ),
                ],
              },
              {
                moduleSpecifier: `./resourceBindings/${name}.js`,
                namedImports: [
                  `bind${provider}${name}ReadInput`,
                  `project${provider}${name}Outputs`,
                ],
              },
            ]);
            const inputOutputs = Record.getSomes(
              Record.map(resource.outputs, (output) =>
                Option.fromUndefinedOr(output.inputParameter),
              ),
            );
            const configuration = factory.createObjectLiteralExpression(
              [
                property("propsSchema", identifier(propsSchema)),
                property(
                  "outputsSchema",
                  identifier(`${provider}${name}OutputsSchema`),
                ),
                property(
                  "identify",
                  identifier(`bind${provider}${name}ReadInput`),
                ),
                property(
                  "projectOutputs",
                  identifier(`project${provider}${name}Outputs`),
                ),
                ...Option.toArray(
                  Option.fromUndefinedOr(
                    resource.request ?? resource.declaration,
                  ).pipe(
                    Option.map(() =>
                      property(
                        "request",
                        jsonExpression({
                          ...resource.request,
                          ...Option.match(
                            Option.fromUndefinedOr(resource.declaration),
                            {
                              onNone: () => ({}),
                              onSome: (declaration) => ({
                                propertyPath: [declaration.property],
                              }),
                            },
                          ),
                        }),
                      ),
                    ),
                  ),
                ),
                ...Option.toArray(
                  Option.fromUndefinedOr(resource.responseSchema).pipe(
                    Option.map(() =>
                      property(
                        "responseSchema",
                        identifier(`${provider}${name}ResponseSchema`),
                      ),
                    ),
                  ),
                ),
                ...Match.value(inputOutputs).pipe(
                  Match.when(Record.isEmptyRecord, () => []),
                  Match.orElse((outputs) => [
                    property("inputOutputs", jsonExpression(outputs)),
                  ]),
                ),
                property(
                  "operations",
                  factory.createObjectLiteralExpression(
                    [
                      property(
                        "create",
                        identifier(`${bindings.create}Operation`),
                      ),
                      property(
                        "read",
                        identifier(`${bindings.read.operationId}Operation`),
                      ),
                      ...Option.toArray(
                        Option.map(update, (binding) =>
                          property(
                            "update",
                            identifier(`${binding.operationId}Operation`),
                          ),
                        ),
                      ),
                      ...Option.toArray(
                        Option.map(remove, (binding) =>
                          property(
                            "remove",
                            identifier(`${binding.operationId}Operation`),
                          ),
                        ),
                      ),
                    ],
                    true,
                  ),
                ),
                property(
                  "removalValues",
                  Option.match(fixedRemoval, {
                    onNone: () => factory.createObjectLiteralExpression(),
                    onSome: (binding) =>
                      factory.createSatisfiesExpression(
                        jsonExpression(binding.values),
                        factory.createTypeReferenceNode("Omit", [
                          factory.createTypeReferenceNode(
                            `${binding.operationId}Input`,
                          ),
                          factory.createUnionTypeNode(
                            Arr.map(Record.keys(binding.parameters), (name) =>
                              factory.createLiteralTypeNode(
                                factory.createStringLiteral(name),
                              ),
                            ),
                          ),
                        ]),
                      ),
                  }),
                ),
                property(
                  "deletedResponseMeansMissing",
                  jsonExpression(resource.deletedResponseMeansMissing ?? false),
                ),
              ],
              true,
            );
            module.addVariableStatement({
              declarationKind: VariableDeclarationKind.Const,
              declarations: [
                {
                  name: layerName,
                  initializer: print(
                    call(identifier("stripeResourcePolicyRegistration"), [
                      configuration,
                    ]),
                  ),
                },
              ],
            });
            const registration: ts.Identifier = identifier(layerName);
            return { registration, operations: selected };
          }),
        );

        const fileRegistrations = yield* emitFileCommandRegistrations(
          module,
          resources,
        );

        const registrations = Arr.appendAll(
          Arr.map(
            configurations,
            (configuration) => configuration.registration,
          ),
          fileRegistrations,
        );
        const selectedOperations = Arr.dedupeWith(
          Arr.flatMap(
            configurations,
            (configuration) => configuration.operations,
          ),
          (left: StripeOpenApiInvocation, right: StripeOpenApiInvocation) =>
            left.name === right.name,
        );
        module.addImportDeclarations(
          Arr.map(selectedOperations, (operation) => ({
            moduleSpecifier: `./${operation.client}.js`,
            namedImports: [`${operation.name}Operation`],
          })),
        );

        module.addImportDeclarations(
          Option.some({
            moduleSpecifier: "../../management/resourcePolicy.js",
            namedImports: ["stripeResourcePolicyRegistration"],
          }).pipe(
            Option.filter(() => configurations.length > 0),
            Option.toArray,
          ),
        );
        const layer = Match.value(registrations.length).pipe(
          Match.when(0, () => access(identifier("Layer"), "empty")),
          Match.orElse(() =>
            call(access(identifier("Layer"), "mergeAll"), registrations),
          ),
        );
        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    "The stripeGeneratedResourceCommandLayer Layer lets stack commands find",
                  )
                  .writeLine(
                    "the execution policy for each generated resource's saved identity.",
                  )
                  .writeLine(
                    "Provider commands require StripeClient; file commands require the",
                  )
                  .writeLine(
                    "application filesystem. Compose these registrations in the shared stack graph.",
                  ),
            },
          ],
          declarations: [
            {
              name: "stripeGeneratedResourceCommandLayer",
              initializer: print(layer),
            },
          ],
        });
        const generated: SourceFile = module;
        return generated;
      });

      /**
       * The emitResourceDeclarations service method connects generated outputs
       * to the application's declaration graph so applied properties expose
       * ordinary values. Every resolved OpenAPI resource receives that
       * connection, including resources with incomplete lifecycle support.
       */
      const emitResourceDeclarations = Effect.fn(
        "StripeResourceBindingsEmitter.emitResourceDeclarations",
      )(function* (
        project: Project,
        resources: ReadonlyArray<ResourceOutputCatalog>,
      ) {
        const module = project.createSourceFile("resourceDeclarations.ts");
        module.addImportDeclarations([
          { moduleSpecifier: "effect", namedImports: ["Effect", "Schema"] },
          {
            moduleSpecifier: "../../../../core/resource/model.js",
            isTypeOnly: true,
            namedImports: ["ResourceKey"],
          },
          {
            moduleSpecifier:
              "../../../../core/resource/resourceGraphBuilder.js",
            namedImports: ["ResourceGraphBuilder"],
          },
        ]);

        const selected = Arr.filter(
          resources,
          (resource) =>
            resource.source.format === "OpenApi" ||
            resource.source.format === "JsonSchema",
        );
        const methods = Arr.map(selected, (resource) => {
          const [provider, , name] = Str.split(resource.typeName, "::");
          const requestSchema = Option.match(
            Option.fromUndefinedOr(resource.declaration),
            {
              onNone: () =>
                resource.propsSchema ?? `${provider}${name}PropsSchema`,
              onSome: () => `${provider}${name}DeclarationPropsSchema`,
            },
          );
          const propsSchema = Str.replace(
            /Schema$/,
            "EntitySchema",
          )(requestSchema);
          const propsType = Str.replace(/Schema$/, "")(propsSchema);
          const resourceType = `${provider}${name}Resource`;
          const declarationFactory = `create${provider}${name}Declaration`;
          const outputsSchema = `${provider}${name}OutputsSchema`;
          module.addImportDeclarations([
            {
              moduleSpecifier: `./resourceInputs/${requestSchema}.js`,
              namedImports: [requestSchema],
            },
            {
              moduleSpecifier: `./resourceBindings/${name}.js`,
              namedImports: [
                declarationFactory,
                { name: resourceType, isTypeOnly: true },
              ],
            },
            {
              moduleSpecifier: `./resourceInputs/${propsSchema}.js`,
              namedImports: [
                propsSchema,
                { name: propsType, isTypeOnly: true },
              ],
            },
            {
              moduleSpecifier: "./resourceOutputs.js",
              namedImports: [outputsSchema],
            },
          ]);
          const inputProperties = factory.createTypeLiteralNode([
            factory.createPropertySignature(
              [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
              "logicalId",
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
            factory.createPropertySignature(
              [factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
              "props",
              undefined,
              Option.match(Option.fromUndefinedOr(resource.declaration), {
                onNone: () => factory.createTypeReferenceNode(propsType),
                onSome: (declaration) =>
                  factory.createIndexedAccessTypeNode(
                    factory.createTypeReferenceNode(propsType),
                    factory.createLiteralTypeNode(
                      literal(declaration.property),
                    ),
                  ),
              }),
            ),
          ]);
          const inputType = Option.match(
            Option.fromUndefinedOr(resource.declaration),
            {
              onNone: () => inputProperties,
              onSome: (declaration) =>
                factory.createIntersectionTypeNode([
                  inputProperties,
                  factory.createTypeReferenceNode("Omit", [
                    factory.createTypeReferenceNode(propsType),
                    factory.createLiteralTypeNode(
                      literal(declaration.property),
                    ),
                  ]),
                ]),
            },
          );
          const declarationProps = Option.match(
            Option.fromUndefinedOr(resource.declaration),
            {
              onNone: () => access(identifier("input"), "props"),
              onSome: (declaration) => {
                const effectImport =
                  module.getImportDeclarationOrThrow("effect");
                Arr.forEach(["Record", "Predicate"], (name) =>
                  Option.getOrElse(
                    Arr.findFirst(
                      effectImport.getNamedImports(),
                      (item) => item.getName() === name,
                    ),
                    () => effectImport.addNamedImport(name),
                  ),
                );

                return call(access(identifier("Record"), "filter"), [
                  factory.createObjectLiteralExpression(
                    [
                      property(
                        print(literal(declaration.property)),
                        access(identifier("input"), "props"),
                      ),
                      ...Arr.map(Record.keys(declaration.properties), (name) =>
                        property(
                          print(literal(name)),
                          access(identifier("input"), name),
                        ),
                      ),
                    ],
                    true,
                  ),
                  access(identifier("Predicate"), "isNotUndefined"),
                ]);
              },
            },
          );
          const method = constant(
            name,
            effectFunction(
              `StripeResources.${name}`,
              [
                factory.createParameterDeclaration(
                  undefined,
                  undefined,
                  "input",
                  undefined,
                  inputType,
                ),
              ],
              [
                constant(
                  "key",
                  factory.createObjectLiteralExpression([
                    property(
                      "logicalId",
                      access(identifier("input"), "logicalId"),
                    ),
                  ]),
                  factory.createTypeReferenceNode("ResourceKey"),
                ),
                constant(
                  "declaration",
                  yieldAll(
                    call(access(identifier("graph"), "resource"), [
                      identifier("key"),
                    ]),
                  ),
                ),
                constant(
                  "props",
                  yieldAll(
                    call(
                      call(
                        access(
                          identifier("Schema"),
                          Option.match(
                            Option.fromUndefinedOr(resource.declaration),
                            {
                              onNone: () => "decodeEffect",
                              onSome: () => "decodeUnknownEffect",
                            },
                          ),
                        ),
                        [
                          call(access(identifier("Schema"), "toType"), [
                            identifier(propsSchema),
                          ]),
                        ],
                      ),
                      [declarationProps],
                    ),
                  ),
                ),
                factory.createExpressionStatement(
                  yieldAll(
                    call(access(identifier("declaration"), "register"), [
                      factory.createObjectLiteralExpression(
                        [
                          property("propsSchema", identifier(propsSchema)),
                          property("outputsSchema", identifier(outputsSchema)),
                          property("requestSchema", identifier(requestSchema)),
                          factory.createShorthandPropertyAssignment("props"),
                        ],
                        true,
                      ),
                    ]),
                  ),
                ),
                constant(
                  "resource",
                  call(identifier(declarationFactory), [
                    identifier("key"),
                    identifier("props"),
                    access(identifier("declaration"), "outputs"),
                  ]),
                  factory.createTypeReferenceNode(resourceType),
                ),
                factory.createReturnStatement(identifier("resource")),
              ],
            ),
          );
          ts.addSyntheticLeadingComment(
            method,
            ts.SyntaxKind.MultiLineCommentTrivia,
            `*\n * The ${name} declaration method registers a managed resource and its\n * dependencies for the stack to apply. Relationship fields accept compatible\n * resource entities before their applied values exist. The returned entity\n * exposes output values after apply through the stack that owns the declaration.\n `,
            true,
          );
          return method;
        });
        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          docs: [
            {
              description: (writer) =>
                writer
                  .newLine()
                  .writeLine(
                    "The makeStripeResourceDeclarations Effect supplies the declaration methods",
                  )
                  .writeLine(
                    "used by StripeResources. Run it in the stack's shared graph so declarations",
                  )
                  .writeLine(
                    "register schemas in the resource model that will validate applied outputs.",
                  ),
            },
          ],
          declarations: [
            {
              name: "makeStripeResourceDeclarations",
              initializer: print(
                call(access(identifier("Effect"), "gen"), [
                  factory.createFunctionExpression(
                    undefined,
                    factory.createToken(ts.SyntaxKind.AsteriskToken),
                    undefined,
                    undefined,
                    [],
                    undefined,
                    factory.createBlock(
                      [
                        constant(
                          "graph",
                          yieldAll(identifier("ResourceGraphBuilder")),
                        ),
                        ...methods,
                        factory.createReturnStatement(
                          factory.createObjectLiteralExpression(
                            Arr.map(selected, (resource) =>
                              factory.createShorthandPropertyAssignment(
                                Str.split(resource.typeName, "::")[2],
                              ),
                            ),
                            true,
                          ),
                        ),
                      ],
                      true,
                    ),
                  ),
                ]),
              ),
            },
          ],
        });
        Arr.forEach(
          module.getDescendantsOfKind(ts.SyntaxKind.FunctionExpression),
          (operation) =>
            Arr.forEach(
              Arr.dropRight(
                operation
                  .getBody()
                  .asKindOrThrow(ts.SyntaxKind.Block)
                  .getStatements(),
                1,
              ),
              (statement) => statement.appendWhitespace("\n"),
            ),
        );

        const generated: SourceFile = module;

        return generated;
      });

      return {
        emitResourceBindingsModule,
        emitResourceCommandLayer,
        emitFileCommandRegistrations,
        emitResourceDeclarations,
      };
    }),
  },
) {}

export const stripeResourceBindingsEmitterLayer = Layer.effect(
  StripeResourceBindingsEmitter,
  StripeResourceBindingsEmitter.make,
);
