import type * as S3 from "@distilled.cloud/aws/s3";
import {
  Array as Arr,
  Context,
  Effect,
  Match,
  Option,
  type Schema,
} from "effect";

import {
  PlanDecision,
  type PlanDecision as PlanDecisionValue,
  PlanRepairChange,
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
  type ResourceObservation,
} from "../../core/lifecycle.js";
import { ResourceModel, type ResourceNode } from "../../core/model.js";
import { ResourcePolicy } from "../../core/resourcePolicy.js";
import {
  BucketNotificationLifecycleService,
  type BucketNotificationObservedState,
  BucketNotificationObservedStateSchema,
  BucketNotificationPropsSchema,
  bucketNotificationsEqual,
} from "./awsBucketNotification.js";

/**
 * The AWS resource dispatcher reaches bucket notification behavior through
 * this policy, keeping graph commands separate from provider calls.
 */
export class BucketNotificationResourcePolicy extends Context.Service<BucketNotificationResourcePolicy>()(
  "nomoss/providers/aws/awsBucketNotificationResourcePolicy/BucketNotificationResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* BucketNotificationLifecycleService;
      const model = yield* ResourceModel;
      const resourcePolicy = yield* ResourcePolicy;

      const formatEvents = (events: ReadonlyArray<S3.Event> | undefined) =>
        Match.value(events).pipe(
          Match.when(undefined, () => undefined),
          Match.orElse((defined) => defined.join(", ")),
        );

      const notificationChanges = (
        observed: S3.QueueConfiguration | undefined,
        desired: S3.QueueConfiguration,
      ) =>
        Arr.filter(
          [
            PlanRepairChange.Updated({
              path: ["aws", "s3", "bucket-notification", "queue", "Id"],
              before: observed?.Id,
              after: desired.Id,
            }),
            PlanRepairChange.Updated({
              path: ["aws", "s3", "bucket-notification", "queue", "QueueArn"],
              before: observed?.QueueArn,
              after: desired.QueueArn,
            }),
            PlanRepairChange.Updated({
              path: ["aws", "s3", "bucket-notification", "queue", "Events"],
              before: formatEvents(observed?.Events),
              after: formatEvents(desired.Events),
            }),
          ],
          (change) =>
            Match.value(change).pipe(
              Match.tag("Updated", ({ before, after }) => before !== after),
              Match.orElse(() => true),
            ),
        );

      const notificationDecision = (
        node: ResourceNode,
        state: BucketNotificationObservedState,
        desired: S3.QueueConfiguration,
      ) =>
        Match.value(
          bucketNotificationsEqual(
            lifecycle.managedQueueConfiguration(state, desired),
            desired,
          ),
        ).pipe(
          Match.when(true, () => PlanDecision.NoOp({ node })),
          Match.orElse(() =>
            PlanDecision.Repair({
              node,
              reason: "bucket notification differs from desired state",
              changes: notificationChanges(
                lifecycle.managedQueueConfiguration(state, desired),
                desired,
              ),
            }),
          ),
        );

      const decidePresent = Effect.fn(
        "BucketNotificationResourcePolicy.decidePresent",
      )(function* (node: ResourceNode, observed: Schema.Json) {
        const props = yield* model.decodeProps(
          node,
          BucketNotificationPropsSchema,
        );
        const state = yield* model.decodeJson(
          BucketNotificationObservedStateSchema,
          observed,
        );
        const desiredOption = yield* lifecycle.resolve(props).pipe(
          Effect.map(Option.some),
          Effect.catchCause(() => Effect.succeed(Option.none())),
        );
        const decision = Option.match(desiredOption, {
          onNone: () => PlanDecision.Create({ node }),
          onSome: (desired) => notificationDecision(node, state, desired),
        });

        return decision;
      });
      const read = Effect.fn("BucketNotificationResourcePolicy.read")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            BucketNotificationPropsSchema,
          );
          const output = yield* lifecycle.read(props);
          const result = yield* Effect.fromOption(output).pipe(
            Effect.flatMap((state: BucketNotificationObservedState) =>
              Effect.map(
                model.encodeJson(BucketNotificationObservedStateSchema, state),
                (observed) => resourcePolicy.present(node, observed),
              ),
            ),
            Effect.catchNoSuchElement,
            Effect.map(Option.getOrElse(() => resourcePolicy.missing(node))),
          );

          return result;
        },
      );
      const diff = Effect.fn("BucketNotificationResourcePolicy.diff")(
        function* (node: ResourceNode, observation: ResourceObservation) {
          const decision = yield* Match.value(observation).pipe(
            Match.tagsExhaustive({
              Missing: () => Effect.succeed(PlanDecision.Create({ node })),
              Unreadable: ({ reason }) =>
                Effect.succeed(PlanDecision.Repair({ node, reason })),
              Drifted: ({ reason }) =>
                Effect.succeed(PlanDecision.Repair({ node, reason })),
              Present: ({ observed }) => decidePresent(node, observed),
            }),
          );

          return ResourceCommandResult.Decided({ decision });
        },
      );
      const create = Effect.fn("BucketNotificationResourcePolicy.create")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            BucketNotificationPropsSchema,
          );
          yield* lifecycle.create(props);

          return ResourceCommandResult.Created({ node });
        },
      );
      const repair = Effect.fn("BucketNotificationResourcePolicy.repair")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            BucketNotificationPropsSchema,
          );
          yield* lifecycle.create(props);

          return ResourceCommandResult.Updated({ node });
        },
      );
      const destroy = Effect.fn("BucketNotificationResourcePolicy.destroy")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            BucketNotificationPropsSchema,
          );
          yield* lifecycle.destroy(props);

          return ResourceCommandResult.Destroyed({ node });
        },
      );
      const apply = Effect.fn("BucketNotificationResourcePolicy.apply")(
        function* (decision: PlanDecisionValue) {
          return yield* Match.value(decision).pipe(
            Match.tagsExhaustive({
              Create: ({ node }) => create(node),
              Repair: ({ node }) => repair(node),
              Destroy: ({ node }) => destroy(node),
              NoOp: () =>
                Effect.fail(
                  new ResourceCommandUnsupported({
                    command: ResourceCommand.Apply({ decision }),
                  }),
                ),
              Update: () =>
                Effect.fail(
                  new ResourceCommandUnsupported({
                    command: ResourceCommand.Apply({ decision }),
                  }),
                ),
              Delete: () =>
                Effect.fail(
                  new ResourceCommandUnsupported({
                    command: ResourceCommand.Apply({ decision }),
                  }),
                ),
            }),
          );
        },
      );

      return {
        read,
        diff,
        create,
        repair,
        destroy,
        apply,
        execute: Effect.fn("BucketNotificationResourcePolicy.execute")(
          function* (command: ResourceCommand) {
            return yield* Match.value(command).pipe(
              Match.tagsExhaustive({
                Read: ({ node }) => read(node),
                Diff: ({ node, observation }) => diff(node, observation),
                Apply: ({ decision }) => apply(decision),
                Create: ({ node }) => create(node),
                Update: () =>
                  Effect.fail(new ResourceCommandUnsupported({ command })),
                Delete: () =>
                  Effect.fail(new ResourceCommandUnsupported({ command })),
                Destroy: () =>
                  Effect.fail(new ResourceCommandUnsupported({ command })),
              }),
            );
          },
        ),
      };
    }),
  },
) {}
