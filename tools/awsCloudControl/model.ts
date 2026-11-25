import { Schema } from "effect";

const JsonObject = Schema.Record(Schema.String, Schema.Json);
const Identifier = Schema.String.check(
  Schema.isPattern(/^[A-Za-z_][A-Za-z0-9_]*$/),
);

/**
 * SmithyDependencies identifies the pinned converter artifacts and checksums
 * accepted by generation. A mismatched artifact cannot be used to compile or
 * execute the OpenAPI converter.
 */
export const SmithyDependencies = Schema.Struct({
  version: Schema.NonEmptyString,
  artifacts: Schema.NonEmptyArray(
    Schema.Struct({
      name: Schema.NonEmptyString,
      sha256: Schema.NonEmptyString,
    }),
  ),
});

/**
 * AwsOpenApiService retains the service identity and execution rules emitted
 * by the Smithy extension. The internal client uses this metadata to address
 * and sign generated operations for the selected region.
 */
export const AwsOpenApiService = Schema.Struct({
  service: Schema.NonEmptyString,
  version: Schema.NonEmptyString,
  protocol: Schema.Literals(["awsJson1_0", "restJson1", "awsQuery"]),
  signingName: Schema.NonEmptyString,
  endpointRules: JsonObject,
  xmlNamespace: Schema.optionalKey(Schema.NonEmptyString),
});

/**
 * AwsOpenApiError preserves modeled failure identity and retry traits beside
 * the error's schema. Generated error decoding and retry decisions can
 * then interpret the same provider failure consistently.
 */
export const AwsOpenApiError = Schema.Struct({
  name: Identifier,
  code: Schema.optionalKey(Schema.NonEmptyString),
  fault: Schema.Literals(["client", "server"]),
  httpStatus: Schema.Int,
  retryable: Schema.NullOr(JsonObject),
});

/**
 * OpenApiComponentReference identifies a shared schema used by operation
 * requests and responses. Only references to named components in the same
 * document are accepted by this generation contract.
 */
export const OpenApiComponentReference = Schema.Struct({
  $ref: Schema.String.check(
    Schema.isPattern(/^#\/components\/schemas\/[A-Za-z_][A-Za-z0-9_]*$/),
  ),
});

export type AwsOpenApiReference = typeof OpenApiComponentReference.Type;

const ResponseSchema = Schema.Union([
  OpenApiComponentReference,
  Schema.Struct({ anyOf: Schema.NonEmptyArray(OpenApiComponentReference) }),
]);

/**
 * The AwsOpenApiResponseContent schema retains the modeled errors and success
 * payloads used to compile decoding schemas. A declared error response must
 * supply content for the operation's protocol before generation can continue.
 */
export const AwsOpenApiResponseContent = Schema.Record(
  Schema.String,
  Schema.Struct({ schema: ResponseSchema }),
);

const Response = Schema.Struct({
  content: Schema.optionalKey(AwsOpenApiResponseContent),
});

/**
 * The AwsRpcRequest schema validates the target header and body reference
 * that the AWS JSON 1.0 extension adds to each operation.
 */
export const AwsRpcRequest = Schema.TaggedStruct("Rpc", {
  parameters: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      in: Schema.Literal("header"),
      required: Schema.Boolean,
      schema: Schema.Struct({ enum: Schema.NonEmptyArray(Schema.String) }),
    }),
  ),
  requestBody: Schema.Struct({
    required: Schema.Boolean,
    content: Schema.Record(
      Schema.String,
      Schema.Struct({ schema: OpenApiComponentReference }),
    ),
  }),
});

/**
 * The AwsRestRequest schema validates the complete input reference and HTTP
 * field bindings that the REST JSON extension adds beside the OpenAPI body.
 */
export const AwsRestRequest = Schema.TaggedStruct("Rest", {
  "x-aws-input": OpenApiComponentReference,
  "x-aws-errors": Schema.Array(OpenApiComponentReference),
  "x-aws-http-bindings": Schema.Record(
    Schema.String,
    Schema.Struct({
      location: Schema.Literals(["LABEL", "QUERY", "HEADER"]),
      name: Schema.NonEmptyString,
    }),
  ),
});

/**
 * The AwsQueryRequest schema retains the logical input and Smithy wire
 * schemas from the Query projection. The serializer uses the wire schemas
 * to preserve XML member names and collection encodings.
 */
export const AwsQueryRequest = Schema.TaggedStruct("Query", {
  "x-aws-input": OpenApiComponentReference,
  "x-aws-errors": Schema.Array(OpenApiComponentReference),
  "x-aws-query": Schema.Struct({
    input: Schema.Json,
    output: Schema.Json,
  }),
});

/**
 * The AwsOpenApiOperation schema validates responses and the metadata needed
 * to preserve tokens, pagination, and waiters in the generated operation.
 */
export const AwsOpenApiOperation = Schema.Struct({
  operationId: Identifier,
  responses: Schema.Record(Schema.String, Response),
  "x-aws-idempotency-tokens": Schema.Array(Identifier),
  "x-aws-pagination": JsonObject,
  "x-aws-waiters": JsonObject,
});

/**
 * The AwsOpenApiMethod schema limits generation to methods that the AWS HTTP
 * client can put in a request.
 */
export const AwsOpenApiMethod = Schema.Literals([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
]);

/**
 * The AwsOpenApiDocument schema validates the service metadata and components
 * that generation reads from one operation document. A separate document for
 * each AWS JSON 1.0 operation preserves its target header on the shared path.
 */
export const AwsOpenApiDocument = Schema.Struct({
  openapi: Schema.Literal("3.1.0"),
  info: Schema.Struct({ title: Schema.String, version: Schema.String }),
  paths: Schema.Record(
    Schema.TemplateLiteral(["/", Schema.String]),
    Schema.Record(Schema.String, Schema.Struct({ operationId: Identifier })),
  ),
  components: Schema.Struct({ schemas: Schema.Record(Identifier, JsonObject) }),
  "x-aws-service": AwsOpenApiService,
});

export type AwsOpenApiDocument = typeof AwsOpenApiDocument.Type;

/**
 * The AwsOpenApiInvocation interface associates HTTP and AWS execution rules
 * with its compiled schema names. Client emission uses those associations to
 * bind invocation and validation to the same OpenAPI definition.
 */
export interface AwsOpenApiInvocation {
  readonly name: string;
  readonly method: typeof AwsOpenApiMethod.Type;
  readonly path: `/${string}`;
  readonly query: (typeof AwsQueryRequest.Type)["x-aws-query"] | undefined;
  readonly input: string;
  readonly output: string | null;
  readonly headers: Readonly<Record<string, string>>;
  readonly rest:
    | {
        readonly bindings: (typeof AwsRestRequest.Type)["x-aws-http-bindings"];
        readonly status: number;
        readonly body: boolean;
      }
    | undefined;
  readonly idempotencyTokens: ReadonlyArray<string>;
  readonly pagination: Readonly<Record<string, Schema.Json>>;
  readonly waiters: Readonly<Record<string, Schema.Json>>;
  readonly errors: ReadonlyArray<typeof AwsOpenApiError.Type>;
}
