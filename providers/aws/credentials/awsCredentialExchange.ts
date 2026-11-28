import { awsClientLayer } from "@tradedal/aws-client-core";
import {
  AwsClientConfig,
  type AwsClientConfiguration,
  AwsClientConfigurationError,
  AwsCredentialProvider,
  AwsRegion,
} from "@tradedal/aws-client-core/config";
import { AwsRegionName } from "@tradedal/aws-client-core/model";
import { Effect, Layer, Option, Schema } from "effect";

/**
 * The regionLabel pattern accepts "us-east-1" as a single host label.
 * A value such as "example.com/" could change where a token is sent.
 */
const regionLabel = /^[a-z][a-z0-9-]{0,61}[a-z0-9]$/;

/**
 * The exchangeRegion schema rejects values that could change the host
 * selected by the AWS service's regional rules.
 *
 * @see ../../../refs/smithy/docs/source-2.0/additional-specs/rules-engine/specification.rst (Endpoint rule)
 */
const exchangeRegion = AwsRegionName.check(Schema.isPattern(regionLabel));

/**
 * The awsCredentialExchangeClientLayer Layer lets STS and IAM Identity
 * Center use the shared request client during credential acquisition.
 * The exchange uses its own region and trusted AWS address. A service URL
 * override for the application cannot redirect the token or source credentials.
 * Build a separate client instance so Effect's Layer memoization cannot
 * share the exchange configuration with the application client.
 *
 * @see ../../../refs/effect/packages/effect/src/Layer.ts (fresh and provide)
 */
export const awsCredentialExchangeClientLayer = Layer.fresh(
  awsClientLayer,
).pipe(
  Layer.provide(
    Layer.effect(
      AwsClientConfig,
      Effect.gen(function* () {
        const { resolveCredentials } = yield* AwsCredentialProvider;

        /**
         * The resolveConfiguration service method selects the region for
         * this exchange. A missing or invalid region fails before the
         * client sends source credentials or a sign-in token.
         */
        const resolveConfiguration = Effect.fn(
          "AwsCredentialExchange.resolveConfiguration",
        )(
          function* () {
            const region = yield* AwsRegion;
            const Region = yield* Schema.decodeUnknownEffect(exchangeRegion)(
              Option.getOrUndefined(region),
            );

            const configuration: AwsClientConfiguration = {
              Region,
              UseFIPS: false,
              UseDualStack: false,
              Endpoint: undefined,
              maxAttempts: 3,
            };

            return configuration;
          },
          Effect.mapError(
            () =>
              new AwsClientConfigurationError({
                message:
                  "A valid AWS region is required for credential exchange.",
              }),
          ),
        );

        return { resolveConfiguration, resolveCredentials };
      }),
    ),
  ),
);
