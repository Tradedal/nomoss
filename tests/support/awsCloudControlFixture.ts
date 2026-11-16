import {
  Array as Arr,
  Context,
  Deferred,
  Effect,
  Layer,
  Match,
  Queue,
  Ref,
  Schema,
} from "effect";
import { HttpClient, HttpClientRequest, HttpClientResponse } from "effect/http";
import { KeyValueStore } from "effect/persistence";
import {
  type ResourceApplicationPreparation,
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { awsCloudControlStackLayer } from "../../src/providers/aws/awsCloudControlRuntimeLayer.js";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
  type AwsCredentials,
} from "../../src/providers/aws/client/awsClientConfig.js";
import type { AwsJsonRpcOperation } from "../../src/providers/aws/client/awsClientModel.js";
import { AwsCloudControlClient } from "../../src/providers/aws/client/awsCloudControlClient.js";
import { registerQueue } from "../../src/providers/aws/resources/generated/sqs/queue/index.js";

export interface PendingAwsResponse {
  readonly received: Deferred.Deferred<void>;
  readonly interrupted: Deferred.Deferred<void>;
  readonly response: Deferred.Deferred<Response>;
}

type AwsFixtureReply =
  | { readonly _tag: "Reply"; readonly response: Response }
  | { readonly _tag: "Pending"; readonly pending: PendingAwsResponse };

/**
 * AwsCloudControlFixture captures requests from the production client and
 * supplies controlled HTTP responses. Successive credential lookups return
 * different sessions so retry assertions can establish credential refresh.
 */
export class AwsCloudControlFixture extends Context.Service<AwsCloudControlFixture>()(
  "nomoss/tests/support/awsCloudControlFixture",
  {
    make: Effect.gen(function* () {
      const responses = yield* Queue.unbounded<AwsFixtureReply>();
      const requests = yield* Ref.make<ReadonlyArray<Request>>([]);
      const credentialGeneration = yield* Ref.make(0);

      const configuration = yield* Ref.make<AwsClientConfiguration>({
        Region: "us-east-1",
        UseFIPS: false,
        UseDualStack: false,
        Endpoint: undefined,
        maxAttempts: 3,
      });

      const resolveConfiguration = Effect.fn(
        "AwsCloudControlFixture.resolveConfiguration",
      )(function* () {
        const resolved: AwsClientConfiguration = yield* Ref.get(configuration);

        return resolved;
      });

      const setConfiguration = (selected: AwsClientConfiguration) =>
        Ref.set(configuration, selected);

      const enqueueResponses = (replies: ReadonlyArray<Response>) =>
        Queue.offerAll(
          responses,
          Arr.map(
            replies,
            (response): AwsFixtureReply => ({ _tag: "Reply", response }),
          ),
        ).pipe(Effect.asVoid);

      /**
       * The enqueuePendingResponse service method holds the next provider
       * request until the caller supplies a response or the application
       * interrupts it. Its signals let workflow tests observe arrival and
       * cancellation without timing assumptions.
       */
      const enqueuePendingResponse = Effect.fn(
        "AwsCloudControlFixture.enqueuePendingResponse",
      )(function* () {
        const received = yield* Deferred.make<void>();
        const interrupted = yield* Deferred.make<void>();
        const response = yield* Deferred.make<Response>();
        const pending: PendingAwsResponse = { received, interrupted, response };

        yield* Queue.offer(responses, { _tag: "Pending", pending });

        return pending;
      });

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

          const next = yield* Queue.poll(responses).pipe(
            Effect.flatMap(Effect.fromOption),
            Effect.catch(() =>
              Effect.die(new Error(`Unexpected AWS request: ${request.url}`)),
            ),
          );
          const reply: Response = yield* Match.value(next).pipe(
            Match.tag("Reply", ({ response }) => Effect.succeed(response)),
            Match.tag("Pending", ({ pending }) =>
              Deferred.succeed(pending.received, undefined).pipe(
                Effect.andThen(Deferred.await(pending.response)),
                Effect.onInterrupt(() =>
                  Deferred.succeed(pending.interrupted, undefined),
                ),
              ),
            ),
            Match.exhaustive,
          );

          const response: HttpClientResponse.HttpClientResponse =
            HttpClientResponse.fromWeb(request, reply);

          return response;
        }),
      );

      return {
        enqueueResponses,
        enqueuePendingResponse,
        getRequests,
        requestsFor,
        resolveCredentials,
        resolveConfiguration,
        setConfiguration,
        transport,
      };
    }),
  },
) {}

/**
 * The awsCloudControlConfiguredTestLayer Layer connects production stack
 * services to the test's HTTP transport and supplied storage. An application
 * can reopen those services while the test retains its provider responses and
 * saved resources.
 */
export const awsCloudControlConfiguredTestLayer =
  awsCloudControlStackLayer.pipe(
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
    Layer.provide(StateSecretServiceDefaultLayer),
  );

export const awsCloudControlStackTestLayer =
  awsCloudControlConfiguredTestLayer.pipe(
    Layer.provideMerge(
      Layer.effect(AwsCloudControlFixture, AwsCloudControlFixture.make),
    ),
    Layer.provideMerge(KeyValueStore.layerMemory),
  );

/**
 * The awsStackOperationsTestLayer Layer keeps its transport fixture and storage
 * in the enclosing test scope. Separate application scopes can restore saved
 * identities while owning independent engine services and reviewed plans.
 */
export const awsStackOperationsTestLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(awsCloudControlConfiguredTestLayer),
);

export const awsConfiguredStackTestLayer = Layer.merge(
  Layer.effect(AwsCloudControlFixture, AwsCloudControlFixture.make),
  KeyValueStore.layerMemory,
);

/**
 * The declareQueueStack Effect prepares a queue through the supplied application
 * graph. Its callback returns the queue URL after apply. Run it again before a
 * later application operation to restore current saved values.
 */
export const declareQueueStack = Effect.fn(
  "AwsCloudControlFixture.declareQueueStack",
)(function* (stackName: string, queueName = "selected-application") {
  const operations = yield* ResourceStackOperations;
  yield* operations.beginDeclaration(stackName);
  const queue = yield* registerQueue({
    key: { logicalId: "Queue" },
    props: { QueueName: queueName },
  });

  const prepared: ResourceApplicationPreparation<{
    readonly queueUrl: string;
  }> = yield* operations.prepare(stackName, () => ({
    queueUrl: queue.outputs.QueueUrl,
  }));
  return prepared;
}, Effect.scoped);

/**
 * The declareQueueLookupStack Effect keeps a provider lookup pending during
 * declaration. Planning must stop that lookup before returning its reviewed
 * queue changes while retaining the provider services needed to execute them.
 */
export const declareQueueLookupStack = Effect.fn(
  "AwsCloudControlFixture.declareQueueLookupStack",
)(function* (stackName: string, pending: PendingAwsResponse) {
  const operations = yield* ResourceStackOperations;
  yield* operations.beginDeclaration(stackName);
  const client = yield* AwsCloudControlClient;

  yield* client
    .getResource({
      TypeName: "AWS::SQS::Queue",
      Identifier: "reference-queue",
    })
    .pipe(Effect.forkScoped);
  yield* Deferred.await(pending.received);

  const queue = yield* registerQueue({
    key: { logicalId: "Queue" },
    props: { QueueName: "selected-application" },
  });

  const prepared: ResourceApplicationPreparation<{
    readonly queueUrl: string;
  }> = yield* operations.prepare(stackName, () => ({
    queueUrl: queue.outputs.QueueUrl,
  }));
  return prepared;
}, Effect.scoped);
