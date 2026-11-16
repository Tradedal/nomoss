import {
  Array as Arr,
  Context,
  Data,
  Effect,
  JsonPointer,
  Layer,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
  Stream,
  Tuple,
} from "effect";
import { type SourceFile, ts, VariableDeclarationKind } from "ts-morph";
import {
  type OpenApiObjectLocation,
  OpenApiSpecification,
  type OperationCatalog,
  OperationMetadata,
  type OperationSource,
  SourceCorrectionRegistry,
} from "./catalogSchemas.js";
import {
  ClientOperation,
  OperationParameter,
  OperationRequestBody,
  OperationResponse,
} from "./operationSchemas.js";
import {
  SourceCorrections,
  sourceCorrectionsLayer,
} from "./sourceCorrections.js";
import { jsonExpression } from "./typeScriptJson.js";

/**
 * Identifies a source whose selected operations or object references cannot
 * supply an unambiguous catalog.
 */
export class OperationCatalogError extends Data.TaggedError(
  "OperationCatalogError",
)<{
  readonly source?: string;
  readonly message: string;
}> {}

/**
 * Catalogs and provider generators share corrected source documents and
 * operation declarations. Payload schema compilation remains with Effect.
 */
export class OperationCatalogs extends Context.Service<OperationCatalogs>()(
  "nomoss/tools/codegen/operationCatalogs",
  {
    make: Effect.gen(function* () {
      const corrections = yield* SourceCorrections;

      /**
       * The resolveOpenApiObjectLocation service method follows local references and
       * returns the object and its source location. References inside its schema fields remain available to
       * Effect's importer. Invalid targets and cycles fail source preparation.
       */
      const resolveOpenApiObjectLocation = Effect.fn(
        "OperationCatalogs.resolveOpenApiObjectLocation",
      )(function* (
        document: OpenApiSpecification,
        location: OpenApiObjectLocation,
      ) {
        const references = Stream.unfold(
          { ...location, visited: Arr.empty<string>() },
          (state) =>
            Schema.decodeUnknownOption(Schema.String)(state.object.$ref).pipe(
              Option.map((reference) =>
                Effect.gen(function* () {
                  const path = yield* Effect.fromOption(
                    Option.fromUndefinedOr(
                      JsonPointer.parseUriFragment(reference),
                    ),
                    () =>
                      new OperationCatalogError({
                        message: `Unsupported object reference ${reference}`,
                      }),
                  );

                  yield* Effect.succeed(reference).pipe(
                    Effect.filterOrFail(
                      (value) => !Arr.contains(state.visited, value),
                      () =>
                        new OperationCatalogError({
                          message: `Cyclic object reference ${reference}`,
                        }),
                    ),
                  );

                  const target = yield* Effect.reduce(
                    path,
                    (): Schema.Json => document,
                    (value, key) =>
                      Schema.decodeUnknownOption(Schema.JsonObject)(value).pipe(
                        Option.flatMap((record) => Record.get(record, key)),
                        Option.orElse(() =>
                          Schema.decodeUnknownOption(Schema.Array(Schema.Json))(
                            value,
                          ).pipe(
                            Option.filter(() => /^(?:0|[1-9]\d*)$/.test(key)),
                            Option.flatMap((array) =>
                              Arr.get(array, Number(key)),
                            ),
                          ),
                        ),
                        Effect.fromOption,
                        Effect.mapError(
                          () =>
                            new OperationCatalogError({
                              message: `Object reference ${reference} has no value at ${key}`,
                            }),
                        ),
                      ),
                  );

                  const resolved = yield* Schema.decodeUnknownEffect(
                    Schema.JsonObject,
                  )(target);

                  const targetLocation: OpenApiObjectLocation = {
                    path: reference,
                    object: resolved,
                  };
                  return Tuple.make(targetLocation, {
                    path: reference,
                    object: resolved,
                    visited: Arr.append(state.visited, reference),
                  });
                }),
              ),
              Effect.transposeOption,
              Effect.map(Option.getOrUndefined),
            ),
        );

        const resolved: OpenApiObjectLocation = yield* Stream.runFold(
          references,
          () => location,
          (_, value) => value,
        );

        return resolved;
      });

      /**
       * Resolves an OpenAPI object for consumers that need its contract without
       * its source location. Schema references remain available to Effect.
       */
      const resolveOpenApiObject = Effect.fn(
        "OperationCatalogs.resolveOpenApiObject",
      )(function* (document: OpenApiSpecification, object: Schema.JsonObject) {
        const resolved = yield* resolveOpenApiObjectLocation(document, {
          path: "#",
          object,
        });
        const contract: Schema.JsonObject = resolved.object;
        return contract;
      });

      /**
       * Applies the source's declarative correction registry and returns the
       * specification used by both catalog extraction and provider generation.
       */
      const prepareOpenApiDocument = Effect.fn(
        "OperationCatalogs.prepareOpenApiDocument",
      )(function* (
        source: OperationSource,
        snapshot: unknown,
        registry: SourceCorrectionRegistry = {},
      ) {
        const entries = yield* Schema.decodeEffect(SourceCorrectionRegistry)(
          registry,
        );

        const corrected = yield* corrections.applyCorrections(
          snapshot,
          entries[source.name] ?? [],
        );

        const document: OpenApiSpecification =
          yield* Schema.decodeUnknownEffect(OpenApiSpecification)(corrected);

        return document;
      });

      /**
       * Extracts selected operation declarations and their metadata from a
       * corrected specification. Operation parameters override shared path
       * parameters by name and location. Source identity keeps unrelated
       * services separate even when their operation IDs are identical.
       */
      const buildOperationCatalog = Effect.fn(
        "OperationCatalogs.buildOperationCatalog",
      )(function* (
        source: OperationSource,
        document: OpenApiSpecification,
        selection: ReadonlyArray<string> = [],
      ) {
        const candidates = Arr.flatMap(
          Record.toEntries(document.paths),
          ([path, item]) =>
            Arr.flatMap(Record.toEntries(item), ([method, value]) =>
              Schema.decodeUnknownOption(ClientOperation.fields.method)(
                Str.toUpperCase(method),
              ).pipe(
                Option.map((method) => ({ path, item, method, value })),
                Option.toArray,
              ),
            ),
        );

        const identified = yield* Effect.forEach(candidates, (candidate) =>
          Effect.gen(function* () {
            const value = yield* Schema.decodeUnknownEffect(Schema.JsonObject)(
              candidate.value,
            );

            const operationId = yield* Schema.decodeUnknownEffect(
              Schema.NonEmptyString,
            )(value.operationId);

            return { ...candidate, value, operationId };
          }),
        );

        const selected = Match.value(selection.length).pipe(
          Match.when(0, () => identified),
          Match.orElse(() =>
            Arr.flatMap(selection, (id) =>
              Arr.filter(identified, ({ operationId }) => operationId === id),
            ),
          ),
        );
        const ids = Arr.map(selected, ({ operationId }) => operationId);

        yield* Effect.succeed(ids).pipe(
          Effect.filterOrFail(
            (ids) =>
              Arr.dedupe(ids).length === ids.length &&
              Arr.every(selection, (id) => Arr.contains(ids, id)),
            () =>
              new OperationCatalogError({
                source: source.name,
                message: "Selected operation IDs are missing or ambiguous",
              }),
          ),
        );

        const operations = yield* Effect.forEach(
          selected,
          ({ path, item, method, value, operationId }) =>
            Effect.gen(function* () {
              const groups = yield* Effect.forEach(
                [
                  {
                    entries: value.parameters ?? [],
                    path: JsonPointer.formatUriFragment([
                      "paths",
                      path,
                      Str.toLowerCase(method),
                      "parameters",
                    ]),
                  },
                  {
                    entries: item.parameters ?? [],
                    path: JsonPointer.formatUriFragment([
                      "paths",
                      path,
                      "parameters",
                    ]),
                  },
                ],
                ({ entries, path }) =>
                  Schema.decodeUnknownEffect(Schema.Array(Schema.JsonObject))(
                    entries,
                  ).pipe(
                    Effect.flatMap((entries) =>
                      Effect.forEach(entries, (entry, index) =>
                        resolveOpenApiObjectLocation(document, {
                          object: entry,
                          path: `${path}/${index}`,
                        }).pipe(
                          Effect.flatMap(({ object: resolved, path }) =>
                            Schema.decodeUnknownEffect(OperationParameter)({
                              ...resolved,
                              location: resolved.in,
                              required: resolved.required ?? false,
                              ...Option.match(
                                Option.fromUndefinedOr(resolved.schema),
                                {
                                  onNone: () => ({}),
                                  onSome: () => ({
                                    schemaPath: `${path}/schema`,
                                  }),
                                },
                              ),
                            }),
                          ),
                        ),
                      ),
                    ),
                  ),
              );

              const parameters = Arr.dedupeWith(
                Arr.flatten(groups),
                (left, right) =>
                  left.name === right.name && left.location === right.location,
              );

              const responses = yield* Schema.decodeUnknownEffect(
                Schema.Record(Schema.String, Schema.JsonObject),
              )(value.responses).pipe(
                Effect.flatMap((responses) =>
                  Effect.forEach(
                    Record.toEntries(responses),
                    ([status, response]) =>
                      resolveOpenApiObject(document, response).pipe(
                        Effect.flatMap(
                          Schema.decodeUnknownEffect(OperationResponse),
                        ),
                        Effect.map((response) => Tuple.make(status, response)),
                      ),
                  ),
                ),
              );

              const body = yield* Option.fromUndefinedOr(
                value.requestBody,
              ).pipe(
                Option.map((body) =>
                  Schema.decodeUnknownEffect(Schema.JsonObject)(body).pipe(
                    Effect.flatMap((body) =>
                      resolveOpenApiObject(document, body),
                    ),
                    Effect.flatMap((body) =>
                      Schema.decodeUnknownEffect(OperationRequestBody)({
                        ...body,
                        required: body.required ?? false,
                      }),
                    ),
                  ),
                ),
                Effect.transposeOption,
              );

              const declaration = {
                operationId,
                method,
                path,
                parameters,
                responses: Record.fromEntries(responses),
                extensions: Record.filter(value, (_, key) =>
                  Str.startsWith("x-")(key),
                ),
              };

              const operation: ClientOperation =
                yield* Schema.decodeUnknownEffect(ClientOperation)(
                  Option.match(body, {
                    onNone: () => declaration,
                    onSome: (requestBody) => ({ ...declaration, requestBody }),
                  }),
                );

              return operation;
            }),
        );

        const metadata = yield* Effect.forEach(operations, (operation) =>
          Effect.gen(function* () {
            const entry = {
              source,
              version: document.info.version,
              operationId: operation.operationId,
              method: operation.method,
              path: operation.path,
              servers: Arr.map(document.servers, ({ url }) => url),
              parameters: Arr.map(
                operation.parameters,
                ({ name, location, required }) => ({
                  name,
                  location,
                  required,
                }),
              ),
              responses: Record.map(operation.responses, (response) =>
                Record.keys(response.content ?? {}),
              ),
              providerMetadata: {
                document: Record.filter(document, (_, key) =>
                  Str.startsWith("x-")(key),
                ),
                operation: operation.extensions,
              },
            };

            const metadata: OperationMetadata =
              yield* Schema.decodeUnknownEffect(OperationMetadata)(
                Option.match(Option.fromUndefinedOr(operation.requestBody), {
                  onNone: () => entry,
                  onSome: (body) => ({
                    ...entry,
                    requestBody: {
                      required: body.required,
                      mediaTypes: Record.keys(body.content),
                    },
                  }),
                }),
              );

            return metadata;
          }),
        );

        const catalog: OperationCatalog = {
          source,
          document,
          operations,
          metadata,
        };

        return catalog;
      });

      /**
       * The emitOperationCatalog service method preserves validated metadata
       * in a generated module. Document extension references name existing
       * module variables that contain those extensions' values. Callers must
       * verify that the shared values match every entry before supplying a
       * reference; the published entries then retain their original fields.
       */
      const emitOperationCatalog = Effect.fn(
        "OperationCatalogs.emitOperationCatalog",
      )(function* (
        module: SourceFile,
        name: string,
        entries: ReadonlyArray<OperationMetadata>,
        documentMetadataReferences: Readonly<Record<string, string>> = {},
      ) {
        const values = yield* Schema.encodeEffect(
          Schema.Array(OperationMetadata),
        )(entries);

        const elements = Arr.map(values, (entry) => {
          const documentFields = Arr.map(
            Record.toEntries(entry.providerMetadata.document),
            ([key, value]) => {
              const reference = Record.get(documentMetadataReferences, key);
              const expression = Option.match(reference, {
                onNone: () => jsonExpression(value),
                onSome: (name) => ts.factory.createIdentifier(name),
              });

              return ts.factory.createPropertyAssignment(
                ts.factory.createStringLiteral(key),
                expression,
              );
            },
          );

          const documentMetadata = ts.factory.createObjectLiteralExpression(
            documentFields,
            true,
          );
          const operationMetadata = jsonExpression(
            entry.providerMetadata.operation,
          );

          const providerMetadata = ts.factory.createObjectLiteralExpression(
            [
              ts.factory.createPropertyAssignment(
                ts.factory.createStringLiteral("document"),
                documentMetadata,
              ),
              ts.factory.createPropertyAssignment(
                ts.factory.createStringLiteral("operation"),
                operationMetadata,
              ),
            ],
            true,
          );

          const serialized: Schema.JsonObject = entry;

          const fields = Arr.map(
            Record.toEntries(serialized),
            ([key, value]) => {
              const expression = Match.value(key).pipe(
                Match.when("providerMetadata", () => providerMetadata),
                Match.orElse(() => jsonExpression(value)),
              );

              return ts.factory.createPropertyAssignment(
                ts.factory.createStringLiteral(key),
                expression,
              );
            },
          );

          return ts.factory.createObjectLiteralExpression(fields, true);
        });

        const initializer = ts
          .createPrinter()
          .printNode(
            ts.EmitHint.Expression,
            ts.factory.createArrayLiteralExpression(elements, true),
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
       * The buildOperationInputSchema service method combines a selected body
       * with its operation parameters for clients and resource declarations.
       * Parameter schemas retain their provider constraints and requiredness.
       * An unavailable media type or parameter schema fails preparation.
       */
      const buildOperationInputSchema = Effect.fn(
        "OperationCatalogs.buildOperationInputSchema",
      )(function* (
        catalog: OperationCatalog,
        operation: ClientOperation,
        mediaType?: string,
      ) {
        const content = yield* Option.match(Option.fromUndefinedOr(mediaType), {
          onNone: () => Effect.succeed({ schema: {} }),
          onSome: (mediaType) =>
            Record.get(operation.requestBody?.content ?? {}, mediaType).pipe(
              Effect.fromOption,
            ),
        });
        const body = yield* Schema.decodeEffect(Schema.JsonObject)(
          content.schema ?? {},
        ).pipe(
          Effect.flatMap((schema) =>
            resolveOpenApiObject(catalog.document, schema),
          ),
        );
        const properties = yield* Schema.decodeUnknownEffect(
          Schema.Record(Schema.String, Schema.Json),
        )(body.properties ?? {});
        const required = yield* Schema.decodeUnknownEffect(
          Schema.Array(Schema.String),
        )(body.required ?? []);
        const parameters = yield* Effect.forEach(
          operation.parameters,
          (parameter) =>
            Option.fromUndefinedOr(parameter.schema).pipe(
              Effect.fromOption,
              Effect.map((schema) => Tuple.make(parameter.name, schema)),
            ),
        );
        const input: Schema.JsonObject = {
          ...body,
          type: "object",
          properties: Record.union(
            properties,
            Record.fromEntries(parameters),
            (left, right) => ({ allOf: [left, right] }),
          ),
          required: Arr.dedupe(
            Arr.appendAll(
              required,
              Arr.map(
                Arr.filter(
                  operation.parameters,
                  (parameter) => parameter.required,
                ),
                (parameter) => parameter.name,
              ),
            ),
          ),
          additionalProperties: body.additionalProperties ?? false,
        };

        return input;
      });

      return {
        resolveOpenApiObjectLocation,
        resolveOpenApiObject,
        prepareOpenApiDocument,
        buildOperationCatalog,
        buildOperationInputSchema,
        emitOperationCatalog,
      };
    }),
  },
) {}

export const operationCatalogsLayer = Layer.effect(
  OperationCatalogs,
  OperationCatalogs.make,
).pipe(Layer.provide(sourceCorrectionsLayer));
