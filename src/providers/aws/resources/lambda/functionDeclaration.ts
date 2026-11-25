import { Effect, Match, Schema, Struct } from "effect";
import { AssetSchema } from "../../../../core/asset.js";
import type { ResourceKey } from "../../../../core/resource/model.js";
import { annotateResourceSchema } from "../../../../core/resource/model.js";
import { ResourceGraphBuilder } from "../../../../core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../../../../core/resource/resourceGraphStore.js";
import type { ResourceOutputBinding } from "../../../../core/resource/resourceOutputBinding.js";
import { AWSRouteResource } from "../generated/native/apigatewayv2/route/index.js";
import {
  AWSFunctionOutputsSchema,
  AWSFunctionPropsSchema,
  AWSFunctionRequestSchema,
  AWSFunctionResourceSchema,
  AWSFunctionResourceTypeSchema,
  AWSFunctionResource as GeneratedFunction,
} from "../generated/native/lambda/function/index.js";
import {
  AWSPermission,
  type AWSPermissionProps,
} from "../generated/native/lambda/permission/index.js";
import { AWSRole, type AWSRoleResource } from "../iam/roleDeclaration.js";
import { routeInvocationPermission } from "./permission.js";

export * from "../generated/native/lambda/function/index.js";

/**
 * The LambdaExecutionRole function creates a role Lambda can assume
 * and gives it permission to write CloudWatch Logs. IAM installs the inline
 * policy as part of role creation, so a function that uses this role waits
 * for both trust and logging permissions.
 *
 * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (CreateFunction and CreateFunctionRequest.Role)
 */
export const LambdaExecutionRole = (logicalId: string) =>
  AWSRole({
    logicalId,
    props: {
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { Service: "lambda.amazonaws.com" },
            Action: "sts:AssumeRole",
          },
        ],
      },
      Policies: [
        {
          PolicyName: "CloudWatchLogs",
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: [
                  "logs:CreateLogGroup",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents",
                ],
                Resource: "*",
              },
            ],
          },
        },
      ],
    },
  });

const functionProps = annotateResourceSchema(
  AWSFunctionPropsSchema.pipe(
    Schema.fieldsAssign({
      Code: Schema.Union([AssetSchema, AWSFunctionPropsSchema.fields.Code]),
    }),
  ),
  AWSFunctionResourceSchema,
);

const functionRequest = AWSFunctionRequestSchema.pipe(
  Schema.fieldsAssign({
    Code: Schema.Union([AssetSchema, AWSFunctionRequestSchema.fields.Code]),
  }),
);

type FunctionProps = typeof functionProps.Type;

type FunctionDeclaration = {
  readonly logicalId: string;
} & (
  | { readonly executionRole?: never; readonly props: FunctionProps }
  | {
      readonly executionRole: AWSRoleResource;
      readonly props: Omit<FunctionProps, "Role"> & { readonly Role?: never };
    }
);

type LambdaPermission = {
  readonly [Field in Exclude<
    keyof AWSPermissionProps,
    "FunctionName"
  > as Field extends "PrincipalOrgID"
    ? "principalOrgId"
    : Uncapitalize<Field>]: AWSPermissionProps[Field];
};

const permissionKeys = {
  action: "Action",
  eventSourceToken: "EventSourceToken",
  functionUrlAuthType: "FunctionUrlAuthType",
  invokedViaFunctionUrl: "InvokedViaFunctionUrl",
  principal: "Principal",
  principalOrgId: "PrincipalOrgID",
  sourceAccount: "SourceAccount",
  sourceArn: "SourceArn",
} as const;

/**
 * The AWSFunctionResource class lets an application declare permissions for
 * callers of a native Lambda function.
 */
export class AWSFunctionResource<
  Props = FunctionProps,
> extends GeneratedFunction<Props> {
  /**
   * The grantInvoke method lets a role in the same account invoke this
   * unqualified function or lets API Gateway invoke it for a concrete HTTP
   * route with a literal path. Route parameters, wildcards, ANY, and $default
   * fail schema validation; addPermission accepts an explicit sourceArn for
   * those cases. Removing the grant declaration removes its policy statement.
   *
   * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (Invoke)
   * @see ../../../../../docs/application/resource-graph.md (Relationships and request values)
   */
  grantInvoke(
    role: AWSRoleResource,
  ): ReturnType<AWSRoleResource["addToPolicy"]>;
  grantInvoke(
    route: AWSRouteResource,
  ): ReturnType<typeof routeInvocationPermission>;
  grantInvoke(grantee: AWSRoleResource | AWSRouteResource) {
    return Match.value(grantee).pipe(
      Match.when(
        (candidate): candidate is AWSRouteResource =>
          candidate instanceof AWSRouteResource,
        (route) => routeInvocationPermission(this, route),
      ),
      Match.orElse((role) =>
        role.addToPolicy(
          `LambdaInvoke/${encodeURIComponent(this.key.logicalId)}`,
          { actions: ["lambda:InvokeFunction"], resources: [this] },
        ),
      ),
    );
  }

  /**
   * The addPermission method declares a named statement on the receiving
   * function. Use sourceArn or sourceAccount to restrict a service principal
   * to the resources that may invoke the function.
   *
   * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (AddPermissionRequest)
   * @see ../../../../../../command-options-fund/refs/effect/packages/effect/src/Struct.ts (renameKeys)
   */
  addPermission(name: string, permission: LambdaPermission) {
    return Schema.decodeEffect(Schema.NonEmptyString)(name).pipe(
      Effect.flatMap((statement) =>
        AWSPermission({
          logicalId: `${this.key.logicalId}/Permission/${encodeURIComponent(statement)}`,
          props: Struct.assign(Struct.renameKeys(permission, permissionKeys), {
            FunctionName: this,
          }),
        }),
      ),
    );
  }
}

/**
 * The createAWSFunctionDeclaration function constructs a Lambda entity from
 * validated properties. Its stack binding supplies applied output values.
 */
export const createAWSFunctionDeclaration = <Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
) => new AWSFunctionResource(key, props, binding);

/**
 * The AWSFunction function registers a native Lambda function with invocation
 * grants. Pass an Asset as Code to build or package local source during planning.
 * Supply an executionRole to depend on a declared IAM role. Core resolves
 * its ARN after role creation through the generated relationship schema.
 *
 * @see ../../../../../docs/application/resource-graph.md (Relationships and request values)
 * @see ../../../../../refs/aws-cdk-generator/packages/aws-cdk-lib/core/lib/assets.ts (FileAssetSource)
 * @see ../../../../../node_modules/effect/src/Schema.ts (fieldsAssign)
 */
export const AWSFunction = Effect.fn("AWSFunction")(function* (
  input: FunctionDeclaration,
) {
  const graph = yield* ResourceGraphStore;
  const binding = yield* graph.outputBinding;

  const declaration = Match.value(input).pipe(
    Match.when(
      { executionRole: Match.defined },
      ({ logicalId, props, executionRole }) => ({
        logicalId,
        props: Struct.assign(props, { Role: executionRole }),
      }),
    ),
    Match.orElse(({ logicalId, props }) => ({ logicalId, props })),
  );

  const builder = yield* ResourceGraphBuilder;
  const key: ResourceKey = { logicalId: declaration.logicalId };
  const registration = yield* builder.resource(key);
  const props = yield* Schema.decodeEffect(functionProps)(declaration.props);

  yield* registration.registerEntity(AWSFunctionResourceTypeSchema, {
    propsSchema: functionProps,
    requestSchema: functionRequest,
    outputsSchema: AWSFunctionOutputsSchema,
    props,
  });

  const resource: AWSFunctionResource = createAWSFunctionDeclaration(
    key,
    props,
    binding,
  );

  return resource;
});
