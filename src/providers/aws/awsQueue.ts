import type * as SQS from "@distilled.cloud/aws/sqs";
import * as sqs from "@distilled.cloud/aws/sqs";
import { Context, Data, Effect, Match, Option, Schedule, Schema } from "effect";

import { annotateResourceSchema } from "../../core/model.js";
import { AwsSqsTransport } from "./awsSqsTransport.js";

/** Desired SQS queue create properties carried by resource graph nodes. */
export const QueuePropsSchema = annotateResourceSchema(sqs.CreateQueueRequest, {
  provider: "aws",
  service: "sqs",
  resource: "queue",
  operation: "create",
  stateSecretOutputKeys: [],
});

export type QueueProps = Schema.Schema.Type<typeof QueuePropsSchema>;

/** Provider-owned SQS queue state persisted after creation. */
export type QueueState = {
  readonly queueName: string;
  readonly queueUrl: string;
  readonly queueArn: `arn:aws:sqs:${string}:${string}:${string}`;
};

/** Queue outputs exposed to dependent graph resources. */
export const QueueOutputsSchema = Schema.Struct({
  QueueUrl: Schema.String,
  QueueArn: Schema.String,
});

/** Normalized SQS read result used by queue resource-policy diffing. */
export const QueueObservedStateSchema = annotateResourceSchema(
  Schema.Struct({
    url: sqs.GetQueueUrlResult,
    attributes: sqs.GetQueueAttributesResult,
    tags: sqs.ListQueueTagsResult,
  }),
  {
    provider: "aws",
    service: "sqs",
    resource: "queue",
    operation: "read",
    stateSecretOutputKeys: [],
  },
);

export type QueueOutputs = Schema.Schema.Type<typeof QueueOutputsSchema>;

export type QueueObservedState = Schema.Schema.Type<
  typeof QueueObservedStateSchema
>;

export class QueueCreateFailed extends Data.TaggedError("QueueCreateFailed")<{
  readonly cause: SQS.CreateQueueError;
}> {}

export class QueueReadFailed extends Data.TaggedError("QueueReadFailed")<{
  readonly cause:
    | SQS.GetQueueUrlError
    | SQS.GetQueueAttributesError
    | SQS.ListQueueTagsError;
}> {}

export class QueueAttributesReadFailed extends Data.TaggedError(
  "QueueAttributesReadFailed",
)<{
  readonly cause: SQS.GetQueueAttributesError;
}> {}

export class QueueDeleteFailed extends Data.TaggedError("QueueDeleteFailed")<{
  readonly cause: SQS.DeleteQueueError;
}> {}

export class QueueArnMissing extends Data.TaggedError("QueueArnMissing")<{
  readonly queueUrl: string;
}> {}

export class QueueUrlMissing extends Data.TaggedError("QueueUrlMissing")<{
  readonly queueName: string;
}> {}

export type QueueError =
  | QueueCreateFailed
  | QueueReadFailed
  | QueueAttributesReadFailed
  | QueueDeleteFailed
  | QueueArnMissing
  | QueueUrlMissing;

export type PendingQueuePlaceholder = Data.TaggedEnum<{
  Url: {
    readonly queueName: string;
  };
  Arn: {
    readonly queueName: string;
  };
}>;

export const PendingQueuePlaceholder =
  Data.taggedEnum<PendingQueuePlaceholder>();

export const PendingQueueUrlPlaceholderSchema = Schema.TemplateLiteralParser([
  "nomoss:pending:sqs:",
  Schema.String,
]);

export const PendingQueueArnPlaceholderSchema = Schema.TemplateLiteralParser([
  "nomoss:pending:sqs-arn:",
  Schema.String,
]);

export const encodePendingQueuePlaceholder = (
  placeholder: PendingQueuePlaceholder,
) =>
  Match.value(placeholder).pipe(
    Match.tagsExhaustive({
      Url: ({ queueName }) => `nomoss:pending:sqs:${queueName}`,
      Arn: ({ queueName }) => `nomoss:pending:sqs-arn:${queueName}`,
    }),
  );

export const decodePendingQueueUrlPlaceholder = (value: string) =>
  Schema.decodeUnknownOption(PendingQueueUrlPlaceholderSchema)(value).pipe(
    Option.map(([, queueName]) => queueName),
  );

export const decodePendingQueueArnPlaceholder = (value: string) =>
  Schema.decodeUnknownOption(PendingQueueArnPlaceholderSchema)(value).pipe(
    Option.map(([, queueName]) => queueName),
  );

/** Converts created queue state into graph outputs. */
export function queueOutputsFromState(state: QueueState): QueueOutputs {
  const queueOutputs: QueueOutputs = {
    QueueUrl: state.queueUrl,
    QueueArn: state.queueArn,
  };

  return queueOutputs;
}

/** Builds pending graph outputs from desired queue props. */
export function queueOutputsFromProps(props: QueueProps): QueueOutputs {
  const queueOutputs: QueueOutputs = {
    QueueUrl: encodePendingQueuePlaceholder(
      PendingQueuePlaceholder.Url({ queueName: props.QueueName }),
    ),
    QueueArn: encodePendingQueuePlaceholder(
      PendingQueuePlaceholder.Arn({ queueName: props.QueueName }),
    ),
  };

  return queueOutputs;
}

/**
 * Runs SQS queue lifecycle semantics through the external SQS transport adapter.
 * Provider response validation remains inside this adapter.
 */
export class QueueLifecycleService extends Context.Service<QueueLifecycleService>()(
  "nomoss/providers/aws/awsQueue/QueueLifecycleService",
  {
    make: Effect.gen(function* () {
      const sqsTransport = yield* AwsSqsTransport;
      const queueCreateRetryPolicy = Schedule.recurs(30);
      const queueAttributeRetryPolicy = Schedule.recurs(20);

      const queueStateFromUrl = (
        props: QueueProps,
        queueUrl: string,
        queueArn: `arn:aws:sqs:${string}:${string}:${string}`,
      ): QueueState => ({
        queueName: props.QueueName,
        queueUrl,
        queueArn,
      });

      const queueObservedState = (
        url: SQS.GetQueueUrlResult,
        attributes: SQS.GetQueueAttributesResult,
        tags: SQS.ListQueueTagsResult,
      ): QueueObservedState =>
        QueueObservedStateSchema.make({
          url,
          attributes,
          tags,
        });

      const queueUrlFromCreateResult = (
        props: QueueProps,
        output: SQS.CreateQueueResult,
      ) =>
        Option.match(Option.fromUndefinedOr(output.QueueUrl), {
          onNone: () =>
            Effect.fail(new QueueUrlMissing({ queueName: props.QueueName })),
          onSome: Effect.succeed,
        });

      const queueUrlFromGetQueueUrlResult = (
        props: QueueProps,
        output: SQS.GetQueueUrlResult,
      ) =>
        Schema.decodeUnknownOption(Schema.String)(output.QueueUrl).pipe(
          Option.match({
            onNone: () =>
              Effect.fail(new QueueUrlMissing({ queueName: props.QueueName })),
            onSome: Effect.succeed,
          }),
        );

      const queueArnFromAttributes = (
        queueUrl: string,
        output: SQS.GetQueueAttributesResult,
      ) =>
        Option.fromUndefinedOr(output.Attributes).pipe(
          Option.flatMap((attributes) =>
            Option.fromUndefinedOr(attributes.QueueArn),
          ),
          Option.match({
            onNone: () => Effect.fail(new QueueArnMissing({ queueUrl })),
            onSome: (queueArn) =>
              Effect.succeed(
                queueArn as `arn:aws:sqs:${string}:${string}:${string}`,
              ),
          }),
        );

      const readQueueObservedState = Effect.fn(
        "QueueLifecycleService.read/readQueueObservedState",
      )(function* (props: QueueProps, url: SQS.GetQueueUrlResult) {
        const queueUrl = yield* queueUrlFromGetQueueUrlResult(props, url);
        const { attributes, tags } = yield* Effect.all({
          attributes: sqsTransport
            .getQueueAttributes({
              QueueUrl: queueUrl,
              AttributeNames: ["All"],
            })
            .pipe(Effect.mapError((cause) => new QueueReadFailed({ cause }))),
          tags: sqsTransport
            .listQueueTags({ QueueUrl: queueUrl })
            .pipe(Effect.mapError((cause) => new QueueReadFailed({ cause }))),
        });

        return queueObservedState(url, attributes, tags);
      });

      return {
        create: Effect.fn("QueueLifecycleService.create")(function* (
          props: QueueProps,
        ) {
          const output = yield* sqsTransport.createQueue(props).pipe(
            Effect.retry(queueCreateRetryPolicy),
            Effect.mapError((cause) => new QueueCreateFailed({ cause })),
          );
          const queueUrl = yield* queueUrlFromCreateResult(props, output);
          const attributes = yield* sqsTransport
            .getQueueAttributes({
              QueueUrl: queueUrl,
              AttributeNames: ["QueueArn"],
            })
            .pipe(
              Effect.retry(queueAttributeRetryPolicy),
              Effect.mapError(
                (cause) => new QueueAttributesReadFailed({ cause }),
              ),
            );
          const queueArn = yield* queueArnFromAttributes(queueUrl, attributes);

          return queueStateFromUrl(props, queueUrl, queueArn);
        }),

        read: Effect.fn("QueueLifecycleService.read")(function* (
          props: QueueProps,
        ) {
          const queueUrlResult = yield* sqsTransport
            .getQueueUrl({ QueueName: props.QueueName })
            .pipe(
              Effect.map((urlOutput) => Option.some(urlOutput)),
              Effect.catchTag("QueueDoesNotExist", () =>
                Effect.succeed(Option.none<SQS.GetQueueUrlResult>()),
              ),
              Effect.mapError((cause) => new QueueReadFailed({ cause })),
            );
          const queueObservation = yield* queueUrlResult.pipe(
            Option.map((url) =>
              Effect.map(readQueueObservedState(props, url), Option.some),
            ),
            Option.getOrElse(() =>
              Effect.succeed(Option.none<QueueObservedState>()),
            ),
          );

          return queueObservation;
        }),

        destroy: Effect.fn("QueueLifecycleService.destroy")(function* (
          props: QueueProps,
        ) {
          const queueUrlResult = yield* sqsTransport
            .getQueueUrl({ QueueName: props.QueueName })
            .pipe(
              Effect.map((urlOutput) => Option.some(urlOutput)),
              Effect.catchTag("QueueDoesNotExist", () =>
                Effect.succeed(Option.none<SQS.GetQueueUrlResult>()),
              ),
              Effect.catchCause(() =>
                Effect.succeed(Option.none<SQS.GetQueueUrlResult>()),
              ),
            );
          const maybeQueueUrlResult = yield* Effect.fromOption(
            queueUrlResult,
          ).pipe(Effect.catchNoSuchElement);
          const queueUrl = yield* Effect.fromOption(maybeQueueUrlResult).pipe(
            Effect.flatMap((presentQueueUrlResult) =>
              queueUrlFromGetQueueUrlResult(props, presentQueueUrlResult),
            ),
            Effect.catchNoSuchElement,
          );

          yield* Option.match(queueUrl, {
            onNone: () => Effect.void,
            onSome: (presentQueueUrl) =>
              sqsTransport.deleteQueue({ QueueUrl: presentQueueUrl }).pipe(
                Effect.catchTag("QueueDoesNotExist", () => Effect.void),
                Effect.mapError((cause) => new QueueDeleteFailed({ cause })),
              ),
          });
        }),
      };
    }),
  },
) {}
