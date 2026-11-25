import {
  Array as Arr,
  Context,
  Effect,
  JsonPointer,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  type SchemaAST,
  type SchemaRepresentation,
  String as Str,
} from "effect";
import {
  type Project,
  type SourceFile,
  ts,
  VariableDeclarationKind,
} from "ts-morph";
import type { ResourceRequestMapping } from "../../../src/core/resource/model.js";
import type { OperationCatalog } from "../../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import { ResourceSourceInvalid } from "../../codegen/resourceErrors.js";
import {
  applyResourceRelationships,
  referenceSchema,
} from "../../codegen/resourceInputSchemas.js";
import type {
  JsonSchemaResourcePreparation,
  OpenApiResourceCatalog,
} from "../../codegen/resourceSchemas.js";
import { SchemaCompilation } from "../../codegen/schemaCompilation.js";
import {
  access,
  call,
  identifier,
  literal,
  print,
  property,
} from "../../codegen/typeScriptNodes.js";
import { StripeAnnotations } from "./stripeAnnotations.js";
import { StripeSchemaEmitter } from "./stripeSchemaEmitter.js";

const factory = ts.factory;

/**
 * The StripeResourceInputs service requires the complete resource catalog to
 * resolve allowed entity types, including when callers select only a few input
 * schemas to compile. Entity codecs retain relationships in saved declarations,
 * while resolved input schemas keep the provider's request constraints.
 */
export class StripeResourceInputs extends Context.Service<StripeResourceInputs>()(
  "nomoss/tools/stripe/generator/stripeResourceInputs",
  {
    make: Effect.gen(function* () {
      const catalogs = yield* OperationCatalogs;
      const compilation = yield* SchemaCompilation;
      const emitter = yield* StripeSchemaEmitter;
      const annotations = yield* StripeAnnotations;

      /**
       * The prepareResourceInputSchemas service method gives callers schemas
       * that validate declarations before their dependencies have values.
       * Entity mode requires compatible resource entities at resolved
       * relationship fields; value mode retains the provider request schemas.
       * Ordinary fields keep their constraints, and dictionaries keep nested
       * dependencies when saved. The nonempty result follows the order of
       * executable resources in the catalog.
       *
       * Resource types select roots for focused generation. Relationship targets
       * still resolve against the complete catalog, so the selection does not
       * restrict which resources a declaration may depend on.
       *
       * Each provider resource must belong to this catalog's source and
       * identify a schema for creation in that document. Local resources supply
       * native validators from their own declarations and follow the provider
       * inputs in the result. Their explicit references must select catalog
       * resources and outputs. The method fails with
       * ResourceSourceInvalid if the source differs, the schema cannot be
       * resolved, or no executable inputs exist. Invalid components and failures
       * from schema conversion through Effect also propagate to the caller.
       */
      const prepareResourceInputSchemas = Effect.fn(
        "StripeResourceInputs.prepareResourceInputSchemas",
      )(function* (
        catalog: OperationCatalog,
        resources: OpenApiResourceCatalog,
        relationships: "entities" | "values" = "entities",
        resourceTypes: ReadonlyArray<string> = [],
        localResources: ReadonlyArray<JsonSchemaResourcePreparation> = [],
      ) {
        const definitions = Arr.filter(
          Record.values(resources),
          (resource) =>
            resource.operations !== undefined &&
            (resourceTypes.length === 0 ||
              Arr.contains(resourceTypes, resource.typeName)),
        );

        /**
         * The schema selected for creation belongs to the document that
         * supplied the resource. The same path in a different document could
         * impose another resource's requirements on this declaration.
         */
        const inputs = yield* Effect.forEach(definitions, (resource) =>
          Effect.gen(function* () {
            yield* Effect.fail(
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message:
                  "Resource inputs must be compiled from their catalog's provider source",
              }),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  resource.source.provider !== catalog.source.provider ||
                    resource.source.service !== catalog.source.service ||
                    resource.source.name !== catalog.source.name ||
                    resource.source.format !== catalog.source.format,
                ),
              ),
            );

            const body: Schema.JsonObject = yield* Option.fromNullishOr(
              resource.inputSchemaPath,
            ).pipe(
              Effect.fromOption,
              Effect.flatMap((inputSchemaPath) =>
                catalogs.resolveOpenApiObject(catalog.document, {
                  $ref: inputSchemaPath,
                }),
              ),
              Effect.mapError(
                () =>
                  new ResourceSourceInvalid({
                    typeName: resource.typeName,
                    message: `Creation schema ${resource.inputSchemaPath} does not resolve in ${catalog.source.name}`,
                  }),
              ),
            );

            const operation = yield* Arr.findFirst(
              catalog.operations,
              (operation) =>
                operation.operationId === resource.operations?.create,
            ).pipe(Effect.fromOption);
            const input = yield* Match.value(operation.parameters.length).pipe(
              Match.when(0, () => Effect.succeed(body)),
              Match.orElse(() =>
                catalogs.buildOperationInputSchema(
                  catalog,
                  operation,
                  Arr.findFirst(
                    Record.keys(operation.requestBody?.content ?? {}),
                    (mediaType) =>
                      Option.exists(
                        Option.fromNullishOr(resource.inputSchemaPath),
                        Str.includes(JsonPointer.escapeToken(mediaType)),
                      ),
                  ).pipe(Option.getOrUndefined),
                ),
              ),
            );

            return input;
          }),
        );

        const components = yield* Schema.decodeUnknownEffect(
          Schema.Record(Schema.String, Schema.JsonObject),
        )(catalog.document.components.schemas);

        const imported = yield* Arr.match(inputs, {
          onEmpty: () => Effect.succeed([]),
          onNonEmpty: (roots) =>
            compilation
              .normalizeSchemas(catalog.document.openapi, roots, components)
              .pipe(
                Effect.flatMap((normalized) =>
                  compilation.importSchemas(normalized, { patterns: "apply" }),
                ),
              ),
        });

        /**
         * The targets of a relationship establish which resource a field can
         * depend on. When no target resolves, the field keeps its provider
         * validation and does not accept a reference to a deferred output.
         */
        const result: ReadonlyArray<Schema.toType<Schema.Top>> = Arr.map(
          imported,
          (schema, index) => {
            const resource = definitions[index];

            const declarations = Arr.flatMap(
              Match.value(relationships).pipe(
                Match.when("entities", () => resource.relationships),
                Match.orElse(() => []),
              ),
              (relationship) => {
                const references = Arr.getSomes(
                  Arr.map(relationship.targets, (target) =>
                    Option.gen(function* () {
                      const source = yield* Arr.findFirst(
                        Record.values(resources),
                        (entry) =>
                          entry.providerResource === target.resource &&
                          entry.resource !== undefined,
                      );
                      const resourceName = yield* Option.fromUndefinedOr(
                        source.resource,
                      );
                      const [outputName] = yield* Arr.findFirst(
                        Record.toEntries(source.outputs),
                        ([, output]) =>
                          output.valuePath ===
                          Str.substring("/properties".length)(
                            target.propertyPath,
                          ),
                      );

                      const resourceType = Schema.Struct({
                        provider: Schema.Literal("stripe"),
                        service: Schema.Literal(
                          Str.toLowerCase(Str.split(source.typeName, "::")[1]),
                        ),
                        resource: Schema.Literal(resourceName),
                      });
                      const mapping: ResourceRequestMapping = {
                        value: null,
                        outputs: [{ source: [outputName], target: [] }],
                      };
                      const reference = referenceSchema(resourceType, mapping);

                      return reference;
                    }),
                  ),
                );

                const transformed = Arr.match(references, {
                  onEmpty: () => [],
                  onNonEmpty: (references) => [
                    {
                      propertyPath: relationship.propertyPath,
                      reference: Schema.Union(references).ast,
                    },
                  ],
                });

                return transformed;
              },
            );

            const result: Schema.toType<Schema.Top> = Schema.toType(
              Schema.make(applyResourceRelationships(schema.ast, declarations)),
            );

            return result;
          },
        );

        const selectedLocals = Arr.filter(
          localResources,
          (resource) =>
            resourceTypes.length === 0 ||
            Arr.contains(resourceTypes, resource.catalog.typeName),
        );

        const localSchemas = yield* Effect.forEach(
          selectedLocals,
          Effect.fnUntraced(function* (entry) {
            const configured = Match.value(relationships).pipe(
              Match.when("entities", () =>
                Option.getOrElse(
                  Option.fromUndefinedOr(entry.catalog.references),
                  () => [],
                ),
              ),
              Match.orElse(() => []),
            );

            const targets = [
              ...Record.values(resources),
              ...Arr.map(localResources, (resource) => resource.catalog),
            ];

            const references = yield* Effect.forEach(
              configured,
              Effect.fnUntraced(function* (reference) {
                const target = yield* Arr.findFirst(
                  targets,
                  (resource) => resource.typeName === reference.resourceType,
                ).pipe(
                  Effect.fromOption(
                    () =>
                      new ResourceSourceInvalid({
                        typeName: entry.catalog.typeName,
                        message: `Reference selects absent resource ${reference.resourceType}`,
                      }),
                  ),
                );
                yield* Record.get(target.outputs, reference.output).pipe(
                  Effect.fromOption(
                    () =>
                      new ResourceSourceInvalid({
                        typeName: entry.catalog.typeName,
                        message: `Reference selects absent output ${reference.output} of ${reference.resourceType}`,
                      }),
                  ),
                );

                const resourceName = yield* Option.fromUndefinedOr(
                  target.resource,
                ).pipe(Effect.fromOption);
                const identity = Schema.Struct({
                  provider: Schema.Literal("stripe"),
                  service: Schema.Literal(
                    Str.toLowerCase(Str.split(target.typeName, "::")[1]),
                  ),
                  resource: Schema.Literal(resourceName),
                });
                const codec = referenceSchema(identity, {
                  value: null,
                  outputs: [{ source: [reference.output], target: [] }],
                });

                const relationship: {
                  readonly propertyPath: ReadonlyArray<string>;
                  readonly reference: SchemaAST.AST;
                } = {
                  propertyPath: reference.propertyPath,
                  reference: codec.ast,
                };

                return relationship;
              }),
            );

            const schema: Schema.toType<Schema.Top> = Schema.toType(
              Schema.make(
                applyResourceRelationships(entry.inputSchema.ast, references),
              ),
            );

            return schema;
          }),
        );

        const prepared: readonly [
          Schema.toType<Schema.Top>,
          ...Schema.toType<Schema.Top>[],
        ] = yield* Effect.succeed([...result, ...localSchemas]).pipe(
          Effect.filterOrFail(
            Arr.isArrayNonEmpty,
            () =>
              new ResourceSourceInvalid({
                typeName: catalog.source.name,
                message:
                  "No discovered resource inputs are available for compilation",
              }),
          ),
        );

        return prepared;
      });

      /**
       * The compileResourceInputs service method returns code that validates
       * declarations, with roots in the order of executable resources. Shared
       * names have the StripeResourceInput prefix because these schemas accept
       * deferred references. Schemas used to invoke the provider require
       * resolved values and must remain separate declarations.
       * Local document validators follow all resolved input roots in value
       * mode. Entity mode contains only declaration input roots.
       *
       * The method fails with ResourceSourceInvalid for an invalid source
       * selection or an empty set of executable inputs. Failures while Effect
       * converts or compiles the schemas also propagate to the caller.
       */
      const compileResourceInputs = Effect.fn(
        "StripeResourceInputs.compileResourceInputs",
      )(function* (
        catalog: OperationCatalog,
        resources: OpenApiResourceCatalog,
        relationships: "entities" | "values" = "entities",
        resourceTypes: ReadonlyArray<string> = [],
        localResources: ReadonlyArray<JsonSchemaResourcePreparation> = [],
      ) {
        const schemas = yield* prepareResourceInputSchemas(
          catalog,
          resources,
          relationships,
          resourceTypes,
          localResources,
        );

        const selectedLocals = Arr.filter(
          localResources,
          (resource) =>
            resourceTypes.length === 0 ||
            Arr.contains(resourceTypes, resource.catalog.typeName),
        );
        const documentSchemas = Match.value(relationships).pipe(
          Match.when("values", () =>
            Arr.map(selectedLocals, (resource) => resource.documentSchema),
          ),
          Match.orElse(() => []),
        );

        const roots: readonly [Schema.Top, ...Schema.Top[]] = [
          ...schemas,
          ...documentSchemas,
        ];

        const code: SchemaRepresentation.CodeDocument =
          yield* compilation.compileSchemas(roots, {
            referencePolicy: ({ ast, identifier, occurrences }) =>
              Option.fromUndefinedOr(identifier).pipe(
                Option.orElse(() =>
                  Match.value(ast).pipe(
                    Match.tag("Objects", () => Option.some("Properties")),
                    Match.tag("Arrays", () => Option.some("Items")),
                    Match.tag("Union", () => Option.some("Alternatives")),
                    Match.orElse(() => Option.none<string>()),
                    Option.filter(
                      () => relationships === "entities" && occurrences > 1,
                    ),
                  ),
                ),
                Option.map((name) =>
                  Match.value(relationships).pipe(
                    Match.when(
                      "entities",
                      () => `StripeResourceEntityInput${name}`,
                    ),
                    Match.orElse(() => `StripeResourceInput${name}`),
                  ),
                ),
                Option.getOrUndefined,
              ),
          });

        return code;
      });

      /**
       * The emitResourceInputModules service method gives resource registration
       * the same schemas that validate declarations. Its returned modules
       * include the annotations for dispatch and imports for deferred outputs.
       * They belong to the supplied project and cover executable resources.
       * The caller must resolve references to schemas in other modules before
       * publication. Failures in compilation or annotation also propagate.
       */
      const emitResourceInputModules = Effect.fn(
        "StripeResourceInputs.emitResourceInputModules",
      )(function* (
        project: Project,
        catalog: OperationCatalog,
        resources: OpenApiResourceCatalog,
        relationships: "entities" | "values" = "entities",
        resourceTypes: ReadonlyArray<string> = [],
        localResources: ReadonlyArray<JsonSchemaResourcePreparation> = [],
      ) {
        const code = yield* compileResourceInputs(
          catalog,
          resources,
          relationships,
          resourceTypes,
          localResources,
        );

        const selectedLocals = Arr.filter(
          localResources,
          (resource) =>
            resourceTypes.length === 0 ||
            Arr.contains(resourceTypes, resource.catalog.typeName),
        );

        const definitions = Arr.appendAll(
          Arr.filter(
            Record.values(resources),
            (resource) =>
              resource.operations !== undefined &&
              (resourceTypes.length === 0 ||
                Arr.contains(resourceTypes, resource.typeName)),
          ),
          Arr.map(selectedLocals, (resource) => resource.catalog),
        );

        const inputNames = Arr.map(definitions, (resource) => {
          const [provider, , name] = Str.split(resource.typeName, "::");

          const propsName =
            resource.propsSchema ?? `${provider}${name}PropsSchema`;
          const root: string = Match.value(relationships).pipe(
            Match.when("entities", () =>
              Str.replace(/Schema$/, "EntitySchema")(propsName),
            ),
            Match.orElse(() => propsName),
          );

          return root;
        });

        const documentNames = Match.value(relationships).pipe(
          Match.when("values", () =>
            Arr.flatMap(selectedLocals, (resource) =>
              Option.toArray(
                Option.fromUndefinedOr(resource.catalog.documentSchema),
              ),
            ),
          ),
          Match.orElse(() => []),
        );
        const roots = Arr.appendAll(inputNames, documentNames);

        const shared = Arr.appendAll(
          Record.keys(code.references.recursives),
          Arr.map(code.references.nonRecursives, (reference) => reference.$ref),
        );

        const names = Arr.dedupe(Arr.appendAll(shared, roots));

        const modules = yield* Effect.forEach(names, (name) =>
          Effect.gen(function* () {
            const module = yield* emitter.emitSchemaModule(
              project,
              `resourceInputs/${name}.ts`,
              [name],
              code,
              roots,
            );

            /**
             * The declaration schemas need Nomoss types and validators to
             * preserve dependencies in outputs and saved JSON. Effect's
             * CodeDocument does not supply imports for these custom
             * representations, so each module must include the ones it uses.
             */
            const identifiers = module.getDescendantsOfKind(
              ts.SyntaxKind.Identifier,
            );

            const namedImports = Arr.filter(
              [
                { name: "ResourceReferenceSchema", isTypeOnly: false },
                { name: "ResourceEntity", isTypeOnly: true },
                { name: "ResourceInputJsonSchema", isTypeOnly: false },
                { name: "ResourceInputJson", isTypeOnly: true },
              ],
              (entry) =>
                Arr.some(
                  identifiers,
                  (identifier) => identifier.getText() === entry.name,
                ),
            );

            module.addImportDeclarations(
              Option.some({
                moduleSpecifier: "../../../../../core/resource/model.js",
                namedImports,
              }).pipe(
                Option.filter(() => namedImports.length > 0),
                Option.toArray,
              ),
            );

            const generated: SourceFile = module;

            return generated;
          }),
        );

        yield* Effect.forEach(
          definitions,
          (resource) =>
            Effect.gen(function* () {
              const [provider, , name] = Str.split(resource.typeName, "::");
              const propsName =
                resource.propsSchema ?? `${provider}${name}PropsSchema`;
              const inputName = Match.value(relationships).pipe(
                Match.when("entities", () =>
                  Str.replace(/Schema$/, "EntitySchema")(propsName),
                ),
                Match.orElse(() => propsName),
              );

              const module = project.getSourceFileOrThrow(
                `resourceInputs/${inputName}.ts`,
              );

              module.addImportDeclaration({
                moduleSpecifier: "../../../../../core/resource/model.js",
                namedImports: [
                  "annotateResourceSchema",
                  ...Match.value(relationships).pipe(
                    Match.when("values", () => [
                      "ResourceSchemaAnnotationSchema",
                    ]),
                    Match.orElse(() => []),
                  ),
                ],
              });

              module.addImportDeclarations(
                Match.value(relationships).pipe(
                  Match.when("entities", () => [
                    {
                      moduleSpecifier: `./${propsName}.js`,
                      namedImports: [`${provider}${name}ResourceSchema`],
                    },
                  ]),
                  Match.orElse(() => []),
                ),
              );

              yield* annotations.annotateProps(
                module,
                { ...resource, propsSchema: inputName },
                relationships === "values",
              );
            }),
          { discard: true },
        );

        const configured = Arr.flatMap(definitions, (resource) =>
          Option.fromUndefinedOr(resource.declaration).pipe(
            Option.map((declaration) => ({ resource, declaration })),
            Option.toArray,
          ),
        );
        const declarations = yield* Effect.forEach(
          configured,
          Effect.fnUntraced(function* ({ resource, declaration }) {
            yield* Effect.fail(
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message:
                  "Local declaration properties must have distinct names and declared required fields",
              }),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  Record.has(declaration.properties, declaration.property) ||
                    Record.has(declaration.properties, "logicalId") ||
                    Record.has(declaration.properties, "props") ||
                    !Arr.every(declaration.required ?? [], (name) =>
                      Record.has(declaration.properties, name),
                    ),
                ),
              ),
            );

            const [provider, , name] = Str.split(resource.typeName, "::");
            const localName = `${provider}${name}LocalPropsSchema`;
            const localPath = `resourceInputs/${localName}.ts`;
            const components = yield* Schema.decodeUnknownEffect(
              Schema.Record(Schema.String, Schema.JsonObject),
            )(catalog.document.components.schemas);
            const normalized = yield* compilation.normalizeSchemas(
              catalog.document.openapi,
              [
                {
                  type: "object",
                  additionalProperties: false,
                  properties: declaration.properties,
                  required: declaration.required ?? [],
                },
              ],
              components,
            );
            const imported = yield* compilation.importSchemas(normalized, {
              patterns: "apply",
            });
            const code = yield* compilation.compileSchemas(imported, {
              referencePolicy: ({ identifier }) =>
                Option.fromUndefinedOr(identifier).pipe(
                  Option.map(
                    (identifier) => `${provider}${name}LocalInput${identifier}`,
                  ),
                  Option.getOrUndefined,
                ),
            });
            const localNames = [
              ...Record.keys(code.references.recursives),
              ...Arr.map(
                code.references.nonRecursives,
                (reference) => reference.$ref,
              ),
              localName,
            ];
            const local = yield* emitter
              .emitSchemaModule(project, localPath, localNames, code, [
                localName,
              ])
              .pipe(
                Effect.when(
                  Effect.succeed(
                    project.getSourceFile(localPath) === undefined,
                  ),
                ),
              );
            const providerSchema =
              resource.propsSchema ?? `${provider}${name}PropsSchema`;
            const inputSchema = Match.value(relationships).pipe(
              Match.when("entities", () =>
                Str.replace(/Schema$/, "EntitySchema")(providerSchema),
              ),
              Match.orElse(() => providerSchema),
            );
            const suffix = Match.value(relationships).pipe(
              Match.when("entities", () => "Entity"),
              Match.orElse(() => ""),
            );
            const schemaName = `${provider}${name}DeclarationProps${suffix}Schema`;
            const module = project.createSourceFile(
              `resourceInputs/${schemaName}.ts`,
            );
            module.addImportDeclarations([
              { moduleSpecifier: "effect", namedImports: ["Schema"] },
              {
                moduleSpecifier: "../../../../../core/resource/model.js",
                namedImports: ["annotateResourceSchema"],
              },
              {
                moduleSpecifier: `./${localName}.js`,
                namedImports: [localName],
              },
              {
                moduleSpecifier: `./${inputSchema}.js`,
                namedImports: [inputSchema],
              },
              {
                moduleSpecifier: `./${providerSchema}.js`,
                namedImports: [`${provider}${name}ResourceSchema`],
              },
            ]);
            module.addVariableStatement({
              isExported: true,
              declarationKind: VariableDeclarationKind.Const,
              docs: [
                {
                  description: (writer) =>
                    writer
                      .newLine()
                      .writeLine(
                        `The ${schemaName} schema preserves local lifecycle controls`,
                      )
                      .writeLine(
                        "in saved declarations. The configured provider property supplies the values",
                      )
                      .write("sent through the generated operation contract."),
                },
              ],
              declarations: [
                {
                  name: schemaName,
                  initializer: print(
                    call(identifier("annotateResourceSchema"), [
                      call(access(identifier("Schema"), "Struct"), [
                        factory.createObjectLiteralExpression(
                          [
                            factory.createSpreadAssignment(
                              access(identifier(localName), "fields"),
                            ),
                            property(
                              print(literal(declaration.property)),
                              identifier(inputSchema),
                            ),
                          ],
                          true,
                        ),
                      ]),
                      identifier(`${provider}${name}ResourceSchema`),
                    ]),
                  ),
                },
              ],
            });
            module.addTypeAlias({
              isExported: true,
              name: Str.replace(/Schema$/, "")(schemaName),
              type: print(
                factory.createIndexedAccessTypeNode(
                  factory.createTypeQueryNode(identifier(schemaName)),
                  factory.createLiteralTypeNode(literal("Type")),
                ),
              ),
            });

            return [...Option.toArray(local), module];
          }),
        );

        const emitted: ReadonlyArray<SourceFile> = [
          ...modules,
          ...Arr.flatten(declarations),
        ];
        return emitted;
      });

      return {
        applyResourceRelationships,
        prepareResourceInputSchemas,
        compileResourceInputs,
        emitResourceInputModules,
      };
    }),
  },
) {}

export const stripeResourceInputsLayer = Layer.effect(
  StripeResourceInputs,
  StripeResourceInputs.make,
);
