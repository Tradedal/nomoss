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
  BucketLifecycleService,
  type BucketObservedState,
  BucketObservedStateSchema,
  BucketPropsSchema,
} from "./awsBucket.js";
import { AwsTagging } from "./awsTagging.js";

/**
 * The AWS resource dispatcher reaches bucket behavior through this policy so
 * tag reconciliation and force-destroy semantics stay bucket-specific.
 */
export class BucketResourcePolicy extends Context.Service<BucketResourcePolicy>()(
  "nomoss/providers/aws/awsBucketResourcePolicy/BucketResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* BucketLifecycleService;
      const tagging = yield* AwsTagging;
      const model = yield* ResourceModel;
      const resourcePolicy = yield* ResourcePolicy;

      const formatTagValue = (value: string | undefined) =>
        Match.value(value).pipe(
          Match.when(undefined, () => "undefined"),
          Match.orElse((defined) => `"${defined}"`),
        );

      const decidePresent = Effect.fn("BucketResourcePolicy.decidePresent")(
        function* (node: ResourceNode, observed: Schema.Json) {
          const state = yield* model.decodeJson(
            BucketObservedStateSchema,
            observed,
          );
          const observedTags = Option.match(
            Option.fromUndefinedOr(state.tagging),
            {
              onNone: () => [],
              onSome: (tagging) => tagging.TagSet,
            },
          );
          const decision = Match.value(observedTags.length > 0).pipe(
            Match.when(true, () =>
              PlanDecision.Repair({
                node,
                reason: "bucket tags differ from desired state",
                changes: Arr.map(observedTags, (tag) =>
                  PlanRepairChange.Removed({
                    path: ["aws", "s3", "bucket", "tags", tag.Key],
                    before: formatTagValue(tag.Value),
                  }),
                ),
              }),
            ),
            Match.orElse(() => PlanDecision.NoOp({ node })),
          );

          return decision;
        },
      );
      const read = Effect.fn("BucketResourcePolicy.read")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, BucketPropsSchema);
        const output = yield* lifecycle.read(props);
        const result = yield* Effect.fromOption(output).pipe(
          Effect.flatMap((state: BucketObservedState) =>
            Effect.map(
              model.encodeJson(BucketObservedStateSchema, state),
              (observed) => resourcePolicy.present(node, observed),
            ),
          ),
          Effect.catchNoSuchElement,
          Effect.map(Option.getOrElse(() => resourcePolicy.missing(node))),
        );

        return result;
      });
      const diff = Effect.fn("BucketResourcePolicy.diff")(function* (
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
      const create = Effect.fn("BucketResourcePolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, BucketPropsSchema);
        yield* lifecycle.create(props);

        return ResourceCommandResult.Created({ node });
      });
      const repair = Effect.fn("BucketResourcePolicy.repair")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, BucketPropsSchema);
        yield* tagging.reconcile({
          target: { _tag: "S3Bucket", bucket: props.Bucket },
          desiredTags: {},
          observedTags: {},
        });

        return ResourceCommandResult.Updated({ node });
      });
      const destroy = Effect.fn("BucketResourcePolicy.destroy")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, BucketPropsSchema);
        yield* lifecycle.destroy(props);

        return ResourceCommandResult.Destroyed({ node });
      });
      const apply = Effect.fn("BucketResourcePolicy.apply")(function* (
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

      return {
        read,
        diff,
        create,
        repair,
        destroy,
        apply,
        execute: Effect.fn("BucketResourcePolicy.execute")(function* (
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
        }),
      };
    }),
  },
) {}
