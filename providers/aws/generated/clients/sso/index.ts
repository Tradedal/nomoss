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

export const RoleCredentials = Schema.StructWithRest(
  Schema.Struct({
    accessKeyId: optionalRestJsonMember(Schema.String),
    secretAccessKey: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
    sessionToken: optionalRestJsonMember(
      Schema.String.annotate({ format: "password" }),
    ),
    expiration: optionalRestJsonMember(
      Schema.Number.annotate({ default: 0 }).check(
        Schema.isFinite().annotate({ expected: "a finite number" }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "RoleCredentials" });

export type RoleCredentials = typeof RoleCredentials.Type;

export const GetRoleCredentialsRequest = Schema.StructWithRest(
  Schema.Struct({
    roleName: Schema.String,
    accountId: Schema.String,
    accessToken: Schema.String.annotate({ format: "password" }),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRoleCredentialsRequest = typeof GetRoleCredentialsRequest.Type;

export const GetRoleCredentialsResponseContent = Schema.StructWithRest(
  Schema.Struct({ roleCredentials: optionalRestJsonMember(RoleCredentials) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRoleCredentialsResponseContent =
  typeof GetRoleCredentialsResponseContent.Type;

export const InvalidRequestException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type InvalidRequestException = typeof InvalidRequestException.Type;

export const ResourceNotFoundException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ResourceNotFoundException = typeof ResourceNotFoundException.Type;

export const TooManyRequestsException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TooManyRequestsException = typeof TooManyRequestsException.Type;

export const UnauthorizedException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UnauthorizedException = typeof UnauthorizedException.Type;

export const ssoErrors = {
  InvalidRequestException: {
    name: "InvalidRequestException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: InvalidRequestException,
  },
  ResourceNotFoundException: {
    name: "ResourceNotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    schema: ResourceNotFoundException,
  },
  TooManyRequestsException: {
    name: "TooManyRequestsException",
    fault: "client",
    httpStatus: 429,
    retryable: null,
    schema: TooManyRequestsException,
  },
  UnauthorizedException: {
    name: "UnauthorizedException",
    fault: "client",
    httpStatus: 401,
    retryable: null,
    schema: UnauthorizedException,
  },
};

export const getRoleCredentialsErrors = [
  ssoErrors.InvalidRequestException,
  ssoErrors.ResourceNotFoundException,
  ssoErrors.TooManyRequestsException,
  ssoErrors.UnauthorizedException,
];

export const getRoleCredentialsOperation: AwsRestJsonOperation & {
  readonly input: typeof GetRoleCredentialsRequest;
  readonly output: typeof GetRoleCredentialsResponseContent;
} = {
  name: "GetRoleCredentials",
  unsigned: true,
  method: "GET",
  path: "/federation/credentials",
  headers: {},
  rest: {
    bindings: {
      accountId: {
        location: "QUERY",
        name: "account_id",
      },
      roleName: {
        location: "QUERY",
        name: "role_name",
      },
      accessToken: {
        location: "HEADER",
        name: "x-amz-sso_bearer_token",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetRoleCredentialsRequest,
  output: GetRoleCredentialsResponseContent,
  errors: getRoleCredentialsErrors,
};

export const getRoleCredentialsEndpoint = awsHttpEndpoint(
  "GetRoleCredentials",
  getRoleCredentialsOperation,
);

export const ssoOperations = {
  GetRoleCredentials: getRoleCredentialsOperation,
};

export const ssoApi = HttpApi.make("SSO").add(
  HttpApiGroup.make("sso").add(getRoleCredentialsEndpoint),
);

export const ssoService: AwsServiceDefinition = {
  service: "com.amazonaws.sso#SWBPortalService",
  version: "2019-06-10",
  protocol: "restJson1",
  signingName: "awsssoportal",
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
                          url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                          url: "https://portal.sso.{Region}.amazonaws.com",
                          properties: {},
                          headers: {},
                        },
                        type: "endpoint",
                      },
                      {
                        conditions: [],
                        endpoint: {
                          url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                          url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                  url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}",
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

/** The makeSSOClient Effect gives callers access to SSO with the region and credentials configured in their AWS runtime. */
export const makeSSOClient = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(ssoService);

  return {
    /** Returns the STS short-term credentials for a given role name that is assigned to the user. */
    getRoleCredentials: bindOperation(getRoleCredentialsOperation),
  };
});
