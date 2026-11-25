import {
  Array as Arr,
  Context,
  Effect,
  Equal,
  Equivalence,
  HashSet,
  JsonPointer,
  Layer,
  Match,
  Option,
  Predicate,
  Record,
  Schema,
  String as Str,
  Tuple,
} from "effect";
import type { OperationCatalog } from "./catalogSchemas.js";
import { OpenApiResourceSchemas } from "./openApiResourceSchemas.js";
import { OperationCatalogs } from "./operationCatalogs.js";
import type {
  ClientOperation,
  OperationParameter,
} from "./operationSchemas.js";
import type {
  OpenApiDiscoveredResource,
  OpenApiOperationRoot,
  OpenApiParameterBindings,
  OpenApiPropertyLink,
  OpenApiResourceBinding,
  OpenApiResourceDiscovery,
  OpenApiResourceDiscoveryIssue,
  OpenApiResourceGraph,
  OpenApiResourceReadCandidate,
  OpenApiSchemaNode,
} from "./resourceDiscoverySchemas.js";
import { ResourceSourceInvalid } from "./resourceErrors.js";
import {
  type OpenApiResourceCreation,
  type OpenApiResourceDefinition,
  type OpenApiResourceHint,
  type OpenApiResourceHints,
  type OpenApiResourceSelection,
  ResourceDefinition,
  type ResourceOperations,
  type ResourceRelationship,
  ResourceRemovalBinding,
} from "./resourceSchemas.js";

/**
 * The OpenApiResourceBindings service selects operations and relationships
 * that can use a resource's saved identity. Discovery retains unresolved
 * creation models, and output selection preserves the provider fields required
 * for reads and retained values. Catalog construction validates those
 * selections before publication.
 */
export class OpenApiResourceBindings extends Context.Service<OpenApiResourceBindings>()(
  "nomoss/tools/codegen/openApiResourceBindings",
  {
    make: Effect.gen(function* () {
      const operations = yield* OperationCatalogs;

      const resourceSchemas = yield* OpenApiResourceSchemas;

      /**
       * The discoverResources service method retains creation models before executable
       * read binding is resolved. Operations with no response model retain a source
       * issue so catalog consumers can inspect the unsupported creation operation.
       */
      const discoverResources = Effect.fn(
        "OpenApiResourceBindings.discoverResources",
      )(function* (
        catalog: OperationCatalog,
        source: OpenApiResourceGraph,
        hints: OpenApiResourceHints = {},
      ) {
        const creates = selectCreationOperations(catalog);
        const resources = yield* Effect.forEach(creates, (create) =>
          discoverCreationResources(source, create, hints),
        ).pipe(Effect.map(Arr.flatten));
        const discovered = HashSet.fromIterable(
          Arr.map(resources, (resource) => resource.createOperation),
        );
        const unresolved = Arr.filter(
          creates,
          Predicate.not((create: ClientOperation) =>
            HashSet.has(discovered, create.operationId),
          ),
        );

        const result: OpenApiResourceDiscovery = {
          resources,
          unresolved: Arr.map(unresolved, (create) => ({
            operationId: create.operationId,
            reason: "Creation has no declared response schema",
          })),
        };

        return result;
      });

      /**
       * The resolveReadBinding service method requires hints for every parent
       * identity and one compatible item read. Its result preserves the selected
       * parameter with the operation whose response supplies the resource identity.
       */
      const resolveReadBinding = Effect.fn(
        "OpenApiResourceBindings.resolveReadBinding",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        creation: OpenApiResourceCreation,
        hint: OpenApiResourceHint = {},
      ) {
        const create = yield* Arr.findFirst(
          catalog.operations,
          (operation) => operation.operationId === creation.operationId,
        ).pipe(Effect.fromOption);

        const parents = readIdentityParameters(create);
        const unresolved = Arr.filter(
          parents,
          Predicate.not((parent: typeof OperationParameter.Type) =>
            Record.has(
              hint.relationships ?? {},
              `/${JsonPointer.escapeToken(parent.name)}`,
            ),
          ),
        );

        yield* Effect.succeed(parents).pipe(
          Effect.filterOrFail(
            () => Arr.isReadonlyArrayEmpty(unresolved),
            () =>
              new ResourceSourceInvalid({
                typeName: creation.responseSchemaPath,
                message:
                  "Required creation parameters need relationship hints: " +
                  Arr.join(
                    Arr.map(unresolved, (parent) => parent.name),
                    ", ",
                  ),
              }),
          ),
        );

        const candidates = selectReadCandidates(catalog, create, parents, hint);
        const scope: "responses" | "properties" = Option.match(
          Option.fromUndefinedOr(hint.responseSchema),
          { onNone: () => "responses", onSome: () => "properties" },
        );

        const compatible = yield* Effect.filter(candidates, (candidate) =>
          resourceSchemas
            .readOperationSchemas(graph, candidate.operation.operationId, scope)
            .pipe(
              Effect.map(({ responses: schemas }) =>
                Arr.some(
                  schemas,
                  (node) => node.path === creation.responseSchemaPath,
                ),
              ),
            ),
        );

        const candidate = Arr.head(compatible).pipe(
          Option.filter(() => compatible.length === 1),
        );
        const identity = yield* resourceSchemas.readIdentity(
          catalog,
          graph,
          creation.responseSchemaPath,
        );

        const resolved = Option.all({
          candidate,
          identity,
          inputSchemaPath: Option.fromNullishOr(creation.inputSchemaPath),
        });

        const binding: Option.Option<OpenApiResourceBinding> = Option.map(
          resolved,
          ({ candidate, identity, inputSchemaPath }) => ({
            createOperation: creation.operationId,
            schemaPath: creation.responseSchemaPath,
            inputSchemaPath,
            readOperation: candidate.operation.operationId,
            readParameter: candidate.parameter.name,
            identityProperty: identity.name,
            parentParameters: Arr.map(parents, (parent) => parent.name),
          }),
        );

        return binding;
      });

      /**
       * The resolveOperations service method requires executable removal when
       * a hint selects a replacement workflow. An unavailable removal fails
       * with ResourceSourceInvalid before generation can publish that workflow.
       * Other failed mutation selections remain catalog issues so creation and
       * reads can retain their independent availability.
       */
      const resolveOperations = Effect.fn(
        "OpenApiResourceBindings.resolveOperations",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        resource: OpenApiResourceDefinition,
        hint: OpenApiResourceHint = {},
      ) {
        const current = yield* Option.fromUndefinedOr(resource.operations).pipe(
          Effect.fromOption,
        );
        const resolutions = yield* Effect.forEach(
          Record.toEntries({
            update: hint.updateOperation,
            remove: hint.removeOperation,
          }),
          ([action, selected]) =>
            resolveMutationBinding(
              catalog,
              graph,
              resource,
              action,
              selected,
              Match.value(action).pipe(
                Match.when("remove", () => hint.removeValues),
                Match.orElse(() => undefined),
              ),
            ).pipe(
              Effect.map((binding) => ({
                action,
                binding: Option.some(binding),
                issues: Arr.empty<OpenApiResourceDiscoveryIssue>(),
              })),
              Effect.catchTag("ResourceSourceInvalid", (error) =>
                Effect.succeed({
                  action,
                  binding: Option.none<typeof ResourceRemovalBinding.Type>(),
                  issues: [
                    {
                      operationId:
                        error.operationId ?? selected ?? current.create,
                      reason: error.message,
                    },
                  ],
                }),
              ),
            ),
        );

        const roots = yield* resourceSchemas.resolveSchemas(
          graph,
          resource.inputSchemaPath ?? "",
        );

        const invalidPaths = Arr.filter(
          hint.createOnlyProperties ?? [],
          Predicate.or(
            Predicate.not(Str.startsWith("/properties/")),
            Predicate.not((path: string) =>
              Arr.some(roots, (root) =>
                graph.indices.has(`${root.path}${path}`),
              ),
            ),
          ),
        );

        const replacement = Option.fromUndefinedOr(
          hint.createOnlyProperties,
        ).pipe(Option.filter(() => invalidPaths.length === 0));
        const replacementReason = Match.value(invalidPaths.length > 0).pipe(
          Match.when(
            true,
            () =>
              `Replacement property paths cannot be resolved in the creation schema: ${Arr.join(invalidPaths, ", ")}`,
          ),
          Match.orElse(
            () => "Replacement properties require a reviewed resource hint",
          ),
        );

        const mutationBindings = Record.fromEntries(
          Arr.flatMap(resolutions, ({ action, binding }) =>
            Arr.map(Option.toArray(binding), (binding) =>
              Tuple.make(action, binding),
            ),
          ),
        );

        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName: resource.typeName,
            message: "Replacement requires an executable removal operation",
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Predicate.and(
                () => Predicate.isNotUndefined(hint.replacement),
                Predicate.not(() => Record.has(mutationBindings, "remove")),
              )(resource),
            ),
          ),
        );

        const result: OpenApiResourceDefinition = {
          ...resource,
          ...Record.filter(
            { declaration: hint.declaration, request: hint.request },
            Predicate.isNotUndefined,
          ),
          ...Option.match(Option.fromUndefinedOr(hint.replacement), {
            onNone: () => ({}),
            onSome: (replacement) => ({ replacement }),
          }),
          ...Option.match(
            Option.fromUndefinedOr(hint.deletedResponseMeansMissing),
            {
              onNone: () => ({}),
              onSome: (deletedResponseMeansMissing) => ({
                deletedResponseMeansMissing,
              }),
            },
          ),
          ...Option.match(replacement, {
            onNone: () => ({}),
            onSome: (paths) => ({ createOnlyProperties: paths }),
          }),
          operations: {
            create: current.create,
            read: current.read,
            ...mutationBindings,
          },
          bindingIssues: [
            ...resource.bindingIssues,
            ...Arr.flatMap(resolutions, (resolution) => resolution.issues),
            ...Match.value({
              properties: replacement,
              rule: hint.replacement,
            }).pipe(
              Match.when(
                { properties: { _tag: "None" }, rule: Predicate.isUndefined },
                () => [
                  {
                    operationId: current.create,
                    reason: replacementReason,
                  },
                ],
              ),
              Match.orElse(() => []),
            ),
          ],
        };
        return result;
      });

      /**
       * The validateOperations service method checks that selected operations
       * can create and read the resource using its saved outputs. Required read
       * parameters must bind to declared outputs with compatible types, and selected
       * mutations must use the saved identity.
       */
      const validateOperations = Effect.fn(
        "OpenApiResourceBindings.validateOperations",
      )(function* (
        catalog: OperationCatalog,
        typeName: string,
        selection: OpenApiResourceSelection,
        graph: OpenApiResourceGraph,
      ) {
        const create = yield* resolveOperation(
          catalog,
          typeName,
          selection.operations.create,
          selection.schema,
          graph,
        );

        const read = yield* resolveOperation(
          catalog,
          typeName,
          selection.operations.read.operationId,
          selection.schema,
          graph,
        );

        const bindings = selection.operations.read.parameters;
        const parameterBindings = resolveParameterBindings(read, bindings);
        const requestParameters = Arr.filter(
          read.parameters,
          Predicate.Struct({
            location: Predicate.or(Equal.equals("path"), Equal.equals("query")),
          }),
        );

        const parameterNames = HashSet.fromIterable(
          Arr.map(requestParameters, (parameter) => parameter.name),
        );
        const outputNames = HashSet.fromIterable(
          Arr.appendAll(
            Record.keys(selection.outputs),
            Record.keys(selection.inputOutputs ?? {}),
          ),
        );

        const addressable = Record.filter(bindings, (_, name) =>
          HashSet.has(parameterNames, name),
        );
        const supported = Record.filter(addressable, (output) =>
          HashSet.has(outputNames, output),
        );
        const unsupported = Arr.difference(
          Record.keys(bindings),
          Record.keys(supported),
        );

        const identityPaths = Arr.map(
          Record.values(bindings),
          (name) => `/properties/${JsonPointer.escapeToken(name)}`,
        );

        const identityComplete = Arr.every(
          selection.primaryIdentifier,
          (path) => Arr.contains(identityPaths, path),
        );

        const checks = {
          requiredParametersBound: Arr.isReadonlyArrayEmpty(
            parameterBindings.unbound,
          ),
          outputsSupported: Arr.isReadonlyArrayEmpty(unsupported),
          identityComplete,
          parameterNamesUnique: Predicate.Struct({
            ambiguous: Equal.equals(false),
          })(parameterBindings),
          locationsSupported: Arr.isReadonlyArrayEmpty(
            parameterBindings.unsupported,
          ),
          requestBodyOptional: read.requestBody?.required !== true,
        };
        yield* Effect.succeed(selection).pipe(
          Effect.filterOrFail(
            () => Record.every(checks, Equal.equals(true)),
            () =>
              new ResourceSourceInvalid({
                typeName,
                message: `Saved output bindings do not satisfy ${read.operationId}`,
              }),
          ),
        );

        yield* validateOutputTypes(
          catalog,
          graph,
          typeName,
          selection,
          create,
          read,
        );

        const configured = {
          update: Option.fromUndefinedOr(selection.operations.update),
          remove: Option.fromUndefinedOr(selection.operations.remove),
        };

        const selectedMutations = yield* Effect.forEach(
          Record.toEntries(configured),
          ([action, selected]) =>
            Effect.transposeOption(
              Option.map(selected, (binding) =>
                validateMutationBinding(
                  catalog,
                  graph,
                  typeName,
                  selection,
                  action,
                  binding,
                ).pipe(
                  Effect.map((validated) => Tuple.make(action, validated)),
                ),
              ),
            ),
        );

        const mutations = Record.fromEntries(Arr.getSomes(selectedMutations));
        const binding: ResourceOperations = {
          create: create.operationId,
          read: selection.operations.read,
          ...mutations,
        };

        return binding;
      });

      /**
       * The selectOutputs service method assigns application names to the identity
       * and retained provider fields required by a discovered resource. Parent
       * identities select required creation parameters, and aliases must identify
       * distinct outputs.
       */
      const selectOutputs = Effect.fn("OpenApiResourceBindings.selectOutputs")(
        function* (
          catalog: OperationCatalog,
          typeName: string,
          binding: OpenApiResourceBinding,
          hint: OpenApiResourceHint = {},
        ) {
          const sourceName = yield* Schema.decodeEffect(
            ResourceDefinition.fields.typeName,
          )(typeName).pipe(
            Effect.map((name) => Str.split(name, "::")),
            Effect.flatMap((parts) => Arr.last(parts).pipe(Effect.fromOption)),
            Effect.mapError(
              (cause) =>
                new ResourceSourceInvalid({ typeName, message: cause.message }),
            ),
          );

          const fields = Arr.dedupe([
            binding.identityProperty,
            ...(hint.retainOnRead ?? []),
            ...(hint.secretOutputs ?? []),
          ]);

          const outputNames = Record.fromEntries(
            Arr.map(fields, (field) =>
              Tuple.make(
                field,
                hint.outputAliases?.[field] ??
                  Match.value(field).pipe(
                    Match.when(
                      binding.identityProperty,
                      () => `${sourceName}Id`,
                    ),
                    Match.orElse(() => field),
                  ),
              ),
            ),
          );

          const unusedAliases = Arr.difference(
            Record.keys(hint.outputAliases ?? {}),
            Arr.appendAll(fields, binding.parentParameters ?? []),
          );

          yield* Effect.fail(
            new ResourceSourceInvalid({
              typeName,
              message: `Output aliases do not select discovered outputs: ${Arr.join(unusedAliases, ", ")}`,
            }),
          ).pipe(Effect.when(Effect.succeed(unusedAliases.length > 0)));

          yield* Effect.fail(
            new ResourceSourceInvalid({
              typeName,
              message:
                "Output aliases must give each selected field a distinct name",
            }),
          ).pipe(
            Effect.when(
              Effect.succeed(
                Arr.dedupe(Record.values(outputNames)).length !== fields.length,
              ),
            ),
          );

          const identityName = outputNames[binding.identityProperty];

          const inputOutputs = Record.fromEntries(
            Arr.map(binding.parentParameters ?? [], (parameter) =>
              Tuple.make(
                hint.outputAliases?.[parameter] ??
                  `${Str.replace(
                    /Id$/,
                    "",
                  )(
                    Arr.join(
                      Arr.map(Str.split(parameter, /[\s._-]/), Str.capitalize),
                      "",
                    ),
                  )}Id`,
                parameter,
              ),
            ),
          );

          const readParameters = Record.fromEntries([
            Tuple.make(binding.readParameter, identityName),
            ...Arr.map(Record.toEntries(inputOutputs), ([output, parameter]) =>
              Tuple.make(parameter, output),
            ),
          ]);

          yield* Effect.fail(
            new ResourceSourceInvalid({
              typeName,
              message: "Parent identities require distinct output aliases",
            }),
          ).pipe(
            Effect.when(
              Effect.succeed(
                Record.keys(inputOutputs).length !==
                  (binding.parentParameters ?? []).length,
              ),
            ),
          );

          const selection: OpenApiResourceSelection = {
            resource: Str.toLowerCase(
              Str.replace(/([a-z0-9])([A-Z])/g, "$1-$2")(sourceName),
            ),
            propsSchema:
              hint.propsSchema ??
              `${catalog.source.provider}${sourceName}PropsSchema`,
            schema: binding.schemaPath,
            outputs: Record.fromEntries(
              Arr.map(fields, (field) => Tuple.make(outputNames[field], field)),
            ),
            primaryIdentifier: [
              `/properties/${JsonPointer.escapeToken(identityName)}`,
              ...Arr.map(
                Record.keys(inputOutputs),
                (name) => `/properties/${JsonPointer.escapeToken(name)}`,
              ),
            ],
            inputOutputs,
            operations: {
              create: binding.createOperation,
              read: {
                operationId: binding.readOperation,
                parameters: readParameters,
              },
            },
            retainOnRead: Arr.map(
              hint.retainOnRead ?? [],
              (field) => outputNames[field],
            ),
            stateSecretOutputKeys: Arr.map(
              hint.secretOutputs ?? [],
              (field) => outputNames[field],
            ),
          };
          return selection;
        },
      );

      /**
       * The resolveRelationships service method maps creation inputs to allowed
       * resource identities using provider expansion metadata and reviewed hints.
       * Hinted inputs and identities must resolve in the provider schema. Every
       * unresolved automatic target remains in the returned relationship.
       */
      const resolveRelationships = Effect.fn(
        "OpenApiResourceBindings.resolveRelationships",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        typeName: string,
        binding: OpenApiResourceBinding,
        hint: OpenApiResourceHint = {},
      ) {
        const automaticLinks = yield* resourceSchemas.linkProperties(
          graph,
          binding.inputSchemaPath,
          binding.schemaPath,
        );

        const explicitLinks = yield* Effect.forEach(
          Record.toEntries(hint.relationships ?? {}),
          ([pointer, targetSchemas]) =>
            Effect.gen(function* () {
              const propertyPath = yield* Option.fromUndefinedOr(
                JsonPointer.parseUriFragment(`#${pointer}`),
              ).pipe(
                Effect.fromOption,
                Effect.mapError(
                  () =>
                    new ResourceSourceInvalid({
                      typeName,
                      message: `Invalid relationship path ${pointer}`,
                    }),
                ),
              );

              const create = yield* Arr.findFirst(
                catalog.operations,
                (operation) =>
                  operation.operationId === binding.createOperation,
              ).pipe(Effect.fromOption);

              const parameter = Option.flatMap(
                Arr.head(propertyPath).pipe(
                  Option.filter(() => propertyPath.length === 1),
                ),
                (name) =>
                  Arr.findFirst(
                    create.parameters,
                    Predicate.Struct({ name: Equal.equals(name) }),
                  ),
              );

              const selectedInput = Option.match(parameter, {
                onSome: (parameter) => ({
                  path: parameter.schemaPath,
                  segments: Arr.empty<string>(),
                }),
                onNone: () => ({
                  path: binding.inputSchemaPath,
                  segments: propertyPath,
                }),
              });

              const initialPath = yield* Option.fromUndefinedOr(
                selectedInput.path,
              ).pipe(Effect.fromOption);
              const inputSchemaPath = yield* Effect.reduce(
                selectedInput.segments,
                () => initialPath,
                (path, name) =>
                  resourceSchemas.readProperties(graph, path).pipe(
                    Effect.flatMap((properties) =>
                      Arr.findFirst(
                        properties,
                        (property) => property.name === name,
                      ).pipe(Effect.fromOption),
                    ),
                    Effect.map((property) => property.schemaPath),
                  ),
              ).pipe(
                Effect.mapError(
                  () =>
                    new ResourceSourceInvalid({
                      typeName,
                      message: `Relationship ${pointer} selects no creation input`,
                    }),
                ),
              );
              yield* Effect.forEach(targetSchemas, (path) =>
                resourceSchemas.readIdentity(catalog, graph, path).pipe(
                  Effect.flatMap(Effect.fromOption),
                  Effect.mapError(
                    () =>
                      new ResourceSourceInvalid({
                        typeName,
                        message: `Relationship ${pointer} has no usable identity in ${path}`,
                      }),
                  ),
                ),
              );

              const responseSchemaPath = yield* Arr.head(targetSchemas).pipe(
                Effect.fromOption(
                  () =>
                    new ResourceSourceInvalid({
                      typeName,
                      message: `Relationship ${pointer} requires a target schema`,
                    }),
                ),
              );

              const link: OpenApiPropertyLink = {
                propertyPath,
                inputSchemaPath,
                responseSchemaPath,
                targetSchemas,
              };

              return link;
            }),
        );

        const links = Arr.appendAll(
          Arr.filter(
            automaticLinks,
            Predicate.not((link: OpenApiPropertyLink) =>
              Record.has(
                hint.relationships ?? {},
                Str.substring(1)(
                  JsonPointer.formatUriFragment(link.propertyPath),
                ),
              ),
            ),
          ),
          explicitLinks,
        );

        const relationships: ReadonlyArray<ResourceRelationship> =
          yield* Effect.forEach(links, (link) =>
            Effect.gen(function* () {
              const alternatives = yield* Effect.forEach(
                link.targetSchemas,
                (path) =>
                  resourceSchemas
                    .readIdentity(catalog, graph, path)
                    .pipe(Effect.map((identity) => ({ path, identity }))),
              );

              const result: ResourceRelationship = {
                propertyPath: link.propertyPath,
                inputSchemaPath: link.inputSchemaPath,
                responseSchemaPath: link.responseSchemaPath,
                targets: Arr.flatMap(alternatives, ({ path, identity }) =>
                  identity.pipe(
                    Option.map((property) => ({
                      resource: JsonPointer.unescapeToken(
                        Str.substring("#/components/schemas/".length)(path),
                      ),
                      propertyPath: `/properties/${JsonPointer.escapeToken(property.name)}`,
                      schemaPath: property.schemaPath,
                    })),
                    Option.toArray,
                  ),
                ),
                unresolved: Arr.map(
                  Arr.filter(alternatives, ({ identity }) =>
                    Option.isNone(identity),
                  ),
                  ({ path }) => path,
                ),
              };
              return result;
            }),
          );
        return relationships;
      });

      /**
       * The readIdentityParameters service method selects required path and query
       * parameters whose values must survive creation for later identity reads.
       */
      const readIdentityParameters = (operation: ClientOperation) => {
        const parameters: ReadonlyArray<typeof OperationParameter.Type> =
          Arr.filter(
            operation.parameters,
            Predicate.Struct({
              required: Equal.equals(true),
              location: Predicate.or(
                Equal.equals("path"),
                Equal.equals("query"),
              ),
            }),
          );

        return parameters;
      };

      /**
       * The resolveOperation helper requires a selected operation to
       * return the resource schema in a successful response. Direct references and
       * explicit response alternatives establish which model the operation can
       * supply.
       */
      const resolveOperation = Effect.fn(
        "OpenApiResourceBindings.resolveOperation",
      )(function* (
        catalog: OperationCatalog,
        typeName: string,
        operationId: string,
        schemaReference: string,
        graph: OpenApiResourceGraph,
      ) {
        const selected = yield* Arr.findFirst(
          catalog.operations,
          (operation) => operation.operationId === operationId,
        ).pipe(
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName,
                message: `Operation ${operationId} is absent from the operation catalog`,
                operationId,
              }),
          ),
        );

        const { responses: responseSchemas } =
          yield* resourceSchemas.readOperationSchemas(graph, operationId);

        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName,
            message: `Operation ${operationId} has no resource response for ${schemaReference}`,
            operationId,
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Arr.every(
                responseSchemas,
                Predicate.not(
                  Predicate.Struct({ path: Equal.equals(schemaReference) }),
                ),
              ),
            ),
          ),
        );

        const operation: ClientOperation = selected;

        return operation;
      });

      /**
       * The resolveMutationBinding helper validates saved-identity
       * bindings for an update or removal. An explicit removal hint can select POST
       * with fixed values for deactivation. Automatic removal discovery selects
       * DELETE, and updates must return the selected resource model.
       */
      const resolveMutationBinding = Effect.fn(
        "OpenApiResourceBindings.resolveMutationBinding",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        resource: Pick<
          OpenApiResourceDefinition,
          "typeName" | "schemaPath" | "operations"
        >,
        action: "update" | "remove",
        operationId?: string,
        values?: Schema.JsonObject,
      ) {
        const current = yield* Option.fromUndefinedOr(resource.operations).pipe(
          Effect.fromOption,
        );
        const read = yield* Arr.findFirst(
          catalog.operations,
          (operation) => operation.operationId === current.read.operationId,
        ).pipe(Effect.fromOption);

        const methods = Match.value(action).pipe(
          Match.when("update", () => ["POST", "PUT", "PATCH"]),
          Match.orElse(() =>
            Option.match(Option.fromUndefinedOr(operationId), {
              onNone: () => ["DELETE"],
              onSome: () => ["DELETE", "POST"],
            }),
          ),
        );

        const candidates = Arr.filter(
          catalog.operations,
          Predicate.and(
            (operation: ClientOperation) =>
              Option.match(Option.fromUndefinedOr(operationId), {
                onNone: () => operation.path === read.path,
                onSome: (selected) => selected === operation.operationId,
              }),
            (operation) => Arr.contains(methods, operation.method),
          ),
        );

        const reason = Match.value(candidates.length > 1).pipe(
          Match.when(
            true,
            () =>
              `Multiple ${action} operations require a resource hint: ${Arr.join(
                Arr.map(candidates, (operation) => operation.operationId),
                ", ",
              )}`,
          ),
          Match.orElse(() =>
            Option.match(Option.fromUndefinedOr(operationId), {
              onNone: () =>
                `No ${action} operation matches the saved-identity resource path ${read.path}`,
              onSome: (selected) =>
                `Selected ${action} operation ${selected} is absent or has an unsupported HTTP method`,
            }),
          ),
        );

        const operation = yield* Arr.head(candidates).pipe(
          Option.filter(() => candidates.length === 1),
          Effect.fromOption,
          Effect.mapError(
            () =>
              new ResourceSourceInvalid({
                typeName: resource.typeName,
                operationId: operationId ?? current.create,
                message: reason,
              }),
          ),
        );

        const parameters = Record.filter(current.read.parameters, (_, name) =>
          Arr.some(
            operation.parameters,
            (parameter) => parameter.name === name,
          ),
        );

        const parameterBindings = resolveParameterBindings(
          operation,
          parameters,
        );

        const bound = parameterBindings.bound;
        const identitySchemas = yield* Effect.forEach(bound, (parameter) =>
          Schema.decodeUnknownEffect(Schema.JsonObject)(parameter.schema).pipe(
            Effect.flatMap((schema) =>
              operations.resolveOpenApiObject(catalog.document, schema),
            ),
            Effect.map((schema) => schema.type === "string"),
            Effect.mapError(
              (cause) =>
                new ResourceSourceInvalid({
                  typeName: resource.typeName,
                  operationId: operation.operationId,
                  message: cause.message,
                }),
            ),
          ),
        );

        const identityComplete = Arr.every(
          Record.values(current.read.parameters),
          (output) => Arr.contains(Record.values(parameters), output),
        );

        const identityPreserved = Predicate.not((fixed: Schema.JsonObject) =>
          Record.some(fixed, (_, name) => Record.has(parameters, name)),
        )(values ?? {});
        const parameterReason = `required or ambiguous parameter locations cannot use saved outputs: ${Arr.join(
          Arr.map(
            operation.parameters,
            (parameter) => `${parameter.location}:${parameter.name}`,
          ),
          ", ",
        )}`;
        const removalBodyOptional = Match.value(action).pipe(
          Match.when("remove", () => operation.requestBody?.required !== true),
          Match.orElse(() => true),
        );

        const checks = [
          {
            valid: identityPreserved,
            reason:
              "fixed removal values cannot override saved identity parameters",
          },
          {
            valid: removalBodyOptional,
            reason:
              "removal requires body values that saved identity cannot supply",
          },
          {
            valid: Arr.every(identitySchemas, Equal.equals(true)),
            reason: `identity parameters ${Arr.join(
              Arr.map(bound, (parameter) => parameter.name),
              ", ",
            )} must declare string schemas`,
          },
          {
            valid: identityComplete,
            reason: "the operation does not accept every saved identity output",
          },
          {
            valid: Arr.isReadonlyArrayEmpty(parameterBindings.unbound),
            reason: parameterReason,
          },
          {
            valid: Arr.isReadonlyArrayEmpty(parameterBindings.unsupported),
            reason: parameterReason,
          },
          {
            valid: Predicate.Struct({ ambiguous: Equal.equals(false) })(
              parameterBindings,
            ),
            reason: parameterReason,
          },
        ];

        const violation = Arr.findFirst(
          checks,
          Predicate.Struct({ valid: Equal.equals(false) }),
        );
        yield* Effect.forEach(Option.toArray(violation), ({ reason }) =>
          Effect.fail(
            new ResourceSourceInvalid({
              typeName: resource.typeName,
              operationId: operation.operationId,
              message: `Saved output bindings do not satisfy ${action} operation ${operation.operationId}: ${reason}`,
            }),
          ),
        );
        yield* resolveOperation(
          catalog,
          resource.typeName,
          operation.operationId,
          resource.schemaPath,
          graph,
        ).pipe(Effect.when(Effect.succeed(action === "update")));

        const binding: typeof ResourceRemovalBinding.Type = Option.match(
          Option.fromUndefinedOr(values),
          {
            onNone: () => ({ operationId: operation.operationId, parameters }),
            onSome: (values) => ({
              operationId: operation.operationId,
              parameters,
              values,
            }),
          },
        );
        return binding;
      });

      /**
       * The selectReadCandidates helper checks collection paths and parent
       * identities before response resolution. A candidate retains its single item
       * parameter, so later binding never searches the operation's parameters again.
       */
      const selectReadCandidates = (
        catalog: OperationCatalog,
        create: ClientOperation,
        parents: ReadonlyArray<typeof OperationParameter.Type>,
        hint: OpenApiResourceHint = {},
      ) => {
        const parameterEquivalence = Equivalence.mapInput(
          Equivalence.Struct({
            name: Equivalence.String,
            location: Equivalence.String,
          }),
          (parameter: typeof OperationParameter.Type) => ({
            name: parameter.name,
            location: parameter.location,
          }),
        );

        const selectedOperation = Option.fromUndefinedOr(hint.readOperation);
        const reads = Arr.filter(
          catalog.operations,
          Predicate.Struct({ method: Equal.equals("GET") }),
        );

        const selectedReads = Arr.filter(reads, (operation) =>
          Option.match(selectedOperation, {
            onNone: () => true,
            onSome: (selected) => selected === operation.operationId,
          }),
        );

        const candidates: ReadonlyArray<OpenApiResourceReadCandidate> =
          Arr.flatMap(selectedReads, (operation) => {
            const required = Arr.filter(
              operation.parameters,
              Predicate.Struct({ required: Equal.equals(true) }),
            );

            const itemParameters = Arr.differenceWith(parameterEquivalence)(
              required,
              parents,
            );

            const missingParents = Arr.differenceWith(parameterEquivalence)(
              parents,
              required,
            );

            const parameter = Arr.head(itemParameters).pipe(
              Option.filter(() => itemParameters.length === 1),
            );

            return parameter.pipe(
              Option.filter(
                Predicate.Struct({ location: Equal.equals("path") }),
              ),
              Option.filter(
                (parameter) =>
                  operation.path === `${create.path}/{${parameter.name}}`,
              ),
              Option.filter(() => Arr.isReadonlyArrayEmpty(missingParents)),
              Option.filter(() => operation.requestBody?.required !== true),
              Option.map((parameter) => ({ operation, parameter })),
              Option.toArray,
            );
          });

        return candidates;
      };

      /**
       * The readCollectionPaths helper derives collection paths from required
       * item parameters in a GET operation. Creation discovery uses those paths when
       * the provider supplies neither a creation name nor a summary.
       */
      const readCollectionPaths = (operation: ClientOperation) => {
        const parameters = Arr.filter(
          readIdentityParameters(operation),
          Predicate.Struct({ location: Equal.equals("path") }),
        );

        const paths: ReadonlyArray<string> = Arr.flatMap(
          parameters,
          (parameter) => {
            const suffix = `/{${parameter.name}}`;

            return Option.some(operation.path).pipe(
              Option.filter(Str.endsWith(suffix)),
              Option.map((path) =>
                Str.substring(0, path.length - suffix.length)(path),
              ),
              Option.toArray,
            );
          },
        );

        return paths;
      };

      /**
       * The selectCreationOperations helper identifies POST creation from
       * provider names and summaries. A missing summary allows a compatible GET item
       * path to establish that a POST operation creates a collection member.
       */
      const selectCreationOperations = (catalog: OperationCatalog) => {
        const reads = Arr.filter(
          catalog.operations,
          Predicate.Struct({ method: Equal.equals("GET") }),
        );

        const collectionPaths = HashSet.fromIterable(
          Arr.flatMap(reads, readCollectionPaths),
        );
        const posts = Arr.filter(
          catalog.operations,
          Predicate.Struct({ method: Equal.equals("POST") }),
        );

        const creates: ReadonlyArray<ClientOperation> = Arr.filter(
          posts,
          (operation) => {
            const declaration =
              catalog.document.paths[operation.path]?.[
                Str.toLowerCase(operation.method)
              ];

            const summary = Schema.decodeUnknownOption(Schema.JsonObject)(
              declaration,
            ).pipe(
              Option.flatMap((declaration) =>
                Schema.decodeUnknownOption(Schema.String)(declaration.summary),
              ),
            );

            return Predicate.or(
              (operation: ClientOperation) =>
                Str.startsWith("Create")(operation.operationId),
              (operation) =>
                Option.match(summary, {
                  onNone: () => HashSet.has(collectionPaths, operation.path),
                  onSome: (summary) => Str.startsWith("Create ")(summary),
                }),
            )(operation);
          },
        );

        return creates;
      };

      /**
       * The discoverCreationResources helper selects the provider models
       * returned by one creation operation. Reviewed response hints can select a
       * specific inherited model, and unnamed responses retain their operation roots.
       */
      const discoverCreationResources = Effect.fn(
        "OpenApiResourceBindings.discoverCreationResources",
      )(function* (
        source: OpenApiResourceGraph,
        create: ClientOperation,
        hints: OpenApiResourceHints = {},
      ) {
        const response = yield* resourceSchemas.readOperationSchemas(
          source,
          create.operationId,
          "responses",
        );
        const inherited = yield* resourceSchemas.readOperationSchemas(
          source,
          create.operationId,
        );
        const selectedHints = Record.filter(hints, (hint) =>
          Option.match(Option.fromUndefinedOr(hint.createOperation), {
            onNone: () => true,
            onSome: (operationId) => operationId === create.operationId,
          }),
        );

        const selectedPaths = HashSet.fromIterable(
          Arr.flatMap(Record.values(selectedHints), (hint) =>
            Option.toArray(Option.fromUndefinedOr(hint.responseSchema)),
          ),
        );

        const selectedSchemas = Arr.filter(inherited.resources, (node) =>
          HashSet.has(selectedPaths, node.path),
        );
        const models = Arr.appendAll(response.resources, selectedSchemas);

        const named = Arr.dedupeWith(
          models,
          Equivalence.mapInput(
            Equivalence.String,
            (node: OpenApiSchemaNode) => node.path,
          ),
        );
        const rootPaths = HashSet.fromIterable(
          Arr.map(response.responseRoots, (root) => root.path),
        );
        const selected = Arr.match(named, {
          onEmpty: () =>
            Arr.filter(response.responses, (node) =>
              HashSet.has(rootPaths, node.path),
            ),
          onNonEmpty: (models) => models,
        });

        const resources: ReadonlyArray<OpenApiDiscoveredResource> = Arr.map(
          selected,
          (node) => describeCreation(create, node, response.input),
        );

        return resources;
      });

      /**
       * The describeCreation helper preserves the provider model name and its
       * request and response locations before executable binding selection. An
       * unnamed operation response uses the operation identifier as its model name.
       */
      const describeCreation = (
        create: ClientOperation,
        node: OpenApiSchemaNode,
        input: Option.Option<OpenApiOperationRoot>,
      ) => {
        const declared = Schema.decodeUnknownOption(Schema.JsonObject)(
          node.schema,
        ).pipe(
          Option.flatMap((schema) =>
            Schema.decodeUnknownOption(Schema.String)(schema["x-resourceId"]),
          ),
        );

        const component = Option.some(node.path).pipe(
          Option.filter(Str.startsWith("#/components/schemas/")),
          Option.map((path) =>
            JsonPointer.unescapeToken(
              Str.substring("#/components/schemas/".length)(path),
            ),
          ),
        );

        const name = declared.pipe(
          Option.orElse(() => component),
          Option.getOrElse(() => create.operationId),
        );

        const resource: OpenApiDiscoveredResource = {
          name,
          schemaPath: node.path,
          createOperation: create.operationId,
          inputSchemaPath: input.pipe(
            Option.map((root) => root.path),
            Option.getOrNull,
          ),
        };

        return resource;
      };

      /**
       * The resolveParameterBindings helper checks saved-output parameter
       * names against required request parameters and their supported locations.
       * Read and mutation validation share this result before schema compatibility.
       */
      const resolveParameterBindings = (
        operation: ClientOperation,
        parameters: Readonly<Record<string, string>>,
      ) => {
        const required = Arr.filter(
          operation.parameters,
          Predicate.Struct({ required: Equal.equals(true) }),
        );

        const unbound = Arr.filter(
          required,
          Predicate.not((parameter: typeof OperationParameter.Type) =>
            Record.has(parameters, parameter.name),
          ),
        );

        const bound = Arr.filter(operation.parameters, (parameter) =>
          Record.has(parameters, parameter.name),
        );
        const unsupported = Arr.filter(
          bound,
          Predicate.not(
            Predicate.Struct({
              location: Predicate.or(
                Equal.equals("path"),
                Equal.equals("query"),
              ),
            }),
          ),
        );

        const names = HashSet.fromIterable(
          Arr.map(bound, (parameter) => parameter.name),
        );

        const bindings: OpenApiParameterBindings = {
          bound,
          unbound,
          unsupported,
          ambiguous: HashSet.size(names) !== bound.length,
        };

        return bindings;
      };

      /**
       * The validateOutputTypes helper verifies that saved outputs can supply
       * the selected read parameters. Both sides resolve through their original
       * provider schema before their declared types are compared.
       */
      const validateOutputTypes = Effect.fn(
        "OpenApiResourceBindings.validateOutputTypes",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        typeName: string,
        selection: OpenApiResourceSelection,
        create: ClientOperation,
        read: ClientOperation,
      ) {
        const bindings = selection.operations.read.parameters;
        const outputProperties = yield* resourceSchemas.readProperties(
          graph,
          selection.schema,
        );
        yield* Effect.forEach(
          Record.toEntries(bindings),
          ([name, outputName]) =>
            Effect.gen(function* () {
              const parameter = yield* Arr.findFirst(
                read.parameters,
                (parameter) => parameter.name === name,
              ).pipe(Effect.fromOption);

              const parameterContract = yield* Schema.decodeUnknownEffect(
                Schema.JsonObject,
              )(parameter.schema).pipe(
                Effect.mapError(
                  () =>
                    new ResourceSourceInvalid({
                      typeName,
                      message: `Read parameter ${name} requires a supported schema`,
                    }),
                ),
              );

              const inputSchema = yield* operations.resolveOpenApiObject(
                catalog.document,
                parameterContract,
              );

              const property = yield* Option.match(
                Record.get(selection.inputOutputs ?? {}, outputName),
                {
                  onNone: () =>
                    Arr.findFirst(
                      outputProperties,
                      (property) =>
                        property.name === selection.outputs[outputName],
                    ).pipe(Effect.fromOption),
                  onSome: (name) =>
                    Arr.findFirst(
                      create.parameters,
                      (parameter) => parameter.name === name,
                    ).pipe(Effect.fromOption),
                },
              );

              const outputContract = yield* Schema.decodeUnknownEffect(
                Schema.JsonObject,
              )(property.schema);
              const outputSchema = yield* operations.resolveOpenApiObject(
                catalog.document,
                outputContract,
              );
              yield* Effect.fail(
                new ResourceSourceInvalid({
                  typeName,
                  message: `Output ${outputName} has an incompatible type for read parameter ${name} in ${read.operationId}`,
                }),
              ).pipe(
                Effect.when(
                  Effect.succeed(
                    Option.fromUndefinedOr(inputSchema.type).pipe(
                      Option.exists((type) => type !== outputSchema.type),
                    ),
                  ),
                ),
              );
            }),
        );
      });

      /**
       * The validateMutationBinding helper checks one configured mutation
       * against the operation's actual saved-identity mapping and fixed values.
       * Mismatched metadata fails before generated resources can invoke the provider.
       */
      const validateMutationBinding = Effect.fn(
        "OpenApiResourceBindings.validateMutationBinding",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        typeName: string,
        selection: OpenApiResourceSelection,
        action: "update" | "remove",
        selected: typeof ResourceRemovalBinding.Type,
      ) {
        const resolved = yield* resolveMutationBinding(
          catalog,
          graph,
          {
            typeName,
            schemaPath: selection.schema,
            operations: selection.operations,
          },
          action,
          selected.operationId,
          Match.value(action).pipe(
            Match.when("remove", () => selection.operations.remove?.values),
            Match.orElse(() => undefined),
          ),
        );

        yield* Effect.fail(
          new ResourceSourceInvalid({
            typeName,
            operationId: selected.operationId,
            message: `Saved identity parameters do not match ${action} operation ${selected.operationId}`,
          }),
        ).pipe(
          Effect.when(
            Effect.succeed(
              Predicate.not((binding: typeof ResourceRemovalBinding.Type) =>
                Schema.toEquivalence(ResourceRemovalBinding)(selected, binding),
              )(resolved),
            ),
          ),
        );

        const binding: typeof ResourceRemovalBinding.Type = resolved;

        return binding;
      });

      return {
        discoverResources,
        resolveReadBinding,
        resolveOperations,
        validateOperations,
        selectOutputs,
        resolveRelationships,
        readIdentityParameters,
      };
    }),
  },
) {}

/**
 * The openApiResourceBindingsLayer Layer requires OperationCatalogs and
 * OpenApiResourceSchemas from the generation graph. Callers can compose this
 * Layer with their own implementations of those services.
 */
export const openApiResourceBindingsLayer = Layer.effect(
  OpenApiResourceBindings,
  OpenApiResourceBindings.make,
);
