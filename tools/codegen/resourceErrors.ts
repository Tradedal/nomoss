import { Data } from "effect";

/**
 * The ResourceSourceInvalid error identifies the resource and operation whose
 * source contracts cannot produce the selected binding or output. Its message
 * records the validation failure for catalog diagnostics.
 */
export class ResourceSourceInvalid extends Data.TaggedError(
  "ResourceSourceInvalid",
)<{
  readonly typeName: string;
  readonly message: string;
  readonly operationId?: string;
}> {}
