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

export interface AWSManagedPolicyProps {
  readonly Description?: string;
  readonly Groups?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "group";
      }>
    | string
  >;
  readonly ManagedPolicyName?: string;
  readonly Path?: string;
  readonly PolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Roles?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string
  >;
  readonly Users?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "user";
      }>
    | string
  >;
}

export const AWSManagedPolicyResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "iam",
    resource: "managedpolicy",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["ManagedPolicyName"], ["Description"], ["Path"]],
    },
    primaryIdentifier: ["/properties/PolicyArn"],
  });

export const AWSManagedPolicyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Description: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'A friendly description of the policy.\n Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables."\n The policy description is immutable. After a value is assigned, it cannot be changed.',
      }),
    ),
    Groups: Schema.optionalKey(
      Schema.Array(
        Schema.Union([
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
      )
        .annotate({
          description:
            "The name (friendly name, not ARN) of the group to attach the policy to.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    ManagedPolicyName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'The friendly name of the policy.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
      }),
    ),
    Path: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The path for the policy.\n For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.\n  You cannot use an asterisk (*) in the path name.",
      }),
    ),
    PolicyDocument: Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
      Schema.String,
    ]).annotate({
      description:
        "The JSON policy document that you want to use as the content for the new policy.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length).\n To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide*. \n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
    }),
    Roles: Schema.optionalKey(
      Schema.Array(
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
            "The name (friendly name, not ARN) of the role to attach the policy to.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    Users: Schema.optionalKey(
      Schema.Array(
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
      )
        .annotate({
          description:
            "The name (friendly name, not ARN) of the IAM user to attach the policy to.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
  }),
  AWSManagedPolicyResourceSchema,
);

export interface AWSManagedPolicyOutputs {
  readonly PolicyArn?: string;
  readonly AttachmentCount?: number;
  readonly CreateDate?: string;
  readonly DefaultVersionId?: string;
  readonly IsAttachable?: boolean;
  readonly PermissionsBoundaryUsageCount?: number;
  readonly PolicyId?: string;
  readonly UpdateDate?: string;
}

export const AWSManagedPolicyOutputsSchema = Schema.Struct({
  PolicyArn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  AttachmentCount: Schema.optionalKey(
    Schema.Number.annotate({ description: "" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ),
  CreateDate: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  DefaultVersionId: Schema.optionalKey(
    Schema.String.annotate({ description: "" }),
  ),
  IsAttachable: Schema.optionalKey(
    Schema.Boolean.annotate({ description: "" }),
  ),
  PermissionsBoundaryUsageCount: Schema.optionalKey(
    Schema.Number.annotate({ description: "" }).check(
      Schema.isInt().annotate({ expected: "an integer" }),
    ),
  ),
  PolicyId: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  UpdateDate: Schema.optionalKey(Schema.String.annotate({ description: "" })),
});

export interface AWSManagedPolicyRequest {
  readonly Description?: string;
  readonly Groups?: ReadonlyArray<string>;
  readonly ManagedPolicyName?: string;
  readonly Path?: string;
  readonly PolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Roles?: ReadonlyArray<string>;
  readonly Users?: ReadonlyArray<string>;
}

export const AWSManagedPolicyRequestSchema = Schema.Struct({
  Description: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A friendly description of the policy.\n Typically used to store information about the permissions defined in the policy. For example, "Grants access to production DynamoDB tables."\n The policy description is immutable. After a value is assigned, it cannot be changed.',
    }),
  ),
  Groups: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "The name (friendly name, not ARN) of the group to attach the policy to.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  ManagedPolicyName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The friendly name of the policy.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
  Path: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The path for the policy.\n For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.\n  You cannot use an asterisk (*) in the path name.",
    }),
  ),
  PolicyDocument: Schema.Union([
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
    Schema.String,
  ]).annotate({
    description:
      "The JSON policy document that you want to use as the content for the new policy.\n You must provide policies in JSON format in IAM. However, for CFN templates formatted in YAML, you can provide the policy in JSON or YAML format. CFN always converts a YAML policy to JSON format before submitting it to IAM.\n The maximum length of the policy document that you can pass in this operation, including whitespace, is listed below. To view the maximum character counts of a managed policy with no whitespaces, see [IAM and character quotas](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_iam-quotas.html#reference_iam-quotas-entity-length).\n To learn more about JSON policy grammar, see [Grammar of the IAM JSON policy language](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_grammar.html) in the *IAM User Guide*. \n The [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex) used to validate this parameter is a string of characters consisting of the following:\n  +  Any printable ASCII character ranging from the space character (``\\u0020``) through the end of the ASCII character range\n  +  The printable characters in the Basic Latin and Latin-1 Supplement character set (through ``\\u00FF``)\n  +  The special characters tab (``\\u0009``), line feed (``\\u000A``), and carriage return (``\\u000D``)",
  }),
  Roles: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "The name (friendly name, not ARN) of the role to attach the policy to.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Users: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "The name (friendly name, not ARN) of the IAM user to attach the policy to.\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
});

/**
 * The AWSManagedPolicyRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSManagedPolicyRelationshipIssues = [];

export const AWSManagedPolicyResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("managedpolicy"),
});

/**
 * The AWSManagedPolicyResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSManagedPolicyResource<
  Props = AWSManagedPolicyProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "managedpolicy";
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
        resource: "managedpolicy",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PolicyArn(): Required<AWSManagedPolicyOutputs>["PolicyArn"] {
    const value: Required<AWSManagedPolicyOutputs>["PolicyArn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PolicyArn",
        Schema.requiredKey(AWSManagedPolicyOutputsSchema.fields.PolicyArn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get AttachmentCount(): Required<AWSManagedPolicyOutputs>["AttachmentCount"] {
    const value: Required<AWSManagedPolicyOutputs>["AttachmentCount"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "AttachmentCount",
        Schema.requiredKey(
          AWSManagedPolicyOutputsSchema.fields.AttachmentCount,
        ),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get CreateDate(): Required<AWSManagedPolicyOutputs>["CreateDate"] {
    const value: Required<AWSManagedPolicyOutputs>["CreateDate"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "CreateDate",
        Schema.requiredKey(AWSManagedPolicyOutputsSchema.fields.CreateDate),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get DefaultVersionId(): Required<AWSManagedPolicyOutputs>["DefaultVersionId"] {
    const value: Required<AWSManagedPolicyOutputs>["DefaultVersionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "DefaultVersionId",
        Schema.requiredKey(
          AWSManagedPolicyOutputsSchema.fields.DefaultVersionId,
        ),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get IsAttachable(): Required<AWSManagedPolicyOutputs>["IsAttachable"] {
    const value: Required<AWSManagedPolicyOutputs>["IsAttachable"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "IsAttachable",
        Schema.requiredKey(AWSManagedPolicyOutputsSchema.fields.IsAttachable),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PermissionsBoundaryUsageCount(): Required<AWSManagedPolicyOutputs>["PermissionsBoundaryUsageCount"] {
    const value: Required<AWSManagedPolicyOutputs>["PermissionsBoundaryUsageCount"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PermissionsBoundaryUsageCount",
        Schema.requiredKey(
          AWSManagedPolicyOutputsSchema.fields.PermissionsBoundaryUsageCount,
        ),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get PolicyId(): Required<AWSManagedPolicyOutputs>["PolicyId"] {
    const value: Required<AWSManagedPolicyOutputs>["PolicyId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "PolicyId",
        Schema.requiredKey(AWSManagedPolicyOutputsSchema.fields.PolicyId),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get UpdateDate(): Required<AWSManagedPolicyOutputs>["UpdateDate"] {
    const value: Required<AWSManagedPolicyOutputs>["UpdateDate"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "UpdateDate",
        Schema.requiredKey(AWSManagedPolicyOutputsSchema.fields.UpdateDate),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSManagedPolicyDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSManagedPolicyResource<Props> {
  const resource: AWSManagedPolicyResource<Props> =
    new AWSManagedPolicyResource<Props>(key, props, binding);

  return resource;
}

/**
 * The AWSManagedPolicy resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSManagedPolicy = Effect.fn("AWSManagedPolicy")(
  function* (input: { logicalId: string; props: AWSManagedPolicyProps }) {
    const graph = yield* ResourceGraphBuilder;

    const key: ResourceKey = { logicalId: input.logicalId };

    const declaration = yield* graph.resource(key);

    const props = yield* Schema.decodeEffect(AWSManagedPolicyPropsSchema)(
      input.props,
    );

    yield* declaration.registerEntity(AWSManagedPolicyResourceTypeSchema, {
      propsSchema: AWSManagedPolicyPropsSchema,
      requestSchema: AWSManagedPolicyRequestSchema,
      outputsSchema: AWSManagedPolicyOutputsSchema,
      props,
    });

    const resource: AWSManagedPolicyResource =
      createAWSManagedPolicyDeclaration(key, props, declaration.outputs);

    return resource;
  },
);
