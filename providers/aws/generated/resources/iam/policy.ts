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

export interface AWSPolicyProps {
  readonly Groups?: ReadonlyArray<string>;
  readonly PolicyName: string;
  readonly PolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Roles?: ReadonlyArray<string>;
  readonly Users?: ReadonlyArray<string>;
}

export const AWSPolicyResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "policy",
  operation: "create",
  stateSecretOutputKeys: [],
  primaryIdentifier: ["/properties/Id"],
});

export const AWSPolicyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Groups: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "The name of the group to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.",
      }),
    ),
    PolicyName: Schema.String.annotate({
      description:
        "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      ),
    PolicyDocument: Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(131072).annotate({
          expected: "a string with at most 131072 code points",
        }),
      ),
    ]).annotate({
      description:
        "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
    }),
    Roles: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "The name of the role to associate the policy with.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
      }),
    ),
    Users: Schema.optionalKey(
      Schema.Array(Schema.String).annotate({
        description:
          "The name of the user to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      }),
    ),
  }),
  AWSPolicyResourceSchema,
);

export interface AWSPolicyOutputs {
  readonly Id?: string;
}

export const AWSPolicyOutputsSchema = Schema.Struct({
  Id: Schema.optionalKey(Schema.String.annotate({ description: "" })),
});

export interface AWSPolicyRequest {
  readonly Groups?: ReadonlyArray<string>;
  readonly PolicyName: string;
  readonly PolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Roles?: ReadonlyArray<string>;
  readonly Users?: ReadonlyArray<string>;
}

export const AWSPolicyRequestSchema = Schema.Struct({
  Groups: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The name of the group to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-.",
    }),
  ),
  PolicyName: Schema.String.annotate({
    description:
      "The name of the policy document.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(128).annotate({
        expected: "a string with at most 128 code points",
      }),
    ),
  PolicyDocument: Schema.Union([
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(131072).annotate({
        expected: "a string with at most 131072 code points",
      }),
    ),
  ]).annotate({
    description:
      "The policy document.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
  }),
  Roles: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The name of the role to associate the policy with.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
    }),
  ),
  Users: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "The name of the user to associate the policy with.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
    }),
  ),
});

/**
 * The AWSPolicyRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSPolicyRelationshipIssues = [];

export const AWSPolicyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("policy"),
});

/**
 * The AWSPolicyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSPolicyResource<Props = AWSPolicyProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "policy";
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
        resource: "policy",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Id(): Required<AWSPolicyOutputs>["Id"] {
    const value: Required<AWSPolicyOutputs>["Id"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "Id",
      Schema.requiredKey(AWSPolicyOutputsSchema.fields.Id),
    );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSPolicyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSPolicyResource<Props> {
  const resource: AWSPolicyResource<Props> = new AWSPolicyResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSPolicy resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSPolicy = Effect.fn("AWSPolicy")(function* (input: {
  logicalId: string;
  props: AWSPolicyProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSPolicyPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSPolicyResourceTypeSchema, {
    propsSchema: AWSPolicyPropsSchema,
    requestSchema: AWSPolicyRequestSchema,
    outputsSchema: AWSPolicyOutputsSchema,
    props,
  });

  const resource: AWSPolicyResource = createAWSPolicyDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
