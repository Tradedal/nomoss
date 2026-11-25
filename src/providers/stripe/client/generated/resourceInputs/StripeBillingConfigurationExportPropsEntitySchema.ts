// This schema module comes from the selected resource contracts. Do not edit.

// biome-ignore-all lint/complexity/useRegexLiterals: Preserve Effect's compiled regular expressions.
import { Schema } from "effect";
import {
  annotateResourceSchema,
  type ResourceEntity,
  ResourceReferenceSchema,
} from "../../../../../core/resource/model.js";
import { StripeBillingConfigurationExportResourceSchema } from "./StripeBillingConfigurationExportPropsSchema.js";

export type StripeBillingConfigurationExportPropsEntity = {
  readonly apiVersion: string;
  readonly billingPortalConfigurationId: ResourceEntity<{
    readonly provider: "stripe";
    readonly service: "billing";
    readonly resource: "billing-portal-configuration";
  }>;
  readonly mode: "test" | "live";
  readonly outputPath: string;
  readonly prices: {
    readonly activeMonthly: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "price";
    }>;
    readonly advancedMonthly: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "price";
    }>;
    readonly starterMonthly: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "price";
    }>;
  };
  readonly products: {
    readonly active: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "product";
    }>;
    readonly advanced: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "product";
    }>;
    readonly starter: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "product";
    }>;
  };
  readonly webhookEndpoint: {
    readonly id: ResourceEntity<{
      readonly provider: "stripe";
      readonly service: "billing";
      readonly resource: "webhook-endpoint";
    }>;
  };
};

export const StripeBillingConfigurationExportPropsEntitySchema =
  annotateResourceSchema(
    Schema.Struct({
      apiVersion: Schema.String,
      billingPortalConfigurationId: Schema.Union([
        ResourceReferenceSchema(
          Schema.Struct({
            provider: Schema.Literal("stripe"),
            service: Schema.Literal("billing"),
            resource: Schema.Literal("billing-portal-configuration"),
          }),
          {
            value: null,
            outputs: [
              {
                source: ["BillingPortalConfigurationId"],
                target: [],
              },
            ],
          },
        ).annotate({ expected: "ResourceEntity" }),
      ]),
      mode: Schema.Literals(["test", "live"]),
      outputPath: Schema.String.check(
        Schema.isMinLength(1).annotate({
          expected: "a value with a length of at least 1",
        }),
      ),
      prices: Schema.Struct({
        activeMonthly: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("price"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PriceId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        advancedMonthly: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("price"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PriceId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        starterMonthly: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("price"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["PriceId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      }),
      products: Schema.Struct({
        active: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("product"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["ProductId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        advanced: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("product"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["ProductId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
        starter: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("product"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["ProductId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      }),
      webhookEndpoint: Schema.Struct({
        id: Schema.Union([
          ResourceReferenceSchema(
            Schema.Struct({
              provider: Schema.Literal("stripe"),
              service: Schema.Literal("billing"),
              resource: Schema.Literal("webhook-endpoint"),
            }),
            {
              value: null,
              outputs: [
                {
                  source: ["WebhookEndpointId"],
                  target: [],
                },
              ],
            },
          ).annotate({ expected: "ResourceEntity" }),
        ]),
      }),
    }),
    StripeBillingConfigurationExportResourceSchema,
  );
