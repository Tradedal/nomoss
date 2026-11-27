import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Predicate,
  Record,
  Ref,
  Schema,
  String as Str,
  Stream,
  Tuple,
} from "effect";
import { SecureRandom } from "effect/crypto";
import {
  Headers,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/http";
import { HttpApi, HttpApiClient, HttpApiGroup } from "effect/http-api";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
} from "./awsClientConfig.js";
import {
  AwsJsonRpcPayload,
  type AwsOperation,
  AwsPagination,
  type AwsQueryOperation,
  AwsRequestError,
  type AwsServiceDefinition,
} from "./awsClientModel.js";
import { awsHttpEndpoint, awsHttpRequest } from "./awsHttpOperation.js";
import { awsQueryOutput, awsQueryRequest } from "./awsQueryOperation.js";
import {
  AwsRequestSigner,
  type AwsSigningContext,
  awsRequestSignerLayer,
} from "./awsRequestSigner.js";
import { AwsResponseDecoder } from "./awsResponseDecoder.js";
import { AwsRetryPolicy } from "./awsRetryPolicy.js";
import { resolveAwsServiceAddress } from "./awsServiceAddress.js";

/**
 * The AwsRetryProgress reference lets an application show retry messages in
 * its own progress display. Return true after displaying a message to suppress
 * the client's duplicate log entry. Effect uses the default per
 * Context.Reference when the caller has no display.
 *
 * @see ../../../refs/effect/packages/effect/src/Context.ts (Reference)
 */
export const AwsRetryProgress = Context.Reference(
  "@tradedal/aws-client-core/retry-progress",
  { defaultValue: () => (_message: string) => Effect.succeed<boolean>(false) },
);

type OperationContract<Input, Output, Encoded> = AwsOperation & {
  readonly input: Schema.Codec<Input, AwsJsonRpcPayload>;
  readonly output: Schema.Codec<Output, Encoded>;
};

const PaginationToken = Schema.Union([
  Schema.NonEmptyString,
  AwsJsonRpcPayload,
]);

/**
 * The paginationMember function lets the paginator read a token even when
 * AWS places it inside a nested response object. It returns None when the
 * response omits any member of the modeled path.
 *
 * @see ../../../refs/smithy/docs/source-2.0/spec/behavior-traits.rst (Pagination paths)
 */
const paginationMember = (output: unknown, path: string) =>
  Arr.reduce(
    Str.split(path, "."),
    Option.some<unknown>(output),
    (value, member) =>
      value.pipe(
        Option.filter(Predicate.isObject),
        Option.flatMap((record) => Record.get(record, member)),
      ),
  );

/**
 * The AwsClient service executes generated AWS operations through their input, output, and
 * invocation contracts. Generated clients share its request preparation and
 * retry behavior, while applications provide credentials, signing, transport,
 * and error decoding through the same service graph.
 */
export class AwsClient extends Context.Service<AwsClient>()(
  "@tradedal/aws-client-core/awsClient",
  {
    make: Effect.gen(function* () {
      const config = yield* AwsClientConfig;
      const signer = yield* AwsRequestSigner;
      const decoder = yield* AwsResponseDecoder;
      const retryPolicy = yield* AwsRetryPolicy;
      const random = yield* SecureRandom.SecureRandom;
      const transport = yield* HttpClient.HttpClient;
      const redactedHeaderNames = yield* Headers.CurrentRedactedNames;

      const redactions = Arr.appendAll(redactedHeaderNames, [
        "x-amz-security-token",
        "x-amz-sso_bearer_token",
      ]);

      /**
       * The preparePayload service method fills in missing idempotency
       * tokens for one invocation. Reuse its result across retries so AWS
       * receives the same token on each attempt.
       *
       * @see ../../../refs/smithy/docs/source-2.0/spec/behavior-traits.rst (idempotencyToken)
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
       * The authorizeRequest operation signs with the identity available
       * for this attempt. An unsigned AWS operation can run before the
       * application has acquired credentials.
       */
      const authorizeRequest = Effect.fnUntraced(function* (
        request: HttpClientRequest.HttpClientRequest,
        signing: Option.Option<Omit<AwsSigningContext, "credentials">>,
      ) {
        const signed = yield* signing.pipe(
          Option.map((scope) =>
            config
              .resolveCredentials()
              .pipe(
                Effect.flatMap((credentials) =>
                  signer.signRequest(request, { credentials, ...scope }),
                ),
              ),
          ),
          Effect.transposeOption,
        );

        return Option.getOrElse(signed, () => request);
      });

      /**
       * The sendRequest service method lets the retry policy distinguish an AWS
       * rejection from a transport failure. Each attempt uses the credentials
       * available at the time it sends the request.
       *
       * @see ./awsRequestSigner.ts (AwsRequestSigner)
       * @see ./awsResponseDecoder.ts (AwsResponseDecoder)
       */
      const sendRequest = Effect.fn("AwsClient.sendRequest")(function* (
        service: AwsServiceDefinition,
        operation: AwsOperation,
        signing: Option.Option<Omit<AwsSigningContext, "credentials">>,
        request: HttpClientRequest.HttpClientRequest,
      ) {
        yield* Effect.annotateCurrentSpan({
          "aws.service": service.service,
          "aws.operation": operation.name,
          "aws.region": Option.map(signing, ({ region }) => region).pipe(
            Option.getOrUndefined,
          ),
        });

        const authorized = yield* authorizeRequest(request, signing);

        const received = yield* transport
          .postprocess(Effect.succeed(authorized))
          .pipe(
            Effect.provideService(Headers.CurrentRedactedNames, redactions),
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
       * The waitForRetry operation reports when the caller can expect the
       * next attempt. AWS can extend that wait with Retry-After. A stack's
       * progress display takes precedence over the client's log.
       */
      const waitForRetry = Effect.fnUntraced(function* (
        operation: string,
        attempt: number,
        retryAfter: string | undefined,
        reason: string,
      ) {
        const delay = yield* retryPolicy.retryDelay({ attempt, retryAfter });
        const report = yield* AwsRetryProgress;
        const reported = yield* report(
          `Retrying ${operation} in ${Math.round(delay)}ms`,
        );

        yield* Effect.logInfo("Retrying AWS request").pipe(
          Effect.annotateLogs({
            "aws.operation": operation,
            "aws.retry.attempt": attempt,
            "aws.retry.delay_ms": delay,
            "aws.retry.reason": reason,
          }),
          Effect.when(Effect.succeed(!reported)),
        );

        yield* Effect.sleep(delay);
      });

      /**
       * The execute service method lets callers retry a transient AWS failure
       * without changing the request's idempotency token. Interruption stops
       * local requests and retry waits.
       *
       * @see ../../../refs/effect/packages/effect/src/Effect.ts (retry)
       */
      const execute = Effect.fn("AwsClient.execute")(function* (
        service: AwsServiceDefinition,
        operation: AwsOperation,
        configuration: AwsClientConfiguration,
        signing: Option.Option<Omit<AwsSigningContext, "credentials">>,
        request: HttpClientRequest.HttpClientRequest,
      ) {
        const attempts = yield* Ref.make(0);

        /**
         * The shouldRetry operation leaves authorization and validation
         * failures with the caller and waits only for retryable failures.
         */
        const shouldRetry = Effect.fnUntraced(function* (
          failure: Effect.Error<ReturnType<typeof sendRequest>>,
        ) {
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

          yield* waitForRetry(
            operation.name,
            attempt,
            retryAfter,
            failure._tag,
          ).pipe(Effect.when(Effect.succeed(retryable)));

          return retryable;
        });

        const response: HttpClientResponse.HttpClientResponse =
          yield* sendRequest(service, operation, signing, request).pipe(
            Effect.retry({
              times: configuration.maxAttempts - 1,
              while: shouldRetry,
            }),
          );

        return response;
      });

      /**
       * The createHttpClient service method applies the resolved AWS address
       * to the operation path before signing. The generated path and query
       * parameters must reach the signer and transport together.
       *
       * @see ../../../refs/effect/packages/effect/src/http/HttpClientRequest.ts (prependUrl)
       */
      const createHttpClient = Effect.fn("AwsClient.createHttpClient")(
        function* (service: AwsServiceDefinition, operation: AwsOperation) {
          const configuration = yield* config.resolveConfiguration();

          const address = yield* resolveAwsServiceAddress(
            service.endpointRules,
            { ...configuration },
            Option.liftPredicate(
              service.signingName,
              () => operation.unsigned !== true,
            ).pipe(Option.getOrUndefined),
          );

          const client = HttpClient.transform(
            HttpClient.mapRequest(transport, (request) =>
              request.pipe(
                HttpClientRequest.prependUrl(address.url.toString()),
                HttpClientRequest.setHeaders(operation.headers),
                HttpClientRequest.setHeaders(address.headers),
              ),
            ),
            (_send, request) =>
              execute(
                service,
                operation,
                configuration,
                address.signing,
                request,
              ),
          );

          return client;
        },
      );

      /**
       * The executeJson method gives HttpApiClient the modeled request and
       * expected response status for JSON operations. The supplied HTTP
       * client signs and sends the request after it has been encoded.
       *
       * @see ../../../refs/effect/packages/effect/src/http-api/HttpApiClient.ts (makeWith)
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
       * @see ../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Overview)
       */
      const executeQuery = <Output, Encoded>(
        service: AwsServiceDefinition,
        operation: AwsQueryOperation & {
          readonly output: Schema.Codec<Output, Encoded>;
        },
        httpClient: Effect.Success<ReturnType<typeof createHttpClient>>,
        payload: AwsJsonRpcPayload,
      ) =>
        httpClient.execute(awsQueryRequest(service, operation, payload)).pipe(
          Effect.flatMap((response) => awsQueryOutput(operation, response)),
          Effect.flatMap(Schema.decodeUnknownEffect(operation.output)),
        );

      /**
       * The bindOperation service method turns a generated AWS operation into
       * a callable Effect. It encodes inputs before signing and uses the
       * operation's success schema and HTTP status to decode the response.
       *
       * @see ../../../refs/effect/packages/effect/src/http-api/HttpApiClient.ts (makeWith)
       */
      const bindOperation =
        (service: AwsServiceDefinition) =>
        <Input, Output, Encoded>(
          operation: OperationContract<Input, Output, Encoded>,
        ) => {
          /**
           * The invoke operation fills any missing idempotency token before
           * execution so retries can recover the same AWS result.
           */
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

      /**
       * The bindOperationPages service method lets a generated client read all
       * results that match one request, one response page at a time. Callers
       * can stop after any page. If AWS Query reports more results but omits
       * the continuation token, the stream fails so the caller can distinguish
       * an incomplete result from the end of the list.
       *
       * @see ../../../refs/smithy/docs/source-2.0/spec/behavior-traits.rst (Pagination client behavior)
       * @see ../../../refs/effect/packages/effect/src/Stream.ts (paginate and unwrap)
       */
      const bindOperationPages =
        (service: AwsServiceDefinition) =>
        <Input, Output, Encoded>(
          operation: OperationContract<Input, Output, Encoded>,
        ) => {
          const invoke = bindOperation(service)(operation);

          /**
           * The paginate operation reads the pagination contract before the
           * first request, so invalid model metadata fails without sending it.
           */
          const paginate = Effect.fnUntraced(function* (input: Input) {
            const pagination = yield* Schema.decodeUnknownEffect(AwsPagination)(
              operation.pagination,
            );
            const { inputToken, outputToken } = pagination;

            /**
             * The nextRequest operation leaves the original filters and
             * page size in place when it adds AWS's continuation token.
             */
            const nextRequest = Effect.fnUntraced(function* (value: unknown) {
              const token =
                yield* Schema.decodeUnknownEffect(PaginationToken)(value);

              const original = yield* Schema.encodeEffect(operation.input)(
                input,
              );
              const continued = Record.set(original, inputToken, token);

              return yield* Schema.decodeEffect(operation.input)(continued);
            });

            /**
             * The readPage operation refuses to return an incomplete
             * list as final when AWS signals a continuation without a token.
             */
            const readPage = Effect.fnUntraced(function* (request: Input) {
              const page = yield* invoke(request);

              const token = paginationMember(page, outputToken).pipe(
                Option.filter(Predicate.isNotNullish),
                Option.filter((value) => value !== ""),
                Option.filter(
                  (value) =>
                    !Predicate.isObject(value) || !Record.isEmptyRecord(value),
                ),
              );

              // A truncated AWS Query page promises a continuation, even if
              // the response omitted its marker. Report the incomplete read.
              const queryTruncated =
                operation.query !== undefined &&
                Option.contains(paginationMember(page, "IsTruncated"), true);
              const missingContinuation =
                queryTruncated && Option.isNone(token);

              yield* Effect.succeed(missingContinuation).pipe(
                Effect.filterOrFail(
                  (missing) => !missing,
                  () =>
                    new AwsRequestError({
                      message: `AWS ${operation.name} returned a truncated page without ${outputToken}`,
                    }),
                ),
              );

              const next = yield* token.pipe(
                Option.map(nextRequest),
                Effect.transposeOption,
              );

              return Tuple.make([page], next);
            });

            return Stream.paginate(input, readPage);
          });

          return (input: Input) => Stream.unwrap(paginate(input));
        };

      return { bindOperation, bindOperationPages };
    }),
  },
) {}

/**
 * Callers of generated AWS operations can use the awsClientLayer Layer with
 * their own configuration and HTTP transport. Credential refresh and signing
 * follow that configuration whether the operation comes from a stack command
 * or a direct API call.
 */
export const awsClientLayer = Layer.effect(AwsClient, AwsClient.make).pipe(
  Layer.provide([
    awsRequestSignerLayer,
    Layer.effect(AwsResponseDecoder, AwsResponseDecoder.make),
    Layer.effect(AwsRetryPolicy, AwsRetryPolicy.make),
    SecureRandom.layerWebCrypto,
  ]),
);
