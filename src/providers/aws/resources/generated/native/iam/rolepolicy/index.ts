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

export interface AWSRolePolicyProps {
  readonly PolicyDocument?: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly RoleName:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string;
}

export const AWSRolePolicyResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "rolepolicy",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["PolicyName"], ["RoleName"]],
  },
  primaryIdentifier: ["/properties/PolicyName", "/properties/RoleName"],
});
export const AWSRolePolicyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    PolicyDocument: Schema.optionalKey(
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ).annotate({
        description:
          "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
      }),
    ),
    PolicyName: Schema.String.annotate({
      description:
        "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    }),
    RoleName: Schema.Union([
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
      Schema.String.annotate({
        description:
          "The name of the role to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      }),
    ]),
  }),
  AWSRolePolicyResourceSchema,
);

export interface AWSRolePolicyOutputs {
  readonly PolicyName: string;
  readonly RoleName: string;
}

export const AWSRolePolicyOutputsSchema = Schema.Struct({
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
  RoleName: Schema.String.annotate({
    description:
      "The name of the role to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
});

export interface AWSRolePolicyRequest {
  readonly PolicyDocument?: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly RoleName: string;
}

export const AWSRolePolicyRequestSchema = Schema.Struct({
  PolicyDocument: Schema.optionalKey(
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
    }),
  ),
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
  RoleName: Schema.String.annotate({
    description:
      "The name of the role to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
});
export const AWSRolePolicyRelationshipIssues = [];
export const AWSRolePolicyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("rolepolicy"),
});

/**
 * The AWSRolePolicyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSRolePolicyResource<
  Props = AWSRolePolicyProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "rolepolicy";
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
        resource: "rolepolicy",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PolicyName(): Required<AWSRolePolicyOutputs>["PolicyName"] {
    const value: Required<AWSRolePolicyOutputs>["PolicyName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PolicyName",
        AWSRolePolicyOutputsSchema.fields.PolicyName,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RoleName(): Required<AWSRolePolicyOutputs>["RoleName"] {
    const value: Required<AWSRolePolicyOutputs>["RoleName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RoleName",
        AWSRolePolicyOutputsSchema.fields.RoleName,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSRolePolicyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSRolePolicyResource<Props> {
  const resource: AWSRolePolicyResource<Props> =
    new AWSRolePolicyResource<Props>(key, props, binding);

  return resource;
}

/** The AWSRolePolicy resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSRolePolicy = Effect.fn("AWSRolePolicy")(function* (input: {
  logicalId: string;
  props: AWSRolePolicyProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSRolePolicyPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSRolePolicyResourceTypeSchema, {
    propsSchema: AWSRolePolicyPropsSchema,
    requestSchema: AWSRolePolicyRequestSchema,
    outputsSchema: AWSRolePolicyOutputsSchema,
    props,
  });

  const resource: AWSRolePolicyResource = createAWSRolePolicyDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSRolePolicyOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-rolepolicy.json",
      format: "CloudFormation",
    },
    typeName: "AWS::IAM::RolePolicy",
    resource: "rolepolicy",
    primaryIdentifier: ["/properties/PolicyName", "/properties/RoleName"],
    createOnlyProperties: ["/properties/PolicyName", "/properties/RoleName"],
    writeOnlyProperties: [],
    outputs: {
      PolicyName: {
        schema: {
          description:
            "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
          type: "string",
        },
        schemaPath: "/properties/PolicyName",
        valuePath: "/PolicyName",
        required: true,
      },
      RoleName: {
        schema: {
          description:
            "The name of the role to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
          type: "string",
        },
        schemaPath: "/properties/RoleName",
        valuePath: "/RoleName",
        required: true,
      },
    },
  },
];
