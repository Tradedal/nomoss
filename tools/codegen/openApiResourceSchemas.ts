import {
  Array as Arr,
  Context,
  Effect,
  Equal,
  Equivalence,
  Graph,
  HashMap,
  HashSet,
  JsonPatch,
  JsonPointer,
  Layer,
  Match,
  Option,
  Order,
  Predicate,
  Record,
  Schema,
  String as Str,
  Stream,
  Struct,
  Tuple,
} from "effect";
import {
  OpenApiSpecification,
  type OperationCatalog,
} from "./catalogSchemas.js";
import { OperationCatalogs } from "./operationCatalogs.js";
import {
  type ClientOperation,
  OperationJsonSchema,
} from "./operationSchemas.js";
import type {
  OpenApiDiscoveredProperty,
  OpenApiOperationRoot,
  OpenApiOperationSchemas,
  OpenApiPropertyLink,
  OpenApiPropertyQuery,
  OpenApiPropertyResolution,
  OpenApiRequiredProperties,
  OpenApiResourceGraph,
  OpenApiSchemaChild,
  OpenApiSchemaConnection,
  OpenApiSchemaEdge,
  OpenApiSchemaLevel,
  OpenApiSchemaNode,
  OpenApiSchemaReference,
  OpenApiSchemaRequirementRule,
  OpenApiSchemaTraversal,
} from "./resourceDiscoverySchemas.js";
import { ResourceSourceInvalid } from "./resourceErrors.js";

/**
 * The OpenApiResourceSchemas service retains provider source locations while
 * resolving references, properties, identities, and expansion targets. Callers
 * can reuse the graph for discovery and compilation, including recursive
 * schemas and nullable constraints.
 */
export class OpenApiResourceSchemas extends Context.Service<OpenApiResourceSchemas>()(
  "nomoss/tools/codegen/openApiResourceSchemas",
  {
    make: Effect.gen(function* () {
      const operations = yield* OperationCatalogs;

      /**
       * The buildGraph service method rejects missing references
       * before discovery begins. Component schemas and operation schemas retain
       * their source locations, and recursive references remain graph edges.
       */
      const buildGraph = Effect.fn("OpenApiResourceSchemas.buildGraph")(
        function* (catalog: OperationCatalog) {
          const operationRoots = yield* Effect.forEach(
            catalog.operations,
            (operation) => readOperationRoots(catalog, operation),
          );

          const roots: ReadonlyArray<OpenApiOperationRoot> =
            Arr.flatten(operationRoots);
          const operationNodes = Arr.flatMap(roots, (root) => {
            const operation = Arr.findFirst(
              catalog.operations,
              (entry) => entry.operationId === root.operationId,
            );
            return operation.pipe(
              Option.flatMap((entry) =>
                Option.fromUndefinedOr(
                  {
                    input: entry.requestBody?.content[root.mediaType]?.schema,
                    output:
                      entry.responses[root.status]?.content?.[root.mediaType]
                        ?.schema,
                  }[root.direction],
                ),
              ),
              Option.map((schema) => ({ path: root.path, schema })),
              Option.toArray,
            );
          });

          const initial: ReadonlyArray<OpenApiSchemaNode> = Arr.dedupeWith(
            [
              ...Arr.map(
                Record.toEntries(catalog.document.components.schemas),
                ([name, schema]) => ({
                  path: `#/components/schemas/${JsonPointer.escapeToken(name)}`,
                  schema,
                }),
              ),
              ...operationNodes,
            ],
            (left, right) => left.path === right.path,
          );

          const levels = yield* Stream.paginate(initial, (frontier) =>
            expandSchemaLevel(frontier),
          ).pipe(Stream.runCollect);
          const nodes = Arr.flatMap(levels, (level) => level.nodes);
          const indices = new Map(
            Arr.map(nodes, (node, index) => Tuple.make(node.path, index)),
          );
          const references = Arr.flatMap(nodes, readSchemaReferences);
          const connections = [
            ...Arr.flatMap(levels, (level) =>
              Arr.map(level.children, (child) => ({
                source: child.parent,
                target: child.node.path,
                data: child.edge,
              })),
            ),
            ...references,
          ];

          const edges = yield* Effect.forEach(connections, (edge, index) =>
            Effect.gen(function* () {
              const source = yield* Effect.fromOption(
                Option.fromUndefinedOr(indices.get(edge.source)),
              );
              const target = yield* Effect.fromOption(
                Option.fromUndefinedOr(indices.get(edge.target)),
              ).pipe(
                Effect.mapError(
                  () =>
                    new ResourceSourceInvalid({
                      typeName: catalog.source.name,
                      message: `Unresolved schema reference ${edge.target} from ${edge.source}`,
                    }),
                ),
              );
              return { index, source, target, data: edge.data };
            }),
          );

          const result: OpenApiResourceGraph = {
            graph: Graph.fromSnapshot({
              type: "directed",
              nodes: Arr.map(nodes, (data, index) => ({ index, data })),
              edges,
            }),
            indices,
            roots: Arr.filter(roots, (root) => indices.has(root.path)),
          };
          return result;
        },
      );

      /**
       * The normalizeNullability service method prepares OpenAPI 3.0 nullable
       * constraints for Effect compilation. Structural children are normalized
       * before their parents, and references retain the links between provider
       * models.
       */
      const normalizeNullability = Effect.fn(
        "OpenApiResourceSchemas.normalizeNullability",
      )(function* (catalog: OperationCatalog, graph: OpenApiResourceGraph) {
        const nodes = Arr.sort(
          Arr.flatMap(Arr.fromIterable(graph.indices.values()), (index) =>
            Graph.getNode(graph.graph, index).pipe(Option.toArray),
          ),
          Order.mapInput(
            Order.flip(Order.Number),
            (node: OpenApiSchemaNode) => node.path.length,
          ),
        );

        const normalized = yield* Effect.reduce(
          nodes,
          () => HashMap.empty<string, OpenApiSchemaNode["schema"]>(),
          (normalized, node) =>
            normalizeSchema(catalog, graph, node, normalized),
        );

        const roots = Arr.dedupe([
          ...Arr.map(
            Record.keys(catalog.document.components.schemas),
            (name) => `#/components/schemas/${JsonPointer.escapeToken(name)}`,
          ),
          ...Arr.map(graph.roots, (root) => root.path),
        ]);

        const patches = yield* Effect.forEach(roots, (path) =>
          HashMap.get(normalized, path).pipe(
            Effect.fromOption,
            Effect.flatMap((schema) =>
              Option.fromUndefinedOr(JsonPointer.parseUriFragment(path)).pipe(
                Effect.fromOption,
                Effect.map((tokens) => {
                  const pointer = Match.value(tokens.length).pipe(
                    Match.when(0, () => ""),
                    Match.orElse(
                      () =>
                        `/${Arr.join(Arr.map(tokens, JsonPointer.escapeToken), "/")}`,
                    ),
                  );

                  const patch: JsonPatch.JsonPatchOperation = {
                    op: "replace",
                    path: pointer,
                    value: schema,
                  };
                  return patch;
                }),
              ),
            ),
          ),
        );

        const patched = yield* Effect.try(() =>
          JsonPatch.apply(patches, catalog.document),
        );
        const document: OpenApiSpecification =
          yield* Schema.decodeUnknownEffect(OpenApiSpecification)(patched);
        return document;
      });

      /**
       * The resolveSchemas service method follows references and alternatives with
       * cycle detection. Response traversal retains each named resource model as a
       * single result before its inherited definitions can introduce extra models.
       */
      const resolveSchemas = Effect.fn("OpenApiResourceSchemas.resolveSchemas")(
        function* (
          source: OpenApiResourceGraph,
          path: string,
          scope: "properties" | "responses" = "properties",
        ) {
          const index = yield* Option.fromUndefinedOr(
            source.indices.get(path),
          ).pipe(
            Effect.fromOption(
              () =>
                new ResourceSourceInvalid({
                  typeName: path,
                  message: `Schema ${path} is absent from the graph`,
                }),
            ),
          );

          const node = yield* Graph.getNode(source.graph, index).pipe(
            Effect.fromOption,
          );
          const initial: OpenApiSchemaTraversal = {
            pending: [node],
            visited: HashSet.empty(),
          };

          const schemas: ReadonlyArray<OpenApiSchemaNode> =
            yield* Stream.paginate(initial, (state) =>
              resolveSchemaLevel(source, state, scope),
            ).pipe(Stream.runCollect);

          return schemas;
        },
      );

      /**
       * The readOperationSchemas service method returns successful response schemas
       * with their named resource models and source locations. Response scope stops
       * at resource models, while property scope follows their inherited definitions.
       * The input location remains available for creation binding.
       */
      const readOperationSchemas = Effect.fn(
        "OpenApiResourceSchemas.readOperationSchemas",
      )(function* (
        source: OpenApiResourceGraph,
        operationId: string,
        scope: "responses" | "properties" = "properties",
      ) {
        const roots = Arr.filter(
          source.roots,
          Predicate.Struct({ operationId: Equal.equals(operationId) }),
        );
        const input = Arr.findFirst(
          roots,
          Predicate.Struct({ direction: Equal.equals("input") }),
        );
        const responseRoots = Arr.filter(
          roots,
          Predicate.Struct({
            direction: Equal.equals("output"),
            status: (status: string) => Str.startsWith("2")(status),
          }),
        );
        const resolved = yield* Effect.forEach(responseRoots, (root) =>
          resolveSchemas(source, root.path, scope),
        );
        const responses = Arr.flatten(resolved);
        const resources = Arr.filter(responses, isResourceModel);

        const operation: OpenApiOperationSchemas = {
          input,
          responseRoots,
          responses,
          resources,
        };

        return operation;
      });

      /**
       * The readProperties service method returns fields with their original source
       * locations and required status across references and alternatives. Array
       * elements use the path segment "*" for nested relationship inputs.
       */
      const readProperties = Effect.fn("OpenApiResourceSchemas.readProperties")(
        function* (source: OpenApiResourceGraph, path: string) {
          const schemas = yield* resolveSchemas(source, path);
          const required = yield* readRequiredProperties(source, path);
          const connections = yield* Effect.forEach(schemas, (node) =>
            readConnections(source, node.path, ["property", "items"]),
          ).pipe(Effect.map(Arr.flatten));

          const properties: ReadonlyArray<OpenApiDiscoveredProperty> = Arr.map(
            connections,
            ({ edge, target }) => ({
              name: edge.name,
              schemaPath: target.path,
              schema: target.schema,
              required: Arr.contains(required, edge.name),
            }),
          );

          return properties;
        },
      );

      /**
       * The readIdentity service method selects the required string id used
       * by resource reads and relationship targets. Schema aliases preserve the
       * original field location, and multiple identity definitions fail as
       * ambiguous.
       */
      const readIdentity = Effect.fn("OpenApiResourceSchemas.readIdentity")(
        function* (
          catalog: OperationCatalog,
          source: OpenApiResourceGraph,
          path: string,
        ) {
          const properties = yield* readProperties(source, path);
          const candidates = yield* Effect.forEach(
            Arr.filter(
              properties,
              Predicate.Struct({
                name: Equal.equals("id"),
                required: Equal.equals(true),
              }),
            ),
            (property) =>
              Schema.decodeUnknownEffect(Schema.JsonObject)(
                property.schema,
              ).pipe(
                Effect.flatMap((schema) =>
                  operations.resolveOpenApiObject(catalog.document, schema),
                ),
                Effect.map((schema) =>
                  Option.some(property).pipe(
                    Option.filter(() => schema.type === "string"),
                  ),
                ),
              ),
          );

          const identities = Arr.getSomes(candidates);
          yield* Effect.fail(
            new ResourceSourceInvalid({
              typeName: path,
              message: `Resource ${path} has multiple identity field definitions; output projection requires a single source field`,
            }),
          ).pipe(Effect.when(Effect.succeed(identities.length > 1)));

          const identity: Option.Option<OpenApiDiscoveredProperty> =
            Arr.head(identities);
          return identity;
        },
      );

      /**
       * The linkProperties service method resolves resource references at matching
       * request and response paths. Recursive pairs are visited once per ancestry
       * path so nested arrays and alternatives retain their distinct relationships.
       */
      const linkProperties = Effect.fn("OpenApiResourceSchemas.linkProperties")(
        function* (
          source: OpenApiResourceGraph,
          input: string,
          output: string,
        ) {
          const initial: OpenApiPropertyQuery = {
            input,
            output,
            path: [],
            ancestors: HashSet.empty(),
          };

          const pending: ReadonlyArray<OpenApiPropertyQuery> = [initial];
          const links: ReadonlyArray<OpenApiPropertyLink> =
            yield* Stream.paginate(pending, (queries) =>
              expandPropertyLinks(source, queries),
            ).pipe(Stream.runCollect);

          return links;
        },
      );

      /**
       * The readRequiredProperties helper resolves recursive requirements
       * through set union for inheritance and intersection for alternatives.
       * Propagation finishes when every schema's required-property set is stable.
       */
      const readRequiredProperties = Effect.fn(
        "OpenApiResourceSchemas.readRequiredProperties",
      )(function* (source: OpenApiResourceGraph, path: string) {
        const nodes = yield* resolveSchemas(source, path);
        const entries = yield* Effect.forEach(nodes, (node) =>
          readRequirementRule(source, node).pipe(
            Effect.map((rule) => Tuple.make(node.path, rule)),
          ),
        );

        const rules = HashMap.fromIterable(entries);
        const declared = HashMap.map(rules, (rule) => rule.declared);

        const resolved = yield* Stream.paginate(declared, (current) =>
          resolveRequirements(rules, current).pipe(
            Effect.map((next) =>
              Tuple.make(
                [next],
                Option.some(next).pipe(
                  Option.filter(Predicate.not(Equal.equals(current))),
                ),
              ),
            ),
          ),
        ).pipe(Stream.runLast, Effect.flatMap(Effect.fromOption));

        const properties = yield* HashMap.get(resolved, path).pipe(
          Effect.fromOption,
        );
        const required: ReadonlyArray<string> = Arr.fromIterable(properties);

        return required;
      });

      /**
       * The linkProperty helper identifies expansion targets for a
       * string input at a corresponding response property. Its result retains every
       * target, including deleted resource alternatives, for relationship selection.
       */
      const linkProperty = Effect.fn("OpenApiResourceSchemas.linkProperty")(
        function* (
          source: OpenApiResourceGraph,
          input: string,
          output: string,
          propertyPath: ReadonlyArray<string>,
        ) {
          const inputSchemas = yield* resolveSchemas(source, input);
          const acceptsString = Arr.some(inputSchemas, (node) =>
            Schema.decodeUnknownOption(Schema.JsonObject)(node.schema).pipe(
              Option.exists(
                Predicate.and(
                  (schema: Schema.JsonObject) => schema.type === "string",
                  (schema) => schema.enum === undefined,
                ),
              ),
            ),
          );

          const outputSchemas = yield* resolveSchemas(source, output);
          const expansions = yield* Effect.forEach(outputSchemas, (node) =>
            readConnections(source, node.path, ["expansion"]),
          ).pipe(Effect.map(Arr.flatten));
          const targetSchemas = Arr.dedupe(
            Arr.map(expansions, (connection) => connection.target.path),
          );
          const result: ReadonlyArray<OpenApiPropertyLink> = Option.some({
            propertyPath,
            inputSchemaPath: input,
            responseSchemaPath: output,
            targetSchemas,
          }).pipe(
            Option.filter(() => acceptsString),
            Option.filter(() => Arr.isReadonlyArrayNonEmpty(targetSchemas)),
            Option.toArray,
          );
          return result;
        },
      );

      /**
       * The readConnections helper resolves outgoing schema relationships
       * while retaining their edge kind and target source location. Missing graph
       * entries fail before consumers receive an incomplete connection.
       */
      const readConnections = Effect.fn(
        "OpenApiResourceSchemas.readConnections",
      )(function* (
        source: OpenApiResourceGraph,
        path: string,
        kinds: ReadonlyArray<OpenApiSchemaEdge["kind"]>,
      ) {
        const index = yield* Option.fromUndefinedOr(
          source.indices.get(path),
        ).pipe(Effect.fromOption);
        const outgoing = yield* Effect.forEach(
          Graph.outgoingEdges(source.graph, index),
          (edge) => Graph.getEdge(source.graph, edge).pipe(Effect.fromOption),
        );

        const selected = Arr.filter(outgoing, (edge) =>
          Arr.contains(kinds, edge.data.kind),
        );

        const connections: ReadonlyArray<OpenApiSchemaConnection> =
          yield* Effect.forEach(selected, (edge) =>
            Graph.getNode(source.graph, edge.target).pipe(
              Effect.fromOption,
              Effect.map((target) => ({ edge: edge.data, target })),
            ),
          );

        return connections;
      });

      /**
       * The readRequirementRule helper distinguishes directly declared
       * properties, inherited requirements, and requirements shared by alternative
       * branches. Each dependency retains its source path for recursive propagation.
       */
      const readRequirementRule = Effect.fn(
        "OpenApiResourceSchemas.readRequirementRule",
      )(function* (source: OpenApiResourceGraph, node: OpenApiSchemaNode) {
        const declared = Schema.decodeUnknownOption(Schema.JsonObject)(
          node.schema,
        ).pipe(
          Option.flatMap((schema) =>
            Schema.decodeUnknownOption(Schema.Array(Schema.String))(
              schema.required,
            ),
          ),
          Option.getOrElse(() => []),
          HashSet.fromIterable,
        );

        const connections = yield* readConnections(source, node.path, [
          "reference",
          "alternative",
        ]);

        const inheritedConnections = Arr.filter(
          connections,
          Predicate.or(
            ({ edge }) => edge.kind === "reference",
            ({ edge }) => edge.name === "allOf",
          ),
        );

        const inherited = Arr.map(
          inheritedConnections,
          (connection) => connection.target.path,
        );

        const branches = Arr.groupBy(
          connections,
          (connection) => connection.edge.name,
        );

        const alternatives = Arr.map(["anyOf", "oneOf"], (keyword) =>
          Arr.map(
            branches[keyword] ?? [],
            (connection) => connection.target.path,
          ),
        );

        const rule: OpenApiSchemaRequirementRule = {
          declared,
          inherited,
          alternatives,
        };

        return rule;
      });

      /**
       * The evaluateRequiredProperties helper applies one schema's rule to
       * the current required-property sets. Missing dependencies fail because an
       * unknown requirement could weaken the resulting output contract.
       */
      const evaluateRequiredProperties = Effect.fn(
        "OpenApiResourceSchemas.evaluateRequiredProperties",
      )(function* (
        rule: OpenApiSchemaRequirementRule,
        requirements: OpenApiRequiredProperties,
      ) {
        const inherited = yield* Effect.forEach(rule.inherited, (path) =>
          HashMap.get(requirements, path).pipe(Effect.fromOption),
        );
        const alternatives = yield* Effect.forEach(rule.alternatives, (paths) =>
          Effect.forEach(paths, (path) =>
            HashMap.get(requirements, path).pipe(Effect.fromOption),
          ).pipe(
            Effect.map((branches) =>
              Arr.matchLeft(branches, {
                onEmpty: HashSet.empty<string>,
                onNonEmpty: (first, remaining) =>
                  Arr.reduce(remaining, first, (required, properties) =>
                    HashSet.intersection(required, properties),
                  ),
              }),
            ),
          ),
        );

        const required: HashSet.HashSet<string> = Arr.reduce(
          Arr.appendAll(inherited, alternatives),
          rule.declared,
          (required, properties) => HashSet.union(required, properties),
        );

        return required;
      });

      /**
       * The resolveRequirements helper advances every schema's requirements
       * from the same current map. Native set equality lets the caller detect when
       * recursive references have reached a stable result.
       */
      const resolveRequirements = Effect.fn(
        "OpenApiResourceSchemas.resolveRequirements",
      )(function* (
        rules: HashMap.HashMap<string, OpenApiSchemaRequirementRule>,
        requirements: OpenApiRequiredProperties,
      ) {
        const entries = yield* Effect.forEach(
          Arr.fromIterable(rules),
          ([path, rule]) =>
            evaluateRequiredProperties(rule, requirements).pipe(
              Effect.map((required) => Tuple.make(path, required)),
            ),
        );

        const resolved: OpenApiRequiredProperties =
          HashMap.fromIterable(entries);

        return resolved;
      });

      /**
       * The readOperationRoots helper resolves request and response schema
       * locations for one operation, including referenced request bodies and responses.
       */
      const readOperationRoots = Effect.fn(
        "OpenApiResourceSchemas.readOperationRoots",
      )(function* (catalog: OperationCatalog, operation: ClientOperation) {
        const pathItem = yield* operations.resolveOpenApiObjectLocation(
          catalog.document,
          {
            path: JsonPointer.formatUriFragment(["paths", operation.path]),
            object: catalog.document.paths[operation.path],
          },
        );

        const declaration = yield* Schema.decodeUnknownEffect(
          Schema.JsonObject,
        )(pathItem.object[Str.toLowerCase(operation.method)]);

        const body = yield* Option.fromUndefinedOr(
          declaration.requestBody,
        ).pipe(
          Option.map((body) =>
            Schema.decodeUnknownEffect(Schema.JsonObject)(body).pipe(
              Effect.flatMap((object) =>
                operations.resolveOpenApiObjectLocation(catalog.document, {
                  path: `${pathItem.path}/${Str.toLowerCase(operation.method)}/requestBody`,
                  object,
                }),
              ),
            ),
          ),
          Effect.transposeOption,
        );

        const inputs: ReadonlyArray<OpenApiOperationRoot> = Arr.flatMap(
          Option.toArray(body),
          (body) =>
            Arr.map(
              Record.toEntries(operation.requestBody?.content ?? {}),
              ([mediaType]) => ({
                operationId: operation.operationId,
                direction: "input",
                status: "",
                mediaType,
                path: `${body.path}/content/${JsonPointer.escapeToken(mediaType)}/schema`,
              }),
            ),
        );

        const responseDeclarations = yield* Schema.decodeUnknownEffect(
          Schema.JsonObject,
        )(declaration.responses);

        const responseRoots = yield* Effect.forEach(
          Record.toEntries(operation.responses),
          ([status, response]) =>
            Schema.decodeUnknownEffect(Schema.JsonObject)(
              responseDeclarations[status],
            ).pipe(
              Effect.flatMap((object) =>
                operations.resolveOpenApiObjectLocation(catalog.document, {
                  path: `${pathItem.path}/${Str.toLowerCase(operation.method)}/responses/${status}`,
                  object,
                }),
              ),
              Effect.map((location) =>
                Arr.map(
                  Record.toEntries(response.content ?? {}),
                  ([mediaType]): OpenApiOperationRoot => ({
                    operationId: operation.operationId,
                    direction: "output",
                    status,
                    mediaType,
                    path: `${location.path}/content/${JsonPointer.escapeToken(mediaType)}/schema`,
                  }),
                ),
              ),
            ),
        );

        const roots: ReadonlyArray<OpenApiOperationRoot> = [
          ...inputs,
          ...Arr.flatten(responseRoots),
        ];

        return roots;
      });

      /**
       * The readSchemaChildren helper enumerates structural child definitions
       * with their original paths. References remain separate relationships.
       */
      const readSchemaChildren = (
        node: OpenApiSchemaNode,
      ): ReadonlyArray<OpenApiSchemaChild> => {
        const schema: Schema.JsonObject = Schema.decodeUnknownOption(
          Schema.JsonObject,
        )(node.schema).pipe(Option.getOrElse(() => ({})));

        const properties = Schema.decodeUnknownOption(
          Schema.Record(Schema.String, OperationJsonSchema),
        )(schema.properties).pipe(Option.getOrElse(() => ({})));

        const fields = Arr.map(
          Record.toEntries(properties),
          ([name, schema]): OpenApiSchemaChild => ({
            parent: node.path,
            node: {
              path: `${node.path}/properties/${JsonPointer.escapeToken(name)}`,
              schema,
            },
            edge: {
              kind: "property",
              name,
            },
          }),
        );

        const alternatives = Arr.flatMap(
          ["anyOf", "oneOf", "allOf"],
          (keyword) =>
            Schema.decodeUnknownOption(Schema.Array(OperationJsonSchema))(
              schema[keyword],
            ).pipe(
              Option.map((members) =>
                Arr.map(
                  members,
                  (schema, index): OpenApiSchemaChild => ({
                    parent: node.path,
                    node: {
                      path: `${node.path}/${keyword}/${index}`,
                      schema,
                    },
                    edge: {
                      kind: "alternative",
                      name: keyword,
                    },
                  }),
                ),
              ),
              Option.getOrElse(() => []),
            ),
        );

        const items = Schema.decodeUnknownOption(OperationJsonSchema)(
          schema.items,
        ).pipe(
          Option.map(
            (schema): OpenApiSchemaChild => ({
              parent: node.path,
              node: { path: `${node.path}/items`, schema },
              edge: {
                kind: "items",
                name: "*",
              },
            }),
          ),
          Option.toArray,
        );

        const constraints = Arr.flatMap(
          ["additionalProperties", "not"],
          (keyword) =>
            Schema.decodeUnknownOption(OperationJsonSchema)(
              schema[keyword],
            ).pipe(
              Option.map(
                (schema): OpenApiSchemaChild => ({
                  parent: node.path,
                  node: { path: `${node.path}/${keyword}`, schema },
                  edge: {
                    kind: "schema",
                    name: keyword,
                  },
                }),
              ),
              Option.toArray,
            ),
        );

        return [...fields, ...alternatives, ...items, ...constraints];
      };

      /**
       * The readSchemaReferences helper retains local references and expansion
       * targets with their source paths so graph construction can validate every target.
       */
      const readSchemaReferences = (
        node: OpenApiSchemaNode,
      ): ReadonlyArray<OpenApiSchemaReference> => {
        const schema: Schema.JsonObject = Schema.decodeUnknownOption(
          Schema.JsonObject,
        )(node.schema).pipe(Option.getOrElse(() => ({})));

        const reference = Schema.decodeUnknownOption(Schema.String)(
          schema.$ref,
        ).pipe(
          Option.map(
            (target): OpenApiSchemaReference => ({
              source: node.path,
              target,
              data: {
                kind: "reference",
                name: "$ref",
              },
            }),
          ),
          Option.toArray,
        );

        const expansion: Schema.JsonObject = Schema.decodeUnknownOption(
          Schema.JsonObject,
        )(schema["x-expansionResources"]).pipe(Option.getOrElse(() => ({})));

        const alternatives = Schema.decodeUnknownOption(
          Schema.Array(Schema.JsonObject),
        )(expansion.oneOf).pipe(Option.getOrElse(() => []));

        const targets = Arr.flatMap(alternatives, (entry) =>
          Schema.decodeUnknownOption(Schema.String)(entry.$ref).pipe(
            Option.map(
              (target): OpenApiSchemaReference => ({
                source: node.path,
                target,
                data: {
                  kind: "expansion",
                  name: "x-expansionResources",
                },
              }),
            ),
            Option.toArray,
          ),
        );

        return [...reference, ...targets];
      };

      /**
       * The isResourceModel predicate identifies named provider models whose declared
       * properties or alternatives establish a resource type. Referenced aliases
       * continue through schema traversal before a resource model is selected.
       */
      const isResourceModel = Predicate.and(
        (node: OpenApiSchemaNode) =>
          /^#\/components\/schemas\/[^/]+$/.test(node.path),
        (node) =>
          Schema.decodeUnknownOption(Schema.JsonObject)(node.schema).pipe(
            Option.exists(
              Predicate.and(
                (schema: Schema.JsonObject) =>
                  !Predicate.hasProperty(schema, "$ref"),
                Predicate.some<Schema.JsonObject>([
                  (schema) => Predicate.hasProperty(schema, "properties"),
                  (schema) => Predicate.hasProperty(schema, "allOf"),
                  (schema) => Predicate.hasProperty(schema, "x-resourceId"),
                ]),
              ),
            ),
          ),
      );

      /**
       * The resolveSchemaLevel helper visits each schema once and follows
       * only reference and alternative edges. Response traversal stops at named
       * resource models; property traversal continues into their inherited schemas.
       */
      const resolveSchemaLevel = Effect.fn(
        "OpenApiResourceSchemas.resolveSchemaLevel",
      )(function* (
        source: OpenApiResourceGraph,
        state: OpenApiSchemaTraversal,
        scope: "properties" | "responses",
      ) {
        const current = Arr.filter(
          state.pending,
          (node) => !HashSet.has(state.visited, node.path),
        );

        const traversable = Match.value(scope).pipe(
          Match.when("properties", () => current),
          Match.orElse(() =>
            Arr.filter(current, Predicate.not(isResourceModel)),
          ),
        );

        const connections = yield* Effect.forEach(traversable, (node) =>
          readConnections(source, node.path, ["reference", "alternative"]),
        ).pipe(Effect.map(Arr.flatten));
        const pending = Arr.dedupeWith(
          Arr.map(connections, (connection) => connection.target),
          Equivalence.mapInput(
            Equivalence.String,
            (node: OpenApiSchemaNode) => node.path,
          ),
        );

        const visited = HashSet.union(
          state.visited,
          HashSet.fromIterable(Arr.map(current, (node) => node.path)),
        );

        const next: OpenApiSchemaTraversal = { pending, visited };
        const continuation = Option.some(next).pipe(
          Option.filter(() => Arr.isReadonlyArrayNonEmpty(pending)),
        );

        const level: readonly [
          ReadonlyArray<OpenApiSchemaNode>,
          Option.Option<OpenApiSchemaTraversal>,
        ] = Tuple.make(current, continuation);

        return level;
      });

      /**
       * The normalizeSchema helper incorporates already normalized structural
       * children before applying OpenAPI 3.0 nullability. References retain links to
       * their provider models and stay outside structural replacement.
       */
      const normalizeSchema = Effect.fn(
        "OpenApiResourceSchemas.normalizeSchema",
      )(function* (
        catalog: OperationCatalog,
        graph: OpenApiResourceGraph,
        node: OpenApiSchemaNode,
        normalized: HashMap.HashMap<string, OpenApiSchemaNode["schema"]>,
      ) {
        const connections = yield* readConnections(graph, node.path, [
          "property",
          "items",
          "alternative",
          "schema",
        ]);

        const children = Arr.map(
          connections,
          (connection) => connection.target,
        );

        const patches = yield* Effect.forEach(children, (child) =>
          HashMap.get(normalized, child.path).pipe(
            Effect.fromOption,
            Effect.map((schema) => {
              const patch: JsonPatch.JsonPatchOperation = {
                op: "replace",
                path: Str.substring(node.path.length)(child.path),
                value: schema,
              };
              return patch;
            }),
          ),
        );

        const patched = yield* Effect.try(() =>
          JsonPatch.apply(patches, node.schema),
        );

        const schema =
          yield* Schema.decodeUnknownEffect(OperationJsonSchema)(patched);

        const nullable = Match.value(
          Str.startsWith("3.0.")(catalog.document.openapi),
        ).pipe(
          Match.when(true, () =>
            Schema.decodeUnknownOption(Schema.JsonObject)(schema).pipe(
              Option.filter((schema) => schema.nullable === true),
              Option.map((schema) => ({
                nullable: true,
                allOf: [Struct.omit(schema, ["nullable"])],
              })),
              Option.getOrElse(() => schema),
            ),
          ),
          Match.orElse(() => schema),
        );

        const result: HashMap.HashMap<string, OpenApiSchemaNode["schema"]> =
          HashMap.set(normalized, node.path, nullable);

        return result;
      });

      /**
       * The expandSchemaLevel helper retains structural children with their
       * parent level so graph construction can reuse the discovered nodes and edges.
       */
      const expandSchemaLevel = Effect.fn(
        "OpenApiResourceSchemas.expandSchemaLevel",
      )(function* (frontier: ReadonlyArray<OpenApiSchemaNode>) {
        const children = Arr.flatMap(frontier, readSchemaChildren);
        const pending = Arr.map(children, (child) => child.node);
        const level: OpenApiSchemaLevel = { nodes: frontier, children };
        const next = Option.some(pending).pipe(
          Option.filter((nodes: ReadonlyArray<OpenApiSchemaNode>) =>
            Arr.isReadonlyArrayNonEmpty(nodes),
          ),
        );

        const result: readonly [
          ReadonlyArray<OpenApiSchemaLevel>,
          Option.Option<ReadonlyArray<OpenApiSchemaNode>>,
        ] = Tuple.make([level], next);

        return result;
      });

      /**
       * The resolvePropertyLinks helper pairs matching fields from one
       * request and response schema. The result retains expansion links and the
       * descendant pairs whose relationships still need resolution.
       */
      const resolvePropertyLinks = Effect.fn(
        "OpenApiResourceSchemas.resolvePropertyLinks",
      )(function* (source: OpenApiResourceGraph, query: OpenApiPropertyQuery) {
        const inputs = yield* readProperties(source, query.input);
        const outputs = yield* readProperties(source, query.output);
        const outputsByName = Arr.groupBy(outputs, (output) => output.name);
        const pairs = Arr.flatMap(inputs, (input) =>
          Arr.map(outputsByName[input.name] ?? [], (output) => ({
            input,
            output,
          })),
        );

        const links = yield* Effect.forEach(pairs, ({ input, output }) =>
          linkProperty(
            source,
            input.schemaPath,
            output.schemaPath,
            Arr.append(query.path, input.name),
          ),
        ).pipe(Effect.map(Arr.flatten));

        const children = Arr.flatMap(pairs, ({ input, output }) => {
          const key = JsonPointer.formatUriFragment([
            input.schemaPath,
            output.schemaPath,
          ]);

          const child: OpenApiPropertyQuery = {
            input: input.schemaPath,
            output: output.schemaPath,
            path: Arr.append(query.path, input.name),
            ancestors: HashSet.add(query.ancestors, key),
          };

          return Option.some(child).pipe(
            Option.filter(() => !HashSet.has(query.ancestors, key)),
            Option.toArray,
          );
        });

        const resolution: OpenApiPropertyResolution = { links, children };

        return resolution;
      });

      /**
       * The expandPropertyLinks helper advances pending request and response
       * pairs while retaining the relationships found at the current pair. The next
       * page exists only while unresolved descendant pairs remain.
       */
      const expandPropertyLinks = Effect.fn(
        "OpenApiResourceSchemas.expandPropertyLinks",
      )(function* (
        source: OpenApiResourceGraph,
        pending: ReadonlyArray<OpenApiPropertyQuery>,
      ) {
        const query = yield* Arr.head(pending).pipe(Effect.fromOption);
        const resolved = yield* resolvePropertyLinks(source, query);
        const remaining = Arr.appendAll(
          Arr.drop(pending, 1),
          resolved.children,
        );

        const next = Option.some(remaining).pipe(
          Option.filter((queries: ReadonlyArray<OpenApiPropertyQuery>) =>
            Arr.isReadonlyArrayNonEmpty(queries),
          ),
        );

        const page: readonly [
          ReadonlyArray<OpenApiPropertyLink>,
          Option.Option<ReadonlyArray<OpenApiPropertyQuery>>,
        ] = Tuple.make(resolved.links, next);

        return page;
      });

      return {
        buildGraph,
        normalizeNullability,
        resolveSchemas,
        readOperationSchemas,
        readProperties,
        readIdentity,
        linkProperties,
      };
    }),
  },
) {}

/**
 * The openApiResourceSchemasLayer Layer requires OperationCatalogs from the
 * generation graph. Schema queries and discovery therefore resolve references
 * against the same corrected operation document.
 */
export const openApiResourceSchemasLayer = Layer.effect(
  OpenApiResourceSchemas,
  OpenApiResourceSchemas.make,
);
