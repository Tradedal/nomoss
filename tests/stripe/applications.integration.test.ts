import { assert, describe, it } from "@effect/vitest";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Record,
  Redacted,
  Schema,
  String as Str,
  Tuple,
} from "effect";
import { ResourceEntity } from "../../src/core/resource/model.js";
import { ResourceGraphStore } from "../../src/core/resource/resourceGraphStore.js";
import {
  type ResourceApplyResult,
  ResourceStackLifecycle,
} from "../../src/core/stack/resourceStackLifecycle.js";
import { ResourceStateStore } from "../../src/core/state/stateStore.js";
import { makeBillingPortalConfigurationsClient } from "../../src/providers/stripe/client/generated/billingPortalConfigurations.js";
import { makePricesClient } from "../../src/providers/stripe/client/generated/prices.js";
import { makeProductsClient } from "../../src/providers/stripe/client/generated/products.js";
import { StripeBillingConfigurationExportDocumentSchema } from "../../src/providers/stripe/client/generated/resourceInputs/StripeBillingConfigurationExportDocumentSchema.js";
import { makeWebhookEndpointsClient } from "../../src/providers/stripe/client/generated/webhookEndpoints.js";
import { StripeResources } from "../../src/providers/stripe/management/resources.js";
import {
  StripeApplicationIntegrationFixture,
  stripeApplicationIntegrationTestLayer,
} from "../support/stripeApplicationIntegrationFixture.js";
import {
  StripeBillingFixture,
  type StripeBillingScenario,
} from "../support/stripeBillingFixture.js";

/**
 * The StripeOfferObservation interface retains provider identities after apply
 * so a later update can distinguish price replacement from product replacement.
 * Teardown checks also need these identities after saved resources are gone.
 */
interface StripeOfferObservation {
  readonly productId: string;
  readonly priceId: string;
}

/**
 * The StripeApplicationObservation interface records the resolved application
 * values that reconciliation and replacement must preserve or update. Signing
 * secrets remain redacted because provider reads do not return them again.
 */
interface StripeApplicationObservation {
  readonly offers: Readonly<Record<string, StripeOfferObservation>>;
  readonly portalId: string;
  readonly webhookId: Option.Option<string>;
  readonly signingSecret: Option.Option<Redacted.Redacted<string>>;
  readonly configurationPath: Option.Option<string>;
}

/**
 * The verifyAppliedApplication helper checks a saved application's references
 * against live Stripe objects and its published configuration. Its result keeps
 * the identities needed to compare later reconciliation, replacement, and
 * teardown. The supplied apply result must belong to that declaration's stack.
 */
const verifyAppliedApplication = Effect.fn(
  "StripeApplicationsIntegration.verifyAppliedApplication",
)(function* (application: StripeBillingScenario, applied: ResourceApplyResult) {
  const products = yield* makeProductsClient;
  const prices = yield* makePricesClient;
  const portals = yield* makeBillingPortalConfigurationsClient;
  const webhooks = yield* makeWebhookEndpointsClient;
  const fs = yield* FileSystem.FileSystem;

  /**
   * The offers property links each declared product to its recurring price.
   * Provider reads must confirm that execution resolved those links and kept
   * the requested amount.
   */
  const offers = yield* Effect.forEach(
    Record.toEntries(application.offers),
    ([name, offer]) =>
      Effect.gen(function* () {
        const productId = offer.product.ProductId;
        const priceId = offer.price.PriceId;

        const product = yield* products.GetProductsId({ id: productId });
        const price = yield* prices.GetPricesPrice({ price: priceId });

        assert.strictEqual(product.livemode, false);
        assert.strictEqual(product.active, true);
        assert.strictEqual(
          product.metadata.nomoss_integration,
          applied.stackName,
        );
        assert.strictEqual(price.livemode, false);
        assert.strictEqual(price.active, true);
        assert.strictEqual(price.product, productId);
        assert.strictEqual(price.unit_amount, offer.price.props.unit_amount);
        assert.strictEqual(price.currency, "usd");

        const observation: StripeOfferObservation = { productId, priceId };

        return Tuple.make(name, observation);
      }),
  );

  /**
   * The portal property declares subscription choices through resource entities.
   * The live configuration must contain the current product and price for every
   * offer so subscribers can select the application's published plans.
   */
  const portalId = application.portal.BillingPortalConfigurationId;
  const portal = yield* portals.GetBillingPortalConfigurationsConfiguration({
    configuration: portalId,
    expand: ["features.subscription_update.products"],
  });
  const selections = portal.features.subscription_update.products ?? [];

  assert.strictEqual(portal.livemode, false);
  assert.strictEqual(portal.active, true);
  assert.strictEqual(portal.features.subscription_update.enabled, true);
  assert.lengthOf(selections, offers.length);
  assert.isTrue(
    Arr.every(offers, ([, offer]) =>
      Arr.some(
        selections,
        (selection) =>
          selection.product === offer.productId &&
          Arr.contains(selection.prices, offer.priceId),
      ),
    ),
  );

  /**
   * The webhook property supplies a signing secret only at creation. The output
   * property must still supply the saved secret after a provider read so the
   * application can verify incoming Stripe events.
   */
  const webhookId = Arr.map(
    Option.toArray(application.webhook),
    (resource) => resource.WebhookEndpointId,
  );
  const signingSecrets = yield* Effect.forEach(
    Option.toArray(application.webhook),
    (resource) =>
      Effect.gen(function* () {
        const id = resource.WebhookEndpointId;
        const endpoint = yield* webhooks.GetWebhookEndpointsWebhookEndpoint({
          webhook_endpoint: id,
        });

        assert.strictEqual(endpoint.livemode, false);
        assert.strictEqual(endpoint.status, "enabled");

        const secret = resource.WebhookSigningSecret;

        assert.isTrue(Str.startsWith("whsec_")(secret));

        const protectedSecret: Redacted.Redacted<string> =
          Redacted.make(secret);

        return protectedSecret;
      }),
  );

  /**
   * The configuration property publishes the resolved IDs consumed by the
   * application. The file must contain IDs that match the live
   * offers and portal, including a replacement price after an update.
   */
  const configurationPaths = Arr.map(
    Option.toArray(application.configuration),
    (resource) => resource.OutputPath,
  );
  const observedOffers = Record.fromEntries(offers);

  yield* Effect.forEach(configurationPaths, (outputPath) =>
    Effect.gen(function* () {
      const document = yield* fs
        .readFileString(outputPath)
        .pipe(
          Effect.flatMap(
            Schema.decodeEffect(
              Schema.fromJsonString(
                StripeBillingConfigurationExportDocumentSchema,
              ),
            ),
          ),
        );

      assert.strictEqual(document.mode, "test");
      assert.strictEqual(document.billingPortalConfigurationId, portalId);
      assert.strictEqual(
        document.products.starter,
        observedOffers.starter.productId,
      );
      assert.strictEqual(
        document.products.active,
        observedOffers.active.productId,
      );
      assert.strictEqual(
        document.products.advanced,
        observedOffers.advanced.productId,
      );
      assert.strictEqual(
        document.prices.starterMonthly,
        observedOffers.starter.priceId,
      );
      assert.strictEqual(
        document.prices.activeMonthly,
        observedOffers.active.priceId,
      );
      assert.strictEqual(
        document.prices.advancedMonthly,
        observedOffers.advanced.priceId,
      );
      assert.strictEqual(
        document.webhookEndpoint.id,
        Arr.head(webhookId).pipe(Option.getOrThrow),
      );
    }),
  );

  const observation: StripeApplicationObservation = {
    offers: observedOffers,
    portalId,
    webhookId: Arr.head(webhookId),
    signingSecret: Arr.head(signingSecrets),
    configurationPath: Arr.head(configurationPaths),
  };

  return observation;
});

/**
 * The verifyRejectedApplicationChanges helper checks that invalid declarations
 * leave an existing application's saved resources usable. Fractional price
 * amounts and references to an absent product must fail before they can replace
 * the offers or change the portal's provider identity.
 */
const verifyRejectedApplicationChanges = Effect.fn(
  "StripeApplicationsIntegration.verifyRejectedApplicationChanges",
)(function* (
  application: StripeBillingScenario,
  created: ResourceApplyResult,
  before: StripeApplicationObservation,
) {
  const apps = yield* StripeBillingFixture;
  const stripe = yield* StripeResources;
  const graph = yield* ResourceGraphStore;

  yield* graph.reset;

  const invalidInput = yield* apps
    .singleOffer(created.stackName, 0.5)
    .pipe(Effect.flip);

  assert.strictEqual(invalidInput._tag, "SchemaError");

  yield* graph.reset;

  const missingDependency = yield* stripe
    .Price({
      logicalId: "BrokenPrice",
      props: {
        product: new ResourceEntity({
          key: { logicalId: "MissingProduct" },
          resourceType: {
            provider: "stripe",
            service: "billing",
            resource: "product",
          },
        }),
        currency: "usd",
        recurring: { interval: "month" },
        unit_amount: 100,
      },
    })
    .pipe(Effect.flip);

  assert.isTrue(
    missingDependency._tag === "ResourceNotFound" &&
      missingDependency.key.logicalId === "MissingProduct",
  );

  const preserved = yield* verifyAppliedApplication(application, created);

  assert.deepStrictEqual(preserved.offers, before.offers);
  assert.strictEqual(preserved.portalId, before.portalId);
});

/**
 * The verifyRetiredApplication helper checks the provider and saved state after
 * explicit stack destruction. Stripe products, prices, and portal settings
 * become inactive; webhook endpoints disappear and exported files are removed.
 * The observation supplies provider IDs after saved state has been cleared.
 */
const verifyRetiredApplication = Effect.fn(
  "StripeApplicationsIntegration.verifyRetiredApplication",
)(function* (stackName: string, after: StripeApplicationObservation) {
  const state = yield* ResourceStateStore;
  const fs = yield* FileSystem.FileSystem;
  const prices = yield* makePricesClient;
  const products = yield* makeProductsClient;
  const portals = yield* makeBillingPortalConfigurationsClient;
  const webhooks = yield* makeWebhookEndpointsClient;

  assert.deepStrictEqual(yield* state.loadResourceStates(stackName), []);

  yield* Effect.forEach(Record.values(after.offers), (offer) =>
    Effect.gen(function* () {
      const product = yield* products.GetProductsId({ id: offer.productId });
      const price = yield* prices.GetPricesPrice({ price: offer.priceId });

      assert.strictEqual(product.active, false);
      assert.strictEqual(price.active, false);
    }),
  );

  assert.strictEqual(
    (yield* portals.GetBillingPortalConfigurationsConfiguration({
      configuration: after.portalId,
    })).active,
    false,
  );

  yield* Effect.forEach(Option.toArray(after.webhookId), (webhookId) =>
    Effect.gen(function* () {
      const missing = yield* webhooks
        .GetWebhookEndpointsWebhookEndpoint({ webhook_endpoint: webhookId })
        .pipe(Effect.flip);

      assert.isTrue("statusCode" in missing && missing.statusCode === 404);
    }),
  );

  yield* Effect.forEach(Option.toArray(after.configurationPath), (path) =>
    Effect.gen(function* () {
      const exists = yield* fs.exists(path);

      assert.strictEqual(exists, false);
    }),
  );
});

/**
 * The Stripe applications integration suite exercises each example through the
 * production declaration and stack services. Live reads establish the applied
 * billing configuration, while saved state and exported files establish what
 * the application can still use after reconciliation or replacement.
 */
describe("Stripe applications", () => {
  it.live(
    "A single-offer app resolves product and price inputs into portal settings and removes its resources",
    () =>
      Effect.gen(function* () {
        const apps = yield* StripeBillingFixture;
        const lifecycle = yield* ResourceStackLifecycle;
        const graph = yield* ResourceGraphStore;
        const fixture = yield* StripeApplicationIntegrationFixture;
        const prices = yield* makePricesClient;

        const application = yield* apps.singleOffer(fixture.stackName, 100);

        const initial = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(initial);

        const created = yield* lifecycle.apply(initial);
        const before = yield* verifyAppliedApplication(application, created);

        yield* verifyRejectedApplicationChanges(application, created, before);

        const reconciled = yield* lifecycle.reconcile(initial);
        const afterRead = yield* verifyAppliedApplication(application, created);

        assert.deepStrictEqual(reconciled.missing, []);
        assert.deepStrictEqual(afterRead.offers, before.offers);
        assert.strictEqual(afterRead.portalId, before.portalId);

        /**
         * The singleOffer service method changes the requested amount
         * for the existing offer. Stripe prices have immutable amounts, so the
         * update must replace the price and keep the product and portal IDs.
         */
        yield* graph.reset;

        const revised = yield* apps.singleOffer(fixture.stackName, 200);

        const update = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(update);

        const updated = yield* lifecycle.apply(update);
        const after = yield* verifyAppliedApplication(revised, updated);
        const retired = yield* prices.GetPricesPrice({
          price: before.offers.starter.priceId,
        });

        assert.strictEqual(after.portalId, before.portalId);
        assert.strictEqual(
          after.offers.starter.productId,
          before.offers.starter.productId,
        );
        assert.notStrictEqual(
          after.offers.starter.priceId,
          before.offers.starter.priceId,
        );
        assert.strictEqual(retired.active, false);

        yield* lifecycle.destroy(update);
        yield* fixture.releaseCleanup;
        yield* verifyRetiredApplication(fixture.stackName, after);
      }).pipe(
        Effect.scoped,
        Effect.provide(stripeApplicationIntegrationTestLayer),
      ),
    180_000,
  );

  it.live(
    "A two-offer app replaces one linked price while preserving the other offer and cleans up its provider resources",
    () =>
      Effect.gen(function* () {
        const apps = yield* StripeBillingFixture;
        const lifecycle = yield* ResourceStackLifecycle;
        const graph = yield* ResourceGraphStore;
        const fixture = yield* StripeApplicationIntegrationFixture;
        const prices = yield* makePricesClient;

        const application = yield* apps.twoOffers(fixture.stackName, 100);

        const initial = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(initial);

        const created = yield* lifecycle.apply(initial);
        const before = yield* verifyAppliedApplication(application, created);

        yield* verifyRejectedApplicationChanges(application, created, before);

        const reconciled = yield* lifecycle.reconcile(initial);
        const afterRead = yield* verifyAppliedApplication(application, created);

        assert.deepStrictEqual(reconciled.missing, []);
        assert.deepStrictEqual(afterRead.offers, before.offers);
        assert.strictEqual(afterRead.portalId, before.portalId);

        /**
         * The twoOffers service method revises only the starter offer.
         * Its replacement price must reach the shared portal. The other offer's
         * product and price must remain unchanged.
         */
        yield* graph.reset;

        const revised = yield* apps.twoOffers(fixture.stackName, 200);

        const update = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(update);

        const updated = yield* lifecycle.apply(update);
        const after = yield* verifyAppliedApplication(revised, updated);
        const retired = yield* prices.GetPricesPrice({
          price: before.offers.starter.priceId,
        });

        assert.strictEqual(after.portalId, before.portalId);
        assert.strictEqual(
          after.offers.starter.productId,
          before.offers.starter.productId,
        );
        assert.notStrictEqual(
          after.offers.starter.priceId,
          before.offers.starter.priceId,
        );
        assert.deepStrictEqual(after.offers.active, before.offers.active);
        assert.strictEqual(retired.active, false);

        yield* lifecycle.destroy(update);
        yield* fixture.releaseCleanup;
        yield* verifyRetiredApplication(fixture.stackName, after);
      }).pipe(
        Effect.scoped,
        Effect.provide(stripeApplicationIntegrationTestLayer),
      ),
    180_000,
  );

  it.live(
    "An exported billing app preserves ownership after an invalid file, replaces its destination, and recreates a missing export before teardown",
    () =>
      Effect.gen(function* () {
        const apps = yield* StripeBillingFixture;
        const lifecycle = yield* ResourceStackLifecycle;
        const graph = yield* ResourceGraphStore;
        const fixture = yield* StripeApplicationIntegrationFixture;
        const prices = yield* makePricesClient;

        const application = yield* apps.exportedCatalog(
          fixture.stackName,
          100,
          fixture.outputPath,
        );

        const initial = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(initial);

        const created = yield* lifecycle.apply(initial);
        const before = yield* verifyAppliedApplication(application, created);

        yield* verifyRejectedApplicationChanges(application, created, before);

        /**
         * The reconcile service method refreshes webhook state from a response
         * that omits its signing secret. The application must retain the saved
         * secret so event verification remains possible after that read.
         */
        const reconciled = yield* lifecycle.reconcile(initial);
        const afterRead = yield* verifyAppliedApplication(application, created);

        assert.deepStrictEqual(reconciled.missing, []);
        assert.deepStrictEqual(afterRead.offers, before.offers);
        assert.strictEqual(afterRead.portalId, before.portalId);
        assert.strictEqual(
          Redacted.value(Option.getOrThrow(afterRead.signingSecret)),
          Redacted.value(Option.getOrThrow(before.signingSecret)),
        );

        const fs = yield* FileSystem.FileSystem;
        const state = yield* ResourceStateStore;
        const owned = yield* state.loadResources(fixture.stackName);
        const published = yield* fs.readFileString(fixture.outputPath);

        yield* fs.writeFileString(fixture.outputPath, "{");

        const invalidFile = yield* lifecycle
          .reconcile(initial)
          .pipe(Effect.flip);
        const preserved = yield* state.loadResources(fixture.stackName);

        assert.strictEqual(invalidFile._tag, "ResourceCommandExecutionFailed");
        assert.deepStrictEqual(preserved, owned);

        yield* fs.writeFileString(fixture.outputPath, published);

        /**
         * The exportedCatalog service method publishes IDs for three
         * offers and a webhook. A replacement price must reach both the portal
         * and the saved application document while the other identities stay
         * available to existing application consumers.
         */
        yield* graph.reset;

        const revisedOutputPath = `${fixture.outputPath}.revised`;
        const revised = yield* apps.exportedCatalog(
          fixture.stackName,
          200,
          revisedOutputPath,
        );

        const update = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(update);

        const updated = yield* lifecycle.apply(update);
        const after = yield* verifyAppliedApplication(revised, updated);
        const retired = yield* prices.GetPricesPrice({
          price: before.offers.starter.priceId,
        });

        assert.strictEqual(after.portalId, before.portalId);
        assert.strictEqual(
          after.offers.starter.productId,
          before.offers.starter.productId,
        );
        assert.notStrictEqual(
          after.offers.starter.priceId,
          before.offers.starter.priceId,
        );
        assert.deepStrictEqual(after.offers.active, before.offers.active);
        assert.deepStrictEqual(after.offers.advanced, before.offers.advanced);
        assert.deepStrictEqual(after.webhookId, before.webhookId);
        assert.strictEqual(retired.active, false);
        assert.strictEqual(
          Option.getOrThrow(after.configurationPath),
          revisedOutputPath,
        );
        assert.strictEqual(yield* fs.exists(fixture.outputPath), false);

        yield* fs.remove(revisedOutputPath);

        const missingFile = yield* lifecycle.reconcile(update);

        assert.deepStrictEqual(
          Arr.map(missingFile.missing, (node) => node.key.logicalId),
          ["BillingConfiguration"],
        );

        const recovery = yield* lifecycle.prepare(fixture.stackName);

        yield* fixture.trackStack(recovery);

        const recreated = yield* lifecycle.apply(recovery);
        const recovered = yield* verifyAppliedApplication(revised, recreated);

        assert.deepStrictEqual(recovered, after);

        yield* lifecycle.destroy(recovery);
        yield* fixture.releaseCleanup;
        yield* verifyRetiredApplication(fixture.stackName, after);
      }).pipe(
        Effect.scoped,
        Effect.provide(stripeApplicationIntegrationTestLayer),
      ),
    180_000,
  );
});
