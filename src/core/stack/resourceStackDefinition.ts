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
 * The ResourceStackDefinition service supplies CLI commands with a prepared
 * resource graph. Its output callback stays unevaluated until apply succeeds.
 * The CLI treats application output data as opaque. Embedded callers retain
 * the concrete output type of their declaration Effect. Supply this service
 * and stack operations through the same application Layer graph.
 */
export class ResourceStackDefinition extends Context.Service<
  ResourceStackDefinition,
  ResourceApplicationPreparation<unknown>
>()("nomoss/core/stack/resourceStackDefinition") {}
