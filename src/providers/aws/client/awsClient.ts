import { resolveEndpoint } from "@aws-sdk/core/client";
import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Record,
  Ref,
  Schema,
} from "effect";
import { SecureRandom } from "effect/crypto";
import {
  FetchHttpClient,
  Headers,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/http";
import { HttpApi, HttpApiClient, HttpApiGroup } from "effect/http-api";
import { ResourceCommandProgress } from "../../../core/resource/resourceCommandPolicy.js";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
  awsClientConfigLayer,
} from "./awsClientConfig.js";
import {
  type AwsJsonRpcPayload,
  type AwsOperation,
  type AwsQueryOperation,
  AwsRequestError,
  type AwsServiceDefinition,
} from "./awsClientModel.js";
import { awsHttpEndpoint, awsHttpRequest } from "./awsHttpOperation.js";
import { awsQueryOutput, awsQueryRequest } from "./awsQueryOperation.js";
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
        operation: AwsOperation,
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
        operation: AwsOperation,
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
        operation: AwsOperation,
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
                    Effect.flatMap((delay) =>
                      ResourceCommandProgress.pipe(
                        Effect.flatMap((report) =>
                          report(
                            `Retrying ${operation.name} in ${Math.round(delay)}ms`,
                          ),
                        ),
                        Effect.flatMap((reported) =>
                          Effect.logInfo("Retrying AWS request").pipe(
                            Effect.annotateLogs({
                              "aws.operation": operation.name,
                              "aws.retry.attempt": attempt,
                              "aws.retry.delay_ms": delay,
                              "aws.retry.reason": failure._tag,
                            }),
                            Effect.when(Effect.succeed(!reported)),
                          ),
                        ),
                        Effect.andThen(() => Effect.sleep(delay)),
                      ),
                    ),
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
       * The createHttpClient service method applies the resolved AWS address
       * to the operation path before signing. The generated path and query
       * parameters must reach the signer and transport together.
       *
       * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/http/HttpClientRequest.ts (prependUrl)
       */
      const createHttpClient = Effect.fn("AwsClient.createHttpClient")(
        function* (service: AwsServiceDefinition, operation: AwsOperation) {
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
                HttpClientRequest.prependUrl(address.url.toString()),
                HttpClientRequest.setHeaders(operation.headers),
              ),
            ),
            (_send, request) => {
              const signing = Arr.findFirst(
                address.properties?.authSchemes ?? [],
                (scheme) => scheme.name === "sigv4",
              );

              const context = Option.map(signing, (scheme) => ({
                ...configuration,
                Region: scheme.signingRegion ?? configuration.Region,
              })).pipe(Option.getOrElse(() => configuration));

              return execute(service, operation, context, request);
            },
          );

          return client;
        },
      );

      /**
       * The executeJson method gives HttpApiClient the modeled request and
       * expected response status for JSON operations. The supplied HTTP
       * client signs and sends the request after it has been encoded.
       *
       * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/http-api/HttpApiClient.ts (makeWith)
       */
      const executeJson = <Output, Encoded>(
        operation: AwsOperation & {
          readonly output: Schema.Codec<Output, Encoded>;
        },
        httpClient: Effect.Success<ReturnType<typeof createHttpClient>>,
        payload: AwsJsonRpcPayload,
      ) => {
        const api = HttpApi.make("AwsJsonOperation").add(
          HttpApiGroup.make("operation", { topLevel: true }).add(
            awsHttpEndpoint("execute", operation),
          ),
        );

        return HttpApiClient.makeWith(api, { httpClient }).pipe(
          Effect.flatMap((client) =>
            client.execute(awsHttpRequest(operation, payload)),
          ),
        );
      };

      /**
       * The executeQuery method uses the Smithy wire shapes for the form
       * request and XML reply. It validates the decoded reply against the
       * same Effect schema that the generated IAM client exposes.
       *
       * @see ../../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Overview)
       */
      const executeQuery = <Output, Encoded>(
        service: AwsServiceDefinition,
        operation: AwsQueryOperation & {
          readonly output: Schema.Codec<Output, Encoded>;
        },
        httpClient: Effect.Success<ReturnType<typeof createHttpClient>>,
        payload: AwsJsonRpcPayload,
      ) =>
        awsQueryRequest(service, operation, payload).pipe(
          Effect.flatMap(httpClient.execute),
          Effect.flatMap((response) =>
            awsQueryOutput(service, operation, response),
          ),
          Effect.flatMap(Schema.decodeUnknownEffect(operation.output)),
        );

      /**
       * The bindOperation service method turns a generated AWS operation into
       * a callable Effect. It encodes inputs before signing and uses the
       * operation's success schema and HTTP status to decode the response.
       *
       * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/http-api/HttpApiClient.ts (makeWith)
       */
      const bindOperation =
        (service: AwsServiceDefinition) =>
        <Input, Output, Encoded>(
          operation: AwsOperation & {
            readonly input: Schema.Codec<Input, AwsJsonRpcPayload>;
            readonly output: Schema.Codec<Output, Encoded>;
          },
        ) => {
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

              const httpClient = yield* createHttpClient(service, operation);

              const result: Output = yield* Match.value(operation).pipe(
                Match.when(
                  (
                    operation,
                  ): operation is typeof operation & AwsQueryOperation =>
                    operation.query !== undefined,
                  (query) => executeQuery(service, query, httpClient, prepared),
                ),
                Match.orElse((operation) =>
                  executeJson(operation, httpClient, prepared),
                ),
              );
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

/**
 * The awsClientLayer Layer supplies the common signing, response decoding, and
 * retry services used by generated AWS operations. Native resource commands and
 * Cloud Control commands share this client without a dependency on either
 * resource lifecycle implementation. Callers supply configuration and transport.
 */
export const awsClientLayer = Layer.effect(AwsClient, AwsClient.make).pipe(
  Layer.provide([
    Layer.effect(AwsRequestSigner, AwsRequestSigner.make),
    Layer.effect(AwsResponseDecoder, AwsResponseDecoder.make),
    Layer.effect(AwsRetryPolicy, AwsRetryPolicy.make),
    SecureRandom.layerWebCrypto,
  ]),
);

/**
 * The awsClientConfigurationLayerLive Layer supplies environment credentials and
 * fetch transport to an AWS application. Sharing this value lets resource and
 * operation clients use the same configuration within one application graph.
 */
export const awsClientConfigurationLayerLive = Layer.merge(
  awsClientConfigLayer,
  FetchHttpClient.layer,
);

/**
 * The awsClientLayerLive Layer lets a generated operation client execute with
 * environment configuration and fetch transport in its caller's Effect scope.
 */
export const awsClientLayerLive = awsClientLayer.pipe(
  Layer.provide(awsClientConfigurationLayerLive),
);
