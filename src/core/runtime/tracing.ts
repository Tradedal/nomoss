import { Config, Effect, Layer, Match } from "effect";

import { DevTools } from "effect/devtools";
import { FetchHttpClient } from "effect/http";
import { OtlpSerialization, OtlpTracer } from "effect/observability";

const tracingConfig = Config.all({
  devTools: Config.String("NOMOSS_EFFECT_DEVTOOLS").pipe(
    Config.withDefault("0"),
  ),
  logLevel: Config.String("NOMOSS_LOG_LEVEL").pipe(Config.withDefault("")),
  url: Config.String("NOMOSS_EFFECT_DEVTOOLS_URL").pipe(
    Config.withDefault("ws://localhost:34437"),
  ),
});

const devToolsLayer = Layer.unwrap(
  Effect.gen(function* () {
    const config = yield* tracingConfig;
    const devToolsEnabled =
      config.logLevel === "DEBUG" || config.devTools === "1";

    return Match.value(devToolsEnabled).pipe(
      Match.when(true, () => DevTools.layer(config.url)),
      Match.orElse(() => Layer.empty),
    );
  }),
);

/**
 * NomossTracingLive exports application service spans to the configured OTLP
 * collector and flushes completed spans at scope shutdown. Application entry
 * points provide it once so nested operations share a tracer, including
 * optional observation through the existing Effect DevTools configuration.
 */
export const NomossTracingLive = devToolsLayer.pipe(
  Layer.provideMerge(
    OtlpTracer.layerFromConfig({ resource: { serviceName: "nomoss" } }).pipe(
      Layer.provide(OtlpSerialization.layerJson),
      Layer.provide(FetchHttpClient.layer),
    ),
  ),
);
