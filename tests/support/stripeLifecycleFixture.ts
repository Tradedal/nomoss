import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  Option,
  Path,
  Redacted,
  Ref,
} from "effect";
import { HttpClient, HttpClientRequest, HttpClientResponse } from "effect/http";
import { KeyValueStore } from "effect/persistence";
import {
  type ResourcePreparedStack,
  ResourceStackLifecycle,
} from "../../src/core/stack/resourceStackLifecycle.js";
import {
  type ResourceApplicationPreparation,
  ResourceStackOperations,
  resourceStackOperationsLayer,
} from "../../src/core/stack/resourceStackOperations.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import type { PostBillingPortalConfigurationsOutput } from "../../src/providers/stripe/client/generated/billingPortalConfigurations.js";
import type { PostCouponsOutput } from "../../src/providers/stripe/client/generated/coupons.js";
import type { PostCustomersOutput } from "../../src/providers/stripe/client/generated/customers.js";
import type { PostPricesOutput } from "../../src/providers/stripe/client/generated/prices.js";
import type { PostProductsOutput } from "../../src/providers/stripe/client/generated/products.js";
import { stripeTestHelpersTestClockResourceClientLayer } from "../../src/providers/stripe/client/generated/resourceBindings/TestHelpersTestClock.js";
import type { PostTestHelpersTestClocksOutput } from "../../src/providers/stripe/client/generated/testHelpersTestClocks.js";
import type { PostWebhookEndpointsOutput } from "../../src/providers/stripe/client/generated/webhookEndpoints.js";
import { StripeClientConfig } from "../../src/providers/stripe/client/stripeClientConfig.js";
import { StripeResources } from "../../src/providers/stripe/management/resources.js";
import { stripeStackLayer } from "../../src/providers/stripe/runtime.js";

export const stripeCustomer: PostCustomersOutput = {
  created: 1,
  id: "cus_test_customer",
  livemode: false,
  object: "customer",
};

export const stripeTestClock: PostTestHelpersTestClocksOutput = {
  created: 1700000000,
  deletes_after: 1800000000,
  frozen_time: 1700000000,
  id: "clock_test_billing",
  livemode: false,
  name: "Billing simulation",
  object: "test_helpers.test_clock",
  status: "ready",
  status_details: {},
};

export const stripeCoupon: PostCouponsOutput = {
  created: 1700000000,
  duration: "once",
  id: "coupon_test_discount",
  livemode: false,
  name: "Welcome discount",
  object: "coupon",
  percent_off: 10,
  times_redeemed: 0,
  valid: true,
};

export const stripeProduct: PostProductsOutput = {
  active: true,
  created: 1,
  description: null,
  id: "prod_test_starter",
  images: [],
  livemode: false,
  marketing_features: [],
  metadata: {},
  name: "Example Starter",
  object: "product",
  shippable: null,
  updated: 1,
  url: null,
};

export const stripePrice: PostPricesOutput = {
  active: true,
  billing_scheme: "per_unit",
  created: 1,
  currency: "usd",
  id: "price_test_starter_monthly",
  livemode: false,
  lookup_key: "example_starter_monthly_dev",
  metadata: {},
  nickname: "Starter monthly",
  object: "price",
  product: "prod_test_starter",
  recurring: {
    interval: "month",
    interval_count: 1,
    meter: null,
    trial_period_days: null,
    usage_type: "licensed",
  },
  tax_behavior: "unspecified",
  type: "recurring",
  unit_amount: 2900,
  unit_amount_decimal: "2900",
};

export const stripeWebhook: PostWebhookEndpointsOutput = {
  api_version: "2026-06-24.dahlia",
  application: null,
  created: 1,
  description: "Billing webhook",
  enabled_events: ["checkout.session.completed"],
  id: "we_test_billing_events",
  livemode: false,
  metadata: {},
  object: "webhook_endpoint",
  secret: "whsec_test_billing_events",
  status: "enabled",
  url: "https://example.test/api/stripe/webhook",
};

export const stripePortal: PostBillingPortalConfigurationsOutput = {
  active: true,
  business_profile: {
    headline: "Billing",
    privacy_policy_url: null,
    terms_of_service_url: null,
  },
  created: 1,
  default_return_url: "https://app.example.test/account/billing",
  features: {
    customer_update: { allowed_updates: [], enabled: false },
    invoice_history: { enabled: true },
    subscription_pause: {
      enabled: false,
      duration: { interval_options: [], type: "indefinite" },
    },
    payment_method_update: {
      enabled: true,
      payment_method_configuration: null,
    },
    subscription_cancel: {
      cancellation_reason: {
        enabled: false,
        feedback_options: [],
        options: [],
      },
      enabled: true,
      mode: "at_period_end",
      proration_behavior: "none",
    },
    subscription_update: {
      default_allowed_updates: [],
      enabled: false,
      proration_behavior: "none",
      schedule_at_period_end: { conditions: [] },
      trial_update_behavior: "continue_trial",
    },
  },
  id: "bpc_test_example",
  is_default: false,
  livemode: false,
  login_page: { enabled: false, url: null },
  metadata: {},
  name: "Billing portal",
  object: "billing_portal.configuration",
  updated: 1,
};

/**
 * StripeLifecycleFixture captures native HTTP requests and supplies queued
 * responses for each method and path. Independent resource requests consume
 * separate queues, so their scheduling does not select another operation's
 * response. Production Stripe operations decode the supplied payloads.
 */
export class StripeLifecycleFixture extends Context.Service<StripeLifecycleFixture>()(
  "nomoss/tests/support/stripeLifecycleFixture",
  {
    make: Effect.gen(function* () {
      const captured = yield* Ref.make<ReadonlyArray<Request>>([]);
      const responses = yield* Ref.make(
        HashMap.empty<string, ReadonlyArray<Response>>(),
      );

      /**
       * enqueueResponses appends replies for one method and path in request
       * order. Separate operation queues permit concurrent resource execution
       * and assign replies independently of global request timing.
       */
      const enqueueResponses = (
        method: string,
        path: string,
        replies: ReadonlyArray<Response>,
      ) =>
        Ref.update(responses, (current) => {
          const key = `${method} ${path}`;
          const queued = Option.getOrElse(HashMap.get(current, key), () => []);

          return HashMap.set(current, key, Arr.appendAll(queued, replies));
        });

      /**
       * requestsFor retains readable request bodies for assertions about the
       * properties serialized by the generated Stripe client.
       */
      const requestsFor = Effect.fn("StripeLifecycleFixture.requestsFor")(
        function* (method: string, path: string) {
          const requests = yield* Ref.get(captured);

          const matching: ReadonlyArray<Request> = Arr.filter(
            requests,
            (request) =>
              request.method === method &&
              new URL(request.url).pathname === path,
          );

          return matching;
        },
      );

      const transport = HttpClient.make(
        Effect.fn(function* (request) {
          const sent: Request = yield* HttpClientRequest.toWeb(request).pipe(
            Effect.orDie,
          );

          yield* Ref.update(captured, Arr.append(sent));

          const key = `${sent.method} ${new URL(sent.url).pathname}`;
          const reply = yield* Ref.modify(responses, (current) => [
            Option.flatMap(HashMap.get(current, key), Arr.head),
            HashMap.modify(current, key, (queued) => Arr.drop(queued, 1)),
          ]).pipe(
            Effect.flatMap(Effect.fromOption),
            Effect.catch(() =>
              Effect.die(new Error(`Unexpected Stripe request: ${key}`)),
            ),
          );

          const response: HttpClientResponse.HttpClientResponse =
            HttpClientResponse.fromWeb(request, reply);

          return response;
        }),
      );

      return {
        enqueueResponses,
        requests: Ref.get(captured),
        requestsFor,
        transport,
      };
    }),
  },
) {}

/**
 * stripeLifecycleTestLayer uses the production billing stack with controlled
 * HTTP, credentials, filesystem, and memory persistence. Tests share the same
 * fixture instance as the provider transport within each scoped graph.
 */
export const stripeLifecycleTestLayer = stripeStackLayer.pipe(
  Layer.provide([
    Layer.effect(
      HttpClient.HttpClient,
      Effect.map(StripeLifecycleFixture, (fixture) => fixture.transport),
    ),
    Layer.effect(
      FileSystem.FileSystem,
      Effect.map(KeyValueStore.KeyValueStore, (storage) =>
        FileSystem.makeNoop({
          makeDirectory: () => Effect.void,
          readFileString: (path) =>
            storage.get(path).pipe(
              Effect.flatMap((value) =>
                Effect.fromOption(Option.fromUndefinedOr(value)),
              ),
              Effect.orDie,
            ),
          writeFileString: (path, contents) =>
            storage.set(path, contents).pipe(Effect.orDie),
          exists: (path) => storage.has(path).pipe(Effect.orDie),
          remove: (path) => storage.remove(path).pipe(Effect.orDie),
        }),
      ),
    ),
  ]),
  Layer.provideMerge(
    Layer.effect(StripeLifecycleFixture, StripeLifecycleFixture.make),
  ),
  Layer.provide(
    Layer.succeed(StripeClientConfig, {
      apiKey: Redacted.make("stripe-test-key"),
      apiBaseUrl: "https://stripe.test",
    }),
  ),
  Layer.provide(StateSecretServiceDefaultLayer),
  Layer.provide(Path.layer),
  Layer.provideMerge(KeyValueStore.layerMemory),
);

export const stripeConfiguredStackTestLayer = Layer.mergeAll(
  Layer.effect(StripeLifecycleFixture, StripeLifecycleFixture.make),
  KeyValueStore.layerMemory,
  FileSystem.layerNoop({}),
  Path.layer,
);

/**
 * The stripeStackOperationsTestLayer Layer uses the enclosing test's transport
 * and saved state for billing declarations and execution. Its application scope
 * owns the services needed while a product and price plan waits for review.
 */
export const stripeStackOperationsTestLayer = resourceStackOperationsLayer.pipe(
  Layer.provideMerge(stripeStackLayer),
  Layer.provide([
    Layer.effect(
      HttpClient.HttpClient,
      Effect.map(StripeLifecycleFixture, (fixture) => fixture.transport),
    ),
    Layer.succeed(StripeClientConfig, {
      apiKey: Redacted.make("stripe-test-key"),
      apiBaseUrl: "https://stripe.test",
    }),
    StateSecretServiceDefaultLayer,
  ]),
);

/**
 * Billing workflows prepared by the declareBillingStack Effect retain the
 * product entity until apply can resolve its provider identity for the price.
 * Requests use the fixture's HTTP transport, and saved state remains available
 * across application runtimes.
 */
export const declareBillingStack = Effect.fn(
  "StripeLifecycleFixture.declareBillingStack",
)(function* (stackName: string) {
  const operations = yield* ResourceStackOperations;
  yield* operations.beginDeclaration(stackName);
  const stripe = yield* StripeResources;
  const product = yield* stripe.Product({
    logicalId: "Product",
    props: { name: stripeProduct.name },
  });
  const price = yield* stripe.Price({
    logicalId: "MonthlyPrice",
    props: {
      product,
      currency: "usd",
      unit_amount: 2900,
      recurring: { interval: "month" },
    },
  });

  const prepared: ResourceApplicationPreparation<{
    readonly productId: string;
    readonly priceId: string;
  }> = yield* operations.prepare(stackName, () => ({
    productId: product.ProductId,
    priceId: price.PriceId,
  }));
  return prepared;
}, Effect.scoped);

export const stripeTestClockClientTestLayer =
  stripeTestHelpersTestClockResourceClientLayer.pipe(
    Layer.provideMerge(stripeLifecycleTestLayer),
  );

/**
 * createStripeProductStack applies the shared product scenario through normal
 * declaration and persistence. Read tests receive a prepared stack whose saved
 * identity was returned by the production Stripe client.
 */
export const createStripeProductStack = Effect.fn(
  "StripeLifecycleFixture.createStripeProductStack",
)(function* (stackName: string) {
  const fixture = yield* StripeLifecycleFixture;
  const stripe = yield* StripeResources;
  const lifecycle = yield* ResourceStackLifecycle;

  yield* fixture.enqueueResponses("POST", "/v1/products", [
    Response.json(stripeProduct),
  ]);

  yield* stripe.Product({
    logicalId: "Product",
    props: { name: stripeProduct.name },
  });

  const prepared: ResourcePreparedStack = yield* lifecycle.prepare(stackName);

  yield* lifecycle.apply(prepared);

  return prepared;
});

/**
 * The createStripeCouponStack helper returns an applied stack with a saved
 * CouponId through generated command registration. Callers can change its
 * declarations or remove them before preparing another run.
 */
export const createStripeCouponStack = Effect.fn(
  "StripeLifecycleFixture.createStripeCouponStack",
)(function* (stackName: string) {
  const fixture = yield* StripeLifecycleFixture;
  const stripe = yield* StripeResources;
  const lifecycle = yield* ResourceStackLifecycle;
  yield* fixture.enqueueResponses("POST", "/v1/coupons", [
    Response.json(stripeCoupon),
  ]);
  yield* stripe.Coupon({
    logicalId: "WelcomeDiscount",
    props: { duration: "once", percent_off: 10 },
  });
  const prepared: ResourcePreparedStack = yield* lifecycle.prepare(stackName);
  yield* lifecycle.apply(prepared);
  return prepared;
});
