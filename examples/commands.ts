import { Layer } from "effect";
import { Command } from "effect/cli";
import { stackCommandRuntimeLayer, withStackCommands } from "nomoss/cli";
import { queueStack } from "./queue/application.js";
import { billingStack } from "./stripe-billing/application.js";

const queue = Command.make("queue").pipe(
  Command.withDescription("Manage an Amazon SQS queue"),
  withStackCommands(queueStack),
  Command.provide(
    stackCommandRuntimeLayer.pipe(
      Layer.provideMerge(queueStack.providers),
      Layer.provide(queueStack.state),
    ),
  ),
);

const billing = Command.make("stripe-billing").pipe(
  Command.withDescription("Manage Stripe membership billing"),
  withStackCommands(billingStack),
  Command.provide(
    stackCommandRuntimeLayer.pipe(
      Layer.provideMerge(billingStack.providers),
      Layer.provide(billingStack.state),
    ),
  ),
);

export const exampleCommands = Command.make("nomoss").pipe(
  Command.withDescription("Manage the Nomoss example stacks"),
  Command.withSubcommands([queue, billing]),
);
