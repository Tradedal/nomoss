import { type Cause, Context, Data } from "effect";
import type { ResourceApplicationPreparation } from "./resourceStackOperations.js";

/**
 * ResourceStackDeclarationFailed errors occur before lifecycle execution. The
 * cause preserves the original Effect failure so callers can diagnose
 * application code separately from a provider operation.
 */
export class ResourceStackDeclarationFailed extends Data.TaggedError(
  "ResourceStackDeclarationFailed",
)<{
  readonly stackName: string;
  readonly cause: Cause.Cause<unknown>;
}> {}

/**
 * The ResourceStackName service identifies the state document the selected
 * command reads, including commands that run without a declaration.
 */
export class ResourceStackName extends Context.Service<
  ResourceStackName,
  string
>()("nomoss/core/stack/resourceStackDefinition/ResourceStackName") {}

/**
 * The ResourceStackDefinition service gives planning and lifecycle commands
 * the prepared graph from the same runtime that executes their operations.
 */
export class ResourceStackDefinition extends Context.Service<
  ResourceStackDefinition,
  ResourceApplicationPreparation<unknown>
>()("nomoss/core/stack/resourceStackDefinition") {}
