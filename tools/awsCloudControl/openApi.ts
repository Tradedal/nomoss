import {
  Array as Arr,
  Context,
  Effect,
  type JsonSchema,
  Match,
  Record,
  Schema,
  String as Str,
} from "effect";
import type { OperationCatalog } from "../codegen/catalogSchemas.js";
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
       * Returns shared component definitions for native Effect normalization
       * and compilation with the selected operation roots.
       */
      const collectSchemaDefinitions = (
        documents: ReadonlyArray<AwsOpenApiDocument>,
      ) => {
        const components = Arr.reduce(
          documents,
          Record.empty<string, JsonSchema.JsonSchema>(),
          (schemas, document) =>
            Record.union(schemas, document.components.schemas, (left) => left),
        );

        const definitions: JsonSchema.Definitions = components;

        return definitions;
      };

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

                const response = yield* Effect.fromOption(
                  Record.get(success.content, contentType),
                );

                const output = yield* Schema.decodeUnknownEffect(
                  OpenApiComponentReference,
                )(response.schema);

                const errorSchemas = Arr.flatMap(
                  Record.values(
                    Record.filter(
                      post.responses,
                      (_, status) => Number(status) >= 300,
                    ),
                  ),
                  (response) => Record.values(response.content),
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

                const operation: AwsOpenApiInvocation = {
                  name: post.operationId,
                  method: "POST",
                  path,
                  input: Str.replace(
                    "#/components/schemas/",
                    "",
                  )(request.schema.$ref),
                  output: Str.replace("#/components/schemas/", "")(output.$ref),
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
