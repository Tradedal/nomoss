import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Order,
  Record,
  Schema,
  String as Str,
  Struct,
  Tuple,
} from "effect";
import type { OperationCatalog } from "../../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import type {
  OpenApiResourceCatalog,
  OpenApiResourceDefinition,
  OpenApiResourcePreparation,
} from "../../codegen/resourceSchemas.js";
import { StripeOpenApiInvocation, type StripeOpenApiSource } from "../model.js";

interface StripeClientPath {
  readonly name: string;
  readonly path: string;
}

/**
 * The StripeOperationBindings service keeps discovered resources available for
 * inspection even when their requests use encodings that StripeClient cannot
 * send. Each affected resource records the issue that prevents an executable
 * client's execution of its creation operation.
 */
export class StripeOperationBindings extends Context.Service<StripeOperationBindings>()(
  "nomoss/tools/stripe/generator/stripeOperationBindings",
  {
    make: Effect.gen(function* () {
      const catalogs = yield* OperationCatalogs;

      /**
       * The prepareResourceClients service method lets emission select
       * executable resources while the catalog retains unsupported discoveries.
       * Its result preserves resource order and records each encoding issue on
       * the affected resource and among the catalog's unresolved entries.
       *
       * A resource loses executable operations if its selected creation uses an
       * unsupported encoding. Every candidate for creation must identify an
       * operation in the supplied catalog or this method fails with
       * NoSuchElementError.
       */
      const prepareResourceClients = Effect.fn(
        "StripeOperationBindings.prepareResourceClients",
      )(function* (
        catalog: OperationCatalog,
        preparation: OpenApiResourcePreparation,
      ) {
        const resources = yield* Effect.forEach(
          Record.values(preparation.resources),
          (resource) =>
            Effect.gen(function* () {
              const contracts = yield* Effect.forEach(
                resource.creations,
                (creation) =>
                  Arr.findFirst(
                    catalog.operations,
                    (operation) =>
                      operation.operationId === creation.operationId,
                  ).pipe(Effect.fromOption),
              );

              const unsupported = Arr.filter(contracts, (operation) => {
                const mediaTypes = Record.keys(
                  operation.requestBody?.content ?? {},
                );

                return (
                  mediaTypes.length > 0 &&
                  !Arr.some(mediaTypes, (mediaType) =>
                    Option.isSome(
                      Schema.decodeUnknownOption(
                        StripeOpenApiInvocation.fields.contentType,
                      )(mediaType),
                    ),
                  )
                );
              });

              const executable = !Arr.some(
                unsupported,
                (operation) =>
                  operation.operationId === resource.operations?.create,
              );

              const contract = Option.some(resource).pipe(
                Option.filter(() => executable),
                Option.getOrElse(() => Struct.omit(resource, ["operations"])),
              );

              const bindingIssues = Arr.appendAll(
                resource.bindingIssues,
                Arr.map(unsupported, (operation) => ({
                  operationId: operation.operationId,
                  reason: `StripeClient does not support the declared request encoding: ${Arr.join(Record.keys(operation.requestBody?.content ?? {}), ", ")}`,
                })),
              );

              const result: OpenApiResourceDefinition = Struct.assign(
                contract,
                { bindingIssues },
              );

              return result;
            }),
        );

        const preparedResources = Record.fromEntries(
          Arr.map(resources, (resource) =>
            Tuple.make(resource.typeName, resource),
          ),
        );

        const issues = Arr.appendAll(
          preparation.unresolved,
          Arr.flatMap(resources, (resource) => resource.bindingIssues),
        );

        const unresolved = Arr.dedupeWith(
          issues,
          (left, right) =>
            left.operationId === right.operationId &&
            left.reason === right.reason,
        );

        const result: OpenApiResourcePreparation = {
          resources: preparedResources,
          unresolved,
        };

        return result;
      });

      /**
       * The bindClientOperations service method gives generated clients the
       * operations that belong to each executable resource. An operation under
       * several resource paths belongs to the client with the longest matching
       * path. An override in the source selects the client's name;
       * otherwise that name follows the path of the creation operation.
       *
       * The returned operations have paths under executable resources, request
       * encodings that StripeClient supports, and successful responses with
       * JSON bodies. Any omitted operation has no generated function.
       *
       * Each selected operation needs a schema for every parameter. A missing
       * declaration fails with NoSuchElementError. The method also fails for an
       * unsupported HTTP method or a schema that is invalid or cannot be
       * resolved. Each operation also needs a default JSON response so clients
       * can validate the provider's modeled failures.
       */
      const bindClientOperations = Effect.fn(
        "StripeOperationBindings.bindClientOperations",
      )(function* (
        catalog: OperationCatalog,
        source: typeof StripeOpenApiSource.Type,
        resources: OpenApiResourceCatalog,
      ) {
        /**
         * The selected paths keep each resource's configured client name.
         * Operations discovered later can then use the same public client as
         * the operation that creates the resource.
         */
        const clients = yield* Effect.forEach(
          Arr.filter(
            Record.values(resources),
            (resource) => resource.operations !== undefined,
          ),
          (resource) =>
            Effect.gen(function* () {
              const operation = yield* Arr.findFirst(
                catalog.operations,
                (operation) =>
                  operation.operationId === resource.operations?.create,
              ).pipe(Effect.fromOption);

              const parts = Arr.flatMap(
                Arr.drop(
                  Str.split(Str.replace(/^\/v\d+\//, "/")(operation.path), "/"),
                  1,
                ),
                (part) =>
                  Match.value(/^\{[^}]+\}$/.test(part)).pipe(
                    Match.when(true, () => []),
                    Match.orElse(() => Str.split(part, "_")),
                  ),
              );

              const name =
                source.clientNames[operation.path] ??
                Arr.join(
                  Arr.map(parts, (part, index) =>
                    Match.value(index).pipe(
                      Match.when(0, () => part),
                      Match.orElse(() => Str.capitalize(part)),
                    ),
                  ),
                  "",
                );

              const client: StripeClientPath = { name, path: operation.path };

              return client;
            }),
        );

        /**
         * The selected client for an operation must have the longest matching
         * path. This keeps a nested resource's methods on its own client when
         * its parent also has an executable client.
         */
        const assignments = Arr.flatMap(catalog.operations, (operation) => {
          const matching = Arr.filter(
            clients,
            (client) =>
              operation.path === client.path ||
              Str.startsWith(`${client.path}/`)(operation.path),
          );

          const specific = Arr.sort(
            matching,
            Order.mapInput(
              Order.flip(Order.Number),
              (client: StripeClientPath) => client.path.length,
            ),
          );

          const assignment = Arr.head(specific).pipe(
            Option.filter(
              () =>
                Arr.some(
                  Record.toEntries(operation.responses),
                  ([status, response]) =>
                    Str.startsWith("2")(status) &&
                    Record.has(response.content ?? {}, "application/json"),
                ) &&
                (operation.requestBody === undefined ||
                  Arr.some(
                    Record.keys(operation.requestBody.content),
                    (mediaType) =>
                      Option.isSome(
                        Schema.decodeUnknownOption(
                          StripeOpenApiInvocation.fields.contentType,
                        )(mediaType),
                      ),
                  )),
            ),
            Option.map((client) => ({ operation, client: client.name })),
            Option.toArray,
          );

          return assignment;
        });

        const operations: ReadonlyArray<StripeOpenApiInvocation> =
          yield* Effect.forEach(assignments, ({ operation, client }) =>
            Effect.gen(function* () {
              const name = operation.operationId;
              const method = yield* Schema.decodeUnknownEffect(
                StripeOpenApiInvocation.fields.method,
              )(operation.method);

              const parameters = operation.parameters;
              const body = Arr.head(
                Arr.filter(
                  Record.toEntries(operation.requestBody?.content ?? {}),
                  ([mediaType]) =>
                    Option.isSome(
                      Schema.decodeUnknownOption(
                        StripeOpenApiInvocation.fields.contentType,
                      )(mediaType),
                    ),
                ),
              );

              const contentType = yield* Schema.decodeUnknownEffect(
                StripeOpenApiInvocation.fields.contentType,
              )(
                Option.match(body, {
                  onNone: () => "application/x-www-form-urlencoded",
                  onSome: ([contentType]) => contentType,
                }),
              );

              const input = yield* catalogs.buildOperationInputSchema(
                catalog,
                operation,
                Option.map(body, ([mediaType]) => mediaType).pipe(
                  Option.getOrUndefined,
                ),
              );

              /**
               * The invocation contract requires successful and default JSON
               * responses so clients can validate both returned values and
               * provider failures. Operations with empty responses require a
               * separate extension before clients can execute them.
               */
              const success = yield* Effect.fromOption(
                Arr.findFirst(
                  Record.toEntries(operation.responses),
                  ([status, response]) =>
                    Str.startsWith("2")(status) &&
                    Record.has(response.content ?? {}, "application/json"),
                ),
              );

              const output = yield* Effect.fromOption(
                Record.get(success[1].content ?? {}, "application/json"),
              );

              const failure = yield* Effect.fromOption(
                Record.get(operation.responses, "default"),
              );
              const error = yield* Effect.fromOption(
                Record.get(failure.content ?? {}, "application/json"),
              );

              const outputSchema = yield* Schema.decodeUnknownEffect(
                Schema.JsonObject,
              )(output.schema ?? {});

              const errorSchema = yield* Schema.decodeUnknownEffect(
                Schema.JsonObject,
              )(error.schema ?? {});

              /**
               * The invocation contract validates values that Stripe can
               * receive. A declaration's references to other resources must
               * resolve before the client validates this request.
               */
              const invocation: StripeOpenApiInvocation = {
                name,
                client,
                method,
                path: operation.path,
                contentType,
                pathParameters: Arr.map(
                  Arr.filter(
                    parameters,
                    (parameter) => parameter.location === "path",
                  ),
                  (parameter) => parameter.name,
                ),
                queryParameters: Arr.map(
                  Arr.filter(
                    parameters,
                    (parameter) => parameter.location === "query",
                  ),
                  (parameter) => parameter.name,
                ),
                input,
                output: outputSchema,
                error: errorSchema,
              };

              return invocation;
            }),
          );

        return operations;
      });

      return { prepareResourceClients, bindClientOperations };
    }),
  },
) {}

export const stripeOperationBindingsLayer = Layer.effect(
  StripeOperationBindings,
  StripeOperationBindings.make,
);
