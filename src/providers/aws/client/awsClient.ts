import { resolveEndpoint } from "@aws-sdk/core/client";
import {
  Array as Arr,
  Context,
  Effect,
  Match,
  Record,
  Ref,
  Schema,
} from "effect";
import { SecureRandom } from "effect/crypto";
import {
  Headers,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/http";
import {
  HttpApi,
  HttpApiClient,
  HttpApiEndpoint,
  HttpApiGroup,
} from "effect/http-api";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
} from "./awsClientConfig.js";
import {
  type AwsJsonRpcOperation,
  AwsJsonRpcPayload,
  AwsRequestError,
  type AwsServiceDefinition,
} from "./awsClientModel.js";
import { AwsRequestSigner } from "./awsRequestSigner.js";
import { AwsResponseDecoder } from "./awsResponseDecoder.js";
import { AwsRetryPolicy } from "./awsRetryPolicy.js";

/**
 * The AwsClient service executes generated AWS operations through their input, output, and
 * invocation contracts. Generated clients share its request preparation and
 * retry behavior, while applications provide credentials, signing, transport,
 * and error decoding through the same service graph.
 */
export class AwsClient extends Context.Service<AwsClient>()(
  "nomoss/providers/aws/client/awsClient",
  {
    make: Effect.gen(function* () {
      const config = yield* AwsClientConfig;
      const signer = yield* AwsRequestSigner;
      const decoder = yield* AwsResponseDecoder;
      const retryPolicy = yield* AwsRetryPolicy;
      const random = yield* SecureRandom.SecureRandom;
      const transport = yield* HttpClient.HttpClient;
      const redactedHeaderNames = yield* Headers.CurrentRedactedNames;

      /**
       * preparePayload supplies missing modeled idempotency tokens for one
       * logical invocation. Retries that use its encoded result retain the
       * mutation's identity when AWS receives another attempt.
       */
      const preparePayload = Effect.fn("AwsClient.preparePayload")(function* (
        operation: AwsJsonRpcOperation,
        payload: AwsJsonRpcPayload,
      ) {
        const missingTokens = Arr.filter(
          operation.idempotencyTokens,
          (token) => !Record.has(payload, token),
        );

        const prepared: AwsJsonRpcPayload = yield* Effect.reduce(
          missingTokens,
          () => payload,
          (current, token) =>
            random
              .uuidV4()
              .pipe(Effect.map((value) => Record.set(current, token, value))),
        );

        return prepared;
      });

      /**
       * sendRequest executes one prepared HTTP request with credentials
       * resolved for this attempt. Signing covers the serialized request. An
       * unsuccessful response preserves modeled provider details so the caller
       * can decide whether the operation can be retried.
       */
      const sendRequest = Effect.fn("AwsClient.sendRequest")(function* (
        service: AwsServiceDefinition,
        operation: AwsJsonRpcOperation,
        configuration: AwsClientConfiguration,
        request: HttpClientRequest.HttpClientRequest,
      ) {
        yield* Effect.annotateCurrentSpan({
          "aws.service": service.service,
          "aws.operation": operation.name,
          "aws.region": configuration.Region,
        });

        const credentials = yield* config.resolveCredentials();

        const signed = yield* signer.signRequest(request, {
          credentials,
          region: configuration.Region,
          signingName: service.signingName,
        });

        const received = yield* transport
          .postprocess(Effect.succeed(signed))
          .pipe(
            Effect.provideService(Headers.CurrentRedactedNames, [
              ...redactedHeaderNames,
              "x-amz-security-token",
            ]),
          );

        yield* Effect.annotateCurrentSpan({
          "http.response.status_code": received.status,
          "aws.request_id": received.headers["x-amzn-requestid"],
        });

        yield* Effect.when(
          decoder
            .decodeError(service, operation, received)
            .pipe(Effect.flatMap(Effect.fail)),
          Effect.succeed(received.status < 200 || received.status >= 300),
        );

        const response: HttpClientResponse.HttpClientResponse = received;

        return response;
      });

      /**
       * execute retries a prepared operation up to the configured attempt
       * limit. Attempts retain the payload and token but use fresh credentials
       * and signatures. Interruption stops local HTTP work and backoff waits.
       */
      const execute = Effect.fn("AwsClient.execute")(function* (
        service: AwsServiceDefinition,
        operation: AwsJsonRpcOperation,
        configuration: AwsClientConfiguration,
        request: HttpClientRequest.HttpClientRequest,
      ) {
        const attempts = yield* Ref.make(0);

        const response: HttpClientResponse.HttpClientResponse =
          yield* sendRequest(service, operation, configuration, request).pipe(
            Effect.retry({
              times: configuration.maxAttempts - 1,
              while: (failure) =>
                Effect.gen(function* () {
                  const retryable = Match.value(failure).pipe(
                    Match.tag("AwsServiceError", (error) => error.retryable),
                    Match.tag("HttpClientError", () => true),
                    Match.orElse(() => false),
                  );

                  const attempt = yield* Ref.updateAndGet(
                    attempts,
                    (count) => count + 1,
                  );

                  const retryAfter = Match.value(failure).pipe(
                    Match.tag("AwsServiceError", (error) => error.retryAfter),
                    Match.orElse(() => undefined),
                  );

                  yield* retryPolicy.retryDelay({ attempt, retryAfter }).pipe(
                    Effect.tap((delay) =>
                      Effect.logInfo("Retrying AWS request").pipe(
                        Effect.annotateLogs({
                          "aws.operation": operation.name,
                          "aws.retry.attempt": attempt,
                          "aws.retry.delay_ms": delay,
                          "aws.retry.reason": failure._tag,
                        }),
                      ),
                    ),
                    Effect.flatMap(Effect.sleep),
                    Effect.when(Effect.succeed(retryable)),
                  );

                  const shouldRetry: boolean = retryable;

                  return shouldRetry;
                }),
            }),
          );

        return response;
      });

      /**
       * createHttpClient configures execution for a generated operation's
       * service address and headers. Its payload must contain the invocation's
       * idempotency tokens so transport retries do not generate new identities.
       */
      const createHttpClient = Effect.fn("AwsClient.createHttpClient")(
        function* (
          service: AwsServiceDefinition,
          operation: AwsJsonRpcOperation,
        ) {
          const configuration = yield* config.resolveConfiguration();

          const address = yield* Effect.try({
            try: () =>
              resolveEndpoint(service.endpointRules, {
                endpointParams: Record.filter(
                  {
                    Region: configuration.Region,
                    UseFIPS: configuration.UseFIPS,
                    UseDualStack: configuration.UseDualStack,
                    Endpoint: configuration.Endpoint,
                  },
                  (value) => value !== undefined,
                ),
              }),
            catch: (error) =>
              new AwsRequestError({
                message: `AWS address resolution failed: ${String(error)}`,
              }),
          });

          const client = HttpClient.transform(
            HttpClient.mapRequest(transport, (request) =>
              request.pipe(
                HttpClientRequest.setUrl(address.url),
                HttpClientRequest.setHeaders(operation.headers),
              ),
            ),
            (_send, request) =>
              execute(service, operation, configuration, request),
          );

          return client;
        },
      );

      /**
       * bindOperation makes a service's generated contracts callable.
       * Input encoding and output decoding use the generated schemas, while
       * request preparation and execution remain shared across operations.
       */
      const bindOperation =
        (service: AwsServiceDefinition) =>
        <Input, Output>(
          operation: AwsJsonRpcOperation & {
            readonly input: Schema.Codec<Input, AwsJsonRpcPayload>;
            readonly output: Schema.Codec<Output, AwsJsonRpcPayload>;
          },
        ) => {
          const api = HttpApi.make("AwsJsonOperation").add(
            HttpApiGroup.make("operation", { topLevel: true }).add(
              HttpApiEndpoint.make(operation.method)(
                "execute",
                operation.path,
                {
                  payload: AwsJsonRpcPayload,
                  success: operation.output,
                },
              ),
            ),
          );

          const invoke = Effect.fn(`${service.signingName}.${operation.name}`, {
            attributes: {
              "aws.service": service.service,
              "aws.operation": operation.name,
            },
          })(
            function* (input: Input) {
              const payload: AwsJsonRpcPayload = yield* Schema.encodeEffect(
                operation.input,
              )(input);

              const prepared: AwsJsonRpcPayload = yield* preparePayload(
                operation,
                payload,
              );

              yield* Effect.annotateCurrentSpan(
                Record.filter(
                  { "aws.cloudcontrol.type_name": prepared.TypeName },
                  (value) => value !== undefined,
                ),
              );

              const client = yield* HttpApiClient.makeWith(api, {
                httpClient: yield* createHttpClient(service, operation),
              });

              const result: Output = yield* client.execute({
                payload: prepared,
              });

              return result;
            },
            Effect.annotateSpans({
              "aws.service": service.service,
              "aws.operation": operation.name,
            }),
          );

          return invoke;
        };

      return {
        preparePayload,
        sendRequest,
        execute,
        createHttpClient,
        bindOperation,
      };
    }),
  },
) {}
