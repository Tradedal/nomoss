import {
  Array as Arr,
  Context,
  Effect,
  Equal,
  Equivalence,
  Graph,
  HashSet,
  JsonPointer,
  Layer,
  Option,
  Predicate,
  Record,
  Schema,
  SchemaAST,
  String as Str,
  Tuple,
} from "effect";
import { type SourceFile, ts, VariableDeclarationKind } from "ts-morph";
import type { OperationCatalog } from "./catalogSchemas.js";
import { OpenApiResourceBindings } from "./openApiResourceBindings.js";
import { OpenApiResourceSchemas } from "./openApiResourceSchemas.js";
import type { ClientOperation } from "./operationSchemas.js";
import type {
  OpenApiDiscoveredProperty,
  OpenApiDiscoveredResource,
  OpenApiResourceBinding,
  OpenApiResourceDiscoveryIssue,
  OpenApiResourceGraph,
} from "./resourceDiscoverySchemas.js";
import { ResourceSourceInvalid } from "./resourceErrors.js";
import {
  type EffectResourcePreparation,
  type JsonSchemaResourcePreparation,
  type JsonSchemaResourceSource,
  type OpenApiResourceCreation,
  type OpenApiResourceCreationResolution,
  type OpenApiResourceDefinition,
  type OpenApiResourceHint,
  type OpenApiResourceHints,
  type OpenApiResourceOutputField,
  type OpenApiResourcePreparation,
  type OpenApiResourceSelection,
  ResourceCatalog,
  type ResourceDefinition,
  ResourceOutputCatalog,
  type ResourceOutputSelection,
  type ResourceSource,
} from "./resourceSchemas.js";
import { SchemaCompilation } from "./schemaCompilation.js";
import { jsonExpression } from "./typeScriptJson.js";

/**
 * The ResourceCatalogs service constructs validated catalogs from Registry
 * documents, OpenAPI resources, and native Effect schemas. OpenAPI catalogs
 * combine selected operation bindings, provider outputs, and resource
 * relationships. Unresolved resources retain their source contracts and
 * failure reasons for inspection.
 */
export class ResourceCatalogs extends Context.Service<ResourceCatalogs>()(
  "nomoss/tools/codegen/resourceCatalogs",
  {
    make: Effect.gen(function* () {
      const compilation = yield* SchemaCompilation;
      const resourceSchemas = yield* OpenApiResourceSchemas;

      const resourceBindings = yield* OpenApiResourceBindings;

      /**
       * The buildCatalog service method prepares output contracts from a
       * Registry resource or a selected resource definition. Every output must
       * select a declared property before the catalog can be published.
       */
      const buildCatalog = Effect.fn("ResourceCatalogs.buildCatalog")(
        function* (source: ResourceSource, definition: ResourceDefinition) {
          const outputs = yield* Effect.forEach(
            selectOutputNames(definition),
            (name) => readDefinitionOutput(definition, name),
          );

          const catalog: ResourceOutputCatalog = {
            source,
            typeName: definition.typeName,
            primaryIdentifier: definition.primaryIdentifier,
            createOnlyProperties: definition.createOnlyProperties,
            writeOnlyProperties: definition.writeOnlyProperties,
            outputs: Record.fromEntries(outputs),
          };

          return catalog;
        },
      );

      /**
       * The buildOpenApiCatalog service method selects named application
       * outputs with validation from provider fields. Missing fields, ambiguous
       * definitions, and optional outputs without a retention policy fail before
       * compilation.
       */
      const buildOpenApiCatalog = Effect.fn(
        "ResourceCatalogs.buildOpenApiCatalog",
      )(function* (
        catalog: OperationCatalog,
        typeName: string,
        selection: OpenApiResourceSelection,
        graph: OpenApiResourceGraph,
      ) {
        const retained = selection.retainOnRead ?? [];
        const secretOutputs = selection.stateSecretOutputKeys ?? [];

        const responseFields = yield* selectResponseOutputs(
          graph,
          typeName,
          selection,
        );

        const inputFields = yield* selectInputOutputs(
          catalog,
          typeName,
          selection,
        );

        const fields = Arr.appendAll(responseFields, inputFields);
        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName,
            message:
              "Response outputs and input identity outputs require distinct names",
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Arr.dedupe(Arr.map(fields, (field) => field.name)).length !==
                fields.length,
            ),
          ),
        );

        const definition: ResourceDefinition = {
          typeName,
          properties: Record.fromEntries(
            Arr.map(fields, ({ name, schema }) => Tuple.make(name, schema)),
          ),
          definitions: {},
          required: Arr.map(
            Arr.filter(fields, (field) => field.required),
            ({ name }) => name,
          ),
          primaryIdentifier: selection.primaryIdentifier,
          readOnlyProperties: Arr.map(
            fields,
            ({ name }) => `/properties/${JsonPointer.escapeToken(name)}`,
          ),
          createOnlyProperties: [],
          writeOnlyProperties: [],
        };

        const binding = yield* resourceBindings.validateOperations(
          catalog,
          typeName,
          selection,
          graph,
        );

        const described = yield* buildCatalog(catalog.source, definition);

        const resource: ResourceOutputCatalog = {
          source: described.source,
          typeName: described.typeName,
          resource: selection.resource,
          propsSchema: selection.propsSchema,
          stateSecretOutputKeys: secretOutputs,
          primaryIdentifier: described.primaryIdentifier,
          operations: binding,
          outputs: Record.fromEntries(
            Arr.map(fields, (field) =>
              Tuple.make(field.name, {
                ...described.outputs[field.name],
                schemaPath: field.schemaPath,
                valuePath: `/${JsonPointer.escapeToken(field.field)}`,
                retainOnRead: Arr.contains(retained, field.name),
                ...Option.match(Option.fromUndefinedOr(field.inputParameter), {
                  onNone: () => ({}),
                  onSome: (inputParameter) => ({ inputParameter }),
                }),
              }),
            ),
          ),
        };

        const validated: ResourceOutputCatalog = yield* validateSelection(
          resource,
          selection,
        );

        return validated;
      });

      /**
       * The buildDiscoveredCatalog service method prepares every discovered
       * creation model with its source contracts and executable bindings. Hints must
       * select discovered candidates. Unresolved bindings remain on the resource,
       * and conflicting type names fail preparation.
       */
      const buildDiscoveredCatalog = Effect.fn(
        "ResourceCatalogs.buildDiscoveredCatalog",
      )(function* (
        catalog: OperationCatalog,
        hints: OpenApiResourceHints = {},
        namespace: string = catalog.source.service,
        sourceGraph?: OpenApiResourceGraph,
      ) {
        const graph = yield* Option.fromUndefinedOr(sourceGraph).pipe(
          Option.match({
            onNone: () => resourceSchemas.buildGraph(catalog),
            onSome: (graph) => Effect.succeed(graph),
          }),
        );

        const discovered = yield* resourceBindings.discoverResources(
          catalog,
          graph,
          hints,
        );

        const operationIds = HashSet.fromIterable(
          Arr.map(catalog.operations, (operation) => operation.operationId),
        );
        const knownReads = Record.filter(hints, (hint) =>
          Option.match(Option.fromUndefinedOr(hint.readOperation), {
            onNone: () => true,
            onSome: (operationId) => HashSet.has(operationIds, operationId),
          }),
        );

        const matchedHints = Record.filter(knownReads, (hint, name) => {
          const selected = Record.filter(
            {
              name,
              createOperation: hint.createOperation,
              schemaPath: hint.responseSchema,
            },
            Predicate.isNotUndefined,
          );

          return Arr.some(discovered.resources, (resource) =>
            Record.isSubrecordBy(Equal.equals)(selected, resource),
          );
        });

        const unresolved = Arr.difference(
          Record.keys(hints),
          Record.keys(matchedHints),
        );
        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName: catalog.source.name,
            message: `Resource hints have no discovered candidate: ${Arr.join(unresolved, ", ")}`,
          }),
        ).pipe(Effect.when(Effect.succeed(unresolved.length > 0)));

        const resources = yield* Effect.forEach(
          Record.toEntries(
            Arr.groupBy(discovered.resources, (resource) => resource.name),
          ),
          ([name, creations]) =>
            describeResource(
              catalog,
              graph,
              name,
              creations,
              hints[name] ?? {},
              namespace,
            ),
        );
        yield* Effect.forEach(resources, (resource, index) => {
          const conflicts = Arr.filter(
            Arr.take(resources, index),
            (previous) => previous.typeName === resource.typeName,
          );
          return Effect.fail(
            new ResourceSourceInvalid({
              typeName: resource.typeName,
              message: `Resource ${resource.providerResource} (${resource.typeName}) conflicts with ${Arr.join(
                Arr.map(
                  conflicts,
                  (previous) =>
                    `${previous.providerResource} (${previous.typeName})`,
                ),
                ", ",
              )}`,
            }),
          ).pipe(Effect.when(Effect.succeed(conflicts.length > 0)));
        });

        const described: OpenApiResourcePreparation = {
          resources: Record.fromEntries(
            Arr.map(resources, (resource) =>
              Tuple.make(resource.typeName, resource),
            ),
          ),
          unresolved: discovered.unresolved,
        };

        const resolved = yield* resolveBindings(
          catalog,
          graph,
          described.resources,
          hints,
        );

        const result: OpenApiResourcePreparation = {
          resources: resolved.resources,
          unresolved: Arr.dedupeWith(
            [...described.unresolved, ...resolved.unresolved],
            Equivalence.Struct({
              operationId: Equivalence.String,
              reason: Equivalence.String,
            }),
          ),
        };
        return result;
      });

      /**
       * The buildEffectCatalog service method returns a local resource's validated
       * catalog and native output schema from one selection. Missing fields and
       * invalid identity or retention policies fail before either result is accepted
       * for compilation.
       */
      const buildEffectCatalog = Effect.fn(
        "ResourceCatalogs.buildEffectCatalog",
      )(function* <Fields extends Schema.Struct.Fields>(
        source: ResourceSource,
        typeName: string,
        input: Schema.Struct<Fields>,
        selection: ResourceOutputSelection,
      ) {
        const selected = yield* selectEffectOutputSchema(
          typeName,
          input,
          selection,
        );

        const resource: ResourceOutputCatalog = {
          source,
          typeName,
          resource: selection.resource,
          propsSchema: selection.propsSchema,
          stateSecretOutputKeys: selection.stateSecretOutputKeys ?? [],
          primaryIdentifier: selection.primaryIdentifier,
          outputs: Record.map(selected.fields, (field, name) => ({
            schemaPath: `#/${JsonPointer.escapeToken(selection.schema)}/fields/${JsonPointer.escapeToken(selection.outputs[name])}`,
            valuePath: `/${JsonPointer.escapeToken(selection.outputs[name])}`,
            required: !SchemaAST.isOptional(field.ast),
            retainOnRead: Arr.contains(selection.retainOnRead ?? [], name),
          })),
        };

        const validated: ResourceOutputCatalog = yield* validateSelection(
          resource,
          selection,
        );

        const preparation: EffectResourcePreparation = {
          catalog: validated,
          outputSchema: selected,
        };

        return preparation;
      });

      /**
       * The prepareJsonSchemaResources service method lets a generator compile
       * declarations and file observations from one local input contract. It
       * returns the input validator, the validator for selected document fields,
       * and the catalog entry used for dispatch and saved outputs. Missing
       * document or output fields fail with ResourceSourceInvalid. The saved
       * path must be required so later reads and teardown can locate the file.
       */
      const prepareJsonSchemaResources = Effect.fn(
        "ResourceCatalogs.prepareJsonSchemaResources",
      )(function* (source: typeof JsonSchemaResourceSource.Type) {
        const resources: ReadonlyArray<JsonSchemaResourcePreparation> =
          yield* Effect.forEach(
            Record.toEntries(source.resources),
            Effect.fnUntraced(function* ([typeName, selection]) {
              const fields = yield* Effect.forEach(
                selection.document.properties,
                (field) =>
                  Record.get(selection.input.properties, field).pipe(
                    Effect.fromOption(
                      () =>
                        new ResourceSourceInvalid({
                          typeName,
                          message: `Document field ${field} is absent from the declared input`,
                        }),
                    ),
                    Effect.map((schema) => Tuple.make(field, schema)),
                  ),
              );
              const outputs = yield* Effect.forEach(
                Record.toEntries(selection.outputs),
                ([name, field]) =>
                  Record.get(selection.input.properties, field).pipe(
                    Effect.fromOption(
                      () =>
                        new ResourceSourceInvalid({
                          typeName,
                          message: `Output ${name} selects absent input field ${field}`,
                        }),
                    ),
                    Effect.map((schema) =>
                      Tuple.make(name, {
                        schema,
                        schemaPath: `#/resources/${JsonPointer.escapeToken(typeName)}/input/properties/${JsonPointer.escapeToken(field)}`,
                        valuePath: `/${JsonPointer.escapeToken(field)}`,
                        required: Arr.contains(selection.input.required, field),
                      }),
                    ),
                  ),
              );

              const catalog = yield* validateSelection(
                {
                  source: source.source,
                  typeName,
                  resource: selection.resource,
                  propsSchema: selection.propsSchema,
                  primaryIdentifier: selection.primaryIdentifier,
                  outputs: Record.fromEntries(outputs),
                  documentSchema: selection.document.schema,
                  references: selection.references,
                  file: selection.file,
                  replacement: selection.replacement,
                },
                {},
              );

              const normalized = yield* compilation.normalizeSchemas(
                "3.1.0",
                [
                  {
                    type: "object",
                    additionalProperties: false,
                    properties: selection.input.properties,
                    required: selection.input.required,
                  },
                  {
                    type: "object",
                    additionalProperties: false,
                    properties: Record.fromEntries(fields),
                    required: Arr.filter(selection.input.required, (field) =>
                      Arr.contains(selection.document.properties, field),
                    ),
                  },
                ],
                {},
              );

              const [inputSchema, documentSchema] =
                yield* compilation.importSchemas(normalized, {
                  patterns: "apply",
                });

              const prepared: JsonSchemaResourcePreparation = {
                catalog,
                inputSchema,
                documentSchema,
              };

              return prepared;
            }),
          );

        return resources;
      });

      /**
       * The emitCatalog service method adds an inspectable export of the
       * resource contracts used by generated bindings. The export retains saved
       * identity mappings and output source locations so callers can inspect the
       * generated execution contract.
       */
      const emitCatalog = Effect.fn("ResourceCatalogs.emitCatalog")(function* (
        module: SourceFile,
        name: string,
        entries: ReadonlyArray<ResourceOutputCatalog> | ResourceCatalog,
      ) {
        const values: Schema.Json = yield* Schema.encodeEffect(
          Schema.Union([Schema.Array(ResourceOutputCatalog), ResourceCatalog]),
        )(entries);

        const initializer = ts
          .createPrinter()
          .printNode(
            ts.EmitHint.Expression,
            jsonExpression(values),
            ts.createSourceFile("metadata.ts", "", ts.ScriptTarget.Latest),
          );

        module.addVariableStatement({
          isExported: true,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [{ name, initializer }],
        });

        const generated: SourceFile = module;

        return generated;
      });

      /**
       * The selectOutputNames helper selects top-level read-only fields for
       * application outputs. Nested read-only classifications remain in the source
       * definition and do not make their containing application property an output.
       */
      const selectOutputNames = (definition: ResourceDefinition) => {
        const names: ReadonlyArray<string> = Arr.map(
          Arr.filter(definition.readOnlyProperties, (path) =>
            /^\/properties\/[^/]+$/.test(path),
          ),
          (path) =>
            JsonPointer.unescapeToken(
              Str.substring("/properties/".length)(path),
            ),
        );

        return names;
      };

      /**
       * The validateSelection helper checks whether selected outputs
       * establish a usable saved identity and an absence policy. Identity outputs
       * must be required, and retained outputs must preserve values outside the
       * identity.
       */
      const validateSelection = Effect.fn("ResourceCatalogs.validateSelection")(
        function* (
          resource: ResourceOutputCatalog,
          selection: Pick<
            ResourceOutputSelection,
            "retainOnRead" | "stateSecretOutputKeys"
          >,
        ) {
          const typeName = resource.typeName;
          const retained = selection.retainOnRead ?? [];
          const secretOutputs = selection.stateSecretOutputKeys ?? [];

          yield* Effect.forEach(
            Arr.appendAll(retained, secretOutputs),
            (name) =>
              Effect.fail(
                new ResourceSourceInvalid({
                  typeName,
                  message: `Output policy ${name} does not select a declared resource output`,
                }),
              ).pipe(
                Effect.when(
                  Effect.succeed(!Record.has(resource.outputs, name)),
                ),
              ),
          );

          yield* Effect.forEach(retained, (name) =>
            Effect.fail(
              new ResourceSourceInvalid({
                typeName,
                message: `Identity output ${name} cannot retain a value from a previous observation`,
              }),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  Arr.contains(
                    resource.primaryIdentifier,
                    `/properties/${JsonPointer.escapeToken(name)}`,
                  ),
                ),
              ),
            ),
          );

          const optional = Record.filter(
            resource.outputs,
            (output) => !output.required,
          );

          const unhandled = Record.filter(
            optional,
            (_, name) => !Arr.contains(retained, name),
          );

          yield* Effect.forEach(Record.toEntries(unhandled), ([name, output]) =>
            Effect.fail(
              new ResourceSourceInvalid({
                typeName,
                message: `Output ${name} selects optional field ${output.schemaPath}; resource output projections require a defined absence policy`,
              }),
            ),
          );

          const requiredPaths = Arr.map(
            Record.keys(
              Record.filter(resource.outputs, (output) => output.required),
            ),
            (name) => `/properties/${JsonPointer.escapeToken(name)}`,
          );

          yield* Effect.forEach(resource.primaryIdentifier, (path) =>
            Effect.fail(
              new ResourceSourceInvalid({
                typeName,
                message: `Identity ${path} does not select a required resource output`,
              }),
            ).pipe(
              Effect.when(Effect.succeed(!Arr.contains(requiredPaths, path))),
            ),
          );

          const validated: ResourceOutputCatalog = resource;

          return validated;
        },
      );

      /**
       * The selectEffectOutputSchema helper selects and renames native
       * Struct fields for output compilation. The returned fields use their type
       * schemas, and a missing registered field fails with ResourceSourceInvalid.
       */
      const selectEffectOutputSchema = Effect.fn(
        "ResourceCatalogs.selectEffectOutputSchema",
      )(function* <Fields extends Schema.Struct.Fields>(
        typeName: string,
        source: Schema.Struct<Fields>,
        selection: ResourceOutputSelection,
      ) {
        const fields = yield* Effect.forEach(
          Record.toEntries(selection.outputs),
          ([name, field]) =>
            Record.get(source.fields, field).pipe(
              Effect.fromOption,
              Effect.mapError(
                () =>
                  new ResourceSourceInvalid({
                    typeName,
                    message: `Output ${name} selects absent field ${field} in ${selection.schema}`,
                  }),
              ),
              Effect.map((schema) => Tuple.make(name, Schema.toType(schema))),
            ),
        );

        const outputs = Schema.Struct(Record.fromEntries(fields));

        return outputs;
      });

      /**
       * The bindResource helper validates selected outputs before resolving
       * their relationships. Its result retains the source contracts, saved identity
       * mapping, and relationship targets required to generate an executable
       * resource.
       */
      const bindResource = Effect.fn("ResourceCatalogs.bindResource")(
        function* (
          catalog: OperationCatalog,
          graph: OpenApiResourceGraph,
          resource: OpenApiResourceDefinition,
          binding: OpenApiResourceBinding,
          hint: OpenApiResourceHint = {},
        ) {
          const selection = yield* resourceBindings.selectOutputs(
            catalog,
            resource.typeName,
            binding,
            hint,
          );

          const compiled = yield* buildOpenApiCatalog(
            catalog,
            resource.typeName,
            selection,
            graph,
          );

          const relationships = yield* resourceBindings.resolveRelationships(
            catalog,
            graph,
            resource.typeName,
            binding,
            hint,
          );

          const result: OpenApiResourceDefinition = {
            ...resource,
            ...compiled,
            ...Option.match(Option.fromUndefinedOr(hint.responseSchema), {
              onNone: () => ({}),
              onSome: (responseSchema) => ({ responseSchema }),
            }),
            schemaPath: binding.schemaPath,
            inputSchemaPath: binding.inputSchemaPath,
            relationships,
          };
          return result;
        },
      );

      /**
       * The resolveBindings helper adds executable bindings
       * to cataloged creation models. Failed resolutions retain their reasons on
       * each resource entry, and conflicting dispatch or input schema names fail
       * preparation.
       */
      const resolveBindings = Effect.fn("ResourceCatalogs.resolveBindings")(
        function* (
          catalog: OperationCatalog,
          graph: OpenApiResourceGraph,
          resources: OpenApiResourcePreparation["resources"],
          hints: OpenApiResourceHints = {},
        ) {
          const resolved = yield* Effect.forEach(
            Record.values(resources),
            (resource) =>
              resolveResource(
                catalog,
                graph,
                resource,
                hints[resource.providerResource] ?? {},
              ),
          );

          const executable = Arr.filter(
            resolved,
            (resource) => resource.operations !== undefined,
          );
          yield* Effect.forEach(executable, (resource, index) =>
            Effect.fail(
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                message:
                  "Executable bindings require distinct type names, dispatch names, and input schema names",
              }),
            ).pipe(
              Effect.when(
                Effect.succeed(
                  Arr.some(
                    Arr.take(executable, index),
                    Predicate.or(
                      (previous: OpenApiResourceDefinition) =>
                        previous.resource === resource.resource,
                      (previous) =>
                        previous.propsSchema === resource.propsSchema,
                    ),
                  ),
                ),
              ),
            ),
          );

          const result: OpenApiResourcePreparation = {
            resources: Record.fromEntries(
              Arr.map(resolved, (resource) =>
                Tuple.make(resource.typeName, resource),
              ),
            ),
            unresolved: Arr.dedupeWith(
              Arr.flatMap(resolved, (resource) => resource.bindingIssues),
              Equivalence.Struct({
                operationId: Equivalence.String,
                reason: Equivalence.String,
              }),
            ),
          };
          return result;
        },
      );

      /**
       * The resolveResource helper selects a creation binding, validates its
       * outputs and relationships, and records unresolved operations on that resource.
       * The returned definition retains every issue needed for catalog inspection.
       */
      const resolveResource = Effect.fn("ResourceCatalogs.resolveResource")(
        function* (
          catalog: OperationCatalog,
          graph: OpenApiResourceGraph,
          resource: OpenApiResourceDefinition,
          hint: OpenApiResourceHint = {},
        ) {
          const creations = Arr.filter(resource.creations, (creation) =>
            Record.isSubrecordBy(Equal.equals)(
              Record.filter(
                {
                  operationId: hint.createOperation,
                  responseSchemaPath: hint.responseSchema,
                },
                Predicate.isNotUndefined,
              ),
              creation,
            ),
          );

          const resolutions = yield* Effect.forEach(creations, (creation) =>
            resolveCreation(catalog, graph, creation, hint),
          );

          const bindings = Arr.getSomes(
            Arr.map(resolutions, (resolution) => resolution.binding),
          );

          const selected = Arr.head(bindings).pipe(
            Option.filter(() => bindings.length === 1),
          );

          const bound = yield* Option.match(selected, {
            onNone: () => Effect.succeed(resource),
            onSome: (binding) =>
              bindResource(catalog, graph, resource, binding, hint).pipe(
                Effect.catchTag("ResourceSourceInvalid", (error) => {
                  const unresolved: OpenApiResourceDefinition = {
                    ...resource,
                    bindingIssues: [
                      {
                        operationId: binding.createOperation,
                        reason: error.message,
                      },
                    ],
                  };
                  return Effect.succeed(unresolved);
                }),
              ),
          });

          const mutations = yield* resourceBindings
            .resolveOperations(catalog, graph, bound, hint)
            .pipe(Effect.when(Effect.succeed(bound.operations !== undefined)));

          const resolved = Option.getOrElse(mutations, () => bound);

          const issues: ReadonlyArray<OpenApiResourceDiscoveryIssue> = [
            ...resolved.bindingIssues,
            ...Arr.flatMap(resolutions, (resolution) => resolution.issues),
            ...Arr.map(
              Arr.filter(
                resolutions,
                Predicate.and(
                  (resolution: OpenApiResourceCreationResolution) =>
                    Option.isNone(resolution.binding),
                  (resolution) => Arr.isReadonlyArrayEmpty(resolution.issues),
                ),
              ),
              ({ creation }) => ({
                operationId: creation.operationId,
                reason:
                  "Creation is cataloged; a compatible saved-identity read binding is unresolved",
              }),
            ),
            ...Arr.map(
              Arr.filter(bindings, () => bindings.length > 1),
              (binding) => ({
                operationId: binding.createOperation,
                reason: "Multiple creation bindings require a resource hint",
              }),
            ),
          ];

          const result: OpenApiResourceDefinition = {
            ...resolved,
            bindingIssues: issues,
          };

          return result;
        },
      );

      /**
       * The describeResource helper assigns a provider model its application
       * type name and retains every creation operation before executable binding
       * selection. Reviewed naming hints take precedence over provider titles.
       */
      const describeResource = Effect.fn("ResourceCatalogs.describeResource")(
        function* (
          catalog: OperationCatalog,
          graph: OpenApiResourceGraph,
          name: string,
          creations: ReadonlyArray<OpenApiDiscoveredResource>,
          hint: OpenApiResourceHint = {},
          namespace: string = catalog.source.service,
        ) {
          const first = yield* Arr.head(creations).pipe(Effect.fromOption);

          const index = yield* Option.fromUndefinedOr(
            graph.indices.get(first.schemaPath),
          ).pipe(Effect.fromOption);

          const node = yield* Graph.getNode(graph.graph, index).pipe(
            Effect.fromOption,
          );

          const component = yield* Schema.decodeUnknownEffect(
            Schema.JsonObject,
          )(node.schema);

          const versionedName = /^v\d+\./.test(name);

          const resourceName =
            hint?.name ??
            Option.some(name).pipe(
              Option.filter(() => versionedName),
              Option.flatMap(() =>
                Schema.decodeUnknownOption(Schema.String)(component.title),
              ),
              Option.getOrElse(() => name),
            );

          const sourceName = Arr.join(
            Arr.map(Str.split(resourceName, /[\s._-]/), Str.capitalize),
            "",
          );

          const service = Option.some(name).pipe(
            Option.filter(() => versionedName),
            Option.flatMap((name) => Arr.get(Str.split(name, "."), 1)),
            Option.getOrElse(() => namespace),
          );

          const typeName = `${catalog.source.provider}::${Str.capitalize(service)}::${sourceName}`;

          const result: OpenApiResourceDefinition = {
            source: catalog.source,
            typeName,
            providerResource: name,
            schemaPath: first.schemaPath,
            inputSchemaPath: first.inputSchemaPath,
            primaryIdentifier: [],
            outputs: {},
            relationships: [],
            creations: Arr.map(creations, (creation) => ({
              operationId: creation.createOperation,
              responseSchemaPath: creation.schemaPath,
              inputSchemaPath: creation.inputSchemaPath,
            })),
            bindingIssues: [],
          };

          return result;
        },
      );

      /**
       * The selectResponseOutputs helper validates selected provider fields
       * and retains their validation and source locations for catalog construction.
       */
      const selectResponseOutputs = Effect.fn(
        "ResourceCatalogs.selectResponseOutputs",
      )(function* (
        graph: OpenApiResourceGraph,
        typeName: string,
        selection: OpenApiResourceSelection,
      ) {
        const properties = yield* resourceSchemas.readProperties(
          graph,
          selection.schema,
        );

        const fields: ReadonlyArray<OpenApiResourceOutputField> =
          yield* Effect.forEach(Record.toEntries(selection.outputs), (entry) =>
            readResponseOutput(typeName, selection.schema, properties, entry),
          );

        return fields;
      });

      /**
       * The selectInputOutputs helper validates selected creation parameters
       * and retains their validation and source locations for catalog construction.
       */
      const selectInputOutputs = Effect.fn(
        "ResourceCatalogs.selectInputOutputs",
      )(function* (
        catalog: OperationCatalog,
        typeName: string,
        selection: OpenApiResourceSelection,
      ) {
        const create = yield* Arr.findFirst(
          catalog.operations,
          (operation) => operation.operationId === selection.operations.create,
        ).pipe(Effect.fromOption);

        const fields: ReadonlyArray<OpenApiResourceOutputField> =
          yield* Effect.forEach(
            Record.toEntries(selection.inputOutputs ?? {}),
            (entry) => readInputOutput(typeName, create, entry),
          );

        return fields;
      });

      /**
       * The resolveCreation helper keeps a creation candidate with its read
       * binding or source issue. A failed candidate remains inspectable when another
       * candidate supplies the executable resource binding.
       */
      const resolveCreation = Effect.fn("ResourceCatalogs.resolveCreation")(
        function* (
          catalog: OperationCatalog,
          graph: OpenApiResourceGraph,
          creation: OpenApiResourceCreation,
          hint: OpenApiResourceHint = {},
        ) {
          const resolution: OpenApiResourceCreationResolution =
            yield* resourceBindings
              .resolveReadBinding(catalog, graph, creation, hint)
              .pipe(
                Effect.map((binding) => ({
                  creation,
                  binding,
                  issues: Arr.empty<OpenApiResourceDiscoveryIssue>(),
                })),
                Effect.catchTag("ResourceSourceInvalid", (error) =>
                  Effect.succeed({
                    creation,
                    binding: Option.none<OpenApiResourceBinding>(),
                    issues: [
                      {
                        operationId: creation.operationId,
                        reason: error.message,
                      },
                    ],
                  }),
                ),
              );

          return resolution;
        },
      );

      /**
       * The readResponseOutput helper retains the validation and source
       * path of a selected provider field. Missing fields and multiple source
       * definitions fail before catalog construction.
       */
      const readResponseOutput = Effect.fn(
        "ResourceCatalogs.readResponseOutput",
      )(function* (
        typeName: string,
        schema: string,
        properties: ReadonlyArray<OpenApiDiscoveredProperty>,
        [name, field]: readonly [string, string],
      ) {
        const matches = Arr.filter(
          properties,
          (property) => property.name === field,
        );

        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName,
            message: `Output ${name} has multiple source definitions in ${schema}; a single output contract is required`,
          }),
        ).pipe(Effect.when(Effect.succeed(matches.length > 1)));

        const property = yield* Arr.head(matches).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName,
                message: `Output ${name} selects absent field ${field} in ${schema}`,
              }),
          ),
        );

        const output: OpenApiResourceOutputField = {
          name,
          field,
          schema: property.schema,
          schemaPath: property.schemaPath,
          required: property.required,
          inputParameter: undefined,
        };

        return output;
      });

      /**
       * The readInputOutput helper retains a required creation parameter
       * as a saved parent identity. The parameter must have a supported request
       * location and a source schema before it can become an application output.
       */
      const readInputOutput = Effect.fn("ResourceCatalogs.readInputOutput")(
        function* (
          typeName: string,
          create: ClientOperation,
          [name, field]: readonly [string, string],
        ) {
          const parameter = yield* Arr.findFirst(
            resourceBindings.readIdentityParameters(create),
            (parameter) => parameter.name === field,
          ).pipe(
            Effect.fromOption,
            Effect.mapError(
              () =>
                new ResourceSourceInvalid({
                  typeName,
                  message: `Identity output ${name} requires a required creation parameter ${field}`,
                }),
            ),
          );

          const schemaPath = yield* Option.fromUndefinedOr(
            parameter.schemaPath,
          ).pipe(
            Effect.fromOption(
              () =>
                new ResourceSourceInvalid({
                  typeName,
                  message: `Identity output ${name} requires a schema location for creation parameter ${field}`,
                }),
            ),
          );

          const schema = yield* Option.fromUndefinedOr(parameter.schema).pipe(
            Effect.fromOption(
              () =>
                new ResourceSourceInvalid({
                  typeName,
                  message: `Identity output ${name} requires a schema for creation parameter ${field}`,
                }),
            ),
          );

          const output: OpenApiResourceOutputField = {
            name,
            field,
            schema,
            schemaPath,
            required: true,
            inputParameter: field,
          };

          return output;
        },
      );

      /**
       * The readDefinitionOutput helper resolves a declared read-only field
       * to its schema and output paths. A missing Registry property fails before the
       * output can enter a generated catalog.
       */
      const readDefinitionOutput = Effect.fn(
        "ResourceCatalogs.readDefinitionOutput",
      )(function* (definition: ResourceDefinition, name: string) {
        const schema = yield* Record.get(definition.properties, name).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName: definition.typeName,
                message: `Read-only property ${name} is absent from the resource schema`,
              }),
          ),
        );

        const path = JsonPointer.escapeToken(name);
        const output: readonly [
          string,
          ResourceOutputCatalog["outputs"][string],
        ] = Tuple.make(name, {
          schema,
          schemaPath: `/properties/${path}`,
          valuePath: `/${path}`,
          required: Arr.contains(definition.required, name),
        });

        return output;
      });

      return {
        buildCatalog,
        buildOpenApiCatalog,
        buildDiscoveredCatalog,
        buildEffectCatalog,
        prepareJsonSchemaResources,
        emitCatalog,
      };
    }),
  },
) {}

/**
 * The resourceCatalogsLayer Layer requires OpenApiResourceSchemas and
 * OpenApiResourceBindings from the generation graph. Callers can compose this
 * Layer with their own implementations of those services.
 */
export const resourceCatalogsLayer = Layer.effect(
  ResourceCatalogs,
  ResourceCatalogs.make,
);
