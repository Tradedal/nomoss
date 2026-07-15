import { Context, Effect, Match } from "effect";

import {
  type PlanDecision,
  ResourceCommand,
  ResourceCommandResult,
  ResourceCommandUnsupported,
} from "../../core/lifecycle.js";
import {
  ResourceModel,
  type ResourceNode,
  readResourceSchemaAnnotation,
} from "../../core/model.js";
import {
  StripePriceLifecycle,
  type StripePriceOutputs,
  StripePriceOutputsSchema,
  StripePricePropsSchema,
  stripePriceOutputsFromState,
} from "./stripePrice.js";

/**
 * Stripe Price commands create a new Price when desired pricing inputs change,
 * matching Stripe's immutable amount and recurring terms model.
 */
export class StripePriceResourcePolicy extends Context.Service<StripePriceResourcePolicy>()(
  "nomoss/providers/stripe/stripePriceResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripePriceLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripePricePropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn("StripePriceResourcePolicy.resourceNode")(
        function* (node: ResourceNode, outputs: StripePriceOutputs) {
          const props = yield* model.decodeProps(node, StripePricePropsSchema);
          const appliedNode = yield* model.nodeFromResource({
            key: node.key,
            propsSchema: StripePricePropsSchema,
            outputsSchema: StripePriceOutputsSchema,
            props,
            outputs,
          });

          return appliedNode;
        },
      );

      const create = Effect.fn("StripePriceResourcePolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, StripePricePropsSchema);
        const price = yield* lifecycle.createPrice(props);
        const outputs = stripePriceOutputsFromState(price);
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Created({ node: appliedNode });
      });

      const replace = Effect.fn("StripePriceResourcePolicy.replace")(function* (
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const outputs = yield* model.decodeOutputs(
          current,
          StripePriceOutputsSchema,
        );

        yield* lifecycle.deactivatePrice(outputs.PriceId);

        return yield* create(node).pipe(
          Effect.map(({ node: appliedNode }) =>
            ResourceCommandResult.Updated({ node: appliedNode }),
          ),
        );
      });

      const destroy = Effect.fn("StripePriceResourcePolicy.destroy")(function* (
        node: ResourceNode,
      ) {
        const outputs = yield* model.decodeOutputs(
          node,
          StripePriceOutputsSchema,
        );

        yield* lifecycle.deactivatePrice(outputs.PriceId);

        return ResourceCommandResult.Destroyed({ node });
      });

      const apply = Effect.fn("StripePriceResourcePolicy.apply")(function* (
        decision: PlanDecision,
      ) {
        return yield* Match.value(decision).pipe(
          Match.tagsExhaustive({
            Create: ({ node }) => create(node),
            Update: ({ node, current }) => replace(node, current),
            Destroy: ({ node }) => destroy(node),
            NoOp: () =>
              Effect.fail(
                new ResourceCommandUnsupported({
                  command: ResourceCommand.Apply({ decision }),
                }),
              ),
            Repair: () =>
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
        create,
        replace,
        destroy,
        apply,
        execute: Effect.fn("StripePriceResourcePolicy.execute")(function* (
          command: ResourceCommand,
        ) {
          return yield* Match.value(command).pipe(
            Match.tagsExhaustive({
              Read: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Diff: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Apply: ({ decision }) => apply(decision),
              Create: ({ node }) => create(node),
              Update: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Delete: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Destroy: ({ node }) => destroy(node),
            }),
          );
        }),
      };
    }),
  },
) {}
