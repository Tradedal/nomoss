import type { RuleSetObject } from "@smithy/core/endpoints";
import { Data, Schema } from "effect";

export interface AwsServiceDefinition {
  readonly service: string;
  readonly version: string;
  readonly protocol: "awsJson1_0";
  readonly signingName: string;
  readonly endpointRules: RuleSetObject;
}

export interface AwsJsonRpcOperation {
  readonly name: string;
  readonly method: "POST";
  readonly path: `/${string}`;
  readonly headers: Readonly<Record<string, string>>;
  readonly idempotencyTokens: ReadonlyArray<string>;
  readonly pagination: Readonly<Record<string, Schema.Json>>;
  readonly waiters: Readonly<Record<string, Schema.Json>>;
  readonly errors: ReadonlyArray<{
    readonly name: string;
    readonly schema: Schema.Decoder<Schema.Json>;
    readonly retryable: Readonly<Record<string, Schema.Json>> | null;
  }>;
}

/**
 * AwsClient prepares this encoded AWS JSON payload before HTTP serialization.
 * Retries use the prepared payload to preserve the operation's generated
 * idempotency tokens.
 */
export const AwsJsonRpcPayload = Schema.Record(Schema.String, Schema.Json);

export type AwsJsonRpcPayload = typeof AwsJsonRpcPayload.Type;

export class AwsRequestError extends Data.TaggedError("AwsRequestError")<{
  readonly message: string;
}> {}

export class AwsServiceError extends Data.TaggedError("AwsServiceError")<{
  readonly service: string;
  readonly operation: string;
  readonly code: string;
  readonly statusCode: number;
  readonly message: string;
  readonly requestId: string | undefined;
  readonly retryAfter: string | undefined;
  readonly retryable: boolean;
  readonly details: Schema.Json;
}> {}
