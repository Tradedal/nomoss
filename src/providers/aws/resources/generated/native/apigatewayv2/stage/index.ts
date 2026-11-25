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

interface AccessLogSettings {
  readonly Format?: string;
  readonly DestinationArn?: string;
}

const AccessLogSettings = Schema.Struct({
  Format: Schema.optionalKey(Schema.String),
  DestinationArn: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "AccessLogSettings" });

interface RouteSettings {
  readonly LoggingLevel?: string;
  readonly DataTraceEnabled?: boolean;
  readonly ThrottlingBurstLimit?: number;
  readonly DetailedMetricsEnabled?: boolean;
  readonly ThrottlingRateLimit?: number;
}

const RouteSettings = Schema.Struct({
  LoggingLevel: Schema.optionalKey(Schema.String),
  DataTraceEnabled: Schema.optionalKey(Schema.Boolean),
  ThrottlingBurstLimit: Schema.optionalKey(Schema.Int),
  DetailedMetricsEnabled: Schema.optionalKey(Schema.Boolean),
  ThrottlingRateLimit: Schema.optionalKey(Schema.Finite),
}).annotate({ identifier: "RouteSettings" });

export interface AWSStageProps {
  readonly ClientCertificateId?: string;
  readonly DeploymentId?: string;
  readonly Description?: string;
  readonly AutoDeploy?: boolean;
  readonly AccessLogSettings?: AccessLogSettings;
  readonly RouteSettings?: {
    readonly [x: string]: Schema.Json;
  };
  readonly StageName: string;
  readonly StageVariables?: {
    readonly [x: string]: Schema.Json;
  };
  readonly ApiId:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigatewayv2";
        readonly resource: "api";
      }>
    | string;
  readonly DefaultRouteSettings?: RouteSettings;
  readonly Tags?: {
    readonly [x: string]: Schema.Json;
  };
}

export const AWSStageResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "apigatewayv2",
  resource: "stage",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["StageName"], ["ApiId"]],
  },
  primaryIdentifier: ["/properties/ApiId", "/properties/StageName"],
});
export const AWSStagePropsSchema = annotateResourceSchema(
  Schema.Struct({
    ClientCertificateId: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The identifier of a client certificate for a Stage. Supported only for WebSocket APIs.",
      }),
    ),
    DeploymentId: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The deployment identifier for the API stage. Can't be updated if autoDeploy is enabled.",
      }),
    ),
    Description: Schema.optionalKey(
      Schema.String.annotate({
        description: "The description for the API stage.",
      }),
    ),
    AutoDeploy: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Specifies whether updates to an API automatically trigger a new deployment. The default value is false.",
      }),
    ),
    AccessLogSettings: Schema.optionalKey(AccessLogSettings),
    RouteSettings: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({ description: "Route settings for the stage." }),
    ),
    StageName: Schema.String.annotate({
      description:
        "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
    }),
    StageVariables: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "A map that defines the stage variables for a Stage. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.",
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
    DefaultRouteSettings: Schema.optionalKey(RouteSettings),
    Tags: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "The collection of tags. Each tag element is associated with a given resource.",
      }),
    ),
  }),
  AWSStageResourceSchema,
);

export interface AWSStageOutputs {
  readonly ApiId: string;
  readonly StageName: string;
}

export const AWSStageOutputsSchema = Schema.Struct({
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
  StageName: Schema.String.annotate({
    description:
      "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
  }),
});

export interface AWSStageRequest {
  readonly ClientCertificateId?: string;
  readonly DeploymentId?: string;
  readonly Description?: string;
  readonly AutoDeploy?: boolean;
  readonly AccessLogSettings?: AccessLogSettings;
  readonly RouteSettings?: {
    readonly [x: string]: Schema.Json;
  };
  readonly StageName: string;
  readonly StageVariables?: {
    readonly [x: string]: Schema.Json;
  };
  readonly ApiId: string;
  readonly DefaultRouteSettings?: RouteSettings;
  readonly Tags?: {
    readonly [x: string]: Schema.Json;
  };
}

export const AWSStageRequestSchema = Schema.Struct({
  ClientCertificateId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of a client certificate for a Stage. Supported only for WebSocket APIs.",
    }),
  ),
  DeploymentId: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The deployment identifier for the API stage. Can't be updated if autoDeploy is enabled.",
    }),
  ),
  Description: Schema.optionalKey(
    Schema.String.annotate({
      description: "The description for the API stage.",
    }),
  ),
  AutoDeploy: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether updates to an API automatically trigger a new deployment. The default value is false.",
    }),
  ),
  AccessLogSettings: Schema.optionalKey(AccessLogSettings),
  RouteSettings: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({ description: "Route settings for the stage." }),
  ),
  StageName: Schema.String.annotate({
    description:
      "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
  }),
  StageVariables: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "A map that defines the stage variables for a Stage. Variable names can have alphanumeric and underscore characters, and the values must match [A-Za-z0-9-._~:/?#&=,]+.",
    }),
  ),
  ApiId: Schema.String.annotate({ description: "The API identifier." }),
  DefaultRouteSettings: Schema.optionalKey(RouteSettings),
  Tags: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The collection of tags. Each tag element is associated with a given resource.",
    }),
  ),
});
export const AWSStageRelationshipIssues = [];
export const AWSStageResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("apigatewayv2"),
  resource: Schema.Literal("stage"),
});

/**
 * The AWSStageResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSStageResource<Props = AWSStageProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "apigatewayv2";
  readonly resource: "stage";
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
        resource: "stage",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get ApiId(): Required<AWSStageOutputs>["ApiId"] {
    const value: Required<AWSStageOutputs>["ApiId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "ApiId",
        AWSStageOutputsSchema.fields.ApiId,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get StageName(): Required<AWSStageOutputs>["StageName"] {
    const value: Required<AWSStageOutputs>["StageName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "StageName",
        AWSStageOutputsSchema.fields.StageName,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSStageDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSStageResource<Props> {
  const resource: AWSStageResource<Props> = new AWSStageResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/** The AWSStage resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSStage = Effect.fn("AWSStage")(function* (input: {
  logicalId: string;
  props: AWSStageProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSStagePropsSchema)(input.props);

  yield* declaration.registerEntity(AWSStageResourceTypeSchema, {
    propsSchema: AWSStagePropsSchema,
    requestSchema: AWSStageRequestSchema,
    outputsSchema: AWSStageOutputsSchema,
    props,
  });

  const resource: AWSStageResource = createAWSStageDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSStageOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-apigatewayv2-stage.json",
      format: "CloudFormation",
    },
    typeName: "AWS::ApiGatewayV2::Stage",
    resource: "stage",
    primaryIdentifier: ["/properties/ApiId", "/properties/StageName"],
    createOnlyProperties: ["/properties/StageName", "/properties/ApiId"],
    writeOnlyProperties: [],
    outputs: {
      ApiId: {
        schema: {
          description: "The API identifier.",
          type: "string",
        },
        schemaPath: "/properties/ApiId",
        valuePath: "/ApiId",
        required: true,
      },
      StageName: {
        schema: {
          description:
            "The stage name. Stage names can contain only alphanumeric characters, hyphens, and underscores, or be $default. Maximum length is 128 characters.",
          type: "string",
        },
        schemaPath: "/properties/StageName",
        valuePath: "/StageName",
        required: true,
      },
    },
  },
];
