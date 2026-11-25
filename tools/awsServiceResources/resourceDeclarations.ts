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
  SchemaRepresentation,
  String as Str,
} from "effect";
import {
  type SourceFile,
  ts,
  VariableDeclarationKind,
  type VariableStatement,
} from "ts-morph";
import {
  type ResourceSchemaAnnotation,
  ResourceSchemaAnnotationSchema,
} from "../../src/core/resource/model.js";
import type { CloudFormationResourceDefinition } from "../awsResources/awsResourceDefinition.js";
import { AwsResourceTypeScript } from "../awsResources/awsResourceTypeScript.js";
import { ResourceCatalogs } from "../codegen/resourceCatalogs.js";
import { ResourceDeclarations } from "../codegen/resourceDeclarations.js";
import { ResourceSourceInvalid } from "../codegen/resourceErrors.js";
import {
  applyResourceRelationships,
  referenceSchema,
} from "../codegen/resourceInputSchemas.js";
import type { ResourceOutputCatalog } from "../codegen/resourceSchemas.js";
import { jsonExpression } from "../codegen/typeScriptJson.js";
import {
  access,
  call,
  constant,
  effectFunction,
  identifier,
  print,
  printer,
  property,
  yieldAll,
} from "../codegen/typeScriptNodes.js";
import type { AwsServiceResourcePreparation } from "./model.js";

const factory = ts.factory;

/**
 * Applications using the AwsServiceResourceDeclarations service declare entities
 * with core resource identities and applied state. Registry constraints govern
 * resolved provider requests; declaration inputs additionally accept entities at
 * positions identified by imported relationships.
 */
export class AwsServiceResourceDeclarations extends Context.Service<AwsServiceResourceDeclarations>()(
  "nomoss/tools/awsServiceResources/resourceDeclarations/AwsServiceResourceDeclarations",
  {
    make: Effect.gen(function* () {
      const schemas = yield* AwsResourceTypeScript;
      const entities = yield* ResourceDeclarations;
      const catalogs = yield* ResourceCatalogs;

      /**
       * The emitRegistration service method adds a declaration function that
       * registers canonical schemas and returns an entity before provider I/O.
       * Its output accessors read the shared stack's applied state.
       */
      const emitRegistration = Effect.fn(
        "AwsServiceResourceDeclarations.emitRegistration",
      )((module: SourceFile, name: string) =>
        Effect.sync(() => {
          // Declaration callers supply a logical identity and properties before
          // provider execution. The generated signature uses the entity-aware
          // property type so dependencies can be declared before outputs exist.
          const inputType = factory.createTypeLiteralNode([
            factory.createPropertySignature(
              undefined,
              "logicalId",
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ),
            factory.createPropertySignature(
              undefined,
              "props",
              undefined,
              factory.createTypeReferenceNode(`${name}Props`),
            ),
          ]);

          const input = factory.createParameterDeclaration(
            undefined,
            undefined,
            "input",
            undefined,
            inputType,
          );

          const key = factory.createObjectLiteralExpression([
            property("logicalId", access(identifier("input"), "logicalId")),
          ]);

          // Resource registration keeps declaration, request, and output schemas
          // together. Core can then validate references before execution and
          // resolved provider values before saving an applied resource.
          const registration = factory.createObjectLiteralExpression(
            [
              property("propsSchema", identifier(`${name}PropsSchema`)),
              property("requestSchema", identifier(`${name}RequestSchema`)),
              property("outputsSchema", identifier(`${name}OutputsSchema`)),
              factory.createShorthandPropertyAssignment("props"),
            ],
            true,
          );

          const resourceHandle = call(access(identifier("graph"), "resource"), [
            identifier("key"),
          ]);

          const propsDecoder = call(
            access(identifier("Schema"), "decodeEffect"),
            [identifier(`${name}PropsSchema`)],
          );
          const decodeProps = call(propsDecoder, [
            access(identifier("input"), "props"),
          ]);

          const registerEntity = call(
            access(identifier("declaration"), "registerEntity"),
            [identifier(`${name}ResourceTypeSchema`), registration],
          );

          const createEntity = call(identifier(`create${name}Declaration`), [
            identifier("key"),
            identifier("props"),
            access(identifier("declaration"), "outputs"),
          ]);

          // Generated declarations decode properties before registering the
          // entity. Output getters bind to the owning declaration's state so
          // application outputs observe the values saved by that stack.
          const statements = [
            constant("graph", yieldAll(identifier("ResourceGraphBuilder"))),
            constant(
              "key",
              key,
              factory.createTypeReferenceNode("ResourceKey"),
            ),
            constant("declaration", yieldAll(resourceHandle)),
            constant("props", yieldAll(decodeProps)),
            factory.createExpressionStatement(yieldAll(registerEntity)),
            constant(
              "resource",
              createEntity,
              factory.createTypeReferenceNode(`${name}Resource`),
            ),
            factory.createReturnStatement(identifier("resource")),
          ];

          const method = effectFunction(name, [input], statements);

          const declaration: VariableStatement = module.addVariableStatement({
            isExported: true,
            declarationKind: VariableDeclarationKind.Const,
            docs: [
              {
                description: `The ${name} resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource.`,
              },
            ],
            declarations: [{ name, initializer: print(method) }],
          });

          const body = declaration.getFirstDescendantByKindOrThrow(
            ts.SyntaxKind.Block,
          );

          Arr.forEach(Arr.drop(body.getStatements(), 1), (statement) =>
            statement.prependWhitespace("\n"),
          );

          declaration.formatText();

          return declaration;
        }),
      );

      /**
       * The renderResource service method returns a native resource module
       * whose writable properties and outputs come from the selected Registry
       * definition. Create-only properties retain their replacement rule in
       * saved metadata. An omitted replacement strategy uses the Registry's
       * create-then-delete default. Imported metadata identifies entity inputs,
       * including those inside arrays. Several output choices for the same
       * source type are retained in the generated relationship issues and keep
       * their ordinary provider input type until a mapping is reviewed.
       * Nested create-only paths fail until their Registry paths can be
       * translated into core property paths.
       * The output binding import must resolve from the module's publication
       * directory. The caller validates and publishes the returned source.
       */
      const renderResource = Effect.fn(
        "AwsServiceResourceDeclarations.renderResource",
      )(function* (
        prepared: Pick<
          AwsServiceResourcePreparation,
          "definition" | "outputCatalog" | "metadata"
        >,
        outputBindingModule: string,
      ) {
        const registry = prepared.definition;
        const typeName = registry.typeName;

        const resourceMetadata = yield* Arr.findFirst(
          prepared.metadata.resources,
          (resource) => resource.definition.typeName === typeName,
        ).pipe(Effect.fromOption);

        const [provider, service, resource] = Str.split(typeName, "::");

        const name = `${provider}${resource}`;
        const serviceId = Str.toLowerCase(service);
        const resourceId = Str.toLowerCase(resource);

        // Native resource identities use the service and resource names in the
        // Registry type. Output classifications retain the selected Registry
        // paths so core reads the provider's saved model consistently.
        const catalog: ResourceOutputCatalog = {
          ...prepared.outputCatalog,
          resource: resourceId,
          createOnlyProperties: registry.createOnlyProperties,
          writeOnlyProperties: registry.writeOnlyProperties,
        };

        const definition: CloudFormationResourceDefinition = {
          registry,
          cloudFormationRelationships: {},
          outputCatalog: catalog,
        };

        // Core replacement rules select property paths in the declared model.
        // Only top-level Registry paths currently translate completely; reject
        // deeper paths before emitting a declaration with incomplete rules.
        const replacementProperties = yield* Effect.forEach(
          registry.createOnlyProperties,
          (path) => {
            const parsed = JsonPointer.parseUriFragment(`#${path}`);
            const pointer = Option.fromUndefinedOr(parsed);

            return pointer.pipe(
              Effect.fromOption(
                () =>
                  new ResourceSourceInvalid({
                    typeName,
                    message: `Create-only path ${path} is not a valid Registry JSON pointer`,
                  }),
              ),
              Effect.filterOrFail(
                (segments) => {
                  const selectsProperty =
                    segments.length === 2 && segments[0] === "properties";
                  const propertyExists = Record.has(
                    registry.properties,
                    segments[1],
                  );

                  return selectsProperty && propertyExists;
                },
                () =>
                  new ResourceSourceInvalid({
                    typeName,
                    message: `Create-only path ${path} must select a declared top-level property; nested paths require translation before emission`,
                  }),
              ),
              Effect.map((segments) => [segments[1]]),
            );
          },
        );

        // Registry replacement order controls whether core can keep the old
        // resource until creation succeeds. Absent source metadata uses the
        // Registry default, and only create-only fields trigger this rule.
        const replacementStrategy =
          registry.replacementStrategy ?? "create_then_delete";

        const replacementOrder = Match.value(replacementStrategy).pipe(
          Match.when("delete_then_create", () => "destroyBeforeCreate"),
          Match.when("create_then_delete", () => "createBeforeDestroy"),
          Match.exhaustive,
        );

        const metadata: ResourceSchemaAnnotation = {
          provider: "aws",
          service: serviceId,
          resource: resourceId,
          operation: "create",
          stateSecretOutputKeys: [],
          primaryIdentifier: registry.primaryIdentifier,
        };

        const selectedMetadata = Arr.match(replacementProperties, {
          onEmpty: () => metadata,
          onNonEmpty: (properties) => {
            const replacement = {
              order: replacementOrder,
              properties,
            };

            return { ...metadata, replacement };
          },
        });

        const annotation: ResourceSchemaAnnotation =
          yield* Schema.decodeUnknownEffect(ResourceSchemaAnnotationSchema)(
            selectedMetadata,
          );

        const module = schemas.createModule();
        const coreImport = module.getImportDeclarationOrThrow("nomoss/core");

        coreImport.addNamedImports([
          "ResourceEntity",
          "ResourceReferenceSchema",
        ]);

        // Entity inputs must select a specific output from each source type.
        // Multiple permitted outputs require a reviewed choice; export those
        // positions for review while retaining ordinary provider values there.
        const relationshipIssues = Arr.flatMap(
          resourceMetadata.relationships,
          (relationship) =>
            Arr.map(
              Arr.filter(
                Record.toEntries(
                  Arr.groupBy(
                    relationship.targets,
                    (target) => target.typeName,
                  ),
                ),
                ([, targets]) => targets.length > 1,
              ),
              ([sourceType, targets]) => ({
                propertyPath: relationship.propertyPath,
                sourceType,
                sourceProperties: Arr.map(
                  targets,
                  (target) => target.propertyPath,
                ),
                message:
                  "Several source properties are permitted; an entity mapping requires a reviewed selection",
              }),
            ),
        );

        // Each unambiguous source type becomes an entity codec with an output
        // mapping. Core saves that mapping as a dependency and substitutes the
        // selected output at this input position when preparing the request.
        // Different source types remain alternatives at the same position.
        const relationships = Arr.flatMap(
          resourceMetadata.relationships,
          (relationship) => {
            const references = Arr.map(
              Arr.filter(
                Record.values(
                  Arr.groupBy(
                    relationship.targets,
                    (target) => target.typeName,
                  ),
                ),
                (targets) => targets.length === 1,
              ),
              (targets) => {
                const target = targets[0];
                const [, service, resource] = Str.split(target.typeName, "::");
                const identity = Schema.Struct({
                  provider: Schema.Literal("aws"),
                  service: Schema.Literal(Str.toLowerCase(service)),
                  resource: Schema.Literal(Str.toLowerCase(resource)),
                });
                const reference = referenceSchema(identity, {
                  value: null,
                  outputs: [{ source: target.propertyPath, target: [] }],
                });

                return reference.ast;
              },
            );

            return Arr.match(references, {
              onEmpty: () => [],
              onNonEmpty: (references) => [
                {
                  propertyPath: relationship.propertyPath,
                  reference: Schema.Union(
                    Arr.map(references, (ast) => Schema.make(ast)),
                  ).ast,
                },
              ],
            });
          },
        );

        // Declaration inputs accept resource entities and original values.
        // Resolved requests retain the original Registry schema, so accepting
        // an entity cannot weaken validation of the eventual provider value.
        // Compile all three views together to keep shared definition names valid.
        const imported = schemas.importSchemas(definition);
        const propsAst = applyResourceRelationships(
          imported[0].ast,
          relationships,
          true,
        );
        const code = SchemaRepresentation.toCodeDocument(
          SchemaRepresentation.toRepresentations([
            propsAst,
            imported[1].ast,
            imported[0].ast,
          ]),
        );

        schemas.emitSchemas(module, definition, code, name);
        schemas
          .emitSchema(module, `${name}RequestSchema`, code.codes[2], true)
          .setIsExported(true);

        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: `${name}RelationshipIssues`,
              initializer: print(jsonExpression(relationshipIssues)),
            },
          ],
        });

        // Core reads identity and replacement rules from the property schema's
        // annotation. The exported metadata and annotated schema share one
        // value so declaration registration supplies the same rules to planning.
        const props = module.getVariableDeclarationOrThrow(
          `${name}PropsSchema`,
        );
        const propsStatement = props.getVariableStatementOrThrow();
        const metadataFactory = access(
          identifier("ResourceSchemaAnnotationSchema"),
          "make",
        );
        const metadataValue = call(metadataFactory, [
          jsonExpression(annotation),
        ]);

        module.insertVariableStatement(propsStatement.getChildIndex(), {
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: `${name}ResourceSchema`,
              initializer: print(metadataValue),
            },
          ],
        });

        const propsSchema = props.getInitializerOrThrow().compilerNode;
        const annotatedProps = call(identifier("annotateResourceSchema"), [
          propsSchema,
          identifier(`${name}ResourceSchema`),
        ]);

        props.setInitializer(
          printer.printNode(
            ts.EmitHint.Expression,
            annotatedProps,
            module.compilerNode,
          ),
        );

        // Entity getters and the declaration function use the shared emitter
        // contract. The catalog records which saved values those getters read;
        // rendering returns source for the caller's publication checks.
        yield* entities.emitResourceDeclaration(
          module,
          catalog,
          factory.createTypeReferenceNode(`${name}Props`),
          "aws",
          outputBindingModule,
        );

        yield* emitRegistration(module, name);

        yield* catalogs.emitCatalog(module, `${name}OutputCatalog`, [catalog]);

        module.organizeImports();

        // The generated schema documentation can show literal interpolation
        // syntax from AWS. TypeScript's template literal node preserves the
        // text and escapes the interpolation opener when the AST is printed.
        module.transform((traversal) => {
          const node = traversal.visitChildren();

          return Match.value(node).pipe(
            Match.when(ts.isStringLiteral, (literal) =>
              Match.value(Str.includes("${")(literal.text)).pipe(
                Match.when(true, () =>
                  traversal.factory.createNoSubstitutionTemplateLiteral(
                    literal.text,
                  ),
                ),
                Match.orElse(() => literal),
              ),
            ),
            Match.orElse(() => node),
          );
        });

        const source: string = module.getFullText();

        return source;
      });

      return { renderResource, emitRegistration };
    }),
  },
) {}

export const awsServiceResourceDeclarationsLayer = Layer.effect(
  AwsServiceResourceDeclarations,
  AwsServiceResourceDeclarations.make,
);
