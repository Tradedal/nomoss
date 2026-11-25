import { Context, Effect, Layer } from "effect";
import type { OpenApiSpecification } from "../../codegen/catalogSchemas.js";
import { OperationCatalogs } from "../../codegen/operationCatalogs.js";
import {
  SpecificationSources,
  specificationSourcesLayer,
} from "../../codegen/specificationSources.js";
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
      const sources = yield* SpecificationSources;
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
        const snapshot = yield* sources
          .readJson(referenceDirectory, source)
          .pipe(
            Effect.catchTag(
              "SpecificationSourceMismatch",
              ({ expected, actual }) =>
                Effect.fail(
                  new StripeOpenApiSourceMismatch({ expected, actual }),
                ),
            ),
          );

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
).pipe(Layer.provide(specificationSourcesLayer));
