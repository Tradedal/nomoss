import { Layer, Match, Schema, SchemaGetter, String as Str } from "effect";
import {
  AuthorizationType,
  apiGatewayV2Service,
  createApiOperation,
  createIntegrationOperation,
  createRouteOperation,
  createStageOperation,
  deleteApiOperation,
  deleteIntegrationOperation,
  deleteRouteOperation,
  deleteStageOperation,
  getApiOperation,
  getIntegrationOperation,
  getRouteOperation,
  getStageOperation,
  IntegrationType,
  ProtocolType,
  updateApiOperation,
  updateIntegrationOperation,
  updateRouteOperation,
  updateStageOperation,
} from "../../client/generated/apiGatewayV2.js";
import {
  resourceRequest,
  resourceResponse,
} from "../../management/resourceOperation.js";
import { awsResourceRegistration } from "../../management/resourceRegistration.js";
import { AWSApiResourceSchema } from "../generated/native/apigatewayv2/api/index.js";
import { AWSIntegrationResourceSchema } from "../generated/native/apigatewayv2/integration/index.js";
import { AWSRouteResourceSchema } from "../generated/native/apigatewayv2/route/index.js";
import { AWSStageResourceSchema } from "../generated/native/apigatewayv2/stage/index.js";

const service = apiGatewayV2Service;
const missingErrors = ["NotFoundException"];
const timeout = "30 seconds";

const apiIdentity = Schema.Struct({ ApiId: Schema.String });

const createdApi = apiIdentity.pipe(Schema.encodeKeys({ ApiId: "apiId" }));

const apiSettings = {
  Description: Schema.optionalKey(Schema.String),
  Name: Schema.optionalKey(Schema.String),
  DisableExecuteApiEndpoint: Schema.optionalKey(Schema.Boolean),
};

const apiKeys = {
  ApiId: "apiId",
  ApiEndpoint: "apiEndpoint",
  Description: "description",
  DisableExecuteApiEndpoint: "disableExecuteApiEndpoint",
  Name: "name",
  ProtocolType: "protocolType",
} as const;

const observedApi = Schema.Struct({
  ...apiSettings,
  ApiEndpoint: Schema.String,
  ApiId: Schema.String,
  ProtocolType,
}).pipe(Schema.encodeKeys(apiKeys));

const createApiRequest = Schema.Struct({
  ...apiSettings,
  Name: Schema.String,
  ProtocolType,
}).pipe(Schema.encodeKeys(apiKeys));

/**
 * The updateApiRequest codec keeps ApiId in the request path. API Gateway
 * returns apiId in the JSON body, so the response codec uses a different key.
 *
 * @see ../../../../../refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json (UpdateApiRequest)
 */
const updateApiRequest = Schema.Struct({
  ...apiIdentity.fields,
  ...apiSettings,
}).pipe(Schema.encodeKeys({ ...apiKeys, ApiId: "ApiId" }));

/**
 * The apiCommands Layer saves the API ID and URL returned by API Gateway.
 * The ID identifies the API for later calls and lets child resources link to it.
 */
const apiCommands = awsResourceRegistration(AWSApiResourceSchema, {
  service,
  create: resourceResponse(
    resourceRequest(createApiOperation, createApiRequest),
    createdApi,
  ),
  read: resourceResponse(
    resourceRequest(getApiOperation, apiIdentity),
    observedApi,
  ),
  update: resourceRequest(updateApiOperation, updateApiRequest),
  remove: resourceRequest(deleteApiOperation, apiIdentity),
  missingErrors,
  timeout,
});

const integrationIdentity = Schema.Struct({
  ...apiIdentity.fields,
  IntegrationId: Schema.String,
});

const createdIntegration = Schema.Struct({ IntegrationId: Schema.String }).pipe(
  Schema.encodeKeys({ IntegrationId: "integrationId" }),
);

const integrationSettings = {
  Description: Schema.optionalKey(Schema.String),
  IntegrationMethod: Schema.optionalKey(Schema.String),
  IntegrationType: Schema.optionalKey(IntegrationType),
  IntegrationUri: Schema.optionalKey(Schema.String),
  PayloadFormatVersion: Schema.optionalKey(Schema.String),
  TimeoutInMillis: Schema.optionalKey(Schema.Number),
};

const integrationKeys = {
  Description: "description",
  IntegrationMethod: "integrationMethod",
  IntegrationType: "integrationType",
  IntegrationUri: "integrationUri",
  PayloadFormatVersion: "payloadFormatVersion",
  TimeoutInMillis: "timeoutInMillis",
} as const;

const observedIntegration = Schema.Struct({
  ...integrationSettings,
  IntegrationId: Schema.String,
}).pipe(
  Schema.encodeKeys({ ...integrationKeys, IntegrationId: "integrationId" }),
);

const createIntegrationRequest = Schema.Struct({
  ...apiIdentity.fields,
  ...integrationSettings,
  IntegrationType,
}).pipe(Schema.encodeKeys(integrationKeys));

const updateIntegrationRequest = Schema.Struct({
  ...integrationIdentity.fields,
  ...integrationSettings,
}).pipe(Schema.encodeKeys(integrationKeys));

/**
 * The integrationCommands Layer saves the integration ID with the parent API ID.
 * API Gateway requires both values to read, update, or delete the integration.
 */
const integrationCommands = awsResourceRegistration(
  AWSIntegrationResourceSchema,
  {
    service,
    create: resourceResponse(
      resourceRequest(createIntegrationOperation, createIntegrationRequest),
      createdIntegration,
    ),
    read: resourceResponse(
      resourceRequest(getIntegrationOperation, integrationIdentity),
      observedIntegration,
    ),
    update: resourceRequest(
      updateIntegrationOperation,
      updateIntegrationRequest,
    ),
    remove: resourceRequest(deleteIntegrationOperation, integrationIdentity),
    missingErrors,
    timeout,
  },
);

const routeIdentity = Schema.Struct({
  ...apiIdentity.fields,
  RouteId: Schema.String,
});

const createdRoute = Schema.Struct({ RouteId: Schema.String }).pipe(
  Schema.encodeKeys({ RouteId: "routeId" }),
);

/**
 * The integrationTarget codec translates the integration identifier used by
 * the declared entity to the API Gateway route target. Plain provider targets
 * that already contain the integration prefix retain their spelling.
 *
 * @see ../../../../../refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json (CreateRouteRequest.Target)
 * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Schema.ts (decodeTo)
 */
const integrationTarget = Schema.String.pipe(
  Schema.decodeTo(Schema.String, {
    decode: SchemaGetter.transform(Str.replace(/^integrations\//, "")),
    encode: SchemaGetter.transform((value) =>
      Match.value(Str.startsWith("integrations/")(value)).pipe(
        Match.when(true, () => value),
        Match.orElse(() => `integrations/${value}`),
      ),
    ),
  }),
);

const routeSettings = {
  AuthorizationType: Schema.optionalKey(AuthorizationType),
  RouteKey: Schema.optionalKey(Schema.String),
  Target: Schema.optionalKey(integrationTarget),
};

const routeKeys = {
  AuthorizationType: "authorizationType",
  RouteKey: "routeKey",
  Target: "target",
} as const;

const observedRoute = Schema.Struct({
  ...routeSettings,
  RouteId: Schema.String,
}).pipe(Schema.encodeKeys({ ...routeKeys, RouteId: "routeId" }));

const createRouteRequest = Schema.Struct({
  ...apiIdentity.fields,
  ...routeSettings,
  RouteKey: Schema.String,
}).pipe(Schema.encodeKeys(routeKeys));

const updateRouteRequest = Schema.Struct({
  ...routeIdentity.fields,
  ...routeSettings,
}).pipe(Schema.encodeKeys(routeKeys));

/**
 * The routeCommands Layer manages routes within the API that owns them.
 * A route created from an integration entity uses the resolved ID in its
 * route target.
 */
const routeCommands = awsResourceRegistration(AWSRouteResourceSchema, {
  service,
  create: resourceResponse(
    resourceRequest(createRouteOperation, createRouteRequest),
    createdRoute,
  ),
  read: resourceResponse(
    resourceRequest(getRouteOperation, routeIdentity),
    observedRoute,
  ),
  // The UpdateRoute operation accepts the modeled HTTP 200 and the HTTP 201
  // observed when renaming a route. Both replies use the generated response
  // schema through awsHttpEndpoint's supported success statuses.
  // See refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json,
  // UpdateRoute, and src/providers/aws/client/awsHttpOperation.ts.
  update: resourceRequest(
    {
      ...updateRouteOperation,
      rest: {
        ...updateRouteOperation.rest,
        status: [updateRouteOperation.rest.status, 201].flat(),
      },
    },
    updateRouteRequest,
  ),
  remove: resourceRequest(deleteRouteOperation, routeIdentity),
  missingErrors,
  timeout,
});

const stageIdentity = Schema.Struct({
  ...apiIdentity.fields,
  StageName: Schema.String,
});

const stageSettings = {
  AutoDeploy: Schema.optionalKey(Schema.Boolean),
  Description: Schema.optionalKey(Schema.String),
};

const stageKeys = {
  AutoDeploy: "autoDeploy",
  Description: "description",
} as const;

const observedStage = Schema.Struct({
  ...stageSettings,
  StageName: Schema.String,
}).pipe(Schema.encodeKeys({ ...stageKeys, StageName: "stageName" }));

const createStageRequest = Schema.Struct({
  ...stageIdentity.fields,
  ...stageSettings,
}).pipe(Schema.encodeKeys({ ...stageKeys, StageName: "stageName" }));

const updateStageRequest = Schema.Struct({
  ...stageIdentity.fields,
  ...stageSettings,
}).pipe(Schema.encodeKeys(stageKeys));

/**
 * The stageCommands Layer addresses a stage by its name and parent API ID.
 * The stage name is supplied by the declaration when API Gateway creates it.
 */
const stageCommands = awsResourceRegistration(AWSStageResourceSchema, {
  service,
  create: resourceResponse(
    resourceRequest(createStageOperation, createStageRequest),
    observedStage,
  ),
  read: resourceResponse(
    resourceRequest(getStageOperation, stageIdentity),
    observedStage,
  ),
  update: resourceRequest(updateStageOperation, updateStageRequest),
  remove: resourceRequest(deleteStageOperation, stageIdentity),
  missingErrors,
  timeout,
});

/**
 * The httpApiCommands Layer gives the AWS runtime lifecycle registrations for
 * HTTP APIs, integrations, routes, and stages. Each resource retains its own
 * identity so the stack can update or remove it independently.
 *
 * @see ../../../../../refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json (API, integration, route, and stage operations)
 * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Layer.ts (mergeAll)
 */
export const httpApiCommands = Layer.mergeAll(
  apiCommands,
  integrationCommands,
  routeCommands,
  stageCommands,
);
