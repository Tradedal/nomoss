import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceReferenceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../core/resource/model.js";
import { ResourceGraphBuilder } from "../../../../core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../../../../core/resource/resourceGraphStore.js";
import { AWSRoleResourceTypeSchema } from "../generated/native/iam/role/index.js";
import { PolicyStatement } from "./policyStatement.js";

export { PolicyStatement } from "./policyStatement.js";

type RolePrincipal = ResourceEntity<typeof AWSRoleResourceTypeSchema.Type>;

/**
 * The roleGrantSchema annotation identifies a policy owned by one role.
 * A different principal requires a separate AWS policy identity.
 */
export const roleGrantSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "role-grant",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: [
    "/properties/RoleId",
    "/properties/RoleName",
    "/properties/PolicyName",
  ],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["Principal"]],
  },
});

const Principal = Schema.Struct({
  RoleName: Schema.NonEmptyString,
  RoleId: Schema.NonEmptyString,
});

/**
 * The RoleGrantOutputs schema retains the role ID as well as the AWS names
 * used to read and remove the policy. IAM allows a deleted role's name to be
 * reused.
 */
export const RoleGrantOutputs = Schema.Struct({
  ...Principal.fields,
  PolicyName: Schema.NonEmptyString,
});

const Actions = PolicyStatement.fields.actions;
const Resources = Schema.NonEmptyArray(Schema.NonEmptyString);

const GrantStatement = PolicyStatement.pipe(
  Schema.encodeKeys({
    actions: "Actions",
    resources: "Resource",
    effect: "Effect",
    conditions: "Condition",
  }),
);

/**
 * The RoleGrantRequest schema validates the resolved principal and policy
 * fields before IAM receives the inline policy.
 */
export const RoleGrantRequest = Schema.Struct({
  Actions,
  Principal,
  Resource: Schema.Union([Resources, Schema.NonEmptyString]),
  Effect: PolicyStatement.fields.effect,
  Condition: PolicyStatement.fields.conditions,
});

const RoleReference = ResourceReferenceSchema(AWSRoleResourceTypeSchema, {
  value: { RoleName: null, RoleId: null },
  outputs: [
    { source: ["RoleName"], target: ["RoleName"] },
    { source: ["RoleId"], target: ["RoleId"] },
  ],
});

const RoleGrantType = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("role-grant"),
});

const RoleGrantProps = annotateResourceSchema(
  RoleGrantRequest.mapFields((fields) => ({
    ...fields,
    Principal: RoleReference,
    Resource: PolicyStatement.fields.resources,
  })),
  roleGrantSchema,
);

/**
 * The Grant class identifies an IAM policy managed by the stack. Its
 * applyBefore method makes a consuming resource wait for that policy.
 */
export class Grant extends ResourceEntity<typeof RoleGrantType.Type> {
  /**
   * The applyBefore method orders a consumer after the grant. Both
   * declarations must belong to the graph being built.
   */
  applyBefore(resource: ResourceEntity) {
    return Effect.flatMap(ResourceGraphStore, (graph) =>
      graph.addDependency(this.key, resource.key, {
        kind: "prerequisite",
        reason: "IAM grant",
      }),
    );
  }
}

/**
 * The RoleGrant function registers one named identity policy for a
 * role. The grant keeps its identity when the statement changes, and the
 * graph resolves the role's immutable ID before IAM receives the policy.
 */
export const RoleGrant = Effect.fn("RoleGrant")(function* (
  logicalId: string,
  principal: RolePrincipal,
  statement: PolicyStatement,
) {
  const graph = yield* ResourceGraphBuilder;

  const desired = yield* Schema.encodeEffect(GrantStatement)(statement);
  const key = { logicalId };

  const props = yield* Schema.decodeUnknownEffect(RoleGrantProps)({
    ...desired,
    Principal: principal,
  });

  const declaration = yield* graph.resource(key);
  const entity = yield* declaration.registerEntity(RoleGrantType, {
    propsSchema: RoleGrantProps,
    requestSchema: RoleGrantRequest,
    outputsSchema: RoleGrantOutputs,
    props,
  });

  const grant: Grant = new Grant(entity);

  return grant;
});
