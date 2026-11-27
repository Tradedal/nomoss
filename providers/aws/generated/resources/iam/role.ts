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

interface Policy {
  readonly PolicyDocument:
    | string
    | {
        readonly [x: string]: Schema.Json;
      };
  readonly PolicyName: string;
}

const Policy = Schema.Struct({
  PolicyDocument: Schema.Union([
    Schema.String,
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
  ]).annotate({
    description:
      "The entire contents of the policy that defines permissions. For more information, see [Overview of JSON policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json).",
  }),
  PolicyName: Schema.String.annotate({
    description: "The friendly name (not ARN) identifying the policy.",
  }),
}).annotate({
  description:
    "Contains information about an attached policy.\n An attached policy is a managed policy that has been attached to a user, group, or role.\n For more information about managed policies, refer to [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *User Guide*.",
  identifier: "Policy",
});

interface Tag {
  readonly Key: string;
  readonly Value: string;
}

const Tag = Schema.Struct({
  Key: Schema.String.annotate({
    description:
      "The key name that can be used to look up or retrieve the associated value. For example, ``Department`` or ``Cost Center`` are common choices.",
  }),
  Value: Schema.String.annotate({
    description:
      "The value associated with this tag. For example, tags with a key name of ``Department`` could have values such as ``Human Resources``, ``Accounting``, and ``Support``. Tags with a key name of ``Cost Center`` might have values that consist of the number associated with the different cost centers in your company. Typically, many resources have tags with the same key name but with different values.",
  }),
}).annotate({
  description:
    "A structure that represents user-provided metadata that can be associated with an IAM resource. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*.",
  identifier: "Tag",
});

export interface AWSRoleProps {
  readonly AssumeRolePolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Description?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "managedpolicy";
      }>
    | string
  >;
  readonly MaxSessionDuration?: number;
  readonly Path?: string;
  readonly PermissionsBoundary?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "managedpolicy";
      }>
    | string;
  readonly Policies?: ReadonlyArray<Policy>;
  readonly RoleName?: string;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSRoleResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "role",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["Path"], ["RoleName"]],
  },
  primaryIdentifier: ["/properties/RoleName"],
});

export const AWSRolePropsSchema = annotateResourceSchema(
  Schema.Struct({
    AssumeRolePolicyDocument: Schema.Union([
      Schema.Record(
        Schema.String,
        Schema.Json.annotate({ expected: "JSON value" }),
      ),
      Schema.String,
    ]).annotate({
      description:
        "The trust policy that is associated with this role. Trust policies define which entities can assume the role. You can associate only one trust policy with a role. For an example of a policy that can be used to assume a role, see [Template Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#aws-resource-iam-role--examples). For more information about the elements that you can use in an IAM policy, see [Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) in the *User Guide*.",
    }),
    Description: Schema.optionalKey(
      Schema.String.annotate({
        description: "A description of the role that you provide.",
      }),
    ),
    ManagedPolicyArns: Schema.optionalKey(
      Schema.Array(
        Schema.Union([
          Schema.Union([
            ResourceReferenceSchema(
              Schema.Struct({
                provider: Schema.Literal("aws"),
                service: Schema.Literal("iam"),
                resource: Schema.Literal("managedpolicy"),
              }),
              {
                value: null,
                outputs: [
                  {
                    source: ["PolicyArn"],
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
            "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the role.\n For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    MaxSessionDuration: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default value of one hour is applied. This setting can have a value from 1 hour to 12 hours.\n Anyone who assumes the role from the CLI or API can use the ``DurationSeconds`` API parameter or the ``duration-seconds``CLI parameter to request a longer session. The ``MaxSessionDuration`` setting determines the maximum duration that can be requested using the ``DurationSeconds`` parameter. If users don't specify a value for the ``DurationSeconds`` parameter, their security credentials are valid for one hour by default. This applies when you use the ``AssumeRole*`` API operations or the ``assume-role*``CLI operations but does not apply when you use those operations to create a console URL. For more information, see [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) in the *IAM User Guide*.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    Path: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The path to the role. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
      }),
    ),
    PermissionsBoundary: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("iam"),
              resource: Schema.Literal("managedpolicy"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PolicyArn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "The ARN of the policy used to set the permissions boundary for the role.\n For more information about permissions boundaries, see [Permissions boundaries for IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*.",
        }),
      ]),
    ),
    Policies: Schema.optionalKey(
      Schema.Array(Policy).annotate({
        description:
          "Adds or updates an inline policy document that is embedded in the specified IAM role.\n When you embed an inline policy in a role, the inline policy is used as part of the role's access (permissions) policy. The role's trust policy is created at the same time as the role. You can update a role's trust policy later. For more information about IAM roles, go to [Using Roles to Delegate Permissions and Federate Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/roles-toplevel.html).\n A role can also have an attached managed policy. For information about policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *User Guide*.\n For information about limits on the number of inline policies that you can embed with a role, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
      }),
    ),
    RoleName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'A name for the IAM role, up to 64 characters in length. For valid values, see the ``RoleName`` parameter for the [CreateRole](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html) action in the *User Guide*.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The role name must be unique within the account. Role names are not distinguished by case. For example, you cannot create roles named both "Role1" and "role1".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the role name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
      }),
    ),
    Tags: Schema.optionalKey(
      Schema.Array(Tag).annotate({
        description:
          "A list of tags that are attached to the role. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*.",
      }),
    ),
  }),
  AWSRoleResourceSchema,
);

export interface AWSRoleOutputs {
  readonly Arn?: string;
  readonly RoleId?: string;
  readonly RoleName?: string;
}

export const AWSRoleOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  RoleId: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  RoleName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A name for the IAM role, up to 64 characters in length. For valid values, see the ``RoleName`` parameter for the [CreateRole](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html) action in the *User Guide*.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The role name must be unique within the account. Role names are not distinguished by case. For example, you cannot create roles named both "Role1" and "role1".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the role name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
});

export interface AWSRoleRequest {
  readonly AssumeRolePolicyDocument:
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly Description?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<string>;
  readonly MaxSessionDuration?: number;
  readonly Path?: string;
  readonly PermissionsBoundary?: string;
  readonly Policies?: ReadonlyArray<Policy>;
  readonly RoleName?: string;
  readonly Tags?: ReadonlyArray<Tag>;
}

export const AWSRoleRequestSchema = Schema.Struct({
  AssumeRolePolicyDocument: Schema.Union([
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
    Schema.String,
  ]).annotate({
    description:
      "The trust policy that is associated with this role. Trust policies define which entities can assume the role. You can associate only one trust policy with a role. For an example of a policy that can be used to assume a role, see [Template Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-role.html#aws-resource-iam-role--examples). For more information about the elements that you can use in an IAM policy, see [Policy Elements Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html) in the *User Guide*.",
  }),
  Description: Schema.optionalKey(
    Schema.String.annotate({
      description: "A description of the role that you provide.",
    }),
  ),
  ManagedPolicyArns: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the role.\n For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  MaxSessionDuration: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The maximum session duration (in seconds) that you want to set for the specified role. If you do not specify a value for this setting, the default value of one hour is applied. This setting can have a value from 1 hour to 12 hours.\n Anyone who assumes the role from the CLI or API can use the ``DurationSeconds`` API parameter or the ``duration-seconds``CLI parameter to request a longer session. The ``MaxSessionDuration`` setting determines the maximum duration that can be requested using the ``DurationSeconds`` parameter. If users don't specify a value for the ``DurationSeconds`` parameter, their security credentials are valid for one hour by default. This applies when you use the ``AssumeRole*`` API operations or the ``assume-role*``CLI operations but does not apply when you use those operations to create a console URL. For more information, see [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) in the *IAM User Guide*.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  Path: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The path to the role. For more information about paths, see [IAM Identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
    }),
  ),
  PermissionsBoundary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the policy used to set the permissions boundary for the role.\n For more information about permissions boundaries, see [Permissions boundaries for IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*.",
    }),
  ),
  Policies: Schema.optionalKey(
    Schema.Array(Policy).annotate({
      description:
        "Adds or updates an inline policy document that is embedded in the specified IAM role.\n When you embed an inline policy in a role, the inline policy is used as part of the role's access (permissions) policy. The role's trust policy is created at the same time as the role. You can update a role's trust policy later. For more information about IAM roles, go to [Using Roles to Delegate Permissions and Federate Identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/roles-toplevel.html).\n A role can also have an attached managed policy. For information about policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *User Guide*.\n For information about limits on the number of inline policies that you can embed with a role, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.\n  If an external policy (such as ``AWS::IAM::Policy`` or ``AWS::IAM::ManagedPolicy``) has a ``Ref`` to a role and if a resource (such as ``AWS::ECS::Service``) also has a ``Ref`` to the same role, add a ``DependsOn`` attribute to the resource to make the resource depend on the external policy. This dependency ensures that the role's policy is available throughout the resource's lifecycle. For example, when you delete a stack with an ``AWS::ECS::Service`` resource, the ``DependsOn`` attribute ensures that CFN deletes the ``AWS::ECS::Service`` resource before deleting its role's policy.",
    }),
  ),
  RoleName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'A name for the IAM role, up to 64 characters in length. For valid values, see the ``RoleName`` parameter for the [CreateRole](https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreateRole.html) action in the *User Guide*.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The role name must be unique within the account. Role names are not distinguished by case. For example, you cannot create roles named both "Role1" and "role1".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the role name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
  Tags: Schema.optionalKey(
    Schema.Array(Tag).annotate({
      description:
        "A list of tags that are attached to the role. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*.",
    }),
  ),
});

/**
 * The AWSRoleRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSRoleRelationshipIssues = [];

export const AWSRoleResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("role"),
});

/**
 * The AWSRoleResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSRoleResource<Props = AWSRoleProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "role";
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
        resource: "role",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSRoleOutputs>["Arn"] {
    const value: Required<AWSRoleOutputs>["Arn"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "Arn",
      Schema.requiredKey(AWSRoleOutputsSchema.fields.Arn),
    );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RoleId(): Required<AWSRoleOutputs>["RoleId"] {
    const value: Required<AWSRoleOutputs>["RoleId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RoleId",
        Schema.requiredKey(AWSRoleOutputsSchema.fields.RoleId),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get RoleName(): Required<AWSRoleOutputs>["RoleName"] {
    const value: Required<AWSRoleOutputs>["RoleName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "RoleName",
        Schema.requiredKey(AWSRoleOutputsSchema.fields.RoleName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSRoleDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSRoleResource<Props> {
  const resource: AWSRoleResource<Props> = new AWSRoleResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSRole resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSRole = Effect.fn("AWSRole")(function* (input: {
  logicalId: string;
  props: AWSRoleProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSRolePropsSchema)(input.props);

  yield* declaration.registerEntity(AWSRoleResourceTypeSchema, {
    propsSchema: AWSRolePropsSchema,
    requestSchema: AWSRoleRequestSchema,
    outputsSchema: AWSRoleOutputsSchema,
    props,
  });

  const resource: AWSRoleResource = createAWSRoleDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
