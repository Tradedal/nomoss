import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, Layer } from "effect";
import { Command } from "effect/cli";
import { nomossCliVersion } from "nomoss/cli";
import { NomossTracingLive } from "nomoss/core";
import { queueStackCommand } from "./runtime.js";

NodeRuntime.runMain(
  Effect.gen(function* () {
    const version = yield* nomossCliVersion;

    yield* queueStackCommand.pipe(Command.run({ version }));
  }).pipe(Effect.provide(Layer.merge(NomossTracingLive, NodeServices.layer))),
);
