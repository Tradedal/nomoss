// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  ResourceSchemaAnnotationSchema,
} from "../../../../../core/resource/model.js";

export type StripeBillingConfigurationExportProps = {
  readonly apiVersion: string;
  readonly billingPortalConfigurationId: string;
  readonly mode: "test" | "live";
  readonly outputPath: string;
  readonly prices: {
    readonly activeMonthly: string;
    readonly advancedMonthly: string;
    readonly starterMonthly: string;
  };
  readonly products: {
    readonly active: string;
    readonly advanced: string;
    readonly starter: string;
  };
  readonly webhookEndpoint: { readonly id: string };
};

export const StripeBillingConfigurationExportResourceSchema =
  ResourceSchemaAnnotationSchema.make({
    provider: "stripe",
    service: "billing",
    resource: "configuration-export",
    operation: "create",
    stateSecretOutputKeys: [],
    replacement: {
      order: "destroyBeforeCreate",
      properties: [["outputPath"]],
    },
    primaryIdentifier: ["/properties/OutputPath"],
  });
export const StripeBillingConfigurationExportPropsSchema =
  annotateResourceSchema(
    Schema.Struct({
      apiVersion: Schema.String,
      billingPortalConfigurationId: Schema.String,
      mode: Schema.Literals(["test", "live"]),
      outputPath: Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ),
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
      webhookEndpoint: Schema.Struct({ id: Schema.String }),
    }),
    StripeBillingConfigurationExportResourceSchema,
  );
