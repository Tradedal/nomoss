import {
  Array as Arr,
  Cause,
  Console,
  Context,
  Effect,
  Match,
  Option,
  String as Str,
} from "effect";
import { ResourceCommandExecutionFailed } from "./core/resource/resourceCommandPolicy.js";
import {
  ResourceStackDeclarationFailed,
  ResourceStackName,
} from "./core/stack/resourceStackDefinition.js";
import { ResourceStackOperationRejected } from "./core/stack/resourceStackOperations.js";

/**
 * The renderCliFailure function prints failure messages with the owning stack
 * and resource when those annotations are available. Help requests and pure
 * interruption produce no failure message. The runtime owns the exit code
 * and signal handling.
 *
 * @see ../../command-options-fund/refs/effect/packages/effect/src/Cause.ts (Cause.annotate and Cause.reasonAnnotations)
 */
export const renderCliFailure = Effect.fn("NomossCli.renderFailure")(function* (
  cause: Cause.Cause<unknown>,
) {
  yield* Effect.forEach(
    Arr.filter(cause.reasons, (reason) => !Cause.isInterruptReason(reason)),
    (reason) => {
      const stack = Context.getOption(
        Cause.reasonAnnotations(reason),
        ResourceStackName,
      );

      const failureCause = Cause.fromReasons([reason]);
      const failure = Option.getOrUndefined(
        Cause.findErrorOption(failureCause),
      );

      const detail = Arr.join(
        Arr.map(Cause.prettyErrors(failureCause), ({ message }) => message),
        "\n",
      );

      const message = Match.value(failure).pipe(
        Match.when(
          Match.instanceOf(ResourceCommandExecutionFailed),
          ({ command, cause }) => {
            const action = Match.value(command).pipe(
              Match.tag("Apply", ({ decision }) => decision),
              Match.orElse((action) => action),
            );

            const resource = action.node.key.logicalId;

            const heading = Option.match(stack, {
              onNone: () => `Resource "${resource}"`,
              onSome: (name) => `Stack "${name}", resource "${resource}"`,
            });

            const detail = Option.liftPredicate(
              cause.message,
              Str.isNonEmpty,
            ).pipe(Option.getOrElse(() => cause._tag));

            return `${heading}. ${action._tag} failed. ${detail}`;
          },
        ),
        Match.when(
          Match.instanceOf(ResourceStackDeclarationFailed),
          ({ stackName, cause }) =>
            `Could not read the declaration for stack "${stackName}".\n${Arr.join(
              Arr.map(Cause.prettyErrors(cause), ({ message }) => message),
              "\n",
            )}`,
        ),
        Match.when(
          Match.instanceOf(ResourceStackOperationRejected),
          ({ message }) => message,
        ),
        Match.orElse(() =>
          Option.match(stack, {
            onNone: () => detail,
            onSome: (name) => `Stack "${name}" failed\n${detail}`,
          }),
        ),
      );

      return Console.error(message).pipe(
        Effect.when(
          Effect.succeed(
            Match.value(failure).pipe(
              Match.when({ _tag: "ShowHelp" }, () => false),
              Match.orElse(() => true),
            ),
          ),
        ),
      );
    },
    { discard: true },
  );
});
