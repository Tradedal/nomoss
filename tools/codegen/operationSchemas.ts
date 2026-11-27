import { Schema, Tuple } from "effect";

/**
 * The OperationJsonSchema schema accepts boolean and JSON-object definitions
 * for Effect normalization and import, which determine the schema keywords
 * that compilation supports.
 */
export const OperationJsonSchema = Schema.Union([
  Schema.Boolean,
  Schema.JsonObject,
]);

/**
 * The OperationContent schema lets request and response preparation distinguish
 * declared media types from their optional schemas. An omitted schema leaves
 * the content shape unspecified, and the media type's JSON metadata remains
 * available.
 */
export const OperationContent = Schema.Record(
  Schema.NonEmptyString,
  Schema.StructWithRest(
    Schema.Struct({ schema: Schema.optionalKey(OperationJsonSchema) }),
    [Schema.JsonObject],
  ),
);

/**
 * The OperationParameter schema keeps requiredness and serialization options
 * with their parameter's request location for request preparation. Each
 * parameter must declare either a schema or content.
 */
export const OperationParameter = Schema.Union([
  Schema.Struct({
    schema: OperationJsonSchema,
    content: Schema.optionalKey(Schema.Never),
  }),
  Schema.Struct({
    content: OperationContent,
    schema: Schema.optionalKey(Schema.Never),
  }),
]).mapMembers(
  Tuple.map(
    Schema.fieldsAssign({
      name: Schema.NonEmptyString,
      location: Schema.Literals(["path", "query", "header", "cookie"]),
      required: Schema.Boolean,
      schemaPath: Schema.optionalKey(Schema.NonEmptyString),
      style: Schema.optionalKey(Schema.String),
      explode: Schema.optionalKey(Schema.Boolean),
      allowReserved: Schema.optionalKey(Schema.Boolean),
    }),
  ),
);

/**
 * The OperationRequestBody schema keeps body requiredness independent of the
 * required properties within each media schema. Operation preparation names
 * each declared media alternative.
 */
export const OperationRequestBody = Schema.Struct({
  required: Schema.Boolean,
  content: OperationContent,
});

/**
 * The OperationResponse schema lets response preparation distinguish an empty
 * body from unspecified content. Absent or empty content means an empty body.
 * a media entry without a schema means unspecified content. Declared headers
 * and links remain available alongside the content.
 */
export const OperationResponse = Schema.Struct({
  description: Schema.optionalKey(Schema.String),
  content: Schema.optionalKey(OperationContent),
  headers: Schema.optionalKey(Schema.JsonObject),
  links: Schema.optionalKey(Schema.JsonObject),
});

/**
 * The OperationResponseStatus schema restricts response declarations to exact
 * HTTP statuses, class ranges such as 2XX, and the default response key.
 */
export const OperationResponseStatus = Schema.String.check(
  Schema.isPattern(/^(?:[1-5](?:[0-9]{2}|XX)|default)$/),
);

/**
 * The ClientOperation schema preserves request body alternatives, responses,
 * and provider extensions after runtime schema selection so schema preparation
 * retains the resolved HTTP operation's declarations.
 */
export const ClientOperation = Schema.Struct({
  operationId: Schema.NonEmptyString,
  description: Schema.optional(Schema.String),
  method: Schema.Literals([
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "OPTIONS",
    "HEAD",
    "PATCH",
    "TRACE",
  ]),
  path: Schema.String.check(Schema.isPattern(/^\//)),
  parameters: Schema.Array(OperationParameter),
  requestBody: Schema.optionalKey(OperationRequestBody),
  responses: Schema.Record(OperationResponseStatus, OperationResponse),
  extensions: Schema.JsonObject,
});

export type ClientOperation = typeof ClientOperation.Type;
