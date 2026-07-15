import { Credentials } from "@distilled.cloud/stripe";
import type { GetBillingPortalConfigurationsConfigurationInput } from "@distilled.cloud/stripe/Operations";
import {
  GetBillingPortalConfigurationsConfiguration,
  PostBillingPortalConfigurations,
  PostBillingPortalConfigurationsConfiguration,
  PostBillingPortalConfigurationsConfigurationInput,
  PostBillingPortalConfigurationsInput,
  PostBillingPortalConfigurationsOutput,
} from "@distilled.cloud/stripe/Operations";
import { Context, Effect, Option, Schema } from "effect";

import {
  annotateResourceSchema,
  ResourceOutputRefSchema,
} from "../../core/model.js";
import { StripeApiVersion } from "./stripeAccount.js";

export const StripeBillingPortalConfigurationPropsSchema =
  annotateResourceSchema(PostBillingPortalConfigurationsInput, {
    provider: "stripe",
    service: "billing",
    resource: "billing-portal-configuration",
    operation: "create",
    stateSecretOutputKeys: [],
  });

export type StripeBillingPortalConfigurationProps = Schema.Schema.Type<
  typeof StripeBillingPortalConfigurationPropsSchema
>;

export const StripeBillingPortalConfigurationSubscriptionUpdateProductDeclarationSchema =
  Schema.Struct({
    prices: Schema.Array(ResourceOutputRefSchema),
    product: ResourceOutputRefSchema,
  });

export type StripeBillingPortalConfigurationSubscriptionUpdateProductDeclaration =
  Schema.Schema.Type<
    typeof StripeBillingPortalConfigurationSubscriptionUpdateProductDeclarationSchema
  >;

export const StripeBillingPortalConfigurationUpdatePropsSchema =
  PostBillingPortalConfigurationsConfigurationInput;

export type StripeBillingPortalConfigurationUpdateProps = Schema.Schema.Type<
  typeof StripeBillingPortalConfigurationUpdatePropsSchema
>;

export const StripeBillingPortalConfigurationOutputsSchema = Schema.Struct({
  BillingPortalConfigurationId: Schema.String,
});

export type StripeBillingPortalConfigurationOutputs = Schema.Schema.Type<
  typeof StripeBillingPortalConfigurationOutputsSchema
>;

export const StripeBillingPortalConfigurationObservedStateSchema =
  PostBillingPortalConfigurationsOutput;

export type StripeBillingPortalConfigurationObservedState = Schema.Schema.Type<
  typeof StripeBillingPortalConfigurationObservedStateSchema
>;

export const stripeBillingPortalConfigurationOutputsFromState = (
  state: StripeBillingPortalConfigurationObservedState,
): StripeBillingPortalConfigurationOutputs => {
  const outputs: StripeBillingPortalConfigurationOutputs = {
    BillingPortalConfigurationId: state.id,
  };

  return outputs;
};

export const pendingStripeBillingPortalConfigurationOutputs = (
  logicalId: string,
): StripeBillingPortalConfigurationOutputs => {
  const outputs: StripeBillingPortalConfigurationOutputs = {
    BillingPortalConfigurationId: `nomoss:pending:stripe-billing-portal-configuration-id:${logicalId}`,
  };

  return outputs;
};

export class StripeBillingPortalConfigurationLifecycle extends Context.Service<StripeBillingPortalConfigurationLifecycle>()(
  "nomoss/providers/stripe/stripeBillingPortalConfiguration/StripeBillingPortalConfigurationLifecycle",
  {
    make: Effect.gen(function* () {
      const stripeCredentials = yield* Credentials;

      return {
        createBillingPortalConfiguration: Effect.fn(
          "StripeBillingPortalConfigurationLifecycle.createBillingPortalConfiguration",
        )(function* (props: StripeBillingPortalConfigurationProps) {
          const configuration = yield* PostBillingPortalConfigurations(props, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return configuration;
        }),

        readBillingPortalConfiguration: Effect.fn(
          "StripeBillingPortalConfigurationLifecycle.readBillingPortalConfiguration",
        )(function* (configurationId: string) {
          const input: GetBillingPortalConfigurationsConfigurationInput = {
            configuration: configurationId,
          };
          const configuration =
            yield* GetBillingPortalConfigurationsConfiguration(input, {
              apiVersion: StripeApiVersion,
            }).pipe(
              Effect.provideService(Credentials, stripeCredentials),
              Effect.flatMap((output) =>
                Schema.decodeUnknownEffect(
                  StripeBillingPortalConfigurationObservedStateSchema,
                )(output),
              ),
              Effect.map((output) => Option.some(output)),
            );

          return configuration;
        }),

        updateBillingPortalConfiguration: Effect.fn(
          "StripeBillingPortalConfigurationLifecycle.updateBillingPortalConfiguration",
        )(function* (input: StripeBillingPortalConfigurationUpdateProps) {
          const configuration =
            yield* PostBillingPortalConfigurationsConfiguration(input, {
              apiVersion: StripeApiVersion,
            }).pipe(Effect.provideService(Credentials, stripeCredentials));

          return configuration;
        }),

        deactivateBillingPortalConfiguration: Effect.fn(
          "StripeBillingPortalConfigurationLifecycle.deactivateBillingPortalConfiguration",
        )(function* (configurationId: string) {
          const input =
            yield* StripeBillingPortalConfigurationUpdatePropsSchema.makeEffect(
              {
                active: false,
                configuration: configurationId,
              },
            );

          yield* PostBillingPortalConfigurationsConfiguration(input, {
            apiVersion: StripeApiVersion,
          }).pipe(Effect.provideService(Credentials, stripeCredentials));
        }),
      };
    }),
  },
) {}
