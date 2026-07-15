#!/usr/bin/env node

import { Effect } from "effect";

import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import { Command } from "effect/unstable/cli";

import { nomossCliCommand } from "./cliCommand.js";
import { nomossCliRuntimeLayer } from "./cliRuntimeLayer.js";

export const cli = nomossCliCommand.pipe(
  Command.run({
    version: "0.0.1",
  }),
  Effect.provide(nomossCliRuntimeLayer),
);

NodeRuntime.runMain(cli);
