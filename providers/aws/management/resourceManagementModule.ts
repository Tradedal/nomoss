import { Data, Effect } from "effect";

class AwsResourceDefinitionLoadFailed extends Data.TaggedError(
  "AwsResourceDefinitionLoadFailed",
)<{
  readonly resourceType: string;
  readonly cause: unknown;
}> {
  override get message() {
    return `Could not load AWS management for ${this.resourceType}`;
  }
}

/**
 * The loadAwsManagementDefinition function returns an Effect that the
 * registry can run when a stack command needs the saved resource type.
 * If the import rejects, AwsResourceDefinitionLoadFailed identifies that
 * type and carries the import error.
 *
 * @see ../../../refs/effect/packages/effect/src/Effect.ts (tryPromise)
 */
export const loadAwsManagementDefinition = <Module, Definition>(
  resourceType: string,
  load: () => Promise<Module>,
  select: (module: Module) => Definition,
) =>
  Effect.tryPromise({
    try: load,
    catch: (cause) =>
      new AwsResourceDefinitionLoadFailed({ resourceType, cause }),
  }).pipe(Effect.map(select));
