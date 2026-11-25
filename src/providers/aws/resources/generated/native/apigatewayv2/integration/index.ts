// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceReferenceSchema,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../../../core/resource/resourceOutputBinding.js";

interface ResponseParameter {
  readonly Destination?: string;
  readonly Source?: string;
}

const ResponseParameter = Schema.Struct({
  Destination: Schema.optionalKey(Schema.String),
  Source: Schema.optionalKey(Schema.String),
}).annotate({
  description: "response parameter",
  identifier: "ResponseParameter",
});

interface TlsConfig {
  readonly ServerNameToVerify?: string;
}

const TlsConfig = Schema.Struct({
  ServerNameToVerify: Schema.optionalKey(Schema.String),
}).annotate({
  description:
    "The TlsConfig property specifies the TLS configuration for a private integration. Supported only for HTTP APIs.",
  identifier: "TlsConfig",
});

type ResponseParameterList = ReadonlyArray<ResponseParameter>;

const ResponseParameterList = Schema.Array(ResponseParameter).annotate({
  description: "list of response parameters",
  identifier: "ResponseParameterList",
});

interface ResponseParameterMap {
  readonly ResponseParameters?: ResponseParameterList;
}

const ResponseParameterMap = Schema.Struct({
  ResponseParameters: Schema.optionalKey(ResponseParameterList),
}).annotate({
  description: "map of response parameter lists",
  identifier: "ResponseParameterMap",
});

export interface AWSIntegrationProps {
  readonly ApiId:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigatewayv2";
        readonly resource: "api";
      }>
    | string;
  readonly ConnectionId?: string;
  readonly ConnectionType?: string;
  readonly ContentHandlingStrategy?: string;
  readonly CredentialsArn?: string;
  readonly Description?: string;
  readonly IntegrationMethod?: string;
  readonly IntegrationSubtype?: string;
  readonly IntegrationType: string;
  readonly IntegrationUri?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "function";
      }>
    | string;
  readonly PassthroughBehavior?: string;
  readonly PayloadFormatVersion?: string;
  readonly RequestParameters?: {
    readonly [x: string]: string;
  };
  readonly RequestTemplates?: {
    readonly [x: string]: string;
  };
  readonly ResponseParameters?: {
    readonly [x: string]: ResponseParameterMap;
  };
  readonly TemplateSelectionExpression?: string;
  readonly TimeoutInMillis?: number;
  readonly TlsConfig?: TlsConfig;
}

export const AWSIntegrationResourceSchema = ResourceSchemaAnnotationSchema.make(
  {
    provider: "aws",
    service: "apigatewayv2",
    resource: "integration",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["ApiId"]],
    },
    primaryIdentifier: ["/properties/ApiId", "/properties/IntegrationId"],
  },
);
export const AWSIntegrationPropsSchema = annotateResourceSchema(
  Schema.Struct({
    ApiId: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("apigatewayv2"),
            resource: Schema.Literal("api"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["ApiId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({ description: "The API identifier." }),
    ]),
    ConnectionId: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The ID of the VPC link for a private integration. Supported only for HTTP APIs.",
      }),
    ),
    ConnectionType: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The type of the network connection to the integration endpoint. Specify INTERNET for connections through the public routable internet or VPC_LINK for private connections between API Gateway and resources in a VPC. The default value is INTERNET.",
      }),
    ),
    ContentHandlingStrategy: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are CONVERT_TO_BINARY and CONVERT_TO_TEXT.",
      }),
    ),
    CredentialsArn: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Specifies the credentials required for the integration, if any. For AWS integrations, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify the string arn:aws:iam::*:user/*. To use resource-based permissions on supported AWS services, don't specify this parameter.",
      }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "arn:(aws|aws-cn|aws-us-gov):iam::[0-9]*:(role|user|group)\\/.*",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp arn:(aws|aws-cn|aws-us-gov):iam::[0-9]*:(role|user|group)\\/.*",
        }),
      ),
    ),
    Description: Schema.optionalKey(
      Schema.String.annotate({
        description: "The description of the integration.",
      }),
    ),
    IntegrationMethod: Schema.optionalKey(
      Schema.String.annotate({
        description: "Specifies the integration's HTTP method type.",
      }),
    ),
    IntegrationSubtype: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Supported only for HTTP API AWS_PROXY integrations. Specifies the AWS service action to invoke.",
      }),
    ),
    IntegrationType: Schema.String.annotate({
      description: "The integration type of an integration.",
    }),
    IntegrationUri: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("lambda"),
              resource: Schema.Literal("function"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "For a Lambda integration, specify the URI of a Lambda function. For an HTTP integration, specify a fully-qualified URL. For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service.",
        }),
      ]),
    ),
    PassthroughBehavior: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Specifies the pass-through behavior for incoming requests based on the Content-Type header in the request, and the available mapping templates specified as the requestTemplates property on the Integration resource. There are three valid values: WHEN_NO_MATCH, WHEN_NO_TEMPLATES, and NEVER. Supported only for WebSocket APIs.",
      }),
    ),
    PayloadFormatVersion: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs, supported values for Lambda proxy integrations are 1.0 and 2.0 For all other integrations, 1.0 is the only supported value.",
      }),
    ),
    RequestParameters: Schema.optionalKey(
      Schema.Record(
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate(
            { expected: "a string matching the RegExp [a-zA-Z0-9]+" },
          ),
        ),
        Schema.String,
      ).annotate({ description: "A key-value map specifying parameters." }),
    ),
    RequestTemplates: Schema.optionalKey(
      Schema.Record(
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate(
            { expected: "a string matching the RegExp [a-zA-Z0-9]+" },
          ),
        ),
        Schema.String,
      ).annotate({
        description:
          "A map of Velocity templates that are applied on the request payload based on the value of the Content-Type header sent by the client.",
      }),
    ),
    ResponseParameters: Schema.optionalKey(
      Schema.Record(
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate(
            { expected: "a string matching the RegExp [a-zA-Z0-9]+" },
          ),
        ),
        ResponseParameterMap,
      ).annotate({
        description:
          "Parameters that transform the HTTP response from a backend integration before returning the response to clients. Supported only for HTTP APIs.",
      }),
    ),
    TemplateSelectionExpression: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The template selection expression for the integration. Supported only for WebSocket APIs.",
      }),
    ),
    TimeoutInMillis: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "Custom timeout between 50 and 29000 milliseconds for WebSocket APIs and between 50 and 30000 milliseconds for HTTP APIs. The default timeout is 29 seconds for WebSocket APIs and 30 seconds for HTTP APIs.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    TlsConfig: Schema.optionalKey(TlsConfig),
  }),
  AWSIntegrationResourceSchema,
);

export interface AWSIntegrationOutputs {
  readonly IntegrationId?: string;
  readonly ApiId: string;
}

export const AWSIntegrationOutputsSchema = Schema.Struct({
  IntegrationId: Schema.optionalKey(
    Schema.String.annotate({ description: "The integration ID." }),
  ),
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
});

export interface AWSIntegrationRequest {
  readonly ApiId: string;
  readonly ConnectionId?: string;
  readonly ConnectionType?: string;
  readonly ContentHandlingStrategy?: string;
  readonly CredentialsArn?: string;
  readonly Description?: string;
  readonly IntegrationMethod?: string;
  readonly IntegrationSubtype?: string;
  readonly IntegrationType: string;
  readonly IntegrationUri?: string;
  readonly PassthroughBehavior?: string;
  readonly PayloadFormatVersion?: string;
  readonly RequestParameters?: {
    readonly [x: string]: string;
  };
  readonly RequestTemplates?: {
    readonly [x: string]: string;
  };
  readonly ResponseParameters?: {
    readonly [x: string]: ResponseParameterMap;
  };
  readonly TemplateSelectionExpression?: string;
  readonly TimeoutInMillis?: number;
  readonly TlsConfig?: TlsConfig;
}

export const AWSIntegrationRequestSchema = Schema.Struct({
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
  ConnectionId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ID of the VPC link for a private integration. Supported only for HTTP APIs.",
    }),
  ),
  ConnectionType: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The type of the network connection to the integration endpoint. Specify INTERNET for connections through the public routable internet or VPC_LINK for private connections between API Gateway and resources in a VPC. The default value is INTERNET.",
    }),
  ),
  ContentHandlingStrategy: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Supported only for WebSocket APIs. Specifies how to handle response payload content type conversions. Supported values are CONVERT_TO_BINARY and CONVERT_TO_TEXT.",
    }),
  ),
  CredentialsArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the credentials required for the integration, if any. For AWS integrations, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify the string arn:aws:iam::*:user/*. To use resource-based permissions on supported AWS services, don't specify this parameter.",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "arn:(aws|aws-cn|aws-us-gov):iam::[0-9]*:(role|user|group)\\/.*",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp arn:(aws|aws-cn|aws-us-gov):iam::[0-9]*:(role|user|group)\\/.*",
      }),
    ),
  ),
  Description: Schema.optionalKey(
    Schema.String.annotate({
      description: "The description of the integration.",
    }),
  ),
  IntegrationMethod: Schema.optionalKey(
    Schema.String.annotate({
      description: "Specifies the integration's HTTP method type.",
    }),
  ),
  IntegrationSubtype: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Supported only for HTTP API AWS_PROXY integrations. Specifies the AWS service action to invoke.",
    }),
  ),
  IntegrationType: Schema.String.annotate({
    description: "The integration type of an integration.",
  }),
  IntegrationUri: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For a Lambda integration, specify the URI of a Lambda function. For an HTTP integration, specify a fully-qualified URL. For an HTTP API private integration, specify the ARN of an Application Load Balancer listener, Network Load Balancer listener, or AWS Cloud Map service.",
    }),
  ),
  PassthroughBehavior: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the pass-through behavior for incoming requests based on the Content-Type header in the request, and the available mapping templates specified as the requestTemplates property on the Integration resource. There are three valid values: WHEN_NO_MATCH, WHEN_NO_TEMPLATES, and NEVER. Supported only for WebSocket APIs.",
    }),
  ),
  PayloadFormatVersion: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the format of the payload sent to an integration. Required for HTTP APIs. For HTTP APIs, supported values for Lambda proxy integrations are 1.0 and 2.0 For all other integrations, 1.0 is the only supported value.",
    }),
  ),
  RequestParameters: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [a-zA-Z0-9]+",
        }),
      ),
      Schema.String,
    ).annotate({ description: "A key-value map specifying parameters." }),
  ),
  RequestTemplates: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [a-zA-Z0-9]+",
        }),
      ),
      Schema.String,
    ).annotate({
      description:
        "A map of Velocity templates that are applied on the request payload based on the value of the Content-Type header sent by the client.",
    }),
  ),
  ResponseParameters: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp("[a-zA-Z0-9]+", "u")).annotate({
          expected: "a string matching the RegExp [a-zA-Z0-9]+",
        }),
      ),
      ResponseParameterMap,
    ).annotate({
      description:
        "Parameters that transform the HTTP response from a backend integration before returning the response to clients. Supported only for HTTP APIs.",
    }),
  ),
  TemplateSelectionExpression: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The template selection expression for the integration. Supported only for WebSocket APIs.",
    }),
  ),
  TimeoutInMillis: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "Custom timeout between 50 and 29000 milliseconds for WebSocket APIs and between 50 and 30000 milliseconds for HTTP APIs. The default timeout is 29 seconds for WebSocket APIs and 30 seconds for HTTP APIs.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  TlsConfig: Schema.optionalKey(TlsConfig),
});
export const AWSIntegrationRelationshipIssues = [];
export const AWSIntegrationResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("apigatewayv2"),
  resource: Schema.Literal("integration"),
});

/**
 * The AWSIntegrationResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSIntegrationResource<
  Props = AWSIntegrationProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "apigatewayv2";
  readonly resource: "integration";
}> {
  constructor(
    key: ResourceKey,
    readonly props: Props,
    private readonly binding?: ResourceOutputBinding,
  ) {
    super({
      key,
      resourceType: {
        provider: "aws",
        service: "apigatewayv2",
        resource: "integration",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IntegrationId(): Required<AWSIntegrationOutputs>["IntegrationId"] {
    const value: Required<AWSIntegrationOutputs>["IntegrationId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IntegrationId",
        Schema.requiredKey(AWSIntegrationOutputsSchema.fields.IntegrationId),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApiId(): Required<AWSIntegrationOutputs>["ApiId"] {
    const value: Required<AWSIntegrationOutputs>["ApiId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ApiId",
        AWSIntegrationOutputsSchema.fields.ApiId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSIntegrationDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSIntegrationResource<Props> {
  const resource: AWSIntegrationResource<Props> =
    new AWSIntegrationResource<Props>(key, props, binding);

  return resource;
}

/** The AWSIntegration resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSIntegration = Effect.fn("AWSIntegration")(function* (input: {
  logicalId: string;
  props: AWSIntegrationProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSIntegrationPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSIntegrationResourceTypeSchema, {
    propsSchema: AWSIntegrationPropsSchema,
    requestSchema: AWSIntegrationRequestSchema,
    outputsSchema: AWSIntegrationOutputsSchema,
    props,
  });

  const resource: AWSIntegrationResource = createAWSIntegrationDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSIntegrationOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-apigatewayv2-integration.json",
      format: "CloudFormation",
    },
    typeName: "AWS::ApiGatewayV2::Integration",
    resource: "integration",
    primaryIdentifier: ["/properties/ApiId", "/properties/IntegrationId"],
    createOnlyProperties: ["/properties/ApiId"],
    writeOnlyProperties: [],
    outputs: {
      IntegrationId: {
        schema: {
          description: "The integration ID.",
          type: "string",
        },
        schemaPath: "/properties/IntegrationId",
        valuePath: "/IntegrationId",
        required: false,
      },
      ApiId: {
        schema: {
          description: "The API identifier.",
          type: "string",
        },
        schemaPath: "/properties/ApiId",
        valuePath: "/ApiId",
        required: true,
      },
    },
  },
];
