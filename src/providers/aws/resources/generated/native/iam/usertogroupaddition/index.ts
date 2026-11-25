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

export interface AWSUserToGroupAdditionProps {
  readonly GroupName:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "group";
      }>
    | string;
  readonly Users: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "user";
      }>
    | string
  >;
}

export const AWSUserToGroupAdditionResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "usertogroupaddition",
    operation: "create",
    stateSecretOutputKeys: [],
    primaryIdentifier: ["/properties/Id"],
  });
export const AWSUserToGroupAdditionPropsSchema = annotateResourceSchema(
  Schema.Struct({
    GroupName: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("iam"),
            resource: Schema.Literal("group"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["GroupName"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String,
    ]),
    Users: Schema.Array(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("iam"),
              resource: Schema.Literal("user"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["UserName"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String,
      ]),
    ),
  }),
  AWSUserToGroupAdditionResourceSchema,
);

export interface AWSUserToGroupAdditionOutputs {
  readonly Id?: string;
}

export const AWSUserToGroupAdditionOutputsSchema = Schema.Struct({
  Id: Schema.optionalKey(Schema.String),
});

export interface AWSUserToGroupAdditionRequest {
  readonly GroupName: string;
  readonly Users: ReadonlyArray<string>;
}

export const AWSUserToGroupAdditionRequestSchema = Schema.Struct({
  GroupName: Schema.String,
  Users: Schema.Array(Schema.String),
});
export const AWSUserToGroupAdditionRelationshipIssues = [];
export const AWSUserToGroupAdditionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("usertogroupaddition"),
});

/**
 * The AWSUserToGroupAdditionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSUserToGroupAdditionResource<
  Props = AWSUserToGroupAdditionProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "usertogroupaddition";
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
        resource: "usertogroupaddition",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Id(): Required<AWSUserToGroupAdditionOutputs>["Id"] {
    const value: Required<AWSUserToGroupAdditionOutputs>["Id"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Id",
        Schema.requiredKey(AWSUserToGroupAdditionOutputsSchema.fields.Id),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSUserToGroupAdditionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSUserToGroupAdditionResource<Props> {
  const resource: AWSUserToGroupAdditionResource<Props> =
    new AWSUserToGroupAdditionResource<Props>(key, props, binding);

  return resource;
}

/** The AWSUserToGroupAddition resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSUserToGroupAddition = Effect.fn("AWSUserToGroupAddition")(
  function* (input: { logicalId: string; props: AWSUserToGroupAdditionProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSUserToGroupAdditionPropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(
      AWSUserToGroupAdditionResourceTypeSchema,
      {
        propsSchema: AWSUserToGroupAdditionPropsSchema,
        requestSchema: AWSUserToGroupAdditionRequestSchema,
        outputsSchema: AWSUserToGroupAdditionOutputsSchema,
        props,
      },
    );

    const resource: AWSUserToGroupAdditionResource =
      createAWSUserToGroupAdditionDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
export const AWSUserToGroupAdditionOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-usertogroupaddition.json",
      format: "CloudFormation",
    },
    typeName: "AWS::IAM::UserToGroupAddition",
    resource: "usertogroupaddition",
    primaryIdentifier: ["/properties/Id"],
    createOnlyProperties: [],
    writeOnlyProperties: [],
    outputs: {
      Id: {
        schema: {
          type: "string",
        },
        schemaPath: "/properties/Id",
        valuePath: "/Id",
        required: false,
      },
    },
  },
];
