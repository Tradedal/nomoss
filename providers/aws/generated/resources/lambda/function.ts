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

interface FunctionScalingConfig {
  readonly MinExecutionEnvironments?: number;
  readonly MaxExecutionEnvironments?: number;
}

const FunctionScalingConfig = Schema.Struct({
  MinExecutionEnvironments: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The minimum number of execution environments to maintain for the function.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(15000).annotate({
          expected: "a value less than or equal to 15000",
        }),
      ),
  ),
  MaxExecutionEnvironments: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The maximum number of execution environments that can be provisioned for the function.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(15000).annotate({
          expected: "a value less than or equal to 15000",
        }),
      ),
  ),
}).annotate({
  description:
    "Configuration that defines the scaling behavior for a Lambda Managed Instances function, including the minimum and maximum number of execution environments that can be provisioned.",
  identifier: "FunctionScalingConfig",
});

interface TracingConfig {
  readonly Mode?: "Active" | "PassThrough";
}

const TracingConfig = Schema.Struct({
  Mode: Schema.optionalKey(
    Schema.Literals(["Active", "PassThrough"]).annotate({
      description: "The tracing mode.",
    }),
  ),
}).annotate({
  description:
    "The function's [](https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html) tracing configuration. To sample and record incoming requests, set ``Mode`` to ``Active``.",
  identifier: "TracingConfig",
});

interface VpcConfig {
  readonly Ipv6AllowedForDualStack?: boolean;
  readonly SecurityGroupIds?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "ec2";
        readonly resource: "securitygroup";
      }>
    | string
  >;
  readonly SubnetIds?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "ec2";
        readonly resource: "subnet";
      }>
    | string
  >;
}

const VpcConfig = Schema.Struct({
  Ipv6AllowedForDualStack: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.",
    }),
  ),
  SecurityGroupIds: Schema.optionalKey(
    Schema.Array(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("ec2"),
              resource: Schema.Literal("securitygroup"),
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
        ]),
        Schema.String,
      ]),
    )
      .annotate({ description: "A list of VPC security group IDs." })
      .check(
        Schema.isMaxLength(5).annotate({
          expected: "a value with a length of at most 5",
        }),
      ),
  ),
  SubnetIds: Schema.optionalKey(
    Schema.Array(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("ec2"),
              resource: Schema.Literal("subnet"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["SubnetId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String,
      ]),
    )
      .annotate({ description: "A list of VPC subnet IDs." })
      .check(
        Schema.isMaxLength(16).annotate({
          expected: "a value with a length of at most 16",
        }),
      ),
  ),
}).annotate({
  description:
    "The VPC security groups and subnets that are attached to a Lambda function. When you connect a function to a VPC, Lambda creates an elastic network interface for each combination of security group and subnet in the function's VPC configuration. The function can only access resources and the internet through that VPC. For more information, see [VPC Settings](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html).\n  When you delete a function, CFN monitors the state of its network interfaces and waits for Lambda to delete them before proceeding. If the VPC is defined in the same stack, the network interfaces need to be deleted by Lambda before CFN can delete the VPC's resources.\n To monitor network interfaces, CFN needs the ``ec2:DescribeNetworkInterfaces`` permission. It obtains this from the user or role that modifies the stack. If you don't provide this permission, CFN does not wait for network interfaces to be deleted.",
  identifier: "VpcConfig",
});

interface RuntimeManagementConfig {
  readonly UpdateRuntimeOn: "Auto" | "FunctionUpdate" | "Manual";
  readonly RuntimeVersionArn?: string;
}

const RuntimeManagementConfig = Schema.Struct({
  UpdateRuntimeOn: Schema.Literals([
    "Auto",
    "FunctionUpdate",
    "Manual",
  ]).annotate({
    description:
      "Specify the runtime update mode.\n  +  *Auto (default)* - Automatically update to the most recent and secure runtime version using a [Two-phase runtime version rollout](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-two-phase). This is the best choice for most customers to ensure they always benefit from runtime updates.\n  +  *FunctionUpdate* - LAM updates the runtime of you function to the most recent and secure runtime version when you update your function. This approach synchronizes runtime updates with function deployments, giving you control over when runtime updates are applied and allowing you to detect and mitigate rare runtime update incompatibilities early. When using this setting, you need to regularly update your functions to keep their runtime up-to-date.\n  +  *Manual* - You specify a runtime version in your function configuration. The function will use this runtime version indefinitely. In the rare case where a new runtime version is incompatible with an existing function, this allows you to roll back your function to an earlier runtime version. For more information, see [Roll back a runtime version](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html#runtime-management-rollback).\n  \n *Valid Values*: ``Auto`` | ``FunctionUpdate`` | ``Manual``",
  }),
  RuntimeVersionArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the runtime version you want the function to use.\n  This is only required if you're using the *Manual* runtime update mode.",
    }),
  ),
}).annotate({
  description:
    "Sets the runtime management configuration for a function's version. For more information, see [Runtime updates](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-update.html).",
  identifier: "RuntimeManagementConfig",
});

interface DurableConfig {
  readonly KMSKeyArn?: string;
  readonly ExecutionTimeout: number;
  readonly RetentionPeriodInDays?: number;
}

const DurableConfig = Schema.Struct({
  KMSKeyArn: Schema.optionalKey(
    Schema.String.annotate({ description: "" }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
      }),
    ),
  ),
  ExecutionTimeout: Schema.Number.annotate({
    description:
      "The maximum time (in seconds) that a durable execution can run before timing out. This timeout applies to the entire durable execution, not individual function invocations.",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(1).annotate({
        expected: "a value greater than or equal to 1",
      }),
    )
    .check(
      Schema.isLessThanOrEqualTo(31622400).annotate({
        expected: "a value less than or equal to 31622400",
      }),
    ),
  RetentionPeriodInDays: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of days to retain execution history after a durable execution completes. After this period, execution history is no longer available through the GetDurableExecutionHistory API.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(90).annotate({
          expected: "a value less than or equal to 90",
        }),
      ),
  ),
}).annotate({
  description:
    "Configuration settings for [durable functions](https://docs.aws.amazon.com/lambda/latest/dg/durable-functions.html), including execution timeout and retention period for execution history.",
  identifier: "DurableConfig",
});

interface SnapStart {
  readonly ApplyOn: "PublishedVersions" | "None";
}

const SnapStart = Schema.Struct({
  ApplyOn: Schema.Literals(["PublishedVersions", "None"]).annotate({
    description:
      "Set ``ApplyOn`` to ``PublishedVersions`` to create a snapshot of the initialized execution environment when you publish a function version.",
  }),
}).annotate({
  description:
    "The function's [SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) setting.",
  identifier: "SnapStart",
});

interface FileSystemConfig {
  readonly Arn:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "efs";
        readonly resource: "accesspoint";
      }>
    | string;
  readonly LocalMountPath: string;
}

const FileSystemConfig = Schema.Struct({
  Arn: Schema.Union([
    Schema.Union([
      ResourceReferenceSchema(
        Schema.Struct({
          provider: Schema.Literal("aws"),
          service: Schema.Literal("efs"),
          resource: Schema.Literal("accesspoint"),
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
        "The Amazon Resource Name (ARN) of the Amazon EFS or Amazon S3 Files access point that provides access to the file system.",
    })
      .check(
        Schema.isMaxCodePoints(200).annotate({
          expected: "a string with at most 200 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
        }),
      ),
  ]),
  LocalMountPath: Schema.String.annotate({
    description:
      "The path where the function can access the file system, starting with ``/mnt/``.",
  })
    .check(
      Schema.isMaxCodePoints(160).annotate({
        expected: "a string with at most 160 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp("^\\/mnt\\/[a-zA-Z0-9-_.]+$", "u"),
      ).annotate({
        expected: "a string matching the RegExp ^\\/mnt\\/[a-zA-Z0-9-_.]+$",
      }),
    ),
}).annotate({
  description:
    "Details about the connection between a Lambda function and an [Amazon EFS file system](https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html) or an [Amazon S3 Files file system](https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html).",
  identifier: "FileSystemConfig",
});

interface TenancyConfig {
  readonly TenantIsolationMode: "PER_TENANT";
}

const TenancyConfig = Schema.Struct({
  TenantIsolationMode: Schema.Literal("PER_TENANT").annotate({
    description:
      "Tenant isolation mode allows for invocation to be sent to a corresponding execution environment dedicated to a specific tenant ID.",
  }),
}).annotate({
  description:
    "Specifies the tenant isolation mode configuration for a Lambda function. This allows you to configure specific tenant isolation strategies for your function invocations. Tenant isolation configuration cannot be modified after function creation.",
  identifier: "TenancyConfig",
});

interface Tag {
  readonly Value?: string;
  readonly Key: string;
}

const Tag = Schema.Struct({
  Value: Schema.optionalKey(
    Schema.String.annotate({ description: "The value for this tag." })
      .check(
        Schema.isMinCodePoints(0).annotate({
          expected: "a string with at least 0 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
  ),
  Key: Schema.String.annotate({ description: "The key for this tag." })
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
}).annotate({
  description:
    "A [tag](https://docs.aws.amazon.com/lambda/latest/dg/tagging.html) to apply to the function.",
  identifier: "Tag",
});

interface ImageConfig {
  readonly WorkingDirectory?: string;
  readonly Command?: ReadonlyArray<string>;
  readonly EntryPoint?: ReadonlyArray<string>;
}

const ImageConfig = Schema.Struct({
  WorkingDirectory: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "Specifies the working directory. The length of the directory string cannot exceed 1,000 characters.",
    }),
  ),
  Command: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "Specifies parameters that you want to pass in with ENTRYPOINT. You can specify a maximum of 1,500 parameters in the list.",
      })
      .check(
        Schema.isMaxLength(1500).annotate({
          expected: "a value with a length of at most 1500",
        }),
      )
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  EntryPoint: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({
        description:
          "Specifies the entry point to their application, which is typically the location of the runtime executable. You can specify a maximum of 1,500 string entries in the list.",
      })
      .check(
        Schema.isMaxLength(1500).annotate({
          expected: "a value with a length of at most 1500",
        }),
      )
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
}).annotate({
  description:
    "Configuration values that override the container image Dockerfile settings. For more information, see [Container image settings](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-parms).",
  identifier: "ImageConfig",
});

interface DeadLetterConfig {
  readonly TargetArn?:
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
    | string;
}

const DeadLetterConfig = Schema.Struct({
  TargetArn: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
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
      ]),
      Schema.String.annotate({
        description:
          "The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic.",
      }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
        }),
      ),
    ]),
  ),
}).annotate({
  description:
    "The [dead-letter queue](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-dlq) for failed asynchronous invocations.",
  identifier: "DeadLetterConfig",
});

interface LambdaManagedInstancesCapacityProviderConfig {
  readonly ExecutionEnvironmentMemoryGiBPerVCpu?: number;
  readonly CapacityProviderArn: string;
  readonly PerExecutionEnvironmentMaxConcurrency?: number;
}

const LambdaManagedInstancesCapacityProviderConfig = Schema.Struct({
  ExecutionEnvironmentMemoryGiBPerVCpu: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The amount of memory in GiB allocated per vCPU for execution environments.",
    })
      .check(Schema.isFinite().annotate({ expected: "a finite number" }))
      .check(
        Schema.isGreaterThanOrEqualTo(2).annotate({
          expected: "a value greater than or equal to 2",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(8).annotate({
          expected: "a value less than or equal to 8",
        }),
      ),
  ),
  CapacityProviderArn: Schema.String.annotate({
    description: "The Amazon Resource Name (ARN) of the capacity provider.",
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
          "^arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+$",
      }),
    ),
  PerExecutionEnvironmentMaxConcurrency: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The maximum number of concurrent executions that can run on each execution environment.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      )
      .check(
        Schema.isLessThanOrEqualTo(1600).annotate({
          expected: "a value less than or equal to 1600",
        }),
      ),
  ),
}).annotate({
  description:
    "Configuration for Lambda-managed instances used by the capacity provider.",
  identifier: "LambdaManagedInstancesCapacityProviderConfig",
});

interface Code {
  readonly SourceKMSKeyArn?: string;
  readonly S3ObjectVersion?: string;
  readonly S3Bucket?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "s3";
        readonly resource: "bucket";
      }>
    | string;
  readonly ZipFile?: string;
  readonly S3Key?: string;
  readonly S3ObjectStorageMode?: "COPY" | "REFERENCE";
  readonly ImageUri?: string;
}

const Code = Schema.Struct({
  SourceKMSKeyArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt your function's .zip deployment package. If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk).",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
      }),
    ),
  ),
  S3ObjectVersion: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For versioned objects, the version of the deployment package object to use.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      ),
  ),
  S3Bucket: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
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
                source: ["BucketName"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "An Amazon S3 bucket in the same AWS-Region as your function. The bucket can be in a different AWS-account.",
      })
        .check(
          Schema.isMinCodePoints(3).annotate({
            expected: "a string with at least 3 code points",
          }),
        )
        .check(
          Schema.isMaxCodePoints(63).annotate({
            expected: "a string with at most 63 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$", "u"),
          ).annotate({
            expected:
              "a string matching the RegExp ^[0-9A-Za-z\\.\\-_]*(?<!\\.)$",
          }),
        ),
    ]),
  ),
  ZipFile: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "(Node.js and Python) The source code of your Lambda function. If you include your function source inline with this parameter, CFN places it in a file named ``index`` and zips it to create a [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html). This zip file cannot exceed 4MB. For the ``Handler`` property, the first part of the handler identifier must be ``index``. For example, ``index.handler``.\n  When you specify source code inline for a Node.js function, the ``index`` file that CFN creates uses the extension ``.js``. This means that Node.js treats the file as a CommonJS module.\n When using Node.js 24 or later, Node.js can automatically detect if a ``.js`` file should be treated as CommonJS or as an ES module. To enable auto-detection, add the ``--experimental-detect-module`` flag to the ``NODE_OPTIONS`` environment variable. For more information, see [Experimental Node.js features](https://docs.aws.amazon.com//lambda/latest/dg/lambda-nodejs.html#nodejs-experimental-features).\n   For JSON, you must escape quotes and special characters such as newline (``\\n``) with a backslash.\n If you specify a function that interacts with an AWS CloudFormation custom resource, you don't have to write your own functions to send responses to the custom resource that invoked the function. AWS CloudFormation provides a response module ([cfn-response](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html)) that simplifies sending responses. See [Using Lambda with CloudFormation](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudformation.html) for details.",
    }),
  ),
  S3Key: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Amazon S3 key of the deployment package.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      ),
  ),
  S3ObjectStorageMode: Schema.optionalKey(
    Schema.Literals(["COPY", "REFERENCE"]).annotate({ description: "" }),
  ),
  ImageUri: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "URI of a [container image](https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html) in the Amazon ECR registry.",
    }),
  ),
}).annotate({
  description:
    "The [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html) for a Lambda function. To deploy a function defined as a container image, you specify the location of a container image in the Amazon ECR registry. For a .zip file deployment package, you can specify the location of an object in Amazon S3. For Node.js and Python functions, you can specify the function code inline in the template.\n  When you specify source code inline for a Node.js function, the ``index`` file that CFN creates uses the extension ``.js``. This means that Node.js treats the file as a CommonJS module.\n  Changes to a deployment package in Amazon S3 or a container image in ECR are not detected automatically during stack updates. To update the function code, change the object key or version in the template.",
  identifier: "Code",
});

interface LoggingConfig {
  readonly LogFormat?: "Text" | "JSON";
  readonly ApplicationLogLevel?:
    | "TRACE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR"
    | "FATAL";
  readonly LogGroup?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "logs";
        readonly resource: "loggroup";
      }>
    | string;
  readonly SystemLogLevel?: "DEBUG" | "INFO" | "WARN";
}

const LoggingConfig = Schema.Struct({
  LogFormat: Schema.optionalKey(
    Schema.Literals(["Text", "JSON"]).annotate({
      description:
        "The format in which Lambda sends your function's application and system logs to CloudWatch. Select between plain text and structured JSON.",
    }),
  ),
  ApplicationLogLevel: Schema.optionalKey(
    Schema.Literals([
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "FATAL",
    ]).annotate({
      description:
        "Set this property to filter the application logs for your function that Lambda sends to CloudWatch. Lambda only sends application logs at the selected level of detail and lower, where ``TRACE`` is the highest level and ``FATAL`` is the lowest.",
    }),
  ),
  LogGroup: Schema.optionalKey(
    Schema.Union([
      Schema.Union([
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
                source: ["LogGroupName"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.annotate({
        description:
          "The name of the Amazon CloudWatch log group the function sends logs to. By default, Lambda functions send logs to a default log group named ``/aws/lambda/<function name>``. To use a different log group, enter an existing log group or enter a new log group name.",
      })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxCodePoints(512).annotate({
            expected: "a string with at most 512 code points",
          }),
        )
        .check(
          Schema.isPattern(
            new globalThis.RegExp("[\\.\\-_/#A-Za-z0-9]+", "u"),
          ).annotate({
            expected: "a string matching the RegExp [\\.\\-_/#A-Za-z0-9]+",
          }),
        ),
    ]),
  ),
  SystemLogLevel: Schema.optionalKey(
    Schema.Literals(["DEBUG", "INFO", "WARN"]).annotate({
      description:
        "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where ``DEBUG`` is the highest level and ``WARN`` is the lowest.",
    }),
  ),
}).annotate({
  description: "The function's Amazon CloudWatch Logs configuration settings.",
  identifier: "LoggingConfig",
});

type RecursiveLoop = "Allow" | "Terminate";

const RecursiveLoop = Schema.Literals(["Allow", "Terminate"]).annotate({
  description: "The function recursion configuration.",
  identifier: "RecursiveLoop",
});

interface Environment {
  readonly Variables?: {
    readonly [x: string]: string;
  };
}

const Environment = Schema.Struct({
  Variables: Schema.optionalKey(
    Schema.Record(
      Schema.String.check(
        Schema.isPattern(
          new globalThis.RegExp("[a-zA-Z][a-zA-Z0-9_]+", "u"),
        ).annotate({
          expected: "a string matching the RegExp [a-zA-Z][a-zA-Z0-9_]+",
        }),
      ),
      Schema.String,
    ).annotate({
      description:
        "Environment variable key-value pairs. For more information, see [Using Lambda environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html).\n If the value of the environment variable is a time or a duration, enclose the value in quotes.",
    }),
  ),
}).annotate({
  description:
    "A function's environment variable settings. You can use environment variables to adjust your function's behavior without updating code. An environment variable is a pair of strings that are stored in a function's version-specific configuration.",
  identifier: "Environment",
});

interface EphemeralStorage {
  readonly Size: number;
}

const EphemeralStorage = Schema.Struct({
  Size: Schema.Number.annotate({
    description: "The size of the function's ``/tmp`` directory.",
  })
    .check(Schema.isInt().annotate({ expected: "an integer" }))
    .check(
      Schema.isGreaterThanOrEqualTo(512).annotate({
        expected: "a value greater than or equal to 512",
      }),
    )
    .check(
      Schema.isLessThanOrEqualTo(10240).annotate({
        expected: "a value less than or equal to 10240",
      }),
    ),
}).annotate({
  description:
    "The size of the function's ``/tmp`` directory in MB. The default value is 512, but it can be any whole number between 512 and 10,240 MB.",
  identifier: "EphemeralStorage",
});

interface SnapStartResponse {
  readonly OptimizationStatus?: "On" | "Off";
  readonly ApplyOn?: "PublishedVersions" | "None";
}

const SnapStartResponse = Schema.Struct({
  OptimizationStatus: Schema.optionalKey(
    Schema.Literals(["On", "Off"]).annotate({
      description:
        "When you provide a [qualified Amazon Resource Name (ARN)](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html#versioning-versions-using), this response element indicates whether SnapStart is activated for the specified function version.",
    }),
  ),
  ApplyOn: Schema.optionalKey(
    Schema.Literals(["PublishedVersions", "None"]).annotate({
      description:
        "When set to ``PublishedVersions``, Lambda creates a snapshot of the execution environment when you publish a function version.",
    }),
  ),
}).annotate({
  description:
    "The function's [SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) setting.",
  identifier: "SnapStartResponse",
});

interface VpcConfig_1 {
  readonly Ipv6AllowedForDualStack?: boolean;
  readonly SecurityGroupIds?: ReadonlyArray<string>;
  readonly SubnetIds?: ReadonlyArray<string>;
}

const VpcConfig_1 = Schema.Struct({
  Ipv6AllowedForDualStack: Schema.optionalKey(
    Schema.Boolean.annotate({
      description:
        "Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.",
    }),
  ),
  SecurityGroupIds: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({ description: "A list of VPC security group IDs." })
      .check(
        Schema.isMaxLength(5).annotate({
          expected: "a value with a length of at most 5",
        }),
      ),
  ),
  SubnetIds: Schema.optionalKey(
    Schema.Array(Schema.String)
      .annotate({ description: "A list of VPC subnet IDs." })
      .check(
        Schema.isMaxLength(16).annotate({
          expected: "a value with a length of at most 16",
        }),
      ),
  ),
}).annotate({
  description:
    "The VPC security groups and subnets that are attached to a Lambda function. When you connect a function to a VPC, Lambda creates an elastic network interface for each combination of security group and subnet in the function's VPC configuration. The function can only access resources and the internet through that VPC. For more information, see [VPC Settings](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html).\n  When you delete a function, CFN monitors the state of its network interfaces and waits for Lambda to delete them before proceeding. If the VPC is defined in the same stack, the network interfaces need to be deleted by Lambda before CFN can delete the VPC's resources.\n To monitor network interfaces, CFN needs the ``ec2:DescribeNetworkInterfaces`` permission. It obtains this from the user or role that modifies the stack. If you don't provide this permission, CFN does not wait for network interfaces to be deleted.",
  identifier: "VpcConfig_1",
});

interface FileSystemConfig_1 {
  readonly Arn: string;
  readonly LocalMountPath: string;
}

const FileSystemConfig_1 = Schema.Struct({
  Arn: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the Amazon EFS or Amazon S3 Files access point that provides access to the file system.",
  })
    .check(
      Schema.isMaxCodePoints(200).annotate({
        expected: "a string with at most 200 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^arn:aws[a-zA-Z-]*:elasticfilesystem:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:access-point\\/fsap-[a-f0-9]{17}$|^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system\\/fs-[0-9a-f]{17,40}\\/access-point\\/fsap-[0-9a-f]{17,40}$",
      }),
    ),
  LocalMountPath: Schema.String.annotate({
    description:
      "The path where the function can access the file system, starting with ``/mnt/``.",
  })
    .check(
      Schema.isMaxCodePoints(160).annotate({
        expected: "a string with at most 160 code points",
      }),
    )
    .check(
      Schema.isPattern(
        new globalThis.RegExp("^\\/mnt\\/[a-zA-Z0-9-_.]+$", "u"),
      ).annotate({
        expected: "a string matching the RegExp ^\\/mnt\\/[a-zA-Z0-9-_.]+$",
      }),
    ),
}).annotate({
  description:
    "Details about the connection between a Lambda function and an [Amazon EFS file system](https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html) or an [Amazon S3 Files file system](https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html).",
  identifier: "FileSystemConfig_1",
});

interface DeadLetterConfig_1 {
  readonly TargetArn?: string;
}

const DeadLetterConfig_1 = Schema.Struct({
  TargetArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic.",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
      }),
    ),
  ),
}).annotate({
  description:
    "The [dead-letter queue](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html#invocation-dlq) for failed asynchronous invocations.",
  identifier: "DeadLetterConfig_1",
});

interface Code_1 {
  readonly SourceKMSKeyArn?: string;
  readonly S3ObjectVersion?: string;
  readonly S3Bucket?: string;
  readonly ZipFile?: string;
  readonly S3Key?: string;
  readonly S3ObjectStorageMode?: "COPY" | "REFERENCE";
  readonly ImageUri?: string;
}

const Code_1 = Schema.Struct({
  SourceKMSKeyArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt your function's .zip deployment package. If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk).",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
      }),
    ),
  ),
  S3ObjectVersion: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "For versioned objects, the version of the deployment package object to use.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      ),
  ),
  S3Bucket: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "An Amazon S3 bucket in the same AWS-Region as your function. The bucket can be in a different AWS-account.",
    })
      .check(
        Schema.isMinCodePoints(3).annotate({
          expected: "a string with at least 3 code points",
        }),
      )
      .check(
        Schema.isMaxCodePoints(63).annotate({
          expected: "a string with at most 63 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("^[0-9A-Za-z\\.\\-_]*(?<!\\.)$", "u"),
        ).annotate({
          expected:
            "a string matching the RegExp ^[0-9A-Za-z\\.\\-_]*(?<!\\.)$",
        }),
      ),
  ),
  ZipFile: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "(Node.js and Python) The source code of your Lambda function. If you include your function source inline with this parameter, CFN places it in a file named ``index`` and zips it to create a [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html). This zip file cannot exceed 4MB. For the ``Handler`` property, the first part of the handler identifier must be ``index``. For example, ``index.handler``.\n  When you specify source code inline for a Node.js function, the ``index`` file that CFN creates uses the extension ``.js``. This means that Node.js treats the file as a CommonJS module.\n When using Node.js 24 or later, Node.js can automatically detect if a ``.js`` file should be treated as CommonJS or as an ES module. To enable auto-detection, add the ``--experimental-detect-module`` flag to the ``NODE_OPTIONS`` environment variable. For more information, see [Experimental Node.js features](https://docs.aws.amazon.com//lambda/latest/dg/lambda-nodejs.html#nodejs-experimental-features).\n   For JSON, you must escape quotes and special characters such as newline (``\\n``) with a backslash.\n If you specify a function that interacts with an AWS CloudFormation custom resource, you don't have to write your own functions to send responses to the custom resource that invoked the function. AWS CloudFormation provides a response module ([cfn-response](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-lambda-function-code-cfnresponsemodule.html)) that simplifies sending responses. See [Using Lambda with CloudFormation](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudformation.html) for details.",
    }),
  ),
  S3Key: Schema.optionalKey(
    Schema.String.annotate({
      description: "The Amazon S3 key of the deployment package.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(1024).annotate({
          expected: "a string with at most 1024 code points",
        }),
      ),
  ),
  S3ObjectStorageMode: Schema.optionalKey(
    Schema.Literals(["COPY", "REFERENCE"]).annotate({ description: "" }),
  ),
  ImageUri: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "URI of a [container image](https://docs.aws.amazon.com/lambda/latest/dg/lambda-images.html) in the Amazon ECR registry.",
    }),
  ),
}).annotate({
  description:
    "The [deployment package](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html) for a Lambda function. To deploy a function defined as a container image, you specify the location of a container image in the Amazon ECR registry. For a .zip file deployment package, you can specify the location of an object in Amazon S3. For Node.js and Python functions, you can specify the function code inline in the template.\n  When you specify source code inline for a Node.js function, the ``index`` file that CFN creates uses the extension ``.js``. This means that Node.js treats the file as a CommonJS module.\n  Changes to a deployment package in Amazon S3 or a container image in ECR are not detected automatically during stack updates. To update the function code, change the object key or version in the template.",
  identifier: "Code_1",
});

interface LoggingConfig_1 {
  readonly LogFormat?: "Text" | "JSON";
  readonly ApplicationLogLevel?:
    | "TRACE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR"
    | "FATAL";
  readonly LogGroup?: string;
  readonly SystemLogLevel?: "DEBUG" | "INFO" | "WARN";
}

const LoggingConfig_1 = Schema.Struct({
  LogFormat: Schema.optionalKey(
    Schema.Literals(["Text", "JSON"]).annotate({
      description:
        "The format in which Lambda sends your function's application and system logs to CloudWatch. Select between plain text and structured JSON.",
    }),
  ),
  ApplicationLogLevel: Schema.optionalKey(
    Schema.Literals([
      "TRACE",
      "DEBUG",
      "INFO",
      "WARN",
      "ERROR",
      "FATAL",
    ]).annotate({
      description:
        "Set this property to filter the application logs for your function that Lambda sends to CloudWatch. Lambda only sends application logs at the selected level of detail and lower, where ``TRACE`` is the highest level and ``FATAL`` is the lowest.",
    }),
  ),
  LogGroup: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the Amazon CloudWatch log group the function sends logs to. By default, Lambda functions send logs to a default log group named ``/aws/lambda/<function name>``. To use a different log group, enter an existing log group or enter a new log group name.",
    })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxCodePoints(512).annotate({
          expected: "a string with at most 512 code points",
        }),
      )
      .check(
        Schema.isPattern(
          new globalThis.RegExp("[\\.\\-_/#A-Za-z0-9]+", "u"),
        ).annotate({
          expected: "a string matching the RegExp [\\.\\-_/#A-Za-z0-9]+",
        }),
      ),
  ),
  SystemLogLevel: Schema.optionalKey(
    Schema.Literals(["DEBUG", "INFO", "WARN"]).annotate({
      description:
        "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where ``DEBUG`` is the highest level and ``WARN`` is the lowest.",
    }),
  ),
}).annotate({
  description: "The function's Amazon CloudWatch Logs configuration settings.",
  identifier: "LoggingConfig_1",
});

interface CapacityProviderConfig {
  readonly LambdaManagedInstancesCapacityProviderConfig: LambdaManagedInstancesCapacityProviderConfig;
}

const CapacityProviderConfig = Schema.Struct({
  LambdaManagedInstancesCapacityProviderConfig:
    LambdaManagedInstancesCapacityProviderConfig,
}).annotate({
  description:
    "Configuration for the capacity provider that manages compute resources for Lambda functions.",
  identifier: "CapacityProviderConfig",
});

export interface AWSFunctionProps {
  readonly FunctionScalingConfig?: FunctionScalingConfig;
  readonly Description?: string;
  readonly TracingConfig?: TracingConfig;
  readonly VpcConfig?: VpcConfig;
  readonly RuntimeManagementConfig?: RuntimeManagementConfig;
  readonly DurableConfig?: DurableConfig;
  readonly ReservedConcurrentExecutions?: number;
  readonly SnapStart?: SnapStart;
  readonly FileSystemConfigs?: ReadonlyArray<FileSystemConfig>;
  readonly FunctionName?: string;
  readonly Runtime?: string;
  readonly KmsKeyArn?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "kms";
        readonly resource: "key";
      }>
    | string;
  readonly PublishToLatestPublished?: boolean;
  readonly PackageType?: "Image" | "Zip";
  readonly CodeSigningConfigArn?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "codesigningconfig";
      }>
    | string;
  readonly Layers?: ReadonlyArray<
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "lambda";
        readonly resource: "layerversion";
      }>
    | string
  >;
  readonly TenancyConfig?: TenancyConfig;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly ImageConfig?: ImageConfig;
  readonly MemorySize?: number;
  readonly DeadLetterConfig?: DeadLetterConfig;
  readonly Timeout?: number;
  readonly CapacityProviderConfig?: CapacityProviderConfig;
  readonly Handler?: string;
  readonly Code: Code;
  readonly Role:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string;
  readonly LoggingConfig?: LoggingConfig;
  readonly RecursiveLoop?: RecursiveLoop;
  readonly Environment?: Environment;
  readonly EphemeralStorage?: EphemeralStorage;
  readonly Architectures?: ReadonlyArray<"x86_64" | "arm64">;
}

export const AWSFunctionResourceSchema = ResourceSchemaAnnotationSchema.make({
  provider: "aws",
  service: "lambda",
  resource: "function",
  operation: "create",
  stateSecretOutputKeys: [],
  replacement: {
    order: "createBeforeDestroy",
    properties: [["FunctionName"], ["PackageType"], ["TenancyConfig"]],
  },
  primaryIdentifier: ["/properties/FunctionName"],
});

export const AWSFunctionPropsSchema = annotateResourceSchema(
  Schema.Struct({
    FunctionScalingConfig: Schema.optionalKey(FunctionScalingConfig),
    Description: Schema.optionalKey(
      Schema.String.annotate({
        description: "A description of the function.",
      }).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ),
    TracingConfig: Schema.optionalKey(TracingConfig),
    VpcConfig: Schema.optionalKey(VpcConfig),
    RuntimeManagementConfig: Schema.optionalKey(RuntimeManagementConfig),
    DurableConfig: Schema.optionalKey(DurableConfig),
    ReservedConcurrentExecutions: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The number of simultaneous executions to reserve for the function.",
      })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(0).annotate({
            expected: "a value greater than or equal to 0",
          }),
        ),
    ),
    SnapStart: Schema.optionalKey(SnapStart),
    FileSystemConfigs: Schema.optionalKey(
      Schema.Array(FileSystemConfig)
        .annotate({
          description:
            "Connection settings for an Amazon EFS or Amazon S3 Files file system. To connect a function to a file system, a mount target must be available in every Availability Zone that your function connects to. If your template contains an [AWS::EFS::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-mounttarget.html) or [AWS::S3Files::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3files-mounttarget.html) resource, you must also specify a ``DependsOn`` attribute to ensure that the mount target is created or updated before the function.\n For more information about using the ``DependsOn`` attribute, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html).",
        })
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        ),
    ),
    FunctionName: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The name of the Lambda function, up to 64 characters in length. If you don't specify a name, CFN generates one.\n If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
      }).check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ),
    ),
    Runtime: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The identifier of the function's [runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). Runtime is required if the deployment package is a .zip file archive. Specifying a runtime results in an error if you're deploying a function using a container image.\n The following list includes deprecated runtimes. Lambda blocks creating new functions and updating existing functions shortly after each runtime is deprecated. For more information, see [Runtime use after deprecation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtime-deprecation-levels).\n For a list of all currently supported runtimes, see [Supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtimes-supported).",
      }),
    ),
    KmsKeyArn: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("kms"),
              resource: Schema.Literal("key"),
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
            "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt the following resources:\n  +  The function's [environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-encryption).\n  +  The function's [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-security.html) snapshots.\n  +  When used with ``SourceKMSKeyArn``, the unzipped version of the .zip deployment package that's used for function invocations. For more information, see [Specifying a customer managed key for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/encrypt-zip-package.html#enable-zip-custom-encryption).\n  +  The optimized version of the container image that's used for function invocations. Note that this is not the same key that's used to protect your container image in the Amazon Elastic Container Registry (Amazon ECR). For more information, see [Function lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-lifecycle).\n  \n If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk) or an [](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk).",
        }).check(
          Schema.isPattern(
            new globalThis.RegExp(
              "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          }),
        ),
      ]),
    ),
    PublishToLatestPublished: Schema.optionalKey(
      Schema.Boolean.annotate({ description: "" }),
    ),
    PackageType: Schema.optionalKey(
      Schema.Literals(["Image", "Zip"]).annotate({
        description:
          "The type of deployment package. Set to ``Image`` for container image and set ``Zip`` for .zip file archive.",
      }),
    ),
    CodeSigningConfigArn: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("lambda"),
              resource: Schema.Literal("codesigningconfig"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["CodeSigningConfigArn"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.annotate({
          description:
            "To enable code signing for this function, specify the ARN of a code-signing configuration. A code-signing configuration includes a set of signing profiles, which define the trusted publishers for this function.",
        }).check(
          Schema.isPattern(
            new globalThis.RegExp(
              "arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
              "u",
            ),
          ).annotate({
            expected:
              "a string matching the RegExp arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
          }),
        ),
      ]),
    ),
    Layers: Schema.optionalKey(
      Schema.Array(
        Schema.Union([
          Schema.Union([
            ResourceReferenceSchema(
              Schema.Struct({
                provider: Schema.Literal("aws"),
                service: Schema.Literal("lambda"),
                resource: Schema.Literal("layerversion"),
              }),
              {
                value: null,
                outputs: [
                  {
                    source: ["LayerVersionArn"],
                    target: [],
                  },
                ],
              },
            ).annotate({ expected: "ResourceEntity" }),
          ]),
          Schema.String,
        ]),
      ).annotate({
        description:
          "A list of [function layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) to add to the function's execution environment. Specify each layer by its ARN, including the version.",
      }),
    ),
    TenancyConfig: Schema.optionalKey(TenancyConfig),
    Tags: Schema.optionalKey(
      Schema.Array(Tag)
        .annotate({
          description:
            "A list of [tags](https://docs.aws.amazon.com/lambda/latest/dg/tagging.html) to apply to the function.\n  You must have the ``lambda:TagResource``, ``lambda:UntagResource``, and ``lambda:ListTags`` permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
        })
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
    ImageConfig: Schema.optionalKey(ImageConfig),
    MemorySize: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The amount of [memory available to the function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console) at runtime. Increasing the function memory also increases its CPU allocation. The default value is 128 MB. The value can be any multiple of 1 MB. Note that new AWS accounts have reduced concurrency and memory quotas. AWS raises these quotas automatically based on your usage. You can also request a quota increase.",
      }).check(Schema.isInt().annotate({ expected: "an integer" })),
    ),
    DeadLetterConfig: Schema.optionalKey(DeadLetterConfig),
    Timeout: Schema.optionalKey(
      Schema.Number.annotate({
        description:
          "The amount of time (in seconds) that Lambda allows a function to run before stopping it. The default is 3 seconds. The maximum allowed value is 900 seconds. For more information, see [Lambda execution environment](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html).",
      })
        .check(Schema.isInt().annotate({ expected: "an integer" }))
        .check(
          Schema.isGreaterThanOrEqualTo(1).annotate({
            expected: "a value greater than or equal to 1",
          }),
        ),
    ),
    CapacityProviderConfig: Schema.optionalKey(CapacityProviderConfig),
    Handler: Schema.optionalKey(
      Schema.String.annotate({
        description:
          "The name of the method within your code that Lambda calls to run your function. Handler is required if the deployment package is a .zip file archive. The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information, see [Lambda programming model](https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html).",
      })
        .check(
          Schema.isMaxCodePoints(128).annotate({
            expected: "a string with at most 128 code points",
          }),
        )
        .check(
          Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
            expected: "a string matching the RegExp ^[^\\s]+$",
          }),
        ),
    ),
    Code: Code,
    Role: Schema.Union([
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
      ]),
      Schema.String.annotate({
        description:
          "The Amazon Resource Name (ARN) of the function's execution role.",
      }).check(
        Schema.isPattern(
          new globalThis.RegExp(
            "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
            "u",
          ),
        ).annotate({
          expected:
            "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
        }),
      ),
    ]),
    LoggingConfig: Schema.optionalKey(LoggingConfig),
    RecursiveLoop: Schema.optionalKey(RecursiveLoop),
    Environment: Schema.optionalKey(Environment),
    EphemeralStorage: Schema.optionalKey(EphemeralStorage),
    Architectures: Schema.optionalKey(
      Schema.Array(Schema.Literals(["x86_64", "arm64"]))
        .annotate({
          description:
            "The instruction set architecture that the function supports. Enter a string array with one of the valid values (arm64 or x86_64). The default value is ``x86_64``.",
        })
        .check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        )
        .check(
          Schema.isMaxLength(1).annotate({
            expected: "a value with a length of at most 1",
          }),
        )
        .check(
          Schema.isUnique().annotate({
            expected: "an array with unique items",
          }),
        ),
    ),
  }),
  AWSFunctionResourceSchema,
);

export interface AWSFunctionOutputs {
  readonly SnapStartResponse?: SnapStartResponse;
  readonly Arn?: string;
  readonly FunctionName?: string;
}

export const AWSFunctionOutputsSchema = Schema.Struct({
  SnapStartResponse: Schema.optionalKey(SnapStartResponse),
  Arn: Schema.optionalKey(Schema.String.annotate({ description: "" })),
  FunctionName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the Lambda function, up to 64 characters in length. If you don't specify a name, CFN generates one.\n If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
    }).check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ),
  ),
});

export interface AWSFunctionRequest {
  readonly FunctionScalingConfig?: FunctionScalingConfig;
  readonly Description?: string;
  readonly TracingConfig?: TracingConfig;
  readonly VpcConfig?: VpcConfig_1;
  readonly RuntimeManagementConfig?: RuntimeManagementConfig;
  readonly DurableConfig?: DurableConfig;
  readonly ReservedConcurrentExecutions?: number;
  readonly SnapStart?: SnapStart;
  readonly FileSystemConfigs?: ReadonlyArray<FileSystemConfig_1>;
  readonly FunctionName?: string;
  readonly Runtime?: string;
  readonly KmsKeyArn?: string;
  readonly PublishToLatestPublished?: boolean;
  readonly PackageType?: "Image" | "Zip";
  readonly CodeSigningConfigArn?: string;
  readonly Layers?: ReadonlyArray<string>;
  readonly TenancyConfig?: TenancyConfig;
  readonly Tags?: ReadonlyArray<Tag>;
  readonly ImageConfig?: ImageConfig;
  readonly MemorySize?: number;
  readonly DeadLetterConfig?: DeadLetterConfig_1;
  readonly Timeout?: number;
  readonly CapacityProviderConfig?: CapacityProviderConfig;
  readonly Handler?: string;
  readonly Code: Code_1;
  readonly Role: string;
  readonly LoggingConfig?: LoggingConfig_1;
  readonly RecursiveLoop?: RecursiveLoop;
  readonly Environment?: Environment;
  readonly EphemeralStorage?: EphemeralStorage;
  readonly Architectures?: ReadonlyArray<"x86_64" | "arm64">;
}

export const AWSFunctionRequestSchema = Schema.Struct({
  FunctionScalingConfig: Schema.optionalKey(FunctionScalingConfig),
  Description: Schema.optionalKey(
    Schema.String.annotate({
      description: "A description of the function.",
    }).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  ),
  TracingConfig: Schema.optionalKey(TracingConfig),
  VpcConfig: Schema.optionalKey(VpcConfig_1),
  RuntimeManagementConfig: Schema.optionalKey(RuntimeManagementConfig),
  DurableConfig: Schema.optionalKey(DurableConfig),
  ReservedConcurrentExecutions: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The number of simultaneous executions to reserve for the function.",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(0).annotate({
          expected: "a value greater than or equal to 0",
        }),
      ),
  ),
  SnapStart: Schema.optionalKey(SnapStart),
  FileSystemConfigs: Schema.optionalKey(
    Schema.Array(FileSystemConfig_1)
      .annotate({
        description:
          "Connection settings for an Amazon EFS or Amazon S3 Files file system. To connect a function to a file system, a mount target must be available in every Availability Zone that your function connects to. If your template contains an [AWS::EFS::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-efs-mounttarget.html) or [AWS::S3Files::MountTarget](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-s3files-mounttarget.html) resource, you must also specify a ``DependsOn`` attribute to ensure that the mount target is created or updated before the function.\n For more information about using the ``DependsOn`` attribute, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html).",
      })
      .check(
        Schema.isMaxLength(1).annotate({
          expected: "a value with a length of at most 1",
        }),
      ),
  ),
  FunctionName: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the Lambda function, up to 64 characters in length. If you don't specify a name, CFN generates one.\n If you specify a name, you cannot perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
    }).check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ),
  ),
  Runtime: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The identifier of the function's [runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html). Runtime is required if the deployment package is a .zip file archive. Specifying a runtime results in an error if you're deploying a function using a container image.\n The following list includes deprecated runtimes. Lambda blocks creating new functions and updating existing functions shortly after each runtime is deprecated. For more information, see [Runtime use after deprecation](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtime-deprecation-levels).\n For a list of all currently supported runtimes, see [Supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html#runtimes-supported).",
    }),
  ),
  KmsKeyArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The ARN of the KMSlong (KMS) customer managed key that's used to encrypt the following resources:\n  +  The function's [environment variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-encryption).\n  +  The function's [Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-security.html) snapshots.\n  +  When used with ``SourceKMSKeyArn``, the unzipped version of the .zip deployment package that's used for function invocations. For more information, see [Specifying a customer managed key for Lambda](https://docs.aws.amazon.com/lambda/latest/dg/encrypt-zip-package.html#enable-zip-custom-encryption).\n  +  The optimized version of the container image that's used for function invocations. Note that this is not the same key that's used to protect your container image in the Amazon Elastic Container Registry (Amazon ECR). For more information, see [Function lifecycle](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html#images-lifecycle).\n  \n If you don't provide a customer managed key, Lambda uses an [owned key](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-owned-cmk) or an [](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#aws-managed-cmk).",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp ^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$",
      }),
    ),
  ),
  PublishToLatestPublished: Schema.optionalKey(
    Schema.Boolean.annotate({ description: "" }),
  ),
  PackageType: Schema.optionalKey(
    Schema.Literals(["Image", "Zip"]).annotate({
      description:
        "The type of deployment package. Set to ``Image`` for container image and set ``Zip`` for .zip file archive.",
    }),
  ),
  CodeSigningConfigArn: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "To enable code signing for this function, specify the ARN of a code-signing configuration. A code-signing configuration includes a set of signing profiles, which define the trusted publishers for this function.",
    }).check(
      Schema.isPattern(
        new globalThis.RegExp(
          "arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
          "u",
        ),
      ).annotate({
        expected:
          "a string matching the RegExp arn:(aws[a-zA-Z-]*)?:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:code-signing-config:csc-[a-z0-9]{17}",
      }),
    ),
  ),
  Layers: Schema.optionalKey(
    Schema.Array(Schema.String).annotate({
      description:
        "A list of [function layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) to add to the function's execution environment. Specify each layer by its ARN, including the version.",
    }),
  ),
  TenancyConfig: Schema.optionalKey(TenancyConfig),
  Tags: Schema.optionalKey(
    Schema.Array(Tag)
      .annotate({
        description:
          "A list of [tags](https://docs.aws.amazon.com/lambda/latest/dg/tagging.html) to apply to the function.\n  You must have the ``lambda:TagResource``, ``lambda:UntagResource``, and ``lambda:ListTags`` permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
      })
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
  ImageConfig: Schema.optionalKey(ImageConfig),
  MemorySize: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The amount of [memory available to the function](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console) at runtime. Increasing the function memory also increases its CPU allocation. The default value is 128 MB. The value can be any multiple of 1 MB. Note that new AWS accounts have reduced concurrency and memory quotas. AWS raises these quotas automatically based on your usage. You can also request a quota increase.",
    }).check(Schema.isInt().annotate({ expected: "an integer" })),
  ),
  DeadLetterConfig: Schema.optionalKey(DeadLetterConfig_1),
  Timeout: Schema.optionalKey(
    Schema.Number.annotate({
      description:
        "The amount of time (in seconds) that Lambda allows a function to run before stopping it. The default is 3 seconds. The maximum allowed value is 900 seconds. For more information, see [Lambda execution environment](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-context.html).",
    })
      .check(Schema.isInt().annotate({ expected: "an integer" }))
      .check(
        Schema.isGreaterThanOrEqualTo(1).annotate({
          expected: "a value greater than or equal to 1",
        }),
      ),
  ),
  CapacityProviderConfig: Schema.optionalKey(CapacityProviderConfig),
  Handler: Schema.optionalKey(
    Schema.String.annotate({
      description:
        "The name of the method within your code that Lambda calls to run your function. Handler is required if the deployment package is a .zip file archive. The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information, see [Lambda programming model](https://docs.aws.amazon.com/lambda/latest/dg/foundation-progmodel.html).",
    })
      .check(
        Schema.isMaxCodePoints(128).annotate({
          expected: "a string with at most 128 code points",
        }),
      )
      .check(
        Schema.isPattern(new globalThis.RegExp("^[^\\s]+$", "u")).annotate({
          expected: "a string matching the RegExp ^[^\\s]+$",
        }),
      ),
  ),
  Code: Code_1,
  Role: Schema.String.annotate({
    description:
      "The Amazon Resource Name (ARN) of the function's execution role.",
  }).check(
    Schema.isPattern(
      new globalThis.RegExp(
        "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
        "u",
      ),
    ).annotate({
      expected:
        "a string matching the RegExp ^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    }),
  ),
  LoggingConfig: Schema.optionalKey(LoggingConfig_1),
  RecursiveLoop: Schema.optionalKey(RecursiveLoop),
  Environment: Schema.optionalKey(Environment),
  EphemeralStorage: Schema.optionalKey(EphemeralStorage),
  Architectures: Schema.optionalKey(
    Schema.Array(Schema.Literals(["x86_64", "arm64"]))
      .annotate({
        description:
          "The instruction set architecture that the function supports. Enter a string array with one of the valid values (arm64 or x86_64). The default value is ``x86_64``.",
      })
      .check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      )
      .check(
        Schema.isMaxLength(1).annotate({
          expected: "a value with a length of at most 1",
        }),
      )
      .check(
        Schema.isUnique().annotate({ expected: "an array with unique items" }),
      ),
  ),
});

/**
 * The AWSFunctionRelationshipIssues array lists inputs that can use several outputs
 * from one source type. Each input retains its provider value until a reviewed
 * mapping chooses an output.
 */
export const AWSFunctionRelationshipIssues = [];

export const AWSFunctionResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("lambda"),
  resource: Schema.Literal("function"),
});

/**
 * The AWSFunctionResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSFunctionResource<
  Props = AWSFunctionProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "lambda";
  readonly resource: "function";
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
        resource: "function",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get SnapStartResponse(): Required<AWSFunctionOutputs>["SnapStartResponse"] {
    const value: Required<AWSFunctionOutputs>["SnapStartResponse"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "SnapStartResponse",
        Schema.requiredKey(AWSFunctionOutputsSchema.fields.SnapStartResponse),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSFunctionOutputs>["Arn"] {
    const value: Required<AWSFunctionOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSFunctionOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get FunctionName(): Required<AWSFunctionOutputs>["FunctionName"] {
    const value: Required<AWSFunctionOutputs>["FunctionName"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "FunctionName",
        Schema.requiredKey(AWSFunctionOutputsSchema.fields.FunctionName),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSFunctionDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSFunctionResource<Props> {
  const resource: AWSFunctionResource<Props> = new AWSFunctionResource<Props>(
    key,
    props,
    binding,
  );

  return resource;
}

/**
 * The AWSFunction resource factory registers a validated declaration in the
 * stack graph. Its outputs become available after apply saves the resource.
 */
export const AWSFunction = Effect.fn("AWSFunction")(function* (input: {
  logicalId: string;
  props: AWSFunctionProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSFunctionPropsSchema)(input.props);

  yield* declaration.registerEntity(AWSFunctionResourceTypeSchema, {
    propsSchema: AWSFunctionPropsSchema,
    requestSchema: AWSFunctionRequestSchema,
    outputsSchema: AWSFunctionOutputsSchema,
    props,
  });

  const resource: AWSFunctionResource = createAWSFunctionDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
