import { Effect, Logger, Match, Schema } from "effect";

import { Argument, Command, Flag } from "effect/unstable/cli";

import {
  type StackName,
  StackNameSchema,
} from "./providers/aws/sampleStack.js";
import {
  applyLiveStack,
  destroyStack,
  listStackResources,
  printGraph,
  printLiveDiff,
  printPlan,
  type ResourceOutputFormat,
  showStackResource,
} from "./providers/aws/stackWorkflow.js";

const defaultStackName: StackName = "upload-events";

const stackFlag = Flag.string("stack").pipe(
  Flag.withDescription("Stack name"),
  Flag.withDefault(defaultStackName),
);

const profileFlag = Flag.string("profile").pipe(
  Flag.withDescription("AWS SSO profile used by the provider layer"),
  Flag.withDefault("default"),
);

const resourceFormatFlag = Flag.choice("format", [
  "text",
  "json",
  "logfmt",
  "logger-json",
  "structured",
] as const).pipe(
  Flag.withDescription("Resource output format"),
  Flag.withDefault("text" as ResourceOutputFormat),
);

const logicalIdArgument = Argument.string("logical-id");

const decodeStackName = (value: string) =>
  Schema.decodeUnknownEffect(StackNameSchema)(value);

const resourceLoggerLayer = (format: ResourceOutputFormat) =>
  Logger.layer([
    Match.value(format).pipe(
      Match.when("logfmt", () => Logger.consoleLogFmt),
      Match.when("logger-json", () => Logger.consoleJson),
      Match.when("structured", () => Logger.consoleStructured),
      Match.orElse(() => Logger.consolePretty({ colors: false })),
    ),
  ]);

const nomoss = Command.make("nomoss").pipe(
  Command.withDescription("Effect-native infrastructure graph prototype"),
);

const graph = Command.make("graph", { stack: stackFlag }, (flags) =>
  Effect.gen(function* () {
    const stackName = yield* decodeStackName(flags.stack);

    yield* printGraph(stackName);
  }),
).pipe(
  Command.withDescription("Print the discovered resource graph as Mermaid"),
);

const plan = Command.make("plan", { stack: stackFlag }, (flags) =>
  Effect.gen(function* () {
    const stackName = yield* decodeStackName(flags.stack);

    yield* printPlan(stackName);
  }),
).pipe(Command.withDescription("Print create batches for a stack"));

const list = Command.make(
  "list",
  { stack: stackFlag, format: resourceFormatFlag },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);
      const output = listStackResources({
        stackName,
        format: flags.format,
      });

      yield* Match.value(flags.format).pipe(
        Match.when("logfmt", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.when("logger-json", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.when("structured", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.orElse(() => output),
      );
    }),
).pipe(Command.withDescription("List stack resources"));

const show = Command.make(
  "show",
  {
    stack: stackFlag,
    format: resourceFormatFlag,
    logicalId: logicalIdArgument,
  },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);
      const output = showStackResource({
        stackName,
        logicalId: flags.logicalId,
        format: flags.format,
      });

      yield* Match.value(flags.format).pipe(
        Match.when("logfmt", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.when("logger-json", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.when("structured", () =>
          Effect.provide(output, resourceLoggerLayer(flags.format)),
        ),
        Match.orElse(() => output),
      );
    }),
).pipe(Command.withDescription("Show one stack resource"));

const diff = Command.make(
  "diff",
  { profile: profileFlag, stack: stackFlag },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);

      yield* printLiveDiff({
        profile: flags.profile,
        stackName,
      });
    }),
).pipe(Command.withDescription("Print live resource changes before apply"));

const apply = Command.make(
  "apply",
  { profile: profileFlag, stack: stackFlag },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);

      yield* applyLiveStack({
        profile: flags.profile,
        stackName,
      });
    }),
).pipe(Command.withDescription("Apply live resource changes"));

const destroy = Command.make(
  "destroy",
  {
    profile: profileFlag,
    stack: stackFlag,
  },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);

      yield* destroyStack({
        profile: flags.profile,
        stackName,
      });
    }),
).pipe(Command.withDescription("Destroy a stack"));

const create = Command.make(
  "create",
  {
    profile: profileFlag,
    stack: stackFlag,
  },
  (flags) =>
    Effect.gen(function* () {
      const stackName = yield* decodeStackName(flags.stack);

      yield* applyLiveStack({
        profile: flags.profile,
        stackName,
      });
    }),
).pipe(Command.withDescription("Create missing stack resources"));

export const nomossCliCommand = nomoss.pipe(
  Command.withSubcommands([
    graph,
    plan,
    list,
    show,
    diff,
    apply,
    destroy,
    create,
  ]),
);
