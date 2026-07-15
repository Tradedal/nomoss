import type * as SQS from "@distilled.cloud/aws/sqs";
import * as sqs from "@distilled.cloud/aws/sqs";
import {
  Context,
  Data,
  Effect,
  Equal,
  Match,
  Option,
  Schedule,
  Schema,
  Struct,
} from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import {
  decodePendingQueueArnPlaceholder,
  decodePendingQueueUrlPlaceholder,
  encodePendingQueuePlaceholder,
  PendingQueuePlaceholder,
} from "./awsQueue.js";

export const QueuePolicyPropsSchema = annotateResourceSchema(
  sqs.SetQueueAttributesRequest,
  {
    provider: "aws",
    service: "sqs",
    resource: "queue-policy",
    operation: "create",
    stateSecretOutputKeys: [],
  },
);

export type QueuePolicyProps = Schema.Schema.Type<
  typeof QueuePolicyPropsSchema
>;

export const QueuePolicyObservedStateSchema = annotateResourceSchema(
  Schema.Struct({
    attributes: sqs.GetQueueAttributesResult,
  }),
  {
    provider: "aws",
    service: "sqs",
    resource: "queue-policy",
    operation: "read",
    stateSecretOutputKeys: [],
  },
);

export type QueuePolicyObservedState = Schema.Schema.Type<
  typeof QueuePolicyObservedStateSchema
>;

export type QueuePolicyState = {
  readonly queueUrl: string;
  readonly policy: string;
};

export const QueuePolicyOutputsSchema = sqs.SetQueueAttributesResponse;

export type QueuePolicyOutputs = Schema.Schema.Type<
  typeof QueuePolicyOutputsSchema
>;

export const QueuePolicyDocumentStatementSchema = Schema.Struct({
  Sid: Schema.String,
  Effect: Schema.Literal("Allow"),
  Principal: Schema.Struct({
    Service: Schema.Literal("s3.amazonaws.com"),
  }),
  Action: Schema.Literal("sqs:SendMessage"),
  Resource: Schema.String,
  Condition: Schema.Struct({
    ArnLike: Schema.Struct({
      "aws:SourceArn": Schema.String,
    }),
  }),
});

export type QueuePolicyDocumentStatement = Schema.Schema.Type<
  typeof QueuePolicyDocumentStatementSchema
>;

export const QueuePolicyDocumentSchema = Schema.Struct({
  Version: Schema.Literal("2012-10-17"),
  Statement: Schema.Array(QueuePolicyDocumentStatementSchema),
});

export type QueuePolicyDocument = Schema.Schema.Type<
  typeof QueuePolicyDocumentSchema
>;

const QueuePolicyDocumentStringSchema = Schema.fromJsonString(
  QueuePolicyDocumentSchema,
);

export class QueuePolicySetFailed extends Data.TaggedError(
  "QueuePolicySetFailed",
)<{
  readonly cause: SQS.SetQueueAttributesError;
}> {}

export class QueuePolicyReadFailed extends Data.TaggedError(
  "QueuePolicyReadFailed",
)<{
  readonly cause: SQS.GetQueueAttributesError | SQS.GetQueueUrlError;
}> {}

export class QueuePolicyQueueArnMissing extends Data.TaggedError(
  "QueuePolicyQueueArnMissing",
)<{
  readonly queueUrl: string;
}> {}

export type QueuePolicyError =
  | QueuePolicySetFailed
  | QueuePolicyReadFailed
  | QueuePolicyQueueArnMissing;

const normalizePolicy = (policy: string | undefined) =>
  Option.fromUndefinedOr(policy).pipe(
    Option.flatMap((encoded) =>
      Schema.decodeUnknownOption(QueuePolicyDocumentStringSchema)(encoded),
    ),
  );

export const queuePoliciesEqual = (
  left: string | undefined,
  right: string | undefined,
) =>
  Option.all({
    left: normalizePolicy(left),
    right: normalizePolicy(right),
  }).pipe(
    Option.match({
      onNone: () => left === right,
      onSome: ({ left: leftPolicy, right: rightPolicy }) =>
        Equal.equals(leftPolicy, rightPolicy),
    }),
  );

export const s3SendMessageQueuePolicy = (
  bucketArn: string,
  queueArn: string,
) => {
  const statement: QueuePolicyDocumentStatement = {
    Sid: "AllowS3BucketNotifications",
    Effect: "Allow",
    Principal: {
      Service: "s3.amazonaws.com",
    },
    Action: "sqs:SendMessage",
    Resource: queueArn,
    Condition: {
      ArnLike: {
        "aws:SourceArn": bucketArn,
      },
    },
  };
  const policyDocument: QueuePolicyDocument = {
    Version: "2012-10-17",
    Statement: [statement],
  };

  return Schema.encodeUnknownEffect(QueuePolicyDocumentStringSchema)(
    policyDocument,
  );
};

/**
 * Queue policy resources use this adapter so pending queue refs and policy
 * normalization stay inside the SQS provider path.
 */
export class QueuePolicyLifecycleService extends Context.Service<QueuePolicyLifecycleService>()(
  "nomoss/providers/aws/awsQueuePolicy/QueuePolicyLifecycleService",
  {
    make: Effect.gen(function* () {
      const queueLookupRetryPolicy = Schedule.recurs(20);
      const getQueueUrl = yield* sqs.getQueueUrl;
      const getQueueAttributes = yield* sqs.getQueueAttributes;
      const setQueueAttributes = yield* sqs.setQueueAttributes;
      const queuePolicyStateFromProps = (
        props: QueuePolicyProps,
      ): QueuePolicyState => ({
        queueUrl: props.QueueUrl,
        policy: props.Attributes.Policy ?? "",
      });
      const queuePolicyObservedState = (
        attributes: SQS.GetQueueAttributesResult,
      ): QueuePolicyObservedState =>
        QueuePolicyObservedStateSchema.make({
          attributes,
        });
      const queueUrlOptionFromUnknown = (value: unknown) =>
        Schema.decodeUnknownOption(Schema.String)(value);
      const queueArnFromAttributes = (
        queueUrl: string,
        output: SQS.GetQueueAttributesResult,
      ) =>
        Option.fromUndefinedOr(output.Attributes).pipe(
          Option.flatMap((attributes) =>
            Option.fromUndefinedOr(attributes.QueueArn),
          ),
          Option.match({
            onNone: () =>
              Effect.fail(new QueuePolicyQueueArnMissing({ queueUrl })),
            onSome: Effect.succeed,
          }),
        );
      const queueUrlOrPending = (
        queueName: string,
        output: SQS.GetQueueUrlResult,
      ) =>
        Match.value(queueUrlOptionFromUnknown(output.QueueUrl)).pipe(
          Match.when({ _tag: "None" }, () =>
            encodePendingQueuePlaceholder(
              PendingQueuePlaceholder.Url({ queueName }),
            ),
          ),
          Match.when({ _tag: "Some" }, ({ value }) => value),
          Match.exhaustive,
        );
      const pendingQueueUrlEffect = (queueName: string) =>
        getQueueUrl({ QueueName: queueName }).pipe(
          Effect.retry(queueLookupRetryPolicy),
          Effect.mapError((cause) => new QueuePolicyReadFailed({ cause })),
          Effect.map((output) => queueUrlOrPending(queueName, output)),
        );
      const pendingQueueUrlOptionEffect = (queueName: string) =>
        getQueueUrl({ QueueName: queueName }).pipe(
          Effect.map((output) => queueUrlOptionFromUnknown(output.QueueUrl)),
          Effect.catchTag("QueueDoesNotExist", () =>
            Effect.succeed(Option.none<string>()),
          ),
          Effect.mapError((cause) => new QueuePolicyReadFailed({ cause })),
          Effect.catchCause(() => Effect.succeed(Option.none<string>())),
        );
      const resolveQueueUrl = Effect.fn(
        "QueuePolicyLifecycleService.resolveQueueUrl",
      )(function* (queueUrl: string) {
        const pendingQueueName = decodePendingQueueUrlPlaceholder(queueUrl);

        return yield* Match.value(pendingQueueName).pipe(
          Match.when({ _tag: "None" }, () => Effect.succeed(queueUrl)),
          Match.when({ _tag: "Some" }, ({ value: queueName }) =>
            pendingQueueUrlEffect(queueName),
          ),
          Match.exhaustive,
        );
      });
      const pendingQueueArnEffect = (queueUrl: string) =>
        getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ["QueueArn"],
        }).pipe(
          Effect.retry(queueLookupRetryPolicy),
          Effect.mapError((cause) => new QueuePolicyReadFailed({ cause })),
          Effect.flatMap((attributes) =>
            queueArnFromAttributes(queueUrl, attributes),
          ),
        );
      const resolveQueueArn = Effect.fn(
        "QueuePolicyLifecycleService.resolveQueueArn",
      )(function* (queueUrl: string, policy: QueuePolicyDocument) {
        const currentResource = policy.Statement[0]?.Resource;
        const pendingQueueName = Option.fromUndefinedOr(currentResource).pipe(
          Option.flatMap(decodePendingQueueArnPlaceholder),
        );

        return yield* Match.value(pendingQueueName).pipe(
          Match.when({ _tag: "None" }, () => Effect.succeed(currentResource)),
          Match.when({ _tag: "Some" }, () => pendingQueueArnEffect(queueUrl)),
          Match.exhaustive,
        );
      });
      const resolveQueuePolicyAttributes = Effect.fn(
        "QueuePolicyLifecycleService.resolveQueuePolicyAttributes",
      )(function* (props: QueuePolicyProps) {
        const encodedPolicy = props.Attributes.Policy ?? "";
        const policy = yield* Schema.decodeUnknownEffect(
          QueuePolicyDocumentStringSchema,
        )(encodedPolicy);
        const queueUrl = yield* resolveQueueUrl(props.QueueUrl);
        const queueArn = yield* resolveQueueArn(queueUrl, policy);
        const sourceArn =
          policy.Statement[0]?.Condition.ArnLike["aws:SourceArn"];
        const statement = QueuePolicyDocumentStatementSchema.make({
          Sid: policy.Statement[0]?.Sid ?? "AllowS3BucketNotifications",
          Effect: "Allow",
          Principal: {
            Service: "s3.amazonaws.com",
          },
          Action: "sqs:SendMessage",
          Resource: queueArn,
          Condition: {
            ArnLike: {
              "aws:SourceArn": sourceArn ?? "",
            },
          },
        });
        const resolvedPolicy = QueuePolicyDocumentSchema.make({
          Version: policy.Version,
          Statement: [statement],
        });
        const policyDocument = yield* Schema.encodeUnknownEffect(
          QueuePolicyDocumentStringSchema,
        )(resolvedPolicy);

        return {
          queueUrl,
          policy: policyDocument,
        };
      });
      const resolveQueueUrlOption = Effect.fn(
        "QueuePolicyLifecycleService.resolveQueueUrlOption",
      )(function* (queueUrl: string) {
        const pendingQueueName = decodePendingQueueUrlPlaceholder(queueUrl);

        return yield* Match.value(pendingQueueName).pipe(
          Match.when({ _tag: "None" }, () =>
            Effect.succeed(Option.some(queueUrl)),
          ),
          Match.when({ _tag: "Some" }, ({ value: queueName }) =>
            pendingQueueUrlOptionEffect(queueName),
          ),
          Match.exhaustive,
        );
      });
      const readPolicyAttributes = Effect.fn(
        "QueuePolicyLifecycleService.readPolicyAttributes",
      )(function* (queueUrl: string) {
        const attributes = yield* getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ["Policy"],
        }).pipe(
          Effect.catchTag("QueueDoesNotExist", () =>
            Effect.succeed<SQS.GetQueueAttributesResult>({}),
          ),
          Effect.mapError((cause) => new QueuePolicyReadFailed({ cause })),
        );

        return Option.some(queuePolicyObservedState(attributes));
      });

      return {
        create: Effect.fn("QueuePolicyLifecycleService.create")(function* (
          props: QueuePolicyProps,
        ) {
          const resolved = yield* resolveQueuePolicyAttributes(props);

          yield* setQueueAttributes({
            QueueUrl: resolved.queueUrl,
            Attributes: {
              Policy: resolved.policy,
            },
          }).pipe(
            Effect.mapError((cause) => new QueuePolicySetFailed({ cause })),
          );

          return queuePolicyStateFromProps(
            Struct.assign(props, {
              QueueUrl: resolved.queueUrl,
              Attributes: Struct.assign(props.Attributes ?? {}, {
                Policy: resolved.policy,
              }),
            }),
          );
        }),

        read: Effect.fn("QueuePolicyLifecycleService.read")(function* (
          props: QueuePolicyProps,
        ) {
          const decodedQueueUrl = queueUrlOptionFromUnknown(props.QueueUrl);
          const queueUrlOption = yield* Option.match(decodedQueueUrl, {
            onNone: () => Effect.succeed(Option.none<string>()),
            onSome: resolveQueueUrlOption,
          });

          return yield* Option.match(queueUrlOption, {
            onNone: () =>
              Effect.succeed(Option.none<QueuePolicyObservedState>()),
            onSome: readPolicyAttributes,
          });
        }),

        destroy: Effect.fn("QueuePolicyLifecycleService.destroy")(function* (
          props: QueuePolicyProps,
        ) {
          const decodedQueueUrl = queueUrlOptionFromUnknown(props.QueueUrl);
          const queueUrlOption = yield* Option.match(decodedQueueUrl, {
            onNone: () => Effect.succeed(Option.none<string>()),
            onSome: resolveQueueUrlOption,
          });

          yield* Option.match(queueUrlOption, {
            onNone: () => Effect.void,
            onSome: (queueUrl) =>
              setQueueAttributes({
                QueueUrl: queueUrl,
                Attributes: {
                  Policy: "",
                },
              }).pipe(
                Effect.catchTag("QueueDoesNotExist", () => Effect.void),
                Effect.mapError((cause) => new QueuePolicySetFailed({ cause })),
              ),
          });
        }),

        resolve: Effect.fn("QueuePolicyLifecycleService.resolve")(function* (
          props: QueuePolicyProps,
        ) {
          return yield* resolveQueuePolicyAttributes(props);
        }),
      };
    }),
  },
) {}
