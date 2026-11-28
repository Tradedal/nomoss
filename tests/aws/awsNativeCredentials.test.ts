import { NodeFileSystem, NodePath } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { AwsClientConfig } from "@nomoss/aws/config";
import { awsClientConfigLayer } from "@nomoss/aws/credentials";
import {
  ConfigProvider,
  DateTime,
  Effect,
  FileSystem,
  Layer,
  Match,
  Option,
  Path,
  Ref,
  Schema,
} from "effect";
import { Digest } from "effect/crypto";
import { HttpClient, HttpClientResponse } from "effect/http";
import { TestClock } from "effect/testing";

const platform = Layer.mergeAll(
  NodeFileSystem.layer,
  NodePath.layer,
  Digest.layerWebCrypto,
);
const tokenFile = Schema.fromJsonString(Schema.JsonObject);

layer(platform)("Native AWS credentials", (it) => {
  it.effect(
    "Concurrent AWS requests can use the selected Identity Center role after the CLI token expires",
    () =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const digest = yield* Digest.Digest;
        const now = DateTime.toEpochMillis(
          DateTime.makeUnsafe("2026-01-01T00:00:00Z"),
        );
        yield* TestClock.setTime(now);
        const home = yield* fs.makeTempDirectoryScoped({
          prefix: "nomoss-aws-login-",
        });
        const aws = path.join(home, ".aws");
        const cache = path.join(aws, "sso", "cache");
        yield* fs.makeDirectory(cache, { recursive: true });
        yield* fs.writeFileString(
          path.join(aws, "config"),
          [
            "[profile deploy]",
            "sso_session = deploy-session",
            "sso_account_id = 123456789012",
            "sso_role_name = Deployment",
            "[sso-session deploy-session]",
            "sso_region = us-east-1",
            "sso_start_url = https://example.awsapps.com/start",
          ].join("\n"),
        );

        const hash = yield* digest.digestHex(
          Digest.sha1,
          new TextEncoder().encode("deploy-session"),
        );
        const cacheFile = path.join(cache, `${hash}.json`);
        yield* Schema.encodeEffect(tokenFile)({
          accessToken: "expired-access-token",
          expiresAt: "2025-01-01T00:00:00Z",
          clientId: "deployment-client",
          clientSecret: "client-secret",
          refreshToken: "original-refresh-token",
        }).pipe(
          Effect.flatMap((contents) => fs.writeFileString(cacheFile, contents)),
        );

        const refreshed = yield* Ref.make(false);
        // The Identity Center mock accepts each refresh token once. Its role
        // request requires the new bearer token for the selected account.
        const transport = HttpClient.make((request, url) =>
          Effect.gen(function* () {
            const previousRefresh = yield* Ref.getAndSet(refreshed, true).pipe(
              Effect.when(Effect.succeed(url.pathname === "/token")),
            );
            const response = Match.value(url.pathname).pipe(
              Match.when("/token", () =>
                Match.value(Option.contains(false)(previousRefresh)).pipe(
                  Match.when(true, () =>
                    Response.json({
                      accessToken: "renewed-access-token",
                      expiresIn: 3600,
                      refreshToken: "rotated-refresh-token",
                    }),
                  ),
                  Match.orElse(() => Response.json({}, { status: 400 })),
                ),
              ),
              Match.when("/federation/credentials", () =>
                Match.value(
                  request.headers["x-amz-sso_bearer_token"] ===
                    "renewed-access-token" &&
                    url.searchParams.get("account_id") === "123456789012" &&
                    url.searchParams.get("role_name") === "Deployment",
                ).pipe(
                  Match.when(true, () =>
                    Response.json({
                      roleCredentials: {
                        accessKeyId: "AKIDDEPLOYMENT",
                        secretAccessKey: "fixture-role-secret",
                        sessionToken: "deployment-session",
                        expiration: now + 3_600_000,
                      },
                    }),
                  ),
                  Match.orElse(() => Response.json({}, { status: 401 })),
                ),
              ),
              Match.orElse(() => Response.json({}, { status: 404 })),
            );
            return HttpClientResponse.fromWeb(request, response);
          }),
        );
        const config = ConfigProvider.fromUnknown({
          HOME: home,
          AWS_PROFILE: "deploy",
          AWS_ACCESS_KEY_ID: "AKIDUNSELECTED",
          AWS_SECRET_ACCESS_KEY: "unselected-secret",
        });
        const credentials = yield* AwsClientConfig.pipe(
          Effect.flatMap((config) =>
            Effect.all(
              [config.resolveCredentials(), config.resolveCredentials()],
              { concurrency: "unbounded" },
            ),
          ),
          Effect.provide(
            awsClientConfigLayer.pipe(
              Layer.provide(Layer.succeed(HttpClient.HttpClient, transport)),
            ),
          ),
          Effect.provideService(ConfigProvider.ConfigProvider, config),
        );

        expect(credentials.map(({ sessionToken }) => sessionToken)).toEqual([
          "deployment-session",
          "deployment-session",
        ]);
        const updated = yield* fs
          .readFileString(cacheFile)
          .pipe(Effect.flatMap(Schema.decodeEffect(tokenFile)));
        expect(updated).toMatchObject({
          accessToken: "renewed-access-token",
          refreshToken: "rotated-refresh-token",
        });
      }),
  );
});
