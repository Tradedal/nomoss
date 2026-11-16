import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Option,
  Record,
  type Schema,
  type SchemaRepresentation,
} from "effect";
import type { ResourceOutputCatalog } from "../../codegen/resourceSchemas.js";
import { SchemaCompilation } from "../../codegen/schemaCompilation.js";
import type {
  StripeOpenApiDocument,
  StripeOpenApiInvocation,
} from "../model.js";

/**
 * The StripeSchemaCompiler service keeps a model shared when both an operation
 * contract and a resource output refer to it. The StripeModuleEmitter service
 * uses those references to publish one declaration for the model, which the
 * generated modules can import.
 */
export class StripeSchemaCompiler extends Context.Service<StripeSchemaCompiler>()(
  "nomoss/tools/stripe/generator/stripeSchemaCompiler",
  {
    make: Effect.gen(function* () {
      const compilation = yield* SchemaCompilation;

      /**
       * The compileSchemas service method returns code whose schema roots stay
       * aligned with the public names assigned during emission. Callers must
       * supply the same operation and resource order to the StripeModuleEmitter
       * service so each name identifies its intended validator.
       *
       * The returned CodeDocument lists each operation's input, output, and
       * error roots in operation order. Resource outputs follow in resource
       * order, with provider outputs before native Effect schemas. Callers must
       * place native Effect resources last in resources and pass their output
       * schemas in the same order through effectSchemas. Those schemas retain
       * the validation defined by their declarations. Selected response model
       * roots follow all resource outputs in resource order.
       *
       * The method needs at least one operation or provider resource output.
       * It fails with NoSuchElementError when neither exists, even if the
       * caller supplies native Effect schemas. Failures in Effect's schema
       * normalization, import, or compilation also propagate to the caller.
       */
      const compileSchemas = Effect.fn("StripeSchemaCompiler.compileSchemas")(
        function* (
          document: typeof StripeOpenApiDocument.Type,
          operations: ReadonlyArray<StripeOpenApiInvocation>,
          resources: ReadonlyArray<ResourceOutputCatalog>,
          effectSchemas: ReadonlyArray<Schema.Top> = [],
        ) {
          const operationSchemas = Arr.flatMap(operations, (operation) => [
            operation.input,
            operation.output,
            operation.error,
          ]);

          const resourceSchemas = Arr.map(
            Arr.filter(
              resources,
              (resource) => resource.source.format !== "Effect",
            ),
            (resource) => ({
              type: "object",
              properties: Record.map(
                resource.outputs,
                (output) => output.schema,
              ),
              required: Record.keys(
                Record.filter(resource.outputs, (output) => output.required),
              ),
              additionalProperties: false,
            }),
          );

          const responseSchemas = Arr.flatMap(resources, (resource) =>
            Option.fromUndefinedOr(resource.responseSchema).pipe(
              Option.map((schema) => ({ $ref: schema })),
              Option.toArray,
            ),
          );
          const roots = yield* Effect.succeed([
            ...operationSchemas,
            ...resourceSchemas,
            ...responseSchemas,
          ]).pipe(Effect.filterOrFail(Arr.isArrayNonEmpty));

          const normalized = yield* compilation.normalizeSchemas(
            document.openapi,
            roots,
            document.components.schemas,
          );

          const imported = yield* compilation.importSchemas(normalized, {
            patterns: "apply",
          });

          const outputCount = operationSchemas.length + resourceSchemas.length;
          const schemas = yield* Effect.succeed([
            ...Arr.take(imported, outputCount),
            ...effectSchemas,
            ...Arr.drop(imported, outputCount),
          ]).pipe(Effect.filterOrFail(Arr.isArrayNonEmpty));

          const code: SchemaRepresentation.CodeDocument =
            yield* compilation.compileSchemas(schemas, {
              referencePolicy: ({ identifier }) =>
                Option.fromUndefinedOr(identifier).pipe(
                  Option.map((name) => `Stripe${name}`),
                  Option.getOrUndefined,
                ),
            });

          return code;
        },
      );

      return { compileSchemas };
    }),
  },
) {}

export const stripeSchemaCompilerLayer = Layer.effect(
  StripeSchemaCompiler,
  StripeSchemaCompiler.make,
);
