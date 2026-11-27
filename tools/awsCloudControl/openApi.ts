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
  AwsOpenApiMethod,
  AwsOpenApiOperation,
  type AwsOpenApiReference,
  AwsQueryRequest,
  AwsRestRequest,
  AwsRpcRequest,
  OpenApiComponentReference,
} from "./model.js";

/**
 * The AwsOpenApi service resolves the converter's schemas and operation
 * metadata so the TypeScript emitter can bind each call to its contract.
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
       * The readRpcErrorReferences operation reads modeled errors from the
       * same media type as the RPC request. A missing error schema prevents
       * generation from publishing an incomplete error contract.
       */
      const readRpcErrorReferences = Effect.fn(
        "AwsOpenApi.readRpcErrorReferences",
      )(
        (
          operation: typeof AwsOpenApiOperation.Type,
          contentType: string,
          source: string,
        ) =>
          Effect.forEach(
            Record.toEntries(
              Record.filter(
                operation.responses,
                (_, status) => Number(status) >= 300,
              ),
            ),
            ([status, response]) =>
              Option.fromUndefinedOr(response.content).pipe(
                Option.flatMap((content) => Record.get(content, contentType)),
                Effect.fromOption(
                  () =>
                    new OperationCatalogError({
                      source,
                      message: `Operation ${operation.operationId} response ${status} must declare modeled errors for ${contentType}`,
                    }),
                ),
              ),
          ).pipe(
            Effect.map(
              Arr.flatMap(
                ({ schema }): ReadonlyArray<AwsOpenApiReference> =>
                  Match.value(schema).pipe(
                    Match.when({ $ref: Match.string }, (reference) => [
                      reference,
                    ]),
                    Match.orElse((union) => union.anyOf),
                  ),
              ),
            ),
          ),
      );

      /**
       * The bindClientOperation operation resolves schemas and HTTP metadata
       * for one generated call. It uses the success status from the OpenAPI
       * document so an empty reply can be decoded with the correct status.
       *
       * @see ../../refs/smithy/smithy-openapi/src/main/java/software/amazon/smithy/openapi/fromsmithy/OpenApiMapper.java (updateOperation)
       */
      const bindClientOperation = Effect.fn("AwsOpenApi.bindClientOperation")(
        function* (
          catalog: OperationCatalog,
          declaration: OperationCatalog["operations"][number],
        ) {
          const document = catalog.document;

          const path = yield* Schema.decodeUnknownEffect(
            Schema.TemplateLiteral(["/", Schema.String]),
          )(declaration.path);

          const method = yield* Schema.decodeUnknownEffect(AwsOpenApiMethod)(
            Str.toUpperCase(declaration.method),
          );

          const contract = Match.value(document["x-aws-service"]).pipe(
            Match.when({ protocol: "awsQuery" }, () => ({
              _tag: "Query",
              ...declaration.extensions,
            })),
            Match.when({ protocol: "restJson1" }, () => ({
              _tag: "Rest",
              ...declaration.extensions,
            })),
            Match.orElse(() => ({
              _tag: "Rpc",
              parameters: Arr.map(declaration.parameters, (parameter) => ({
                ...parameter,
                in: parameter.location,
              })),
              requestBody: declaration.requestBody,
            })),
          );

          const operationContract = yield* Schema.decodeUnknownEffect(
            AwsOpenApiOperation,
          )({
            ...declaration.extensions,
            operationId: declaration.operationId,
            responses: declaration.responses,
          });

          const decoded = yield* Schema.decodeUnknownEffect(
            Schema.Union([AwsRestRequest, AwsRpcRequest, AwsQueryRequest]),
          )(contract);

          // The REST operation carries a full input schema because OpenAPI
          // separates its labels and parameters from the request body.
          // The RPC extension keeps its input under the sole media type.
          const request = yield* Match.value(decoded).pipe(
            Match.tag("Rest", (request) =>
              Option.some({
                input: request["x-aws-input"],
                headers: {},
                contentType: "application/json",
                errors: Option.some(request["x-aws-errors"]),
                bindings: Option.some(request["x-aws-http-bindings"]),
                memberNames: request["x-aws-member-names"],
                query: undefined,
              }),
            ),
            Match.tag("Query", (request) =>
              Option.some({
                input: request["x-aws-input"],
                headers: {},
                contentType: "text/xml",
                errors: Option.some(request["x-aws-errors"]),
                bindings: Option.none(),
                query: request["x-aws-query"],
                memberNames: undefined,
              }),
            ),
            Match.tag("Rpc", (request) =>
              Arr.head(Record.toEntries(request.requestBody.content)).pipe(
                Option.map(([contentType, body]) => ({
                  input: body.schema,
                  headers: Record.set(
                    Record.fromEntries(
                      Arr.map(request.parameters, (parameter) => [
                        Str.toLowerCase(parameter.name),
                        parameter.schema.enum[0],
                      ]),
                    ),
                    "content-type",
                    contentType,
                  ),
                  contentType,
                  errors: Option.none(),
                  bindings: Option.none(),
                  query: undefined,
                  memberNames: undefined,
                })),
              ),
            ),
            Match.exhaustive,
            Effect.fromOption,
          );

          const [status, success] = yield* Effect.fromOption(
            Arr.findFirst(
              Record.toEntries(operationContract.responses),
              ([status]) => Number(status) >= 200 && Number(status) < 300,
            ),
          );

          const output = yield* Option.fromUndefinedOr(success.content).pipe(
            Option.map((content) =>
              Record.get(content, request.contentType).pipe(
                Effect.fromOption(
                  () =>
                    new OperationCatalogError({
                      source: catalog.source.name,
                      message: `Operation ${operationContract.operationId} must declare response content for ${request.contentType}`,
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

          const errorReferences = yield* Option.match(request.errors, {
            onSome: Effect.succeed,
            onNone: () =>
              readRpcErrorReferences(
                operationContract,
                request.contentType,
                catalog.source.name,
              ),
          });

          const errors = yield* Effect.forEach(errorReferences, (reference) =>
            Effect.fromOption(
              Record.get(
                document.components.schemas,
                Str.replace("#/components/schemas/", "")(reference.$ref),
              ),
            ).pipe(
              Effect.flatMap(Schema.decodeUnknownEffect(Schema.JsonObject)),
              Effect.flatMap((component) =>
                Schema.decodeUnknownEffect(AwsOpenApiError)(
                  component["x-aws-error"],
                ),
              ),
            ),
          );

          const outputName = Option.match(output, {
            onNone: () => null,
            onSome: (reference) =>
              Str.replace("#/components/schemas/", "")(reference.$ref),
          });

          const rest = Option.getOrUndefined(
            Option.map(request.bindings, (bindings) => ({
              bindings,
              status: Number(status),
              body: declaration.requestBody !== undefined,
            })),
          );

          const operation: AwsOpenApiInvocation = {
            description: declaration.description,
            memberNames: request.memberNames,
            name: operationContract.operationId,
            unsigned: undefined,
            method,
            path,
            input: Str.replace("#/components/schemas/", "")(request.input.$ref),
            output: outputName,
            headers: request.headers,
            rest,
            query: request.query,
            idempotencyTokens: operationContract["x-aws-idempotency-tokens"],
            pagination: operationContract["x-aws-pagination"],
            errors: Arr.dedupeWith(
              errors,
              (left, right) => left.name === right.name,
            ),
          };

          return operation;
        },
      );

      /**
       * The bindClientOperations service method assembles the operation
       * contracts that the TypeScript emitter publishes for a service.
       */
      const bindClientOperations = Effect.fn("AwsOpenApi.bindClientOperations")(
        (catalogs: ReadonlyArray<OperationCatalog>) =>
          Effect.forEach(catalogs, (catalog) =>
            Effect.forEach(catalog.operations, (declaration) =>
              bindClientOperation(catalog, declaration),
            ),
          ).pipe(Effect.map(Arr.flatten)),
      );

      return { collectSchemaDefinitions, bindClientOperations };
    }),
  },
) {}
