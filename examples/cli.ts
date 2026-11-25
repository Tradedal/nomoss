import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { Command } from "effect/cli";
import { nomossCliVersion, renderCliFailure } from "nomoss/cli";
import { NomossTracingLive } from "nomoss/core";
import { exampleCommands } from "./commands.js";

NodeRuntime.runMain(
  nomossCliVersion.pipe(
    Effect.flatMap((version) => Command.run(exampleCommands, { version })),
    Effect.provide(Layer.merge(NomossTracingLive, NodeServices.layer)),
    Effect.tapCause(renderCliFailure),
  ),
  { disableErrorReporting: true },
);
