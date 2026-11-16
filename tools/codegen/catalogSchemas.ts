import { Effect, Schema } from "effect";
import { SourceCorrection } from "./correctionSchemas.js";
import {
  ClientOperation,
  OperationJsonSchema,
  OperationResponseStatus,
} from "./operationSchemas.js";

/**
 * The OperationSource schema keeps each generated operation's service and
 * source document available to discovery. Smithy sources reach discovery
 * through the official OpenAPI converter.
 */
export const OperationSource = Schema.Struct({
  provider: Schema.NonEmptyString,
  service: Schema.NonEmptyString,
  name: Schema.NonEmptyString,
  format: Schema.Literals(["OpenApi", "Smithy"]),
});

export type OperationSource = typeof OperationSource.Type;

/**
 * The SourceCorrectionRegistry schema assigns reviewed corrections to their
 * source documents so catalog extraction and schema compilation use the same
 * corrections.
 */
export const SourceCorrectionRegistry = Schema.Record(
  Schema.NonEmptyString,
  Schema.Array(SourceCorrection),
);

export type SourceCorrectionRegistry = typeof SourceCorrectionRegistry.Type;

/**
 * The OpenApiSpecification schema preserves service-specific execution
 * metadata alongside the corrected source document used by provider generation.
 */
export const OpenApiSpecification = Schema.StructWithRest(
  Schema.Struct({
    openapi: Schema.String.check(Schema.isPattern(/^3\.[01]\.\d+$/)),
    info: Schema.StructWithRest(
      Schema.Struct({ version: Schema.NonEmptyString }),
      [Schema.JsonObject],
    ),
    servers: Schema.Array(Schema.Struct({ url: Schema.String })).pipe(
      Schema.withDecodingDefaultType(Effect.succeed([])),
    ),
    paths: Schema.Record(Schema.String, Schema.JsonObject),
    components: Schema.StructWithRest(
      Schema.Struct({
        schemas: Schema.Record(Schema.String, OperationJsonSchema).pipe(
          Schema.withDecodingDefaultType(Effect.succeed({})),
        ),
      }),
      [Schema.JsonObject],
    ).pipe(Schema.withDecodingDefaultType(Effect.succeed({ schemas: {} }))),
  }),
  [Schema.JsonObject],
);

export type OpenApiSpecification = typeof OpenApiSpecification.Type;

/**
 * Object references can move a request or response out of its operation path.
 * The resolved location keeps catalog references anchored in the source document.
 */
export const OpenApiObjectLocation = Schema.Struct({
  path: Schema.NonEmptyString,
  object: Schema.JsonObject,
});
export type OpenApiObjectLocation = typeof OpenApiObjectLocation.Type;

/**
 * Catalog readers need the originating document's service configuration
 * alongside each operation's requirements. Keeping their extension records
 * distinct lets generated entries refer to shared configuration while
 * retaining the data specific to an operation.
 */
export const OperationMetadata = Schema.Struct({
  source: OperationSource,
  version: Schema.NonEmptyString,
  operationId: ClientOperation.fields.operationId,
  method: ClientOperation.fields.method,
  path: ClientOperation.fields.path,
  servers: Schema.Array(Schema.String),
  parameters: Schema.Array(
    Schema.Struct({
      name: Schema.NonEmptyString,
      location: Schema.Literals(["path", "query", "header", "cookie"]),
      required: Schema.Boolean,
    }),
  ),
  requestBody: Schema.optionalKey(
    Schema.Struct({
      required: Schema.Boolean,
      mediaTypes: Schema.Array(Schema.String),
    }),
  ),
  responses: Schema.Record(
    OperationResponseStatus,
    Schema.Array(Schema.String),
  ),
  providerMetadata: Schema.Struct({
    document: Schema.JsonObject,
    operation: Schema.JsonObject,
  }),
});

export type OperationMetadata = typeof OperationMetadata.Type;

/**
 * Discovery returns operation schemas beside the metadata extracted from
 * them so provider generation uses the catalog's corrected contracts.
 */
export const OperationCatalog = Schema.Struct({
  source: OperationSource,
  document: OpenApiSpecification,
  operations: Schema.Array(ClientOperation),
  metadata: Schema.Array(OperationMetadata),
});

export type OperationCatalog = typeof OperationCatalog.Type;
