import {
  Clock,
  Context,
  DateTime,
  Effect,
  Number as Num,
  Option,
  Random,
  Schema,
} from "effect";

export interface AwsRetryContext {
  readonly attempt: number;
  readonly retryAfter: string | undefined;
}

/**
 * AwsRetryPolicy calculates the delay before another attempt at a failed AWS
 * request. Its backoff includes jitter and honors a valid Retry-After value.
 * Attempt limits and interruption of the wait belong to AwsClient execution.
 */
export class AwsRetryPolicy extends Context.Service<AwsRetryPolicy>()(
  "nomoss/providers/aws/client/awsRetryPolicy",
  {
    make: Effect.sync(() => {
      /**
       * retryDelay returns the delay for the next request attempt. A valid
       * Retry-After value prevents an attempt earlier than AWS requested.
       */
      const retryDelay = Effect.fn("AwsRetryPolicy.retryDelay")(function* (
        context: AwsRetryContext,
      ) {
        const now = yield* Clock.currentTimeMillis;
        const jitter = yield* Random.next;
        const backoff =
          jitter * Num.min(20_000, 100 * 2 ** (context.attempt - 1));

        const providerDelay = Option.fromUndefinedOr(context.retryAfter).pipe(
          Option.flatMap((hint) =>
            Option.match(
              Schema.decodeUnknownOption(Schema.Finite)(Number(hint)),
              {
                onSome: (seconds) => Option.some(seconds * 1000),
                onNone: () =>
                  DateTime.make(hint).pipe(
                    Option.map((date) => DateTime.toEpochMillis(date) - now),
                  ),
              },
            ),
          ),
          Option.getOrElse(() => 0),
        );

        const delay: number = Num.max(backoff, providerDelay);

        return delay;
      });

      return { retryDelay };
    }),
  },
) {}
