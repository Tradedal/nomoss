// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";

export type StripeBillingConfigurationExportDocument = {
  readonly apiVersion: string;
  readonly billingPortalConfigurationId: string;
  readonly mode: "test" | "live";
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
  webhookEndpoint: Schema.Struct({ id: Schema.String }),
});
