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

export interface AWSInstanceProfileProps {
  readonly Path?: string;
  readonly Roles: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string
  >;
  readonly InstanceProfileName?: string;
}

export const AWSInstanceProfileResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "instanceprofile",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["InstanceProfileName"], ["Path"]],
    },
    primaryIdentifier: ["/properties/InstanceProfileName"],
  });
export const AWSInstanceProfilePropsSchema = annotateResourceSchema(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The path to the instance profile. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
      }),
    ),
    Roles: Schema.Array(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("iam"),
              resource: Schema.Literal("role"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["RoleName"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String,
      ]),
    )
      .annotate({
        description:
          "The name of the role to associate with the instance profile. Only one role can be assigned to an EC2 instance at a time, and all applications on the instance share the same role and permissions.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
    InstanceProfileName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The name of the instance profile to create.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      }),
    ),
  }),
  AWSInstanceProfileResourceSchema,
);

export interface AWSInstanceProfileOutputs {
  readonly Arn?: string;
  readonly InstanceProfileName?: string;
}

export const AWSInstanceProfileOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  InstanceProfileName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the instance profile to create.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    }),
  ),
});

export interface AWSInstanceProfileRequest {
  readonly Path?: string;
  readonly Roles: ReadonlyArray<string>;
  readonly InstanceProfileName?: string;
}

export const AWSInstanceProfileRequestSchema = Schema.Struct({
  Path: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The path to the instance profile. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
    }),
  ),
  Roles: Schema.Array(Schema.String)
    .annotate({
      description:
        "The name of the role to associate with the instance profile. Only one role can be assigned to an EC2 instance at a time, and all applications on the instance share the same role and permissions.",
    })
    .check(
      Schema.isUnique().annotate({ expected: "an array with unique items" }),
    ),
  InstanceProfileName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the instance profile to create.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    }),
  ),
});
export const AWSInstanceProfileRelationshipIssues = [];
export const AWSInstanceProfileResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("instanceprofile"),
});

/**
 * The AWSInstanceProfileResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSInstanceProfileResource<
  Props = AWSInstanceProfileProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "instanceprofile";
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
        resource: "instanceprofile",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSInstanceProfileOutputs>["Arn"] {
    const value: Required<AWSInstanceProfileOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSInstanceProfileOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get InstanceProfileName(): Required<AWSInstanceProfileOutputs>["InstanceProfileName"] {
    const value: Required<AWSInstanceProfileOutputs>["InstanceProfileName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "InstanceProfileName",
        Schema.requiredKey(
          AWSInstanceProfileOutputsSchema.fields.InstanceProfileName,
        ),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSInstanceProfileDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSInstanceProfileResource<Props> {
  const resource: AWSInstanceProfileResource<Props> =
    new AWSInstanceProfileResource<Props>(key, props, binding);

  return resource;
}

/** The AWSInstanceProfile resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSInstanceProfile = Effect.fn("AWSInstanceProfile")(
  function* (input: { logicalId: string; props: AWSInstanceProfileProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSInstanceProfilePropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(AWSInstanceProfileResourceTypeSchema, {
      propsSchema: AWSInstanceProfilePropsSchema,
      requestSchema: AWSInstanceProfileRequestSchema,
      outputsSchema: AWSInstanceProfileOutputsSchema,
      props,
    });

    const resource: AWSInstanceProfileResource =
      createAWSInstanceProfileDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
export const AWSInstanceProfileOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-instanceprofile.json",
      format: "CloudFormation",
    },
    typeName: "AWS::IAM::InstanceProfile",
    resource: "instanceprofile",
    primaryIdentifier: ["/properties/InstanceProfileName"],
    createOnlyProperties: [
      "/properties/InstanceProfileName",
      "/properties/Path",
    ],
    writeOnlyProperties: [],
    outputs: {
      Arn: {
        schema: {
          type: "string",
          description: "",
        },
        schemaPath: "/properties/Arn",
        valuePath: "/Arn",
        required: false,
      },
      InstanceProfileName: {
        schema: {
          type: "string",
          description:
            "The name of the instance profile to create.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
        },
        schemaPath: "/properties/InstanceProfileName",
        valuePath: "/InstanceProfileName",
        required: false,
      },
    },
  },
];
