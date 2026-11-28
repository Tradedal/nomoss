// Generated from Smithy's official OpenAPI transformation. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.

import { AwsClient } from "@nomoss/aws";
import {
  awsHttpEndpoint,
  optionalRestJsonMember,
} from "@nomoss/aws/http-operation";
import type {
  AwsRestJsonOperation,
  AwsServiceDefinition,
} from "@nomoss/aws/model";
import { Effect, Schema } from "effect";
import { HttpApi, HttpApiGroup, HttpApiSchema } from "effect/http-api";

export const Cors = Schema.StructWithRest(
  Schema.Struct({
    allowCredentials: optionalRestJsonMember(Schema.Boolean),
    allowHeaders: optionalRestJsonMember(Schema.Array(Schema.String)),
    allowMethods: optionalRestJsonMember(Schema.Array(Schema.String)),
    allowOrigins: optionalRestJsonMember(Schema.Array(Schema.String)),
    exposeHeaders: optionalRestJsonMember(Schema.Array(Schema.String)),
    maxAge: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(-1).annotate({
          expected: "a value greater than or equal to -1",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(86400).annotate({
          expected: "a value less than or equal to 86400",
        }),
      ),
    ),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "Cors" });

export type Cors = typeof Cors.Type;

export const IpAddressType = Schema.Union([
  Schema.Literals(["ipv4", "dualstack"]),
  Schema.String,
]).annotate({ identifier: "IpAddressType" });

export type IpAddressType = typeof IpAddressType.Type;

export const ProtocolType = Schema.Union([
  Schema.Literals(["WEBSOCKET", "HTTP"]),
  Schema.String,
]).annotate({ identifier: "ProtocolType" });

export type ProtocolType = typeof ProtocolType.Type;

export const Tags = Schema.Record(Schema.String, Schema.String).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "Tags",
  }),
);

export type Tags = typeof Tags.Type;

export const ConnectionType = Schema.Union([
  Schema.Literals(["INTERNET", "VPC_LINK"]),
  Schema.String,
]).annotate({ identifier: "ConnectionType" });

export type ConnectionType = typeof ConnectionType.Type;

export const ContentHandlingStrategy = Schema.Union([
  Schema.Literals(["CONVERT_TO_BINARY", "CONVERT_TO_TEXT"]),
  Schema.String,
]).annotate({ identifier: "ContentHandlingStrategy" });

export type ContentHandlingStrategy = typeof ContentHandlingStrategy.Type;

export const IntegrationType = Schema.Union([
  Schema.Literals(["AWS", "HTTP", "MOCK", "HTTP_PROXY", "AWS_PROXY"]),
  Schema.String,
]).annotate({ identifier: "IntegrationType" });

export type IntegrationType = typeof IntegrationType.Type;

export const PassthroughBehavior = Schema.Union([
  Schema.Literals(["WHEN_NO_MATCH", "NEVER", "WHEN_NO_TEMPLATES"]),
  Schema.String,
]).annotate({ identifier: "PassthroughBehavior" });

export type PassthroughBehavior = typeof PassthroughBehavior.Type;

export const IntegrationParameters = Schema.Record(
  Schema.String,
  Schema.String,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "IntegrationParameters",
  }),
);

export type IntegrationParameters = typeof IntegrationParameters.Type;

export const TemplateMap = Schema.Record(Schema.String, Schema.String).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "TemplateMap",
  }),
);

export type TemplateMap = typeof TemplateMap.Type;

export const TlsConfigInput = Schema.StructWithRest(
  Schema.Struct({ serverNameToVerify: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TlsConfigInput" });

export type TlsConfigInput = typeof TlsConfigInput.Type;

export const TlsConfig = Schema.StructWithRest(
  Schema.Struct({ serverNameToVerify: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "TlsConfig" });

export type TlsConfig = typeof TlsConfig.Type;

export const AuthorizationType = Schema.Union([
  Schema.Literals(["NONE", "AWS_IAM", "CUSTOM", "JWT"]),
  Schema.String,
]).annotate({ identifier: "AuthorizationType" });

export type AuthorizationType = typeof AuthorizationType.Type;

export const RouteModels = Schema.Record(Schema.String, Schema.String).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "RouteModels",
  }),
);

export type RouteModels = typeof RouteModels.Type;

export const ParameterConstraints = Schema.StructWithRest(
  Schema.Struct({ required: optionalRestJsonMember(Schema.Boolean) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "ParameterConstraints" });

export type ParameterConstraints = typeof ParameterConstraints.Type;

export const AccessLogSettings = Schema.StructWithRest(
  Schema.Struct({
    destinationArn: optionalRestJsonMember(Schema.String),
    format: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
).annotate({ identifier: "AccessLogSettings" });

export type AccessLogSettings = typeof AccessLogSettings.Type;

export const LoggingLevel = Schema.Union([
  Schema.Literals(["ERROR", "INFO", "OFF"]),
  Schema.String,
]).annotate({ identifier: "LoggingLevel" });

export type LoggingLevel = typeof LoggingLevel.Type;

export const StageVariablesMap = Schema.Record(
  Schema.String,
  Schema.String,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "StageVariablesMap",
  }),
);

export type StageVariablesMap = typeof StageVariablesMap.Type;

export const ResponseParameters = Schema.Record(
  Schema.String,
  IntegrationParameters,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "ResponseParameters",
  }),
);

export type ResponseParameters = typeof ResponseParameters.Type;

export const RouteParameters = Schema.Record(
  Schema.String,
  ParameterConstraints,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "RouteParameters",
  }),
);

export type RouteParameters = typeof RouteParameters.Type;

export const RouteSettings = Schema.StructWithRest(
  Schema.Struct({
    dataTraceEnabled: optionalRestJsonMember(Schema.Boolean),
    detailedMetricsEnabled: optionalRestJsonMember(Schema.Boolean),
    loggingLevel: optionalRestJsonMember(LoggingLevel),
    throttlingBurstLimit: optionalRestJsonMember(Schema.Finite),
    throttlingRateLimit: optionalRestJsonMember(
      Schema.Number.annotate({ format: "double" }).check(
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
).annotate({ identifier: "RouteSettings" });

export type RouteSettings = typeof RouteSettings.Type;

export const RouteSettingsMap = Schema.Record(
  Schema.String,
  RouteSettings,
).check(
  Schema.isPropertyNames(Schema.String).annotate({
    expected: "an object with property names matching the schema",
    identifier: "RouteSettingsMap",
  }),
);

export type RouteSettingsMap = typeof RouteSettingsMap.Type;

export const CreateApiRequest = Schema.StructWithRest(
  Schema.Struct({
    apiKeySelectionExpression: optionalRestJsonMember(Schema.String),
    corsConfiguration: optionalRestJsonMember(Cors),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    disableSchemaValidation: optionalRestJsonMember(Schema.Boolean),
    disableExecuteApiEndpoint: optionalRestJsonMember(Schema.Boolean),
    ipAddressType: optionalRestJsonMember(IpAddressType),
    name: Schema.String,
    protocolType: ProtocolType,
    routeKey: optionalRestJsonMember(Schema.String),
    routeSelectionExpression: optionalRestJsonMember(Schema.String),
    tags: optionalRestJsonMember(Tags),
    target: optionalRestJsonMember(Schema.String),
    version: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateApiRequest = typeof CreateApiRequest.Type;

export const CreateApiResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiEndpoint: optionalRestJsonMember(Schema.String),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiId: optionalRestJsonMember(Schema.String),
    apiKeySelectionExpression: optionalRestJsonMember(Schema.String),
    corsConfiguration: optionalRestJsonMember(Cors),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    description: optionalRestJsonMember(Schema.String),
    disableSchemaValidation: optionalRestJsonMember(Schema.Boolean),
    disableExecuteApiEndpoint: optionalRestJsonMember(Schema.Boolean),
    importInfo: optionalRestJsonMember(Schema.Array(Schema.String)),
    ipAddressType: optionalRestJsonMember(IpAddressType),
    name: optionalRestJsonMember(Schema.String),
    protocolType: optionalRestJsonMember(ProtocolType),
    routeSelectionExpression: optionalRestJsonMember(Schema.String),
    tags: optionalRestJsonMember(Tags),
    version: optionalRestJsonMember(Schema.String),
    warnings: optionalRestJsonMember(Schema.Array(Schema.String)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateApiResponseContent = typeof CreateApiResponseContent.Type;

export const BadRequestException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type BadRequestException = typeof BadRequestException.Type;

export const ConflictException = Schema.StructWithRest(
  Schema.Struct({ message: optionalRestJsonMember(Schema.String) }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type ConflictException = typeof ConflictException.Type;

export const NotFoundException = Schema.StructWithRest(
  Schema.Struct({
    message: optionalRestJsonMember(Schema.String),
    resourceType: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type NotFoundException = typeof NotFoundException.Type;

export const TooManyRequestsException = Schema.StructWithRest(
  Schema.Struct({
    limitType: optionalRestJsonMember(Schema.String),
    message: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type TooManyRequestsException = typeof TooManyRequestsException.Type;

export const CreateIntegrationRequest = Schema.StructWithRest(
  Schema.Struct({
    ApiId: Schema.String,
    connectionId: optionalRestJsonMember(Schema.String),
    connectionType: optionalRestJsonMember(ConnectionType),
    contentHandlingStrategy: optionalRestJsonMember(ContentHandlingStrategy),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    integrationMethod: optionalRestJsonMember(Schema.String),
    integrationSubtype: optionalRestJsonMember(Schema.String),
    integrationType: IntegrationType,
    integrationUri: optionalRestJsonMember(Schema.String),
    passthroughBehavior: optionalRestJsonMember(PassthroughBehavior),
    payloadFormatVersion: optionalRestJsonMember(Schema.String),
    requestParameters: optionalRestJsonMember(IntegrationParameters),
    requestTemplates: optionalRestJsonMember(TemplateMap),
    responseParameters: optionalRestJsonMember(ResponseParameters),
    templateSelectionExpression: optionalRestJsonMember(Schema.String),
    timeoutInMillis: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(50).annotate({
          expected: "a value greater than or equal to 50",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(30000).annotate({
          expected: "a value less than or equal to 30000",
        }),
      ),
    ),
    tlsConfig: optionalRestJsonMember(TlsConfigInput),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateIntegrationRequest = typeof CreateIntegrationRequest.Type;

export const CreateIntegrationResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    connectionId: optionalRestJsonMember(Schema.String),
    connectionType: optionalRestJsonMember(ConnectionType),
    contentHandlingStrategy: optionalRestJsonMember(ContentHandlingStrategy),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    integrationId: optionalRestJsonMember(Schema.String),
    integrationMethod: optionalRestJsonMember(Schema.String),
    integrationResponseSelectionExpression: optionalRestJsonMember(
      Schema.String,
    ),
    integrationSubtype: optionalRestJsonMember(Schema.String),
    integrationType: optionalRestJsonMember(IntegrationType),
    integrationUri: optionalRestJsonMember(Schema.String),
    passthroughBehavior: optionalRestJsonMember(PassthroughBehavior),
    payloadFormatVersion: optionalRestJsonMember(Schema.String),
    requestParameters: optionalRestJsonMember(IntegrationParameters),
    requestTemplates: optionalRestJsonMember(TemplateMap),
    responseParameters: optionalRestJsonMember(ResponseParameters),
    templateSelectionExpression: optionalRestJsonMember(Schema.String),
    timeoutInMillis: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(50).annotate({
          expected: "a value greater than or equal to 50",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(30000).annotate({
          expected: "a value less than or equal to 30000",
        }),
      ),
    ),
    tlsConfig: optionalRestJsonMember(TlsConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateIntegrationResponseContent =
  typeof CreateIntegrationResponseContent.Type;

export const CreateRouteRequest = Schema.StructWithRest(
  Schema.Struct({
    ApiId: Schema.String,
    apiKeyRequired: optionalRestJsonMember(Schema.Boolean),
    authorizationScopes: optionalRestJsonMember(Schema.Array(Schema.String)),
    authorizationType: optionalRestJsonMember(AuthorizationType),
    authorizerId: optionalRestJsonMember(Schema.String),
    modelSelectionExpression: optionalRestJsonMember(Schema.String),
    operationName: optionalRestJsonMember(Schema.String),
    requestModels: optionalRestJsonMember(RouteModels),
    requestParameters: optionalRestJsonMember(RouteParameters),
    routeKey: Schema.String,
    routeResponseSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateRouteRequest = typeof CreateRouteRequest.Type;

export const CreateRouteResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiKeyRequired: optionalRestJsonMember(Schema.Boolean),
    authorizationScopes: optionalRestJsonMember(Schema.Array(Schema.String)),
    authorizationType: optionalRestJsonMember(AuthorizationType),
    authorizerId: optionalRestJsonMember(Schema.String),
    modelSelectionExpression: optionalRestJsonMember(Schema.String),
    operationName: optionalRestJsonMember(Schema.String),
    requestModels: optionalRestJsonMember(RouteModels),
    requestParameters: optionalRestJsonMember(RouteParameters),
    routeId: optionalRestJsonMember(Schema.String),
    routeKey: optionalRestJsonMember(Schema.String),
    routeResponseSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateRouteResponseContent = typeof CreateRouteResponseContent.Type;

export const CreateStageRequest = Schema.StructWithRest(
  Schema.Struct({
    accessLogSettings: optionalRestJsonMember(AccessLogSettings),
    ApiId: Schema.String,
    autoDeploy: optionalRestJsonMember(Schema.Boolean),
    clientCertificateId: optionalRestJsonMember(Schema.String),
    defaultRouteSettings: optionalRestJsonMember(RouteSettings),
    deploymentId: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    routeSettings: optionalRestJsonMember(RouteSettingsMap),
    stageName: Schema.String,
    stageVariables: optionalRestJsonMember(StageVariablesMap),
    tags: optionalRestJsonMember(Tags),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateStageRequest = typeof CreateStageRequest.Type;

export const CreateStageResponseContent = Schema.StructWithRest(
  Schema.Struct({
    accessLogSettings: optionalRestJsonMember(AccessLogSettings),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    autoDeploy: optionalRestJsonMember(Schema.Boolean),
    clientCertificateId: optionalRestJsonMember(Schema.String),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    defaultRouteSettings: optionalRestJsonMember(RouteSettings),
    deploymentId: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    lastDeploymentStatusMessage: optionalRestJsonMember(Schema.String),
    lastUpdatedDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    routeSettings: optionalRestJsonMember(RouteSettingsMap),
    stageName: optionalRestJsonMember(Schema.String),
    stageVariables: optionalRestJsonMember(StageVariablesMap),
    tags: optionalRestJsonMember(Tags),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type CreateStageResponseContent = typeof CreateStageResponseContent.Type;

export const DeleteApiRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteApiRequest = typeof DeleteApiRequest.Type;

export const DeleteIntegrationRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, IntegrationId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteIntegrationRequest = typeof DeleteIntegrationRequest.Type;

export const DeleteRouteRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, RouteId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteRouteRequest = typeof DeleteRouteRequest.Type;

export const DeleteStageRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, StageName: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type DeleteStageRequest = typeof DeleteStageRequest.Type;

export const GetApiRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetApiRequest = typeof GetApiRequest.Type;

export const GetApiResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiEndpoint: optionalRestJsonMember(Schema.String),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiId: optionalRestJsonMember(Schema.String),
    apiKeySelectionExpression: optionalRestJsonMember(Schema.String),
    corsConfiguration: optionalRestJsonMember(Cors),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    description: optionalRestJsonMember(Schema.String),
    disableSchemaValidation: optionalRestJsonMember(Schema.Boolean),
    disableExecuteApiEndpoint: optionalRestJsonMember(Schema.Boolean),
    importInfo: optionalRestJsonMember(Schema.Array(Schema.String)),
    ipAddressType: optionalRestJsonMember(IpAddressType),
    name: optionalRestJsonMember(Schema.String),
    protocolType: optionalRestJsonMember(ProtocolType),
    routeSelectionExpression: optionalRestJsonMember(Schema.String),
    tags: optionalRestJsonMember(Tags),
    version: optionalRestJsonMember(Schema.String),
    warnings: optionalRestJsonMember(Schema.Array(Schema.String)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetApiResponseContent = typeof GetApiResponseContent.Type;

export const GetIntegrationRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, IntegrationId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetIntegrationRequest = typeof GetIntegrationRequest.Type;

export const GetIntegrationResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    connectionId: optionalRestJsonMember(Schema.String),
    connectionType: optionalRestJsonMember(ConnectionType),
    contentHandlingStrategy: optionalRestJsonMember(ContentHandlingStrategy),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    integrationId: optionalRestJsonMember(Schema.String),
    integrationMethod: optionalRestJsonMember(Schema.String),
    integrationResponseSelectionExpression: optionalRestJsonMember(
      Schema.String,
    ),
    integrationSubtype: optionalRestJsonMember(Schema.String),
    integrationType: optionalRestJsonMember(IntegrationType),
    integrationUri: optionalRestJsonMember(Schema.String),
    passthroughBehavior: optionalRestJsonMember(PassthroughBehavior),
    payloadFormatVersion: optionalRestJsonMember(Schema.String),
    requestParameters: optionalRestJsonMember(IntegrationParameters),
    requestTemplates: optionalRestJsonMember(TemplateMap),
    responseParameters: optionalRestJsonMember(ResponseParameters),
    templateSelectionExpression: optionalRestJsonMember(Schema.String),
    timeoutInMillis: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(50).annotate({
          expected: "a value greater than or equal to 50",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(30000).annotate({
          expected: "a value less than or equal to 30000",
        }),
      ),
    ),
    tlsConfig: optionalRestJsonMember(TlsConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetIntegrationResponseContent =
  typeof GetIntegrationResponseContent.Type;

export const GetRouteRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, RouteId: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRouteRequest = typeof GetRouteRequest.Type;

export const GetRouteResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiKeyRequired: optionalRestJsonMember(Schema.Boolean),
    authorizationScopes: optionalRestJsonMember(Schema.Array(Schema.String)),
    authorizationType: optionalRestJsonMember(AuthorizationType),
    authorizerId: optionalRestJsonMember(Schema.String),
    modelSelectionExpression: optionalRestJsonMember(Schema.String),
    operationName: optionalRestJsonMember(Schema.String),
    requestModels: optionalRestJsonMember(RouteModels),
    requestParameters: optionalRestJsonMember(RouteParameters),
    routeId: optionalRestJsonMember(Schema.String),
    routeKey: optionalRestJsonMember(Schema.String),
    routeResponseSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetRouteResponseContent = typeof GetRouteResponseContent.Type;

export const GetStageRequest = Schema.StructWithRest(
  Schema.Struct({ ApiId: Schema.String, StageName: Schema.String }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetStageRequest = typeof GetStageRequest.Type;

export const GetStageResponseContent = Schema.StructWithRest(
  Schema.Struct({
    accessLogSettings: optionalRestJsonMember(AccessLogSettings),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    autoDeploy: optionalRestJsonMember(Schema.Boolean),
    clientCertificateId: optionalRestJsonMember(Schema.String),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    defaultRouteSettings: optionalRestJsonMember(RouteSettings),
    deploymentId: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    lastDeploymentStatusMessage: optionalRestJsonMember(Schema.String),
    lastUpdatedDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    routeSettings: optionalRestJsonMember(RouteSettingsMap),
    stageName: optionalRestJsonMember(Schema.String),
    stageVariables: optionalRestJsonMember(StageVariablesMap),
    tags: optionalRestJsonMember(Tags),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type GetStageResponseContent = typeof GetStageResponseContent.Type;

export const UpdateApiRequest = Schema.StructWithRest(
  Schema.Struct({
    ApiId: Schema.String,
    apiKeySelectionExpression: optionalRestJsonMember(Schema.String),
    corsConfiguration: optionalRestJsonMember(Cors),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    disableSchemaValidation: optionalRestJsonMember(Schema.Boolean),
    disableExecuteApiEndpoint: optionalRestJsonMember(Schema.Boolean),
    ipAddressType: optionalRestJsonMember(IpAddressType),
    name: optionalRestJsonMember(Schema.String),
    routeKey: optionalRestJsonMember(Schema.String),
    routeSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
    version: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateApiRequest = typeof UpdateApiRequest.Type;

export const UpdateApiResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiEndpoint: optionalRestJsonMember(Schema.String),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiId: optionalRestJsonMember(Schema.String),
    apiKeySelectionExpression: optionalRestJsonMember(Schema.String),
    corsConfiguration: optionalRestJsonMember(Cors),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    description: optionalRestJsonMember(Schema.String),
    disableSchemaValidation: optionalRestJsonMember(Schema.Boolean),
    disableExecuteApiEndpoint: optionalRestJsonMember(Schema.Boolean),
    importInfo: optionalRestJsonMember(Schema.Array(Schema.String)),
    ipAddressType: optionalRestJsonMember(IpAddressType),
    name: optionalRestJsonMember(Schema.String),
    protocolType: optionalRestJsonMember(ProtocolType),
    routeSelectionExpression: optionalRestJsonMember(Schema.String),
    tags: optionalRestJsonMember(Tags),
    version: optionalRestJsonMember(Schema.String),
    warnings: optionalRestJsonMember(Schema.Array(Schema.String)),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateApiResponseContent = typeof UpdateApiResponseContent.Type;

export const UpdateIntegrationRequest = Schema.StructWithRest(
  Schema.Struct({
    ApiId: Schema.String,
    connectionId: optionalRestJsonMember(Schema.String),
    connectionType: optionalRestJsonMember(ConnectionType),
    contentHandlingStrategy: optionalRestJsonMember(ContentHandlingStrategy),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    IntegrationId: Schema.String,
    integrationMethod: optionalRestJsonMember(Schema.String),
    integrationSubtype: optionalRestJsonMember(Schema.String),
    integrationType: optionalRestJsonMember(IntegrationType),
    integrationUri: optionalRestJsonMember(Schema.String),
    passthroughBehavior: optionalRestJsonMember(PassthroughBehavior),
    payloadFormatVersion: optionalRestJsonMember(Schema.String),
    requestParameters: optionalRestJsonMember(IntegrationParameters),
    requestTemplates: optionalRestJsonMember(TemplateMap),
    responseParameters: optionalRestJsonMember(ResponseParameters),
    templateSelectionExpression: optionalRestJsonMember(Schema.String),
    timeoutInMillis: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(50).annotate({
          expected: "a value greater than or equal to 50",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(30000).annotate({
          expected: "a value less than or equal to 30000",
        }),
      ),
    ),
    tlsConfig: optionalRestJsonMember(TlsConfigInput),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateIntegrationRequest = typeof UpdateIntegrationRequest.Type;

export const UpdateIntegrationResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    connectionId: optionalRestJsonMember(Schema.String),
    connectionType: optionalRestJsonMember(ConnectionType),
    contentHandlingStrategy: optionalRestJsonMember(ContentHandlingStrategy),
    credentialsArn: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    integrationId: optionalRestJsonMember(Schema.String),
    integrationMethod: optionalRestJsonMember(Schema.String),
    integrationResponseSelectionExpression: optionalRestJsonMember(
      Schema.String,
    ),
    integrationSubtype: optionalRestJsonMember(Schema.String),
    integrationType: optionalRestJsonMember(IntegrationType),
    integrationUri: optionalRestJsonMember(Schema.String),
    passthroughBehavior: optionalRestJsonMember(PassthroughBehavior),
    payloadFormatVersion: optionalRestJsonMember(Schema.String),
    requestParameters: optionalRestJsonMember(IntegrationParameters),
    requestTemplates: optionalRestJsonMember(TemplateMap),
    responseParameters: optionalRestJsonMember(ResponseParameters),
    templateSelectionExpression: optionalRestJsonMember(Schema.String),
    timeoutInMillis: optionalRestJsonMember(
      Schema.Finite.check(
        Schema.isGreaterThanOrEqualTo(50).annotate({
          expected: "a value greater than or equal to 50",
        }),
      ).check(
        Schema.isLessThanOrEqualTo(30000).annotate({
          expected: "a value less than or equal to 30000",
        }),
      ),
    ),
    tlsConfig: optionalRestJsonMember(TlsConfig),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateIntegrationResponseContent =
  typeof UpdateIntegrationResponseContent.Type;

export const UpdateRouteRequest = Schema.StructWithRest(
  Schema.Struct({
    ApiId: Schema.String,
    apiKeyRequired: optionalRestJsonMember(Schema.Boolean),
    authorizationScopes: optionalRestJsonMember(Schema.Array(Schema.String)),
    authorizationType: optionalRestJsonMember(AuthorizationType),
    authorizerId: optionalRestJsonMember(Schema.String),
    modelSelectionExpression: optionalRestJsonMember(Schema.String),
    operationName: optionalRestJsonMember(Schema.String),
    requestModels: optionalRestJsonMember(RouteModels),
    requestParameters: optionalRestJsonMember(RouteParameters),
    RouteId: Schema.String,
    routeKey: optionalRestJsonMember(Schema.String),
    routeResponseSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateRouteRequest = typeof UpdateRouteRequest.Type;

export const UpdateRouteResponseContent = Schema.StructWithRest(
  Schema.Struct({
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    apiKeyRequired: optionalRestJsonMember(Schema.Boolean),
    authorizationScopes: optionalRestJsonMember(Schema.Array(Schema.String)),
    authorizationType: optionalRestJsonMember(AuthorizationType),
    authorizerId: optionalRestJsonMember(Schema.String),
    modelSelectionExpression: optionalRestJsonMember(Schema.String),
    operationName: optionalRestJsonMember(Schema.String),
    requestModels: optionalRestJsonMember(RouteModels),
    requestParameters: optionalRestJsonMember(RouteParameters),
    routeId: optionalRestJsonMember(Schema.String),
    routeKey: optionalRestJsonMember(Schema.String),
    routeResponseSelectionExpression: optionalRestJsonMember(Schema.String),
    target: optionalRestJsonMember(Schema.String),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateRouteResponseContent = typeof UpdateRouteResponseContent.Type;

export const UpdateStageRequest = Schema.StructWithRest(
  Schema.Struct({
    accessLogSettings: optionalRestJsonMember(AccessLogSettings),
    ApiId: Schema.String,
    autoDeploy: optionalRestJsonMember(Schema.Boolean),
    clientCertificateId: optionalRestJsonMember(Schema.String),
    defaultRouteSettings: optionalRestJsonMember(RouteSettings),
    deploymentId: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    routeSettings: optionalRestJsonMember(RouteSettingsMap),
    StageName: Schema.String,
    stageVariables: optionalRestJsonMember(StageVariablesMap),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateStageRequest = typeof UpdateStageRequest.Type;

export const UpdateStageResponseContent = Schema.StructWithRest(
  Schema.Struct({
    accessLogSettings: optionalRestJsonMember(AccessLogSettings),
    apiGatewayManaged: optionalRestJsonMember(Schema.Boolean),
    autoDeploy: optionalRestJsonMember(Schema.Boolean),
    clientCertificateId: optionalRestJsonMember(Schema.String),
    createdDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    defaultRouteSettings: optionalRestJsonMember(RouteSettings),
    deploymentId: optionalRestJsonMember(Schema.String),
    description: optionalRestJsonMember(Schema.String),
    lastDeploymentStatusMessage: optionalRestJsonMember(Schema.String),
    lastUpdatedDate: optionalRestJsonMember(
      Schema.String.annotate({ format: "date-time" }),
    ),
    routeSettings: optionalRestJsonMember(RouteSettingsMap),
    stageName: optionalRestJsonMember(Schema.String),
    stageVariables: optionalRestJsonMember(StageVariablesMap),
    tags: optionalRestJsonMember(Tags),
  }),
  [
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ],
);

export type UpdateStageResponseContent = typeof UpdateStageResponseContent.Type;

export const apiGatewayV2Errors = {
  BadRequestException: {
    name: "BadRequestException",
    fault: "client",
    httpStatus: 400,
    retryable: null,
    schema: BadRequestException,
  },
  ConflictException: {
    name: "ConflictException",
    fault: "client",
    httpStatus: 409,
    retryable: null,
    schema: ConflictException,
  },
  NotFoundException: {
    name: "NotFoundException",
    fault: "client",
    httpStatus: 404,
    retryable: null,
    schema: NotFoundException,
  },
  TooManyRequestsException: {
    name: "TooManyRequestsException",
    fault: "client",
    httpStatus: 429,
    retryable: null,
    schema: TooManyRequestsException,
  },
};

export const createApiErrors = [
  apiGatewayV2Errors.BadRequestException,
  apiGatewayV2Errors.ConflictException,
  apiGatewayV2Errors.NotFoundException,
  apiGatewayV2Errors.TooManyRequestsException,
];

export const deleteApiErrors = [
  apiGatewayV2Errors.NotFoundException,
  apiGatewayV2Errors.TooManyRequestsException,
];

export const createApiMemberNames = {
  input: {
    IpAddressType: "ipAddressType",
    RouteSelectionExpression: "routeSelectionExpression",
    Description: "description",
    DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
    DisableSchemaValidation: "disableSchemaValidation",
    Name: "name",
    Target: "target",
    CorsConfiguration: "corsConfiguration",
    CredentialsArn: "credentialsArn",
    Version: "version",
    ProtocolType: "protocolType",
    RouteKey: "routeKey",
    Tags: "tags",
    ApiKeySelectionExpression: "apiKeySelectionExpression",
  },
  output: {
    ApiEndpoint: "apiEndpoint",
    ApiGatewayManaged: "apiGatewayManaged",
    ApiId: "apiId",
    ApiKeySelectionExpression: "apiKeySelectionExpression",
    CorsConfiguration: "corsConfiguration",
    CreatedDate: "createdDate",
    Description: "description",
    DisableSchemaValidation: "disableSchemaValidation",
    DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
    ImportInfo: "importInfo",
    IpAddressType: "ipAddressType",
    Name: "name",
    ProtocolType: "protocolType",
    RouteSelectionExpression: "routeSelectionExpression",
    Tags: "tags",
    Version: "version",
    Warnings: "warnings",
  },
} as const;

export const createApiOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateApiRequest;
  readonly output: typeof CreateApiResponseContent;
} = {
  name: "CreateApi",
  method: "POST",
  path: "/v2/apis",
  headers: {},
  rest: {
    bindings: {},
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateApiRequest,
  output: CreateApiResponseContent,
  errors: createApiErrors,
};

export const createApiEndpoint = awsHttpEndpoint(
  "CreateApi",
  createApiOperation,
);

export const createIntegrationMemberNames = {
  input: {
    Description: "description",
    TemplateSelectionExpression: "templateSelectionExpression",
    ConnectionType: "connectionType",
    ResponseParameters: "responseParameters",
    IntegrationMethod: "integrationMethod",
    PassthroughBehavior: "passthroughBehavior",
    RequestParameters: "requestParameters",
    ConnectionId: "connectionId",
    IntegrationUri: "integrationUri",
    PayloadFormatVersion: "payloadFormatVersion",
    CredentialsArn: "credentialsArn",
    RequestTemplates: "requestTemplates",
    TimeoutInMillis: "timeoutInMillis",
    TlsConfig: "tlsConfig",
    ContentHandlingStrategy: "contentHandlingStrategy",
    IntegrationSubtype: "integrationSubtype",
    IntegrationType: "integrationType",
  },
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ConnectionId: "connectionId",
    ConnectionType: "connectionType",
    ContentHandlingStrategy: "contentHandlingStrategy",
    CredentialsArn: "credentialsArn",
    Description: "description",
    IntegrationId: "integrationId",
    IntegrationMethod: "integrationMethod",
    IntegrationResponseSelectionExpression:
      "integrationResponseSelectionExpression",
    IntegrationSubtype: "integrationSubtype",
    IntegrationType: "integrationType",
    IntegrationUri: "integrationUri",
    PassthroughBehavior: "passthroughBehavior",
    PayloadFormatVersion: "payloadFormatVersion",
    RequestParameters: "requestParameters",
    RequestTemplates: "requestTemplates",
    ResponseParameters: "responseParameters",
    TemplateSelectionExpression: "templateSelectionExpression",
    TimeoutInMillis: "timeoutInMillis",
    TlsConfig: "tlsConfig",
  },
} as const;

export const createIntegrationOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateIntegrationRequest;
  readonly output: typeof CreateIntegrationResponseContent;
} = {
  name: "CreateIntegration",
  method: "POST",
  path: "/v2/apis/{ApiId}/integrations",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateIntegrationRequest,
  output: CreateIntegrationResponseContent,
  errors: createApiErrors,
};

export const createIntegrationEndpoint = awsHttpEndpoint(
  "CreateIntegration",
  createIntegrationOperation,
);

export const createRouteMemberNames = {
  input: {
    Target: "target",
    RouteResponseSelectionExpression: "routeResponseSelectionExpression",
    AuthorizerId: "authorizerId",
    OperationName: "operationName",
    RequestModels: "requestModels",
    ApiKeyRequired: "apiKeyRequired",
    AuthorizationScopes: "authorizationScopes",
    RouteKey: "routeKey",
    AuthorizationType: "authorizationType",
    ModelSelectionExpression: "modelSelectionExpression",
    RequestParameters: "requestParameters",
  },
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ApiKeyRequired: "apiKeyRequired",
    AuthorizationScopes: "authorizationScopes",
    AuthorizationType: "authorizationType",
    AuthorizerId: "authorizerId",
    ModelSelectionExpression: "modelSelectionExpression",
    OperationName: "operationName",
    RequestModels: "requestModels",
    RequestParameters: "requestParameters",
    RouteId: "routeId",
    RouteKey: "routeKey",
    RouteResponseSelectionExpression: "routeResponseSelectionExpression",
    Target: "target",
  },
} as const;

export const createRouteOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateRouteRequest;
  readonly output: typeof CreateRouteResponseContent;
} = {
  name: "CreateRoute",
  method: "POST",
  path: "/v2/apis/{ApiId}/routes",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateRouteRequest,
  output: CreateRouteResponseContent,
  errors: createApiErrors,
};

export const createRouteEndpoint = awsHttpEndpoint(
  "CreateRoute",
  createRouteOperation,
);

export const createStageMemberNames = {
  input: {
    ClientCertificateId: "clientCertificateId",
    DeploymentId: "deploymentId",
    AccessLogSettings: "accessLogSettings",
    AutoDeploy: "autoDeploy",
    Description: "description",
    RouteSettings: "routeSettings",
    StageName: "stageName",
    StageVariables: "stageVariables",
    DefaultRouteSettings: "defaultRouteSettings",
    Tags: "tags",
  },
  output: {
    AccessLogSettings: "accessLogSettings",
    ApiGatewayManaged: "apiGatewayManaged",
    AutoDeploy: "autoDeploy",
    ClientCertificateId: "clientCertificateId",
    CreatedDate: "createdDate",
    DefaultRouteSettings: "defaultRouteSettings",
    DeploymentId: "deploymentId",
    Description: "description",
    LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
    LastUpdatedDate: "lastUpdatedDate",
    RouteSettings: "routeSettings",
    StageName: "stageName",
    StageVariables: "stageVariables",
    Tags: "tags",
  },
} as const;

export const createStageOperation: AwsRestJsonOperation & {
  readonly input: typeof CreateStageRequest;
  readonly output: typeof CreateStageResponseContent;
} = {
  name: "CreateStage",
  method: "POST",
  path: "/v2/apis/{ApiId}/stages",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 201,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: CreateStageRequest,
  output: CreateStageResponseContent,
  errors: createApiErrors,
};

export const createStageEndpoint = awsHttpEndpoint(
  "CreateStage",
  createStageOperation,
);

export const DeleteApiOutput = HttpApiSchema.Empty(204);

export const deleteApiOperation: AwsRestJsonOperation & {
  readonly input: typeof DeleteApiRequest;
  readonly output: typeof DeleteApiOutput;
} = {
  name: "DeleteApi",
  method: "DELETE",
  path: "/v2/apis/{ApiId}",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteApiRequest,
  output: DeleteApiOutput,
  errors: deleteApiErrors,
};

export const deleteApiEndpoint = awsHttpEndpoint(
  "DeleteApi",
  deleteApiOperation,
);

export const DeleteIntegrationOutput = HttpApiSchema.Empty(204);

export const deleteIntegrationOperation: AwsRestJsonOperation & {
  readonly input: typeof DeleteIntegrationRequest;
  readonly output: typeof DeleteIntegrationOutput;
} = {
  name: "DeleteIntegration",
  method: "DELETE",
  path: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
  headers: {},
  rest: {
    bindings: {
      IntegrationId: {
        location: "LABEL",
        name: "IntegrationId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteIntegrationRequest,
  output: DeleteIntegrationOutput,
  errors: deleteApiErrors,
};

export const deleteIntegrationEndpoint = awsHttpEndpoint(
  "DeleteIntegration",
  deleteIntegrationOperation,
);

export const DeleteRouteOutput = HttpApiSchema.Empty(204);

export const deleteRouteOperation: AwsRestJsonOperation & {
  readonly input: typeof DeleteRouteRequest;
  readonly output: typeof DeleteRouteOutput;
} = {
  name: "DeleteRoute",
  method: "DELETE",
  path: "/v2/apis/{ApiId}/routes/{RouteId}",
  headers: {},
  rest: {
    bindings: {
      RouteId: {
        location: "LABEL",
        name: "RouteId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteRouteRequest,
  output: DeleteRouteOutput,
  errors: deleteApiErrors,
};

export const deleteRouteEndpoint = awsHttpEndpoint(
  "DeleteRoute",
  deleteRouteOperation,
);

export const DeleteStageOutput = HttpApiSchema.Empty(204);

export const deleteStageOperation: AwsRestJsonOperation & {
  readonly input: typeof DeleteStageRequest;
  readonly output: typeof DeleteStageOutput;
} = {
  name: "DeleteStage",
  method: "DELETE",
  path: "/v2/apis/{ApiId}/stages/{StageName}",
  headers: {},
  rest: {
    bindings: {
      StageName: {
        location: "LABEL",
        name: "StageName",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 204,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: DeleteStageRequest,
  output: DeleteStageOutput,
  errors: deleteApiErrors,
};

export const deleteStageEndpoint = awsHttpEndpoint(
  "DeleteStage",
  deleteStageOperation,
);

export const getApiMemberNames = {
  input: {},
  output: {
    ApiEndpoint: "apiEndpoint",
    ApiGatewayManaged: "apiGatewayManaged",
    ApiId: "apiId",
    ApiKeySelectionExpression: "apiKeySelectionExpression",
    CorsConfiguration: "corsConfiguration",
    CreatedDate: "createdDate",
    Description: "description",
    DisableSchemaValidation: "disableSchemaValidation",
    DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
    ImportInfo: "importInfo",
    IpAddressType: "ipAddressType",
    Name: "name",
    ProtocolType: "protocolType",
    RouteSelectionExpression: "routeSelectionExpression",
    Tags: "tags",
    Version: "version",
    Warnings: "warnings",
  },
} as const;

export const getApiOperation: AwsRestJsonOperation & {
  readonly input: typeof GetApiRequest;
  readonly output: typeof GetApiResponseContent;
} = {
  name: "GetApi",
  method: "GET",
  path: "/v2/apis/{ApiId}",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetApiRequest,
  output: GetApiResponseContent,
  errors: deleteApiErrors,
};

export const getApiEndpoint = awsHttpEndpoint("GetApi", getApiOperation);

export const getIntegrationMemberNames = {
  input: {},
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ConnectionId: "connectionId",
    ConnectionType: "connectionType",
    ContentHandlingStrategy: "contentHandlingStrategy",
    CredentialsArn: "credentialsArn",
    Description: "description",
    IntegrationId: "integrationId",
    IntegrationMethod: "integrationMethod",
    IntegrationResponseSelectionExpression:
      "integrationResponseSelectionExpression",
    IntegrationSubtype: "integrationSubtype",
    IntegrationType: "integrationType",
    IntegrationUri: "integrationUri",
    PassthroughBehavior: "passthroughBehavior",
    PayloadFormatVersion: "payloadFormatVersion",
    RequestParameters: "requestParameters",
    RequestTemplates: "requestTemplates",
    ResponseParameters: "responseParameters",
    TemplateSelectionExpression: "templateSelectionExpression",
    TimeoutInMillis: "timeoutInMillis",
    TlsConfig: "tlsConfig",
  },
} as const;

export const getIntegrationOperation: AwsRestJsonOperation & {
  readonly input: typeof GetIntegrationRequest;
  readonly output: typeof GetIntegrationResponseContent;
} = {
  name: "GetIntegration",
  method: "GET",
  path: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
  headers: {},
  rest: {
    bindings: {
      IntegrationId: {
        location: "LABEL",
        name: "IntegrationId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetIntegrationRequest,
  output: GetIntegrationResponseContent,
  errors: deleteApiErrors,
};

export const getIntegrationEndpoint = awsHttpEndpoint(
  "GetIntegration",
  getIntegrationOperation,
);

export const getRouteMemberNames = {
  input: {},
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ApiKeyRequired: "apiKeyRequired",
    AuthorizationScopes: "authorizationScopes",
    AuthorizationType: "authorizationType",
    AuthorizerId: "authorizerId",
    ModelSelectionExpression: "modelSelectionExpression",
    OperationName: "operationName",
    RequestModels: "requestModels",
    RequestParameters: "requestParameters",
    RouteId: "routeId",
    RouteKey: "routeKey",
    RouteResponseSelectionExpression: "routeResponseSelectionExpression",
    Target: "target",
  },
} as const;

export const getRouteOperation: AwsRestJsonOperation & {
  readonly input: typeof GetRouteRequest;
  readonly output: typeof GetRouteResponseContent;
} = {
  name: "GetRoute",
  method: "GET",
  path: "/v2/apis/{ApiId}/routes/{RouteId}",
  headers: {},
  rest: {
    bindings: {
      RouteId: {
        location: "LABEL",
        name: "RouteId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetRouteRequest,
  output: GetRouteResponseContent,
  errors: deleteApiErrors,
};

export const getRouteEndpoint = awsHttpEndpoint("GetRoute", getRouteOperation);

export const getStageMemberNames = {
  input: {},
  output: {
    AccessLogSettings: "accessLogSettings",
    ApiGatewayManaged: "apiGatewayManaged",
    AutoDeploy: "autoDeploy",
    ClientCertificateId: "clientCertificateId",
    CreatedDate: "createdDate",
    DefaultRouteSettings: "defaultRouteSettings",
    DeploymentId: "deploymentId",
    Description: "description",
    LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
    LastUpdatedDate: "lastUpdatedDate",
    RouteSettings: "routeSettings",
    StageName: "stageName",
    StageVariables: "stageVariables",
    Tags: "tags",
  },
} as const;

export const getStageOperation: AwsRestJsonOperation & {
  readonly input: typeof GetStageRequest;
  readonly output: typeof GetStageResponseContent;
} = {
  name: "GetStage",
  method: "GET",
  path: "/v2/apis/{ApiId}/stages/{StageName}",
  headers: {},
  rest: {
    bindings: {
      StageName: {
        location: "LABEL",
        name: "StageName",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: false,
  },
  idempotencyTokens: [],
  pagination: {},
  input: GetStageRequest,
  output: GetStageResponseContent,
  errors: deleteApiErrors,
};

export const getStageEndpoint = awsHttpEndpoint("GetStage", getStageOperation);

export const updateApiMemberNames = {
  input: {
    IpAddressType: "ipAddressType",
    RouteSelectionExpression: "routeSelectionExpression",
    Description: "description",
    DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
    DisableSchemaValidation: "disableSchemaValidation",
    Name: "name",
    Target: "target",
    CorsConfiguration: "corsConfiguration",
    CredentialsArn: "credentialsArn",
    Version: "version",
    RouteKey: "routeKey",
    ApiKeySelectionExpression: "apiKeySelectionExpression",
  },
  output: {
    ApiEndpoint: "apiEndpoint",
    ApiGatewayManaged: "apiGatewayManaged",
    ApiId: "apiId",
    ApiKeySelectionExpression: "apiKeySelectionExpression",
    CorsConfiguration: "corsConfiguration",
    CreatedDate: "createdDate",
    Description: "description",
    DisableSchemaValidation: "disableSchemaValidation",
    DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
    ImportInfo: "importInfo",
    IpAddressType: "ipAddressType",
    Name: "name",
    ProtocolType: "protocolType",
    RouteSelectionExpression: "routeSelectionExpression",
    Tags: "tags",
    Version: "version",
    Warnings: "warnings",
  },
} as const;

export const updateApiOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateApiRequest;
  readonly output: typeof UpdateApiResponseContent;
} = {
  name: "UpdateApi",
  method: "PATCH",
  path: "/v2/apis/{ApiId}",
  headers: {},
  rest: {
    bindings: {
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateApiRequest,
  output: UpdateApiResponseContent,
  errors: createApiErrors,
};

export const updateApiEndpoint = awsHttpEndpoint(
  "UpdateApi",
  updateApiOperation,
);

export const updateIntegrationMemberNames = {
  input: {
    Description: "description",
    TemplateSelectionExpression: "templateSelectionExpression",
    ConnectionType: "connectionType",
    ResponseParameters: "responseParameters",
    IntegrationMethod: "integrationMethod",
    PassthroughBehavior: "passthroughBehavior",
    RequestParameters: "requestParameters",
    ConnectionId: "connectionId",
    IntegrationUri: "integrationUri",
    PayloadFormatVersion: "payloadFormatVersion",
    CredentialsArn: "credentialsArn",
    RequestTemplates: "requestTemplates",
    TimeoutInMillis: "timeoutInMillis",
    TlsConfig: "tlsConfig",
    ContentHandlingStrategy: "contentHandlingStrategy",
    IntegrationSubtype: "integrationSubtype",
    IntegrationType: "integrationType",
  },
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ConnectionId: "connectionId",
    ConnectionType: "connectionType",
    ContentHandlingStrategy: "contentHandlingStrategy",
    CredentialsArn: "credentialsArn",
    Description: "description",
    IntegrationId: "integrationId",
    IntegrationMethod: "integrationMethod",
    IntegrationResponseSelectionExpression:
      "integrationResponseSelectionExpression",
    IntegrationSubtype: "integrationSubtype",
    IntegrationType: "integrationType",
    IntegrationUri: "integrationUri",
    PassthroughBehavior: "passthroughBehavior",
    PayloadFormatVersion: "payloadFormatVersion",
    RequestParameters: "requestParameters",
    RequestTemplates: "requestTemplates",
    ResponseParameters: "responseParameters",
    TemplateSelectionExpression: "templateSelectionExpression",
    TimeoutInMillis: "timeoutInMillis",
    TlsConfig: "tlsConfig",
  },
} as const;

export const updateIntegrationOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateIntegrationRequest;
  readonly output: typeof UpdateIntegrationResponseContent;
} = {
  name: "UpdateIntegration",
  method: "PATCH",
  path: "/v2/apis/{ApiId}/integrations/{IntegrationId}",
  headers: {},
  rest: {
    bindings: {
      IntegrationId: {
        location: "LABEL",
        name: "IntegrationId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateIntegrationRequest,
  output: UpdateIntegrationResponseContent,
  errors: createApiErrors,
};

export const updateIntegrationEndpoint = awsHttpEndpoint(
  "UpdateIntegration",
  updateIntegrationOperation,
);

export const updateRouteMemberNames = {
  input: {
    OperationName: "operationName",
    RequestModels: "requestModels",
    AuthorizationScopes: "authorizationScopes",
    RequestParameters: "requestParameters",
    Target: "target",
    RouteResponseSelectionExpression: "routeResponseSelectionExpression",
    AuthorizerId: "authorizerId",
    ApiKeyRequired: "apiKeyRequired",
    RouteKey: "routeKey",
    AuthorizationType: "authorizationType",
    ModelSelectionExpression: "modelSelectionExpression",
  },
  output: {
    ApiGatewayManaged: "apiGatewayManaged",
    ApiKeyRequired: "apiKeyRequired",
    AuthorizationScopes: "authorizationScopes",
    AuthorizationType: "authorizationType",
    AuthorizerId: "authorizerId",
    ModelSelectionExpression: "modelSelectionExpression",
    OperationName: "operationName",
    RequestModels: "requestModels",
    RequestParameters: "requestParameters",
    RouteId: "routeId",
    RouteKey: "routeKey",
    RouteResponseSelectionExpression: "routeResponseSelectionExpression",
    Target: "target",
  },
} as const;

export const updateRouteOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateRouteRequest;
  readonly output: typeof UpdateRouteResponseContent;
} = {
  name: "UpdateRoute",
  method: "PATCH",
  path: "/v2/apis/{ApiId}/routes/{RouteId}",
  headers: {},
  rest: {
    bindings: {
      RouteId: {
        location: "LABEL",
        name: "RouteId",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateRouteRequest,
  output: UpdateRouteResponseContent,
  errors: createApiErrors,
};

export const updateRouteEndpoint = awsHttpEndpoint(
  "UpdateRoute",
  updateRouteOperation,
);

export const updateStageMemberNames = {
  input: {
    ClientCertificateId: "clientCertificateId",
    DeploymentId: "deploymentId",
    AccessLogSettings: "accessLogSettings",
    AutoDeploy: "autoDeploy",
    Description: "description",
    RouteSettings: "routeSettings",
    StageVariables: "stageVariables",
    DefaultRouteSettings: "defaultRouteSettings",
  },
  output: {
    AccessLogSettings: "accessLogSettings",
    ApiGatewayManaged: "apiGatewayManaged",
    AutoDeploy: "autoDeploy",
    ClientCertificateId: "clientCertificateId",
    CreatedDate: "createdDate",
    DefaultRouteSettings: "defaultRouteSettings",
    DeploymentId: "deploymentId",
    Description: "description",
    LastDeploymentStatusMessage: "lastDeploymentStatusMessage",
    LastUpdatedDate: "lastUpdatedDate",
    RouteSettings: "routeSettings",
    StageName: "stageName",
    StageVariables: "stageVariables",
    Tags: "tags",
  },
} as const;

export const updateStageOperation: AwsRestJsonOperation & {
  readonly input: typeof UpdateStageRequest;
  readonly output: typeof UpdateStageResponseContent;
} = {
  name: "UpdateStage",
  method: "PATCH",
  path: "/v2/apis/{ApiId}/stages/{StageName}",
  headers: {},
  rest: {
    bindings: {
      StageName: {
        location: "LABEL",
        name: "StageName",
      },
      ApiId: {
        location: "LABEL",
        name: "ApiId",
      },
    },
    status: 200,
    body: true,
  },
  idempotencyTokens: [],
  pagination: {},
  input: UpdateStageRequest,
  output: UpdateStageResponseContent,
  errors: createApiErrors,
};

export const updateStageEndpoint = awsHttpEndpoint(
  "UpdateStage",
  updateStageOperation,
);

export const apiGatewayV2Operations = {
  CreateApi: createApiOperation,
  CreateIntegration: createIntegrationOperation,
  CreateRoute: createRouteOperation,
  CreateStage: createStageOperation,
  DeleteApi: deleteApiOperation,
  DeleteIntegration: deleteIntegrationOperation,
  DeleteRoute: deleteRouteOperation,
  DeleteStage: deleteStageOperation,
  GetApi: getApiOperation,
  GetIntegration: getIntegrationOperation,
  GetRoute: getRouteOperation,
  GetStage: getStageOperation,
  UpdateApi: updateApiOperation,
  UpdateIntegration: updateIntegrationOperation,
  UpdateRoute: updateRouteOperation,
  UpdateStage: updateStageOperation,
};

export const apiGatewayV2Api = HttpApi.make("ApiGatewayV2").add(
  HttpApiGroup.make("apigatewayv2").add(
    createApiEndpoint,
    createIntegrationEndpoint,
    createRouteEndpoint,
    createStageEndpoint,
    deleteApiEndpoint,
    deleteIntegrationEndpoint,
    deleteRouteEndpoint,
    deleteStageEndpoint,
    getApiEndpoint,
    getIntegrationEndpoint,
    getRouteEndpoint,
    getStageEndpoint,
    updateApiEndpoint,
    updateIntegrationEndpoint,
    updateRouteEndpoint,
    updateStageEndpoint,
  ),
);

export const apiGatewayV2Service: AwsServiceDefinition = {
  service: "com.amazonaws.apigatewayv2#ApiGatewayV2",
  version: "2018-11-29",
  protocol: "restJson1",
  signingName: "apigateway",
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
                          url: "https://apigateway-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                        conditions: [],
                        endpoint: {
                          url: "https://apigateway-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                          url: "https://apigateway.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                  url: "https://apigateway.{Region}.{PartitionResult#dnsSuffix}",
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

/** The makeApiGatewayV2Client Effect gives callers access to ApiGatewayV2 with the region and credentials configured in their AWS runtime. */
export const makeApiGatewayV2Client = Effect.gen(function* () {
  const aws = yield* AwsClient;

  const bindOperation = aws.bindOperation(apiGatewayV2Service);

  return {
    /** Creates an Api resource. */
    createApi: bindOperation(createApiOperation),
    /** Creates an Integration. */
    createIntegration: bindOperation(createIntegrationOperation),
    /** Creates a Route for an API. */
    createRoute: bindOperation(createRouteOperation),
    /** Creates a Stage for an API. */
    createStage: bindOperation(createStageOperation),
    /** Deletes an Api resource. Success means AWS accepted the request. */
    deleteApi: bindOperation(deleteApiOperation),
    /** Deletes an Integration. Success means AWS accepted the request. */
    deleteIntegration: bindOperation(deleteIntegrationOperation),
    /** Deletes a Route. Success means AWS accepted the request. */
    deleteRoute: bindOperation(deleteRouteOperation),
    /** Deletes a Stage. Success means AWS accepted the request. */
    deleteStage: bindOperation(deleteStageOperation),
    /** Gets an Api resource. */
    getApi: bindOperation(getApiOperation),
    /** Gets an Integration. */
    getIntegration: bindOperation(getIntegrationOperation),
    /** Gets a Route. */
    getRoute: bindOperation(getRouteOperation),
    /** Gets a Stage. */
    getStage: bindOperation(getStageOperation),
    /** Updates an Api resource. */
    updateApi: bindOperation(updateApiOperation),
    /** Updates an Integration. */
    updateIntegration: bindOperation(updateIntegrationOperation),
    /** Updates a Route. */
    updateRoute: bindOperation(updateRouteOperation),
    /** Updates a Stage. */
    updateStage: bindOperation(updateStageOperation),
  };
});
