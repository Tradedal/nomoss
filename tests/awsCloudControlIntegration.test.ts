import { assert, layer } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  Fiber,
  Match,
  Ref,
  Schema,
  Stream,
} from "effect";
import { TestClock } from "effect/testing";
import {
  PlanDecision,
  ResourceCommand,
} from "../src/core/resource/lifecycle.js";
import type { ResourceNode } from "../src/core/resource/model.js";
import { ResourceCommandPolicy } from "../src/core/resource/resourceCommandPolicy.js";
import { AwsCloudControlRequestTracker } from "../src/providers/aws/awsCloudControlRequestTracker.js";
import { AwsCloudControlClient } from "../src/providers/aws/client/awsCloudControlClient.js";
import {
  CancelResourceRequestInput,
  CreateResourceInput,
  ListResourcesInput,
  UpdateResourceInput,
} from "../src/providers/aws/client/generated/cloudControl.js";
import {
  AwsCloudControlFixture,
  awsCloudControlStackTestLayer,
} from "./support/awsCloudControlFixture.js";
import { cloudControlQueue } from "./support/awsResourceDefinitionFixture.js";

layer(awsCloudControlStackTestLayer, { buildPerTest: true })(
  "AwsCloudControlClient",
  (it) => {
    it.effect(
      "Cloud Control requests use the supplied AWS session credentials",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const client = yield* AwsCloudControlClient;

          yield* fixture.enqueueResponses([
            Response.json({ ProgressEvent: { RequestToken: "request-1" } }),
          ]);

          const result = yield* client.createResource({
            TypeName: "AWS::SQS::Queue",
            DesiredState: "{}",
          });

          const [request] = yield* fixture.getRequests();

          const payload = yield* Effect.promise(() => request.text()).pipe(
            Effect.flatMap(
              Schema.decodeEffect(Schema.fromJsonString(CreateResourceInput)),
            ),
          );

          assert.strictEqual(result.ProgressEvent?.RequestToken, "request-1");
          assert.strictEqual(
            request.headers.get("content-type"),
            "application/x-amz-json-1.0",
          );
          assert.strictEqual(
            request.headers.get("x-amz-security-token"),
            "test-session-token-1",
          );
          assert.include(
            request.headers.get("authorization"),
            "/us-east-1/cloudcontrolapi/aws4_request",
          );
          assert.match(
            request.headers.get("authorization") ?? "",
            /SignedHeaders=[^,]*content-type[^,]*x-amz-target/,
          );
          assert.isString(payload.ClientToken);
          assert.strictEqual(payload.DesiredState, "{}");
        }),
    );

    it.effect(
      "Throttled changes retry with fresh credentials and the original request token",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const client = yield* AwsCloudControlClient;

          yield* fixture.enqueueResponses([
            Response.json(
              { __type: "ThrottlingException", Message: "Slow down" },
              { status: 429 },
            ),
            Response.json({ ProgressEvent: { RequestToken: "request-1" } }),
          ]);

          const pending = yield* Effect.forkChild(
            client.createResource({
              TypeName: "AWS::SQS::Queue",
              DesiredState: "{}",
            }),
          );

          yield* TestClock.adjust("30 seconds");

          const result = yield* Fiber.join(pending);
          const sent = yield* fixture.getRequests();
          const bodies = yield* Effect.forEach(sent, (request) =>
            Effect.promise(() => request.text()),
          );

          assert.strictEqual(result.ProgressEvent?.RequestToken, "request-1");
          assert.strictEqual(sent.length, 2);
          assert.strictEqual(bodies[0], bodies[1]);
          assert.include(
            sent[0].headers.get("authorization"),
            "Credential=test-access-key-1/",
          );
          assert.include(
            sent[1].headers.get("authorization"),
            "Credential=test-access-key-2/",
          );
          assert.strictEqual(
            sent[1].headers.get("x-amz-security-token"),
            "test-session-token-2",
          );
        }),
    );

    it.effect("Repeated pagination tokens stop resource listing", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const client = yield* AwsCloudControlClient;

        yield* fixture.enqueueResponses([
          Response.json({ NextToken: "page-a", ResourceDescriptions: [] }),
          Response.json({ NextToken: "page-b", ResourceDescriptions: [] }),
          Response.json({ NextToken: "page-a", ResourceDescriptions: [] }),
        ]);

        const failure = yield* client
          .listResourceDescriptions({ TypeName: "AWS::SQS::Queue" })
          .pipe(Stream.runDrain, Effect.flip);

        assert.strictEqual(failure._tag, "AwsRequestError");
        assert.strictEqual(
          failure.message,
          "Cloud Control returned a repeated pagination token",
        );
        assert.strictEqual((yield* fixture.getRequests()).length, 3);
      }),
    );

    it.effect("A pending AWS change waits until its suggested retry time", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const client = yield* AwsCloudControlClient;

        yield* fixture.enqueueResponses([
          Response.json(
            {
              __type: "ServiceUnavailableException",
              message: "Unavailable",
            },
            { status: 503, headers: { "retry-after": "10" } },
          ),
          Response.json({ ProgressEvent: { RequestToken: "request-1" } }),
        ]);

        const pending = yield* Effect.forkChild(
          client.createResource({
            TypeName: "AWS::SQS::Queue",
            DesiredState: "{}",
          }),
        );

        yield* TestClock.adjust("9 seconds");

        assert.strictEqual((yield* fixture.getRequests()).length, 1);

        yield* TestClock.adjust("1 second");

        const result = yield* Fiber.join(pending);

        assert.strictEqual(result.ProgressEvent?.RequestToken, "request-1");
        assert.strictEqual((yield* fixture.getRequests()).length, 2);
      }),
    );

    it.effect(
      "AWS request failures include the provider's diagnostic details",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const client = yield* AwsCloudControlClient;

          yield* fixture.enqueueResponses([
            Response.json(
              { message: "Permission denied" },
              {
                status: 403,
                headers: {
                  "x-amzn-errortype": "AccessDeniedException:http",
                  "x-amzn-requestid": "request-1",
                },
              },
            ),
          ]);

          const failure = yield* client
            .getResource({
              TypeName: "AWS::SQS::Queue",
              Identifier: "queue-1",
            })
            .pipe(Effect.flip);

          assert.strictEqual(failure._tag, "AwsServiceError");

          const error = Match.value(failure).pipe(
            Match.tag("AwsServiceError", (error) => error),
            Match.orElse(() => assert.fail("Expected an AWS service error")),
          );

          assert.strictEqual(error.code, "AccessDeniedException");
          assert.strictEqual(error.message, "Permission denied");
          assert.strictEqual(error.requestId, "request-1");
          assert.strictEqual((yield* fixture.getRequests()).length, 1);
        }),
    );

    it.effect("Cancelling an AWS operation uses its saved request token", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const client = yield* AwsCloudControlClient;

        yield* fixture.enqueueResponses([
          Response.json({
            ProgressEvent: { OperationStatus: "CANCEL_IN_PROGRESS" },
          }),
        ]);

        const result = yield* client.cancelResourceRequest({
          RequestToken: "request-1",
        });

        const [request] = yield* fixture.getRequests();

        const payload = yield* Effect.promise(() => request.text()).pipe(
          Effect.flatMap(
            Schema.decodeEffect(
              Schema.fromJsonString(CancelResourceRequestInput),
            ),
          ),
        );

        assert.strictEqual(
          result.ProgressEvent?.OperationStatus,
          "CANCEL_IN_PROGRESS",
        );
        assert.strictEqual(payload.RequestToken, "request-1");
        assert.strictEqual(
          request.headers.get("x-amz-target"),
          "CloudApiService.CancelResourceRequest",
        );
      }),
    );

    it.effect(
      "AWS resource polling can complete before a distant retry time",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const tracker = yield* AwsCloudControlRequestTracker;
          const completed = yield* Ref.make(false);

          yield* fixture.enqueueResponses([
            Response.json({
              ProgressEvent: { OperationStatus: "IN_PROGRESS", RetryAfter: 60 },
            }),
            Response.json({
              ProgressEvent: {
                OperationStatus: "SUCCESS",
                Identifier: "queue-1",
              },
            }),
          ]);

          const pending = yield* Effect.forkChild(
            tracker
              .awaitResourceRequest({
                typeName: "AWS::SQS::Queue",
                requestToken: "request-1",
              })
              .pipe(Effect.tap(() => Ref.set(completed, true))),
          );

          yield* TestClock.adjust("4 seconds");

          assert.isFalse(yield* Ref.get(completed));

          yield* TestClock.adjust("1 second");

          assert.strictEqual(
            (yield* Fiber.join(pending)).Identifier,
            "queue-1",
          );
        }),
    );

    it.effect("Failed AWS changes report the provider's reason", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const tracker = yield* AwsCloudControlRequestTracker;

        yield* fixture.enqueueResponses([
          Response.json({
            ProgressEvent: {
              OperationStatus: "FAILED",
              ErrorCode: "AccessDenied",
              StatusMessage: "Queue creation denied",
            },
          }),
        ]);

        const failure = yield* tracker
          .awaitResourceRequest({
            typeName: "AWS::SQS::Queue",
            requestToken: "request-1",
          })
          .pipe(Effect.flip);
        const error = Match.value(failure).pipe(
          Match.tag("AwsCloudControlOperationFailed", (error) => error),
          Match.orElse(() =>
            assert.fail("Expected a remote operation failure"),
          ),
        );

        assert.strictEqual(error.errorCode, "AccessDenied");
        assert.strictEqual(error.message, "Queue creation denied");
      }),
    );
  },
);

layer(awsCloudControlStackTestLayer, { buildPerTest: true })(
  "AWS resource commands",
  (it) => {
    it.effect("An AWS denial fails the resource command", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const commands = yield* ResourceCommandPolicy;

        const queue = yield* cloudControlQueue;

        yield* fixture.enqueueResponses([
          Response.json(
            { message: "Permission denied" },
            {
              status: 403,
              headers: { "x-amzn-errortype": "AccessDeniedException" },
            },
          ),
        ]);

        const command: ResourceCommand = ResourceCommand.Apply({
          decision: PlanDecision.Create({ node: queue }),
        });

        const failure = yield* commands.execute(command).pipe(Effect.flip);

        assert.strictEqual(failure._tag, "ResourceCommandExecutionFailed");
        assert.strictEqual(failure.cause._tag, "AwsCloudControlRequestFailed");
        assert.strictEqual(failure.message, "Permission denied");
        assert.deepStrictEqual(failure.command, command);
      }),
    );

    it.effect(
      "Resource discovery finds matching resources on later pages",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const commands = yield* ResourceCommandPolicy;

          const queue = yield* cloudControlQueue;

          yield* fixture.enqueueResponses([
            Response.json({
              ResourceDescriptions: [{ Identifier: "queue-1" }],
              NextToken: "next",
            }),
            Response.json({
              ResourceDescriptions: [{ Identifier: "queue-2" }],
            }),
            Response.json({
              ResourceDescription: { Properties: '{"QueueName":"other"}' },
            }),
            Response.json({
              ResourceDescription: { Properties: '{"QueueName":"first"}' },
            }),
          ]);

          const observed = yield* commands.execute(
            ResourceCommand.Read({ node: queue }),
          );

          const discovered: ResourceNode = Match.value(observed).pipe(
            Match.tag("Observed", ({ observation }) =>
              Match.value(observation).pipe(
                Match.tag("Present", ({ node }) => node),
                Match.orElse(() => assert.fail("Expected a present resource")),
              ),
            ),
            Match.orElse(() => assert.fail("Expected a resource observation")),
          );

          const sent = yield* fixture.getRequests();

          const page = yield* Effect.promise(() => sent[1].text()).pipe(
            Effect.flatMap(
              Schema.decodeEffect(Schema.fromJsonString(ListResourcesInput)),
            ),
          );

          assert.strictEqual(discovered.cloudControlIdentifier, "queue-2");
          assert.deepStrictEqual(discovered.outputs, { QueueName: "first" });
          assert.strictEqual(page.NextToken, "next");
        }),
    );

    it.effect("Updates and teardown use the resource id returned by AWS", () =>
      Effect.gen(function* () {
        const fixture = yield* AwsCloudControlFixture;
        const commands = yield* ResourceCommandPolicy;

        const queue = yield* cloudControlQueue;

        yield* fixture.enqueueResponses([
          Response.json({ ProgressEvent: { RequestToken: "create-1" } }),
          Response.json({
            ProgressEvent: {
              OperationStatus: "SUCCESS",
              Identifier: "queue-1",
            },
          }),
          Response.json({
            ResourceDescription: {
              Properties:
                '{"QueueName":"first","DelaySeconds":0,"QueueUrl":"queue-1"}',
            },
          }),
          Response.json({ ProgressEvent: { RequestToken: "update-1" } }),
          Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
          Response.json({
            ResourceDescription: {
              Properties:
                '{"QueueName":"first","DelaySeconds":5,"QueueUrl":"queue-1"}',
            },
          }),
          Response.json({ ProgressEvent: { RequestToken: "delete-1" } }),
          Response.json({ ProgressEvent: { OperationStatus: "SUCCESS" } }),
        ]);

        const created = yield* commands.execute(
          ResourceCommand.Apply({
            decision: PlanDecision.Create({
              node: {
                ...queue,
                props: { QueueName: "first", DelaySeconds: 0 },
              },
            }),
          }),
        );

        const createdNode: ResourceNode = Match.value(created).pipe(
          Match.tag("Created", ({ node }) => node),
          Match.orElse(() => assert.fail("Expected a created resource")),
        );

        assert.strictEqual(createdNode.cloudControlIdentifier, "queue-1");
        assert.deepStrictEqual(createdNode.outputs, {
          QueueName: "first",
          DelaySeconds: 0,
          QueueUrl: "queue-1",
        });

        const updated = yield* commands.execute(
          ResourceCommand.Apply({
            decision: PlanDecision.Update({
              node: {
                ...queue,
                props: { QueueName: "first", DelaySeconds: 5 },
              },
              current: createdNode,
            }),
          }),
        );

        const updatedNode: ResourceNode = Match.value(updated).pipe(
          Match.tag("Updated", ({ node }) => node),
          Match.orElse(() => assert.fail("Expected an updated resource")),
        );

        assert.deepStrictEqual(updatedNode.outputs, {
          QueueName: "first",
          DelaySeconds: 5,
          QueueUrl: "queue-1",
        });

        const destroyed = yield* commands.execute(
          ResourceCommand.Apply({
            decision: PlanDecision.Destroy({ node: updatedNode }),
          }),
        );

        const sent = yield* fixture.getRequests();

        const update = yield* Effect.promise(() => sent[3].text()).pipe(
          Effect.flatMap(
            Schema.decodeEffect(Schema.fromJsonString(UpdateResourceInput)),
          ),
        );

        const patch = yield* Schema.decodeEffect(
          Schema.fromJsonString(Schema.Json),
        )(update.PatchDocument);

        assert.strictEqual(destroyed._tag, "Destroyed");
        assert.strictEqual(update.Identifier, "queue-1");
        assert.deepStrictEqual(patch, [
          { op: "replace", path: "/DelaySeconds", value: 5 },
        ]);
      }),
    );
  },
);

layer(awsCloudControlStackTestLayer, { buildPerTest: true })(
  "AWS regional configuration",
  (it) => {
    it.effect(
      "Cloud Control requests use the correct endpoint for AWS China",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const client = yield* AwsCloudControlClient;

          const configuration = yield* fixture.resolveConfiguration();

          yield* fixture.setConfiguration({
            ...configuration,
            Region: "cn-north-1",
          });

          yield* fixture.enqueueResponses([Response.json({})]);
          yield* client.getResource({
            TypeName: "AWS::SQS::Queue",
            Identifier: "queue-1",
          });

          const [request] = yield* fixture.getRequests();

          assert.strictEqual(
            request.url,
            "https://cloudcontrolapi.cn-north-1.amazonaws.com.cn/",
          );
          assert.include(
            request.headers.get("authorization"),
            "/cn-north-1/cloudcontrolapi/",
          );
        }),
    );
  },
);

layer(awsCloudControlStackTestLayer, { buildPerTest: true })(
  "AWS retry configuration",
  (it) => {
    it.effect(
      "Retries stop at the configured limit without changing the request token",
      () =>
        Effect.gen(function* () {
          const fixture = yield* AwsCloudControlFixture;
          const client = yield* AwsCloudControlClient;

          const configuration = yield* fixture.resolveConfiguration();

          yield* fixture.setConfiguration({ ...configuration, maxAttempts: 2 });

          yield* fixture.enqueueResponses([
            Response.json(
              { __type: "ServiceUnavailableException", message: "Unavailable" },
              { status: 503 },
            ),
            Response.json(
              { __type: "ServiceUnavailableException", message: "Unavailable" },
              { status: 503 },
            ),
          ]);

          const pending = yield* client
            .createResource({
              TypeName: "AWS::SQS::Queue",
              DesiredState: "{}",
              ClientToken: "stable-token",
            })
            .pipe(Effect.flip, Effect.forkChild);

          yield* TestClock.adjust("30 seconds");

          const failure = yield* Fiber.join(pending);
          const sent = yield* fixture.getRequests();
          const payloads = yield* Effect.forEach(sent, (request) =>
            Effect.promise(() => request.text()).pipe(
              Effect.flatMap(
                Schema.decodeEffect(Schema.fromJsonString(CreateResourceInput)),
              ),
            ),
          );

          assert.strictEqual(failure._tag, "AwsServiceError");
          assert.strictEqual(sent.length, 2);
          assert.deepStrictEqual(
            Arr.map(payloads, (payload) => payload.ClientToken),
            ["stable-token", "stable-token"],
          );
        }),
    );
  },
);
