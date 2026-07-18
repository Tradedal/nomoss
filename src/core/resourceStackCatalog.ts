import { Array as Arr, Context, Data, Effect, Exit } from "effect";

/**
 * Applications register this metadata for each independently managed stack.
 * Lifecycle services use it for selection and provider-region setup without
 * learning how the application declares its resources.
 */
export type ResourceStack = {
  readonly name: string;
  readonly description: string;
  readonly region: string;
};

/**
 * Stack lifecycle commands report the requested application name when its
 * catalog has no corresponding declaration.
 */
export class ResourceStackNotFound extends Data.TaggedError(
  "ResourceStackNotFound",
)<{
  readonly name: string;
}> {}

/**
 * Application declaration failures retain the selected stack name while
 * presenting one stable error contract to provider lifecycle consumers.
 */
export class ResourceStackDeclarationFailed extends Data.TaggedError(
  "ResourceStackDeclarationFailed",
)<{
  readonly name: string;
  readonly cause: unknown;
}> {}

/**
 * Application catalogs use the same lookup behavior so graph, plan, and live
 * lifecycle commands report absent stack names consistently.
 */
export const resourceStackFrom = Effect.fn("ResourceStackCatalog.get")(
  function* (stacks: ReadonlyArray<ResourceStack>, name: string) {
    return yield* Arr.findFirst(stacks, (stack) => stack.name === name).pipe(
      Effect.fromOption,
      Effect.mapError(() => new ResourceStackNotFound({ name })),
    );
  },
);

/**
 * Catalog layers close application-specific declaration failures behind the
 * error contract consumed by stack lifecycle commands.
 */
export const resourceStackDeclarationResult = Effect.fn(
  "ResourceStackCatalog.declarationResult",
)(function* (stack: ResourceStack, result: Exit.Exit<void, unknown>) {
  return yield* Exit.match(result, {
    onFailure: (cause) =>
      Effect.fail(
        new ResourceStackDeclarationFailed({
          name: stack.name,
          cause,
        }),
      ),
    onSuccess: () => Effect.void,
  });
});

/**
 * Catalog layers close over the resource services required by an application
 * declaration. This contract lets lifecycle code execute that declaration
 * without depending on its provider services or error types.
 */
export type ResourceStackCatalogService = {
  readonly defaultStackName: string;
  readonly names: ReadonlyArray<string>;
  readonly get: (name: string) => ReturnType<typeof resourceStackFrom>;
  readonly declare: (
    stack: ResourceStack,
  ) => ReturnType<typeof resourceStackDeclarationResult>;
};

/**
 * Applications supply this service at the executable edge. Nomoss lifecycle
 * code can then replay a selected declaration while core and provider packages
 * remain independent of project stack modules.
 */
export class ResourceStackCatalog extends Context.Service<
  ResourceStackCatalog,
  ResourceStackCatalogService
>()("nomoss/core/resourceStackCatalog") {}
