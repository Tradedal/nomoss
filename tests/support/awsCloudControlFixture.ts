import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Queue,
  Ref,
  Schema,
} from "effect";
import { HttpClient, HttpClientRequest, HttpClientResponse } from "effect/http";
import { KeyValueStore } from "effect/persistence";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { awsCloudControlStackLayer } from "../../src/providers/aws/awsCloudControlRuntimeLayer.js";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
  type AwsCredentials,
} from "../../src/providers/aws/client/awsClientConfig.js";
import type { AwsJsonRpcOperation } from "../../src/providers/aws/client/awsClientModel.js";

/**
 * AwsCloudControlFixture captures requests from the production client and
 * supplies controlled HTTP responses. Successive credential lookups return
 * different sessions so retry assertions can establish credential refresh.
 */
export class AwsCloudControlFixture extends Context.Service<AwsCloudControlFixture>()(
  "nomoss/tests/support/awsCloudControlFixture",
  {
    make: Effect.gen(function* () {
      const responses = yield* Queue.unbounded<Response>();
      const requests = yield* Ref.make<ReadonlyArray<Request>>([]);
      const credentialGeneration = yield* Ref.make(0);

      const configuration: AwsClientConfiguration = {
        Region: "us-east-1",
        UseFIPS: false,
        UseDualStack: false,
        Endpoint: undefined,
        maxAttempts: 3,
      };

      const enqueueResponses = (replies: ReadonlyArray<Response>) =>
        Queue.offerAll(responses, replies).pipe(Effect.asVoid);

      const getRequests = () => Ref.get(requests);

      /**
       * requestsFor returns captured inputs for one Cloud Control operation
       * in send order, decoded through its generated contract. Workflow tests
       * can inspect resource requests separately from status polling.
       */
      const requestsFor = Effect.fn("AwsCloudControlFixture.requestsFor")(
        function* <S extends Schema.Constraint>(
          operation: AwsJsonRpcOperation & { readonly input: S },
        ) {
          const captured = yield* Ref.get(requests);

          const matching = Arr.filter(
            captured,
            (request) =>
              request.headers.get("x-amz-target") ===
              operation.headers["x-amz-target"],
          );

          const inputs: ReadonlyArray<S["Type"]> = yield* Effect.forEach(
            matching,
            (request) =>
              Effect.promise(() => request.clone().text()).pipe(
                Effect.flatMap(
                  Schema.decodeEffect(Schema.fromJsonString(operation.input)),
                ),
              ),
          );

          return inputs;
        },
      );

      const resolveCredentials = Effect.fn(
        "AwsCloudControlFixture.resolveCredentials",
      )(function* () {
        const generation = yield* Ref.updateAndGet(
          credentialGeneration,
          (count) => count + 1,
        );

        const credentials: AwsCredentials = {
          accessKeyId: `test-access-key-${generation}`,
          secretAccessKey: "test-secret-key",
          sessionToken: `test-session-token-${generation}`,
        };

        return credentials;
      });

      const transport = HttpClient.make(
        Effect.fn(function* (request) {
          const sent: Request = yield* HttpClientRequest.toWeb(request).pipe(
            Effect.orDie,
          );

          yield* Ref.update(requests, Arr.append(sent));

          const reply = yield* Queue.poll(responses).pipe(
            Effect.flatMap(Effect.fromOption),
            Effect.catch(() =>
              Effect.die(new Error(`Unexpected AWS request: ${request.url}`)),
            ),
          );

          const response: HttpClientResponse.HttpClientResponse =
            HttpClientResponse.fromWeb(request, reply);

          return response;
        }),
      );

      return {
        enqueueResponses,
        getRequests,
        requestsFor,
        resolveCredentials,
        resolveConfiguration: () => Effect.succeed(configuration),
        transport,
      };
    }),
  },
) {}

/**
 * awsCloudControlStackTestLayer runs production stack services with controlled
 * AWS HTTP responses and memory persistence. Assertions observe real request
 * generation and saved-state behavior without creating cloud resources.
 */
export const awsCloudControlStackTestLayer = awsCloudControlStackLayer.pipe(
  Layer.provideMerge([
    Layer.effect(
      HttpClient.HttpClient,
      Effect.map(AwsCloudControlFixture, (fixture) => fixture.transport),
    ),
    Layer.effect(
      AwsClientConfig,
      Effect.map(AwsCloudControlFixture, (fixture) => ({
        resolveCredentials: fixture.resolveCredentials,
        resolveConfiguration: fixture.resolveConfiguration,
      })),
    ),
  ]),
  Layer.provideMerge(
    Layer.effect(AwsCloudControlFixture, AwsCloudControlFixture.make),
  ),
  Layer.provide(StateSecretServiceDefaultLayer),
  Layer.provideMerge(KeyValueStore.layerMemory),
);
