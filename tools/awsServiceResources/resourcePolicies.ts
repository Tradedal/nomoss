import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
  Tuple,
} from "effect";
import { Project, ts, VariableDeclarationKind } from "ts-morph";
import { AwsAttributeResourceMapping } from "../../src/providers/aws/management/resourceConfiguration.js";
import { OperationMetadata } from "../codegen/catalogSchemas.js";
import { ResourceSourceInvalid } from "../codegen/resourceErrors.js";
import { jsonExpression } from "../codegen/typeScriptJson.js";
import {
  access,
  call,
  identifier,
  print,
  property,
} from "../codegen/typeScriptNodes.js";
import type { AwsServiceResourcePreparation } from "./model.js";

/**
 * The AwsServiceResourcePolicies service publishes command registrations only
 * after resource metadata queries and the generated operation catalog resolve the
 * lifecycle configuration. The published module contains the complete mapping
 * and native operation codecs, so applications need only the runtime services.
 */
export class AwsServiceResourcePolicies extends Context.Service<AwsServiceResourcePolicies>()(
  "nomoss/tools/awsServiceResources/resourcePolicies/AwsServiceResourcePolicies",
  {
    make: Effect.sync(() => {
      const project = new Project({ useInMemoryFileSystem: true });

      /**
       * The renderPolicies service method returns source for native command
       * registration. A missing property, incomplete mapping, or unavailable
       * operation fails before callers publish declarations or registrations.
       */
      const renderPolicies = Effect.fn(
        "AwsServiceResourcePolicies.renderPolicies",
      )(function* (
        preparations: ReadonlyArray<AwsServiceResourcePreparation>,
        operationMetadata: unknown,
      ) {
        const catalog = yield* Schema.decodeUnknownEffect(
          Schema.Array(OperationMetadata),
        )(operationMetadata);
        const module = project.createSourceFile("resourceCommands.ts", "", {
          overwrite: true,
        });
        module.addStatements(
          "// Generated from verified AWS definitions and reviewed lifecycle mappings. Do not edit.",
        );
        module.addImportDeclarations([
          { moduleSpecifier: "effect", namedImports: ["Layer", "Schema"] },
          {
            moduleSpecifier: "../../../management/resourcePolicy.js",
            namedImports: ["awsResourcePolicyRegistration"],
          },
          {
            moduleSpecifier: "../../../management/resourceConfiguration.js",
            isTypeOnly: true,
            namedImports: ["AwsAttributeResourceConfiguration"],
          },
        ]);

        const registrations = yield* Effect.forEach(
          preparations,
          Effect.fnUntraced(function* (prepared) {
            const registry = prepared.definition;
            const typeName = registry.typeName;
            const invalid = (message: string) =>
              new ResourceSourceInvalid({ typeName, message });
            const hints = yield* Effect.fromOption(
              Option.fromUndefinedOr(prepared.source.lifecycle),
              () =>
                invalid(
                  "Selected service manifest has no lifecycle configuration",
                ),
            );
            const [, service, resource] = Str.split(typeName, "::");
            const name = `AWS${resource}`;
            const serviceId = Str.toLowerCase(service);
            const resourceId = Str.toLowerCase(resource);
            const configurationName = `aws${resource}ResourceConfiguration`;

            // The resource metadata query supplies identity, tagging, and
            // replacement rules. Validation uses the original Registry schema
            // because imported types can omit valid policy representations.
            // See docs/application/generation-architecture.md, "Provider
            // contracts and resource metadata", for this separation.
            const resourceMetadata = yield* Effect.try({
              try: () => prepared.metadata.database.resourceByType(typeName),
              catch: (cause) =>
                invalid(`Resource metadata query failed: ${String(cause)}`),
            });
            const identity = yield* Schema.decodeUnknownEffect(
              Schema.Tuple([Schema.NonEmptyString]),
            )(resourceMetadata.primaryIdentifier);
            yield* Effect.fail(
              invalid(
                "Imported resource identity disagrees with the Registry definition",
              ),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  registry.primaryIdentifier.length !== 1 ||
                    !Arr.contains(
                      registry.primaryIdentifier,
                      `/properties/${identity[0]}`,
                    ),
                ),
              ),
            );
            const tagProperty = yield* Effect.fromOption(
              Option.fromUndefinedOr(
                resourceMetadata.tagInformation?.tagPropertyName,
              ),
              () =>
                invalid(
                  "Attribute-map execution requires imported tagging metadata",
                ),
            );
            const configuredProperties = Arr.appendAll(
              [hints.nameProperty, tagProperty],
              Option.toArray(Option.fromUndefinedOr(hints.fifoProperty)),
            );
            yield* Effect.fail(
              invalid(
                "Configured name, FIFO, and tag properties must be writable Registry properties with standard Key/Value tags",
              ),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  resourceMetadata.tagInformation?.variant !== "standard" ||
                    !Arr.every(
                      configuredProperties,
                      (key) =>
                        Record.has(registry.properties, key) &&
                        !Arr.contains(
                          registry.readOnlyProperties,
                          `/properties/${key}`,
                        ),
                    ),
                ),
              ),
            );
            const writable = Arr.filter(
              Record.keys(registry.properties),
              (key) =>
                !Arr.contains(
                  registry.readOnlyProperties,
                  `/properties/${key}`,
                ),
            );
            const attributeProperties = Arr.filter(
              writable,
              (key) => key !== hints.nameProperty && key !== tagProperty,
            );
            const resourceName = Option.match(
              Option.fromUndefinedOr(hints.fifoProperty),
              {
                onNone: () => ({
                  property: hints.nameProperty,
                  parameter: hints.nameProperty,
                }),
                onSome: (fifoProperty) => ({
                  property: hints.nameProperty,
                  parameter: hints.nameProperty,
                  fifoProperty,
                }),
              },
            );
            const mapping = yield* Schema.decodeUnknownEffect(
              AwsAttributeResourceMapping,
            )({
              typeName,
              operations: hints.operations,
              identity: { property: identity[0], parameter: identity[0] },
              name: resourceName,
              tags: {
                property: tagProperty,
                createParameter: hints.createTagsParameter,
                updateParameter: tagProperty,
                removeParameter: "TagKeys",
                response: tagProperty,
              },
              attributes: Record.fromEntries(
                Arr.map(attributeProperties, (key) =>
                  Tuple.make(
                    key,
                    Option.match(Record.get(hints.resets, key), {
                      onNone: () => ({ attribute: key }),
                      onSome: (reset) => ({ attribute: key, reset }),
                    }),
                  ),
                ),
              ),
              outputAttributes: hints.outputAttributes,
              missingErrors: hints.missingErrors,
              readAttributeNames: ["All"],
            });
            yield* Effect.forEach(Record.keys(hints.resets), (key) =>
              Effect.fail(
                invalid(`Reset property ${key} is not a writable attribute`),
              ).pipe(
                Effect.when(
                  Effect.succeed(!Arr.contains(attributeProperties, key)),
                ),
              ),
            );
            // Registry property types determine which AWS attribute strings need
            // JSON conversion. Output aliases must name read-only properties so
            // the observed model can satisfy the generated output contract.
            const encodings = yield* Effect.forEach(
              Record.keys(mapping.attributes),
              (key) =>
                Schema.decodeUnknownEffect(
                  Schema.Struct({
                    type: Schema.Union([
                      Schema.String,
                      Schema.Array(Schema.String),
                    ]),
                  }),
                )(registry.properties[key]).pipe(
                  Effect.map(({ type }) => {
                    const encoding = Match.value(type).pipe(
                      Match.when("string", () => "string" as const),
                      Match.orElse(() => "json" as const),
                    );
                    return Tuple.make(key, encoding);
                  }),
                ),
            );
            yield* Effect.forEach(
              Record.keys(mapping.outputAttributes),
              (key) =>
                Effect.fail(
                  invalid(
                    `Output ${key} must be a Registry read-only property`,
                  ),
                ).pipe(
                  Effect.when(
                    Effect.succeed(
                      !Arr.contains(
                        registry.readOnlyProperties,
                        `/properties/${key}`,
                      ),
                    ),
                  ),
                ),
            );

            // The generated operation catalog has already passed the shared
            // Smithy conversion. Reuse it to check lifecycle choices; the native
            // codecs validate request members when the policy constructs calls.
            yield* Effect.forEach(
              Record.toEntries(mapping.operations),
              ([, operationName]) =>
                Effect.fail(
                  invalid(
                    `Operation ${operationName} is absent from the generated service catalog`,
                  ),
                ).pipe(
                  Effect.when(
                    Effect.succeed(
                      !Arr.some(
                        catalog,
                        (operation) =>
                          operation.operationId === operationName &&
                          operation.source.service ===
                            prepared.source.smithy.serviceId,
                      ),
                    ),
                  ),
                ),
            );

            // The generated configuration retains the declaration's original
            // request schema and native operation constants. The shared executor
            // therefore validates calls against the same contracts as declarations.
            module.addImportDeclarations([
              {
                moduleSpecifier: `./${serviceId}/${resourceId}/index.js`,
                namedImports: [`${name}ResourceSchema`, `${name}RequestSchema`],
              },
              {
                moduleSpecifier: `../../../client/generated/${serviceId}.js`,
                namedImports: [
                  `${serviceId}Service`,
                  `${serviceId}Operations`,
                  hints.attributeMapSchema,
                  hints.tagMapSchema,
                ],
              },
            ]);
            const operationProperties = Arr.map(
              Record.toEntries(mapping.operations),
              ([role, operationName]) =>
                property(
                  role,
                  access(identifier(`${serviceId}Operations`), operationName),
                ),
            );
            const createOnly = Record.keys(
              Record.filter(
                resourceMetadata.properties,
                (property) => property.causesReplacement === "yes",
              ),
            );
            const outputProperties = Arr.prepend(
              Record.keys(mapping.outputAttributes),
              identity[0],
            );
            const mappedOutputs = Arr.map(
              outputProperties,
              (key) => `/properties/${key}`,
            );
            yield* Effect.fail(
              invalid(
                "Lifecycle mapping must cover every Registry output property",
              ),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  !Arr.every(registry.readOnlyProperties, (pointer) =>
                    Arr.contains(mappedOutputs, pointer),
                  ),
                ),
              ),
            );
            yield* Effect.fail(
              invalid(
                "Imported replacement properties disagree with the Registry definition",
              ),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  createOnly.length !== registry.createOnlyProperties.length ||
                    !Arr.every(createOnly, (key) =>
                      Arr.contains(
                        registry.createOnlyProperties,
                        `/properties/${key}`,
                      ),
                    ),
                ),
              ),
            );
            const requestFields = access(
              identifier(`${name}RequestSchema`),
              "fields",
            );
            const tagField = access(requestFields, tagProperty);
            const tagsSchema = call(
              access(identifier("Schema"), "requiredKey"),
              [tagField],
            );
            const attributeEncodings = Record.fromEntries(encodings);
            const configuration = ts.factory.createObjectLiteralExpression(
              [
                property("schema", identifier(`${name}ResourceSchema`)),
                property("propsSchema", identifier(`${name}RequestSchema`)),
                property(
                  "attributeSchema",
                  identifier(hints.attributeMapSchema),
                ),
                property("tagMapSchema", identifier(hints.tagMapSchema)),
                property("tagsSchema", tagsSchema),
                property("service", identifier(`${serviceId}Service`)),
                property("mapping", jsonExpression(mapping)),
                property("encodings", jsonExpression(attributeEncodings)),
                property("createOnlyProperties", jsonExpression(createOnly)),
                property(
                  "operations",
                  ts.factory.createObjectLiteralExpression(
                    operationProperties,
                    true,
                  ),
                ),
              ],
              true,
            );
            module.addVariableStatement({
              isExported: true,
              declarationKind: VariableDeclarationKind.Const,
              docs: [
                {
                  description: [
                    `The ${configurationName} configuration lets the policy validate`,
                    `${typeName} declarations against Registry properties and native`,
                    "requests against generated operation codecs. Its saved identity,",
                    "replacement rules, and attribute types govern runtime execution.",
                  ].join("\n"),
                },
              ],
              declarations: [
                {
                  name: configurationName,
                  initializer: print(
                    ts.factory.createSatisfiesExpression(
                      configuration,
                      ts.factory.createTypeReferenceNode(
                        "AwsAttributeResourceConfiguration",
                      ),
                    ),
                  ),
                },
              ],
            });
            return call(identifier("awsResourcePolicyRegistration"), [
              identifier(configurationName),
            ]);
          }),
        );

        const registration = Match.value(registrations.length).pipe(
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
              description: [
                "The awsNativeResourceCommandLayer Layer supplies generated resource",
                "commands to the application's shared runtime. Declaration and execution",
                "share ResourceModel; the provider supplies the AWS client and digest.",
              ].join("\n"),
            },
          ],
          declarations: [
            {
              name: "awsNativeResourceCommandLayer",
              initializer: print(registration),
            },
          ],
        });
        module.organizeImports();
        const source: string = module.getFullText();

        return source;
      });
      return { renderPolicies };
    }),
  },
) {}

export const awsServiceResourcePoliciesLayer = Layer.effect(
  AwsServiceResourcePolicies,
  AwsServiceResourcePolicies.make,
);
