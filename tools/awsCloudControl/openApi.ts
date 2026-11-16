import {
  Array as Arr,
  Context,
  Effect,
  type JsonSchema,
  Match,
  Option,
  Record,
  Schema,
  String as Str,
  Tuple,
} from "effect";
import type { OperationCatalog } from "../codegen/catalogSchemas.js";
import { OperationCatalogError } from "../codegen/operationCatalogs.js";
import {
  type AwsOpenApiDocument,
  AwsOpenApiError,
  type AwsOpenApiInvocation,
  AwsOpenApiOperation,
  type AwsOpenApiReference,
  OpenApiComponentReference,
} from "./model.js";

/**
 * AwsOpenApi interprets the converter's schemas and operation metadata for
 * TypeScript generation. Effect handles dialect normalization and references
 * so the generator does not implement another OpenAPI importer.
 */
export class AwsOpenApi extends Context.Service<AwsOpenApi>()(
  "nomoss/tools/awsCloudControl/openApi/AwsOpenApi",
  {
    make: Effect.sync(() => {
      /**
       * The collectSchemaDefinitions service method supplies the definitions
       * needed to compile all selected operations together. Conflicting
       * definitions with the same component name fail before emission because
       * the generated module can provide only one schema under that name.
       */
      const collectSchemaDefinitions = Effect.fn(
        "AwsOpenApi.collectSchemaDefinitions",
      )(function* (documents: ReadonlyArray<AwsOpenApiDocument>) {
        const components = Arr.groupBy(
          Arr.flatMap(documents, (document) =>
            Record.toEntries(document.components.schemas),
          ),
          ([name]) => name,
        );

        const equivalent = Schema.toEquivalence(Schema.JsonObject);

        const entries = yield* Effect.forEach(
          Record.toEntries(components),
          ([name, definitions]) => {
            const first = definitions[0][1];
            const consistent = Arr.every(definitions, ([, definition]) =>
              equivalent(first, definition),
            );
            const entry = Tuple.make(name, first);

            return Effect.succeed(entry).pipe(
              Effect.filterOrFail(
                () => consistent,
                () =>
                  new OperationCatalogError({
                    source: name,
                    message: `Conflicting component definitions for ${name} cannot share a generated schema`,
                  }),
              ),
            );
          },
        );

        const definitions: JsonSchema.Definitions = Record.fromEntries(entries);

        return definitions;
      });

      /**
       * Binds request, response, and AWS invocation facts from
       * each OpenAPI operation, including modeled error retry traits retained
       * by the Smithy extension for execution.
       */
      const bindClientOperations = Effect.fn("AwsOpenApi.bindClientOperations")(
        (catalogs: ReadonlyArray<OperationCatalog>) =>
          Effect.forEach(catalogs, (catalog) =>
            Effect.forEach(catalog.operations, (declaration) =>
              Effect.gen(function* () {
                const document = catalog.document;
                const path = yield* Schema.decodeUnknownEffect(
                  Schema.TemplateLiteral(["/", Schema.String]),
                )(declaration.path);
                const post = yield* Schema.decodeUnknownEffect(
                  AwsOpenApiOperation,
                )({
                  ...declaration.extensions,
                  operationId: declaration.operationId,
                  parameters: Arr.map(declaration.parameters, (parameter) => ({
                    ...parameter,
                    in: parameter.location,
                  })),
                  requestBody: declaration.requestBody,
                  responses: declaration.responses,
                });
                const [contentType, request] = yield* Effect.fromOption(
                  Arr.head(Record.toEntries(post.requestBody.content)),
                );

                const success = yield* Effect.fromOption(
                  Record.get(post.responses, "200"),
                );

                const output = yield* Option.fromUndefinedOr(
                  success.content,
                ).pipe(
                  Option.map((content) =>
                    Record.get(content, contentType).pipe(
                      Effect.fromOption(
                        () =>
                          new OperationCatalogError({
                            source: catalog.source.name,
                            message: `Operation ${post.operationId} must declare response content for ${contentType}`,
                          }),
                      ),
                      Effect.flatMap((response) =>
                        Schema.decodeUnknownEffect(OpenApiComponentReference)(
                          response.schema,
                        ),
                      ),
                    ),
                  ),
                  Effect.transposeOption,
                );

                const errorSchemas = yield* Effect.forEach(
                  Record.toEntries(
                    Record.filter(
                      post.responses,
                      (_, status) => Number(status) >= 300,
                    ),
                  ),
                  ([status, response]) =>
                    Option.fromUndefinedOr(response.content).pipe(
                      Option.flatMap((content) =>
                        Record.get(content, contentType),
                      ),
                      Effect.fromOption(
                        () =>
                          new OperationCatalogError({
                            source: catalog.source.name,
                            message: `Operation ${post.operationId} response ${status} must declare modeled errors for ${contentType}`,
                          }),
                      ),
                    ),
                );

                const errorReferences = Arr.flatMap(
                  errorSchemas,
                  ({ schema }): ReadonlyArray<AwsOpenApiReference> =>
                    Match.value(schema).pipe(
                      Match.when({ $ref: Match.string }, (reference) => [
                        reference,
                      ]),
                      Match.orElse((union) => union.anyOf),
                    ),
                );

                const errors = yield* Effect.forEach(
                  errorReferences,
                  (reference) =>
                    Effect.fromOption(
                      Record.get(
                        document.components.schemas,
                        Str.replace(
                          "#/components/schemas/",
                          "",
                        )(reference.$ref),
                      ),
                    ).pipe(
                      Effect.flatMap(
                        Schema.decodeUnknownEffect(Schema.JsonObject),
                      ),
                      Effect.flatMap((component) =>
                        Schema.decodeUnknownEffect(AwsOpenApiError)(
                          component["x-aws-error"],
                        ),
                      ),
                    ),
                );

                const headers = Record.set(
                  Record.fromEntries(
                    Arr.map(post.parameters, (parameter) => [
                      Str.toLowerCase(parameter.name),
                      parameter.schema.enum[0],
                    ]),
                  ),
                  "content-type",
                  contentType,
                );

                const outputName = Option.match(output, {
                  onNone: () => null,
                  onSome: (reference) =>
                    Str.replace("#/components/schemas/", "")(reference.$ref),
                });

                const operation: AwsOpenApiInvocation = {
                  name: post.operationId,
                  method: "POST",
                  path,
                  input: Str.replace(
                    "#/components/schemas/",
                    "",
                  )(request.schema.$ref),
                  output: outputName,
                  headers,
                  idempotencyTokens: post["x-aws-idempotency-tokens"],
                  pagination: post["x-aws-pagination"],
                  waiters: post["x-aws-waiters"],
                  errors: Arr.dedupeWith(
                    errors,
                    (left, right) => left.name === right.name,
                  ),
                };

                return operation;
              }),
            ),
          ).pipe(
            Effect.map((entries) => {
              const operations: ReadonlyArray<AwsOpenApiInvocation> =
                Arr.flatten(entries);

              return operations;
            }),
          ),
      );

      return { collectSchemaDefinitions, bindClientOperations };
    }),
  },
) {}
