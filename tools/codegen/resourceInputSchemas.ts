import {
  Array as Arr,
  Match,
  Schema,
  SchemaAST,
  SchemaGetter,
  type SchemaRepresentation,
} from "effect";
import { Project, ts } from "ts-morph";
import {
  type ResourceInputJson,
  ResourceInputJsonSchema,
  ResourceReferenceSchema,
  type ResourceRequestMapping,
  type ResourceType,
} from "../../src/core/resource/model.js";
import { jsonExpression } from "./typeScriptJson.js";
import { identifier, print, printer } from "./typeScriptNodes.js";

const factory = ts.factory;

const expressionProject = new Project({ useInMemoryFileSystem: true });

/**
 * The applyResourceRelationships function includes changed fields' entity
 * codecs in dictionary values because TypeScript applies index signatures
 * to named fields too. Optional properties keep their metadata on those
 * fields; the dictionary's union accepts values without making its keys
 * required or changing the provider's checks on other properties.
 *
 * Each propertyPath names properties and uses '*' to select
 * array elements. An empty path selects the current node. A union or
 * deferred schema adds no property, so the same path applies inside it.
 * If a path does not match, the value schema stays unchanged. JSON
 * dictionaries can still accept references inside their values. With
 * acceptValues enabled, relationship fields also accept their original
 * provider values under the original constraints.
 */
export const applyResourceRelationships = (
  ast: SchemaAST.AST,
  relationships: ReadonlyArray<{
    readonly propertyPath: ReadonlyArray<string>;
    readonly reference: SchemaAST.AST;
  }>,
  acceptValues = false,
): SchemaAST.AST => {
  // An exhausted relationship path selects this value. Keep its original
  // constraints as an alternative only when the caller permits provider values
  // alongside entities; otherwise the declaration requires a resource entity.
  const references = Arr.map(
    Arr.filter(
      relationships,
      (relationship) => relationship.propertyPath.length === 0,
    ),
    (relationship) => relationship.reference,
  );

  const result: SchemaAST.AST = Match.value(relationships.length).pipe(
    Match.when(0, () => ast),
    Match.orElse(() =>
      Arr.match(references, {
        onNonEmpty: (references) =>
          new SchemaAST.Union(
            Match.value(acceptValues).pipe(
              Match.when(true, () => [...references, ast]),
              Match.orElse(() => references),
            ),
            undefined,
            undefined,
            undefined,
            undefined,
            ast.context,
          ),
        onEmpty: () =>
          Match.value(ast).pipe(
            Match.tag("Objects", (node) => {
              /**
               * Object relationships consume the named property position before
               * entering its value. The replacement property retains metadata
               * carried by that value's AST, including optionality and encoding.
               */
              const fields = Arr.map(node.propertySignatures, (field) => {
                const nested = Arr.map(
                  Arr.filter(
                    relationships,
                    (relationship) =>
                      relationship.propertyPath[0] === field.name,
                  ),
                  (relationship) => ({
                    propertyPath: Arr.drop(relationship.propertyPath, 1),
                    reference: relationship.reference,
                  }),
                );
                const value = applyResourceRelationships(
                  field.type,
                  nested,
                  acceptValues,
                );

                const property: SchemaAST.PropertySignature =
                  new SchemaAST.PropertySignature(field.name, value);

                return property;
              });

              // TypeScript index signatures also constrain named properties.
              // Dictionary values must accept the entity codecs introduced on
              // those properties for the generated object type to remain valid.
              const relatedFields = Arr.filter(
                fields,
                (field, index) =>
                  field.type !== node.propertySignatures[index].type,
              );

              const dictionaries = Arr.map(
                node.indexSignatures,
                (signature) => {
                  // Saved JSON dictionaries can contain unresolved resource
                  // references. Use core's JSON input codec for those values so
                  // saving a declaration preserves its dependencies.
                  const value = Match.value(signature.type).pipe(
                    Match.when(
                      {
                        _tag: "Declaration",
                        annotations: {
                          representation: { id: "effect/schema/Json" },
                        },
                      },
                      () => {
                        const json = Schema.declare<ResourceInputJson>(
                          Schema.is(ResourceInputJsonSchema),
                          {
                            toCode: () => {
                              const code: SchemaRepresentation.Generation.DeclarationOutput =
                                {
                                  runtime: print(
                                    identifier("ResourceInputJsonSchema"),
                                  ),
                                  Type: print(
                                    factory.createTypeReferenceNode(
                                      "ResourceInputJson",
                                    ),
                                  ),
                                };

                              return code;
                            },
                            toCodec: () =>
                              Schema.link<ResourceInputJson>()(
                                ResourceInputJsonSchema,
                                {
                                  decode: SchemaGetter.passthrough(),
                                  encode: SchemaGetter.passthrough(),
                                },
                              ),
                          },
                        );

                        const dictionaryValue: SchemaAST.AST = json.ast;

                        return dictionaryValue;
                      },
                    ),
                    Match.orElse((ast) => ast),
                  );

                  const dictionary: SchemaAST.IndexSignature =
                    new SchemaAST.IndexSignature(
                      signature.parameter,
                      new SchemaAST.Union([
                        value,
                        ...Arr.map(relatedFields, (field) => field.type),
                      ]),
                    );

                  return dictionary;
                },
              );

              const result: SchemaAST.AST = new SchemaAST.Objects(
                fields,
                dictionaries,
                node.annotations,
                node.checks,
                node.encoding,
                node.context,
                node.encodingChecks,
              );

              return result;
            }),
            Match.tag("Arrays", (node) => {
              /**
               * The array schema must enforce its checks even when an
               * element refers to a value that execution has not produced.
               * A tuple's optional positions also retain their meaning
               * during declaration validation.
               */
              const nested = Arr.map(
                Arr.filter(
                  relationships,
                  (relationship) => relationship.propertyPath[0] === "*",
                ),
                (relationship) => ({
                  propertyPath: Arr.drop(relationship.propertyPath, 1),
                  reference: relationship.reference,
                }),
              );
              const elements = Arr.map(node.elements, (element) =>
                applyResourceRelationships(element, nested, acceptValues),
              );
              const rest = Arr.map(node.rest, (element) =>
                applyResourceRelationships(element, nested, acceptValues),
              );

              const result: SchemaAST.AST = new SchemaAST.Arrays(
                node.isMutable,
                elements,
                rest,
                node.annotations,
                node.checks,
                node.encoding,
                node.context,
                node.encodingChecks,
              );

              return result;
            }),
            /**
             * The path recorded for a relationship names properties inside
             * each union member or deferred schema. Neither kind of schema
             * adds a field, so the path must keep its position within the
             * value that the schema validates.
             */
            Match.tag("Union", (node) => {
              const result: SchemaAST.AST = new SchemaAST.Union(
                Arr.map(node.types, (member) =>
                  applyResourceRelationships(
                    member,
                    relationships,
                    acceptValues,
                  ),
                ),
                node.options,
                node.annotations,
                node.checks,
                node.encoding,
                node.context,
                node.encodingChecks,
              );

              return result;
            }),
            // Deferred schemas retain lazy evaluation. Resolve their contents
            // only when Effect requests them, using the same relationship path
            // because deferral adds no property position.
            Match.tag("Suspend", (node) => {
              const result: SchemaAST.AST = new SchemaAST.Suspend(
                () =>
                  applyResourceRelationships(
                    node.thunk(),
                    relationships,
                    acceptValues,
                  ),
                node.annotations,
                undefined,
                node.encoding,
                node.context,
              );

              return result;
            }),
            Match.orElse((node) => node),
          ),
      }),
    ),
  );

  return result;
};

/**
 * The referenceSchema helper gives generated declaration fields the
 * resource identity and output mapping needed to save a dependency.
 * Effect's compiler uses its code annotation to emit ResourceEntity as
 * the accepted TypeScript input and ResourceReferenceSchema as the codec
 * that preserves the dependency until execution resolves its value.
 */
export const referenceSchema = <Type extends ResourceType>(
  resourceType: Schema.Schema<Type>,
  mapping: ResourceRequestMapping,
) => {
  // Generated inputs expose ResourceEntity to application authors and encode
  // it through ResourceReferenceSchema. Both forms carry the same identity and
  // output mapping, allowing core to save and later resolve the dependency.
  const reference = ResourceReferenceSchema(resourceType, mapping).annotate({
    toCode: ({
      typeParameters,
    }: SchemaRepresentation.Generation.DeclarationInput) => {
      // Effect supplies runtime and type expressions as source fragments.
      // Parse them as AST nodes before embedding them in the codec and entity
      // types so composed resource identities retain their original structure.
      const parsed = expressionProject.createSourceFile(
        "entity.ts",
        typeParameters[0].runtime,
        { overwrite: true },
      );
      const runtimeType = parsed
        .getFirstDescendantByKindOrThrow(ts.SyntaxKind.ExpressionStatement)
        .getExpression().compilerNode;

      const typeModule = expressionProject.createSourceFile("type.ts", "", {
        overwrite: true,
      });
      const entityType = typeModule
        .addTypeAlias({
          name: "Identity",
          type: typeParameters[0].Type,
        })
        .getTypeNodeOrThrow().compilerNode;

      const runtime: ts.CallExpression = factory.createCallExpression(
        identifier("ResourceReferenceSchema"),
        undefined,
        [runtimeType, jsonExpression(mapping)],
      );
      const type: ts.TypeReferenceNode = factory.createTypeReferenceNode(
        "ResourceEntity",
        [entityType],
      );

      const code: SchemaRepresentation.Generation.DeclarationOutput = {
        runtime: printer.printNode(
          ts.EmitHint.Expression,
          runtime,
          parsed.compilerNode,
        ),
        Type: printer.printNode(
          ts.EmitHint.Unspecified,
          type,
          typeModule.compilerNode,
        ),
      };

      return code;
    },
  });

  return reference;
};
