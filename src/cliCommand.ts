import { Effect } from "effect";
import { Command } from "effect/cli";

import { ResourceStackDefinition } from "./core/stack/resourceStackDefinition.js";
import { ResourceStackOperations } from "./core/stack/resourceStackOperations.js";

const nomoss = Command.make("nomoss").pipe(
  Command.withDescription("Effect-native infrastructure automation"),
);

const apply = Effect.fn("NomossCli.apply")(function* () {
  const operations = yield* ResourceStackOperations;
  const definition = yield* ResourceStackDefinition;

  yield* operations.renderPlanThenApply(definition);
});

/**
 * The nomossCliCommand command lets an application manage the stack selected
 * by ResourceStackDefinition in its runtime. Provide ResourceStackOperations
 * from that same runtime when configuring the command. Both create and update
 * apply the desired configuration and can create or update resources as the
 * plan requires.
 */
export const nomossCliCommand = Command.withSubcommands(nomoss, [
  Command.make("diff", {}, () =>
    Effect.gen(function* () {
      const operations = yield* ResourceStackOperations;
      const definition = yield* ResourceStackDefinition;
      yield* operations.renderPlan(definition);
    }),
  ).pipe(Command.withDescription("Show the application stack plan")),
  Command.make("create", {}, apply).pipe(
    Command.withDescription(
      "Apply the desired application stack configuration",
    ),
  ),
  Command.make("update", {}, apply).pipe(
    Command.withDescription(
      "Apply the desired application stack configuration",
    ),
  ),
  Command.make("reconcile", {}, () =>
    Effect.gen(function* () {
      const operations = yield* ResourceStackOperations;
      const definition = yield* ResourceStackDefinition;
      yield* operations.renderReconcile(definition);
    }),
  ).pipe(
    Command.withDescription(
      "Refresh application stack state from its providers",
    ),
  ),
  Command.make("destroy", {}, () =>
    Effect.gen(function* () {
      const operations = yield* ResourceStackOperations;
      const definition = yield* ResourceStackDefinition;
      yield* operations.renderDestroy(definition);
    }),
  ).pipe(Command.withDescription("Destroy the managed application stack")),
]);
