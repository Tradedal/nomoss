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
  type StripeBillingConfigurationExportDocument,
  StripeBillingConfigurationExportLifecycle,
  type StripeBillingConfigurationExportOutputs,
  StripeBillingConfigurationExportOutputsSchema,
  StripeBillingConfigurationExportPropsSchema,
  StripeBillingConfigurationExportResolvedPropsSchema,
} from "./stripeBillingConfigurationExport.js";

/**
 * The export policy receives props after core lifecycle has resolved resource
 * refs, then writes the runtime billing document consumed by application code.
 */
export class StripeBillingConfigurationExportResourcePolicy extends Context.Service<StripeBillingConfigurationExportResourcePolicy>()(
  "nomoss/providers/stripe/stripeBillingConfigurationExportResourcePolicy",
  {
    make: Effect.gen(function* () {
      const lifecycle = yield* StripeBillingConfigurationExportLifecycle;
      const model = yield* ResourceModel;
      const schema = yield* readResourceSchemaAnnotation(
        StripeBillingConfigurationExportPropsSchema,
      ).pipe(Effect.fromOption);

      const resourceNode = Effect.fn(
        "StripeBillingConfigurationExportResourcePolicy.resourceNode",
      )(function* (
        node: ResourceNode,
        outputs: StripeBillingConfigurationExportOutputs,
      ) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingConfigurationExportResolvedPropsSchema,
        );
        const appliedNode = yield* model.nodeFromResource({
          key: node.key,
          propsSchema: StripeBillingConfigurationExportResolvedPropsSchema,
          outputsSchema: StripeBillingConfigurationExportOutputsSchema,
          props,
          outputs,
        });

        return appliedNode;
      });

      const create = Effect.fn(
        "StripeBillingConfigurationExportResourcePolicy.create",
      )(function* (node: ResourceNode) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingConfigurationExportResolvedPropsSchema,
        );
        const document: StripeBillingConfigurationExportDocument = {
          apiVersion: props.apiVersion,
          billingPortalConfigurationId: props.billingPortalConfigurationId,
          mode: props.mode,
          prices: props.prices,
          products: props.products,
          webhookEndpoint: props.webhookEndpoint,
        };
        const outputs = yield* lifecycle.writeBillingConfigurationExport({
          document,
          outputPath: props.outputPath,
        });
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Created({ node: appliedNode });
      });

      const update = Effect.fn(
        "StripeBillingConfigurationExportResourcePolicy.update",
      )(function* (node: ResourceNode) {
        const props = yield* model.decodeProps(
          node,
          StripeBillingConfigurationExportResolvedPropsSchema,
        );
        const document: StripeBillingConfigurationExportDocument = {
          apiVersion: props.apiVersion,
          billingPortalConfigurationId: props.billingPortalConfigurationId,
          mode: props.mode,
          prices: props.prices,
          products: props.products,
          webhookEndpoint: props.webhookEndpoint,
        };
        const outputs = yield* lifecycle.writeBillingConfigurationExport({
          document,
          outputPath: props.outputPath,
        });
        const appliedNode = yield* resourceNode(node, outputs);

        return ResourceCommandResult.Updated({ node: appliedNode });
      });

      const destroy = Effect.fn(
        "StripeBillingConfigurationExportResourcePolicy.destroy",
      )(function* (node: ResourceNode) {
        const outputs = yield* model.decodeOutputs(
          node,
          StripeBillingConfigurationExportOutputsSchema,
        );

        yield* lifecycle.deleteBillingConfigurationExport(outputs.OutputPath);

        return ResourceCommandResult.Destroyed({ node });
      });

      const apply = Effect.fn(
        "StripeBillingConfigurationExportResourcePolicy.apply",
      )(function* (decision: PlanDecision) {
        return yield* Match.value(decision).pipe(
          Match.tagsExhaustive({
            Create: ({ node }) => create(node),
            Update: ({ node }) => update(node),
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
          "StripeBillingConfigurationExportResourcePolicy.execute",
        )(function* (command: ResourceCommand) {
          return yield* Match.value(command).pipe(
            Match.tagsExhaustive({
              Read: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Diff: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
              Apply: ({ decision }) => apply(decision),
              Create: () =>
                Effect.fail(new ResourceCommandUnsupported({ command })),
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
