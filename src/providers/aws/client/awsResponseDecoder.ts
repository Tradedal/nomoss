import {
  Array as Arr,
  Context,
  Effect,
  Option,
  Record,
  Schema,
  String as Str,
} from "effect";
import type { HttpClientResponse } from "effect/http";
import {
  type AwsJsonRpcOperation,
  type AwsServiceDefinition,
  AwsServiceError,
} from "./awsClientModel.js";

/**
 * AwsResponseDecoder converts unsuccessful AWS HTTP responses into provider
 * failures used by retry handling and lifecycle diagnostics. Modeled error
 * identity and details remain available to both consumers.
 */
export class AwsResponseDecoder extends Context.Service<AwsResponseDecoder>()(
  "nomoss/providers/aws/client/awsResponseDecoder",
  {
    make: Effect.sync(() => {
      /**
       * decodeError interprets an unsuccessful response through its generated
       * error contract when applicable. Responses without a usable JSON body
       * still retain HTTP status and request identity for diagnosis.
       */
      const decodeError = Effect.fn("AwsResponseDecoder.decodeError")(
        function* (
          service: AwsServiceDefinition,
          operation: AwsJsonRpcOperation,
          response: HttpClientResponse.HttpClientResponse,
        ) {
          const body: Readonly<Record<string, Schema.Json>> =
            yield* response.json.pipe(
              Effect.flatMap(
                Schema.decodeUnknownEffect(
                  Schema.Record(Schema.String, Schema.Json),
                ),
              ),
              Effect.orElseSucceed(() => ({})),
            );

          const code: string = Option.fromUndefinedOr(
            response.headers["x-amzn-errortype"],
          ).pipe(
            Option.orElse(() =>
              Record.get(body, "__type").pipe(
                Option.filter(Schema.is(Schema.String)),
              ),
            ),
            Option.map((name) => Str.split(name, "#")),
            Option.flatMap(Arr.last),
            Option.map((name) => Str.split(name, ":")[0]),
            Option.match({
              onNone: () => "UnknownError",
              onSome: (code) => code,
            }),
          );

          const modeled = Arr.findFirst(
            operation.errors,
            (error) => error.name === code,
          );

          const details = yield* Option.match(modeled, {
            onNone: () => Effect.succeed(body),
            onSome: (error) => Schema.decodeUnknownEffect(error.schema)(body),
          });

          const message = Option.fromNullishOr(body.Message).pipe(
            Option.orElse(() => Option.fromUndefinedOr(body.message)),
            Option.filter(Schema.is(Schema.String)),
            Option.match({
              onSome: (message) => message,
              onNone: () =>
                `${operation.name} failed with HTTP ${response.status} (${code})`,
            }),
          );

          const failure: AwsServiceError = new AwsServiceError({
            service: service.service,
            operation: operation.name,
            code,
            statusCode: response.status,
            requestId: Option.fromUndefinedOr(
              response.headers["x-amzn-requestid"],
            ).pipe(
              Option.orElse(() =>
                Option.fromUndefinedOr(response.headers["x-amz-request-id"]),
              ),
              Option.getOrUndefined,
            ),
            retryAfter: response.headers["retry-after"],
            message,
            retryable:
              response.status === 408 ||
              response.status === 429 ||
              response.status >= 500 ||
              Option.exists(modeled, (error) => error.retryable !== null),
            details,
          });

          return failure;
        },
      );

      return { decodeError };
    }),
  },
) {}
