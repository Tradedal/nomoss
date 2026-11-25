import {
  Array as Arr,
  Context,
  Data,
  Effect,
  JsonPatch,
  JsonPointer,
  Layer,
  Match,
  Option,
  Record,
  Schema,
} from "effect";
import { SourceCorrection } from "./correctionSchemas.js";

const decodeArray = Schema.decodeUnknownEffect(Schema.Array(Schema.Json));
const decodeObject = Schema.decodeUnknownEffect(Schema.JsonObject);

const readProperty = <A>(
  document: Effect.Effect<A, Schema.SchemaError>,
  get: (document: A) => Option.Option<Schema.Json>,
) => document.pipe(Effect.map(get), Effect.flatMap(Effect.fromOption));

/**
 * The SourceCorrectionError class identifies the rejected correction and its
 * path and expected value when a target is missing, its value has changed, or
 * a JSON patch fails. It includes the actual value when the target was resolved.
 */
export class SourceCorrectionError extends Data.TaggedError(
  "SourceCorrectionError",
)<{
  readonly correctionId: string;
  readonly path: SourceCorrection["path"];
  readonly reason: "MissingTarget" | "UnexpectedValue" | "InvalidPatch";
  readonly expected: Schema.Json;
  readonly actual: Option.Option<Schema.Json>;
  readonly cause?: unknown;
}> {}

/**
 * The SourceCorrections service requires each replacement or removal to match
 * the complete expected JSON value before it changes the target. Immutable
 * JSON patches preserve the caller's source document.
 */
export class SourceCorrections extends Context.Service<SourceCorrections>()(
  "nomoss/tools/codegen/sourceCorrections",
  {
    make: Effect.sync(() => {
      /**
       * The applyCorrection service method returns a corrected document only
       * after the target matches the expected value. Invalid input fails schema
       * decoding. Missing targets, changed values, and patch failures produce
       * SourceCorrectionError. The supplied document remains unchanged on
       * success and failure.
       */
      const applyCorrection = Effect.fn("SourceCorrections.applyCorrection")(
        function* (snapshot: unknown, input: SourceCorrection) {
          const source = yield* decodeObject(snapshot);

          const correction =
            yield* Schema.decodeEffect(SourceCorrection)(input);

          const actual = yield* Effect.reduce(
            correction.path,
            (): Schema.Json => source,
            (value: Schema.Json, segment) =>
              Match.value(segment).pipe(
                Match.when(Match.number, (index) =>
                  readProperty(decodeArray(value), Arr.get(index)),
                ),
                Match.orElse((key) =>
                  readProperty(decodeObject(value), Record.get(key)),
                ),
              ),
          ).pipe(
            Effect.mapError(
              (cause) =>
                new SourceCorrectionError({
                  correctionId: correction.id,
                  path: correction.path,
                  reason: "MissingTarget",
                  expected: correction.expected,
                  actual: Option.none(),
                  cause,
                }),
            ),
          );

          yield* Effect.succeed(actual).pipe(
            Effect.filterOrFail(
              (value) => JsonPatch.get(value, correction.expected).length === 0,
              (value) =>
                new SourceCorrectionError({
                  correctionId: correction.id,
                  path: correction.path,
                  reason: "UnexpectedValue",
                  expected: correction.expected,
                  actual: Option.some(value),
                }),
            ),
          );

          const pointer = Arr.join(
            Arr.map(correction.path, (segment) =>
              JsonPointer.escapeToken(String(segment)),
            ),
            "/",
          );
          const patch: JsonPatch.JsonPatchOperation = Match.value(
            correction,
          ).pipe(
            Match.when({ op: "replace" }, ({ value }) => {
              const replacement: JsonPatch.JsonPatchOperation = {
                op: "replace",
                path: `/${pointer}`,
                value,
              };

              return replacement;
            }),
            Match.when({ op: "remove" }, () => {
              const removal: JsonPatch.JsonPatchOperation = {
                op: "remove",
                path: `/${pointer}`,
              };

              return removal;
            }),
            Match.exhaustive,
          );

          const patched = yield* Effect.try({
            try: () => JsonPatch.apply([patch], source),
            catch: (cause) =>
              new SourceCorrectionError({
                correctionId: correction.id,
                path: correction.path,
                reason: "InvalidPatch",
                expected: correction.expected,
                actual: Option.some(actual),
                cause,
              }),
          });

          const correctedDocument: Schema.JsonObject =
            yield* Schema.decodeUnknownEffect(Schema.JsonObject)(patched);

          return correctedDocument;
        },
      );

      /**
       * The applyCorrections service method returns the document after every
       * correction succeeds in its declared order. Later expectations observe
       * earlier replacements. A rejected entry fails the operation and leaves
       * the supplied document unchanged.
       */
      const applyCorrections = Effect.fn("SourceCorrections.applyCorrections")(
        function* (snapshot: unknown, inputs: ReadonlyArray<SourceCorrection>) {
          const source = yield* Schema.decodeUnknownEffect(Schema.JsonObject)(
            snapshot,
          );

          const corrections = yield* Schema.decodeEffect(
            Schema.Array(SourceCorrection),
          )(inputs);

          const correctedDocument: Schema.JsonObject = yield* Effect.reduce(
            corrections,
            () => source,
            (document, correction) => applyCorrection(document, correction),
          );

          return correctedDocument;
        },
      );

      return { applyCorrection, applyCorrections };
    }),
  },
) {}

/**
 * The sourceCorrectionsLayer Layer requires no external service dependencies.
 */
export const sourceCorrectionsLayer = Layer.effect(
  SourceCorrections,
  SourceCorrections.make,
);
