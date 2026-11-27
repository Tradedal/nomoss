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
import { ResourceOutputBinding } from "../../../../../src/core/resource/resourceOutputBinding.js";

interface BodyS3Location {
  readonly Etag?: string;
  readonly Bucket?: string;
  readonly Version?: string;
  readonly Key?: string;
}

const BodyS3Location = Schema.Struct({
  Etag: Schema.optionalKey(
    Schema.String.annotate({ description: "The Etag of the S3 object." }),
  ),
  Bucket: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The S3 bucket that contains the OpenAPI definition to import. Required if you specify a ``BodyS3Location`` for an API.",
    }),
  ),
  Version: Schema.optionalKey(
    Schema.String.annotate({ description: "The version of the S3 object." }),
  ),
  Key: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The key of the S3 object. Required if you specify a ``BodyS3Location`` for an API.",
    }),
  ),
}).annotate({
  description:
    "The ``BodyS3Location`` property specifies an S3 location from which to import an OpenAPI definition. Supported only for HTTP APIs.",
  identifier: "BodyS3Location",
});

interface Cors {
  readonly AllowOrigins?: ReadonlyArray<string>;
  readonly AllowCredentials?: boolean;
  readonly ExposeHeaders?: ReadonlyArray<string>;
  readonly AllowHeaders?: ReadonlyArray<string>;
  readonly MaxAge?: number;
  readonly AllowMethods?: ReadonlyArray<string>;
}

const Cors = Schema.Struct({
  AllowOrigins: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Represents a collection of allowed origins. Supported only for HTTP APIs.",
    }),
  ),
  AllowCredentials: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether credentials are included in the CORS request. Supported only for HTTP APIs.",
    }),
  ),
  ExposeHeaders: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Represents a collection of exposed headers. Supported only for HTTP APIs.",
    }),
  ),
  AllowHeaders: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Represents a collection of allowed headers. Supported only for HTTP APIs.",
    }),
  ),
  MaxAge: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of seconds that the browser should cache preflight request results. Supported only for HTTP APIs.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  AllowMethods: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "Represents a collection of allowed HTTP methods. Supported only for HTTP APIs.",
    }),
  ),
}).annotate({
  description:
    "The ``Cors`` property specifies a CORS configuration for an API. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.",
  identifier: "Cors",
});

export interface AWSApiProps {
  readonly RouteSelectionExpression?: string;
  readonly Body?: {
    readonly [x: string]: Schema.Json;
  };
  readonly BodyS3Location?: BodyS3Location;
  readonly BasePath?: string;
  readonly CredentialsArn?: string;
  readonly CorsConfiguration?: Cors;
  readonly RouteKey?: string;
  readonly Target?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "function";
      }>
    | string;
  readonly FailOnWarnings?: boolean;
  readonly Description?: string;
  readonly DisableExecuteApiEndpoint?: boolean;
  readonly DisableSchemaValidation?: boolean;
  readonly Name?: string;
  readonly Version?: string;
  readonly ProtocolType?: string;
  readonly Tags?: {
    readonly [x: string]: string;
  };
  readonly ApiKeySelectionExpression?: string;
  readonly IpAddressType?: string;
}

export const AWSApiResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "apigatewayv2",
  resource: "api",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["ProtocolType"]],
  },
  primaryIdentifier: ["/properties/ApiId"],
});

export const AWSApiPropsSchema = annotateResourceSchema(
  Schema.Struct({
    RouteSelectionExpression: Schema.optionalKey(
      Schema.String.annotate({
        description: `The route selection expression for the API. For HTTP APIs, the \`\`routeSelectionExpression\`\` must be \`\`\${request.method} \${request.path}\`\`. If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.`,
      }),
    ),
    Body: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a ``Body`` or ``BodyS3Location``. If you specify a ``Body`` or ``BodyS3Location``, don't specify CloudFormation resources such as ``AWS::ApiGatewayV2::Authorizer`` or ``AWS::ApiGatewayV2::Route``. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
      }),
    ),
    BodyS3Location: Schema.optionalKey(BodyS3Location),
    BasePath: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "Specifies how to interpret the base path of the API during import. Valid values are ``ignore``, ``prepend``, and ``split``. The default value is ``ignore``. To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html). Supported only for HTTP APIs.",
      }),
    ),
    CredentialsArn: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify ``arn:aws:iam::*:user/*``. To use resource-based permissions on supported AWS services, specify ``null``. Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.",
      }),
    ),
    CorsConfiguration: Schema.optionalKey(Cors),
    RouteKey: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "This property is part of quick create. If you don't specify a ``routeKey``, a default route of ``$default`` is created. The ``$default`` route acts as a catch-all for any request made to your API, for a particular stage. The ``$default`` route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.",
      }),
    ),
    Target: Schema.optionalKey(
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
            "This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.",
        }),
      ]),
    ),
    FailOnWarnings: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.",
      }),
    ),
    Description: Schema.optionalKey(
      Schema.String.annotate({ description: "The description of the API." }),
    ),
    DisableExecuteApiEndpoint: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Specifies whether clients can invoke your API by using the default ``execute-api`` endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.",
      }),
    ),
    DisableSchemaValidation: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Avoid validating models when creating a deployment. Supported only for WebSocket APIs.",
      }),
    ),
    Name: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The name of the API. Required unless you specify an OpenAPI definition for ``Body`` or ``S3BodyLocation``.",
      }),
    ),
    Version: Schema.optionalKey(
      Schema.String.annotate({
        description: "A version identifier for the API.",
      }),
    ),
    ProtocolType: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The API protocol. Valid values are ``WEBSOCKET`` or ``HTTP``. Required unless you specify an OpenAPI definition for ``Body`` or ``S3BodyLocation``.",
      }),
    ),
    Tags: Schema.optionalKey(
      Schema.Record(
        Schema.String.check(
          Schema.isPattern(new globalThis.RegExp(".*", "u")).annotate({
            expected: "a string matching the RegExp .*",
          }),
        ),
        Schema.String,
      ).annotate({
        description:
          "The collection of tags. Each tag element is associated with a given resource.",
      }),
    ),
    ApiKeySelectionExpression: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions).",
      }),
    ),
    IpAddressType: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The IP address types that can invoke the API. Use ``ipv4`` to allow only IPv4 addresses to invoke your API, or use ``dualstack`` to allow both IPv4 and IPv6 addresses to invoke your API.\n Don’t use IP address type for an HTTP API based on an OpenAPI specification. Instead, specify the IP address type in the OpenAPI specification.",
      }),
    ),
  }),
  AWSApiResourceSchema,
);

export interface AWSApiOutputs {
  readonly ApiId?: string;
  readonly ApiEndpoint?: string;
}

export const AWSApiOutputsSchema = Schema.Struct({
  ApiId: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  ApiEndpoint: Schema.optionalKey(Schema.String.annotate({ description: "" })),
});

export interface AWSApiRequest {
  readonly RouteSelectionExpression?: string;
  readonly Body?: {
    readonly [x: string]: Schema.Json;
  };
  readonly BodyS3Location?: BodyS3Location;
  readonly BasePath?: string;
  readonly CredentialsArn?: string;
  readonly CorsConfiguration?: Cors;
  readonly RouteKey?: string;
  readonly Target?: string;
  readonly FailOnWarnings?: boolean;
  readonly Description?: string;
  readonly DisableExecuteApiEndpoint?: boolean;
  readonly DisableSchemaValidation?: boolean;
  readonly Name?: string;
  readonly Version?: string;
  readonly ProtocolType?: string;
  readonly Tags?: {
    readonly [x: string]: string;
  };
  readonly ApiKeySelectionExpression?: string;
  readonly IpAddressType?: string;
}

export const AWSApiRequestSchema = Schema.Struct({
  RouteSelectionExpression: Schema.optionalKey(
    Schema.String.annotate({
      description: `The route selection expression for the API. For HTTP APIs, the \`\`routeSelectionExpression\`\` must be \`\`\${request.method} \${request.path}\`\`. If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.`,
    }),
  ),
  Body: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a ``Body`` or ``BodyS3Location``. If you specify a ``Body`` or ``BodyS3Location``, don't specify CloudFormation resources such as ``AWS::ApiGatewayV2::Authorizer`` or ``AWS::ApiGatewayV2::Route``. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
    }),
  ),
  BodyS3Location: Schema.optionalKey(BodyS3Location),
  BasePath: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies how to interpret the base path of the API during import. Valid values are ``ignore``, ``prepend``, and ``split``. The default value is ``ignore``. To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html). Supported only for HTTP APIs.",
    }),
  ),
  CredentialsArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify ``arn:aws:iam::*:user/*``. To use resource-based permissions on supported AWS services, specify ``null``. Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.",
    }),
  ),
  CorsConfiguration: Schema.optionalKey(Cors),
  RouteKey: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "This property is part of quick create. If you don't specify a ``routeKey``, a default route of ``$default`` is created. The ``$default`` route acts as a catch-all for any request made to your API, for a particular stage. The ``$default`` route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.",
    }),
  ),
  Target: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.",
    }),
  ),
  FailOnWarnings: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.",
    }),
  ),
  Description: Schema.optionalKey(
    Schema.String.annotate({ description: "The description of the API." }),
  ),
  DisableExecuteApiEndpoint: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether clients can invoke your API by using the default ``execute-api`` endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.",
    }),
  ),
  DisableSchemaValidation: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Avoid validating models when creating a deployment. Supported only for WebSocket APIs.",
    }),
  ),
  Name: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the API. Required unless you specify an OpenAPI definition for ``Body`` or ``S3BodyLocation``.",
    }),
  ),
  Version: Schema.optionalKey(
    Schema.String.annotate({
      description: "A version identifier for the API.",
    }),
  ),
  ProtocolType: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The API protocol. Valid values are ``WEBSOCKET`` or ``HTTP``. Required unless you specify an OpenAPI definition for ``Body`` or ``S3BodyLocation``.",
    }),
  ),
  Tags: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(
        Schema.isPattern(new globalThis.RegExp(".*", "u")).annotate({
          expected: "a string matching the RegExp .*",
        }),
      ),
      Schema.String,
    ).annotate({
      description:
        "The collection of tags. Each tag element is associated with a given resource.",
    }),
  ),
  ApiKeySelectionExpression: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions).",
    }),
  ),
  IpAddressType: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The IP address types that can invoke the API. Use ``ipv4`` to allow only IPv4 addresses to invoke your API, or use ``dualstack`` to allow both IPv4 and IPv6 addresses to invoke your API.\n Don’t use IP address type for an HTTP API based on an OpenAPI specification. Instead, specify the IP address type in the OpenAPI specification.",
    }),
  ),
});

/**
 * The AWSApiRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSApiRelationshipIssues = [];

export const AWSApiResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("apigatewayv2"),
  resource: Schema.Literal("api"),
});

/**
 * The AWSApiResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSApiResource<Props = AWSApiProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "apigatewayv2";
  readonly resource: "api";
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
        resource: "api",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApiId(): Required<AWSApiOutputs>["ApiId"] {
    const value: Required<AWSApiOutputs>["ApiId"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "ApiId",
      Schema.requiredKey(AWSApiOutputsSchema.fields.ApiId),
    );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApiEndpoint(): Required<AWSApiOutputs>["ApiEndpoint"] {
    const value: Required<AWSApiOutputs>["ApiEndpoint"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ApiEndpoint",
        Schema.requiredKey(AWSApiOutputsSchema.fields.ApiEndpoint),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSApiDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSApiResource<Props> {
  const resource: AWSApiResource<Props> = new AWSApiResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSApi resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSApi = Effect.fn("AWSApi")(function* (input: {
  logicalId: string;
  props: AWSApiProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSApiPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSApiResourceTypeSchema, {
    propsSchema: AWSApiPropsSchema,
    requestSchema: AWSApiRequestSchema,
    outputsSchema: AWSApiOutputsSchema,
    props,
  });

  const resource: AWSApiResource = createAWSApiDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
