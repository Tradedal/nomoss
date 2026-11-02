import { Context, Data, Effect, Exit } from "effect";

/**
 * ResourceStackDefinitionMismatch identifies a requested stack name that does
 * not match the application's declaration, retaining both names for diagnosis.
 */
export class ResourceStackDefinitionMismatch extends Data.TaggedError(
  "ResourceStackDefinitionMismatch",
)<{
  readonly defined: string;
  readonly requested: string;
}> {}

/**
 * ResourceStackDeclarationFailed preserves the application failure and stack
 * name when resource declaration cannot complete. Command diagnostics can
 * identify the stack even if registration failed before producing any nodes.
 */
export class ResourceStackDeclarationFailed extends Data.TaggedError(
  "ResourceStackDeclarationFailed",
)<{
  readonly stackName: string;
  readonly cause: unknown;
}> {}

/**
 * resourceStackDeclarationResult associates a failed declaration with its
 * stack name for command diagnostics. A successful declaration remains a
 * successful void result.
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
  readonly program: ReturnType<typeof resourceStackDeclarationResult>;
};

/**
 * ResourceStackDefinition identifies the application's stack and declaration
 * program for stack operations. Its name scopes saved resources across runs;
 * provider configuration belongs to the application's runtime Layers.
 */
export class ResourceStackDefinition extends Context.Service<
  ResourceStackDefinition,
  ResourceStackDefinitionService
>()("nomoss/core/stack/resourceStackDefinition") {}
