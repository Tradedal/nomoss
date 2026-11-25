import { Effect, Layer } from "effect";
import { FetchHttpClient } from "effect/http";
import { Asset, localState } from "nomoss/core";
import { AwsProviderLive, awsClientConfigLayer } from "nomoss/providers/aws";
import { AWSApi } from "nomoss/providers/aws/apigatewayv2/api";
import { AWSIntegration } from "nomoss/providers/aws/apigatewayv2/integration";
import { AWSRoute } from "nomoss/providers/aws/apigatewayv2/route";
import { AWSStage } from "nomoss/providers/aws/apigatewayv2/stage";
import {
  AWSFunction,
  LambdaExecutionRole,
} from "nomoss/providers/aws/lambda/function";

const routes = [
  { name: "Health", route: "GET /health", handler: "index.health" },
  { name: "Echo", route: "POST /echo", handler: "index.echo" },
] as const;

/**
 * The httpEchoStack definition links each route to a Lambda through its
 * integration entity. Both functions use an IAM role declared by the stack.
 * Nomoss builds the checked-in handler during planning. The stack exposes the
 * API URL after apply saves it.
 *
 * @see ../../../command-options-fund/refs/effect/packages/effect/src/Layer.ts (provide)
 */
export const httpEchoStack = {
  name: "http-echo",
  providers: AwsProviderLive.pipe(
    Layer.provide([awsClientConfigLayer, FetchHttpClient.layer]),
  ),
  state: localState(),
  resources: Effect.gen(function* () {
    const code = Asset.fromBuild(new URL("./index.ts", import.meta.url), {
      platform: "node",
      target: "node24",
    });

    const executionRole = yield* LambdaExecutionRole("ExecutionRole");

    const api = yield* AWSApi({
      logicalId: "Api",
      props: { Name: "http-echo", ProtocolType: "HTTP" },
    });

    yield* Effect.forEach(
      routes,
      Effect.fnUntraced(function* ({ name: logicalId, route, handler }) {
        const lambda = yield* AWSFunction({
          logicalId: `${logicalId}Function`,
          executionRole,
          props: {
            Runtime: "nodejs24.x",
            Handler: handler,
            Code: code,
            Timeout: 5,
          },
        });

        const integration = yield* AWSIntegration({
          logicalId: `${logicalId}Integration`,
          props: {
            ApiId: api,
            IntegrationType: "AWS_PROXY",
            IntegrationUri: lambda,
            PayloadFormatVersion: "2.0",
          },
        });

        const httpRoute = yield* AWSRoute({
          logicalId: `${logicalId}Route`,
          props: { ApiId: api, RouteKey: route, Target: integration },
        });

        yield* lambda.grantInvoke(httpRoute);
      }),
      { discard: true },
    );

    yield* AWSStage({
      logicalId: "Stage",
      props: { ApiId: api, StageName: "$default", AutoDeploy: true },
    });

    return () => ({ url: api.ApiEndpoint });
  }),
};
