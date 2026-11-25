import { Data, Schema } from "effect";

/**
 * StripeOperation binds generated contracts to their versioned HTTP operation.
 * Parameter locations keep provider identifiers out of bodies and queries.
 */
export const StripeOperation = Schema.Struct({
  name: Schema.NonEmptyString,
  method: Schema.Literals(["GET", "POST", "DELETE"]),
  path: Schema.NonEmptyString,
  pathParameters: Schema.Array(Schema.String),
  queryParameters: Schema.Array(Schema.String),
  contentType: Schema.Literals([
    "application/json",
    "application/x-www-form-urlencoded",
  ]),
  apiVersion: Schema.NonEmptyString,
  baseUrl: Schema.NonEmptyString,
});

export type StripeOperation = typeof StripeOperation.Type;

/**
 * StripePayload is the encoded request accepted by the shared client before
 * parameter placement and Stripe's form or JSON serialization.
 */
export const StripePayload = Schema.Record(Schema.String, Schema.Json);
export type StripePayload = typeof StripePayload.Type;

/**
 * StripeApiError retains decoded provider details and HTTP request identity so
 * lifecycle callers can identify the rejected operation and investigate it.
 */
export class StripeApiError extends Data.TaggedError("StripeApiError")<{
  readonly operation: string;
  readonly statusCode: number;
  readonly requestId: string | undefined;
  readonly message: string;
  readonly details: Schema.Json;
}> {}
