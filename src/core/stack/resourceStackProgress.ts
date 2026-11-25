import {
  Cause,
  Clock,
  Context,
  Effect,
  Exit,
  Layer,
  Match,
  PubSub,
  Ref,
  Stream,
} from "effect";
import type { ResourceActionResult } from "../resource/lifecycle.js";
import type { PlanAction, ResourceNode } from "../resource/model.js";

/**
 * The ResourceProgress record describes an action's latest status. Running
 * events identify the planned action; completed events identify the work
 * actually performed, including NoOp when resolved inputs stayed unchanged.
 */
export interface ResourceProgress {
  readonly _tag: "Progress";
  readonly stackName: string;
  readonly node: ResourceNode;
  readonly operation: ResourceActionResult["operation"];
  readonly status: "running" | "completed" | "failed" | "interrupted";
  readonly startedAt: number;
  readonly updatedAt: number;
  readonly message?: string;
}

interface ProgressClosed {
  readonly _tag: "Closed";
  readonly subscription: symbol;
}

/**
 * The ResourceStackProgress service reports resource actions as they execute.
 * Effect's PubSub gives the renderer its own subscription and lets embedded
 * applications execute without collecting terminal events.
 *
 * @see ../../../../command-options-fund/refs/effect/packages/effect/src/PubSub.ts (PubSub.unbounded and PubSub.subscribe)
 */
export class ResourceStackProgress extends Context.Service<ResourceStackProgress>()(
  "nomoss/core/stack/resourceStackProgress",
  {
    make: Effect.gen(function* () {
      const events = yield* PubSub.unbounded<
        ResourceProgress | ProgressClosed
      >();

      const subscribers = yield* Ref.make(0);

      /**
       * The start service method publishes a running event and returns it for
       * subsequent notes and completion. Timestamps use the supplied Clock.
       */
      const start = Effect.fn("ResourceStackProgress.start")(function* (
        stackName: string,
        action: PlanAction,
      ) {
        const startedAt = yield* Clock.currentTimeMillis;

        const event: ResourceProgress = {
          _tag: "Progress",
          stackName,
          node: action.node,
          operation: action._tag,
          status: "running",
          startedAt,
          updatedAt: startedAt,
        };

        yield* PubSub.publish(events, event);

        return event;
      });

      /**
       * The finish service method publishes the executed outcome after state
       * persistence. Failed or interrupted actions retain their planned
       * operation so subscribers can identify the work that stopped.
       */
      const finish = Effect.fn("ResourceStackProgress.finish")(function* (
        event: ResourceProgress,
        exit: Exit.Exit<ResourceActionResult, unknown>,
      ) {
        const updatedAt = yield* Clock.currentTimeMillis;

        const result = Exit.match(exit, {
          onSuccess: (result) => ({ ...result, status: "completed" as const }),
          onFailure: (cause) => {
            const status = Match.value(Cause.hasInterruptsOnly(cause)).pipe(
              Match.when(true, () => "interrupted" as const),
              Match.orElse(() => "failed" as const),
            );

            return { node: event.node, status };
          },
        });

        yield* PubSub.publish(events, { ...event, ...result, updatedAt });
      });

      /**
       * The note service method publishes a status message when a subscriber
       * is present. Its boolean result lets the caller choose another logging
       * destination when execution has no progress subscriber.
       */
      const note = Effect.fn("ResourceStackProgress.note")(function* (
        event: ResourceProgress,
        message: string,
      ) {
        const listeners = yield* Ref.get(subscribers);

        const updatedAt = yield* Clock.currentTimeMillis;

        yield* PubSub.publish(events, { ...event, message, updatedAt }).pipe(
          Effect.when(Effect.succeed(listeners > 0)),
        );

        return listeners > 0;
      });

      /**
       * The subscribe service method opens a stream for one stack. Its close
       * message ends that stream after previously published events are consumed.
       * The caller's scope owns the subscription and releases it on shutdown.
       *
       * @see ../../../../command-options-fund/refs/effect/packages/effect/src/Stream.ts (Stream.fromSubscription and Stream.takeWhile)
       */
      const subscribe = Effect.fn("ResourceStackProgress.subscribe")(function* (
        stackName: string,
      ) {
        const id = Symbol();

        const subscription = yield* PubSub.subscribe(events);

        yield* Effect.acquireRelease(
          Ref.update(subscribers, (count) => count + 1),
          () => Ref.update(subscribers, (count) => count - 1),
        );

        const updates = Stream.fromSubscription(subscription).pipe(
          Stream.takeWhile(
            (event) => event._tag !== "Closed" || event.subscription !== id,
          ),
          Stream.filter((event) => event._tag === "Progress"),
          Stream.filter((event) => event.stackName === stackName),
        );

        const close = PubSub.publish(events, {
          _tag: "Closed",
          subscription: id,
        });

        return { updates, close };
      });

      return { start, finish, note, subscribe };
    }),
  },
) {}

/** The resourceStackProgressLayer Layer shares progress publication and subscriptions within the application runtime. */
export const resourceStackProgressLayer = Layer.effect(
  ResourceStackProgress,
  ResourceStackProgress.make,
);
