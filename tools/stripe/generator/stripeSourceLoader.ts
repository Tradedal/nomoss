import { Context, Effect, FileSystem, Layer, Path, Schema } from "effect";
import { Digest } from "effect/crypto";
import type { OpenApiSpecification } from "../../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import {
  type StripeOpenApiSource,
  StripeOpenApiSourceMismatch,
} from "../model.js";

/**
 * The StripeSourceLoader service accepts only the upstream bytes selected by
 * the source manifest. Its SHA-256 digest restricts reviewed corrections to
 * the revision for which their expected values were recorded.
 */
export class StripeSourceLoader extends Context.Service<StripeSourceLoader>()(
  "nomoss/tools/stripe/generator/stripeSourceLoader",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const digest = yield* Digest.Digest;
      const catalogs = yield* OperationCatalogs;

      /**
       * The loadOpenApiDocument service method gives discovery an OpenAPI
       * document with the corrections selected in the manifest. The caller
       * supplies referenceDirectory with the original bytes of the file named
       * by source.specification. Each correction must match the value recorded
       * for that revision.
       *
       * The method fails with StripeOpenApiSourceMismatch when the file's
       * digest differs from the manifest. It also propagates failures when the
       * file cannot be read or its JSON, OpenAPI contract, or corrections are
       * invalid.
       */
      const loadOpenApiDocument = Effect.fn(
        "StripeSourceLoader.loadOpenApiDocument",
      )(function* (
        referenceDirectory: string,
        source: typeof StripeOpenApiSource.Type,
      ) {
        const bytes = yield* fs.readFile(
          path.join(referenceDirectory, source.specification),
        );

        yield* digest.digestHex(Digest.sha256, bytes).pipe(
          Effect.filterOrFail(
            (checksum) => checksum === source.sha256,
            (actual) =>
              new StripeOpenApiSourceMismatch({
                expected: source.sha256,
                actual,
              }),
          ),
        );

        const snapshot = yield* Schema.decodeEffect(
          Schema.fromJsonString(Schema.JsonObject),
        )(new TextDecoder().decode(bytes));

        const corrected = yield* catalogs.prepareOpenApiDocument(
          {
            provider: "Stripe",
            service: "Stripe",
            name: source.specification,
            format: "OpenApi",
          },
          snapshot,
          source.corrections,
        );

        const document: OpenApiSpecification = corrected;

        return document;
      });

      return { loadOpenApiDocument };
    }),
  },
) {}

export const stripeSourceLoaderLayer = Layer.effect(
  StripeSourceLoader,
  StripeSourceLoader.make,
);
