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
  StripeProductLifecycle,
  type StripeProductOutputs,
  StripeProductOutputsSchema,
  StripeProductPropsSchema,
  StripeProductUpdatePropsSchema,
  stripeProductOutputsFromState,
} from "./stripeProduct.js";

/**
 * Stripe Product commands use the shared resource command protocol so the
 * Example pricing catalog can apply beside dependent Price resources.
 */
export class StripeProductResourcePolicy extends Context.Service<StripeProductResourcePolicy>()(
  "nomoss/providers/stripe/stripeProductResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripeProductLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripeProductPropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn(
        "StripeProductResourcePolicy.resourceNode",
      )(function* (node: ResourceNode, outputs: StripeProductOutputs) {
        const props = yield* model.decodeProps(node, StripeProductPropsSchema);
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: StripeProductPropsSchema,
          outputsSchema: StripeProductOutputsSchema,
          props,
          outputs,
        });

        return appliedNode;
      });

      const create = Effect.fn("StripeProductResourcePolicy.create")(function* (
        node: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, StripeProductPropsSchema);
        const product = yield* lifecycle.createProduct(props);
        const outputs = stripeProductOutputsFromState(product);
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Created({ node: appliedNode });
      });

      const update = Effect.fn("StripeProductResourcePolicy.update")(function* (
        node: ResourceNode,
        current: ResourceNode,
      ) {
        const props = yield* model.decodeProps(node, StripeProductPropsSchema);
        const currentOutputs = yield* model.decodeOutputs(
          current,
          StripeProductOutputsSchema,
        );
        const input = yield* StripeProductUpdatePropsSchema.makeEffect({
          id: currentOutputs.ProductId,
          active: props.active,
          description: props.description,
          metadata: props.metadata,
          name: props.name,
          statement_descriptor: props.statement_descriptor,
          tax_code: props.tax_code,
          unit_label: props.unit_label,
          url: props.url,
        });
        const product = yield* lifecycle.updateProduct(input);
        const outputs = stripeProductOutputsFromState(product);
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Updated({ node: appliedNode });
      });

      const destroy = Effect.fn("StripeProductResourcePolicy.destroy")(
        function* (node: ResourceNode) {
          const outputs = yield* model.decodeOutputs(
            node,
            StripeProductOutputsSchema,
          );

          yield* lifecycle.deactivateProduct(outputs.ProductId);

          return ResourceCommandResult.Destroyed({ node });
        },
      );

      const apply = Effect.fn("StripeProductResourcePolicy.apply")(function* (
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
        execute: Effect.fn("StripeProductResourcePolicy.execute")(function* (
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
