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
  ]).annotate({ description: "The policy document." }),
  PolicyName: Schema.String.annotate({
    description: "The friendly name (not ARN) identifying the policy.",
  }),
}).annotate({
  description:
    "Contains information about an attached policy.\n An attached policy is a managed policy that has been attached to a user, group, or role.\n For more information about managed policies, see [Managed Policies and Inline Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/policies-managed-vs-inline.html) in the *User Guide*.",
  identifier: "Policy",
});

export interface AWSGroupProps {
  readonly GroupName?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "managedpolicy";
      }>
    | string
  >;
  readonly Path?: string;
  readonly Policies?: ReadonlyArray<Policy>;
}

export const AWSGroupResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "iam",
  resource: "group",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["GroupName"]],
  },
  primaryIdentifier: ["/properties/GroupName"],
});
export const AWSGroupPropsSchema = annotateResourceSchema(
  Schema.Struct({
    GroupName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          'The name of the group to create. Do not include the path in this value.\n The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the group name.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
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
            "The Amazon Resource Name (ARN) of the IAM policy you want to attach.\n For more information about ARNs, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    Path: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The path to the group. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
      }),
    ),
    Policies: Schema.optionalKey(
      Schema.Array(Policy).annotate({
        description:
          "Adds or updates an inline policy document that is embedded in the specified IAM group. To view AWS::IAM::Group snippets, see [Declaring an Group Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-group).\n  The name of each inline policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. \n  For information about limits on the number of inline policies that you can embed in a group, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
      }),
    ),
  }),
  AWSGroupResourceSchema,
);

export interface AWSGroupOutputs {
  readonly Arn?: string;
  readonly GroupName?: string;
}

export const AWSGroupOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  GroupName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The name of the group to create. Do not include the path in this value.\n The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the group name.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
});

export interface AWSGroupRequest {
  readonly GroupName?: string;
  readonly ManagedPolicyArns?: ReadonlyArray<string>;
  readonly Path?: string;
  readonly Policies?: ReadonlyArray<Policy>;
}

export const AWSGroupRequestSchema = Schema.Struct({
  GroupName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        'The name of the group to create. Do not include the path in this value.\n The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the group name.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
    }),
  ),
  ManagedPolicyArns: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "The Amazon Resource Name (ARN) of the IAM policy you want to attach.\n For more information about ARNs, see [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *General Reference*.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  Path: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The path to the group. For more information about paths, see [IAM identifiers](https://docs.aws.amazon.com/IAM/latest/UserGuide/Using_Identifiers.html) in the *IAM User Guide*.\n This parameter is optional. If it is not included, it defaults to a slash (/).\n This parameter allows (through its [regex pattern](https://docs.aws.amazon.com/http://wikipedia.org/wiki/regex)) a string of characters consisting of either a forward slash (/) by itself or a string that must begin and end with forward slashes. In addition, it can contain any ASCII character from the ! (``\\u0021``) through the DEL character (``\\u007F``), including most punctuation characters, digits, and upper and lowercased letters.",
    }),
  ),
  Policies: Schema.optionalKey(
    Schema.Array(Policy).annotate({
      description:
        "Adds or updates an inline policy document that is embedded in the specified IAM group. To view AWS::IAM::Group snippets, see [Declaring an Group Resource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-iam.html#scenario-iam-group).\n  The name of each inline policy for a role, user, or group must be unique. If you don't choose unique names, updates to the IAM identity will fail. \n  For information about limits on the number of inline policies that you can embed in a group, see [Limitations on Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/LimitationsOnEntities.html) in the *User Guide*.",
    }),
  ),
});
export const AWSGroupRelationshipIssues = [];
export const AWSGroupResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("iam"),
  resource: Schema.Literal("group"),
});

/**
 * The AWSGroupResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSGroupResource<Props = AWSGroupProps> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "iam";
  readonly resource: "group";
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
        resource: "group",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSGroupOutputs>["Arn"] {
    const value: Required<AWSGroupOutputs>["Arn"] = ResourceOutputBinding.value(
      this.binding,
      this.key,
      "Arn",
      Schema.requiredKey(AWSGroupOutputsSchema.fields.Arn),
    );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get GroupName(): Required<AWSGroupOutputs>["GroupName"] {
    const value: Required<AWSGroupOutputs>["GroupName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "GroupName",
        Schema.requiredKey(AWSGroupOutputsSchema.fields.GroupName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSGroupDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSGroupResource<Props> {
  const resource: AWSGroupResource<Props> = new AWSGroupResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/** The AWSGroup resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSGroup = Effect.fn("AWSGroup")(function* (input: {
  logicalId: string;
  props: AWSGroupProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSGroupPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSGroupResourceTypeSchema, {
    propsSchema: AWSGroupPropsSchema,
    requestSchema: AWSGroupRequestSchema,
    outputsSchema: AWSGroupOutputsSchema,
    props,
  });

  const resource: AWSGroupResource = createAWSGroupDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSGroupOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-iam-group.json",
      format: "CloudFormation",
    },
    typeName: "AWS::IAM::Group",
    resource: "group",
    primaryIdentifier: ["/properties/GroupName"],
    createOnlyProperties: ["/properties/GroupName"],
    writeOnlyProperties: [],
    outputs: {
      Arn: {
        schema: {
          description: "",
          type: "string",
        },
        schemaPath: "/properties/Arn",
        valuePath: "/Arn",
        required: false,
      },
      GroupName: {
        schema: {
          description:
            'The name of the group to create. Do not include the path in this value.\n The group name must be unique within the account. Group names are not distinguished by case. For example, you cannot create groups named both "ADMINS" and "admins". If you don\'t specify a name, CFN generates a unique physical ID and uses that ID for the group name.\n  If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.\n  If you specify a name, you must specify the ``CAPABILITY_NAMED_IAM`` value to acknowledge your template\'s capabilities. For more information, see [Acknowledging Resources in Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#using-iam-capabilities).\n  Naming an IAM resource can cause an unrecoverable error if you reuse the same template in multiple Regions. To prevent this, we recommend using ``Fn::Join`` and ``AWS::Region`` to create a Region-specific name, as in the following example: ``{"Fn::Join": ["", [{"Ref": "AWS::Region"}, {"Ref": "MyResourceName"}]]}``.',
          type: "string",
        },
        schemaPath: "/properties/GroupName",
        valuePath: "/GroupName",
        required: false,
      },
    },
  },
];
