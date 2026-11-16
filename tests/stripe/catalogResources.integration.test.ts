import { assert, describe, it } from "@effect/vitest";
import { Effect, Ref } from "effect";
import { SecureRandom } from "effect/crypto";
import { makeCouponsClient } from "../../src/providers/stripe/client/generated/coupons.js";
import {
  projectStripeCouponOutputs,
  StripeCouponResourceClient,
} from "../../src/providers/stripe/client/generated/resourceBindings/Coupon.js";
import {
  projectStripeShippingRateOutputs,
  StripeShippingRateResourceClient,
} from "../../src/providers/stripe/client/generated/resourceBindings/ShippingRate.js";
import {
  projectStripeTaxRateOutputs,
  StripeTaxRateResourceClient,
} from "../../src/providers/stripe/client/generated/resourceBindings/TaxRate.js";
import { makeShippingRatesClient } from "../../src/providers/stripe/client/generated/shippingRates.js";
import { makeTaxRatesClient } from "../../src/providers/stripe/client/generated/taxRates.js";
import { stripeIntegrationLayer } from "../support/stripeIntegrationFixture.js";

describe("Generated Stripe resource clients", () => {
  it.live(
    "A generated coupon binding creates and reads its saved identity, updates its name, and deletes the provider object",
    () =>
      Effect.gen(function* () {
        const random = yield* SecureRandom.SecureRandom;
        const resource = yield* StripeCouponResourceClient;
        const coupons = yield* makeCouponsClient;
        const id = `nomoss_${yield* random.uuidV4()}`;
        const cleanupRequired = yield* Ref.make(true);
        yield* Effect.acquireRelease(Effect.void, () =>
          coupons
            .DeleteCouponsCoupon({ coupon: id })
            .pipe(Effect.when(Ref.get(cleanupRequired)), Effect.orDie),
        );
        const created = yield* resource.create({
          id,
          duration: "once",
          percent_off: 10,
          name: "Nomoss initial",
          metadata: { nomoss_integration: id },
        });
        const outputs = projectStripeCouponOutputs(created);
        const observed = yield* resource.read(outputs);
        assert.strictEqual(observed.id, id);
        assert.strictEqual(observed.percent_off, 10);
        assert.strictEqual(observed.livemode, false);
        yield* resource.update(outputs, {
          name: "Nomoss updated",
        });
        const updated = yield* resource.read(outputs);
        assert.strictEqual(updated.name, "Nomoss updated");
        assert.strictEqual(updated.id, created.id);
        const removed = yield* coupons.DeleteCouponsCoupon({
          coupon: outputs.CouponId,
        });
        yield* Ref.set(cleanupRequired, false);
        assert.isTrue(removed.deleted);
        const missing = yield* resource.read(outputs).pipe(Effect.flip);
        assert.strictEqual(missing._tag, "StripeApiError");
        assert.isTrue("statusCode" in missing && missing.statusCode === 404);
      }).pipe(Effect.scoped, Effect.provide(stripeIntegrationLayer)),
    90_000,
  );

  it.live(
    "A generated tax rate binding preserves percentage and saved identity through update and retirement",
    () =>
      Effect.gen(function* () {
        const random = yield* SecureRandom.SecureRandom;
        const resource = yield* StripeTaxRateResourceClient;
        const rates = yield* makeTaxRatesClient;
        const id = yield* random.uuidV4();
        const cleanupRequired = yield* Ref.make(true);
        const created = yield* Effect.acquireRelease(
          resource.create({
            display_name: "Nomoss tax",
            inclusive: false,
            percentage: 8.25,
            metadata: { nomoss_integration: id },
          }),
          (created) =>
            rates
              .PostTaxRatesTaxRate({ tax_rate: created.id, active: false })
              .pipe(Effect.when(Ref.get(cleanupRequired)), Effect.orDie),
        );
        const outputs = projectStripeTaxRateOutputs(created);
        const observed = yield* resource.read(outputs);
        assert.strictEqual(observed.percentage, 8.25);
        assert.strictEqual(observed.inclusive, false);
        assert.strictEqual(observed.livemode, false);
        yield* resource.update(outputs, {
          display_name: "Nomoss updated tax",
        });
        const updated = yield* resource.read(outputs);
        assert.strictEqual(updated.display_name, "Nomoss updated tax");
        assert.strictEqual(updated.id, created.id);
        yield* rates.PostTaxRatesTaxRate({
          tax_rate: outputs.TaxRateId,
          active: false,
        });
        yield* Ref.set(cleanupRequired, false);
        assert.strictEqual((yield* resource.read(outputs)).active, false);
      }).pipe(Effect.scoped, Effect.provide(stripeIntegrationLayer)),
    90_000,
  );

  it.live(
    "A generated shipping rate binding preserves its amount through metadata update and retirement",
    () =>
      Effect.gen(function* () {
        const random = yield* SecureRandom.SecureRandom;
        const resource = yield* StripeShippingRateResourceClient;
        const rates = yield* makeShippingRatesClient;
        const id = yield* random.uuidV4();
        const cleanupRequired = yield* Ref.make(true);
        const created = yield* Effect.acquireRelease(
          resource.create({
            display_name: "Nomoss shipping",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "usd" },
            metadata: { nomoss_integration: id },
          }),
          (created) =>
            rates
              .PostShippingRatesShippingRateToken({
                shipping_rate_token: created.id,
                active: false,
              })
              .pipe(Effect.when(Ref.get(cleanupRequired)), Effect.orDie),
        );
        const outputs = projectStripeShippingRateOutputs(created);
        const observed = yield* resource.read(outputs);
        assert.strictEqual(observed.fixed_amount?.amount, 500);
        assert.strictEqual(observed.fixed_amount?.currency, "usd");
        assert.strictEqual(observed.livemode, false);
        yield* resource.update(outputs, {
          metadata: { nomoss_integration: id, revision: "updated" },
        });
        const updated = yield* resource.read(outputs);
        assert.strictEqual(updated.metadata.revision, "updated");
        assert.strictEqual(updated.id, created.id);
        yield* rates.PostShippingRatesShippingRateToken({
          shipping_rate_token: outputs.ShippingRateId,
          active: false,
        });
        yield* Ref.set(cleanupRequired, false);
        assert.strictEqual((yield* resource.read(outputs)).active, false);
      }).pipe(Effect.scoped, Effect.provide(stripeIntegrationLayer)),
    90_000,
  );
});
