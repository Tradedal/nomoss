import {
  AwsClientConfigurationError,
  AwsCredentials,
  AwsRegion,
  AwsSessionToken,
  AwsSharedProfiles,
  awsCredentialProviderLayer,
} from "@tradedal/aws-client-core/config";
import { makeSSOClient } from "@tradedal/aws-client-sso";
import { makeSSOOIDCClient } from "@tradedal/aws-client-sso-oidc";
import {
  Context,
  DateTime,
  Effect,
  FileSystem,
  Layer,
  Match,
  Option,
  Path,
  Schema,
} from "effect";
import { Digest } from "effect/crypto";
import { FetchHttpClient } from "effect/http";
import { awsCredentialExchangeClientLayer } from "./awsCredentialExchange.js";

/**
 * The tokenFile schema preserves CLI cache entries that Nomoss does not use
 * so writing a refreshed token leaves the remaining sign-in data intact.
 */
const tokenFile = Schema.fromJsonString(Schema.JsonObject);

/**
 * The sessionToken schema lets the provider decide whether it can use the
 * cached token. A sign-in can still be valid without a refresh registration.
 */
const sessionToken = Schema.Struct({
  accessToken: Schema.NonEmptyString,
  expiresAt: Schema.DateTimeUtcFromString,
  clientId: Schema.optionalKey(Schema.NonEmptyString),
  clientSecret: Schema.optionalKey(Schema.NonEmptyString),
  refreshToken: Schema.optionalKey(Schema.NonEmptyString),
});

/**
 * The refreshRegistration schema requires the client registration and
 * refresh token before the provider attempts to renew a CLI sign-in.
 */
const refreshRegistration = Schema.Struct({
  clientId: Schema.NonEmptyString,
  clientSecret: Schema.NonEmptyString,
  refreshToken: Schema.NonEmptyString,
});

/**
 * The renewedToken schema requires a positive lifetime before a replacement
 * token can be written to disk. A reply may leave the old refresh token valid.
 */
const renewedToken = Schema.Struct({
  accessToken: Schema.NonEmptyString,
  expiresIn: Schema.Int.check(Schema.isGreaterThan(0)),
  refreshToken: Schema.optionalKey(Schema.NonEmptyString),
});

/**
 * The roleCredentials schema requires complete temporary signing credentials.
 * An expiration lets the provider renew them before AWS rejects requests.
 */
const roleCredentials = Schema.Struct({
  accessKeyId: AwsCredentials.fields.accessKeyId,
  secretAccessKey: AwsCredentials.fields.secretAccessKey,
  sessionToken: AwsSessionToken,
  expiration: Schema.DateTimeUtcFromMillis,
});

/**
 * The IdentityCenterSession schema distinguishes named sign-ins from
 * legacy sign-ins. A named session can renew its token. A legacy session
 * identifies its cached sign-in by the configured start URL.
 *
 * @see ../../../refs/aws-sdk-js-v3/packages/token-providers/src/fromSso.ts (session name or start URL)
 */
const IdentityCenterSession = Schema.Union([
  Schema.TaggedStruct("Named", {
    name: Schema.NonEmptyString,
    region: AwsRegionName,
  }),
  Schema.TaggedStruct("Legacy", {
    startUrl: Schema.NonEmptyString,
    region: AwsRegionName,
  }),
]);

/**
 * The IdentityCenterProfile schema requires a specific AWS account and role
 * for the selected sign-in before the provider can issue a session.
 */
export const IdentityCenterProfile = Schema.Struct({
  accountId: AwsAccountId,
  roleName: Schema.NonEmptyString,
  session: IdentityCenterSession,
});

/**
 * The AwsIdentityCenter service lets a shared profile exchange an AWS CLI
 * sign-in for credentials for its configured account and role. A named
 * session can renew an expired access token when the cache still has a
 * valid client registration and refresh token.
 *
 * @see ../../../refs/aws-sdk-js-v3/packages/token-providers/src/fromSso.ts (fromSso)
 * @see ../../../refs/aws-sdk-js-v3/packages-internal/credential-provider-sso/src/resolveSSOCredentials.ts (resolveSSOCredentials)
 */
export class AwsIdentityCenter extends Context.Service<AwsIdentityCenter>()(
  "@tradedal/aws-credentials/awsIdentityCenter",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const digest = yield* Digest.Digest;
      const sso = yield* makeSSOClient;
      const oidc = yield* makeSSOOIDCClient;
      const profiles = yield* AwsSharedProfiles;

      /**
       * The refreshAccessToken operation saves a rotated token before the
       * caller uses it. The previous cache file remains available until
       * the replacement has been written in full.
       *
       * @see ../../../refs/effect/packages/effect/src/FileSystem.ts (makeTempFileScoped and rename)
       */
      const refreshAccessToken = Effect.fnUntraced(function* (
        cachePath: string,
        contents: Schema.JsonObject,
      ) {
        const registration =
          yield* Schema.decodeUnknownEffect(refreshRegistration)(contents);
        const reply = yield* oidc.createToken({
          ...registration,
          grantType: "refresh_token",
        });
        const refreshed =
          yield* Schema.decodeUnknownEffect(renewedToken)(reply);

        const now = yield* DateTime.now;
        const expiresAt = DateTime.add(now, { seconds: refreshed.expiresIn });
        const cache = yield* Schema.encodeEffect(tokenFile)({
          ...contents,
          accessToken: refreshed.accessToken,
          expiresAt: DateTime.formatIso(expiresAt),
          refreshToken: refreshed.refreshToken ?? registration.refreshToken,
        });

        const temporary = yield* fs.makeTempFileScoped({
          directory: path.dirname(cachePath),
          prefix: "nomoss-sso-",
        });
        yield* fs.chmod(temporary, 0o600);
        yield* fs.writeFileString(temporary, cache);
        yield* fs.rename(temporary, cachePath);

        return refreshed.accessToken;
      }, Effect.scoped);

      /**
       * The readAccessToken operation uses the sign-in already on disk
       * when it is current. Only a named CLI session can renew an expired
       * token. A legacy profile requires another interactive sign-in.
       */
      const readAccessToken = Effect.fnUntraced(function* (
        cachePath: string,
        session: typeof IdentityCenterSession.Type,
      ) {
        const contents = yield* fs
          .readFileString(cachePath)
          .pipe(Effect.flatMap(Schema.decodeEffect(tokenFile)));
        const token = yield* Schema.decodeUnknownEffect(sessionToken)(contents);
        const now = yield* DateTime.now;

        return yield* Match.value({
          current: DateTime.isGreaterThan(token.expiresAt, now),
          session,
        }).pipe(
          Match.when({ current: true }, () =>
            Effect.succeed(token.accessToken),
          ),
          Match.when({ session: { _tag: "Named" } }, () =>
            refreshAccessToken(cachePath, contents),
          ),
          Match.orElse(() =>
            Effect.fail(
              new AwsClientConfigurationError({
                message:
                  "The IAM Identity Center sign-in has expired. Sign in again with the AWS CLI.",
              }),
            ),
          ),
        );
      });

      /**
       * The resolveCredentials method returns credentials for the role selected
       * in the profile. It keeps rotated refresh tokens in the CLI cache so
       * later processes can renew the same sign-in.
       *
       * @see ../../../refs/aws-sdk-js-v3/packages/token-providers/src/fromSso.ts (session token refresh)
       */
      const resolveCredentials = Effect.fn(
        "AwsIdentityCenter.resolveCredentials",
      )(
        function* (profile: typeof IdentityCenterProfile.Type) {
          const home = yield* profiles.resolveHome();
          const cacheKey = Match.value(profile.session).pipe(
            Match.tag("Named", ({ name }) => name),
            Match.tag("Legacy", ({ startUrl }) => startUrl),
            Match.exhaustive,
          );
          const hash = yield* digest.digestHex(
            Digest.sha1,
            new TextEncoder().encode(cacheKey),
          );
          const cachePath = path.join(
            home,
            ".aws",
            "sso",
            "cache",
            `${hash}.json`,
          );
          const accessToken = yield* readAccessToken(
            cachePath,
            profile.session,
          );

          const response = yield* sso.getRoleCredentials({
            accountId: profile.accountId,
            roleName: profile.roleName,
            accessToken,
          });
          const credentials = yield* Schema.decodeUnknownEffect(
            roleCredentials,
          )(response.roleCredentials);

          const result: AwsCredentials = {
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            expiration: DateTime.toDateUtc(credentials.expiration),
          };

          return result;
        },
        (effect, profile) =>
          effect.pipe(
            Effect.provideService(
              AwsRegion,
              Option.some(profile.session.region),
            ),
            Effect.provideService(FetchHttpClient.RequestInit, {
              redirect: "error",
            }),
            Effect.withTracerEnabled(false),
          ),
      );

      return { resolveCredentials };
    }),
  },
) {
  static readonly layer = Layer.effect(
    AwsIdentityCenter,
    AwsIdentityCenter.make,
  ).pipe(
    Layer.provide(
      awsCredentialExchangeClientLayer.pipe(
        Layer.provide(
          awsCredentialProviderLayer(() =>
            Effect.fail(
              new AwsClientConfigurationError({
                message:
                  "IAM Identity Center credential exchanges require unsigned AWS operations.",
              }),
            ),
          ),
        ),
      ),
    ),
  );
}

import { AwsAccountId, AwsRegionName } from "@tradedal/aws-client-core/model";
