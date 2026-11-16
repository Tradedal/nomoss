import {
  Array as Arr,
  Context,
  Effect,
  Function as Fn,
  JsonSchema,
  Layer,
  Match,
  Record,
  SchemaRepresentation,
  String as Str,
} from "effect";

/**
 * Provider generators use the same Effect normalization, import, and code
 * compilation APIs. Native compiler results retain their reference and
 * artifact contracts for emission. Conversion failures retain their native
 * cause through Effect.try.
 */
export class SchemaCompilation extends Context.Service<SchemaCompilation>()(
  "nomoss/tools/codegen/schemaCompilation",
  {
    make: Effect.sync(() => {
      /**
       * Root order stays matched to the names assigned by the provider generator.
       * Shared components normalize when the importer reads them, so a focused
       * generation run does not convert unrelated provider models. A component's
       * normalized value is reused throughout that import.
       */
      const normalizeSchemas = Effect.fn("SchemaCompilation.normalizeSchemas")(
        function* (
          version: string,
          schemas: readonly [JsonSchema.JsonSchema, ...JsonSchema.JsonSchema[]],
          definitions: JsonSchema.Definitions,
        ) {
          const normalize = Match.value(Str.startsWith("3.0.")(version)).pipe(
            Match.when(true, () => JsonSchema.fromSchemaOpenApi3_0),
            Match.orElse(() => JsonSchema.fromSchemaOpenApi3_1),
          );

          const roots = yield* Effect.try(() =>
            Arr.map(schemas, (schema) => normalize(schema).schema),
          );

          const normalizeComponent = Fn.memoize(
            (schema: JsonSchema.JsonSchema) => normalize(schema).schema,
          );
          const components: JsonSchema.Definitions = Object.defineProperties(
            {},
            Record.map(definitions, (schema) => ({
              enumerable: true,
              get: () => normalizeComponent(schema),
            })),
          );

          const document: JsonSchema.MultiDocument<"draft-2020-12"> = {
            dialect: "draft-2020-12",
            schemas: roots,
            definitions: components,
          };

          return document;
        },
      );

      /**
       * Imports the normalized document through Effect, including recursive
       * references. Callers supply native import options when their emitted
       * schemas require a particular annotation or pattern policy.
       */
      const importSchemas = Effect.fn("SchemaCompilation.importSchemas")(
        function* (
          document: JsonSchema.MultiDocument<"draft-2020-12">,
          options: SchemaRepresentation.FromJsonSchemaOptions,
        ) {
          const schemas: ReturnType<
            typeof SchemaRepresentation.fromJsonSchemaMultiDocument
          > = yield* Effect.try(() =>
            SchemaRepresentation.fromJsonSchemaMultiDocument(document, options),
          );

          return schemas;
        },
      );

      /**
       * Compiles imported schemas to Effect's CodeDocument, which supplies
       * ordered root code, references, and auxiliary artifacts for emission.
       */
      const compileSchemas = Effect.fn("SchemaCompilation.compileSchemas")(
        function* (
          schemas: ReturnType<
            typeof SchemaRepresentation.fromJsonSchemaMultiDocument
          >,
          options: SchemaRepresentation.ToRepresentationOptions = {},
        ) {
          const representations = yield* Effect.try(() =>
            SchemaRepresentation.toRepresentations(
              Arr.map(schemas, (schema) => schema.ast),
              options,
            ),
          ).pipe(Effect.withSpan("SchemaCompilation.toRepresentations"));

          const code: SchemaRepresentation.CodeDocument = yield* Effect.try(
            () => SchemaRepresentation.toCodeDocument(representations),
          ).pipe(Effect.withSpan("SchemaCompilation.toCodeDocument"));

          return code;
        },
      );

      return { normalizeSchemas, importSchemas, compileSchemas };
    }),
  },
) {}

/**
 * Supplies native schema compilation to provider generators without external
 * services or a separate runtime.
 */
export const schemaCompilationLayer = Layer.effect(
  SchemaCompilation,
  SchemaCompilation.make,
);
