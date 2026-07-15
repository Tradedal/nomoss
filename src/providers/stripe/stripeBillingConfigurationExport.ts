import { Context, Effect, FileSystem, Schema } from "effect";

import {
  annotateResourceSchema,
  ResourceOutputRefSchema,
} from "../../core/model.js";

/**
 * Runtime applications read this document after Nomoss has applied the Stripe
 * catalog. The document stores concrete Stripe ids instead of declaration-time
 * refs, so backend and website code can load billing configuration without
 * dashboard lookups or hardcoded environment ids.
 */
export const StripeBillingConfigurationExportDocumentSchema = Schema.Struct({
  apiVersion: Schema.String,
  billingPortalConfigurationId: Schema.String,
  mode: Schema.Literals(["test", "live"]),
  prices: Schema.Struct({
    activeMonthly: Schema.String,
    advancedMonthly: Schema.String,
    starterMonthly: Schema.String,
  }),
  products: Schema.Struct({
    active: Schema.String,
    advanced: Schema.String,
    starter: Schema.String,
  }),
  webhookEndpoint: Schema.Struct({
    id: Schema.String,
  }),
});

export type StripeBillingConfigurationExportDocument = Schema.Schema.Type<
  typeof StripeBillingConfigurationExportDocumentSchema
>;

/**
 * Export declarations keep Price refs until apply because Stripe generates
 * Price ids during resource creation. The resource policy resolves these refs
 * from saved Nomoss state after dependent resources have applied.
 */
export const StripeBillingConfigurationExportReferenceSetSchema = Schema.Struct(
  {
    activeMonthly: ResourceOutputRefSchema,
    advancedMonthly: ResourceOutputRefSchema,
    starterMonthly: ResourceOutputRefSchema,
  },
);

export const StripeBillingConfigurationExportWebhookEndpointReferenceSetSchema =
  Schema.Struct({
    id: ResourceOutputRefSchema,
  });

export const StripeBillingConfigurationExportProductReferenceSetSchema =
  Schema.Struct({
    active: ResourceOutputRefSchema,
    advanced: ResourceOutputRefSchema,
    starter: ResourceOutputRefSchema,
  });

/**
 * The export resource participates in the dependency graph through refs while
 * the written file remains a plain runtime configuration document. The stack
 * planner can therefore order the export after Product, Price, and Portal
 * resources.
 */
export const StripeBillingConfigurationExportPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      apiVersion: Schema.String,
      billingPortalConfigurationId: ResourceOutputRefSchema,
      mode: Schema.Literals(["test", "live"]),
      outputPath: Schema.NonEmptyString,
      prices: StripeBillingConfigurationExportReferenceSetSchema,
      products: StripeBillingConfigurationExportProductReferenceSetSchema,
      webhookEndpoint:
        StripeBillingConfigurationExportWebhookEndpointReferenceSetSchema,
    }),
    {
      provider: "stripe",
      service: "billing",
      resource: "configuration-export",
      operation: "create",
      stateSecretOutputKeys: [],
    },
  );

export type StripeBillingConfigurationExportProps = Schema.Schema.Type<
  typeof StripeBillingConfigurationExportPropsSchema
>;

export const StripeBillingConfigurationExportResolvedPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      apiVersion: Schema.String,
      billingPortalConfigurationId: Schema.String,
      mode: Schema.Literals(["test", "live"]),
      outputPath: Schema.NonEmptyString,
      prices: StripeBillingConfigurationExportDocumentSchema.fields.prices,
      products: StripeBillingConfigurationExportDocumentSchema.fields.products,
      webhookEndpoint:
        StripeBillingConfigurationExportDocumentSchema.fields.webhookEndpoint,
    }),
    {
      provider: "stripe",
      service: "billing",
      resource: "configuration-export",
      operation: "create",
      stateSecretOutputKeys: [],
    },
  );

export type StripeBillingConfigurationExportResolvedProps = Schema.Schema.Type<
  typeof StripeBillingConfigurationExportResolvedPropsSchema
>;

/**
 * The filesystem lifecycle receives only the final document and output path.
 * The resource policy resolves refs before file writing, so this lifecycle does
 * not depend on Nomoss graph or state services.
 */
export const StripeBillingConfigurationExportWriteInputSchema = Schema.Struct({
  document: StripeBillingConfigurationExportDocumentSchema,
  outputPath: Schema.NonEmptyString,
});

export type StripeBillingConfigurationExportWriteInput = Schema.Schema.Type<
  typeof StripeBillingConfigurationExportWriteInputSchema
>;

export const StripeBillingConfigurationExportOutputsSchema = Schema.Struct({
  OutputPath: Schema.String,
});

export type StripeBillingConfigurationExportOutputs = Schema.Schema.Type<
  typeof StripeBillingConfigurationExportOutputsSchema
>;

const StripeBillingConfigurationExportFileSchema = Schema.fromJsonString(
  StripeBillingConfigurationExportDocumentSchema,
);

/**
 * This lifecycle writes the already-resolved billing configuration artifact.
 * The provider policy is responsible for turning Nomoss resource refs into
 * concrete ids before calling this filesystem lifecycle.
 */
export class StripeBillingConfigurationExportLifecycle extends Context.Service<StripeBillingConfigurationExportLifecycle>()(
  "nomoss/providers/stripe/stripeBillingConfigurationExport/StripeBillingConfigurationExportLifecycle",
  {
    make: Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;

      return {
        writeBillingConfigurationExport: Effect.fn(
          "StripeBillingConfigurationExportLifecycle.writeBillingConfigurationExport",
        )(function* (props: StripeBillingConfigurationExportWriteInput) {
          const encoded = yield* Schema.encodeEffect(
            StripeBillingConfigurationExportFileSchema,
          )(props.document);

          yield* fs.writeFileString(props.outputPath, encoded);

          const outputs: StripeBillingConfigurationExportOutputs = {
            OutputPath: props.outputPath,
          };

          return outputs;
        }),

        deleteBillingConfigurationExport: Effect.fn(
          "StripeBillingConfigurationExportLifecycle.deleteBillingConfigurationExport",
        )(function* (outputPath: string) {
          yield* Effect.when(fs.remove(outputPath), fs.exists(outputPath));
        }),
      };
    }),
  },
) {}
