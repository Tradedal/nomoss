import { AwsQueryWire } from "@tradedal/aws-client-core/model";
import { Schema } from "effect";

const JsonObject = Schema.Record(Schema.String, Schema.Json);
const Identifier = Schema.String.check(
  Schema.isPattern(/^[A-Za-z_][A-Za-z0-9_]*$/),
);

/**
 * The SmithyDependencies schema lets generation check the version and
 * checksum of every artifact before it compiles or runs the converter.
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
 * The AwsOpenApiService schema requires the rules the client uses to sign
 * requests in the region selected by AWS. Global IAM routes can specify a
 * signing region different from the region configured by the application.
 *
 * @see ../../refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst (Rule set and parameter objects)
 */
export const AwsOpenApiService = Schema.Struct({
  service: Schema.NonEmptyString,
  version: Schema.NonEmptyString,
  protocol: Schema.Literals(["awsJson1_0", "restJson1", "awsQuery"]),
  signingName: Schema.NonEmptyString,
  endpointRules: Schema.Struct({
    version: Schema.NonEmptyString,
    parameters: Schema.Record(
      Schema.String,
      Schema.Struct({
        type: Schema.Literals(["String", "string", "Boolean", "boolean"]),
        required: Schema.optionalKey(Schema.Boolean),
        default: Schema.optionalKey(
          Schema.Union([Schema.String, Schema.Boolean]),
        ),
      }),
    ),
    rules: Schema.Array(JsonObject),
  }),
  xmlNamespace: Schema.optionalKey(Schema.NonEmptyString),
});

/**
 * The AwsOpenApiError schema preserves the AWS error name, status, and retry
 * traits so the client can decode the failure before applying a retry policy.
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
 * bindings that the REST JSON extension adds beside the OpenAPI body. The
 * member-name mapping lets resource codecs use modeled names when the wire
 * uses different names, such as `RouteKey` in Nomoss and `routeKey` on AWS.
 *
 * @see ../../refs/smithy/docs/source-2.0/spec/protocol-traits.rst (jsonName)
 */
export const AwsRestRequest = Schema.TaggedStruct("Rest", {
  "x-aws-member-names": Schema.optionalKey(
    Schema.Struct({
      input: Schema.Record(Schema.String, Schema.String),
      output: Schema.Record(Schema.String, Schema.String),
    }),
  ),
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
  "x-aws-query": AwsQueryWire,
});

/**
 * The AwsOpenApiOperation schema requires the response contracts used to
 * compile operation decoders. It also carries the token metadata the client
 * needs to reuse a request on retry or request the next response page.
 */
export const AwsOpenApiOperation = Schema.Struct({
  operationId: Identifier,
  responses: Schema.Record(Schema.String, Response),
  "x-aws-idempotency-tokens": Schema.Array(Identifier),
  "x-aws-pagination": JsonObject,
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
    Schema.Record(
      Schema.String,
      Schema.Struct({
        operationId: Identifier,
        description: Schema.optionalKey(Schema.String),
      }),
    ),
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
  readonly description: string | undefined;
  readonly memberNames: (typeof AwsRestRequest.Type)["x-aws-member-names"];
  readonly name: string;
  readonly unsigned: true | undefined;
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
  readonly errors: ReadonlyArray<typeof AwsOpenApiError.Type>;
}
