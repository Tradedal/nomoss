import { Config, Effect, Layer, Match } from "effect";

import { DevTools } from "effect/unstable/devtools";

const tracingConfig = Config.all({
  devTools: Config.string("NOMOSS_EFFECT_DEVTOOLS").pipe(
    Config.withDefault("0"),
  ),
  logLevel: Config.string("NOMOSS_LOG_LEVEL").pipe(Config.withDefault("")),
  url: Config.string("NOMOSS_EFFECT_DEVTOOLS_URL").pipe(
    Config.withDefault("ws://localhost:34437"),
  ),
});

export const NomossTracingLive = Layer.unwrap(
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
