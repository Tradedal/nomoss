import { Context, Effect, Match, Option, Schema } from "effect";

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
  StripeWebhookEndpointLifecycle,
  type StripeWebhookEndpointOutputs,
  StripeWebhookEndpointOutputsSchema,
  StripeWebhookEndpointPropsSchema,
  StripeWebhookEndpointRequestPropsSchema,
  StripeWebhookEndpointUpdatePropsSchema,
  stripeWebhookEndpointOutputsFromState,
} from "./stripeWebhookEndpoint.js";

/**
 * Webhook endpoint commands keep Stripe event delivery setup in Nomoss while
 * backend webhook code stays responsible for request verification and handling.
 */
export class StripeWebhookEndpointResourcePolicy extends Context.Service<StripeWebhookEndpointResourcePolicy>()(
  "nomoss/providers/stripe/stripeWebhookEndpointResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripeWebhookEndpointLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripeWebhookEndpointPropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn(
        "StripeWebhookEndpointResourcePolicy.resourceNode",
      )(function* (node: ResourceNode, outputs: StripeWebhookEndpointOutputs) {
        const props = yield* model.decodeProps(
          node,
          StripeWebhookEndpointPropsSchema,
        );
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: StripeWebhookEndpointPropsSchema,
          outputsSchema: StripeWebhookEndpointOutputsSchema,
          props,
          outputs,
        });

        return appliedNode;
      });
      const currentProps = (current: ResourceNode) =>
        Schema.decodeUnknownOption(StripeWebhookEndpointPropsSchema)(
          current.props,
        ).pipe(
          Option.match({
            onNone: () =>
              Effect.flatMap(
                Schema.decodeUnknownEffect(
                  StripeWebhookEndpointRequestPropsSchema,
                )(current.props),
                (endpoint) =>
                  StripeWebhookEndpointPropsSchema.makeEffect({ endpoint }),
              ),
            onSome: Effect.succeed,
          }),
        );
      const create = Effect.fn("StripeWebhookEndpointResourcePolicy.create")(
        function* (node: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            StripeWebhookEndpointPropsSchema,
          );
          const endpoint = yield* lifecycle.createWebhookEndpoint(
            props.endpoint,
          );
          const outputs = stripeWebhookEndpointOutputsFromState(endpoint);
          const appliedNode = yield* resourceNode(node, outputs);

          return ResourceCommandResult.Created({ node: appliedNode });
        },
      );

      const update = Effect.fn("StripeWebhookEndpointResourcePolicy.update")(
        function* (node: ResourceNode, current: ResourceNode) {
          const props = yield* model.decodeProps(
            node,
            StripeWebhookEndpointPropsSchema,
          );
          const previousProps = yield* currentProps(current);
          const currentOutputs = yield* model.decodeOutputs(
            current,
            StripeWebhookEndpointOutputsSchema,
          );
          const input =
            yield* StripeWebhookEndpointUpdatePropsSchema.makeEffect({
              webhook_endpoint: currentOutputs.WebhookEndpointId,
              description: props.endpoint.description,
              enabled_events: props.endpoint.enabled_events,
              metadata: props.endpoint.metadata,
              url: props.endpoint.url,
            });
          const endpoint = yield* Match.value(
            props.rotationKey !== previousProps.rotationKey,
          ).pipe(
            Match.when(true, () =>
              lifecycle.rotateWebhookEndpoint(
                currentOutputs.WebhookEndpointId,
                props.endpoint,
              ),
            ),
            Match.orElse(() => lifecycle.updateWebhookEndpoint(input)),
          );
          const outputs = stripeWebhookEndpointOutputsFromState(
            endpoint,
            currentOutputs,
          );
          const appliedNode = yield* resourceNode(node, outputs);

          return ResourceCommandResult.Updated({ node: appliedNode });
        },
      );

      const destroy = Effect.fn("StripeWebhookEndpointResourcePolicy.destroy")(
        function* (node: ResourceNode) {
          const outputs = yield* model.decodeOutputs(
            node,
            StripeWebhookEndpointOutputsSchema,
          );

          yield* lifecycle.deleteWebhookEndpoint(outputs.WebhookEndpointId);

          return ResourceCommandResult.Destroyed({ node });
        },
      );

      const apply = Effect.fn("StripeWebhookEndpointResourcePolicy.apply")(
        function* (decision: PlanDecision) {
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
        },
      );

      return {
        schema,
        create,
        update,
        destroy,
        apply,
        execute: Effect.fn("StripeWebhookEndpointResourcePolicy.execute")(
          function* (command: ResourceCommand) {
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
          },
        ),
      };
    }),
  },
) {}
