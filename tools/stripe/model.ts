import { Data, Effect, Schema } from "effect";
import { StripeOperation } from "../../src/providers/stripe/client/stripeClientModel.js";
import { SourceCorrectionRegistry } from "../codegen/catalogSchemas.js";
import { OpenApiResourceHints } from "../codegen/resourceSchemas.js";

/**
 * StripeOpenApiSourceMismatch rejects generation from a specification that
 * differs from the reviewed source, even if the checkout path is unchanged.
 */
export class StripeOpenApiSourceMismatch extends Data.TaggedError(
  "StripeOpenApiSourceMismatch",
)<{
  readonly expected: string;
  readonly actual: string;
}> {}

/**
 * StripeOpenApiDocument retains shared provider schemas and operation paths
 * from the pinned public specification for Effect's schema compiler.
 */
export const StripeOpenApiDocument = Schema.Struct({
  openapi: Schema.Literal("3.0.0"),
  info: Schema.Struct({ version: Schema.String }),
  servers: Schema.NonEmptyArray(Schema.Struct({ url: Schema.String })),
  paths: Schema.Record(
    Schema.String,
    Schema.Record(Schema.String, Schema.Json),
  ),
  components: Schema.Struct({
    schemas: Schema.Record(
      Schema.String,
      Schema.Record(Schema.String, Schema.Json),
    ),
  }),
});

/**
 * Pins provider contracts and retains exceptional naming and policy hints.
 * Resource operations come from discovery across the corrected specification.
 */
export const StripeOpenApiSource = Schema.Struct({
  repository: Schema.String,
  revision: Schema.String,
  sha256: Schema.String,
  specification: Schema.String,
  clientNames: Schema.Record(Schema.String, Schema.NonEmptyString),
  modelModules: Schema.Record(
    Schema.String,
    Schema.NonEmptyArray(Schema.NonEmptyString),
  ),
  defaultModelModule: Schema.NonEmptyString,
  resourceNamespace: Schema.NonEmptyString,
  resourceHints: OpenApiResourceHints,
  corrections: SourceCorrectionRegistry.pipe(
    Schema.withDecodingDefaultType(Effect.succeed({})),
  ),
});

/**
 * The StripeOpenApiInvocation schema gives generated clients the request and
 * response contracts selected for a Stripe operation. Its error schema retains
 * the provider's validation for HTTP failures.
 */
export const StripeOpenApiInvocation = Schema.Struct({
  name: StripeOperation.fields.name,
  client: Schema.NonEmptyString,
  method: StripeOperation.fields.method,
  path: StripeOperation.fields.path,
  pathParameters: StripeOperation.fields.pathParameters,
  queryParameters: StripeOperation.fields.queryParameters,
  contentType: StripeOperation.fields.contentType,
  input: Schema.JsonObject,
  output: Schema.JsonObject,
  error: Schema.JsonObject,
});

export type StripeOpenApiInvocation = typeof StripeOpenApiInvocation.Type;
