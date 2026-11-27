import {
  Context,
  type Duration,
  Effect,
  flow,
  Layer,
  Option,
  Schedule,
} from "effect";

/**
 * The ResourceStabilization service lets resource policies wait for provider
 * changes to become visible. The runtime sets the interval between attempts.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Context.ts (Service)
 */
export class ResourceStabilization extends Context.Service<ResourceStabilization>()(
  "nomoss/core/resource/resourceStabilization",
  {
    make: (interval: Duration.Input) =>
      Effect.sync(() => {
        const schedule = Schedule.spaced(interval);

        /**
         * The waitFor function returns the first observation that satisfies
         * the condition. A provider failure or an expired deadline fails the wait.
         *
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (repeat and timeout)
         */
        const waitFor = <A>(
          accepts: (state: A) => boolean,
          timeout: Duration.Input,
        ) => {
          const policy = { until: accepts, schedule };

          return flow(
            Effect.repeat<typeof policy, A>(policy),
            Effect.timeout(timeout),
          );
        };

        /**
         * The waitForPresence service method returns the first present
         * observation. Callers can filter each read for the desired state.
         *
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (repeat and fromOption)
         */
        const waitForPresence = <A>(timeout: Duration.Input) =>
          flow(
            waitFor<Option.Option<A>>(Option.isSome, timeout),
            Effect.flatMap((state: Option.Option<A>) =>
              Effect.fromOption(state),
            ),
          );

        /**
         * The waitForAbsence service method lets teardown complete once a provider
         * read confirms the resource is gone. A failed read or an expired
         * deadline leaves deletion unconfirmed.
         *
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (repeat)
         */
        const waitForAbsence = (timeout: Duration.Input) =>
          flow(
            waitFor<Option.Option<unknown>>(Option.isNone, timeout),
            Effect.asVoid,
          );

        /**
         * The observeWithinAttempts service method returns the first matching
         * observation or the final observation when the allowed repeats run
         * out. The repeat count excludes the initial read. A provider error
         * ends the wait.
         *
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Schedule.ts (upTo)
         */
        const observeWithinAttempts = <A>(
          accepts: (state: A) => boolean,
          repeats: number,
        ) => {
          const policy = {
            until: accepts,
            schedule: schedule.pipe(Schedule.upTo({ times: repeats })),
          };

          return Effect.repeat<typeof policy, A>(policy);
        };

        /**
         * The retrySchedule service method gives dependent resources time to
         * become usable. The caller selects transient failures with Effect.retry.
         * The schedule checks elapsed time before it schedules another attempt.
         *
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Effect.ts (retry)
         * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Schedule.ts (upTo)
         */
        const retrySchedule = (duration: Duration.Input) =>
          schedule.pipe(Schedule.upTo({ duration }));

        return {
          schedule,
          waitForPresence,
          waitForAbsence,
          observeWithinAttempts,
          retrySchedule,
        };
      }),
  },
) {}

/**
 * The resourceStabilizationLayer Layer sets a one-second interval for
 * repeated reads and retries. Tests can advance these waits with TestClock.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Layer.ts (effect)
 */
export const resourceStabilizationLayer = Layer.effect(
  ResourceStabilization,
  ResourceStabilization.make("1 second"),
);
