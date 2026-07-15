import { Context, Data, Effect, Match } from "effect";

/**
 * Stack declaration failures are reported through the definition service so
 * command entrypoints receive a Nomoss error instead of an untyped provider
 * or schema failure from the declaration path.
 */
export class ResourceStackDeclarationFailed extends Data.TaggedError(
  "ResourceStackDeclarationFailed",
)<{
  readonly stackName: string;
  readonly cause: unknown;
}> {}

/**
 * Applications provide this service to name the stack and register desired
 * resources. Provider services are captured when the application layer builds
 * the definition, so stack operations can run declaration, planning, apply,
 * destroy, and rendering without consumer lifecycle wiring.
 */
export class ResourceStackDefinition extends Context.Service<ResourceStackDefinition>()(
  "nomoss/core/resourceStackDefinition",
  {
    make: Effect.succeed({
      stackName: "",
      declare: Effect.fn("ResourceStackDefinition.declare")(function* () {
        yield* Match.value(Boolean(false)).pipe(
          Match.when(true, () =>
            Effect.fail(
              new ResourceStackDeclarationFailed({
                cause: "resource stack declaration not configured",
                stackName: "",
              }),
            ),
          ),
          Match.orElse(() => Effect.void),
        );
      }),
    }),
  },
) {}
