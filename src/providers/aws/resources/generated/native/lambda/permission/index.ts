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

export interface AWSPermissionProps {
  readonly Action: string;
  readonly EventSourceToken?: string;
  readonly FunctionName:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "function";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "alias";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "version";
      }>
    | string;
  readonly FunctionUrlAuthType?: "AWS_IAM" | "NONE";
  readonly InvokedViaFunctionUrl?: boolean;
  readonly Principal:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "user";
      }>
    | string;
  readonly PrincipalOrgID?: string;
  readonly SourceAccount?: string;
  readonly SourceArn?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "events";
        readonly resource: "rule";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sqs";
        readonly resource: "queue";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sns";
        readonly resource: "topic";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iot";
        readonly resource: "topicrule";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "logs";
        readonly resource: "loggroup";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "cognito";
        readonly resource: "userpool";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "function";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "kinesisfirehose";
        readonly resource: "deliverystream";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string;
}

export const AWSPermissionResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "lambda",
  resource: "permission",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [
      ["FunctionName"],
      ["FunctionUrlAuthType"],
      ["InvokedViaFunctionUrl"],
      ["SourceAccount"],
      ["SourceArn"],
      ["Principal"],
      ["PrincipalOrgID"],
      ["Action"],
      ["EventSourceToken"],
    ],
  },
  primaryIdentifier: ["/properties/FunctionName", "/properties/Id"],
});
export const AWSPermissionPropsSchema = annotateResourceSchema(
  Schema.Struct({
    Action: Schema.String.annotate({
      description:
        "The action that the principal can use on the function. For example, ``lambda:InvokeFunction`` or ``lambda:GetFunction``.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^(lambda:[*]|lambda:[a-zA-Z]+|[*])$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^(lambda:[*]|lambda:[a-zA-Z]+|[*])$",
        }),
      ),
    EventSourceToken: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For Alexa Smart Home functions, a token that the invoker must supply.",
      })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[a-zA-Z0-9._\\-]+$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^[a-zA-Z0-9._\\-]+$",
          }),
        ),
    ),
    FunctionName: Schema.Union([
      Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("lambda"),
            resource: Schema.Literal("function"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["Arn"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("lambda"),
            resource: Schema.Literal("alias"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["Id"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("aws"),
            service: Schema.Literal("lambda"),
            resource: Schema.Literal("version"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["FunctionArn"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "The name or ARN of the Lambda function, version, or alias.\n  **Name formats**\n +  *Function name* – ``my-function`` (name-only), ``my-function:v1`` (with alias).\n  +  *Function ARN* – ``arn:aws:lambda:us-west-2:123456789012:function:my-function``.\n  +  *Partial ARN* – ``123456789012:function:my-function``.\n  \n You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
      })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(140).annotate({
            expected: "a string with at most 140 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          }),
        ),
    ]),
    FunctionUrlAuthType: Schema.optionalKey(
      Schema.Literals(["AWS_IAM", "NONE"]).annotate({
        description:
          "The type of authentication that your function URL uses. Set to ``AWS_IAM`` if you want to restrict access to authenticated users only. Set to ``NONE`` if you want to bypass IAM authentication to create a public endpoint. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
      }),
    ),
    InvokedViaFunctionUrl: Schema.optionalKey(
      Schema.Boolean.annotate({
        description:
          "Indicates whether the permission applies when the function is invoked through a function URL.",
      }),
    ),
    Principal: Schema.Union([
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
                source: ["Arn"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
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
                source: ["Arn"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "The AWS-service, AWS-account, IAM user, or IAM role that invokes the function. If you specify a service, use ``SourceArn`` or ``SourceAccount`` to limit who can invoke the function through that service.",
      })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(256).annotate({
            expected: "a string with at most 256 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
            expected: "a string matching the RegExp ^.*$",
          }),
        ),
    ]),
    PrincipalOrgID: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The identifier for your organization in AOlong. Use this to grant permissions to all the AWS-accounts under this organization.",
      })
        .check(
          Schema.isMinCodePoints(12).annotate({
            expected: "a string with at least 12 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(34).annotate({
            expected: "a string with at most 34 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^o-[a-z0-9]{10,32}$", "u"),
          ).annotate({
            expected: "a string matching the RegExp ^o-[a-z0-9]{10,32}$",
          }),
        ),
    ),
    SourceAccount: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "For AWS-service, the ID of the AWS-account that owns the resource. Use this together with ``SourceArn`` to ensure that the specified account owns the resource. It is possible for an Amazon S3 bucket to be deleted by its owner and recreated by another account.",
      })
        .check(
          Schema.isMinCodePoints(12).annotate({
            expected: "a string with at least 12 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(12).annotate({
            expected: "a string with at most 12 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^\\d{12}$", "u")).annotate({
            expected: "a string matching the RegExp ^\\d{12}$",
          }),
        ),
    ),
    SourceArn: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("events"),
              resource: Schema.Literal("rule"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("s3"),
              resource: Schema.Literal("bucket"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("sqs"),
              resource: Schema.Literal("queue"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("sns"),
              resource: Schema.Literal("topic"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["TopicArn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("iot"),
              resource: Schema.Literal("topicrule"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("logs"),
              resource: Schema.Literal("loggroup"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("cognito"),
              resource: Schema.Literal("userpool"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("lambda"),
              resource: Schema.Literal("function"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("kinesisfirehose"),
              resource: Schema.Literal("deliverystream"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
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
                  source: ["Arn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "For AWS-services, the ARN of the AWS resource that invokes the function. For example, an Amazon S3 bucket or Amazon SNS topic.\n Note that Lambda configures the comparison using the ``StringLike`` operator.",
        })
          .check(
            Schema.isMinCodePoints(12).annotate({
              expected: "a string with at least 12 code points",
            }),
          )
          .check(
            Schema.isMaxCodePoints(1024).annotate({
              expected: "a string with at most 1024 code points",
            }),
          )
          .check(
            Schema.isPattern(
              new globalThis.RegExp(
                "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
                "u",
              ),
            ).annotate({
              expected:
                "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
            }),
          ),
      ]),
    ),
  }),
  AWSPermissionResourceSchema,
);

export interface AWSPermissionOutputs {
  readonly Id?: string;
  readonly FunctionName: string;
}

export const AWSPermissionOutputsSchema = Schema.Struct({
  Id: Schema.optionalKey(
    Schema.String.annotate({ description: "" })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
          expected: "a string matching the RegExp ^.*$",
        }),
      ),
  ),
  FunctionName: Schema.String.annotate({
    description:
      "The name or ARN of the Lambda function, version, or alias.\n  **Name formats**\n +  *Function name* – ``my-function`` (name-only), ``my-function:v1`` (with alias).\n  +  *Function ARN* – ``arn:aws:lambda:us-west-2:123456789012:function:my-function``.\n  +  *Partial ARN* – ``123456789012:function:my-function``.\n  \n You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(140).annotate({
        expected: "a string with at most 140 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
      }),
    ),
});

export interface AWSPermissionRequest {
  readonly Action: string;
  readonly EventSourceToken?: string;
  readonly FunctionName: string;
  readonly FunctionUrlAuthType?: "AWS_IAM" | "NONE";
  readonly InvokedViaFunctionUrl?: boolean;
  readonly Principal: string;
  readonly PrincipalOrgID?: string;
  readonly SourceAccount?: string;
  readonly SourceArn?: string;
}

export const AWSPermissionRequestSchema = Schema.Struct({
  Action: Schema.String.annotate({
    description:
      "The action that the principal can use on the function. For example, ``lambda:InvokeFunction`` or ``lambda:GetFunction``.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp("^(lambda:[*]|lambda:[a-zA-Z]+|[*])$", "u"),
      ).annotate({
        expected:
          "a string matching the RegExp ^(lambda:[*]|lambda:[a-zA-Z]+|[*])$",
      }),
    ),
  EventSourceToken: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For Alexa Smart Home functions, a token that the invoker must supply.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[a-zA-Z0-9._\\-]+$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^[a-zA-Z0-9._\\-]+$",
        }),
      ),
  ),
  FunctionName: Schema.String.annotate({
    description:
      "The name or ARN of the Lambda function, version, or alias.\n  **Name formats**\n +  *Function name* – ``my-function`` (name-only), ``my-function:v1`` (with alias).\n  +  *Function ARN* – ``arn:aws:lambda:us-west-2:123456789012:function:my-function``.\n  +  *Partial ARN* – ``123456789012:function:my-function``.\n  \n You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(140).annotate({
        expected: "a string with at most 140 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
      }),
    ),
  FunctionUrlAuthType: Schema.optionalKey(
    Schema.Literals(["AWS_IAM", "NONE"]).annotate({
      description:
        "The type of authentication that your function URL uses. Set to ``AWS_IAM`` if you want to restrict access to authenticated users only. Set to ``NONE`` if you want to bypass IAM authentication to create a public endpoint. For more information, see [Control access to Lambda function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html).",
    }),
  ),
  InvokedViaFunctionUrl: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Indicates whether the permission applies when the function is invoked through a function URL.",
    }),
  ),
  Principal: Schema.String.annotate({
    description:
      "The AWS-service, AWS-account, IAM user, or IAM role that invokes the function. If you specify a service, use ``SourceArn`` or ``SourceAccount`` to limit who can invoke the function through that service.",
  })
    .check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    )
    .check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    )
    .check(
      Schema.isPattern(new globalThis.RegExp("^.*$", "u")).annotate({
        expected: "a string matching the RegExp ^.*$",
      }),
    ),
  PrincipalOrgID: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier for your organization in AOlong. Use this to grant permissions to all the AWS-accounts under this organization.",
    })
      .check(
        Schema.isMinCodePoints(12).annotate({
          expected: "a string with at least 12 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(34).annotate({
          expected: "a string with at most 34 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^o-[a-z0-9]{10,32}$", "u"),
        ).annotate({
          expected: "a string matching the RegExp ^o-[a-z0-9]{10,32}$",
        }),
      ),
  ),
  SourceAccount: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For AWS-service, the ID of the AWS-account that owns the resource. Use this together with ``SourceArn`` to ensure that the specified account owns the resource. It is possible for an Amazon S3 bucket to be deleted by its owner and recreated by another account.",
    })
      .check(
        Schema.isMinCodePoints(12).annotate({
          expected: "a string with at least 12 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(12).annotate({
          expected: "a string with at most 12 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^\\d{12}$", "u")).annotate({
          expected: "a string matching the RegExp ^\\d{12}$",
        }),
      ),
  ),
  SourceArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For AWS-services, the ARN of the AWS resource that invokes the function. For example, an Amazon S3 bucket or Amazon SNS topic.\n Note that Lambda configures the comparison using the ``StringLike`` operator.",
    })
      .check(
        Schema.isMinCodePoints(12).annotate({
          expected: "a string with at least 12 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)$",
        }),
      ),
  ),
});
export const AWSPermissionRelationshipIssues = [];
export const AWSPermissionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("lambda"),
  resource: Schema.Literal("permission"),
});

/**
 * The AWSPermissionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSPermissionResource<
  Props = AWSPermissionProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "lambda";
  readonly resource: "permission";
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
        service: "lambda",
        resource: "permission",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Id(): Required<AWSPermissionOutputs>["Id"] {
    const value: Required<AWSPermissionOutputs>["Id"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Id",
        Schema.requiredKey(AWSPermissionOutputsSchema.fields.Id),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get FunctionName(): Required<AWSPermissionOutputs>["FunctionName"] {
    const value: Required<AWSPermissionOutputs>["FunctionName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "FunctionName",
        AWSPermissionOutputsSchema.fields.FunctionName,
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSPermissionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSPermissionResource<Props> {
  const resource: AWSPermissionResource<Props> =
    new AWSPermissionResource<Props>(key, props, binding);

  return resource;
}

/** The AWSPermission resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSPermission = Effect.fn("AWSPermission")(function* (input: {
  logicalId: string;
  props: AWSPermissionProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSPermissionPropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSPermissionResourceTypeSchema, {
    propsSchema: AWSPermissionPropsSchema,
    requestSchema: AWSPermissionRequestSchema,
    outputsSchema: AWSPermissionOutputsSchema,
    props,
  });

  const resource: AWSPermissionResource = createAWSPermissionDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSPermissionOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-lambda-permission.json",
      format: "CloudFormation",
    },
    typeName: "AWS::Lambda::Permission",
    resource: "permission",
    primaryIdentifier: ["/properties/FunctionName", "/properties/Id"],
    createOnlyProperties: [
      "/properties/FunctionName",
      "/properties/FunctionUrlAuthType",
      "/properties/InvokedViaFunctionUrl",
      "/properties/SourceAccount",
      "/properties/SourceArn",
      "/properties/Principal",
      "/properties/PrincipalOrgID",
      "/properties/Action",
      "/properties/EventSourceToken",
    ],
    writeOnlyProperties: [],
    outputs: {
      Id: {
        schema: {
          description: "",
          type: "string",
          pattern: "^.*$",
          minLength: 1,
          maxLength: 256,
        },
        schemaPath: "/properties/Id",
        valuePath: "/Id",
        required: false,
      },
      FunctionName: {
        schema: {
          description:
            "The name or ARN of the Lambda function, version, or alias.\n  **Name formats**\n +  *Function name* \u2013 ``my-function`` (name-only), ``my-function:v1`` (with alias).\n  +  *Function ARN* \u2013 ``arn:aws:lambda:us-west-2:123456789012:function:my-function``.\n  +  *Partial ARN* \u2013 ``123456789012:function:my-function``.\n  \n You can append a version number or alias to any of the formats. The length constraint applies only to the full ARN. If you specify only the function name, it is limited to 64 characters in length.",
          type: "string",
          pattern:
            "^(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
          minLength: 1,
          maxLength: 140,
        },
        schemaPath: "/properties/FunctionName",
        valuePath: "/FunctionName",
        required: true,
      },
    },
  },
];
