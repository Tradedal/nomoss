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
    | {
        readonly [x: string]: Schema.Json;
      }
    | string;
  readonly PolicyName: string;
}

const Policy = Schema.Struct({
  PolicyDocument: Schema.Union([
    Schema.Record(
      Schema.String,
      Schema.Json.annotate({ expected: "JSON value" }),
    ),
    Schema.String,
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

interface LoginProfile {
  readonly PasswordResetRequired?: boolean;
  readonly Password: string;
}

const LoginProfile = Schema.Struct({
  PasswordResetRequired: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Specifies whether the user is required to set a new password on next sign-in.",
    }),
  ),
  Password: Schema.String.annotate({ description: "The user's password." }),
}).annotate({
  description:
    "Creates a password for the specified user, giving the user the ability to access AWS services through the console. For more information about managing passwords, see [Managing Passwords](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_ManagingLogins.html) in the *User Guide*.",
  identifier: "LoginProfile",
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

export interface AWSUserProps {
  readonly Path?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "managedpolicy";
      }>
    | string
  >;
  readonly Policies?: ReadonlyArray<Policy>;
  readonly UserName?: string;
  readonly Groups?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "group";
      }>
    | string
  >;
  readonly LoginProfile?: LoginProfile;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly PermissionsBoundary?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "managedpolicy";
      }>
    | string;
}

export const AWSUserResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "user",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["UserName"]],
  },
  primaryIdentifier: ["/properties/UserName"],
});

export const AWSUserPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Path: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
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
            "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user.\n For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    Policies: Schema.optionalKey(
      Schema.Array(Policy).annotate({
        description:
          "Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user).\n  The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. \n  For information about limits on the number of inline policies that you can embed in a user, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
      }),
    ),
    UserName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'The name of the user to create. Do not include the path in this value.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the user name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
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
      ).annotate({
        description: "A list of group names to which you want to add the user.",
      }),
    ),
    LoginProfile: Schema.optionalKey(LoginProfile),
    Tags: Schema.optionalKey(
      Schema.Array(Tag).annotate({
        description:
          "A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*.\n  If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.",
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
            "The ARN of the managed policy that is used to set the permissions boundary for the user.\n A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an entity, but does not grant permissions. Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity. To learn more, see [Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*.\n For more information about policy types, see [Policy types](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types) in the *IAM User Guide*.",
        }),
      ]),
    ),
  }),
  AWSUserResourceSchema,
);

export interface AWSUserOutputs {
  readonly Arn?: string;
  readonly UserName?: string;
}

export const AWSUserOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  UserName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The name of the user to create. Do not include the path in this value.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the user name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
});

export interface AWSUserRequest {
  readonly Path?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<string>;
  readonly Policies?: ReadonlyArray<Policy>;
  readonly UserName?: string;
  readonly Groups?: ReadonlyArray<string>;
  readonly LoginProfile?: LoginProfile;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly PermissionsBoundary?: string;
}

export const AWSUserRequestSchema = Schema.Struct({
  Path: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The path for the user name. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
    }),
  ),
  ManagedPolicyArns: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "A list of Amazon Resource Names (ARNs) of the IAM managed policies that you want to attach to the user.\n For more information about ARNs, see [Amazon Resource Names (ARNs) and Service Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Policies: Schema.optionalKey(
    Schema.Array(Policy).annotate({
      description:
        "Adds or updates an inline policy document that is embedded in the specified IAM user. To view AWS::IAM::User snippets, see [Declaring an User Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-user).\n  The name of each policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. \n  For information about limits on the number of inline policies that you can embed in a user, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
    }),
  ),
  UserName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The name of the user to create. Do not include the path in this value.\n This parameter allows (per its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of upper and lowercase alphanumeric characters with no spaces. You can also include any of the following characters: _+=,.@-. The user name must be unique within the account. User names are not distinguished by case. For example, you cannot create users named both "John" and "john".\n If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the user name.\n If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
  Groups: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description: "A list of group names to which you want to add the user.",
    }),
  ),
  LoginProfile: Schema.optionalKey(LoginProfile),
  Tags: Schema.optionalKey(
    Schema.Array(Tag).annotate({
      description:
        "A list of tags that you want to attach to the new user. Each tag consists of a key name and an associated value. For more information about tagging, see [Tagging IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html) in the *IAM User Guide*.\n  If any one of the tags is invalid or if you exceed the allowed maximum number of tags, then the entire request fails and the resource is not created.",
    }),
  ),
  PermissionsBoundary: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the managed policy that is used to set the permissions boundary for the user.\n A permissions boundary policy defines the maximum permissions that identity-based policies can grant to an entity, but does not grant permissions. Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity. To learn more, see [Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) in the *IAM User Guide*.\n For more information about policy types, see [Policy types](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policy-types) in the *IAM User Guide*.",
    }),
  ),
});

/**
 * The AWSUserRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSUserRelationshipIssues = [];

export const AWSUserResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("user"),
});

/**
 * The AWSUserResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSUserResource<Props = AWSUserProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "user";
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
        resource: "user",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSUserOutputs>["Arn"] {
    const value: Required<AWSUserOutputs>["Arn"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "Arn",
      Schema.requiredKey(AWSUserOutputsSchema.fields.Arn),
    );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get UserName(): Required<AWSUserOutputs>["UserName"] {
    const value: Required<AWSUserOutputs>["UserName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "UserName",
        Schema.requiredKey(AWSUserOutputsSchema.fields.UserName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSUserDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSUserResource<Props> {
  const resource: AWSUserResource<Props> = new AWSUserResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSUser resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSUser = Effect.fn("AWSUser")(function* (input: {
  logicalId: string;
  props: AWSUserProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSUserPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSUserResourceTypeSchema, {
    propsSchema: AWSUserPropsSchema,
    requestSchema: AWSUserRequestSchema,
    outputsSchema: AWSUserOutputsSchema,
    props,
  });

  const resource: AWSUserResource = createAWSUserDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
