import { assert, describe, it } from "@effect/vitest";
import { Array as Arr, Effect, FileSystem, Ref, Schema } from "effect";
import { SecureRandom } from "effect/crypto";

import {
  type ResourceKey,
  ResourceOutput,
} from "../../src/core/resource/model.js";
import { ResourceGraphStore } from "../../src/core/resource/resourceGraphStore.js";
import { ResourceOutputResolver } from "../../src/core/resource/resourceOutputResolver.js";
import {
  type ResourceApplyResult,
  type ResourcePreparedStack,
  ResourceStackLifecycle,
} from "../../src/core/stack/resourceStackLifecycle.js";
import { ResourceStateStore } from "../../src/core/state/stateStore.js";
import { makeCustomersClient } from "../../src/providers/stripe/client/generated/customers.js";
import { makePricesClient } from "../../src/providers/stripe/client/generated/prices.js";
import { makeProductsClient } from "../../src/providers/stripe/client/generated/products.js";
import { StripeResources } from "../../src/providers/stripe/management/resources.js";
import { stripeIntegrationLayer } from "../support/stripeIntegrationFixture.js";

const customerKey: ResourceKey = { logicalId: "Customer" };
const productKey: ResourceKey = { logicalId: "Product" };
const priceKey: ResourceKey = { logicalId: "MonthlyPrice" };

const customerIdRef = new ResourceOutput(
  customerKey,
  "CustomerId",
  Schema.String,
);
const productIdRef = new ResourceOutput(productKey, "ProductId", Schema.String);
const priceIdRef = new ResourceOutput(priceKey, "PriceId", Schema.String);

const declareInitialBillingStack = Effect.fn(
  "StripeIntegration.declareInitialBillingStack",
)(function* (stackName: string) {
  const stripe = yield* StripeResources;
  const lifecycle = yield* ResourceStackLifecycle;
  const metadata = { nomoss_integration: stackName };

  yield* stripe.Customer({
    logicalId: customerKey.logicalId,
    props: { name: stackName, description: "Initial customer", metadata },
  });
  const product = yield* stripe.Product({
    logicalId: productKey.logicalId,
    props: { name: stackName, metadata },
  });
  yield* stripe.Price({
    logicalId: priceKey.logicalId,
    props: {
      product,
      currency: "usd",
      recurring: { interval: "month" },
      unit_amount: 100,
      nickname: "Initial price",
      metadata,
    },
  });

  const prepared: ResourcePreparedStack = yield* lifecycle.prepare(stackName);

  return prepared;
});

const verifyCreatedBillingResources = Effect.fn(
  "StripeIntegration.verifyCreatedBillingResources",
)(function* (applied: ResourceApplyResult) {
  const state = yield* ResourceStateStore;
  const resolver = yield* ResourceOutputResolver;
  const customers = yield* makeCustomersClient;
  const products = yield* makeProductsClient;
  const prices = yield* makePricesClient;
  const saved = yield* state.loadResources(applied.stackName);

  const customerId = yield* resolver.resolveOutput(
    customerIdRef,
    saved,
    Schema.String,
  );
  const productId = yield* resolver.resolveOutput(
    productIdRef,
    saved,
    Schema.String,
  );
  const priceId = yield* resolver.resolveOutput(
    priceIdRef,
    saved,
    Schema.String,
  );
  const customer = yield* customers.GetCustomersCustomer({
    customer: customerId,
  });
  const product = yield* products.GetProductsId({ id: productId });
  const price = yield* prices.GetPricesPrice({ price: priceId });

  assert.strictEqual(saved.length, 3);
  assert.strictEqual(customer.livemode, false);
  assert.strictEqual(product.livemode, false);
  assert.strictEqual(price.livemode, false);
  assert.strictEqual(product.name, applied.stackName);
  assert.strictEqual(price.product, productId);
  assert.strictEqual(price.unit_amount, 100);
});

const declareUpdatedBillingStack = Effect.fn(
  "StripeIntegration.declareUpdatedBillingStack",
)(function* (stackName: string) {
  const graph = yield* ResourceGraphStore;
  const stripe = yield* StripeResources;
  const lifecycle = yield* ResourceStackLifecycle;
  const metadata = { nomoss_integration: stackName };

  yield* graph.reset;
  yield* stripe.Customer({
    logicalId: customerKey.logicalId,
    props: { name: stackName, description: "Updated customer", metadata },
  });
  const product = yield* stripe.Product({
    logicalId: productKey.logicalId,
    props: { name: `${stackName} updated`, metadata },
  });
  yield* stripe.Price({
    logicalId: priceKey.logicalId,
    props: {
      product,
      currency: "usd",
      recurring: { interval: "month" },
      unit_amount: 200,
      nickname: "Updated price",
      metadata,
    },
  });

  const prepared: ResourcePreparedStack = yield* lifecycle.prepare(stackName);

  return prepared;
});

const verifyUpdatedBillingResources = Effect.fn(
  "StripeIntegration.verifyUpdatedBillingResources",
)(function* (created: ResourceApplyResult, updated: ResourceApplyResult) {
  const state = yield* ResourceStateStore;
  const resolver = yield* ResourceOutputResolver;
  const customers = yield* makeCustomersClient;
  const products = yield* makeProductsClient;
  const prices = yield* makePricesClient;
  const saved = yield* state.loadResources(updated.stackName);

  const customerId = yield* resolver.resolveOutput(
    customerIdRef,
    created.resources,
    Schema.String,
  );
  const productId = yield* resolver.resolveOutput(
    productIdRef,
    created.resources,
    Schema.String,
  );
  const previousPriceId = yield* resolver.resolveOutput(
    priceIdRef,
    created.resources,
    Schema.String,
  );
  const updatedPriceId = yield* resolver.resolveOutput(
    priceIdRef,
    saved,
    Schema.String,
  );
  const customer = yield* customers.GetCustomersCustomer({
    customer: customerId,
  });
  const product = yield* products.GetProductsId({ id: productId });
  const price = yield* prices.GetPricesPrice({ price: updatedPriceId });
  const replacedPrice = yield* prices.GetPricesPrice({
    price: previousPriceId,
  });

  assert.strictEqual(customer.description, "Updated customer");
  assert.strictEqual(product.name, `${updated.stackName} updated`);
  assert.strictEqual(price.nickname, "Updated price");
  assert.strictEqual(price.unit_amount, 200);
  assert.strictEqual(replacedPrice.active, false);
});

const verifyBillingReconciliation = Effect.fn(
  "StripeIntegration.verifyBillingReconciliation",
)(function* (prepared: ResourcePreparedStack) {
  const lifecycle = yield* ResourceStackLifecycle;
  const state = yield* ResourceStateStore;
  const resolver = yield* ResourceOutputResolver;
  const customers = yield* makeCustomersClient;
  const saved = yield* state.loadResources(prepared.stackName);

  const priceId = yield* resolver.resolveOutput(
    priceIdRef,
    saved,
    Schema.String,
  );
  const customerId = yield* resolver.resolveOutput(
    customerIdRef,
    saved,
    Schema.String,
  );
  const present = yield* lifecycle.reconcile(prepared);

  assert.deepStrictEqual(present.missing, []);
  assert.strictEqual(
    yield* resolver.resolveOutput(priceIdRef, present.resources, Schema.String),
    priceId,
  );

  yield* customers.DeleteCustomersCustomer({ customer: customerId });
  const observed = yield* lifecycle.reconcile(prepared);

  assert.deepStrictEqual(
    Arr.map(observed.missing, (node) => node.key.logicalId),
    [customerKey.logicalId],
  );
  assert.strictEqual(observed.resources.length, 2);
  assert.deepStrictEqual(
    yield* state.loadResources(prepared.stackName),
    observed.resources,
  );
});

const removeBillingStack = Effect.fn("StripeIntegration.removeBillingStack")(
  function* (applied: ResourceApplyResult) {
    const graph = yield* ResourceGraphStore;
    const lifecycle = yield* ResourceStackLifecycle;
    const resolver = yield* ResourceOutputResolver;
    const state = yield* ResourceStateStore;
    const customers = yield* makeCustomersClient;
    const products = yield* makeProductsClient;
    const prices = yield* makePricesClient;

    const customerId = yield* resolver.resolveOutput(
      customerIdRef,
      applied.resources,
      Schema.String,
    );
    const saved = yield* state.loadResources(applied.stackName);
    const productId = yield* resolver.resolveOutput(
      productIdRef,
      saved,
      Schema.String,
    );
    const priceId = yield* resolver.resolveOutput(
      priceIdRef,
      saved,
      Schema.String,
    );

    yield* graph.reset;
    const removal = yield* lifecycle.prepare(applied.stackName);
    yield* lifecycle.apply(removal);

    const product = yield* products.GetProductsId({ id: productId });
    const price = yield* prices.GetPricesPrice({ price: priceId });
    const customer = yield* customers.GetCustomersCustomer({
      customer: customerId,
    });

    assert.strictEqual(product.active, false);
    assert.strictEqual(price.active, false);
    assert.isTrue("deleted" in customer && customer.deleted);
    assert.deepStrictEqual(
      yield* state.loadResourceStates(applied.stackName),
      [],
    );
  },
);

const destroyBillingStack = Effect.fn("StripeIntegration.destroyBillingStack")(
  function* (prepared: ResourcePreparedStack) {
    const lifecycle = yield* ResourceStackLifecycle;
    const fs = yield* FileSystem.FileSystem;

    yield* lifecycle.destroy(prepared);
    yield* fs.remove(`.nomoss/state/${prepared.stackName}.json`);
  },
);

const runBillingLifecycle = Effect.fn("StripeIntegration.runBillingLifecycle")(
  function* () {
    const lifecycle = yield* ResourceStackLifecycle;
    const fs = yield* FileSystem.FileSystem;
    const random = yield* SecureRandom.SecureRandom;
    const id = yield* random.uuidV4();
    const stackName = `stripe-integration-${id}`;
    const initial = yield* declareInitialBillingStack(stackName);
    const cleanupStack = yield* Ref.make(initial);
    const cleanupRequired = yield* Ref.make(true);

    yield* Effect.acquireRelease(Effect.void, () =>
      Ref.get(cleanupStack).pipe(
        Effect.flatMap(destroyBillingStack),
        Effect.when(Ref.get(cleanupRequired)),
        Effect.orDie,
      ),
    );

    yield* Effect.logInfo("Running Stripe sandbox integration", { stackName });

    const created = yield* lifecycle.apply(initial);
    yield* verifyCreatedBillingResources(created);

    const update = yield* declareUpdatedBillingStack(stackName);
    yield* Ref.set(cleanupStack, update);
    const updated = yield* lifecycle.apply(update);
    yield* verifyUpdatedBillingResources(created, updated);

    yield* verifyBillingReconciliation(update);
    yield* removeBillingStack(updated);
    yield* Ref.set(cleanupRequired, false);
    yield* fs.remove(`.nomoss/state/${stackName}.json`);

    yield* Effect.logInfo("Removed Stripe sandbox integration resources", {
      stackName,
    });
  },
);

describe("Stripe sandbox resources", () => {
  it.live(
    "Stripe billing resources can be created, changed, reconciled, and removed",
    () =>
      runBillingLifecycle().pipe(
        Effect.scoped,
        Effect.provide(stripeIntegrationLayer),
      ),
    180_000,
  );
});
