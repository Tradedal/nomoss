// Generated from the CloudFormation Registry resource schema. Do not edit.
// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's generated regular expressions.
import {
  annotateResourceSchema,
  ResourceGraphBuilder,
  type ResourceInputJson,
  ResourceInputJsonSchema,
  type ResourceKey,
  ResourceSchemaAnnotationSchema,
} from "@nomoss/core";
import { Effect, Schema } from "effect";

export interface QueueInlinePolicyProps {
  readonly PolicyDocument: {
    readonly [x: string]: ResourceInputJson;
  };
  readonly Queue: string;
}

export const QueueInlinePolicyResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "aws",
    service: "sqs",
    resource: "queueinlinepolicy",
    operation: "create",
    stateSecretOutputKeys: [],
    cloudControl: {
      typeName: "AWS::SQS::QueueInlinePolicy",
      primaryIdentifier: ["/properties/Queue"],
      readOnlyProperties: [],
      createOnlyProperties: ["/properties/Queue"],
      writeOnlyProperties: [],
    },
  });
export const QueueInlinePolicyPropsSchema = annotateResourceSchema(
  Schema.Struct({
    PolicyDocument: Schema.Record(
      Schema.String,
      ResourceInputJsonSchema.annotate({ expected: "JSON value" }),
    ).annotate({
      description:
        "A policy document that contains permissions to add to the specified SQS queue",
    }),
    Queue: Schema.String.annotate({ description: "The URL of the SQS queue." }),
  }),
  QueueInlinePolicyResourceSchema,
);

export type QueueInlinePolicyOutputs =
  typeof QueueInlinePolicyOutputsSchema.Type;

export const QueueInlinePolicyOutputsSchema = Schema.Struct({});

export interface QueueInlinePolicyResource {
  readonly key: ResourceKey;
  readonly props: QueueInlinePolicyProps;
  readonly outputs: {
    readonly [Key in keyof QueueInlinePolicyOutputs]-?: Required<QueueInlinePolicyOutputs>[Key];
  };
}

export const registerQueueInlinePolicy = Effect.fn(
  "QueueInlinePolicy.register",
)(function* (input: {
  readonly key: ResourceKey;
  readonly props: QueueInlinePolicyProps;
}) {
  const graph = yield* ResourceGraphBuilder;
  const graphResource = yield* graph.resource(input.key);

  const resourceProps: QueueInlinePolicyProps = yield* Schema.decodeEffect(
    QueueInlinePolicyPropsSchema,
  )(input.props);

  const resourceOutputs: QueueInlinePolicyOutputs = yield* Schema.decodeEffect(
    QueueInlinePolicyOutputsSchema,
  )({});

  yield* graphResource.register({
    propsSchema: QueueInlinePolicyPropsSchema,
    outputsSchema: QueueInlinePolicyOutputsSchema,
    props: resourceProps,
    outputs: resourceOutputs,
  });

  const resource: QueueInlinePolicyResource = {
    key: input.key,
    props: resourceProps,
    outputs: {},
  };

  return resource;
});
export const QueueInlinePolicyOutputCatalog = [
  {
    source: {
      provider: "AWS",
      service: "CloudFormation",
      name: "aws-sqs-queueinlinepolicy.json",
      format: "CloudFormation",
    },
    typeName: "AWS::SQS::QueueInlinePolicy",
    primaryIdentifier: ["/properties/Queue"],
    createOnlyProperties: ["/properties/Queue"],
    writeOnlyProperties: [],
    outputs: {},
  },
];
