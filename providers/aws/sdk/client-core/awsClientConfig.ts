import { NodeFileSystem, NodePath } from "@effect/platform-node-shared";
import { Config, Context, Data, Effect, Layer, Option, Schema } from "effect";
import { AwsRegionName } from "./awsArn.js";
import { AwsProfile, AwsSharedProfiles } from "./awsSharedProfiles.js";

export {
  AwsProfile,
  AwsSharedProfile,
  AwsSharedProfiles,
} from "./awsSharedProfiles.js";

/**
 * The AwsRegion reference overrides environment and shared-profile region selection for
 * both request addresses and signing. Applications can leave it absent to use
 * their existing AWS configuration.
 */
export const AwsRegion = Context.Reference<Option.Option<AwsRegionName>>(
  "@nomoss/aws/region",
  { defaultValue: Option.none },
);

/** The AwsSessionToken schema distinguishes a temporary session token from a signing secret. */
export const AwsSessionToken = Schema.NonEmptyString.pipe(
  Schema.brand("AwsSessionToken"),
);

/**
 * The AwsCredentials schema distinguishes the ID that AWS uses to look up
 * a key from the secret used to sign a request. A temporary session can
 * also carry the token and expiration that its provider supplies.
 */
export const AwsCredentials = Schema.Struct({
  accessKeyId: Schema.NonEmptyString.pipe(Schema.brand("AwsAccessKeyId")),
  secretAccessKey: Schema.NonEmptyString.pipe(
    Schema.brand("AwsSecretAccessKey"),
  ),
  sessionToken: Schema.optional(AwsSessionToken),
  expiration: Schema.optional(Schema.Date),
});
export type AwsCredentials = typeof AwsCredentials.Type;

/** The AwsClientConfiguration schema keeps the chosen AWS region distinct from a signing name or address. */
export const AwsClientConfiguration = Schema.Struct({
  Region: AwsRegionName,
  UseFIPS: Schema.Boolean,
  UseDualStack: Schema.Boolean,
  Endpoint: Schema.UndefinedOr(Schema.String),
  maxAttempts: Schema.Int.check(Schema.isGreaterThan(0)),
});
export type AwsClientConfiguration = typeof AwsClientConfiguration.Type;

/**
 * The AwsRequestSettings schema keeps an invalid region or retry limit
 * from reaching service address selection and request execution.
 */
const AwsRequestSettings = Schema.Struct({
  Region: AwsClientConfiguration.fields.Region,
  UseFIPS: Schema.Literals(["true", "false"]),
  UseDualStack: Schema.Literals(["true", "false"]),
  Endpoint: Schema.optional(Schema.NonEmptyString),
  maxAttempts: Schema.NumberFromString.check(
    Schema.isInt(),
    Schema.isGreaterThan(0),
  ),
});

export class AwsClientConfigurationError extends Data.TaggedError(
  "AwsClientConfigurationError",
)<{ readonly message: string }> {}

/**
 * The AwsCredentialProvider service supplies the current identity for a
 * signing attempt. It can renew a temporary session between attempts without
 * changing the request or its idempotency token.
 */
export class AwsCredentialProvider extends Context.Service<
  AwsCredentialProvider,
  {
    /**
     * The resolveCredentials service method returns the identity for the
     * next signing attempt. It can wait for a session renewal and fails
     * when the provider cannot supply current credentials.
     */
    readonly resolveCredentials: () => Effect.Effect<
      AwsCredentials,
      AwsClientConfigurationError
    >;
  }
>()("@nomoss/aws/client-core/awsClientConfig/AwsCredentialProvider") {}

/**
 * The awsCredentialProviderLayer Layer lets an application supply its own
 * credential acquisition. The Effect runs at signing time so a local plan
 * can complete before AWS credentials are available.
 *
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (succeed)
 */
export const awsCredentialProviderLayer = (
  resolveCredentials: AwsCredentialProvider["Service"]["resolveCredentials"],
) => Layer.succeed(AwsCredentialProvider, { resolveCredentials });

/**
 * The AwsClientConfig service lets callers select a region and service URL
 * independently of the principal that signs requests. A single application
 * can read settings from a profile and sign as a role obtained separately.
 */
export class AwsClientConfig extends Context.Service<AwsClientConfig>()(
  "@nomoss/aws/client-core/awsClientConfig",
  {
    make: Effect.gen(function* () {
      const configuredRegion = yield* AwsRegion;
      const configuredProfile = yield* AwsProfile;
      const profiles = yield* AwsSharedProfiles;
      const { resolveCredentials } = yield* AwsCredentialProvider;

      /**
       * The resolveConfiguration service method returns the settings for
       * an invocation before it signs a request. An explicit region takes
       * precedence over the environment and profile. Missing or invalid
       * settings fail before any request goes to AWS.
       */
      const resolveConfiguration = Effect.fn(
        "AwsClientConfig.resolveConfiguration",
      )(
        function* () {
          const optional = (key: string) =>
            Config.option(Config.NonEmptyString(key));
          const env = yield* Config.all({
            profile: optional("AWS_PROFILE"),
            region: optional("AWS_REGION"),
            fips: optional("AWS_USE_FIPS_ENDPOINT"),
            dualStack: optional("AWS_USE_DUALSTACK_ENDPOINT"),
            endpoint: optional("AWS_ENDPOINT_URL"),
            maxAttempts: optional("AWS_MAX_ATTEMPTS"),
          });
          const profileName = configuredProfile.pipe(
            Option.orElse(() => env.profile),
            Option.getOrElse(() => "default"),
          );
          const { profile } = yield* profiles.read(profileName);
          const region = configuredRegion.pipe(
            Option.orElse(() => env.region),
            Option.getOrElse(() => profile.region),
          );
          const settings = yield* Schema.decodeUnknownEffect(
            AwsRequestSettings,
          )({
            Region: region,
            UseFIPS: Option.getOrElse(
              env.fips,
              () => profile.use_fips_endpoint ?? "false",
            ),
            UseDualStack: Option.getOrElse(
              env.dualStack,
              () => profile.use_dualstack_endpoint ?? "false",
            ),
            Endpoint: Option.getOrElse(
              env.endpoint,
              () => profile.endpoint_url,
            ),
            maxAttempts: Option.getOrElse(
              env.maxAttempts,
              () => profile.max_attempts ?? "3",
            ),
          });

          const configuration: AwsClientConfiguration = {
            ...settings,
            UseFIPS: settings.UseFIPS === "true",
            UseDualStack: settings.UseDualStack === "true",
            Endpoint: settings.Endpoint,
          };

          return configuration;
        },
        Effect.mapError(
          () =>
            new AwsClientConfigurationError({
              message:
                "AWS settings resolution failed. Check the region, profile, and retry settings.",
            }),
        ),
      );

      return { resolveCredentials, resolveConfiguration };
    }),
  },
) {}

/**
 * The awsClientConfigLayerFromProvider Layer lets an application keep
 * standard AWS request settings while choosing its own signing principal.
 * Provide the AwsCredentialProvider for that principal before building it.
 *
 * @see ../../../../refs/effect/packages/effect/src/Layer.ts (effect and provide)
 */
export const awsClientConfigLayerFromProvider = Layer.effect(
  AwsClientConfig,
  AwsClientConfig.make,
).pipe(
  Layer.provide(AwsSharedProfiles.layer),
  Layer.provide([NodeFileSystem.layer, NodePath.layer]),
);
