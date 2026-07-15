import { Context, Effect, Match, Struct } from "effect";

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
  StripeCustomerLifecycle,
  type StripeCustomerOutputs,
  StripeCustomerOutputsSchema,
  StripeCustomerPropsSchema,
  StripeCustomerUpdatePropsSchema,
  stripeCustomerOutputsFromState,
} from "./stripeCustomer.js";

/**
 * Stripe Customer commands run through the shared resource command protocol
 * so stack execution can mix providers without app-side branching.
 */
export class StripeCustomerResourcePolicy extends Context.Service<StripeCustomerResourcePolicy>()(
  "nomoss/providers/stripe/stripeCustomerResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripeCustomerLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripeCustomerPropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn(
        "StripeCustomerResourcePolicy.resourceNode",
      )(function* (node: ResourceNode, outputs: StripeCustomerOutputs) {
        const props = yield* model.decodeProps(node, StripeCustomerPropsSchema);
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: StripeCustomerPropsSchema,
          outputsSchema: StripeCustomerOutputsSchema,
          props,
          outputs,
        });

        return appliedNode;
      });

      const create = Effect.fn("StripeCustomerResourcePolicy.create")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            StripeCustomerPropsSchema,
          );
          const customer = yield* lifecycle.createCustomer(props);
          const outputs = stripeCustomerOutputsFromState(customer);
          const appliedNode = yield* resourceNode(node, outputs);

          return ResourceCommandResult.Created({ node: appliedNode });
        },
      );

      const update = Effect.fn("StripeCustomerResourcePolicy.update")(
        function* (node: ResourceNode, current: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            StripeCustomerPropsSchema,
          );
          const currentOutputs = yield* model.decodeOutputs(
            current,
            StripeCustomerOutputsSchema,
          );
          const input = yield* StripeCustomerUpdatePropsSchema.makeEffect(
            Struct.assign(props, {
              customer: currentOutputs.CustomerId,
            }),
          );
          const customer = yield* lifecycle.updateCustomer(input);
          const outputs = stripeCustomerOutputsFromState(customer);
          const appliedNode = yield* resourceNode(node, outputs);

          return ResourceCommandResult.Updated({ node: appliedNode });
        },
      );

      const destroy = Effect.fn("StripeCustomerResourcePolicy.destroy")(
        function* (node: ResourceNode) {
          const outputs = yield* model.decodeOutputs(
            node,
            StripeCustomerOutputsSchema,
          );

          yield* lifecycle.deleteCustomer(outputs.CustomerId);

          return ResourceCommandResult.Destroyed({ node });
        },
      );

      const apply = Effect.fn("StripeCustomerResourcePolicy.apply")(function* (
        decision: PlanDecision,
      ) {
        return yield* Match.value(decision).pipe(
          Match.tagsExhaustive({
            Create: ({ node }) => create(node),
            Update: ({ node, current }) => update(node, current),
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
        update,
        destroy,
        apply,
        execute: Effect.fn("StripeCustomerResourcePolicy.execute")(function* (
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
