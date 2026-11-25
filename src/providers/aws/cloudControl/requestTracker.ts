import {
  Context,
  Data,
  Duration,
  Effect,
  Match,
  Option,
  Schedule,
} from "effect";
import type { ProgressEvent } from "../client/generated/cloudControl.js";
import { AwsCloudControlClient } from "./client.js";

export class AwsCloudControlRequestFailed extends Data.TaggedError(
  "AwsCloudControlRequestFailed",
)<{ readonly typeName: string; readonly cause: unknown }> {
  override get message() {
    return Match.value(this.cause).pipe(
      Match.when(
        (cause: unknown): cause is Error => cause instanceof Error,
        (cause: Error) => cause.message,
      ),
      Match.orElse(
        () => `AWS Cloud Control request failed for ${this.typeName}`,
      ),
    );
  }
}

export class AwsCloudControlOperationFailed extends Data.TaggedError(
  "AwsCloudControlOperationFailed",
)<{
  readonly typeName: string;
  readonly errorCode?: ProgressEvent["ErrorCode"];
  readonly message?: string;
}> {}

/**
 * AwsCloudControlRequestTracker waits for AWS to finish an accepted resource
 * mutation. Lifecycle operations wait for the terminal result before they read
 * outputs or allow dependent resources to proceed.
 */
export class AwsCloudControlRequestTracker extends Context.Service<AwsCloudControlRequestTracker>()(
  "nomoss/providers/aws/cloudControl/requestTracker/AwsCloudControlRequestTracker",
  {
    make: Effect.gen(function* () {
      const { getResourceRequestStatus } = yield* AwsCloudControlClient;

      /**
       * awaitResourceRequest returns successful terminal progress or a typed
       * failure for the request token.
       * Status checks use the AWS CLI waiter's five-second interval.
       * Interruption stops local requests and waits; accepted work in AWS
       * requires separate cancellation.
       */
      const awaitResourceRequest = Effect.fn(
        "AwsCloudControlRequestTracker.awaitResourceRequest",
      )(function* (input: {
        readonly typeName: string;
        readonly requestToken: string;
      }) {
        yield* Effect.annotateCurrentSpan({
          "aws.cloudcontrol.type_name": input.typeName,
        });

        const progress: ProgressEvent = yield* getResourceRequestStatus({
          RequestToken: input.requestToken,
        }).pipe(
          Effect.mapError(
            (cause) =>
              new AwsCloudControlRequestFailed({
                typeName: input.typeName,
                cause,
              }),
          ),
          Effect.flatMap(({ ProgressEvent }) =>
            Option.fromUndefinedOr(ProgressEvent).pipe(
              Effect.fromOption,
              Effect.mapError(
                () =>
                  new AwsCloudControlOperationFailed({
                    typeName: input.typeName,
                  }),
              ),
            ),
          ),
          Effect.filterOrFail(
            (event) =>
              event.OperationStatus === "SUCCESS" ||
              event.OperationStatus === "PENDING" ||
              event.OperationStatus === "IN_PROGRESS",
            (event) =>
              new AwsCloudControlOperationFailed({
                typeName: input.typeName,
                errorCode: event.ErrorCode,
                message: event.StatusMessage,
              }),
          ),
          Effect.flatMap((event) =>
            Effect.gen(function* () {
              yield* Effect.logInfo("Cloud Control request progress").pipe(
                Effect.annotateLogs({
                  "aws.cloudcontrol.type_name": input.typeName,
                  "aws.cloudcontrol.operation": event.Operation,
                  "aws.cloudcontrol.status": event.OperationStatus,
                  "aws.cloudcontrol.retry_after": event.RetryAfter,
                }),
              );

              yield* Effect.logInfo(
                "Waiting to poll Cloud Control request",
              ).pipe(
                Effect.annotateLogs({
                  "aws.cloudcontrol.type_name": input.typeName,
                  "aws.cloudcontrol.status": event.OperationStatus,
                  "aws.cloudcontrol.poll_delay_ms": 5000,
                }),
                Effect.when(
                  Effect.succeed(event.OperationStatus !== "SUCCESS"),
                ),
              );

              return event;
            }),
          ),
          Effect.repeat({
            until: (progressEvent) =>
              progressEvent.OperationStatus === "SUCCESS",
            schedule: Schedule.spaced(Duration.seconds(5)),
          }),
        );

        return progress;
      });

      return { awaitResourceRequest };
    }),
  },
) {}
