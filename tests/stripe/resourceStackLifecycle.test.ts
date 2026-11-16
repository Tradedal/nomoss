import { expect, layer } from "@effect/vitest";
import { Array as Arr, ConfigProvider, Effect, Match, Struct } from "effect";
import { ResourceOutputResolutionMissing } from "../../src/core/resource/model.js";
import { ResourceGraphStore } from "../../src/core/resource/resourceGraphStore.js";
import { ResourceStackLifecycle } from "../../src/core/stack/resourceStackLifecycle.js";
import { ResourceStateStore } from "../../src/core/state/stateStore.js";
import { StripeResources } from "../../src/providers/stripe/management/resources.js";
import {
  createStripeCouponStack,
  StripeLifecycleFixture,
  stripeCoupon,
  stripeCustomer,
  stripeLifecycleTestLayer,
  stripePortal,
  stripePrice,
  stripeProduct,
  stripeTestClock,
  stripeWebhook,
} from "../support/stripeLifecycleFixture.js";

layer(stripeLifecycleTestLayer, { buildPerTest: true })(
  "ResourceStackLifecycle with generated Stripe commands",
  (it) => {
    it.effect(
      "Webhook creation and updates apply URL credentials while updates retain the saved identity and signing secret",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;
          const state = yield* ResourceStateStore;

          const path = "/v1/webhook_endpoints";
          const url = "https://example.test/api/stripe/updated";

          yield* fixture.enqueueResponses("POST", path, [
            Response.json(stripeWebhook),
          ]);

          yield* stripe.WebhookEndpoint({
            logicalId: "Webhook",
            props: {
              url: stripeWebhook.url,
              enabled_events: ["checkout.session.completed"],
            },
            rotationKey: "stable",
          });

          yield* lifecycle.apply(yield* lifecycle.prepare("settings"));

          const creation = yield* Arr.head(
            yield* fixture.requestsFor("POST", path),
          ).pipe(Effect.fromOption);
          const creationBody = yield* Effect.promise(() => creation.text());

          expect(new URLSearchParams(creationBody).get("url")).toBe(
            "https://dev-user:dev-password@example.test/api/stripe/webhook",
          );

          yield* graph.reset;

          yield* fixture.enqueueResponses(
            "POST",
            `${path}/${stripeWebhook.id}`,
            [Response.json(Struct.omit({ ...stripeWebhook, url }, ["secret"]))],
          );

          const changed = yield* stripe.WebhookEndpoint({
            logicalId: "Webhook",
            props: { url, enabled_events: ["checkout.session.completed"] },
            rotationKey: "stable",
          });

          yield* lifecycle.apply(yield* lifecycle.prepare("settings"));

          expect(changed.WebhookEndpointId).toBe(stripeWebhook.id);
          expect(changed.WebhookSigningSecret).toBe(stripeWebhook.secret);
          expect(yield* fixture.requestsFor("POST", path)).toHaveLength(1);

          const request = yield* Arr.head(
            yield* fixture.requestsFor("POST", `${path}/${stripeWebhook.id}`),
          ).pipe(Effect.fromOption);
          const body = yield* Effect.promise(() => request.text());

          expect(new URLSearchParams(body).get("url")).toBe(
            "https://dev-user:dev-password@example.test/api/stripe/updated",
          );
          expect(yield* state.loadResources("settings")).toMatchObject([
            { props: { endpoint: { url } } },
          ]);
        }).pipe(
          Effect.provideService(
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromUnknown({
              NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_USERNAME: "dev-user",
              NOMOSS_STRIPE_WEBHOOK_BASIC_AUTH_PASSWORD: "dev-password",
            }),
          ),
        ),
    );

    Arr.forEach(["apply", "destroy"], (recovery) => {
      it.effect(
        Match.value(recovery).pipe(
          Match.when(
            "apply",
            () =>
              "Retrying failed webhook rotation publishes the saved replacement and secret without creating another webhook",
          ),
          Match.orElse(
            () =>
              "Retrying teardown after failed webhook rotation removes the remaining webhook and clears saved ownership",
          ),
        ),
        () =>
          Effect.gen(function* () {
            const stripe = yield* StripeResources;
            const graph = yield* ResourceGraphStore;
            const lifecycle = yield* ResourceStackLifecycle;
            const state = yield* ResourceStateStore;
            const fixture = yield* StripeLifecycleFixture;

            const path = "/v1/webhook_endpoints";
            const replacement = {
              ...stripeWebhook,
              id: "we_test_replacement",
              secret: "whsec_test_replacement",
            };

            yield* fixture.enqueueResponses("POST", path, [
              Response.json(stripeWebhook),
              Response.json(replacement),
            ]);

            yield* stripe.WebhookEndpoint({
              logicalId: "Webhook",
              props: {
                url: stripeWebhook.url,
                enabled_events: ["checkout.session.completed"],
              },
              rotationKey: "initial",
            });

            yield* lifecycle.apply(yield* lifecycle.prepare("rotation"));

            yield* graph.reset;

            const rotated = yield* stripe.WebhookEndpoint({
              logicalId: "Webhook",
              props: {
                url: stripeWebhook.url,
                enabled_events: ["checkout.session.completed"],
              },
              rotationKey: "rotated",
            });

            const cleanupFailures = Match.value(recovery).pipe(
              Match.when("destroy", () => [
                Response.json(
                  {
                    error: {
                      type: "invalid_request_error",
                      message: "Cleanup refused",
                    },
                  },
                  { status: 400 },
                ),
              ]),
              Match.orElse(() => []),
            );

            yield* fixture.enqueueResponses(
              "DELETE",
              `${path}/${stripeWebhook.id}`,
              [
                Response.json(
                  {
                    error: {
                      type: "invalid_request_error",
                      message: "Removal refused",
                    },
                  },
                  { status: 400 },
                ),
                ...cleanupFailures,
                Response.json({
                  id: stripeWebhook.id,
                  object: "webhook_endpoint",
                  deleted: true,
                }),
              ],
            );

            yield* lifecycle
              .apply(yield* lifecycle.prepare("rotation"))
              .pipe(Effect.flip);

            expect(rotated.WebhookEndpointId).toBe(stripeWebhook.id);

            yield* graph.reset;

            const reopened = yield* stripe.WebhookEndpoint({
              logicalId: "Webhook",
              props: {
                url: stripeWebhook.url,
                enabled_events: ["checkout.session.completed"],
              },
              rotationKey: "rotated",
            });

            const prepared = yield* lifecycle.prepare("rotation");

            yield* fixture
              .enqueueResponses("DELETE", `${path}/${replacement.id}`, [
                Response.json({
                  id: replacement.id,
                  object: "webhook_endpoint",
                  deleted: true,
                }),
              ])
              .pipe(Effect.when(Effect.succeed(recovery === "destroy")));

            yield* lifecycle
              .destroy(prepared)
              .pipe(
                Effect.flip,
                Effect.when(Effect.succeed(recovery === "destroy")),
              );

            yield* Match.value(recovery).pipe(
              Match.when("apply", () => lifecycle.apply(prepared)),
              Match.orElse(() => lifecycle.destroy(prepared)),
            );

            expect(yield* fixture.requestsFor("POST", path)).toHaveLength(2);

            const removalAttempts = Match.value(recovery).pipe(
              Match.when("destroy", () => 3),
              Match.orElse(() => 2),
            );

            expect(
              yield* fixture.requestsFor(
                "DELETE",
                `${path}/${stripeWebhook.id}`,
              ),
            ).toHaveLength(removalAttempts);

            const removedReplacements = yield* fixture.requestsFor(
              "DELETE",
              `${path}/${replacement.id}`,
            );

            const owned = yield* state.loadResources("rotation");

            return Match.value(recovery).pipe(
              Match.when("apply", () => {
                expect(reopened.WebhookEndpointId).toBe(replacement.id);
                expect(reopened.WebhookSigningSecret).toBe(replacement.secret);
                expect(owned).toMatchObject([
                  {
                    outputs: {
                      WebhookEndpointId: replacement.id,
                      WebhookSigningSecret: replacement.secret,
                    },
                  },
                ]);
              }),
              Match.orElse(() => {
                expect(removedReplacements).toHaveLength(1);
                expect(owned).toEqual([]);
                expect(() => reopened.WebhookEndpointId).toThrowError(
                  ResourceOutputResolutionMissing,
                );
              }),
            );
          }),
      );
    });

    Arr.forEach(
      [
        {
          name: "Product",
          path: "/v1/products",
          observation: stripeProduct,
          declare: (stripe: StripeResources["Service"]) =>
            stripe.Product({
              logicalId: "Product",
              props: { name: stripeProduct.name },
            }),
        },
        {
          name: "BillingPortalConfiguration",
          path: "/v1/billing_portal/configurations",
          observation: stripePortal,
          declare: (stripe: StripeResources["Service"]) =>
            stripe.BillingPortalConfiguration({
              logicalId: "Portal",
              props: { features: { invoice_history: { enabled: true } } },
            }),
        },
      ],
      (resource) => {
        it.effect(
          `${resource.name} removal preserves saved state after rejection and deactivates the saved ID before clearing state`,
          () =>
            Effect.gen(function* () {
              const stripe = yield* StripeResources;
              const graph = yield* ResourceGraphStore;
              const lifecycle = yield* ResourceStackLifecycle;
              const state = yield* ResourceStateStore;
              const fixture = yield* StripeLifecycleFixture;

              yield* fixture.enqueueResponses("POST", resource.path, [
                Response.json(resource.observation),
              ]);

              yield* resource.declare(stripe);
              const initial = yield* lifecycle.prepare("deactivation");

              yield* lifecycle.apply(initial);

              const saved = yield* state.loadResources(initial.stackName);

              yield* graph.reset;

              const removal = yield* lifecycle.prepare(initial.stackName);
              const path = `${resource.path}/${resource.observation.id}`;

              yield* fixture.enqueueResponses("POST", path, [
                Response.json(
                  {
                    error: {
                      type: "invalid_request_error",
                      message: "Deactivation refused",
                    },
                  },
                  { status: 400 },
                ),
                Response.json({ ...resource.observation, active: false }),
              ]);

              const failure = yield* lifecycle.apply(removal).pipe(Effect.flip);

              expect(failure).toMatchObject({
                _tag: "ResourceCommandExecutionFailed",
                command: {
                  _tag: "Apply",
                  decision: {
                    _tag: "Delete",
                    node: { key: saved[0].key, schema: saved[0].schema },
                  },
                },
                cause: { _tag: "StripeApiError" },
              });
              expect(yield* state.loadResources(initial.stackName)).toEqual(
                saved,
              );
              expect(
                yield* state.loadResourceStates(initial.stackName),
              ).toMatchObject([
                {
                  _tag: "Deleting",
                  lastFailure: { errorTag: "StripeApiError" },
                },
              ]);

              const applied = yield* lifecycle.apply(removal);

              expect(applied.applied).toBe(true);
              expect(applied.resources).toEqual([]);
              expect(
                yield* state.loadResourceStates(initial.stackName),
              ).toEqual([]);

              const requests = yield* fixture.requestsFor("POST", path);

              yield* Effect.forEach(requests, (request) =>
                Effect.promise(() => request.text()).pipe(
                  Effect.tap((body) =>
                    Effect.sync(() => {
                      expect(new URLSearchParams(body).get("active")).toBe(
                        "false",
                      );
                    }),
                  ),
                ),
              );
            }),
        );
      },
    );

    it.effect(
      "A Product rename preserves the provider identity of its unchanged Price",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;
          const state = yield* ResourceStateStore;

          yield* fixture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* fixture.enqueueResponses("POST", "/v1/prices", [
            Response.json(stripePrice),
          ]);

          const product = yield* stripe.Product({
            logicalId: "Product",
            props: { name: stripeProduct.name },
          });

          yield* stripe.Price({
            logicalId: "Price",
            props: {
              product,
              currency: "usd",
              recurring: { interval: "month" },
              unit_amount: 2900,
            },
          });

          yield* lifecycle.apply(yield* lifecycle.prepare("product-rename"));

          yield* graph.reset;

          const renamed = yield* stripe.Product({
            logicalId: "Product",
            props: { name: "Renamed product" },
          });

          const price = yield* stripe.Price({
            logicalId: "Price",
            props: {
              product: renamed,
              currency: "usd",
              recurring: { interval: "month" },
              unit_amount: 2900,
            },
          });

          yield* fixture.enqueueResponses(
            "POST",
            `/v1/products/${stripeProduct.id}`,
            [Response.json({ ...stripeProduct, name: "Renamed product" })],
          );

          const result = yield* lifecycle.apply(
            yield* lifecycle.prepare("product-rename"),
          );

          expect(result.applied).toBe(true);
          expect(renamed.ProductId).toBe(stripeProduct.id);
          expect(price.PriceId).toBe(stripePrice.id);
          expect(yield* state.loadResources("product-rename")).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                props: { name: "Renamed product" },
                outputs: { ProductId: stripeProduct.id },
              }),
              expect.objectContaining({ outputs: { PriceId: stripePrice.id } }),
            ]),
          );

          expect(yield* fixture.requestsFor("POST", "/v1/prices")).toHaveLength(
            1,
          );
          expect(
            yield* fixture.requestsFor("POST", `/v1/prices/${stripePrice.id}`),
          ).toEqual([]);
        }),
    );

    it.effect(
      "Price replacement exposes its removal and creation plan, preserves its applied identity after failure, and resumes recovery",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;

          yield* fixture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* fixture.enqueueResponses("POST", "/v1/prices", [
            Response.json(stripePrice),
          ]);
          const product = yield* stripe.Product({
            logicalId: "Product",
            props: { name: stripeProduct.name },
          });

          const price = yield* stripe.Price({
            logicalId: "MonthlyPrice",
            props: {
              product,
              currency: "usd",
              recurring: { interval: "month" },
              unit_amount: 2900,
            },
          });

          yield* lifecycle.apply(yield* lifecycle.prepare("storefront"));

          expect(price.PriceId).toBe(stripePrice.id);

          yield* graph.reset;

          const reopenedProduct = yield* stripe.Product({
            logicalId: "Product",
            props: { name: stripeProduct.name },
          });

          const changedPrice = yield* stripe.Price({
            logicalId: "MonthlyPrice",
            props: {
              product: reopenedProduct,
              currency: "usd",
              recurring: { interval: "month" },
              unit_amount: 3900,
            },
          });

          const changed = yield* lifecycle.prepare("storefront");
          const reviewed = yield* lifecycle.plan(changed);

          expect(Arr.flatten(reviewed.plan.createOrUpdate)).toMatchObject([
            {
              _tag: "Replace",
              node: { key: { logicalId: "MonthlyPrice" } },
              operations: [{ _tag: "Destroy" }, { _tag: "Create" }],
            },
          ]);
          expect(changedPrice.PriceId).toBe(stripePrice.id);

          const replacementId = "price_test_replacement";

          yield* fixture.enqueueResponses(
            "POST",
            `/v1/prices/${stripePrice.id}`,
            [
              Response.json({
                ...stripePrice,
                active: false,
                lookup_key: null,
              }),
            ],
          );
          yield* fixture.enqueueResponses("POST", "/v1/prices", [
            Response.json(
              {
                error: {
                  type: "invalid_request_error",
                  message: "Replacement refused",
                },
              },
              { status: 400 },
            ),
            Response.json({
              ...stripePrice,
              id: replacementId,
              unit_amount: 3900,
              unit_amount_decimal: "3900",
            }),
          ]);

          const failed = yield* lifecycle.applyPlan(reviewed).pipe(Effect.flip);

          expect(failed).toMatchObject({
            _tag: "ResourceCommandExecutionFailed",
          });
          expect(price.PriceId).toBe(stripePrice.id);
          expect(changedPrice.PriceId).toBe(stripePrice.id);

          yield* lifecycle.apply(changed);

          const currentPriceId: string = price.PriceId;

          expect(currentPriceId).toBe(replacementId);
          expect(changedPrice.PriceId).toBe(replacementId);
          expect(
            yield* fixture.requestsFor("POST", `/v1/prices/${stripePrice.id}`),
          ).toHaveLength(1);

          yield* graph.reset;

          const otherId = "prod_test_other_stack";

          yield* fixture.enqueueResponses("POST", "/v1/products", [
            Response.json({
              ...stripeProduct,
              id: otherId,
              name: "Other application",
            }),
          ]);

          const otherProduct = yield* stripe.Product({
            logicalId: "Product",
            props: { name: "Other application" },
          });

          yield* lifecycle.apply(yield* lifecycle.prepare("other-application"));

          expect(otherProduct.ProductId).toBe(otherId);
          expect(product.ProductId).toBe(stripeProduct.id);
          expect(reopenedProduct.ProductId).toBe(stripeProduct.id);
          expect(price.PriceId).toBe(replacementId);
        }),
    );

    it.effect(
      "A billing customer uses its declared clock identity and removed identities stay unavailable during teardown recovery",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          const key = { logicalId: "BillingClock" };
          const props = { frozen_time: stripeTestClock.frozen_time };
          const customer = {
            ...stripeCustomer,
            test_clock: stripeTestClock.id,
          };

          yield* fixture.enqueueResponses(
            "POST",
            "/v1/test_helpers/test_clocks",
            [Response.json(stripeTestClock)],
          );

          yield* fixture.enqueueResponses("POST", "/v1/customers", [
            Response.json(customer),
          ]);

          yield* fixture.enqueueResponses(
            "GET",
            `/v1/test_helpers/test_clocks/${stripeTestClock.id}`,
            [Response.json(stripeTestClock)],
          );

          yield* fixture.enqueueResponses(
            "GET",
            `/v1/customers/${stripeCustomer.id}`,
            [Response.json(customer)],
          );

          yield* fixture.enqueueResponses(
            "DELETE",
            `/v1/customers/${stripeCustomer.id}`,
            [
              Response.json({
                id: stripeCustomer.id,
                object: "customer",
                deleted: true,
              }),
            ],
          );

          yield* fixture.enqueueResponses(
            "DELETE",
            `/v1/test_helpers/test_clocks/${stripeTestClock.id}`,
            [
              Response.json(
                {
                  error: {
                    type: "invalid_request_error",
                    message: "Clock removal temporarily refused",
                  },
                },
                { status: 400 },
              ),
              Response.json({
                id: stripeTestClock.id,
                object: "test_helpers.test_clock",
                deleted: true,
              }),
            ],
          );

          const clock = yield* stripe.TestHelpersTestClock({
            logicalId: key.logicalId,
            props,
          });

          const subscriber = yield* stripe.Customer({
            logicalId: "Subscriber",
            props: {
              email: "subscriber@example.test",
              test_clock: clock,
            },
          });

          const prepared = yield* lifecycle.prepare("billing-simulation");

          expect(() => clock.TestHelpersTestClockId).toThrowError(
            ResourceOutputResolutionMissing,
          );

          yield* lifecycle.apply(prepared);

          expect(clock.TestHelpersTestClockId).toBe(stripeTestClock.id);
          expect(subscriber.CustomerId).toBe(stripeCustomer.id);

          const saved = yield* state.loadResources(prepared.stackName);

          expect(saved).toHaveLength(2);
          expect(saved).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                key,
                outputs: { TestHelpersTestClockId: stripeTestClock.id },
              }),
              expect.objectContaining({
                key: { logicalId: "Subscriber" },
                outputs: { CustomerId: stripeCustomer.id },
              }),
            ]),
          );

          const requests = yield* fixture.requestsFor("POST", "/v1/customers");
          const sent = yield* Effect.promise(() => requests[0].text());

          expect(new URLSearchParams(sent).get("test_clock")).toBe(
            stripeTestClock.id,
          );

          const observed = yield* lifecycle.reconcile(prepared);

          expect(observed.missing).toEqual([]);
          expect(clock.TestHelpersTestClockId).toBe(stripeTestClock.id);

          const interrupted = yield* lifecycle
            .destroy(prepared)
            .pipe(Effect.flip);

          expect(interrupted._tag).toBe("ResourceCommandExecutionFailed");
          expect(() => subscriber.CustomerId).toThrowError(
            ResourceOutputResolutionMissing,
          );
          expect(clock.TestHelpersTestClockId).toBe(stripeTestClock.id);

          const remaining = yield* state.loadResources(prepared.stackName);

          expect(Arr.map(remaining, (node) => node.key.logicalId)).toEqual([
            key.logicalId,
          ]);

          yield* lifecycle.destroy(prepared);

          expect(() => clock.TestHelpersTestClockId).toThrowError(
            ResourceOutputResolutionMissing,
          );
          expect(yield* state.loadResourceStates(prepared.stackName)).toEqual(
            [],
          );
        }),
    );

    it.effect(
      "Removing a coupon declaration deletes its saved Stripe object and state",
      () =>
        Effect.gen(function* () {
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;
          const state = yield* ResourceStateStore;

          const initial = yield* createStripeCouponStack("coupon-removal");
          const saved = yield* state.loadResources(initial.stackName);

          expect(saved[0].outputs).toEqual({ CouponId: stripeCoupon.id });

          const path = `/v1/coupons/${stripeCoupon.id}`;

          yield* fixture.enqueueResponses("DELETE", path, [
            Response.json({
              id: stripeCoupon.id,
              object: "coupon",
              deleted: true,
            }),
          ]);

          yield* graph.reset;

          const omitted = yield* lifecycle.prepare(initial.stackName);
          const result = yield* lifecycle.apply(omitted);

          expect(result.applied).toBe(true);
          expect(yield* fixture.requestsFor("DELETE", path)).toHaveLength(1);
          expect(yield* state.loadResourceStates(initial.stackName)).toEqual(
            [],
          );
        }),
    );

    it.effect(
      "A coupon name change persists on its saved identity, while omitting the name preserves the last applied state",
      () =>
        Effect.gen(function* () {
          const graph = yield* ResourceGraphStore;
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;
          const state = yield* ResourceStateStore;

          const initial = yield* createStripeCouponStack("coupon-update");

          const path = `/v1/coupons/${stripeCoupon.id}`;
          const name = "Returning customer discount";

          yield* fixture.enqueueResponses("POST", path, [
            Response.json({ ...stripeCoupon, name }),
          ]);

          yield* graph.reset;

          yield* stripe.Coupon({
            logicalId: "WelcomeDiscount",
            props: { duration: "once", percent_off: 10, name },
          });

          const prepared = yield* lifecycle.prepare(initial.stackName);
          const result = yield* lifecycle.apply(prepared);

          expect(result.applied).toBe(true);

          const saved = yield* state.loadResources(initial.stackName);

          expect(saved).toHaveLength(1);
          expect(saved[0]).toMatchObject({
            outputs: { CouponId: stripeCoupon.id },
            props: { duration: "once", percent_off: 10, name },
          });

          const requests = yield* fixture.requestsFor("POST", path);

          expect(requests).toHaveLength(1);

          const sent = new URLSearchParams(
            yield* Effect.promise(() => requests[0].text()),
          );

          expect(sent.get("name")).toBe(name);
          expect(sent.has("percent_off")).toBe(false);

          yield* graph.reset;

          yield* stripe.Coupon({
            logicalId: "WelcomeDiscount",
            props: { duration: "once", percent_off: 10 },
          });

          const omittedName = yield* lifecycle.prepare(initial.stackName);
          const failure = yield* lifecycle.apply(omittedName).pipe(Effect.flip);

          expect(failure).toMatchObject({
            _tag: "ResourceCommandExecutionFailed",
            cause: { _tag: "ResourceCommandUnsupported" },
          });
          expect(yield* state.loadResources(initial.stackName)).toEqual(saved);
          expect(yield* fixture.requestsFor("POST", path)).toHaveLength(1);
        }),
    );

    it.effect(
      "Changing an immutable coupon percentage preserves its applied identity and makes no mutation request",
      () =>
        Effect.gen(function* () {
          const graph = yield* ResourceGraphStore;
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;
          const state = yield* ResourceStateStore;

          const initial = yield* createStripeCouponStack("coupon-update");
          const previous = yield* state.loadResources(initial.stackName);

          yield* graph.reset;

          yield* stripe.Coupon({
            logicalId: "WelcomeDiscount",
            props: {
              duration: "once",
              percent_off: 20,
              name: "Changed discount",
            },
          });

          const prepared = yield* lifecycle.prepare(initial.stackName);
          const failure = yield* lifecycle.apply(prepared).pipe(Effect.flip);

          expect(failure).toMatchObject({
            _tag: "ResourceCommandExecutionFailed",
            cause: { _tag: "ResourceCommandUnsupported" },
          });
          expect(
            yield* fixture.requestsFor(
              "POST",
              `/v1/coupons/${stripeCoupon.id}`,
            ),
          ).toEqual([]);
          expect(yield* state.loadResources(initial.stackName)).toEqual(
            previous,
          );
        }),
    );
  },
);
