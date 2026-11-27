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
import { relationshipValueCodec } from "../../../management/resourceOperation.js";

export interface AWSRouteProps {
  readonly RouteResponseSelectionExpression?: string;
  readonly RequestModels?: {
    readonly [x: string]: Schema.Json;
  };
  readonly OperationName?: string;
  readonly AuthorizationScopes?: ReadonlyArray<string>;
  readonly ApiKeyRequired?: boolean;
  readonly RouteKey: string;
  readonly AuthorizationType?: string;
  readonly ModelSelectionExpression?: string;
  readonly ApiId:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigatewayv2";
        readonly resource: "api";
      }>
    | string;
  readonly RequestParameters?: {
    readonly [x: string]: Schema.Json;
  };
  readonly Target?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigatewayv2";
        readonly resource: "integration";
      }>
    | string;
  readonly AuthorizerId?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigatewayv2";
        readonly resource: "authorizer";
      }>
    | string;
}

export const AWSRouteResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "apigatewayv2",
  resource: "route",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["ApiId"]],
  },
  primaryIdentifier: ["/properties/ApiId", "/properties/RouteId"],
});

export const AWSRoutePropsSchema = annotateResourceSchema(
  Schema.Struct({
    RouteResponseSelectionExpression: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The route response selection expression for the route. Supported only for WebSocket APIs.",
      }),
    ),
    RequestModels: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "The request models for the route. Supported only for WebSocket APIs.",
      }),
    ),
    OperationName: Schema.optionalKey(
      Schema.String.annotate({
        description: "The operation name for the route.",
      }),
    ),
    AuthorizationScopes: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description: "The authorization scopes supported by this route.",
      }),
    ),
    ApiKeyRequired: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Specifies whether an API key is required for the route. Supported only for WebSocket APIs.",
      }),
    ),
    RouteKey: Schema.String.annotate({
      description:
        "The route key for the route. For HTTP APIs, the route key can be either ``$default``, or a combination of an HTTP method and resource path, for example, ``GET /pets``.",
    }),
    AuthorizationType: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The authorization type for the route. For WebSocket APIs, valid values are ``NONE`` for open access, ``AWS_IAM`` for using AWS IAM permissions, and ``CUSTOM`` for using a Lambda authorizer. For HTTP APIs, valid values are ``NONE`` for open access, ``JWT`` for using JSON Web Tokens, ``AWS_IAM`` for using AWS IAM permissions, and ``CUSTOM`` for using a Lambda authorizer.",
      }),
    ),
    ModelSelectionExpression: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The model selection expression for the route. Supported only for WebSocket APIs.",
      }),
    ),
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
    RequestParameters: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "The request parameters for the route. Supported only for WebSocket APIs.",
      }),
    ),
    Target: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("apigatewayv2"),
              resource: Schema.Literal("integration"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["IntegrationId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({ description: "The target for the route." }),
      ]),
    ),
    AuthorizerId: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("apigatewayv2"),
              resource: Schema.Literal("authorizer"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["AuthorizerId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "The identifier of the ``Authorizer`` resource to be associated with this route. The authorizer identifier is generated by API Gateway when you created the authorizer.",
        }),
      ]),
    ),
  }),
  AWSRouteResourceSchema,
);

export interface AWSRouteOutputs {
  readonly RouteId?: string;
  readonly ApiId: string;
}

export const AWSRouteOutputsSchema = Schema.Struct({
  RouteId: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
});

export interface AWSRouteRequest {
  readonly RouteResponseSelectionExpression?: string;
  readonly RequestModels?: {
    readonly [x: string]: Schema.Json;
  };
  readonly OperationName?: string;
  readonly AuthorizationScopes?: ReadonlyArray<string>;
  readonly ApiKeyRequired?: boolean;
  readonly RouteKey: string;
  readonly AuthorizationType?: string;
  readonly ModelSelectionExpression?: string;
  readonly ApiId: string;
  readonly RequestParameters?: {
    readonly [x: string]: Schema.Json;
  };
  readonly Target?: string;
  readonly AuthorizerId?: string;
}

export const AWSRouteRequestSchema = Schema.Struct({
  RouteResponseSelectionExpression: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The route response selection expression for the route. Supported only for WebSocket APIs.",
    }),
  ),
  RequestModels: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The request models for the route. Supported only for WebSocket APIs.",
    }),
  ),
  OperationName: Schema.optionalKey(
    Schema.String.annotate({
      description: "The operation name for the route.",
    }),
  ),
  AuthorizationScopes: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "The authorization scopes supported by this route.",
    }),
  ),
  ApiKeyRequired: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether an API key is required for the route. Supported only for WebSocket APIs.",
    }),
  ),
  RouteKey: Schema.String.annotate({
    description:
      "The route key for the route. For HTTP APIs, the route key can be either ``$default``, or a combination of an HTTP method and resource path, for example, ``GET /pets``.",
  }),
  AuthorizationType: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The authorization type for the route. For WebSocket APIs, valid values are ``NONE`` for open access, ``AWS_IAM`` for using AWS IAM permissions, and ``CUSTOM`` for using a Lambda authorizer. For HTTP APIs, valid values are ``NONE`` for open access, ``JWT`` for using JSON Web Tokens, ``AWS_IAM`` for using AWS IAM permissions, and ``CUSTOM`` for using a Lambda authorizer.",
    }),
  ),
  ModelSelectionExpression: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The model selection expression for the route. Supported only for WebSocket APIs.",
    }),
  ),
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
  RequestParameters: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The request parameters for the route. Supported only for WebSocket APIs.",
    }),
  ),
  Target: Schema.optionalKey(
    Schema.String.annotate({ description: "The target for the route." }),
  ),
  AuthorizerId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the ``Authorizer`` resource to be associated with this route. The authorizer identifier is generated by API Gateway when you created the authorizer.",
    }),
  ),
});

/**
 * The AWSRouteRelationshipValueCodecs object lets an operation accept bare
 * IDs and AWS-prefixed IDs. Reads return the bare ID for comparison with the
 * declared relationship.
 */
export const AWSRouteRelationshipValueCodecs = {
  Target: relationshipValueCodec("integrations/"),
};

/**
 * The AWSRouteRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSRouteRelationshipIssues = [];

export const AWSRouteResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("apigatewayv2"),
  resource: Schema.Literal("route"),
});

/**
 * The AWSRouteResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSRouteResource<Props = AWSRouteProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "apigatewayv2";
  readonly resource: "route";
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
        resource: "route",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RouteId(): Required<AWSRouteOutputs>["RouteId"] {
    const value: Required<AWSRouteOutputs>["RouteId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RouteId",
        Schema.requiredKey(AWSRouteOutputsSchema.fields.RouteId),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApiId(): Required<AWSRouteOutputs>["ApiId"] {
    const value: Required<AWSRouteOutputs>["ApiId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ApiId",
        AWSRouteOutputsSchema.fields.ApiId,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSRouteDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSRouteResource<Props> {
  const resource: AWSRouteResource<Props> = new AWSRouteResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSRoute resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSRoute = Effect.fn("AWSRoute")(function* (input: {
  logicalId: string;
  props: AWSRouteProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSRoutePropsSchema)(input.props);

  yield* declaration.registerEntity(AWSRouteResourceTypeSchema, {
    propsSchema: AWSRoutePropsSchema,
    requestSchema: AWSRouteRequestSchema,
    outputsSchema: AWSRouteOutputsSchema,
    props,
  });

  const resource: AWSRouteResource = createAWSRouteDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
