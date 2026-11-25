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

interface CloudWatchLogsLogGroup {
  readonly LogGroupArn?:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "logs";
        readonly resource: "loggroup";
      }>
    | string;
}

const CloudWatchLogsLogGroup = Schema.Struct({
  LogGroupArn: Schema.optionalKey(
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
                source: ["Arn"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ]),
  ),
}).annotate({ identifier: "CloudWatchLogsLogGroup" });

interface TracingConfiguration {
  readonly Enabled?: boolean;
}

const TracingConfiguration = Schema.Struct({
  Enabled: Schema.optionalKey(Schema.Boolean),
}).annotate({ identifier: "TracingConfiguration" });

interface EncryptionConfiguration {
  readonly KmsKeyId?: string;
  readonly KmsDataKeyReusePeriodSeconds?: number;
  readonly Type: "CUSTOMER_MANAGED_KMS_KEY" | "AWS_OWNED_KEY";
}

const EncryptionConfiguration = Schema.Struct({
  KmsKeyId: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  ),
  KmsDataKeyReusePeriodSeconds: Schema.optionalKey(
    Schema.Int.check(
      Schema.isGreaterThanOrEqualTo(60).annotate({
        expected: "a value greater than or equal to 60",
      }),
    ).check(
      Schema.isLessThanOrEqualTo(900).annotate({
        expected: "a value less than or equal to 900",
      }),
    ),
  ),
  Type: Schema.Literals(["CUSTOMER_MANAGED_KMS_KEY", "AWS_OWNED_KEY"]),
}).annotate({ identifier: "EncryptionConfiguration" });

interface S3Location {
  readonly Bucket: string;
  readonly Key: string;
  readonly Version?: string;
}

const S3Location = Schema.Struct({
  Bucket: Schema.String,
  Key: Schema.String,
  Version: Schema.optionalKey(Schema.String),
}).annotate({ identifier: "S3Location" });

interface DefinitionSubstitutions {
  readonly [x: string]: string | number | boolean;
}

const DefinitionSubstitutions = Schema.Record(
  Schema.String.check(
    Schema.isPattern(new globalThis.RegExp(".*", "u")).annotate({
      expected: "a string matching the RegExp .*",
    }),
  ),
  Schema.Union([Schema.String, Schema.Int, Schema.Boolean]),
).check(
  Schema.isMinProperties(1).annotate({
    expected: "a value with at least 1 entry",
    identifier: "DefinitionSubstitutions",
  }),
);

interface Definition {
  readonly [x: string]: Schema.Json;
}

const Definition = Schema.Record(
  Schema.String,
  Schema.Json.annotate({ expected: "JSON value" }),
).check(
  Schema.isMinProperties(1).annotate({
    expected: "a value with at least 1 entry",
    identifier: "Definition",
  }),
);

interface TagsEntry {
  readonly Key: string;
  readonly Value: string;
}

const TagsEntry = Schema.Struct({
  Key: Schema.String.check(
    Schema.isMinLength(1).annotate({
      expected: "a value with a length of at least 1",
    }),
  ).check(
    Schema.isMaxCodePoints(128).annotate({
      expected: "a string with at most 128 code points",
    }),
  ),
  Value: Schema.String.check(
    Schema.isMinLength(1).annotate({
      expected: "a value with a length of at least 1",
    }),
  ).check(
    Schema.isMaxCodePoints(256).annotate({
      expected: "a string with at most 256 code points",
    }),
  ),
}).annotate({ identifier: "TagsEntry" });

interface CloudWatchLogsLogGroup_1 {
  readonly LogGroupArn?: string;
}

const CloudWatchLogsLogGroup_1 = Schema.Struct({
  LogGroupArn: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  ),
}).annotate({ identifier: "CloudWatchLogsLogGroup_1" });

interface LogDestination {
  readonly CloudWatchLogsLogGroup?: CloudWatchLogsLogGroup;
}

const LogDestination = Schema.Struct({
  CloudWatchLogsLogGroup: Schema.optionalKey(CloudWatchLogsLogGroup),
}).annotate({ identifier: "LogDestination" });

interface LogDestination_1 {
  readonly CloudWatchLogsLogGroup?: CloudWatchLogsLogGroup_1;
}

const LogDestination_1 = Schema.Struct({
  CloudWatchLogsLogGroup: Schema.optionalKey(CloudWatchLogsLogGroup_1),
}).annotate({ identifier: "LogDestination_1" });

interface LoggingConfiguration {
  readonly Level?: "ALL" | "ERROR" | "FATAL" | "OFF";
  readonly IncludeExecutionData?: boolean;
  readonly Destinations?: ReadonlyArray<LogDestination>;
}

const LoggingConfiguration = Schema.Struct({
  Level: Schema.optionalKey(Schema.Literals(["ALL", "ERROR", "FATAL", "OFF"])),
  IncludeExecutionData: Schema.optionalKey(Schema.Boolean),
  Destinations: Schema.optionalKey(
    Schema.Array(LogDestination).check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ),
  ),
}).annotate({ identifier: "LoggingConfiguration" });

interface LoggingConfiguration_1 {
  readonly Level?: "ALL" | "ERROR" | "FATAL" | "OFF";
  readonly IncludeExecutionData?: boolean;
  readonly Destinations?: ReadonlyArray<LogDestination_1>;
}

const LoggingConfiguration_1 = Schema.Struct({
  Level: Schema.optionalKey(Schema.Literals(["ALL", "ERROR", "FATAL", "OFF"])),
  IncludeExecutionData: Schema.optionalKey(Schema.Boolean),
  Destinations: Schema.optionalKey(
    Schema.Array(LogDestination_1).check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ),
  ),
}).annotate({ identifier: "LoggingConfiguration_1" });

export interface AWSStateMachineProps {
  readonly DefinitionString?:
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
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "ecs";
        readonly resource: "taskdefinition";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sns";
        readonly resource: "topic";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "sqs";
        readonly resource: "queue";
      }>
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "apigateway";
        readonly resource: "restapi";
      }>
    | string;
  readonly RoleArn:
    | ResourceEntity<{
        readonly provider: "aws";
        readonly service: "iam";
        readonly resource: "role";
      }>
    | string;
  readonly StateMachineName?: string;
  readonly StateMachineType?: "STANDARD" | "EXPRESS";
  readonly LoggingConfiguration?: LoggingConfiguration;
  readonly TracingConfiguration?: TracingConfiguration;
  readonly EncryptionConfiguration?: EncryptionConfiguration;
  readonly DefinitionS3Location?: S3Location;
  readonly DefinitionSubstitutions?: DefinitionSubstitutions;
  readonly Definition?: Definition;
  readonly Tags?: ReadonlyArray<TagsEntry>;
}

export const AWSStateMachineResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "stepfunctions",
    resource: "statemachine",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "createBeforeDestroy",
      properties: [["StateMachineName"], ["StateMachineType"]],
    },
    primaryIdentifier: ["/properties/Arn"],
  });
export const AWSStateMachinePropsSchema = annotateResourceSchema(
  Schema.Struct({
    DefinitionString: Schema.optionalKey(
      Schema.Union([
        Schema.Union([
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
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("ecs"),
              resource: Schema.Literal("taskdefinition"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["TaskDefinitionArn"],
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
              service: Schema.Literal("sqs"),
              resource: Schema.Literal("queue"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["QueueUrl"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("aws"),
              service: Schema.Literal("apigateway"),
              resource: Schema.Literal("restapi"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["ApiEndpoint"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        Schema.String.check(
          Schema.isMinLength(1).annotate({
            expected: "a value with a length of at least 1",
          }),
        ).check(
          Schema.isMaxCodePoints(1048576).annotate({
            expected: "a string with at most 1048576 code points",
          }),
        ),
      ]),
    ),
    RoleArn: Schema.Union([
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
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(256).annotate({
          expected: "a string with at most 256 code points",
        }),
      ),
    ]),
    StateMachineName: Schema.optionalKey(
      Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ).check(
        Schema.isMaxCodePoints(80).annotate({
          expected: "a string with at most 80 code points",
        }),
      ),
    ),
    StateMachineType: Schema.optionalKey(
      Schema.Literals(["STANDARD", "EXPRESS"]),
    ),
    LoggingConfiguration: Schema.optionalKey(LoggingConfiguration),
    TracingConfiguration: Schema.optionalKey(TracingConfiguration),
    EncryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
    DefinitionS3Location: Schema.optionalKey(S3Location),
    DefinitionSubstitutions: Schema.optionalKey(DefinitionSubstitutions),
    Definition: Schema.optionalKey(Definition),
    Tags: Schema.optionalKey(Schema.Array(TagsEntry)),
  }),
  AWSStateMachineResourceSchema,
);

export interface AWSStateMachineOutputs {
  readonly Arn?: string;
  readonly Name?: string;
  readonly StateMachineRevisionId?: string;
}

export const AWSStateMachineOutputsSchema = Schema.Struct({
  Arn: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(2048).annotate({
        expected: "a string with at most 2048 code points",
      }),
    ),
  ),
  Name: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
  ),
  StateMachineRevisionId: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(256).annotate({
        expected: "a string with at most 256 code points",
      }),
    ),
  ),
});

export interface AWSStateMachineRequest {
  readonly DefinitionString?: string;
  readonly RoleArn: string;
  readonly StateMachineName?: string;
  readonly StateMachineType?: "STANDARD" | "EXPRESS";
  readonly LoggingConfiguration?: LoggingConfiguration_1;
  readonly TracingConfiguration?: TracingConfiguration;
  readonly EncryptionConfiguration?: EncryptionConfiguration;
  readonly DefinitionS3Location?: S3Location;
  readonly DefinitionSubstitutions?: DefinitionSubstitutions;
  readonly Definition?: Definition;
  readonly Tags?: ReadonlyArray<TagsEntry>;
}

export const AWSStateMachineRequestSchema = Schema.Struct({
  DefinitionString: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(1048576).annotate({
        expected: "a string with at most 1048576 code points",
      }),
    ),
  ),
  RoleArn: Schema.String.check(
    Schema.isMinLength(1).annotate({
      expected: "a value with a length of at least 1",
    }),
  ).check(
    Schema.isMaxCodePoints(256).annotate({
      expected: "a string with at most 256 code points",
    }),
  ),
  StateMachineName: Schema.optionalKey(
    Schema.String.check(
      Schema.isMinLength(1).annotate({
        expected: "a value with a length of at least 1",
      }),
    ).check(
      Schema.isMaxCodePoints(80).annotate({
        expected: "a string with at most 80 code points",
      }),
    ),
  ),
  StateMachineType: Schema.optionalKey(
    Schema.Literals(["STANDARD", "EXPRESS"]),
  ),
  LoggingConfiguration: Schema.optionalKey(LoggingConfiguration_1),
  TracingConfiguration: Schema.optionalKey(TracingConfiguration),
  EncryptionConfiguration: Schema.optionalKey(EncryptionConfiguration),
  DefinitionS3Location: Schema.optionalKey(S3Location),
  DefinitionSubstitutions: Schema.optionalKey(DefinitionSubstitutions),
  Definition: Schema.optionalKey(Definition),
  Tags: Schema.optionalKey(Schema.Array(TagsEntry)),
});
export const AWSStateMachineRelationshipIssues = [
  {
    propertyPath: ["DefinitionString"],
    sourceType: "AWS::Lambda::Function",
    sourceProperties: [["Arn"], ["FunctionName"]],
    message:
      "Several source properties are permitted; an entity mapping requires a reviewed selection",
  },
  {
    propertyPath: ["DefinitionString"],
    sourceType: "AWS::DynamoDB::Table",
    sourceProperties: [["Arn"], ["TableName"]],
    message:
      "Several source properties are permitted; an entity mapping requires a reviewed selection",
  },
];
export const AWSStateMachineResourceTypeSchema = Schema.Struct({
  provider: Schema.Literal("aws"),
  service: Schema.Literal("stepfunctions"),
  resource: Schema.Literal("statemachine"),
});

/**
 * The AWSStateMachineResource class retains its owning stack across declarations.
 * Applied output properties are ordinary values maintained by the lifecycle.
 */
export class AWSStateMachineResource<
  Props = AWSStateMachineProps,
> extends ResourceEntity<{
  readonly provider: "aws";
  readonly service: "stepfunctions";
  readonly resource: "statemachine";
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
        service: "stepfunctions",
        resource: "statemachine",
      },
    });
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Arn(): Required<AWSStateMachineOutputs>["Arn"] {
    const value: Required<AWSStateMachineOutputs>["Arn"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Arn",
        Schema.requiredKey(AWSStateMachineOutputsSchema.fields.Arn),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get Name(): Required<AWSStateMachineOutputs>["Name"] {
    const value: Required<AWSStateMachineOutputs>["Name"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "Name",
        Schema.requiredKey(AWSStateMachineOutputsSchema.fields.Name),
      );
    return value;
  }

  /**
   * Successful lifecycle writes update this value for declarations owned by the stack.
   * Reading an unavailable value throws ResourceOutputResolutionMissing.
   */
  get StateMachineRevisionId(): Required<AWSStateMachineOutputs>["StateMachineRevisionId"] {
    const value: Required<AWSStateMachineOutputs>["StateMachineRevisionId"] =
      ResourceOutputBinding.value(
        this.binding,
        this.key,
        "StateMachineRevisionId",
        Schema.requiredKey(
          AWSStateMachineOutputsSchema.fields.StateMachineRevisionId,
        ),
      );
    return value;
  }
}

/**
 * Callers must validate properties before constructing the declaration.
 * Compatible resources can depend on it before apply supplies provider values.
 * Reading applied outputs requires a binding to the owning stack.
 */
export function createAWSStateMachineDeclaration<Props>(
  key: ResourceKey,
  props: Props,
  binding?: ResourceOutputBinding,
): AWSStateMachineResource<Props> {
  const resource: AWSStateMachineResource<Props> =
    new AWSStateMachineResource<Props>(key, props, binding);

  return resource;
}

/** The AWSStateMachine resource factory validates properties and registers the resource in the shared graph. Provider values become available after apply saves the resource. */
export const AWSStateMachine = Effect.fn("AWSStateMachine")(function* (input: {
  logicalId: string;
  props: AWSStateMachineProps;
}) {
  const graph = yield* ResourceGraphBuilder;

  const key: ResourceKey = { logicalId: input.logicalId };

  const declaration = yield* graph.resource(key);

  const props = yield* Schema.decodeEffect(AWSStateMachinePropsSchema)(
    input.props,
  );

  yield* declaration.registerEntity(AWSStateMachineResourceTypeSchema, {
    propsSchema: AWSStateMachinePropsSchema,
    requestSchema: AWSStateMachineRequestSchema,
    outputsSchema: AWSStateMachineOutputsSchema,
    props,
  });

  const resource: AWSStateMachineResource = createAWSStateMachineDeclaration(
    key,
    props,
    declaration.outputs,
  );

  return resource;
});
export const AWSStateMachineOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-stepfunctions-statemachine.json",
      format: "CloudFormation",
    },
    typeName: "AWS::StepFunctions::StateMachine",
    resource: "statemachine",
    primaryIdentifier: ["/properties/Arn"],
    createOnlyProperties: [
      "/properties/StateMachineName",
      "/properties/StateMachineType",
    ],
    writeOnlyProperties: [
      "/properties/Definition",
      "/properties/DefinitionS3Location",
      "/properties/DefinitionSubstitutions",
    ],
    outputs: {
      Arn: {
        schema: {
          type: "string",
          minLength: 1,
          maxLength: 2048,
        },
        schemaPath: "/properties/Arn",
        valuePath: "/Arn",
        required: false,
      },
      Name: {
        schema: {
          type: "string",
          minLength: 1,
          maxLength: 80,
        },
        schemaPath: "/properties/Name",
        valuePath: "/Name",
        required: false,
      },
      StateMachineRevisionId: {
        schema: {
          type: "string",
          minLength: 1,
          maxLength: 256,
        },
        schemaPath: "/properties/StateMachineRevisionId",
        valuePath: "/StateMachineRevisionId",
        required: false,
      },
    },
  },
];
