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
import { ResourceOutputBinding } from "../../../../../src/core/resource/resourceOutputBinding.js";

export interface AWSGroupPolicyProps {
  readonly PolicyDocument: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly GroupName:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "group";
      }>
    | string;
}

export const AWSGroupPolicyResourceSchema = ResourceSchemaAnnotationSchema.make(
  {
    provider: "aws",
    service: "iam",
    resource: "grouppolicy",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["PolicyName"], ["GroupName"]],
    },
    primaryIdentifier: ["/properties/PolicyName", "/properties/GroupName"],
  },
);

export const AWSGroupPolicyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    PolicyDocument: Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
    }),
    PolicyName: Schema.String.annotate({
      description:
        "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    }),
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
      Schema.String.annotate({
        description:
          "The name of the group to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.",
      }),
    ]),
  }),
  AWSGroupPolicyResourceSchema,
);

export interface AWSGroupPolicyOutputs {
  readonly PolicyName: string;
  readonly GroupName: string;
}

export const AWSGroupPolicyOutputsSchema = Schema.Struct({
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
  GroupName: Schema.String.annotate({
    description:
      "The name of the group to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.",
  }),
});

export interface AWSGroupPolicyRequest {
  readonly PolicyDocument: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly GroupName: string;
}

export const AWSGroupPolicyRequestSchema = Schema.Struct({
  PolicyDocument: Schema.Record(
    Schema.String,
    Schema.Json.annotate({ expected: "JSON value" }),
  ).annotate({
    description:
      "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
  }),
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
  GroupName: Schema.String.annotate({
    description:
      "The name of the group to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.",
  }),
});

/**
 * The AWSGroupPolicyRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSGroupPolicyRelationshipIssues = [];

export const AWSGroupPolicyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("grouppolicy"),
});

/**
 * The AWSGroupPolicyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSGroupPolicyResource<
  Props = AWSGroupPolicyProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "grouppolicy";
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
        resource: "grouppolicy",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PolicyName(): Required<AWSGroupPolicyOutputs>["PolicyName"] {
    const value: Required<AWSGroupPolicyOutputs>["PolicyName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PolicyName",
        AWSGroupPolicyOutputsSchema.fields.PolicyName,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get GroupName(): Required<AWSGroupPolicyOutputs>["GroupName"] {
    const value: Required<AWSGroupPolicyOutputs>["GroupName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "GroupName",
        AWSGroupPolicyOutputsSchema.fields.GroupName,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSGroupPolicyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSGroupPolicyResource<Props> {
  const resource: AWSGroupPolicyResource<Props> =
    new AWSGroupPolicyResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSGroupPolicy resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSGroupPolicy = Effect.fn("AWSGroupPolicy")(function* (input: {
  logicalId: string;
  props: AWSGroupPolicyProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSGroupPolicyPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSGroupPolicyResourceTypeSchema, {
    propsSchema: AWSGroupPolicyPropsSchema,
    requestSchema: AWSGroupPolicyRequestSchema,
    outputsSchema: AWSGroupPolicyOutputsSchema,
    props,
  });

  const resource: AWSGroupPolicyResource = createAWSGroupPolicyDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
