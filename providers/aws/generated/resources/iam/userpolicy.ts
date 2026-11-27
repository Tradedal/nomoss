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

export interface AWSUserPolicyProps {
  readonly PolicyDocument: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly UserName:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "user";
      }>
    | string;
}

export const AWSUserPolicyResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "userpolicy",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["PolicyName"], ["UserName"]],
  },
  primaryIdentifier: ["/properties/PolicyName", "/properties/UserName"],
});

export const AWSUserPolicyPropsSchema = annotateResourceSchema(
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
    UserName: Schema.Union([
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
      Schema.String.annotate({
        description:
          "The name of the user to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      }),
    ]),
  }),
  AWSUserPolicyResourceSchema,
);

export interface AWSUserPolicyOutputs {
  readonly PolicyName: string;
  readonly UserName: string;
}

export const AWSUserPolicyOutputsSchema = Schema.Struct({
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
  UserName: Schema.String.annotate({
    description:
      "The name of the user to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
});

export interface AWSUserPolicyRequest {
  readonly PolicyDocument: {
    readonly [x: string]: Schema.Json;
  };
  readonly PolicyName: string;
  readonly UserName: string;
}

export const AWSUserPolicyRequestSchema = Schema.Struct({
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
  UserName: Schema.String.annotate({
    description:
      "The name of the user to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  }),
});

/**
 * The AWSUserPolicyRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSUserPolicyRelationshipIssues = [];

export const AWSUserPolicyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("userpolicy"),
});

/**
 * The AWSUserPolicyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSUserPolicyResource<
  Props = AWSUserPolicyProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "userpolicy";
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
        resource: "userpolicy",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PolicyName(): Required<AWSUserPolicyOutputs>["PolicyName"] {
    const value: Required<AWSUserPolicyOutputs>["PolicyName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PolicyName",
        AWSUserPolicyOutputsSchema.fields.PolicyName,
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get UserName(): Required<AWSUserPolicyOutputs>["UserName"] {
    const value: Required<AWSUserPolicyOutputs>["UserName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "UserName",
        AWSUserPolicyOutputsSchema.fields.UserName,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSUserPolicyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSUserPolicyResource<Props> {
  const resource: AWSUserPolicyResource<Props> =
    new AWSUserPolicyResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSUserPolicy resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSUserPolicy = Effect.fn("AWSUserPolicy")(function* (input: {
  logicalId: string;
  props: AWSUserPolicyProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSUserPolicyPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSUserPolicyResourceTypeSchema, {
    propsSchema: AWSUserPolicyPropsSchema,
    requestSchema: AWSUserPolicyRequestSchema,
    outputsSchema: AWSUserPolicyOutputsSchema,
    props,
  });

  const resource: AWSUserPolicyResource = createAWSUserPolicyDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
