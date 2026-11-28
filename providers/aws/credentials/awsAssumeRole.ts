import {
  AwsClientConfigurationError,
  AwsCredentialProvider,
  AwsCredentials,
  AwsRegion,
  AwsSessionToken,
} from "@tradedal/aws-client-core/config";
import { AwsArn, AwsRegionName } from "@tradedal/aws-client-core/model";
import {
  type AssumeRoleRequest,
  makeSTSClient,
} from "@tradedal/aws-client-sts";
import { Clock, Effect, Exit, Layer, Option, Schema } from "effect";
import { FetchHttpClient } from "effect/http";
import { awsCredentialExchangeClientLayer } from "./awsCredentialExchange.js";
import { credentialSessionTtl } from "./awsCredentialSession.js";

/**
 * The AwsStsCredentials schema requires an expiration
 * and session token with each key. The expiration determines when the
 * provider must obtain a new session.
 */
export const AwsStsCredentials = AwsCredentials.mapFields((fields) => ({
  ...fields,
  sessionToken: AwsSessionToken,
  expiration: Schema.DateFromString,
})).pipe(
  Schema.encodeKeys({
    accessKeyId: "AccessKeyId",
    secretAccessKey: "SecretAccessKey",
    sessionToken: "SessionToken",
    expiration: "Expiration",
  }),
);

/**
 * The awsAssumeRoleCredentialsLayer Layer lets an application sign AWS
 * requests as the role selected in its STS request. Supply an
 * AwsCredentialProvider for the source principal. STS uses that principal
 * for each exchange, including renewals. Callers sharing this Layer share
 * the resulting session.
 *
 * @see ../../../refs/aws-sdk-js-v3/packages/credential-providers/README.md (fromTemporaryCredentials)
 * @see ../../../refs/effect/packages/effect/src/Layer.ts (effect)
 * @see ../../../refs/effect/packages/effect/src/Effect.ts (cachedWithTTL)
 */
export const awsAssumeRoleCredentialsLayer = (
  region: string,
  request: AssumeRoleRequest,
) =>
  Layer.effect(
    AwsCredentialProvider,
    Effect.gen(function* () {
      const sts = yield* makeSTSClient;

      const configuredRegion =
        yield* Schema.decodeEffect(AwsRegionName)(region);
      const RoleArn = yield* Schema.decodeUnknownEffect(AwsArn)(
        request.RoleArn,
      );

      /**
       * The acquireSession operation accepts only a current STS session.
       * It calculates how long requests can reuse it before another exchange.
       */
      const acquireSession = Effect.fnUntraced(function* () {
        const response = yield* sts.assumeRole({ ...request, RoleArn });

        const credentials: AwsCredentials = yield* Schema.decodeUnknownEffect(
          AwsStsCredentials,
        )(response.Credentials);

        const now = yield* Clock.currentTimeMillis;
        const ttl = credentialSessionTtl(credentials, now);

        return yield* Effect.succeed({ credentials, ttl }).pipe(
          Effect.filterOrFail(
            ({ ttl }) => ttl > 0,
            () =>
              new AwsClientConfigurationError({
                message: "AWS STS returned an expired session.",
              }),
          ),
        );
      });

      const session = yield* acquireSession().pipe(
        Effect.provideService(AwsRegion, Option.some(configuredRegion)),
        Effect.provideService(FetchHttpClient.RequestInit, {
          redirect: "error",
        }),
        Effect.withTracerEnabled(false),
        Effect.cachedWithTTL(
          Exit.match({ onSuccess: ({ ttl }) => ttl, onFailure: () => 0 }),
        ),
      );

      /**
       * The resolveCredentials service method returns the credentials for
       * the requested role. It shares renewal with other callers and
       * reports an exchange failure without exposing STS input or output.
       */
      const resolveCredentials = Effect.fn("AwsAssumeRole.resolveCredentials")(
        () => session.pipe(Effect.map(({ credentials }) => credentials)),
        Effect.mapError(
          () =>
            new AwsClientConfigurationError({
              message:
                "AWS STS could not issue current credentials. Check the source credentials, role trust policy, and STS region.",
            }),
        ),
      );

      return { resolveCredentials };
    }),
  ).pipe(Layer.provide(awsCredentialExchangeClientLayer));
