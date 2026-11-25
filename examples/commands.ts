import { Console, Layer } from "effect";
import { Command } from "effect/cli";
import { stackCommandRuntimeLayer, withStackCommands } from "nomoss/cli";
import { httpEchoStack } from "./http-echo/application.js";
import { queueStack } from "./queue/application.js";
import { stateMachineStack } from "./state-machine/application.js";
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

const stateMachine = Command.make("state-machine").pipe(
  Command.withDescription("Manage an AWS Step Functions workflow"),
  withStackCommands(stateMachineStack),
  Command.provide(
    stackCommandRuntimeLayer.pipe(
      Layer.provideMerge(stateMachineStack.providers),
      Layer.provide(stateMachineStack.state),
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

const httpEchoRuntime = stackCommandRuntimeLayer.pipe(
  Layer.provideMerge(httpEchoStack.providers),
  Layer.provide(httpEchoStack.state),
);

/**
 * The httpEcho command uses the same provider and state store for declaration
 * and lifecycle execution. Each subcommand receives that runtime through
 * Effect's command composition.
 *
 * @see ../../command-options-fund/refs/effect/packages/effect/src/cli/Command.ts (provide)
 */
const httpEcho = Command.make("http-echo").pipe(
  Command.withDescription("Manage an HTTP API backed by two Lambda functions"),
  withStackCommands({
    ...httpEchoStack,
    renderCreateOutputs: ({ url }) => Console.log(`API URL: ${url}`),
  }),
  Command.provide(httpEchoRuntime),
);

export const exampleCommands = Command.make("nomoss").pipe(
  Command.withDescription("Manage the Nomoss example stacks"),
  Command.withSubcommands([queue, stateMachine, billing, httpEcho]),
);
