// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@tradedal/aws-client-core";
import {
  awsHttpEndpoint,
  optionalRestJsonMember,
} from "@tradedal/aws-client-core/http-operation";
import type {
  AwsRestJsonOperation,
  AwsServiceDefinition,
} from "@tradedal/aws-client-core/model";
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiGroup } from "effect/http-api";

export const AccessDeniedExceptionReason = Schema.Literal(
  "KMS_AccessDeniedException",
).annotate({ identifier: "AccessDeniedExceptionReason" });

export type AccessDeniedExceptionReason =
  typeof AccessDeniedExceptionReason.Type;

export const InvalidRequestExceptionReason = Schema.Union([
  Schema.Literals([
    "KMS_NotFoundException",
    "KMS_InvalidKeyUsageException",
    "KMS_InvalidStateException",
    "KMS_DisabledException",
  ]),
  Schema.String,
]).annotate({ identifier: "InvalidRequestExceptionReason" });

export type InvalidRequestExceptionReason =
  typeof InvalidRequestExceptionReason.Type;

export const CreateTokenRequest = Schema.StructWithRest(
  Schema.Struct({
    clientId: Schema.String,
    clientSecret: Schema.String.annotate({ format: "password" }),
    grantType: Schema.String,
    deviceCode: optionalRestJsonMember(Schema.String),
    code: optionalRestJsonMember(Schema.String),
    refreshToken: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
    scope: optionalRestJsonMember(Schema.Array(Schema.String)),
    redirectUri: optionalRestJsonMember(Schema.String),
    codeVerifier: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateTokenRequest = typeof CreateTokenRequest.Type;

export const CreateTokenResponseContent = Schema.StructWithRest(
  Schema.Struct({
    accessToken: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
    tokenType: optionalRestJsonMember(Schema.String),
    expiresIn: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
    refreshToken: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
    idToken: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateTokenResponseContent = typeof CreateTokenResponseContent.Type;

export const AccessDeniedException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    reason: optionalRestJsonMember(AccessDeniedExceptionReason),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AccessDeniedException = typeof AccessDeniedException.Type;

export const AuthorizationPendingException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type AuthorizationPendingException =
  typeof AuthorizationPendingException.Type;

export const ExpiredTokenException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ExpiredTokenException = typeof ExpiredTokenException.Type;

export const InternalServerException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InternalServerException = typeof InternalServerException.Type;

export const InvalidClientException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidClientException = typeof InvalidClientException.Type;

export const InvalidGrantException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidGrantException = typeof InvalidGrantException.Type;

export const InvalidRequestException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    reason: optionalRestJsonMember(InvalidRequestExceptionReason),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidRequestException = typeof InvalidRequestException.Type;

export const InvalidScopeException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidScopeException = typeof InvalidScopeException.Type;

export const SlowDownException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type SlowDownException = typeof SlowDownException.Type;

export const UnauthorizedClientException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UnauthorizedClientException =
  typeof UnauthorizedClientException.Type;

export const UnsupportedGrantTypeException = Schema.StructWithRest(
  Schema.Struct({
    error: optionalRestJsonMember(Schema.String),
    error_description: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UnsupportedGrantTypeException =
  typeof UnsupportedGrantTypeException.Type;

export const ssooidcErrors = {
  AccessDeniedException: {
    name: "AccessDeniedException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: AccessDeniedException,
  },
  AuthorizationPendingException: {
    name: "AuthorizationPendingException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: AuthorizationPendingException,
  },
  ExpiredTokenException: {
    name: "ExpiredTokenException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: ExpiredTokenException,
  },
  InternalServerException: {
    name: "InternalServerException",
    fault: "server",
    httpStatus: 500,
    retryable: null,
    schema: InternalServerException,
  },
  InvalidClientException: {
    name: "InvalidClientException",
    fault: "client",
    httpStatus: 401,
    retryable: null,
    schema: InvalidClientException,
  },
  InvalidGrantException: {
    name: "InvalidGrantException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidGrantException,
  },
  InvalidRequestException: {
    name: "InvalidRequestException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidRequestException,
  },
  InvalidScopeException: {
    name: "InvalidScopeException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidScopeException,
  },
  SlowDownException: {
    name: "SlowDownException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: SlowDownException,
  },
  UnauthorizedClientException: {
    name: "UnauthorizedClientException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: UnauthorizedClientException,
  },
  UnsupportedGrantTypeException: {
    name: "UnsupportedGrantTypeException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: UnsupportedGrantTypeException,
  },
};

export const createTokenErrors = [
  ssooidcErrors.AccessDeniedException,
  ssooidcErrors.AuthorizationPendingException,
  ssooidcErrors.ExpiredTokenException,
  ssooidcErrors.InternalServerException,
  ssooidcErrors.InvalidClientException,
  ssooidcErrors.InvalidGrantException,
  ssooidcErrors.InvalidRequestException,
  ssooidcErrors.InvalidScopeException,
  ssooidcErrors.SlowDownException,
  ssooidcErrors.UnauthorizedClientException,
  ssooidcErrors.UnsupportedGrantTypeException,
];

export const createTokenOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateTokenRequest;
  readonly output: typeof CreateTokenResponseContent;
} = {
  name: "CreateToken",
  unsigned: true,
  method: "POST",
  path: "/token",
  headers: {},
  rest: {
    bindings: {},
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateTokenRequest,
  output: CreateTokenResponseContent,
  errors: createTokenErrors,
};

export const createTokenEndpoint = awsHttpEndpoint(
  "CreateToken",
  createTokenOperation,
);

export const ssooidcOperations = {
  CreateToken: createTokenOperation,
};

export const ssooidcApi = HttpApi.make("SSOOIDC").add(
  HttpApiGroup.make("ssooidc").add(createTokenEndpoint),
);

export const ssooidcService: AwsServiceDefinition = {
  service: "com.amazonaws.ssooidc#AWSSSOOIDCService",
  version: "2019-06-10",
  protocol: "restJson1",
  signingName: "sso-oauth",
  endpointRules: {
    version: "1.0",
    parameters: {
      Region: {
        type: "string",
        required: false,
      },
      UseDualStack: {
        type: "boolean",
        required: true,
        default: false,
      },
      UseFIPS: {
        type: "boolean",
        required: true,
        default: false,
      },
      Endpoint: {
        type: "string",
        required: false,
      },
    },
    rules: [
      {
        conditions: [
          {
            fn: "isSet",
            argv: [
              {
                ref: "Endpoint",
              },
            ],
          },
        ],
        rules: [
          {
            conditions: [
              {
                fn: "booleanEquals",
                argv: [
                  {
                    ref: "UseFIPS",
                  },
                  true,
                ],
              },
            ],
            error:
              "Invalid Configuration: FIPS and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [
              {
                fn: "booleanEquals",
                argv: [
                  {
                    ref: "UseDualStack",
                  },
                  true,
                ],
              },
            ],
            error:
              "Invalid Configuration: Dualstack and custom endpoint are not supported",
            type: "error",
          },
          {
            conditions: [],
            endpoint: {
              url: {
                ref: "Endpoint",
              },
              properties: {},
              headers: {},
            },
            type: "endpoint",
          },
        ],
        type: "tree",
      },
      {
        conditions: [
          {
            fn: "isSet",
            argv: [
              {
                ref: "Region",
              },
            ],
          },
        ],
        rules: [
          {
            conditions: [
              {
                fn: "aws.partition",
                argv: [
                  {
                    ref: "Region",
                  },
                ],
                assign: "PartitionResult",
              },
            ],
            rules: [
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseFIPS",
                      },
                      true,
                    ],
                  },
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseDualStack",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsFIPS",
                            ],
                          },
                        ],
                      },
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsDualStack",
                            ],
                          },
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "FIPS and DualStack are enabled, but this partition does not support one or both",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseFIPS",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsFIPS",
                            ],
                          },
                          true,
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [
                          {
                            fn: "stringEquals",
                            argv: [
                              {
                                fn: "getAttr",
                                argv: [
                                  {
                                    ref: "PartitionResult",
                                  },
                                  "name",
                                ],
                              },
                              "aws-us-gov",
                            ],
                          },
                        ],
                        endpoint: {
                          url: "https://oidc.{Region}.amazonaws.com",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "FIPS is enabled but this partition does not support FIPS",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [
                  {
                    fn: "booleanEquals",
                    argv: [
                      {
                        ref: "UseDualStack",
                      },
                      true,
                    ],
                  },
                ],
                rules: [
                  {
                    conditions: [
                      {
                        fn: "booleanEquals",
                        argv: [
                          true,
                          {
                            fn: "getAttr",
                            argv: [
                              {
                                ref: "PartitionResult",
                              },
                              "supportsDualStack",
                            ],
                          },
                        ],
                      },
                    ],
                    rules: [
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                    ],
                    type: "tree",
                  },
                  {
                    conditions: [],
                    error:
                      "DualStack is enabled but this partition does not support DualStack",
                    type: "error",
                  },
                ],
                type: "tree",
              },
              {
                conditions: [],
                endpoint: {
                  url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
                  properties: {},
                  headers: {},
                },
                type: "endpoint",
              },
            ],
            type: "tree",
          },
        ],
        type: "tree",
      },
      {
        conditions: [],
        error: "Invalid Configuration: Missing Region",
        type: "error",
      },
    ],
  },
};

/** The makeSSOOIDCClient Effect gives callers access to SSOOIDC with the region and credentials configured in their AWS runtime. */
export const makeSSOOIDCClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(ssooidcService);

  return {
    /** Creates and returns access and refresh tokens for clients that are authenticated using client secrets. The access token can be used to fetch short-lived credentials for the assigned AWS accounts or to access application APIs using bearer authentication. */
    createToken: bindOperation(createTokenOperation),
  };
});
