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
  protocol: Schema.Literal("awsJson1_0"),
  signingName: Schema.NonEmptyString,
  endpointRules: JsonObject,
});

/**
 * AwsOpenApiError preserves modeled failure identity and retry traits beside
 * the error's schema. Generated error decoding and retry decisions can
 * then interpret the same provider failure consistently.
 */
export const AwsOpenApiError = Schema.Struct({
  name: Identifier,
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
 * AwsOpenApiOperation validates the POST contract published by Smithy's
 * converter. Protocol extensions preserve invocation rules used by token
 * preparation, error decoding, pagination, and polling in generated clients.
 */
export const AwsOpenApiOperation = Schema.Struct({
  operationId: Identifier,
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
  responses: Schema.Record(Schema.String, Response),
  "x-aws-idempotency-tokens": Schema.Array(Identifier),
  "x-aws-pagination": JsonObject,
  "x-aws-waiters": JsonObject,
});

/**
 * AwsOpenApiDocument represents one AWS JSON operation because Cloud Control
 * selects operations by a target header on the same POST / route. These
 * persisted documents supply Effect schema and client generation.
 */
export const AwsOpenApiDocument = Schema.Struct({
  openapi: Schema.Literal("3.1.0"),
  info: Schema.Struct({ title: Schema.String, version: Schema.String }),
  paths: Schema.Record(
    Schema.TemplateLiteral(["/", Schema.String]),
    Schema.Struct({ post: AwsOpenApiOperation }),
  ),
  components: Schema.Struct({ schemas: Schema.Record(Identifier, JsonObject) }),
  "x-aws-service": AwsOpenApiService,
});

export type AwsOpenApiDocument = typeof AwsOpenApiDocument.Type;

/**
 * AwsOpenApiInvocation associates an operation's HTTP and AWS execution rules
 * with its compiled schema names. Client emission uses those associations to
 * bind invocation and validation to the same OpenAPI definition.
 */
export interface AwsOpenApiInvocation {
  readonly name: string;
  readonly method: "POST";
  readonly path: `/${string}`;
  readonly input: string;
  readonly output: string | null;
  readonly headers: Readonly<Record<string, string>>;
  readonly idempotencyTokens: ReadonlyArray<string>;
  readonly pagination: Readonly<Record<string, Schema.Json>>;
  readonly waiters: Readonly<Record<string, Schema.Json>>;
  readonly errors: ReadonlyArray<typeof AwsOpenApiError.Type>;
}
