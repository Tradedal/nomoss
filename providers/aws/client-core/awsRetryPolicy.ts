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
 * The AwsRetryPolicy service lets a caller honor an AWS retry hint while
 * retaining control of attempt limits and cancellation.
 */
export class AwsRetryPolicy extends Context.Service<AwsRetryPolicy>()(
  "@tradedal/aws-client-core/awsRetryPolicy",
  {
    make: Effect.sync(() => {
      /**
       * The retryDelay service method returns the wait in milliseconds for
       * an attempt. A valid Retry-After value can extend the usual backoff.
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
