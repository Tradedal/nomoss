import { Effect, Schema } from "effect";
import type { ResourceKey } from "../../../../core/resource/model.js";
import { ResourceGraphBuilder } from "../../../../core/resource/resourceGraphBuilder.js";
import type { ResourceOutputBinding } from "../../../../core/resource/resourceOutputBinding.js";
import {
  AWSRoleOutputsSchema,
  type AWSRoleProps,
  AWSRolePropsSchema,
  AWSRoleRequestSchema,
  AWSRoleResourceTypeSchema,
  AWSRoleResource as GeneratedRole,
} from "../generated/native/iam/role/index.js";
import { type PolicyStatement, RoleGrant } from "./grant.js";

export * from "../generated/native/iam/role/index.js";

/**
 * The AWSRoleResource class adds identity permissions to the generated IAM
 * role declaration. Each named statement has its own lifecycle.
 */
export class AWSRoleResource<
  Props = AWSRoleProps,
> extends GeneratedRole<Props> {
  /**
   * The addToPolicy method declares a named IAM statement on this role.
   * Its grant can be used to order a workload that needs the permission.
   */
  addToPolicy(name: string, statement: PolicyStatement) {
    return Schema.decodeEffect(Schema.NonEmptyString)(name).pipe(
      Effect.flatMap((name) =>
        RoleGrant(`${this.key.logicalId}/${name}`, this, statement),
      ),
    );
  }

  /**
   * The grantPassRole method gives the grantee permission to pass this
   * role to an AWS service. The grant resolves this role's ARN at apply
   * time and removing the grant revokes the permission it owns.
   *
   * @see ../../../../../refs/aws-api-models/models/lambda/service/2015-03-31/lambda-2015-03-31.json (CreateFunction and CreateFunctionRequest.Role)
   * @see ../../../../../docs/application/resource-graph.md (Relationships and request values)
   */
  grantPassRole(grantee: AWSRoleResource) {
    return grantee.addToPolicy(
      `PassRole/${encodeURIComponent(this.key.logicalId)}`,
      { actions: ["iam:PassRole"], resources: [this] },
    );
  }

  /**
   * The grantAssumeRole method adds permission for the grantee to call
   * STS AssumeRole for this role. Configure this role's trust policy to
   * allow the grantee before it calls STS.
   *
   * @see ../../../../../refs/aws-api-models/models/sts/service/2011-06-15/sts-2011-06-15.json (AssumeRole)
   */
  grantAssumeRole(grantee: AWSRoleResource) {
    return grantee.addToPolicy(
      `AssumeRole/${encodeURIComponent(this.key.logicalId)}`,
      { actions: ["sts:AssumeRole"], resources: [this] },
    );
  }
}

/**
 * The createAWSRoleDeclaration function constructs the IAM role entity from
 * validated properties. Pass the declaration's binding to expose applied
 * provider outputs.
 */
export const createAWSRoleDeclaration = <Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
) => new AWSRoleResource(key, props, binding);

/**
 * The AWSRole function registers a role through the generated Registry
 * schemas and returns a role whose policy methods use the same stack graph.
 */
export const AWSRole = Effect.fn("AWSRole")(function* (input: {
  readonly logicalId: string;
  readonly props: AWSRoleProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key = { logicalId: input.logicalId };
  const props = yield* Schema.decodeEffect(AWSRolePropsSchema)(input.props);

  const declaration = yield* graph.resource(key);
  yield* declaration.registerEntity(AWSRoleResourceTypeSchema, {
    propsSchema: AWSRolePropsSchema,
    requestSchema: AWSRoleRequestSchema,
    outputsSchema: AWSRoleOutputsSchema,
    props,
  });

  const role: AWSRoleResource = createAWSRoleDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return role;
});
