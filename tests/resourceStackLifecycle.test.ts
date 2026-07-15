import { Array as Arr, Effect, Match } from "effect";

import { assert, describe, it } from "@effect/vitest";

import {
  ResourceModel,
  ResourceNodeSchema,
  resourceOutputRef,
} from "../src/core/model.js";
import { ResourceGraphStore } from "../src/core/resourceGraphStore.js";
import { ResourceOutputResolver } from "../src/core/resourceOutputResolver.js";
import { ResourceStackLifecycle } from "../src/core/resourceStackLifecycle.js";
import { ResourceStateStore } from "../src/core/stateStore.js";
import {
  QueueOutputsSchema,
  QueuePropsSchema,
} from "../src/providers/aws/awsQueue.js";
import {
  pendingStripeCustomerOutputs,
  StripeCustomerCreateFailed,
  StripeCustomerOutputsSchema,
  StripeCustomerPropsSchema,
} from "../src/providers/stripe/stripeCustomer.js";
import {
  StripeProductOutputsSchema,
  StripeProductPropsSchema,
} from "../src/providers/stripe/stripeProduct.js";
import { StripeResources } from "../src/providers/stripe/stripeResources.js";
import {
  StripeWebhookEndpointOutputsSchema,
  StripeWebhookEndpointPropsSchema,
} from "../src/providers/stripe/stripeWebhookEndpoint.js";
import {
  ProviderCommandFixtureCapture,
  ResourceStackLifecycleProviderFixture,
  StripeBillingConfigurationExportFixture,
} from "./support/providerResourceCommandPolicyFixture.js";

/**
 * This file validates the Nomoss stack-lifecycle design, not individual AWS
 * or Stripe APIs. The test body defines a resource graph, runs the public
 * lifecycle service, and reads persisted state. Provider behavior comes from a
 * named fixture layer that keeps provider resource policies live and replaces
 * only external provider effects.
 */
describe("ResourceStackLifecycle", () => {
  it.effect(
    "resolves dependency output values through object and array property paths",
    () =>
      Effect.gen(function* () {
        const resolver = yield* ResourceOutputResolver;
        const sourceNode = yield* ResourceNodeSchema.makeEffect({
          key: { logicalId: "PlanPrice" },
          schema: {
            operation: "create",
            provider: "stripe",
            resource: "price",
            service: "billing",
            stateSecretOutputKeys: [],
          },
          props: {},
          outputs: {
            ProductId: "price_test_active",
          },
        });
        const targetNode = yield* ResourceNodeSchema.makeEffect({
          key: { logicalId: "PortalConfiguration" },
          schema: {
            operation: "create",
            provider: "stripe",
            resource: "billing-portal-configuration",
            service: "billing",
            stateSecretOutputKeys: [],
          },
          props: {
            name: "Portal configuration",
            metadata: {
              features: {
                subscription_update: {
                  products: [
                    {
                      prices: ["nomoss:pending:price"],
                    },
                  ],
                },
              },
            },
          },
          outputs: {},
        });

        const resolved = yield* resolver.resolveNode(
          targetNode,
          [sourceNode],
          [
            {
              source: sourceNode.key,
              target: targetNode.key,
              edge: {
                kind: "property",
                property:
                  "metadata.features.subscription_update.products.0.prices.0",
                sourceProperty: "ProductId",
              },
            },
          ],
        );

        assert.deepStrictEqual(resolved.props, {
          name: "Portal configuration",
          metadata: {
            features: {
              subscription_update: {
                products: [
                  {
                    prices: ["price_test_active"],
                  },
                ],
              },
            },
          },
        });
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "persists mixed-provider resources after dependency-ordered apply and clears them after destroy",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const graph = yield* ResourceGraphStore;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const queueNode = yield* model.nodeFromResource({
          key: { logicalId: "EventsQueue" },
          propsSchema: QueuePropsSchema,
          outputsSchema: QueueOutputsSchema,
          props: { QueueName: "events" },
          outputs: {
            QueueUrl: "nomoss:pending:sqs:events",
            QueueArn: "nomoss:pending:sqs-arn:events",
          },
        });
        const customerNode = yield* model.nodeFromResource({
          key: { logicalId: "BillingCustomer" },
          propsSchema: StripeCustomerPropsSchema,
          outputsSchema: StripeCustomerOutputsSchema,
          props: {
            name: "Billing customer",
            metadata: {
              queue: "events",
            },
          },
          outputs: pendingStripeCustomerOutputs("BillingCustomer"),
        });

        /**
         * The dependency is the behavior under review: a Stripe resource can
         * rely on an AWS-created value while Nomoss keeps lifecycle ordering
         * in the library instead of the consumer application.
         */
        yield* graph.addResource(queueNode);
        yield* graph.addResource(customerNode);
        yield* graph.addDependency(queueNode.key, customerNode.key, {
          kind: "property",
          property: "metadata.queue",
          sourceProperty: "QueueUrl",
        });

        const prepared = yield* lifecycle.prepare("billing-stack");
        yield* lifecycle.apply(prepared);
        const savedAfterApply =
          yield* stateStore.loadResources("billing-stack");
        yield* lifecycle.destroy(prepared);
        const savedAfterDestroy =
          yield* stateStore.loadResources("billing-stack");

        assert.deepStrictEqual(yield* capture.snapshot, [
          "create aws queue",
          "create stripe customer",
          "destroy stripe customer",
          "destroy aws queue",
        ]);
        assert.deepStrictEqual(
          Arr.map(
            savedAfterApply,
            (node) => `${node.schema.provider}:${node.key.logicalId}`,
          ),
          ["aws:EventsQueue", "stripe:BillingCustomer"],
        );
        assert.deepStrictEqual(savedAfterDestroy, []);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "writes Stripe price with the applied Product id after Product creates",
    () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const starter = yield* stripe.Product({
          logicalId: "StarterProduct",
          props: {
            active: true,
            name: "Example Starter",
            metadata: {
              plan: "starter",
            },
            type: "service",
          },
        });

        yield* stripe.Price({
          logicalId: "StarterMonthlyPrice",
          product: starter.ProductId,
          props: {
            active: true,
            currency: "usd",
            lookup_key: "example_starter_monthly_dev",
            metadata: {
              plan: "starter",
            },
            nickname: "Starter monthly",
            recurring: {
              interval: "month",
              interval_count: 1,
            },
            tax_behavior: "unspecified",
            unit_amount: 2900,
          },
        });

        const prepared = yield* lifecycle.prepare("billing-catalog");
        yield* lifecycle.apply(prepared);
        const savedAfterApply =
          yield* stateStore.loadResources("billing-catalog");
        yield* lifecycle.destroy(prepared);

        assert.deepStrictEqual(yield* capture.snapshot, [
          "create stripe product",
          "create stripe price",
          "destroy stripe price",
          "destroy stripe product",
        ]);
        assert.deepStrictEqual(
          Arr.map(savedAfterApply, (node) => ({
            logicalId: node.key.logicalId,
            props: node.props,
            resource: node.schema.resource,
          })),
          [
            {
              logicalId: "StarterProduct",
              props: {
                active: true,
                metadata: {
                  plan: "starter",
                },
                name: "Example Starter",
                type: "service",
              },
              resource: "product",
            },
            {
              logicalId: "StarterMonthlyPrice",
              props: {
                active: true,
                currency: "usd",
                lookup_key: "example_starter_monthly_dev",
                metadata: {
                  plan: "starter",
                },
                nickname: "Starter monthly",
                product: "prod_test_starter",
                recurring: {
                  interval: "month",
                  interval_count: 1,
                },
                tax_behavior: "unspecified",
                unit_amount: 2900,
              },
              resource: "price",
            },
          ],
        );
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "records Stripe price failure before provider create when Product id is unavailable",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const customer = yield* stripe.Customer({
          logicalId: "BillingCustomer",
          props: {
            name: "Billing customer",
            metadata: {
              plan: "starter",
            },
          },
        });
        const appliedCustomer = yield* model.nodeFromResource({
          key: customer.key,
          propsSchema: StripeCustomerPropsSchema,
          outputsSchema: StripeCustomerOutputsSchema,
          props: customer.props,
          outputs: {
            CustomerId: "cus_test_billing",
          },
        });

        yield* stateStore.saveResources("billing-missing-output", [
          appliedCustomer,
        ]);
        yield* stripe.Price({
          logicalId: "StarterMonthlyPrice",
          product: resourceOutputRef(customer.key, "ProductId"),
          props: {
            active: true,
            currency: "usd",
            lookup_key: "example_starter_monthly_dev",
            metadata: {
              plan: "starter",
            },
            nickname: "Starter monthly",
            recurring: {
              interval: "month",
              interval_count: 1,
            },
            tax_behavior: "unspecified",
            unit_amount: 2900,
          },
        });

        const prepared = yield* lifecycle.prepare("billing-missing-output");
        const error = yield* lifecycle.apply(prepared).pipe(Effect.flip);
        const savedStates = yield* stateStore.loadResourceStates(
          "billing-missing-output",
        );

        yield* Match.value(error).pipe(
          Match.when(
            { _tag: "ResourceOutputResolutionMissing" },
            () => Effect.void,
          ),
          Match.orElse((unexpected) => Effect.fail(unexpected)),
        );
        assert.deepStrictEqual(yield* capture.snapshot, []);
        assert.deepStrictEqual(
          Arr.map(savedStates, (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Creating" }, (creating) => ({
                logicalId: creating.node.key.logicalId,
                phase: creating._tag,
                failureTag: creating.lastFailure?.errorTag,
              })),
              Match.orElse((other) => ({
                logicalId: other.node.key.logicalId,
                phase: other._tag,
                failureTag: undefined,
              })),
            ),
          ),
          [
            {
              logicalId: "BillingCustomer",
              phase: "Created",
              failureTag: undefined,
            },
            {
              logicalId: "StarterMonthlyPrice",
              phase: "Creating",
              failureTag: "ResourceOutputResolutionMissing",
            },
          ],
        );
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "persists Stripe webhook endpoint state after apply and clears it after destroy",
    () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;

        yield* stripe.WebhookEndpoint({
          logicalId: "BillingWebhookEndpoint",
          props: {
            api_version: "2026-03-25.dahlia",
            description: "Example dev billing webhook",
            enabled_events: ["checkout.session.completed"],
            metadata: {
              application: "example",
              environment: "dev",
            },
            url: "https://example.test/api/stripe/webhook",
          },
        });

        const prepared = yield* lifecycle.prepare("billing-webhook");
        yield* lifecycle.apply(prepared);
        const savedAfterApply =
          yield* stateStore.loadResources("billing-webhook");
        yield* lifecycle.destroy(prepared);
        const savedAfterDestroy =
          yield* stateStore.loadResources("billing-webhook");

        assert.deepStrictEqual(
          Arr.map(savedAfterApply, (node) => ({
            logicalId: node.key.logicalId,
            resource: node.schema.resource,
            outputs: node.outputs,
          })),
          [
            {
              logicalId: "BillingWebhookEndpoint",
              resource: "webhook-endpoint",
              outputs: {
                WebhookEndpointId: "we_test_billing_events",
                WebhookSigningSecret: "whsec_test_billing_events",
              },
            },
          ],
        );
        assert.deepStrictEqual(savedAfterDestroy, []);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "keeps the Stripe webhook signing secret in state when endpoint updates omit it",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const current = yield* model.nodeFromResource({
          key: { logicalId: "BillingWebhookEndpoint" },
          propsSchema: StripeWebhookEndpointPropsSchema,
          outputsSchema: StripeWebhookEndpointOutputsSchema,
          props: {
            endpoint: {
              api_version: "2026-03-25.dahlia",
              description: "Example dev billing webhook",
              enabled_events: ["checkout.session.completed"],
              metadata: {
                application: "example",
                environment: "dev",
              },
              url: "https://example.test/api/stripe/webhook",
            },
          },
          outputs: {
            WebhookEndpointId: "we_test_billing_events",
            WebhookSigningSecret: "whsec_test_billing_events",
          },
        });
        yield* stateStore.saveResources("billing-webhook-update", [current]);
        yield* stripe.WebhookEndpoint({
          logicalId: "BillingWebhookEndpoint",
          props: {
            api_version: "2026-03-25.dahlia",
            description: "Example dev billing webhook v2",
            enabled_events: ["checkout.session.completed"],
            metadata: {
              application: "example",
              environment: "dev",
            },
            url: "https://example.test/api/stripe/webhook",
          },
        });

        const prepared = yield* lifecycle.prepare("billing-webhook-update");
        yield* lifecycle.apply(prepared);
        yield* lifecycle.apply(prepared);
        const saved = yield* stateStore.loadResources("billing-webhook-update");
        const events = yield* capture.snapshot;

        assert.deepStrictEqual(
          Arr.map(saved, (node) => node.outputs),
          [
            {
              WebhookEndpointId: "we_test_billing_events",
              WebhookSigningSecret: "whsec_test_billing_events",
            },
          ],
        );
        assert.deepStrictEqual(events, ["update stripe webhook endpoint"]);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "persists Stripe billing portal configuration after apply and clears it after destroy",
    () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;

        yield* stripe.BillingPortalConfiguration({
          logicalId: "BillingPortalConfiguration",
          props: {
            business_profile: {
              headline: "Example billing",
            },
            default_return_url: "https://app.example.test/account/billing",
            features: {
              invoice_history: {
                enabled: true,
              },
              payment_method_update: {
                enabled: true,
              },
              subscription_cancel: {
                enabled: true,
                mode: "at_period_end",
                proration_behavior: "none",
              },
              subscription_update: {
                enabled: false,
              },
            },
            login_page: {
              enabled: false,
            },
            metadata: {
              application: "example",
              environment: "dev",
            },
            name: "Example dev billing portal",
          },
        });

        const prepared = yield* lifecycle.prepare("billing-portal");
        yield* lifecycle.apply(prepared);
        const savedAfterApply =
          yield* stateStore.loadResources("billing-portal");
        yield* lifecycle.destroy(prepared);
        const savedAfterDestroy =
          yield* stateStore.loadResources("billing-portal");

        assert.deepStrictEqual(
          Arr.map(savedAfterApply, (node) => ({
            logicalId: node.key.logicalId,
            resource: node.schema.resource,
            outputs: node.outputs,
          })),
          [
            {
              logicalId: "BillingPortalConfiguration",
              resource: "billing-portal-configuration",
              outputs: {
                BillingPortalConfigurationId: "bpc_test_example",
              },
            },
          ],
        );
        assert.deepStrictEqual(savedAfterDestroy, []);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "writes Stripe billing configuration from resource outputs after apply and removes it after destroy",
    () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const exports = yield* StripeBillingConfigurationExportFixture;
        const product = yield* stripe.Product({
          logicalId: "StarterProduct",
          props: {
            active: true,
            name: "Example Starter",
            type: "service",
          },
        });
        const price = yield* stripe.Price({
          logicalId: "StarterMonthlyPrice",
          product: product.ProductId,
          props: {
            active: true,
            currency: "usd",
            lookup_key: "example_starter_monthly_dev",
            metadata: {
              plan: "starter",
            },
            nickname: "Starter monthly",
            recurring: {
              interval: "month",
              interval_count: 1,
            },
            tax_behavior: "unspecified",
            unit_amount: 2900,
          },
        });
        const portal = yield* stripe.BillingPortalConfiguration({
          logicalId: "BillingPortalConfiguration",
          props: {
            features: {
              invoice_history: {
                enabled: true,
              },
            },
          },
        });
        const webhook = yield* stripe.WebhookEndpoint({
          logicalId: "BillingWebhookEndpoint",
          props: {
            api_version: "2026-03-25.dahlia",
            description: "Example dev billing webhook",
            enabled_events: ["checkout.session.completed"],
            url: "https://example.test/api/stripe/webhook",
          },
        });

        yield* stripe.BillingConfigurationExport({
          logicalId: "BillingConfigurationExport",
          apiVersion: "2026-06-24.dahlia",
          billingPortalConfigurationId: portal.BillingPortalConfigurationId,
          mode: "test",
          outputPath: "./.nomoss/state/test-billing.json",
          prices: {
            activeMonthly: price.PriceId,
            advancedMonthly: price.PriceId,
            starterMonthly: price.PriceId,
          },
          products: {
            active: product.ProductId,
            advanced: product.ProductId,
            starter: product.ProductId,
          },
          webhookEndpoint: {
            id: webhook.WebhookEndpointId,
          },
        });

        const prepared = yield* lifecycle.prepare("billing-export");
        yield* lifecycle.apply(prepared);
        const savedAfterApply =
          yield* stateStore.loadResources("billing-export");
        const exportedAfterApply = yield* exports.snapshot;
        yield* lifecycle.destroy(prepared);
        const exportedAfterDestroy = yield* exports.snapshot;

        assert.deepStrictEqual(
          exportedAfterApply.get("./.nomoss/state/test-billing.json"),
          {
            apiVersion: "2026-06-24.dahlia",
            billingPortalConfigurationId: "bpc_test_example",
            mode: "test",
            prices: {
              activeMonthly: "price_test_starter_monthly",
              advancedMonthly: "price_test_starter_monthly",
              starterMonthly: "price_test_starter_monthly",
            },
            products: {
              active: "prod_test_starter",
              advanced: "prod_test_starter",
              starter: "prod_test_starter",
            },
            webhookEndpoint: {
              id: "we_test_billing_events",
            },
          },
        );
        assert.deepStrictEqual(
          Arr.map(savedAfterApply, (node) => node.key.logicalId),
          [
            "StarterProduct",
            "BillingPortalConfiguration",
            "BillingWebhookEndpoint",
            "StarterMonthlyPrice",
            "BillingConfigurationExport",
          ],
        );
        assert.deepStrictEqual(exportedAfterDestroy.size, 0);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.successfulCrossProviderStack(),
        ),
      ),
  );

  it.effect(
    "resource-failed-update-retry.behavior retries update from the saved applied Product state",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const appliedProduct = yield* model.nodeFromResource({
          key: { logicalId: "StarterProduct" },
          propsSchema: StripeProductPropsSchema,
          outputsSchema: StripeProductOutputsSchema,
          props: {
            active: true,
            name: "Example Starter",
            metadata: {
              plan: "starter",
            },
            type: "service",
          },
          outputs: {
            ProductId: "prod_test_starter",
          },
        });

        yield* stateStore.saveResources("billing-update-retry", [
          appliedProduct,
        ]);
        yield* stripe.Product({
          logicalId: "StarterProduct",
          props: {
            active: true,
            name: "Example Starter Plus",
            metadata: {
              plan: "starter",
            },
            type: "service",
          },
        });

        const prepared = yield* lifecycle.prepare("billing-update-retry");
        const error = yield* lifecycle.apply(prepared).pipe(Effect.flip);
        const failedStates = yield* stateStore.loadResourceStates(
          "billing-update-retry",
        );
        yield* lifecycle.apply(prepared);
        const recoveredStates = yield* stateStore.loadResourceStates(
          "billing-update-retry",
        );

        yield* Match.value(error).pipe(
          Match.when(
            { _tag: "ResourceCommandExecutionFailed" },
            () => Effect.void,
          ),
          Match.orElse((unexpected) => Effect.fail(unexpected)),
        );
        assert.deepStrictEqual(yield* capture.snapshot, [
          "update stripe product prod_test_starter Example Starter Plus",
          "update stripe product prod_test_starter Example Starter Plus",
        ]);
        const failedStateSummary = yield* Effect.forEach(
          failedStates,
          (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Updating" }, (updating) =>
                Effect.gen(function* () {
                  const desiredProps = yield* model.decodeProps(
                    updating.node,
                    StripeProductPropsSchema,
                  );
                  const previousProps = yield* model.decodeProps(
                    updating.previous,
                    StripeProductPropsSchema,
                  );
                  const previousOutputs = yield* model.decodeOutputs(
                    updating.previous,
                    StripeProductOutputsSchema,
                  );

                  return {
                    desiredName: desiredProps.name,
                    failureTag: updating.lastFailure?.errorTag,
                    phase: updating._tag,
                    previousName: previousProps.name,
                    productId: previousOutputs.ProductId,
                  };
                }),
              ),
              Match.orElse((other) =>
                Effect.gen(function* () {
                  const props = yield* model.decodeProps(
                    other.node,
                    StripeProductPropsSchema,
                  );
                  const outputs = yield* model.decodeOutputs(
                    other.node,
                    StripeProductOutputsSchema,
                  );

                  return {
                    desiredName: props.name,
                    failureTag: undefined,
                    phase: other._tag,
                    previousName: undefined,
                    productId: outputs.ProductId,
                  };
                }),
              ),
            ),
        );
        assert.deepStrictEqual(failedStateSummary, [
          {
            desiredName: "Example Starter Plus",
            failureTag: "StripeProductUpdateFailed",
            phase: "Updating",
            previousName: "Example Starter",
            productId: "prod_test_starter",
          },
        ]);
        const recoveredStateSummary = yield* Effect.forEach(
          recoveredStates,
          (state) =>
            Effect.gen(function* () {
              const props = yield* model.decodeProps(
                state.node,
                StripeProductPropsSchema,
              );
              const outputs = yield* model.decodeOutputs(
                state.node,
                StripeProductOutputsSchema,
              );

              return {
                name: props.name,
                phase: state._tag,
                productId: outputs.ProductId,
              };
            }),
        );
        assert.deepStrictEqual(recoveredStateSummary, [
          {
            name: "Example Starter Plus",
            phase: "Updated",
            productId: "prod_test_starter",
          },
        ]);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.productUpdateFailsOnce(),
        ),
      ),
  );

  it.effect(
    "resource-failed-delete-retry.behavior retries destroy from the saved deleting Product state",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const appliedProduct = yield* model.nodeFromResource({
          key: { logicalId: "StarterProduct" },
          propsSchema: StripeProductPropsSchema,
          outputsSchema: StripeProductOutputsSchema,
          props: {
            active: true,
            name: "Example Starter",
            metadata: {
              plan: "starter",
            },
            type: "service",
          },
          outputs: {
            ProductId: "prod_test_destroy_retry",
          },
        });

        yield* stateStore.saveResources("billing-destroy-retry", [
          appliedProduct,
        ]);
        yield* stripe.Product({
          logicalId: "StarterProduct",
          props: {
            active: true,
            name: "Example Starter",
            metadata: {
              plan: "starter",
            },
            type: "service",
          },
        });

        const prepared = yield* lifecycle.prepare("billing-destroy-retry");
        const error = yield* lifecycle.destroy(prepared).pipe(Effect.flip);
        const failedStates = yield* stateStore.loadResourceStates(
          "billing-destroy-retry",
        );
        yield* lifecycle.destroy(prepared);
        const recoveredStates = yield* stateStore.loadResourceStates(
          "billing-destroy-retry",
        );

        yield* Match.value(error).pipe(
          Match.when(
            { _tag: "ResourceCommandExecutionFailed" },
            () => Effect.void,
          ),
          Match.orElse((unexpected) => Effect.fail(unexpected)),
        );
        assert.deepStrictEqual(yield* capture.snapshot, [
          "destroy stripe product prod_test_destroy_retry",
          "destroy stripe product prod_test_destroy_retry",
        ]);
        const failedDestroyStateSummary = yield* Effect.forEach(
          failedStates,
          (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Deleting" }, (deleting) =>
                Effect.gen(function* () {
                  const outputs = yield* model.decodeOutputs(
                    deleting.node,
                    StripeProductOutputsSchema,
                  );

                  return {
                    failureTag: deleting.lastFailure?.errorTag,
                    phase: deleting._tag,
                    productId: outputs.ProductId,
                  };
                }),
              ),
              Match.orElse((other) =>
                Effect.gen(function* () {
                  const outputs = yield* model.decodeOutputs(
                    other.node,
                    StripeProductOutputsSchema,
                  );

                  return {
                    failureTag: undefined,
                    phase: other._tag,
                    productId: outputs.ProductId,
                  };
                }),
              ),
            ),
        );
        assert.deepStrictEqual(failedDestroyStateSummary, [
          {
            failureTag: "StripeProductDestroyFailed",
            phase: "Deleting",
            productId: "prod_test_destroy_retry",
          },
        ]);
        assert.deepStrictEqual(recoveredStates, []);
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.productDestroyFailsOnce(),
        ),
      ),
  );

  it.effect(
    "rolls back created dependency resources and keeps no saved state when a dependent provider create fails",
    () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const graph = yield* ResourceGraphStore;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* ProviderCommandFixtureCapture;
        const queueNode = yield* model.nodeFromResource({
          key: { logicalId: "EventsQueue" },
          propsSchema: QueuePropsSchema,
          outputsSchema: QueueOutputsSchema,
          props: { QueueName: "events" },
          outputs: {
            QueueUrl: "nomoss:pending:sqs:events",
            QueueArn: "nomoss:pending:sqs-arn:events",
          },
        });
        const customerNode = yield* model.nodeFromResource({
          key: { logicalId: "BillingCustomer" },
          propsSchema: StripeCustomerPropsSchema,
          outputsSchema: StripeCustomerOutputsSchema,
          props: {
            name: "Billing customer",
            metadata: {
              queue: "events",
            },
          },
          outputs: pendingStripeCustomerOutputs("BillingCustomer"),
        });

        /**
         * The same dependency shape is used for the failure path because
         * rollback only proves the required behavior after a dependency was
         * created for a later provider resource.
         */
        yield* graph.addResource(queueNode);
        yield* graph.addResource(customerNode);
        yield* graph.addDependency(queueNode.key, customerNode.key, {
          kind: "property",
          property: "metadata.queue",
          sourceProperty: "QueueUrl",
        });

        const prepared = yield* lifecycle.prepare("billing-stack");
        const error = yield* lifecycle.apply(prepared).pipe(Effect.flip);
        const saved = yield* stateStore.loadResources("billing-stack");
        const savedStates =
          yield* stateStore.loadResourceStates("billing-stack");

        yield* Match.value(error).pipe(
          Match.when({ _tag: "ResourceCommandExecutionFailed" }, (failed) =>
            Effect.sync(() =>
              assert.ok(failed.cause instanceof StripeCustomerCreateFailed),
            ),
          ),
          Match.orElse((unexpected) => Effect.fail(unexpected)),
        );
        assert.deepStrictEqual(yield* capture.snapshot, [
          "create aws queue",
          "create stripe customer",
          "destroy aws queue",
        ]);
        assert.deepStrictEqual(saved, []);
        assert.deepStrictEqual(
          Arr.map(savedStates, (state) =>
            Match.value(state).pipe(
              Match.when({ _tag: "Creating" }, (creating) => ({
                logicalId: creating.node.key.logicalId,
                phase: creating._tag,
                failureTag: creating.lastFailure?.errorTag,
              })),
              Match.orElse((other) => ({
                logicalId: other.node.key.logicalId,
                phase: other._tag,
                failureTag: undefined,
              })),
            ),
          ),
          [
            {
              logicalId: "BillingCustomer",
              phase: "Creating",
              failureTag: "StripeCustomerCreateFailed",
            },
          ],
        );
      }).pipe(
        Effect.provide(
          ResourceStackLifecycleProviderFixture.dependentStripeCreateFailure(),
        ),
      ),
  );
});
