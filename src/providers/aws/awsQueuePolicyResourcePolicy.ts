import { Context, Effect, Match, Option, type Schema } from "effect";

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
  QueuePolicyLifecycleService,
  type QueuePolicyObservedState,
  QueuePolicyObservedStateSchema,
  QueuePolicyPropsSchema,
  queuePoliciesEqual,
} from "./awsQueuePolicy.js";

/**
 * The AWS resource dispatcher reaches queue policy behavior through this
 * policy, keeping graph commands separate from SQS policy attributes.
 */
export class QueuePolicyResourcePolicy extends Context.Service<QueuePolicyResourcePolicy>()(
  "nomoss/providers/aws/awsQueuePolicyResourcePolicy/QueuePolicyResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* QueuePolicyLifecycleService;
      const model = yield* ResourceModel;
      const resourcePolicy = yield* ResourcePolicy;

      const decidePresent = Effect.fn(
        "QueuePolicyResourcePolicy.decidePresent",
      )(function* (node: ResourceNode, observed: Schema.Json) {
        const props = yield* model.decodeProps(node, QueuePolicyPropsSchema);
        const state = yield* model.decodeJson(
          QueuePolicyObservedStateSchema,
          observed,
        );
        const resolved = yield* lifecycle.resolve(props);
        const desiredPolicy = resolved.policy;
        const observedPolicy = state.attributes.Attributes?.Policy;
        const decision = Match.value(
          queuePoliciesEqual(desiredPolicy, observedPolicy),
        ).pipe(
          Match.when(true, () => PlanDecision.NoOp({ node })),
          Match.orElse(() =>
            PlanDecision.Repair({
              node,
              reason: "queue policy differs from desired state",
              changes: Option.match(Option.fromUndefinedOr(observedPolicy), {
                onNone: () => [
                  PlanRepairChange.Added({
                    path: [
                      "aws",
                      "sqs",
                      "queue-policy",
                      "attributes",
                      "Policy",
                    ],
                    after: desiredPolicy,
                  }),
                ],
                onSome: (policy) => [
                  PlanRepairChange.Updated({
                    path: [
                      "aws",
                      "sqs",
                      "queue-policy",
                      "attributes",
                      "Policy",
                    ],
                    before: policy,
                    after: desiredPolicy,
                  }),
                ],
              }),
            }),
          ),
        );

        return decision;
      });
      const read = Effect.fn("QueuePolicyResourcePolicy.read")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePolicyPropsSchema);
        const output = yield* lifecycle
          .read(props)
          .pipe(
            Effect.catchTag("QueuePolicyReadFailed", () =>
              Effect.succeed(Option.none<QueuePolicyObservedState>()),
            ),
          );
        const result = yield* Effect.fromOption(output).pipe(
          Effect.flatMap((state: QueuePolicyObservedState) =>
            Effect.map(
              model.encodeJson(QueuePolicyObservedStateSchema, state),
              (observed) => resourcePolicy.present(node, observed),
            ),
          ),
          Effect.catchNoSuchElement,
          Effect.map(Option.getOrElse(() => resourcePolicy.missing(node))),
        );

        return result;
      });

      const diff = Effect.fn("QueuePolicyResourcePolicy.diff")(function* (
        node: ResourceNode,
        observation: ResourceObservation,
      ) {
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
      });

      const create = Effect.fn("QueuePolicyResourcePolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePolicyPropsSchema);
        yield* lifecycle.create(props);

        return ResourceCommandResult.Created({ node });
      });

      const repair = Effect.fn("QueuePolicyResourcePolicy.repair")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePolicyPropsSchema);
        yield* lifecycle.create(props);

        return ResourceCommandResult.Updated({ node });
      });

      const destroy = Effect.fn("QueuePolicyResourcePolicy.destroy")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePolicyPropsSchema);
        yield* lifecycle.destroy(props);

        return ResourceCommandResult.Destroyed({ node });
      });

      const apply = Effect.fn("QueuePolicyResourcePolicy.apply")(function* (
        decision: PlanDecisionValue,
      ) {
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
      });

      const execute = Effect.fn("QueuePolicyResourcePolicy.execute")(function* (
        command: ResourceCommand,
      ) {
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
      });

      return {
        read,
        diff,
        create,
        repair,
        destroy,
        apply,
        execute,
      };
    }),
  },
) {}
