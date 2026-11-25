import {
  Array as Arr,
  Context,
  Effect,
  Layer,
  Match,
  Option,
  Schedule,
  Schema,
} from "effect";
import { Digest } from "effect/crypto";
import {
  type ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  ResourceObservation,
} from "../../../../core/resource/lifecycle.js";
import {
  annotateResourceSchema,
  ResourceModel,
  type ResourceNode,
  ResourceReferenceSchema,
  resourceModelLayer,
} from "../../../../core/resource/model.js";
import {
  ResourceCommandExecutionFailed,
  ResourceCommandStackName,
} from "../../../../core/resource/resourceCommandPolicy.js";
import { ResourceGraphBuilder } from "../../../../core/resource/resourceGraphBuilder.js";
import { providerCommandPolicyTag } from "../../../resourceCommandPolicyLayer.js";
import { makeLambdaClient } from "../../client/generated/lambda.js";
import {
  type AWSRouteResource,
  AWSRouteResourceTypeSchema,
} from "../generated/native/apigatewayv2/route/index.js";
import type { AWSFunctionResource } from "../generated/native/lambda/function/index.js";
import {
  AWSPermissionOutputsSchema,
  AWSPermissionPropsSchema,
  AWSPermissionRequestSchema,
  AWSPermissionResourceSchema,
} from "../generated/native/lambda/permission/index.js";

/** The identity schema requires the saved function name and statement ID before reading or removing a permission. */
const identity = Schema.Struct({
  FunctionName: AWSPermissionOutputsSchema.fields.FunctionName,
  Id: Schema.requiredKey(AWSPermissionOutputsSchema.fields.Id),
});

const statement = Schema.Struct({ Sid: Schema.String });
/** The policy schema validates the statement IDs that establish whether Nomoss still owns a Lambda permission. */
const policy = Schema.fromJsonString(
  Schema.Struct({ Statement: Schema.Array(statement) }),
);

const httpMethod = Schema.Literals([
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "CONNECT",
  "TRACE",
]);
const literalPath = Schema.String.check(Schema.isPattern(/^\/[^{}*?\s]*$/));
const httpRouteKey = Schema.TemplateLiteralParser([
  httpMethod,
  " ",
  literalPath,
]);

const lambdaArn = Schema.TemplateLiteralParser([
  "arn:",
  Schema.String.check(Schema.isPattern(/^aws[a-z0-9-]*$/)),
  ":lambda:",
  Schema.String.check(Schema.isPattern(/^[a-z0-9-]+$/)),
  ":",
  Schema.String.check(Schema.isPattern(/^\d{12}$/)),
  ":function:",
  Schema.NonEmptyString,
]);

const routePermissionSchema = {
  ...AWSPermissionResourceSchema,
  resource: "route-invocation-permission",
  replacement: {
    order: "createBeforeDestroy",
    properties: [["FunctionName"], ["ApiId"], ["Method"], ["Path"]],
  },
} as const;

const routePermissionRequest = Schema.Struct({
  FunctionName: AWSPermissionRequestSchema.fields.FunctionName,
  ApiId: Schema.String.check(Schema.isPattern(/^[a-z0-9]+$/)),
  Method: httpMethod,
  Path: literalPath,
});

const routePermissionProps = annotateResourceSchema(
  routePermissionRequest.mapFields((fields) => ({
    ...fields,
    FunctionName: AWSPermissionPropsSchema.fields.FunctionName,
    ApiId: ResourceReferenceSchema(AWSRouteResourceTypeSchema, {
      value: null,
      outputs: [{ source: ["ApiId"], target: [] }],
    }),
  })),
  routePermissionSchema,
);

/**
 * The routeInvocationPermission function declares a Lambda policy statement
 * for one HTTP method and literal path across the API's stages. The route
 * supplies its API ID after deployment, so a route change can replace the
 * statement without affecting permissions for other routes.
 * The function and API must belong to the same account and region. Route
 * keys with parameters, wildcards, ANY, or $default fail schema validation.
 *
 * @see ../../../../../docs/application/resource-graph.md (Relationships and request values)
 * @see ../../../../../refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json (CreateRouteRequest)
 * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Schema.ts (TemplateLiteralParser)
 */
export const routeInvocationPermission = Effect.fn("Lambda.grantInvokeRoute")(
  function* (fn: AWSFunctionResource<unknown>, route: AWSRouteResource) {
    const [Method, , Path] = yield* Schema.decodeUnknownEffect(httpRouteKey)(
      route.props.RouteKey,
    );
    const graph = yield* ResourceGraphBuilder;
    const permission = yield* graph.resource({
      logicalId: `${fn.key.logicalId}/InvokeRoute/${encodeURIComponent(route.key.logicalId)}`,
    });
    const props = yield* Schema.decodeEffect(routePermissionProps)({
      FunctionName: fn,
      ApiId: route,
      Method,
      Path,
    });

    yield* permission.register({
      propsSchema: routePermissionProps,
      requestSchema: routePermissionRequest,
      outputsSchema: AWSPermissionOutputsSchema,
      props,
    });
  },
);

const isMissing = (error: { readonly _tag: string }) =>
  error._tag === "AwsServiceError" &&
  "code" in error &&
  error.code === "ResourceNotFoundException";

/**
 * The permissionCommands Layer manages individual statements in a function's
 * policy. Lambda reads the entire policy, so the lifecycle checks the saved
 * statement ID before it reports presence or completes removal.
 *
 * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (AddPermission, GetPolicy, RemovePermission)
 * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Layer.ts (effectContext)
 */
export const permissionCommands = Layer.effectContext(
  Effect.gen(function* () {
    const model = yield* ResourceModel;
    const lambda = yield* makeLambdaClient;
    const digest = yield* Digest.Digest;

    /**
     * The readStatement function confirms presence using the statement ID.
     * A missing policy counts as absence. An invalid policy fails the read.
     *
     * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (transposeOption)
     */
    const readStatement = Effect.fn("LambdaPermission.readStatement")(
      function* (permission: typeof identity.Type) {
        const input = { FunctionName: permission.FunctionName };

        const response = yield* lambda.getPolicy(input).pipe(
          Effect.asSome,
          Effect.catchIf(isMissing, () => Effect.succeedNone),
        );

        const encoded = Option.flatMap(response, ({ Policy }) =>
          Option.fromUndefinedOr(Policy),
        );

        const parsed = yield* encoded.pipe(
          Option.map(Schema.decodeEffect(policy)),
          Effect.transposeOption,
        );

        return Option.exists(parsed, (document) =>
          Arr.some(document.Statement, ({ Sid }) => Sid === permission.Id),
        );
      },
    );

    /** The read function reports whether the saved statement exists; validation and provider failures remain failures of the read. */
    const read = Effect.fn("LambdaPermission.read")(function* (
      node: ResourceNode,
    ) {
      const permission = yield* model.decodeOutputs(node, identity);

      const exists = yield* readStatement(permission);

      const observation = Match.value(exists).pipe(
        Match.when(true, () =>
          ResourceObservation.Present({ node, observed: permission }),
        ),
        Match.orElse(() => ResourceObservation.Missing({ node })),
      );

      const result: ResourceCommandResult = ResourceCommandResult.Observed({
        observation,
      });

      return result;
    });

    /**
     * The create function derives the statement ID from the stack, logical
     * ID, and resolved properties. A retry can find the same statement, and a
     * replacement grant can coexist with the one it supersedes.
     */
    const create = Effect.fn("LambdaPermission.create")(function* (
      node: ResourceNode,
    ) {
      const properties = yield* Match.value(node.schema.resource).pipe(
        Match.when(routePermissionSchema.resource, () =>
          Effect.gen(function* () {
            const { FunctionName, ApiId, Method, Path } =
              yield* model.decodeProps(node, routePermissionRequest);

            // The route invocation permission uses the Lambda ARN's partition,
            // account, and region with the API ID supplied by the route. The
            // stage wildcard covers every stage for this method and path.
            // See refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json,
            // AddPermissionRequest.SourceArn.
            const [, partition, , region, , account] =
              yield* Schema.decodeUnknownEffect(lambdaArn)(FunctionName);

            return yield* Schema.decodeEffect(AWSPermissionRequestSchema)({
              Action: "lambda:InvokeFunction",
              FunctionName,
              Principal: "apigateway.amazonaws.com",
              SourceArn: `arn:${partition}:execute-api:${region}:${account}:${ApiId}/*/${Method}${Path}`,
            });
          }),
        ),
        Match.orElse(() => model.decodeProps(node, AWSPermissionRequestSchema)),
      );

      const stack = yield* ResourceCommandStackName.pipe(
        Effect.flatMap(Effect.fromOption),
      );

      const statementIdentity = [stack, node.key.logicalId, properties];

      const seed = yield* Schema.encodeEffect(
        Schema.fromJsonString(Schema.Json),
      )(statementIdentity);

      const hash = yield* digest.digestHex(
        Digest.sha256,
        new TextEncoder().encode(seed),
      );

      const permission = {
        FunctionName: properties.FunctionName,
        Id: `nomoss-${hash}`,
      };

      const exists = yield* readStatement(permission);

      const input = { ...properties, StatementId: permission.Id };

      yield* lambda
        .addPermission(input)
        .pipe(Effect.when(Effect.succeed(!exists)));

      yield* readStatement(permission).pipe(
        Effect.repeat({
          while: (present) => !present,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
      );

      const applied = yield* model.withOutputs(node, permission);

      const result: ResourceCommandResult = ResourceCommandResult.Created({
        node: applied,
      });

      return result;
    });

    /**
     * The destroy function completes when GetPolicy confirms the statement
     * is absent. A failed confirmation leaves the saved identity available
     * for a retry.
     *
     * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (repeat and timeout)
     */
    const destroy = Effect.fn("LambdaPermission.destroy")(function* (
      node: ResourceNode,
    ) {
      const permission = yield* model.decodeOutputs(node, identity);

      const input = {
        FunctionName: permission.FunctionName,
        StatementId: permission.Id,
      };

      yield* lambda
        .removePermission(input)
        .pipe(Effect.catchIf(isMissing, () => Effect.void));

      yield* readStatement(permission).pipe(
        Effect.repeat({
          while: (present) => present,
          schedule: Schedule.spaced("1 second"),
        }),
        Effect.timeout("30 seconds"),
      );

      const result: ResourceCommandResult = ResourceCommandResult.Destroyed({
        node,
      });

      return result;
    });

    /** The execute service method applies supported permission commands and returns typed failures for other commands or failed provider requests. */
    const execute = Effect.fn("LambdaPermission.execute")(
      (command: ResourceCommand) => {
        const action = Match.value(command).pipe(
          Match.tag("Apply", ({ decision }) => decision),
          Match.orElse((command) => command),
        );

        return Match.value(action).pipe(
          Match.tag("Read", ({ node }) => read(node)),
          Match.tag("Create", ({ node }) => create(node)),
          Match.tag("Destroy", "Delete", ({ node }) => destroy(node)),
          Match.orElse(() =>
            Effect.fail(new ResourceCommandUnsupported({ command })),
          ),
          Effect.mapError(
            (cause) => new ResourceCommandExecutionFailed({ command, cause }),
          ),
        );
      },
    );

    return Context.make(providerCommandPolicyTag(AWSPermissionResourceSchema), {
      execute,
    }).pipe(
      Context.add(providerCommandPolicyTag(routePermissionSchema), { execute }),
    );
  }),
).pipe(Layer.provide(resourceModelLayer));
