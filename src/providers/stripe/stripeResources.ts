import { Context, Data, Effect, Option, Record } from "effect";

import { type ResourceOutputRef, resourceOutputRef } from "../../core/model.js";
import { ResourceGraphBuilder } from "../../core/resourceGraphBuilder.js";
import {
  StripeBillingConfigurationExportOutputsSchema,
  StripeBillingConfigurationExportPropsSchema,
} from "./stripeBillingConfigurationExport.js";
import {
  pendingStripeBillingPortalConfigurationOutputs,
  type StripeBillingPortalConfigurationSubscriptionUpdateProductDeclaration,
  StripeBillingPortalConfigurationOutputsSchema,
  type StripeBillingPortalConfigurationProps,
  StripeBillingPortalConfigurationPropsSchema,
} from "./stripeBillingPortalConfiguration.js";
import {
  pendingStripeCustomerOutputs,
  StripeCustomerOutputsSchema,
  type StripeCustomerProps,
  StripeCustomerPropsSchema,
} from "./stripeCustomer.js";
import {
  pendingStripePriceOutputs,
  StripePriceDeclarationPropsSchema,
  StripePriceOutputsSchema,
  type StripeRecurringPriceDeclarationProps,
  StripeRecurringPriceDeclarationPropsSchema,
  stripePricePropsFromDeclaration,
} from "./stripePrice.js";
import {
  StripeProductOutputsSchema,
  type StripeProductProps,
  StripeProductPropsSchema,
  stripeProductOutputsFromProps,
} from "./stripeProduct.js";
import {
  pendingStripeWebhookEndpointOutputs,
  StripeWebhookEndpointOutputsSchema,
  type StripeWebhookEndpointRequestProps,
  StripeWebhookEndpointPropsSchema,
} from "./stripeWebhookEndpoint.js";

/**
 * A stack declaration uses this input when it asks Nomoss to create or track
 * a Stripe Customer resource. The logical id becomes the stable graph key, and
 * the props follow the generated Stripe Customer operation schema.
 */
export type StripeCustomerInput = {
  readonly logicalId: string;
  readonly props: StripeCustomerProps;
};

/**
 * A stack declaration uses this input when it asks Nomoss to create or track
 * a Stripe Product resource. Product outputs can be referenced by Prices and by
 * the billing configuration export.
 */
export type StripeProductInput = {
  readonly logicalId: string;
  readonly props: StripeProductProps;
};

/**
 * A stack declaration uses this input when it asks Nomoss to create a Stripe
 * Price for an already-declared Product. The Product id stays as a resource ref
 * until apply resolves it from the Nomoss state graph.
 */
export type StripePriceInput = {
  readonly logicalId: string;
  readonly product: ResourceOutputRef;
  readonly props: StripeRecurringPriceDeclarationProps;
};

/**
 * A stack declaration uses this input when it asks Nomoss to register a
 * Stripe webhook endpoint. Runtime configuration may add delivery credentials
 * during apply without storing those credentials in resource state.
 */
export type StripeWebhookEndpointInput = {
  readonly logicalId: string;
  readonly props: StripeWebhookEndpointRequestProps;
  readonly rotationKey?: string;
};

/**
 * A stack declaration uses this input when it asks Nomoss to manage the
 * Stripe Billing Portal configuration that account billing pages open through
 * the backend Portal session mutation.
 */
export type StripeBillingPortalConfigurationInput = {
  readonly logicalId: string;
  readonly props: StripeBillingPortalConfigurationProps;
  readonly subscriptionUpdateProducts?: ReadonlyArray<StripeBillingPortalConfigurationSubscriptionUpdateProductDeclaration>;
};

class BillingPortalSubscriptionUpdateConfigurationMissing extends Data.TaggedError(
  "BillingPortalSubscriptionUpdateConfigurationMissing",
)<{
  readonly logicalId: string;
}> {}

/**
 * A stack declaration uses this input when it asks Nomoss to write the
 * applied billing configuration file. The export receives refs from Product,
 * Price, Portal, and webhook resources so application code can read concrete
 * Stripe ids after apply.
 */
export type StripeBillingConfigurationExportInput = {
  readonly logicalId: string;
  readonly apiVersion: string;
  readonly billingPortalConfigurationId: ResourceOutputRef;
  readonly mode: "test" | "live";
  readonly outputPath: string;
  readonly prices: {
    readonly activeMonthly: ResourceOutputRef;
    readonly advancedMonthly: ResourceOutputRef;
    readonly starterMonthly: ResourceOutputRef;
  };
  readonly products: {
    readonly active: ResourceOutputRef;
    readonly advanced: ResourceOutputRef;
    readonly starter: ResourceOutputRef;
  };
  readonly webhookEndpoint: {
    readonly id: ResourceOutputRef;
  };
};

/**
 * Stripe stack programs declare billing resources through this service. The
 * service validates each declaration, records the graph node, and returns output
 * refs that downstream resources can depend on before apply creates Stripe ids.
 */
export class StripeResources extends Context.Service<StripeResources>()(
  "nomoss/providers/stripe/stripeResources",
  {
    make: Effect.gen(function* () {
      const graph = yield* ResourceGraphBuilder;

      return {
        Customer: Effect.fn("StripeResources.Customer")(function* (
          input: StripeCustomerInput,
        ) {
          const key = { logicalId: input.logicalId };
          const declaration = yield* graph.resource(key);
          const props = yield* StripeCustomerPropsSchema.makeEffect(
            input.props,
          );
          const outputs = pendingStripeCustomerOutputs(input.logicalId);

          yield* declaration.register({
            propsSchema: StripeCustomerPropsSchema,
            outputsSchema: StripeCustomerOutputsSchema,
            props,
            outputs,
          });

          const resource = {
            key,
            props,
            CustomerId: resourceOutputRef(key, "CustomerId"),
          };

          return resource;
        }),

        Product: Effect.fn("StripeResources.Product")(function* (
          input: StripeProductInput,
        ) {
          const key = { logicalId: input.logicalId };
          const declaration = yield* graph.resource(key);
          const props = yield* StripeProductPropsSchema.makeEffect(input.props);
          const outputs = stripeProductOutputsFromProps(input.logicalId, props);

          yield* declaration.register({
            propsSchema: StripeProductPropsSchema,
            outputsSchema: StripeProductOutputsSchema,
            props,
            outputs,
          });

          const resource = {
            key,
            props,
            ProductId: resourceOutputRef(key, "ProductId"),
          };

          return resource;
        }),

        Price: Effect.fn("StripeResources.Price")(function* (
          input: StripePriceInput,
        ) {
          const key = { logicalId: input.logicalId };
          const declaration = yield* graph.resource(key);
          yield* declaration.after(
            input.product.source,
            "product",
            input.product.property,
          );
          const declarationProps =
            yield* StripeRecurringPriceDeclarationPropsSchema.makeEffect(
              input.props,
            );
          const props = stripePricePropsFromDeclaration(
            input.product,
            declarationProps,
          );
          const outputs = pendingStripePriceOutputs(input.logicalId);

          yield* declaration.register({
            propsSchema: StripePriceDeclarationPropsSchema,
            outputsSchema: StripePriceOutputsSchema,
            props,
            outputs,
          });

          const resource = {
            key,
            props,
            PriceId: resourceOutputRef(key, "PriceId"),
          };

          return resource;
        }),

        WebhookEndpoint: Effect.fn("StripeResources.WebhookEndpoint")(
          function* (input: StripeWebhookEndpointInput) {
            const key = { logicalId: input.logicalId };
            const declaration = yield* graph.resource(key);
            const props = yield* Option.fromUndefinedOr(
              input.rotationKey,
            ).pipe(
              Option.match({
                onNone: () =>
                  StripeWebhookEndpointPropsSchema.makeEffect({
                    endpoint: input.props,
                  }),
                onSome: (rotationKey) =>
                  StripeWebhookEndpointPropsSchema.makeEffect({
                    endpoint: input.props,
                    rotationKey,
                  }),
              }),
            );
            const outputs = pendingStripeWebhookEndpointOutputs(
              input.logicalId,
            );

            yield* declaration.register({
              propsSchema: StripeWebhookEndpointPropsSchema,
              outputsSchema: StripeWebhookEndpointOutputsSchema,
              props,
              outputs,
            });

            const resource = {
              key,
              props,
              WebhookEndpointId: resourceOutputRef(key, "WebhookEndpointId"),
            };

            return resource;
          },
        ),

        BillingPortalConfiguration: Effect.fn(
          "StripeResources.BillingPortalConfiguration",
        )(function* (input: StripeBillingPortalConfigurationInput) {
          const key = { logicalId: input.logicalId };
          const declaration = yield* graph.resource(key);
          const props = yield* Option.fromUndefinedOr(
            input.subscriptionUpdateProducts,
          ).pipe(
            Option.match({
              onNone: () =>
                StripeBillingPortalConfigurationPropsSchema.makeEffect(
                  input.props,
                ),
              onSome: (products) =>
                Option.fromUndefinedOr(
                  input.props.features.subscription_update,
                ).pipe(
                  Option.match({
                    onNone: () =>
                      Effect.fail(
                        new BillingPortalSubscriptionUpdateConfigurationMissing(
                          {
                            logicalId: input.logicalId,
                          },
                        ),
                      ),
                    onSome: (subscriptionUpdate) =>
                      Effect.forEach(
                        products,
                        (product, productIndex) =>
                          declaration
                            .stringFrom(
                              product.product,
                              `features.subscription_update.products.${productIndex}.product`,
                            )
                            .pipe(
                              Effect.zip(
                                Effect.forEach(
                                  product.prices,
                                  (price, priceIndex) =>
                                    declaration.stringFrom(
                                      price,
                                      `features.subscription_update.products.${productIndex}.prices.${priceIndex}`,
                                    ),
                                ),
                              ),
                              Effect.map(([productId, prices]) => ({
                                prices,
                                product: productId,
                              })),
                            ),
                      ).pipe(
                        Effect.flatMap((subscriptionUpdateProducts) =>
                          StripeBillingPortalConfigurationPropsSchema.makeEffect(
                            {
                              business_profile: input.props.business_profile,
                              default_return_url:
                                input.props.default_return_url,
                              features: Record.filter({
                                customer_update:
                                  input.props.features.customer_update,
                                invoice_history:
                                  input.props.features.invoice_history,
                                payment_method_update:
                                  input.props.features.payment_method_update,
                                subscription_cancel:
                                  input.props.features.subscription_cancel,
                                subscription_update: Record.filter({
                                  billing_cycle_anchor:
                                    subscriptionUpdate.billing_cycle_anchor,
                                  default_allowed_updates:
                                    subscriptionUpdate.default_allowed_updates,
                                  enabled: subscriptionUpdate.enabled,
                                  products: subscriptionUpdateProducts,
                                  proration_behavior:
                                    subscriptionUpdate.proration_behavior,
                                  schedule_at_period_end:
                                    subscriptionUpdate.schedule_at_period_end,
                                  trial_update_behavior:
                                    subscriptionUpdate.trial_update_behavior,
                                }, (value) => value !== undefined),
                              }, (value) => value !== undefined),
                              login_page: input.props.login_page,
                              metadata: input.props.metadata,
                              name: input.props.name,
                            },
                          ),
                        ),
                      ),
                  }),
                ),
            }),
          );
          const outputs = pendingStripeBillingPortalConfigurationOutputs(
            input.logicalId,
          );

          yield* declaration.register({
            propsSchema: StripeBillingPortalConfigurationPropsSchema,
            outputsSchema: StripeBillingPortalConfigurationOutputsSchema,
            props,
            outputs,
          });

          const resource = {
            key,
            props,
            BillingPortalConfigurationId: resourceOutputRef(
              key,
              "BillingPortalConfigurationId",
            ),
          };

          return resource;
        }),

        BillingConfigurationExport: Effect.fn(
          "StripeResources.BillingConfigurationExport",
        )(function* (input: StripeBillingConfigurationExportInput) {
          const key = { logicalId: input.logicalId };
          const declaration = yield* graph.resource(key);
          yield* declaration.after(
            input.billingPortalConfigurationId.source,
            "billingPortalConfigurationId",
            input.billingPortalConfigurationId.property,
          );
          yield* declaration.after(
            input.prices.activeMonthly.source,
            "prices.activeMonthly",
            input.prices.activeMonthly.property,
          );
          yield* declaration.after(
            input.prices.advancedMonthly.source,
            "prices.advancedMonthly",
            input.prices.advancedMonthly.property,
          );
          yield* declaration.after(
            input.prices.starterMonthly.source,
            "prices.starterMonthly",
            input.prices.starterMonthly.property,
          );
          yield* declaration.after(
            input.products.active.source,
            "products.active",
            input.products.active.property,
          );
          yield* declaration.after(
            input.products.advanced.source,
            "products.advanced",
            input.products.advanced.property,
          );
          yield* declaration.after(
            input.products.starter.source,
            "products.starter",
            input.products.starter.property,
          );
          yield* declaration.after(
            input.webhookEndpoint.id.source,
            "webhookEndpoint.id",
            input.webhookEndpoint.id.property,
          );
          const props =
            yield* StripeBillingConfigurationExportPropsSchema.makeEffect({
              apiVersion: input.apiVersion,
              billingPortalConfigurationId: input.billingPortalConfigurationId,
              mode: input.mode,
              outputPath: input.outputPath,
              prices: input.prices,
              products: input.products,
              webhookEndpoint: input.webhookEndpoint,
            });
          const outputs = {
            OutputPath: props.outputPath,
          };
          yield* declaration.register({
            propsSchema: StripeBillingConfigurationExportPropsSchema,
            outputsSchema: StripeBillingConfigurationExportOutputsSchema,
            props,
            outputs,
          });

          const resource = {
            key,
            props,
            OutputPath: resourceOutputRef(key, "OutputPath"),
          };

          return resource;
        }),
      };
    }),
  },
) {}
