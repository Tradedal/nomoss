import { Effect, Layer } from "effect";
import { Argument, Command, Flag } from "effect/cli";

import { resourceStackRuntimeLayer } from "./core/runtime/stackRuntimeLayer.js";
import {
  ResourceStackDeclarationFailed,
  ResourceStackDefinition,
  ResourceStackName,
} from "./core/stack/resourceStackDefinition.js";
import {
  type ResourceApplicationPreparation,
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "./core/stack/resourceStackOperations.js";

const propertyDiffFlags = {
  detailed: Flag.Boolean("detailed").pipe(
    Flag.withDescription("Show saved and desired property values"),
    Flag.withDefault(false),
  ),
};

type PropertyDiffFlags = Command.Command.Config.Infer<typeof propertyDiffFlags>;

const renderDiff = Effect.fn("NomossCli.diff")(function* ({
  detailed,
}: PropertyDiffFlags) {
  const operations = yield* ResourceStackOperations;
  const prepared = yield* ResourceStackDefinition;

  yield* operations.renderDiff(prepared, detailed);
});

const diff = Command.make("diff", propertyDiffFlags, renderDiff).pipe(
  Command.withDescription("Show the application stack plan"),
);

const renderDependencies = Effect.fn("NomossCli.dependencies")(function* () {
  const operations = yield* ResourceStackOperations;
  const prepared = yield* ResourceStackDefinition;

  yield* operations.renderDependencies(prepared);
});

const dependencies = Command.make("dependencies", {}, renderDependencies).pipe(
  Command.withDescription("Show which resources depend on each other"),
);

const renderCreate = <Output, E, R>(
  preparation: Effect.Effect<ResourceApplicationPreparation<Output>, E, R>,
  renderOutputs?: (outputs: Output) => Effect.Effect<void>,
) =>
  Effect.fn("NomossCli.create")(function* () {
    const operations = yield* ResourceStackOperations;
    const prepared = yield* preparation;
    const { outputs } = yield* operations.renderCreate(prepared);

    yield* renderOutputs?.(outputs) ?? Effect.void;
  });

const create = Command.make(
  "create",
  {},
  renderCreate(ResourceStackDefinition),
).pipe(Command.withDescription("Deploy a stack with no applied resources"));

const renderUpdate = Effect.fn("NomossCli.update")(function* ({
  detailed,
}: PropertyDiffFlags) {
  const operations = yield* ResourceStackOperations;
  const prepared = yield* ResourceStackDefinition;

  yield* operations.renderUpdate(prepared, detailed);
});

const update = Command.make("update", propertyDiffFlags, renderUpdate).pipe(
  Command.withDescription("Apply changes to a deployed stack"),
);

const renderReconcile = Effect.fn("NomossCli.reconcile")(function* () {
  const operations = yield* ResourceStackOperations;
  const prepared = yield* ResourceStackDefinition;

  yield* operations.renderReconcile(prepared);
});

const reconcile = Command.make("reconcile", {}, renderReconcile).pipe(
  Command.withDescription("Refresh application stack state from its providers"),
);

const renderDelete = Effect.fn("NomossCli.delete")(function* () {
  const operations = yield* ResourceStackOperations;
  const prepared = yield* ResourceStackDefinition;

  yield* operations.renderDestroy(prepared);
});

const deleteStack = Command.make("delete", {}, renderDelete).pipe(
  Command.withAlias("destroy"),
  Command.withDescription("Remove the resources managed by the stack"),
);

/**
 * The stackLifecycleCommands tuple lists the lifecycle commands in help order.
 * Applications that install it with Command.withSubcommands supply the stack
 * operations and prepared declaration used by its handlers.
 *
 * @see ../../command-options-fund/refs/effect/packages/effect/src/cli/Command.ts (Command.withSubcommands)
 */
export const stackLifecycleCommands = [
  diff,
  dependencies,
  create,
  update,
  reconcile,
  deleteStack,
] as const;

const renderSavedResources = Effect.fn("NomossCli.state.list")(function* () {
  const operations = yield* ResourceStackOperations;
  const stackName = yield* ResourceStackName;

  yield* operations.renderSavedResources(stackName);
});

const stateList = Command.make("list", {}, renderSavedResources).pipe(
  Command.withDescription("List resources in saved stack state"),
);

const renderSavedResource = Effect.fn("NomossCli.state.read")(function* ({
  logicalId,
}: {
  readonly logicalId: string;
}) {
  const operations = yield* ResourceStackOperations;
  const stackName = yield* ResourceStackName;

  yield* operations.renderSavedResource(stackName, logicalId);
});

const stateRead = Command.make(
  "read",
  { logicalId: Argument.String("logical-id") },
  renderSavedResource,
).pipe(Command.withDescription("Show a resource from saved stack state"));

export const stackStateCommand = () =>
  Command.make("state").pipe(
    Command.withDescription("Inspect saved stack state"),
    Command.withSubcommands([stateList, stateRead]),
  );

/**
 * The withStackCommands function adds Nomoss operations to a command created
 * with Command.make. Command.withSubcommands preserves the parent command's
 * name and flags. Command.provideEffect prepares the declaration for lifecycle
 * handlers. State inspection and deletion use the stack name and its saved
 * records, so they can run when the declaration is incomplete.
 * An application can supply renderCreateOutputs to present selected values
 * after create succeeds. Command.withHandler gives create access to the
 * typed outputs of that application's declaration.
 *
 * @see ../../command-options-fund/refs/effect/packages/effect/src/cli/Command.ts (Command.withSubcommands, Command.provideEffect and Command.withHandler)
 */
export const withStackCommands = <Output, Error, Requirements>(stack: {
  readonly name: string;
  readonly resources: Effect.Effect<() => Output, Error, Requirements>;
  readonly renderCreateOutputs?: (outputs: Output) => Effect.Effect<void>;
}) => {
  const prepare = ResourceStackOperations.use((operations) =>
    operations.Stack(stack.name, stack.resources).pipe(
      Effect.catchCause((cause) =>
        Effect.fail(
          new ResourceStackDeclarationFailed({
            stackName: stack.name,
            cause,
          }),
        ),
      ),
    ),
  );

  const prepareRemoval = ResourceStackOperations.use((operations) =>
    operations.Stack(
      stack.name,
      Effect.succeed(() => undefined),
    ),
  );

  return Command.withSubcommands([
    Command.provideEffect(diff, ResourceStackDefinition, prepare),
    Command.provideEffect(dependencies, ResourceStackDefinition, prepare),
    Command.withHandler(
      create,
      renderCreate(prepare, stack.renderCreateOutputs),
    ),
    Command.provideEffect(update, ResourceStackDefinition, prepare),
    Command.provideEffect(reconcile, ResourceStackDefinition, prepare),
    Command.provideEffect(deleteStack, ResourceStackDefinition, prepareRemoval),
    Command.provideSync(stackStateCommand(), ResourceStackName, stack.name),
  ]);
};

/**
 * The nomossCliCommand command lets an application manage the stack selected
 * by ResourceStackDefinition in its runtime. Provide ResourceStackOperations
 * from that same runtime when configuring the command. Create deploys stacks
 * without applied resources, and update applies changes to deployed stacks.
 */
export const nomossCliCommand = Command.make("nomoss").pipe(
  Command.withDescription("Effect-native infrastructure automation"),
  Command.withSubcommands([...stackLifecycleCommands, stackStateCommand()]),
);

/**
 * The stackCommandRuntimeLayer supplies the shared graph and stack operations
 * to the command tree. The application provides its provider and state services.
 *
 * @see ../../command-options-fund/refs/effect-website/apps/web/src/content/docs/v4/requirements-management/layers.mdx
 */
export const stackCommandRuntimeLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(resourceStackRuntimeLayer),
);
