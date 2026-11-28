import { expect, layer } from "@effect/vitest";
import { awsClientLayer } from "@nomoss/aws";
import { makeCloudControlClient } from "@nomoss/aws/cloudcontrol";
import {
  AwsCredentials,
  AwsRegion,
  awsClientConfigLayerFromProvider,
  awsCredentialProviderLayer,
} from "@nomoss/aws/config";
import { awsAssumeRoleCredentialsLayer } from "@nomoss/aws/credentials";
import { AwsRegionName } from "@nomoss/aws/model";
import { DateTime, Effect, Layer, Match, Option, Ref, Schema } from "effect";
import { HttpClient, HttpClientResponse } from "effect/http";

const identifier = "https://sqs.us-west-2.amazonaws.com/123456789012/created";
const role = "arn:aws:iam::123456789012:role/Deployment";

const recoveryLayer = Layer.unwrap(
  Effect.gen(function* () {
    const acceptedPayload = yield* Ref.make(Option.none<string>());
    const source = awsCredentialProviderLayer(() =>
      Effect.succeed(
        Schema.decodeSync(AwsCredentials)({
          accessKeyId: "AKIDSOURCE",
          secretAccessKey: "fixture-source-secret",
        }),
      ),
    );

    const assumeRole = Effect.fnUntraced(function* (
      payload: string,
      authorization: string,
      renewed: boolean,
    ) {
      const form = new URLSearchParams(payload);
      const allowed =
        authorization.startsWith("AWS4-HMAC-SHA256 Credential=AKIDSOURCE/") &&
        form.get("Action") === "AssumeRole" &&
        form.get("RoleArn") === role;
      const session = Match.value(renewed).pipe(
        Match.when(true, () => ({
          key: "AKIDSECONDREQUEST",
          token: "renewed-session",
          seconds: 3600,
        })),
        Match.orElse(() => ({
          key: "AKIDFIRSTREQUEST",
          token: "initial-session",
          seconds: 1,
        })),
      );
      const expiration = DateTime.formatIso(
        DateTime.add(yield* DateTime.now, { seconds: session.seconds }),
      );

      return Match.value(allowed).pipe(
        Match.when(
          true,
          () =>
            new Response(
              `<AssumeRoleResponse><AssumeRoleResult><Credentials><AccessKeyId>${session.key}</AccessKeyId><SecretAccessKey>fixture-secret</SecretAccessKey><SessionToken>${session.token}</SessionToken><Expiration>${expiration}</Expiration></Credentials></AssumeRoleResult></AssumeRoleResponse>`,
            ),
        ),
        Match.orElse(() => new Response(null, { status: 403 })),
      );
    });

    // The service commits the creation before returning an unavailable
    // response. It returns the existing resource only for the same request
    // signed with the renewed session.
    const http = HttpClient.make((request, url) =>
      Effect.gen(function* () {
        const payload = Match.value(request.body).pipe(
          Match.tag("Uint8Array", ({ body }) => new TextDecoder().decode(body)),
          Match.orElse(() => ""),
        );
        const previous = yield* Ref.get(acceptedPayload);
        const authorization = request.headers.authorization ?? "";
        const reply = yield* Match.value(url.hostname).pipe(
          Match.when("sts.us-west-2.amazonaws.com", () =>
            assumeRole(payload, authorization, Option.isSome(previous)),
          ),
          Match.orElse(() =>
            recover(
              payload,
              request.headers["x-amz-security-token"],
              authorization,
              previous,
            ),
          ),
        );

        return HttpClientResponse.fromWeb(request, reply);
      }),
    );

    const recover = Effect.fnUntraced(function* (
      payload: string,
      sessionToken: string | undefined,
      authorization: string,
      previous: Option.Option<string>,
    ) {
      const status = Option.match(previous, {
        onNone: () =>
          Match.value(
            authorization.startsWith(
              "AWS4-HMAC-SHA256 Credential=AKIDFIRSTREQUEST/",
            ) &&
              sessionToken === "initial-session" &&
              /"ClientToken":"[^"]+"/.test(payload),
          ).pipe(
            Match.when(true, () => 503),
            Match.orElse(() => 400),
          ),
        onSome: (previousPayload) =>
          Match.value(
            authorization.startsWith(
              "AWS4-HMAC-SHA256 Credential=AKIDSECONDREQUEST/",
            ) &&
              authorization.includes("/us-west-2/") &&
              sessionToken === "renewed-session" &&
              payload === previousPayload,
          ).pipe(
            Match.when(true, () => 200),
            Match.orElse(() => 409),
          ),
      });
      yield* Ref.set(acceptedPayload, Option.some(payload)).pipe(
        Effect.when(Effect.succeed(status === 503)),
      );

      return Match.value(status).pipe(
        Match.when(200, () =>
          Response.json({
            ProgressEvent: {
              TypeName: "AWS::SQS::Queue",
              Identifier: identifier,
              OperationStatus: "SUCCESS",
            },
          }),
        ),
        Match.when(503, () =>
          Response.json(
            {},
            {
              status: 503,
              headers: { "retry-after": "1" },
            },
          ),
        ),
        Match.orElse((status) => Response.json({}, { status })),
      );
    });

    const configuration = awsClientConfigLayerFromProvider.pipe(
      Layer.provide([
        awsAssumeRoleCredentialsLayer("us-west-2", {
          RoleArn: role,
          RoleSessionName: "deployment",
        }).pipe(Layer.provide(source)),
        Layer.succeed(AwsRegion, Option.some(AwsRegionName.make("us-west-2"))),
      ]),
    );

    return awsClientLayer.pipe(
      Layer.provide(configuration),
      Layer.provide(Layer.succeed(HttpClient.HttpClient, http)),
    );
  }),
);

layer(recoveryLayer, { excludeTestServices: true })(
  "AWS credential renewal",
  (it) => {
    it.effect(
      "A resource creation recovers its accepted result after STS renews the assumed role",
      () =>
        Effect.gen(function* () {
          const client = yield* makeCloudControlClient;
          const result = yield* client.createResource({
            TypeName: "AWS::SQS::Queue",
            DesiredState: '{"QueueName":"created"}',
          });

          expect(result.ProgressEvent).toMatchObject({
            Identifier: identifier,
            OperationStatus: "SUCCESS",
          });
        }),
    );
  },
);
