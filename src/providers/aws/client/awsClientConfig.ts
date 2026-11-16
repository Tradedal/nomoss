import { defaultProvider } from "@aws-sdk/credential-provider-node";
import {
  loadConfig,
  NODE_REGION_CONFIG_FILE_OPTIONS,
  NODE_REGION_CONFIG_OPTIONS,
  NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
  NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
} from "@smithy/core/config";
import { NODE_MAX_ATTEMPT_CONFIG_OPTIONS } from "@smithy/core/retry";
import { Context, Data, Effect, Layer, Option } from "effect";

/**
 * AwsRegion overrides environment and shared-profile region selection for
 * both request addresses and signing. Applications can leave it absent to use
 * their existing AWS configuration.
 */
export const AwsRegion = Context.Reference<Option.Option<string>>(
  "nomoss/providers/aws/client/region",
  { defaultValue: Option.none },
);

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken?: string;
  readonly expiration?: Date;
}

export interface AwsClientConfiguration {
  readonly Region: string;
  readonly UseFIPS: boolean;
  readonly UseDualStack: boolean;
  readonly Endpoint: string | undefined;
  readonly maxAttempts: number;
}

export class AwsClientConfigurationError extends Data.TaggedError(
  "AwsClientConfigurationError",
)<{ readonly message: string }> {}

/**
 * AwsClientConfig resolves AWS execution settings and credentials from the
 * application's configuration. Credential resolution is available separately
 * so retries can use a refreshed session and reuse the prepared request unchanged.
 */
export class AwsClientConfig extends Context.Service<AwsClientConfig>()(
  "nomoss/providers/aws/client/awsClientConfig",
  {
    make: Effect.gen(function* () {
      const configuredRegion = yield* AwsRegion;
      const credentials = defaultProvider();
      const region = loadConfig(
        NODE_REGION_CONFIG_OPTIONS,
        NODE_REGION_CONFIG_FILE_OPTIONS,
      );
      const useFips = loadConfig(NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS);
      const useDualStack = loadConfig(
        NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
      );
      const maxAttempts = loadConfig(NODE_MAX_ATTEMPT_CONFIG_OPTIONS);
      const endpoint = loadConfig({
        environmentVariableSelector: (env) => env.AWS_ENDPOINT_URL,
        configFileSelector: (profile) => profile.endpoint_url,
        default: () => undefined,
      });

      /**
       * The resolveCredentials service method asks the credential provider for
       * credentials at each signing attempt so it can refresh an expired session.
       * Resolution failures produce a typed configuration error.
       */
      const resolveCredentials = Effect.fn(
        "AwsClientConfig.resolveCredentials",
      )(function* () {
        const resolved: AwsCredentials = yield* Effect.tryPromise({
          try: () => credentials(),
          catch: (error) =>
            new AwsClientConfigurationError({
              message: `AWS credential resolution failed: ${String(error)}`,
            }),
        });

        return resolved;
      });

      /**
       * resolveConfiguration returns regional settings and the retry limit
       * used to execute an operation.
       * The application region override takes precedence over environment and
       * profile selection for both requests and signing.
       */
      const resolveConfiguration = Effect.fn(
        "AwsClientConfig.resolveConfiguration",
      )(function* () {
        const resolved: AwsClientConfiguration = yield* Effect.tryPromise({
          try: async () => {
            const [Region, UseFIPS, UseDualStack, Endpoint, attempts] =
              await Promise.all([
                Option.getOrElse(configuredRegion, region),
                useFips(),
                useDualStack(),
                endpoint(),
                maxAttempts(),
              ]);

            const configuration: AwsClientConfiguration = {
              Region,
              UseFIPS,
              UseDualStack,
              Endpoint,
              maxAttempts: attempts,
            };

            return configuration;
          },
          catch: (error) =>
            new AwsClientConfigurationError({
              message: `AWS configuration resolution failed: ${String(error)}`,
            }),
        });

        return resolved;
      });

      return { resolveCredentials, resolveConfiguration };
    }),
  },
) {}

export const awsClientConfigLayer = Layer.effect(
  AwsClientConfig,
  AwsClientConfig.make,
);
