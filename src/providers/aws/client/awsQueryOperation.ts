import {
  type QuerySerializerSettings,
  QueryShapeSerializer,
  type XmlSettings,
  XmlShapeDeserializer,
} from "@aws-sdk/core/protocols";
import type { DocumentSchema, TimestampDateTimeSchema } from "@smithy/types";
import { Effect, Match, Option, Record, Schema, String as Str } from "effect";
import { HttpClientRequest, type HttpClientResponse } from "effect/http";
import {
  type AwsJsonRpcPayload,
  type AwsQueryOperation,
  AwsRequestError,
  type AwsServiceDefinition,
} from "./awsClientModel.js";

const settings = (
  service: AwsServiceDefinition,
): QuerySerializerSettings & XmlSettings => ({
  serviceNamespace: Str.split("#")(service.service)[0],
  xmlNamespace: service.xmlNamespace ?? "",
  httpBindings: false,
  serializeEmptyLists: true,
  timestampFormat: {
    useTrait: true,
    default: 5 satisfies TimestampDateTimeSchema,
  },
});

/**
 * The awsQueryRequest function supplies the action and API version required
 * by AWS Query. The SDK serializer applies modeled names and list encoding
 * before the shared AWS client signs the request body.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Operation request serialization)
 * @see ../../../../refs/aws-sdk-js-v3/packages-internal/core/src/submodules/protocols/query/QueryShapeSerializer.ts (write and flush)
 */
export const awsQueryRequest = Effect.fn("AwsQuery.request")(function* (
  service: AwsServiceDefinition,
  operation: AwsQueryOperation,
  payload: AwsJsonRpcPayload,
) {
  const members = yield* Effect.try({
    try: () => {
      const serializer = new QueryShapeSerializer(settings(service));

      serializer.write(operation.query.input, payload);

      return serializer.flush();
    },
    catch: () =>
      new AwsRequestError({
        message: `Could not serialize ${operation.name} as AWS Query`,
      }),
  }).pipe(Effect.flatMap(Schema.decodeUnknownEffect(Schema.String)));

  const parameters = new URLSearchParams({
    Action: operation.name,
    Version: service.version,
  });

  const body = `${parameters}${members}`;

  return HttpClientRequest.post(operation.path).pipe(
    HttpClientRequest.bodyText(body, "application/x-www-form-urlencoded"),
  );
});

/**
 * The awsQueryOutput function uses the generated Smithy result shape to read
 * the operation's XML result. The JSON encoding preserves the date strings
 * used by Nomoss's generated Effect schemas.
 *
 * @see ../../../../refs/aws-sdk-js-v3/packages-internal/core/src/submodules/protocols/query/AwsQueryProtocol.ts (deserializeResponse)
 */
export const awsQueryOutput = (
  service: AwsServiceDefinition,
  operation: AwsQueryOperation,
  response: HttpClientResponse.HttpClientResponse,
) =>
  Match.value(operation.query.output).pipe(
    Match.when("unit", () => Effect.succeed(undefined)),
    Match.orElse((shape) =>
      response.text.pipe(
        Effect.flatMap((xml) =>
          Effect.try({
            try: (): unknown =>
              new XmlShapeDeserializer(settings(service)).read(
                shape,
                xml,
                `${operation.name}Result`,
              ),
            catch: () =>
              new AwsRequestError({
                message: `Could not decode the ${operation.name} AWS Query response`,
              }),
          }),
        ),
        Effect.flatMap(
          Schema.encodeEffect(Schema.fromJsonString(Schema.Unknown)),
        ),
        Effect.flatMap(
          Schema.decodeEffect(Schema.fromJsonString(Schema.JsonObject)),
        ),
      ),
    ),
  );

/**
 * The awsQueryErrorBody function reads the error fields used by the common
 * decoder. AWS Query returns the provider code and request ID as XML fields.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Operation error serialization)
 */
export const awsQueryErrorBody = (
  service: AwsServiceDefinition,
  response: HttpClientResponse.HttpClientResponse,
) =>
  response.text.pipe(
    Effect.flatMap((xml) =>
      Effect.try({
        try: (): unknown =>
          new XmlShapeDeserializer(settings(service)).read(
            15 satisfies DocumentSchema,
            xml,
          ),
        catch: () =>
          new AwsRequestError({
            message: "Could not decode AWS Query error response",
          }),
      }),
    ),
    Effect.flatMap(
      Schema.decodeUnknownEffect(
        Schema.Struct({
          Error: Schema.JsonObject,
          RequestId: Schema.optionalKey(Schema.String),
        }),
      ),
    ),
    Effect.map(({ Error: fields, RequestId }) =>
      Option.fromUndefinedOr(RequestId).pipe(
        Option.match({
          onNone: () => fields,
          onSome: (id) => Record.set(fields, "RequestId", id),
        }),
      ),
    ),
  );
