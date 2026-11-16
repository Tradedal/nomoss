import { NodeServices } from "@effect/platform-node";
import { assert } from "@effect/vitest";
import { Config, Effect, Layer, Redacted } from "effect";
import { SecureRandom } from "effect/crypto";
import { FetchHttpClient } from "effect/http";
import { stripeExampleAppsLayer } from "../../examples/stripe/apps.js";
import { StateSecretServiceDefaultLayer } from "../../src/core/state/stateSecretService.js";
import { resourceStateFileStorageLayer } from "../../src/core/state/stateStore.js";
import { stripeCouponResourceClientLayer } from "../../src/providers/stripe/client/generated/resourceBindings/Coupon.js";
import { stripeShippingRateResourceClientLayer } from "../../src/providers/stripe/client/generated/resourceBindings/ShippingRate.js";
import { stripeTaxRateResourceClientLayer } from "../../src/providers/stripe/client/generated/resourceBindings/TaxRate.js";
import { StripeClientConfig } from "../../src/providers/stripe/client/stripeClientConfig.js";
import { stripeStackLayer } from "../../src/providers/stripe/runtime.js";

const sandboxConfigLayer = Layer.effect(
  StripeClientConfig,
  Effect.gen(function* () {
    const apiKey = yield* Config.Redacted("STRIPE_API_KEY");
    assert.isTrue(
      /^(sk|rk)_test_/.test(Redacted.value(apiKey)),
      "Stripe integration requires a sandbox secret or restricted key",
    );
    return { apiKey };
  }),
);

export const stripeIntegrationLayer = stripeExampleAppsLayer.pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      stripeCouponResourceClientLayer,
      stripeTaxRateResourceClientLayer,
      stripeShippingRateResourceClientLayer,
    ).pipe(Layer.provideMerge(stripeStackLayer)),
  ),
  Layer.provide([
    sandboxConfigLayer,
    FetchHttpClient.layer,
    resourceStateFileStorageLayer,
    StateSecretServiceDefaultLayer,
  ]),
  Layer.provideMerge(NodeServices.layer),
  Layer.provideMerge(SecureRandom.layerWebCrypto),
);
