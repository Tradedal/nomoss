import { Schema, Tuple } from "effect";

/**
 * The SourceCorrectionPath schema excludes the document root from source
 * replacements. String segments select object properties, and nonnegative
 * integer segments select array elements. The target must already exist.
 */
export const SourceCorrectionPath = Schema.NonEmptyArray(
  Schema.Union([
    Schema.String,
    Schema.Int.check(Schema.isGreaterThanOrEqualTo(0)),
  ]),
);

/**
 * The SourceCorrection schema requires an expected JSON value that
 * applyCorrection must match before it replaces or removes a source value.
 * A new field requires a replacement of the object that contains it.
 */
export const SourceCorrection = Schema.Union([
  Schema.Struct({ op: Schema.Literal("replace"), value: Schema.Json }),
  Schema.Struct({ op: Schema.Literal("remove") }),
]).mapMembers(
  Tuple.map(
    Schema.fieldsAssign({
      id: Schema.NonEmptyString,
      reason: Schema.NonEmptyString,
      path: SourceCorrectionPath,
      expected: Schema.Json,
    }),
  ),
);

export type SourceCorrection = typeof SourceCorrection.Type;
