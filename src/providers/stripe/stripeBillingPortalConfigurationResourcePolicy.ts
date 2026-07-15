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
  StripeBillingPortalConfigurationLifecycle,
  type StripeBillingPortalConfigurationOutputs,
  StripeBillingPortalConfigurationOutputsSchema,
  StripeBillingPortalConfigurationPropsSchema,
  StripeBillingPortalConfigurationUpdatePropsSchema,
  stripeBillingPortalConfigurationOutputsFromState,
} from "./stripeBillingPortalConfiguration.js";

/**
 * Billing Portal configuration commands let applications create customer
 * self-service policy through Nomoss instead of Stripe Dashboard setup.
 */
export class StripeBillingPortalConfigurationResourcePolicy extends Context.Service<StripeBillingPortalConfigurationResourcePolicy>()(
  "nomoss/providers/stripe/stripeBillingPortalConfigurationResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripeBillingPortalConfigurationLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripeBillingPortalConfigurationPropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn(
        "StripeBillingPortalConfigurationResourcePolicy.resourceNode",
      )(function* (
        node: ResourceNode,
        outputs: StripeBillingPortalConfigurationOutputs,
      ) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingPortalConfigurationPropsSchema,
        );
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: StripeBillingPortalConfigurationPropsSchema,
          outputsSchema: StripeBillingPortalConfigurationOutputsSchema,
          props,
          outputs,
        });

        return appliedNode;
      });

      const create = Effect.fn(
        "StripeBillingPortalConfigurationResourcePolicy.create",
      )(function* (node: ResourceNode) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingPortalConfigurationPropsSchema,
        );
        const configuration =
          yield* lifecycle.createBillingPortalConfiguration(props);
        const outputs =
          stripeBillingPortalConfigurationOutputsFromState(configuration);
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Created({ node: appliedNode });
      });

      const update = Effect.fn(
        "StripeBillingPortalConfigurationResourcePolicy.update",
      )(function* (node: ResourceNode, current: ResourceNode) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingPortalConfigurationPropsSchema,
        );
        const currentOutputs = yield* model.decodeOutputs(
          current,
          StripeBillingPortalConfigurationOutputsSchema,
        );
        const input =
          yield* StripeBillingPortalConfigurationUpdatePropsSchema.makeEffect({
            business_profile: props.business_profile,
            configuration: currentOutputs.BillingPortalConfigurationId,
            default_return_url: props.default_return_url,
            features: props.features,
            login_page: props.login_page,
            metadata: props.metadata,
            name: props.name,
          });
        const configuration =
          yield* lifecycle.updateBillingPortalConfiguration(input);
        const outputs =
          stripeBillingPortalConfigurationOutputsFromState(configuration);
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Updated({ node: appliedNode });
      });

      const destroy = Effect.fn(
        "StripeBillingPortalConfigurationResourcePolicy.destroy",
      )(function* (node: ResourceNode) {
        const outputs = yield* model.decodeOutputs(
          node,
          StripeBillingPortalConfigurationOutputsSchema,
        );

        yield* lifecycle.deactivateBillingPortalConfiguration(
          outputs.BillingPortalConfigurationId,
        );

        return ResourceCommandResult.Destroyed({ node });
      });

      const apply = Effect.fn(
        "StripeBillingPortalConfigurationResourcePolicy.apply",
      )(function* (decision: PlanDecision) {
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
        execute: Effect.fn(
          "StripeBillingPortalConfigurationResourcePolicy.execute",
        )(function* (command: ResourceCommand) {
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
