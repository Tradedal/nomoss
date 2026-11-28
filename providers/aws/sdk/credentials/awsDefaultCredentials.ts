import { NodeFileSystem, NodePath } from "@effect/platform-node-shared";
import {
  AwsClientConfigurationError,
  AwsCredentialProvider,
  AwsCredentials,
  AwsProfile,
  type AwsSharedProfile,
  AwsSharedProfiles,
} from "@nomoss/aws/config";
import {
  Clock,
  Config,
  Effect,
  Exit,
  Layer,
  Match,
  Option,
  Schema,
  Struct,
} from "effect";
import { Digest } from "effect/crypto";
import { credentialSessionTtl } from "./awsCredentialSession.js";
import {
  AwsIdentityCenter,
  IdentityCenterProfile,
} from "./awsIdentityCenter.js";

/**
 * The staticCredentials schema distinguishes complete signing credentials
 * from a source that has only one of the two required keys.
 */
const staticCredentials = AwsCredentials.mapFields(Struct.omit(["expiration"]));

const setting = (name: string) => Config.option(Config.NonEmptyString(name));

/**
 * The awsDefaultCredentialsLayer Layer lets the signer use environment keys
 * or a shared AWS profile. An explicit profile takes precedence over
 * environment keys. An Identity Center profile uses the AWS CLI sign-in for
 * its designated role. Supply an HTTP client for that exchange or when
 * using this Layer as the source for STS role assumption.
 *
 * @see ../../../../refs/aws-sdk-js-v3/packages-internal/credential-provider-node/src/defaultProvider.ts (profile precedence)
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (effect and provide)
 * @see ../../../../refs/effect/packages/effect/src/Effect.ts (cachedWithTTL)
 */
export const awsDefaultCredentialsLayer = Layer.effect(
  AwsCredentialProvider,
  Effect.gen(function* () {
    const profiles = yield* AwsSharedProfiles;
    const profile = yield* AwsProfile;
    const identityCenter = yield* AwsIdentityCenter;

    /**
     * The resolveIdentityCenter operation validates the profile's sign-in
     * mode before requesting a role. A profile that names a session must
     * supply that session's regional settings.
     */
    const resolveIdentityCenter = Effect.fnUntraced(function* (
      source: typeof AwsSharedProfile.Type,
    ) {
      const { profile, session } = source;
      const signIn = Option.match(Option.fromUndefinedOr(profile.sso_session), {
        onNone: () => ({
          _tag: "Legacy",
          startUrl: profile.sso_start_url,
          region: profile.sso_region,
        }),
        onSome: (name) => ({
          _tag: "Named",
          name,
          region: Option.getOrUndefined(
            Option.map(session, (entry) => entry.sso_region),
          ),
        }),
      });

      const selection = yield* Schema.decodeUnknownEffect(
        IdentityCenterProfile,
      )({
        accountId: profile.sso_account_id,
        roleName: profile.sso_role_name,
        session: signIn,
      });

      return yield* identityCenter.resolveCredentials(selection);
    }, Effect.asSome);

    /**
     * The readProfile operation resolves only the source selected by the
     * profile. It returns None for an absent or unsupported source so the
     * signer cannot accidentally use credentials for a different account.
     */
    const readProfile = Effect.fn("AwsDefaultCredentials.readProfile")(
      function* (name: string) {
        const shared = yield* profiles.read(name);
        const { profile } = shared;

        const credentials = Schema.decodeOption(staticCredentials)({
          accessKeyId: profile.aws_access_key_id,
          secretAccessKey: profile.aws_secret_access_key,
          sessionToken: profile.aws_session_token,
        });

        return yield* Match.value({
          assumeRole: profile.role_arn !== undefined,
          staticCredentials: Option.isSome(credentials),
          deferredSource:
            profile.credential_process !== undefined ||
            profile.web_identity_token_file !== undefined,
          identityCenter:
            profile.sso_session !== undefined ||
            profile.sso_start_url !== undefined,
        }).pipe(
          Match.when({ assumeRole: true }, () => Effect.succeedNone),
          Match.when({ staticCredentials: true }, () =>
            Effect.succeed(credentials),
          ),
          Match.when({ deferredSource: true }, () => Effect.succeedNone),
          Match.when({ identityCenter: true }, () =>
            resolveIdentityCenter(shared),
          ),
          Match.orElse(() => Effect.succeedNone),
        );
      },
    );

    /**
     * The discoverCredentials operation uses environment keys only when
     * the application and AWS_PROFILE both leave the profile unspecified.
     */
    const discoverCredentials = Effect.fnUntraced(function* () {
      const env = yield* Config.all({
        profile: setting("AWS_PROFILE"),
        accessKeyId: setting("AWS_ACCESS_KEY_ID"),
        secretAccessKey: setting("AWS_SECRET_ACCESS_KEY"),
        sessionToken: setting("AWS_SESSION_TOKEN"),
      });
      const selectedProfile = Option.orElse(profile, () => env.profile);
      const environmentCredentials = Schema.decodeUnknownOption(
        staticCredentials,
      )({
        accessKeyId: Option.getOrUndefined(env.accessKeyId),
        secretAccessKey: Option.getOrUndefined(env.secretAccessKey),
        sessionToken: Option.getOrUndefined(env.sessionToken),
      });

      return yield* Option.match(selectedProfile, {
        onSome: readProfile,
        onNone: () =>
          Option.match(environmentCredentials, {
            onSome: Effect.succeedSome,
            onNone: () => readProfile("default"),
          }),
      });
    });

    /**
     * The acquireSession operation keeps expired credentials out of retries.
     * A session remains reusable only until it is due for renewal.
     */
    const acquireSession = Effect.fnUntraced(function* () {
      const credentials = yield* discoverCredentials().pipe(
        Effect.flatMap(Effect.fromOption),
      );
      const now = yield* Clock.currentTimeMillis;
      const ttl = credentialSessionTtl(credentials, now);

      return yield* Effect.succeed({ credentials, ttl }).pipe(
        Effect.filterOrFail(
          ({ ttl }) => ttl > 0,
          () =>
            new AwsClientConfigurationError({
              message: "The selected AWS profile returned an expired session.",
            }),
        ),
      );
    });

    const session = yield* acquireSession().pipe(
      Effect.cachedWithTTL(
        Exit.match({ onSuccess: ({ ttl }) => ttl, onFailure: () => 0 }),
      ),
    );

    /**
     * The resolveCredentials service method returns the selected AWS
     * identity for a signature. It shares acquisition with concurrent
     * callers and reports unavailable credentials without exposing secrets.
     */
    const resolveCredentials = Effect.fn(
      "AwsDefaultCredentials.resolveCredentials",
    )(
      () => session.pipe(Effect.map(({ credentials }) => credentials)),
      Effect.mapError(
        () =>
          new AwsClientConfigurationError({
            message:
              "AWS credentials are unavailable. Check the selected profile or sign in again with the AWS CLI.",
          }),
      ),
    );

    return { resolveCredentials };
  }),
).pipe(
  Layer.provide(AwsIdentityCenter.layer),
  Layer.provide(AwsSharedProfiles.layer),
  Layer.provide([NodeFileSystem.layer, NodePath.layer, Digest.layerWebCrypto]),
);
