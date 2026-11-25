import { NodeServices } from "@effect/platform-node";
import { assert, layer } from "@effect/vitest";
import { Array as Arr, ConfigProvider, Effect, Layer } from "effect";
import { Command } from "effect/cli";
import { TestConsole } from "effect/testing";
import { exampleCommands } from "../examples/commands.js";

layer(
  Layer.merge(
    NodeServices.layer,
    ConfigProvider.layer(
      ConfigProvider.fromUnknown({
        NOMOSS_STATE_SECRET_STORE: "invalid-test-store",
      }),
    ),
  ),
  { buildPerTest: true },
)("Nomoss CLI help", (it) => {
  it.effect(
    "The application shows its command help even with invalid state configuration",
    () =>
      Effect.gen(function* () {
        yield* Command.runWith(exampleCommands, { version: "test" })([
          "queue",
          "--help",
        ]);

        const output = Arr.join(
          Arr.map(yield* TestConsole.logLines, String),
          "\n",
        );

        assert.include(output, "Show the application stack plan");
      }),
  );
});
