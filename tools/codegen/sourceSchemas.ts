import { Data, Schema } from "effect";

/**
 * Generation accepts the bytes reviewed at the recorded upstream revision.
 * The checksum remains authoritative when a local checkout has moved, so a
 * changed specification requires an explicit source selection before use.
 */
export const SpecificationFile = Schema.Struct({
  specification: Schema.NonEmptyString,
  revision: Schema.NonEmptyString,
  sha256: Schema.String.check(Schema.isPattern(/^[a-f0-9]{64}$/)),
});

export type SpecificationFile = typeof SpecificationFile.Type;

/**
 * A mismatch identifies the file that changed before generation can apply
 * corrections or compile contracts from an unreviewed document.
 */
export class SpecificationSourceMismatch extends Data.TaggedError(
  "SpecificationSourceMismatch",
)<{
  readonly specification: string;
  readonly expected: string;
  readonly actual: string;
}> {}
