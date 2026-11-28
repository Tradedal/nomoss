import { Data, Schema } from "effect";
import type { HttpMethod } from "effect/http";
import type { AwsAddressRules } from "./awsServiceAddress.js";

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
  readonly endpointRules: AwsAddressRules;
}

/**
 * The AwsPagination schema determines whether a generated operation can
 * offer a paginator. Both token locations are required so a caller can
 * request the next page using the marker returned by AWS.
 *
 * @see ../../../../../refs/smithy/docs/source-2.0/spec/behavior-traits.rst (paginated trait)
 */
export const AwsPagination = Schema.Struct({
  inputToken: Schema.NonEmptyString,
  outputToken: Schema.NonEmptyString,
});

/**
 * The AwsHttpOperation interface carries the HTTP request and failure
 * metadata the client needs to execute an operation and decide whether to retry.
 */
export interface AwsHttpOperation {
  readonly name: string;
  readonly unsigned?: boolean;
  readonly method: HttpMethod.HttpMethod;
  readonly path: `/${string}`;
  readonly headers: Readonly<Record<string, string>>;
  readonly idempotencyTokens: ReadonlyArray<string>;
  readonly pagination: Readonly<Record<string, Schema.Json>>;
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
 * @see ../../../../../refs/smithy/docs/source-2.0/spec/http-bindings.rst (HTTP message bindings)
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

const AwsQueryTimestampFormat = Schema.Literals([
  "date-time",
  "http-date",
  "epoch-seconds",
]);
const AwsQueryMember = Schema.Struct({
  target: Schema.NonEmptyString,
  xmlName: Schema.optionalKey(Schema.NonEmptyString),
  timestampFormat: Schema.optionalKey(AwsQueryTimestampFormat),
  flattened: Schema.optionalKey(Schema.Boolean),
  attribute: Schema.optionalKey(Schema.Boolean),
});
export type AwsQueryMember = typeof AwsQueryMember.Type;

const AwsQueryShape = Schema.Union([
  Schema.Struct({
    type: Schema.Literals(["unit", "string", "number", "boolean"]),
  }),
  Schema.Struct({
    type: Schema.Literal("timestamp"),
    timestampFormat: Schema.optionalKey(AwsQueryTimestampFormat),
  }),
  Schema.Struct({
    type: Schema.Literal("structure"),
    members: Schema.Record(Schema.String, AwsQueryMember),
  }),
  Schema.Struct({ type: Schema.Literal("list"), member: AwsQueryMember }),
  Schema.Struct({
    type: Schema.Literal("map"),
    key: AwsQueryMember,
    value: AwsQueryMember,
  }),
]);

/**
 * The AwsQueryWire schema validates the references the Query codec uses for
 * form keys and XML members. Each shape ID can be reached through more than
 * one member without discarding the XML name configured on each reference.
 *
 * @see ../../../../refs/smithy/docs/source-2.0/aws/protocols/aws-query-protocol.rst (Query key resolution and XML shape serialization)
 */
export const AwsQueryWire = Schema.Struct({
  input: Schema.NonEmptyString,
  output: Schema.NonEmptyString,
  shapes: Schema.Record(Schema.String, AwsQueryShape),
});
export type AwsQueryWire = typeof AwsQueryWire.Type;

/**
 * The AwsQueryOperation interface carries the wire shapes needed to encode
 * a form and interpret the corresponding XML reply.
 */
export interface AwsQueryOperation extends AwsHttpOperation {
  readonly method: "POST";
  readonly rest?: never;
  readonly query: AwsQueryWire;
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
}> {
  /**
   * The hasCode method lets a resource recognize specific AWS rejections.
   * For example, a lifecycle can treat `NoSuchEntity` as absence while still
   * returning a failed network request to the caller.
   *
   * @see ../../../../../command-options-fund/refs/effect/packages/effect/src/Schema.ts (is and Literals)
   */
  static hasCode(
    ...codes: ReadonlyArray<string>
  ): (failure: unknown) => boolean {
    const modeledFailure = Schema.TaggedStruct("AwsServiceError", {
      code: Schema.Literals(codes),
    });

    return Schema.is(modeledFailure);
  }
}
export {
  AwsAccountId,
  AwsArn,
  AwsArnComponents,
  AwsArnFromString,
  AwsPartition,
  AwsRegionName,
} from "./awsArn.js";
