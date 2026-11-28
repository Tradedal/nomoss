// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import { Effect, Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceEntity,
  ResourceGraphBuilder,
  type ResourceKey,
  ResourceSchemaAnnotationSchema,
} from "nomoss/core";
import { ResourceOutputBinding } from "../../../../../src/core/resource/resourceOutputBinding.js";

export interface AWSServiceLinkedRoleProps {
  readonly CustomSuffix?: string;
  readonly Description?: string;
  readonly AWSServiceName?: string;
}

export const AWSServiceLinkedRoleResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "servicelinkedrole",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["CustomSuffix"], ["AWSServiceName"]],
    },
    primaryIdentifier: ["/properties/RoleName"],
  });

export const AWSServiceLinkedRolePropsSchema = annotateResourceSchema(
  Schema.Struct({
    CustomSuffix: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "A string that you provide, which is combined with the service-provided prefix to form the complete role name.",
      }),
    ),
    Description: Schema.optionalKey(
      Schema.String.annotate({ description: "The description of the role." }),
    ),
    AWSServiceName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The service principal for the AWS service to which this role is attached.",
      }),
    ),
  }),
  AWSServiceLinkedRoleResourceSchema,
);

export interface AWSServiceLinkedRoleOutputs {
  readonly RoleName?: string;
}

export const AWSServiceLinkedRoleOutputsSchema = Schema.Struct({
  RoleName: Schema.optionalKey(
    Schema.String.annotate({ description: "The name of the role." }),
  ),
});

export interface AWSServiceLinkedRoleRequest {
  readonly CustomSuffix?: string;
  readonly Description?: string;
  readonly AWSServiceName?: string;
}

export const AWSServiceLinkedRoleRequestSchema = Schema.Struct({
  CustomSuffix: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "A string that you provide, which is combined with the service-provided prefix to form the complete role name.",
    }),
  ),
  Description: Schema.optionalKey(
    Schema.String.annotate({ description: "The description of the role." }),
  ),
  AWSServiceName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The service principal for the AWS service to which this role is attached.",
    }),
  ),
});

/**
 * The AWSServiceLinkedRoleRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSServiceLinkedRoleRelationshipIssues = [];

export const AWSServiceLinkedRoleResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("servicelinkedrole"),
});

/**
 * The AWSServiceLinkedRoleResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSServiceLinkedRoleResource<
  Props = AWSServiceLinkedRoleProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "servicelinkedrole";
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
        service: "iam",
        resource: "servicelinkedrole",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RoleName(): Required<AWSServiceLinkedRoleOutputs>["RoleName"] {
    const value: Required<AWSServiceLinkedRoleOutputs>["RoleName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RoleName",
        Schema.requiredKey(AWSServiceLinkedRoleOutputsSchema.fields.RoleName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSServiceLinkedRoleDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSServiceLinkedRoleResource<Props> {
  const resource: AWSServiceLinkedRoleResource<Props> =
    new AWSServiceLinkedRoleResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSServiceLinkedRole resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSServiceLinkedRole = Effect.fn("AWSServiceLinkedRole")(
  function* (input: { logicalId: string; props: AWSServiceLinkedRoleProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSServiceLinkedRolePropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(AWSServiceLinkedRoleResourceTypeSchema, {
      propsSchema: AWSServiceLinkedRolePropsSchema,
      requestSchema: AWSServiceLinkedRoleRequestSchema,
      outputsSchema: AWSServiceLinkedRoleOutputsSchema,
      props,
    });

    const resource: AWSServiceLinkedRoleResource =
      createAWSServiceLinkedRoleDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
