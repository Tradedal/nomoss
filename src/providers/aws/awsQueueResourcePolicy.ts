import {
  Array as Arr,
  Context,
  Effect,
  Equal,
  Match,
  Option,
  Order,
  Record,
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
import {
  ResourceModel,
  type ResourceNode,
  readResourceSchemaAnnotation,
} from "../../core/model.js";
import { ResourcePolicy } from "../../core/resourcePolicy.js";
import {
  QueueLifecycleService,
  type QueueObservedState,
  QueueObservedStateSchema,
  QueueOutputsSchema,
  QueuePropsSchema,
  QueueUrlMissing,
  queueOutputsFromState,
} from "./awsQueue.js";
import { AwsTagging } from "./awsTagging.js";

const definedTags = (tags: Record<string, string | undefined>) =>
  Record.filter(tags, (value): value is string => value !== undefined);

const formatTagValue = (value: string | undefined) =>
  Match.value(value).pipe(
    Match.when(undefined, () => "undefined"),
    Match.orElse((defined) => `"${defined}"`),
  );

/**
 * A live SQS queue can exist with a tag set that differs from its stack
 * declaration. The plan renderer uses these per-key changes to show what the
 * queue repair command will reconcile through `AwsTagging`, including tags the
 * declaration no longer contains.
 */
const queueTagDecision = (
  node: ResourceNode,
  desiredTags: Record<string, string>,
  observedTags: Record<string, string>,
) => {
  const tagKeys: ReadonlyArray<string> = Arr.sort(
    Arr.union(Record.keys(desiredTags), Record.keys(observedTags)),
    Order.String,
  );

  return Match.value(Equal.equals(desiredTags, observedTags)).pipe(
    Match.when(false, () =>
      PlanDecision.Repair({
        node,
        reason: "queue tags differ from desired state",
        changes: Arr.flatMap(
          Arr.filter<string>(
            tagKeys,
            (key) => desiredTags[key] !== observedTags[key],
          ),
          (key): ReadonlyArray<PlanRepairChange> =>
            Option.match(Option.fromUndefinedOr(desiredTags[key]), {
              onNone: () => [
                PlanRepairChange.Removed({
                  path: ["aws", "sqs", "queue", "tags", key],
                  before: formatTagValue(observedTags[key]),
                }),
              ],
              onSome: (desiredTag) => [
                PlanRepairChange.Updated({
                  path: ["aws", "sqs", "queue", "tags", key],
                  before: formatTagValue(observedTags[key]),
                  after: formatTagValue(desiredTag),
                }),
              ],
            }),
        ),
      }),
    ),
    Match.orElse(() => PlanDecision.NoOp({ node })),
  );
};

/**
 * The AWS resource dispatcher reaches queue behavior through this policy so
 * SQS reads, writes, and tag reconciliation stay in the provider path.
 */
export class QueueResourcePolicy extends Context.Service<QueueResourcePolicy>()(
  "nomoss/providers/aws/awsQueueResourcePolicy/QueueResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* QueueLifecycleService;
      const tagging = yield* AwsTagging;
      const model = yield* ResourceModel;
      const resourcePolicy = yield* ResourcePolicy;
      const schema = yield* readResourceSchemaAnnotation(QueuePropsSchema).pipe(
        Effect.fromOption,
      );

      const decidePresent = (node: ResourceNode, observed: Schema.Json) =>
        model
          .decodeProps(node, QueuePropsSchema)
          .pipe(
            Effect.flatMap((props) =>
              Effect.map(
                model.decodeJson(QueueObservedStateSchema, observed),
                (state) =>
                  queueTagDecision(
                    node,
                    definedTags(props.tags ?? {}),
                    definedTags(state.tags.Tags ?? {}),
                  ),
              ),
            ),
          );

      const read = Effect.fn("QueueResourcePolicy.read")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePropsSchema);
        const output = yield* lifecycle.read(props);
        const result = yield* Effect.fromOption(output).pipe(
          Effect.flatMap((state: QueueObservedState) =>
            Effect.map(
              model.encodeJson(QueueObservedStateSchema, state),
              (observed) => resourcePolicy.present(node, observed),
            ),
          ),
          Effect.catchNoSuchElement,
          Effect.map(Option.getOrElse(() => resourcePolicy.missing(node))),
        );

        return result;
      });
      const diff = Effect.fn("QueueResourcePolicy.diff")(function* (
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
      const create = Effect.fn("QueueResourcePolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePropsSchema);
        const state = yield* lifecycle.create(props);
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: QueuePropsSchema,
          outputsSchema: QueueOutputsSchema,
          props,
          outputs: queueOutputsFromState(state),
        });

        return ResourceCommandResult.Created({ node: appliedNode });
      });
      const repair = Effect.fn("QueueResourcePolicy.repair")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePropsSchema);
        const observed = yield* lifecycle.read(props);
        const state = yield* Effect.fromOption(observed);
        const queueUrl = yield* Option.match(
          Option.fromUndefinedOr(state.url.QueueUrl),
          {
            onNone: () =>
              Effect.fail(new QueueUrlMissing({ queueName: props.QueueName })),
            onSome: Effect.succeed,
          },
        );

        yield* tagging.reconcile({
          target: { _tag: "SqsQueue", queueUrl },
          desiredTags: definedTags(props.tags ?? {}),
          observedTags: definedTags(state.tags.Tags ?? {}),
        });

        return ResourceCommandResult.Updated({ node });
      });
      const destroy = Effect.fn("QueueResourcePolicy.destroy")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, QueuePropsSchema);
        yield* lifecycle.destroy(props);

        return ResourceCommandResult.Destroyed({ node });
      });
      const apply = Effect.fn("QueueResourcePolicy.apply")(function* (
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
        schema,
        read,
        diff,
        create,
        repair,
        destroy,
        apply,
        execute: Effect.fn("QueueResourcePolicy.execute")(function* (
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
