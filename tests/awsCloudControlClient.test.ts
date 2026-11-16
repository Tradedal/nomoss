import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, Match, Schema } from "effect";
import { HttpClient, HttpClientRequest, HttpClientResponse } from "effect/http";
import { HttpApiClient } from "effect/http-api";
import {
  CreateResourceInput,
  cloudControlApi,
  cloudControlErrors,
  cloudControlOperations,
  cloudControlService,
  GetResourceRequestStatusOutput,
} from "../src/providers/aws/client/generated/cloudControl.js";

describe("generated Cloud Control contracts", () => {
  it("Resource creation rejects invalid Cloud Control inputs", () => {
    assert.isTrue(
      Schema.is(CreateResourceInput)({
        TypeName: "AWS::SQS::Queue",
        DesiredState: "{}",
      }),
    );
    assert.isFalse(Schema.is(CreateResourceInput)({ DesiredState: "{}" }));
    assert.isFalse(
      Schema.is(CreateResourceInput)({ TypeName: "AWS::SQS::Queue" }),
    );
    assert.isFalse(
      Schema.is(CreateResourceInput)({ TypeName: "queue", DesiredState: "{}" }),
    );
    assert.isFalse(
      Schema.is(CreateResourceInput)({
        TypeName: "AWS::SQS::Queue",
        DesiredState: {},
      }),
    );
    assert.isFalse(
      Schema.is(CreateResourceInput)({
        TypeName: "AWS::SQS::Queue",
        DesiredState: "{}",
        ClientToken: "invalid token",
      }),
    );
  });

  it("Cloud Control progress uses valid statuses and numeric timestamps", () => {
    assert.deepStrictEqual(
      Schema.decodeUnknownSync(GetResourceRequestStatusOutput)({
        ProgressEvent: {
          OperationStatus: "SUCCESS",
          EventTime: 1730000000.25,
          RetryAfter: 1730000001,
        },
      }),
      {
        ProgressEvent: {
          OperationStatus: "SUCCESS",
          EventTime: 1730000000.25,
          RetryAfter: 1730000001,
        },
      },
    );
    assert.isFalse(
      Schema.is(GetResourceRequestStatusOutput)({
        ProgressEvent: { RetryAfter: "2026-11-01T00:00:00Z" },
      }),
    );
    assert.isFalse(
      Schema.is(GetResourceRequestStatusOutput)({
        ProgressEvent: { OperationStatus: "UNKNOWN" },
      }),
    );
  });

  it("The Cloud Control catalog includes the AWS execution metadata", () => {
    assert.strictEqual(cloudControlService.signingName, "cloudcontrolapi");
    assert.deepStrictEqual(
      cloudControlOperations.CreateResource.idempotencyTokens,
      ["ClientToken"],
    );
    assert.deepStrictEqual(cloudControlOperations.ListResources.pagination, {
      inputToken: "NextToken",
      outputToken: "NextToken",
      pageSize: "MaxResults",
      items: "ResourceDescriptions",
    });
    assert.strictEqual(cloudControlErrors.ThrottlingException.httpStatus, 429);
    assert.strictEqual(
      cloudControlErrors.ServiceInternalErrorException.fault,
      "server",
    );
    assert.strictEqual(
      cloudControlErrors.ServiceInternalErrorException.httpStatus,
      502,
    );
    assert.deepStrictEqual(
      Arr.map(
        cloudControlOperations.GetResourceRequestStatus.errors,
        (error) => error.name,
      ),
      ["RequestTokenNotFoundException"],
    );
  });
});

const scenarios: ReadonlyArray<{
  readonly name: keyof typeof cloudControlOperations;
  readonly payload: (typeof cloudControlOperations)[keyof typeof cloudControlOperations]["input"]["Type"];
  readonly response: Schema.Json;
}> = [
  {
    name: "CancelResourceRequest",
    payload: { RequestToken: "token-1" },
    response: { ProgressEvent: { OperationStatus: "CANCEL_COMPLETE" } },
  },
  {
    name: "CreateResource",
    payload: { TypeName: "AWS::SQS::Queue", DesiredState: "{}" },
    response: { ProgressEvent: { OperationStatus: "SUCCESS" } },
  },
  {
    name: "DeleteResource",
    payload: { TypeName: "AWS::SQS::Queue", Identifier: "queue-1" },
    response: { ProgressEvent: { OperationStatus: "SUCCESS" } },
  },
  {
    name: "GetResource",
    payload: { TypeName: "AWS::SQS::Queue", Identifier: "queue-1" },
    response: {
      ResourceDescription: {
        Identifier: "queue-1",
        Properties: '{"QueueName":"queue-1"}',
      },
    },
  },
  {
    name: "GetResourceRequestStatus",
    payload: { RequestToken: "token-1" },
    response: {
      ProgressEvent: { OperationStatus: "SUCCESS", RetryAfter: 1730000000 },
    },
  },
  {
    name: "ListResourceRequests",
    payload: {},
    response: {
      ResourceRequestStatusSummaries: [
        { RequestToken: "token-1", OperationStatus: "SUCCESS" },
      ],
      NextToken: "next",
    },
  },
  {
    name: "ListResources",
    payload: { TypeName: "AWS::SQS::Queue" },
    response: {
      ResourceDescriptions: [{ Identifier: "queue-1", Properties: "{}" }],
      NextToken: "next",
    },
  },
  {
    name: "UpdateResource",
    payload: {
      TypeName: "AWS::SQS::Queue",
      Identifier: "queue-1",
      PatchDocument: '[{"op":"replace","path":"/QueueName","value":"queue-2"}]',
    },
    response: { ProgressEvent: { OperationStatus: "SUCCESS" } },
  },
];

describe("generated Cloud Control HTTP operations", () => {
  it.effect.each(scenarios)(
    "$name accepts the generated input and returns the decoded response",
    (scenario) =>
      Effect.gen(function* () {
        const transport = HttpClient.make(
          Effect.fn(function* (request, url) {
            assert.strictEqual(request.method, "POST");
            assert.strictEqual(
              url.href,
              "https://cloudcontrolapi.us-east-1.amazonaws.com/",
            );
            assert.strictEqual(
              request.headers["x-amz-target"],
              `CloudApiService.${scenario.name}`,
            );
            assert.strictEqual(
              request.headers["content-type"],
              "application/x-amz-json-1.0",
            );
            assert.deepStrictEqual(
              yield* Match.value(request.body).pipe(
                Match.tag("Uint8Array", (body) =>
                  Schema.decodeUnknownEffect(
                    Schema.fromJsonString(Schema.Json),
                  )(new TextDecoder().decode(body.body)),
                ),
                Match.orElse(() =>
                  Effect.die("Expected a serialized JSON request body"),
                ),
                Effect.orDie,
              ),
              scenario.payload,
            );

            const response: HttpClientResponse.HttpClientResponse =
              HttpClientResponse.fromWeb(
                request,
                new Response(
                  yield* Schema.encodeEffect(
                    Schema.fromJsonString(Schema.Json),
                  )(scenario.response).pipe(Effect.orDie),
                  {
                    status: 200,
                    headers: { "content-type": "application/x-amz-json-1.0" },
                  },
                ),
              );

            return response;
          }),
        );

        const execute = yield* HttpApiClient.endpoint(cloudControlApi, {
          group: "cloudcontrol",
          endpoint: scenario.name,
          baseUrl: "https://cloudcontrolapi.us-east-1.amazonaws.com",
          httpClient: transport,
          transformClient: (client) =>
            HttpClient.mapRequest(
              client,
              HttpClientRequest.setHeaders(
                cloudControlOperations[scenario.name].headers,
              ),
            ),
        });
        assert.deepEqual(
          yield* execute({ payload: scenario.payload }),
          scenario.response,
        );
      }),
  );
});
