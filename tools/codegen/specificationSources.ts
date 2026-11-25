import { Context, Effect, FileSystem, Layer, Path, Schema } from "effect";
import { Digest } from "effect/crypto";
import {
  type SpecificationFile,
  SpecificationSourceMismatch,
} from "./sourceSchemas.js";

/**
 * Provider generators share source verification so every document is checked
 * before corrections or schema compilation. Filesystem and digest services
 * come from the generation command's Layer graph.
 */
export class SpecificationSources extends Context.Service<SpecificationSources>()(
  "nomoss/tools/codegen/specificationSources",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const digest = yield* Digest.Digest;

      /**
       * The readJson service method returns a JSON document only after its
       * bytes match the source selection. Paths are relative to the supplied
       * reference directory. A changed file produces
       * SpecificationSourceMismatch before its contents reach a compiler.
       */
      const readJson = Effect.fn("SpecificationSources.readJson")(function* (
        referenceDirectory: string,
        source: SpecificationFile,
      ) {
        const bytes = yield* fs.readFile(
          path.join(referenceDirectory, source.specification),
        );

        yield* digest.digestHex(Digest.sha256, bytes).pipe(
          Effect.filterOrFail(
            (actual) => actual === source.sha256,
            (actual) =>
              new SpecificationSourceMismatch({
                specification: source.specification,
                expected: source.sha256,
                actual,
              }),
          ),
        );

        const document: Schema.JsonObject = yield* Schema.decodeEffect(
          Schema.fromJsonString(Schema.JsonObject),
        )(new TextDecoder().decode(bytes));

        return document;
      });

      return { readJson };
    }),
  },
) {}

export const specificationSourcesLayer = Layer.effect(
  SpecificationSources,
  SpecificationSources.make,
);
