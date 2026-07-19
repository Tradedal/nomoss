import { Context, Data, Effect, Exit } from "effect";

/**
 * `AwsStackLifecycle.prepare` receives a stack name from the CLI. It rejects a
 * mismatch before saving the loaded program's resources under that name.
 */
export class ResourceStackDefinitionMismatch extends Data.TaggedError(
  "ResourceStackDefinitionMismatch",
)<{
  readonly defined: string;
  readonly requested: string;
}> {}

/**
 * An application can fail while registering resources. This error records the
 * affected stack so the lifecycle command can report that failure.
 */
export class ResourceStackDeclarationFailed extends Data.TaggedError(
  "ResourceStackDeclarationFailed",
)<{
  readonly stackName: string;
  readonly cause: unknown;
}> {}

/**
 * When a resource constructor fails, this function attaches the stack name
 * before `AwsStackLifecycle` returns the error.
 */
export const resourceStackDeclarationResult = Effect.fn(
  "ResourceStackDefinition.declarationResult",
)(function* (stackName: string, result: Exit.Exit<void, unknown>) {
  return yield* Exit.match(result, {
    onFailure: (cause) =>
      Effect.fail(new ResourceStackDeclarationFailed({ stackName, cause })),
    onSuccess: () => Effect.void,
  });
});

type ResourceStackDefinitionService = {
  readonly stackName: string;
  readonly description: string;
  readonly region: string;
  readonly program: ReturnType<typeof resourceStackDeclarationResult>;
};

/**
 * `AwsStackLifecycle` runs `program` whenever it prepares the stack.
 * `ResourceStateStore` saves the resulting graph under `stackName`. AWS calls
 * use `region`.
 */
export class ResourceStackDefinition extends Context.Service<
  ResourceStackDefinition,
  ResourceStackDefinitionService
>()("nomoss/core/resourceStackDefinition") {}
