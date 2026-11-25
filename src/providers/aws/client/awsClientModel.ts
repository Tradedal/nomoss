import type { RuleSetObject } from "@smithy/core/endpoints";
import type { Schema as SmithySchema } from "@smithy/types";
import { Data, Schema } from "effect";
import type { HttpMethod } from "effect/http";

/**
 * The AwsServiceDefinition interface carries the protocol and regional rules
 * the generated client uses to find and sign requests for an AWS service.
 */
export interface AwsServiceDefinition {
  readonly service: string;
  readonly version: string;
  readonly protocol: "awsJson1_0" | "restJson1" | "awsQuery";
  readonly xmlNamespace?: string;
  readonly signingName: string;
  readonly endpointRules: RuleSetObject;
}

/**
 * The AwsHttpOperation interface carries the HTTP request and failure
 * metadata the client needs to execute an operation and decide whether to retry.
 */
export interface AwsHttpOperation {
  readonly name: string;
  readonly method: HttpMethod.HttpMethod;
  readonly path: `/${string}`;
  readonly headers: Readonly<Record<string, string>>;
  readonly idempotencyTokens: ReadonlyArray<string>;
  readonly pagination: Readonly<Record<string, Schema.Json>>;
  readonly waiters: Readonly<Record<string, Schema.Json>>;
  readonly errors: ReadonlyArray<{
    readonly name: string;
    readonly code?: string;
    readonly schema: Schema.Decoder<Schema.Json>;
    readonly retryable: Readonly<Record<string, Schema.Json>> | null;
  }>;
}

/**
 * The AwsJsonRpcOperation interface describes an AWS JSON 1.0 request. The
 * generated target header identifies the operation on the shared POST path.
 */
export interface AwsJsonRpcOperation extends AwsHttpOperation {
  readonly method: "POST";
  readonly rest?: never;
  readonly query?: never;
}

/**
 * The AwsRestJsonOperation interface retains Smithy's HTTP bindings and
 * accepted success statuses. Input members without a binding form the JSON
 * body when the operation accepts one. A registration may accept an additional
 * observed success status while retaining the generated response schema.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/spec/http-bindings.rst (HTTP message bindings)
 */
export interface AwsRestJsonOperation extends AwsHttpOperation {
  readonly query?: never;
  readonly rest: {
    readonly bindings: Readonly<
      Record<
        string,
        {
          readonly location: "LABEL" | "QUERY" | "HEADER";
          readonly name: string;
        }
      >
    >;
    readonly status: number | readonly number[];
    readonly body: boolean;
  };
}

/**
 * The AwsQueryOperation interface carries the Smithy shapes used by the SDK
 * to form Query requests and decode XML results for the same operation.
 */
export interface AwsQueryOperation extends AwsHttpOperation {
  readonly method: "POST";
  readonly rest?: never;
  readonly query: {
    readonly input: SmithySchema;
    readonly output: SmithySchema;
  };
}

/**
 * The AwsOperation type connects generated protocol contracts to the shared
 * AWS client used by resource registrations.
 */
export type AwsOperation =
  | AwsJsonRpcOperation
  | AwsRestJsonOperation
  | AwsQueryOperation;

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
