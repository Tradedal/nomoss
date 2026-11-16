import { assert, layer } from "@effect/vitest";
import { Array as Arr, Effect, Match, Option, Schema, Struct } from "effect";
import { KeyValueStore } from "effect/persistence";
import { ResourceEntity, ResourceModel } from "../src/core/resource/model.js";
import { ResourceGraphBuilder } from "../src/core/resource/resourceGraphBuilder.js";
import { ResourceGraphStore } from "../src/core/resource/resourceGraphStore.js";
import { ResourceStackLifecycle } from "../src/core/stack/resourceStackLifecycle.js";
import type { ResourceState } from "../src/core/state/resourceState.js";
import { ResourceStateStore } from "../src/core/state/stateStore.js";
import { StripeBillingConfigurationExportDocumentSchema } from "../src/providers/stripe/client/generated/resourceInputs/StripeBillingConfigurationExportDocumentSchema.js";
import { StripeCustomerPropsSchema } from "../src/providers/stripe/client/generated/resourceInputs/StripeCustomerPropsSchema.js";
import { StripeProductPropsSchema } from "../src/providers/stripe/client/generated/resourceInputs/StripeProductPropsSchema.js";
import { StripeWebhookEndpointDeclarationPropsSchema } from "../src/providers/stripe/client/generated/resourceInputs/StripeWebhookEndpointDeclarationPropsSchema.js";
import {
  StripeCustomerOutputsSchema,
  StripeProductOutputsSchema,
  StripeWebhookEndpointOutputsSchema,
} from "../src/providers/stripe/client/generated/resourceOutputs.js";
import { StripeResources } from "../src/providers/stripe/management/resources.js";
import {
  RelationshipSourceType,
  ResourceRelationshipFixture,
  resourceRelationshipTestLayer,
} from "./support/resourceRelationshipFixture.js";
import {
  createStripeProductStack,
  StripeLifecycleFixture,
  stripeCustomer,
  stripeLifecycleTestLayer,
  stripePortal,
  stripePrice,
  stripeProduct,
  stripeWebhook,
} from "./support/stripeLifecycleFixture.js";

layer(resourceRelationshipTestLayer, { buildPerTest: true })(
  "ResourceStackLifecycle entity relationships",
  (it) => {
    it.effect(
      "Applying related entities across providers supplies complete identities to direct and nested inputs",
      () =>
        Effect.gen(function* () {
          const fixture = yield* ResourceRelationshipFixture;
          const lifecycle = yield* ResourceStackLifecycle;
          const states = yield* ResourceStateStore;
          const source = yield* fixture.declareSource("Source");

          yield* fixture.declareDependent("Dependent", source);

          const result = yield* lifecycle.apply(
            yield* lifecycle.prepare("entities"),
          );
          const saved = yield* states.loadResources("entities");
          const dependent = yield* Arr.findFirst(
            saved,
            (node) => node.key.logicalId === "Dependent",
          ).pipe(Effect.fromOption);
          const request = yield* Arr.findFirst(
            yield* fixture.requests,
            (request) => request.logicalId === "Dependent",
          ).pipe(Effect.fromOption);

          assert.isTrue(result.applied);
          assert.deepStrictEqual(request.props, {
            label: "dependent",
            resources: [{ owner: { account: "account", id: "resource-1" } }],
            selected: "resource-1",
          });
          assert.deepStrictEqual(dependent.props, request.props);
          assert.deepStrictEqual(dependent.outputs, { id: "Dependent" });
        }),
    );

    it.effect(
      "Incompatible and absent source entities prevent dependent registration and mutation",
      () =>
        Effect.gen(function* () {
          const fixture = yield* ResourceRelationshipFixture;
          const lifecycle = yield* ResourceStackLifecycle;
          const other = yield* fixture.declareOther("Other");
          const claimed = new ResourceEntity({
            key: other.key,
            resourceType: RelationshipSourceType.make({
              provider: "aws",
              service: "relationships",
              resource: "source",
            }),
          });
          const absent = new ResourceEntity({
            key: { logicalId: "Absent" },
            resourceType: claimed.resourceType,
          });

          const incompatible = yield* fixture
            .declareDependent("RejectedType", claimed)
            .pipe(Effect.flip);
          const missing = yield* fixture
            .declareDependent("RejectedSource", absent)
            .pipe(Effect.flip);
          const result = yield* lifecycle.apply(
            yield* lifecycle.prepare("rejected-entities"),
          );

          assert.strictEqual(incompatible._tag, "ResourceEntityTypeMismatch");
          assert.strictEqual(missing._tag, "ResourceNotFound");
          assert.deepStrictEqual(
            Arr.map(result.resources, (node) => node.key.logicalId),
            ["Other"],
          );
          assert.isFalse(
            Arr.some(
              yield* fixture.requests,
              (request) =>
                request.logicalId === "RejectedType" ||
                request.logicalId === "RejectedSource",
            ),
          );
        }),
    );

    it.effect(
      "A saved dependent uses the replacement source identity when a rejected update is retried",
      () =>
        Effect.gen(function* () {
          const fixture = yield* ResourceRelationshipFixture;
          const lifecycle = yield* ResourceStackLifecycle;
          const states = yield* ResourceStateStore;
          const graph = yield* ResourceGraphStore;
          const builder = yield* ResourceGraphBuilder;
          const source = yield* fixture.declareSource("Source");

          yield* fixture.declareDependent("Dependent", source);
          yield* lifecycle.apply(yield* lifecycle.prepare("replacement"));

          const saved = yield* states.loadResources("replacement");
          const dependent = yield* Arr.findFirst(
            saved,
            (node) => node.key.logicalId === "Dependent",
          ).pipe(Effect.fromOption);

          yield* graph.reset;
          yield* fixture.declareSource("Source", 2);
          yield* builder.registerNode(dependent);
          yield* fixture.setRejectDependent(true);

          const prepared = yield* lifecycle.prepare("replacement");
          const rejected = yield* lifecycle.apply(prepared).pipe(Effect.flip);
          const interrupted = yield* states.loadResourceStates("replacement");

          assert.strictEqual(rejected._tag, "ResourceCommandExecutionFailed");
          assert.isTrue(
            Arr.some(
              interrupted,
              (state) =>
                state._tag === "Updating" &&
                state.node.key.logicalId === "Dependent" &&
                state.lastFailure?.errorTag === "RelationshipMutationRejected",
            ),
          );

          yield* fixture.setRejectDependent(false);

          const recovered = yield* lifecycle.apply(prepared);
          const updated = yield* Arr.findFirst(
            recovered.resources,
            (node) => node.key.logicalId === "Dependent",
          ).pipe(Effect.fromOption);
          const persisted = yield* Arr.findFirst(
            yield* states.loadResources("replacement"),
            (node) => node.key.logicalId === "Dependent",
          ).pipe(Effect.fromOption);

          assert.deepStrictEqual(updated.props, {
            label: "dependent",
            resources: [{ owner: { account: "account", id: "resource-2" } }],
            selected: "resource-2",
          });
          assert.deepStrictEqual(persisted.props, updated.props);
          assert.isFalse((yield* lifecycle.apply(prepared)).applied);
        }),
    );
  },
);

layer(stripeLifecycleTestLayer, { buildPerTest: true })(
  "ResourceStackLifecycle",
  (it) => {
    it.effect(
      "Reconciliation preserves an existing product when Stripe returns a different resource",
      () =>
        Effect.gen(function* () {
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          const stack = yield* createStripeProductStack(
            "read-identity-mismatch",
          );
          const saved = yield* state.loadResources(stack.stackName);
          const original = yield* Effect.fromOption(Arr.head(saved));
          const { primaryIdentifier: _primaryIdentifier, ...legacySchema } =
            original.schema;

          yield* state.saveResources(stack.stackName, [
            { ...original, schema: legacySchema },
          ]);

          const previous = yield* state.loadResources(stack.stackName);

          yield* fixture.enqueueResponses(
            "GET",
            `/v1/products/${stripeProduct.id}`,
            [Response.json({ ...stripeProduct, id: "prod_another_resource" })],
          );

          const failure = yield* lifecycle.reconcile(stack).pipe(Effect.flip);
          const rejected = Match.value(failure).pipe(
            Match.tag("ResourceCommandExecutionFailed", (failure) => failure),
            Match.orElse(() =>
              assert.fail(
                "Expected the product read to reject a different identity",
              ),
            ),
          );

          assert.strictEqual(rejected.cause._tag, "ResourceIdentityMismatch");
          assert.deepStrictEqual(
            yield* state.loadResources(stack.stackName),
            previous,
          );
        }),
    );

    it.effect(
      "Reconciliation rejects missing saved identity before contacting Stripe",
      () =>
        Effect.gen(function* () {
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          const stack = yield* createStripeProductStack(
            "read-identity-missing",
          );
          const saved = yield* state.loadResources(stack.stackName);
          const original = yield* Effect.fromOption(Arr.head(saved));

          yield* state.saveResources(stack.stackName, [
            { ...original, outputs: {} },
          ]);

          const previous = yield* state.loadResources(stack.stackName);
          const requests = yield* fixture.requests;
          const failure = yield* lifecycle.reconcile(stack).pipe(Effect.flip);
          const rejected = Match.value(failure).pipe(
            Match.tag("ResourceCommandExecutionFailed", (failure) => failure),
            Match.orElse(() =>
              assert.fail(
                "Expected the product read to reject missing identity",
              ),
            ),
          );

          assert.strictEqual(rejected.cause._tag, "SchemaError");
          assert.deepStrictEqual(yield* fixture.requests, requests);
          assert.deepStrictEqual(
            yield* state.loadResources(stack.stackName),
            previous,
          );
        }),
    );

    it.effect(
      "Reconciliation requires saved identity before reading a declared Stripe product",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const fixture = yield* StripeLifecycleFixture;

          yield* stripe.Product({
            logicalId: "Product",
            props: { name: "Unapplied product" },
          });

          const stack = yield* lifecycle.prepare("unapplied-product");
          const failure = yield* lifecycle.reconcile(stack).pipe(Effect.flip);

          assert.strictEqual(failure._tag, "ResourceReadIdentityMissing");
          assert.deepStrictEqual(yield* fixture.requests, []);
        }),
    );

    it.effect(
      "Customer creation identifies the failed resource and succeeds on retry",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          yield* fixture.enqueueResponses("POST", "/v1/customers", [
            Response.json(
              {
                error: {
                  type: "invalid_request_error",
                  message: "Customer creation rejected",
                },
              },
              { status: 400 },
            ),
            Response.json(stripeCustomer),
          ]);

          const customer = yield* stripe.Customer({
            logicalId: "Customer",
            props: { email: "customer@example.test" },
          });
          const stack = yield* lifecycle.prepare("customer-create-recovery");
          const failure = yield* lifecycle.apply(stack).pipe(Effect.flip);
          const rejected = Match.value(failure).pipe(
            Match.tag("ResourceCommandExecutionFailed", (failure) => failure),
            Match.orElse(() =>
              assert.fail("Expected customer creation to fail"),
            ),
          );

          assert.nestedPropertyVal(
            rejected,
            "command.decision.node.key.logicalId",
            "Customer",
          );
          assert.nestedPropertyVal(
            rejected,
            "command.decision.node.schema.provider",
            "stripe",
          );
          assert.nestedPropertyVal(
            rejected,
            "command.decision.node.schema.resource",
            "customer",
          );
          assert.strictEqual(rejected.cause._tag, "StripeApiError");
          assert.nestedPropertyVal(
            rejected,
            "cause.operation",
            "PostCustomers",
          );
          assert.strictEqual(rejected.message, "Customer creation rejected");
          assert.deepStrictEqual(
            yield* state.loadResources(stack.stackName),
            [],
          );

          const recovered = yield* lifecycle.apply(stack);

          assert.isTrue(recovered.applied);
          assert.deepStrictEqual(
            Arr.map(recovered.resources, (node) => node.outputs),
            [{ CustomerId: stripeCustomer.id }],
          );
          assert.strictEqual(customer.CustomerId, stripeCustomer.id);
          assert.deepStrictEqual(
            Arr.map(
              yield* state.loadResources(stack.stackName),
              (node) => node.outputs,
            ),
            [{ CustomerId: stripeCustomer.id }],
          );
        }),
    );

    it.effect(
      "Customer reconciliation checks identity before accepting a deletion",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          yield* fixture.enqueueResponses("POST", "/v1/customers", [
            Response.json(stripeCustomer),
          ]);
          yield* stripe.Customer({
            logicalId: "Customer",
            props: { email: "customer@example.test" },
          });

          const stack = yield* lifecycle.prepare("deleted-customer-identity");

          yield* lifecycle.apply(stack);

          const previous = yield* state.loadResources(stack.stackName);

          yield* fixture.enqueueResponses(
            "GET",
            `/v1/customers/${stripeCustomer.id}`,
            [
              Response.json({
                id: "cus_another_customer",
                object: "customer",
                deleted: true,
              }),
            ],
          );

          const failure = yield* lifecycle.reconcile(stack).pipe(Effect.flip);
          const rejected = Match.value(failure).pipe(
            Match.tag("ResourceCommandExecutionFailed", (failure) => failure),
            Match.orElse(() =>
              assert.fail(
                "Expected the customer read to reject a different identity",
              ),
            ),
          );

          assert.strictEqual(rejected.cause._tag, "ResourceIdentityMismatch");
          assert.deepStrictEqual(
            yield* state.loadResources(stack.stackName),
            previous,
          );

          yield* fixture.enqueueResponses(
            "GET",
            `/v1/customers/${stripeCustomer.id}`,
            [
              Response.json({
                id: stripeCustomer.id,
                object: "customer",
                deleted: true,
              }),
            ],
          );
          yield* lifecycle.reconcile(stack);

          assert.deepStrictEqual(
            yield* state.loadResources(stack.stackName),
            [],
          );
        }),
    );

    it.effect(
      "Reconciliation removes a product confirmed missing from Stripe",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const state = yield* ResourceStateStore;
          const fixture = yield* StripeLifecycleFixture;

          yield* fixture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* fixture.enqueueResponses(
            "GET",
            `/v1/products/${stripeProduct.id}`,
            [
              Response.json(
                {
                  error: {
                    type: "invalid_request_error",
                    code: "resource_missing",
                    message: "No such product",
                  },
                },
                { status: 404 },
              ),
            ],
          );
          yield* stripe.Product({
            logicalId: "Product",
            props: { name: "Starter" },
          });
          const prepared = yield* lifecycle.prepare("missing-product");
          yield* lifecycle.apply(prepared);

          const observed = yield* lifecycle.reconcile(prepared);

          assert.deepStrictEqual(
            Arr.map(observed.missing, (node) => node.key.logicalId),
            ["Product"],
          );
          assert.deepStrictEqual(observed.resources, []);
          assert.deepStrictEqual(
            yield* state.loadResources("missing-product"),
            [],
          );
        }),
    );

    it.effect("A denied Stripe read leaves saved resources unchanged", () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const state = yield* ResourceStateStore;
        const fixture = yield* StripeLifecycleFixture;

        yield* fixture.enqueueResponses("POST", "/v1/products", [
          Response.json(stripeProduct),
        ]);
        yield* fixture.enqueueResponses(
          "GET",
          `/v1/products/${stripeProduct.id}`,
          [
            Response.json(
              {
                error: {
                  type: "invalid_request_error",
                  message: "Read permission is missing",
                },
              },
              { status: 403 },
            ),
          ],
        );
        yield* stripe.Product({
          logicalId: "Product",
          props: { name: "Starter" },
        });
        const prepared = yield* lifecycle.prepare("unreadable-product");
        yield* lifecycle.apply(prepared);
        const saved = yield* state.loadResources("unreadable-product");

        const failure = yield* lifecycle.reconcile(prepared).pipe(Effect.flip);

        assert.strictEqual(failure._tag, "ResourceCommandExecutionFailed");
        assert.deepStrictEqual(
          yield* state.loadResources("unreadable-product"),
          saved,
        );
      }),
    );

    it.effect(
      "Removing a product deactivates it in Stripe and clears saved state",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const graph = yield* ResourceGraphStore;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const capture = yield* StripeLifecycleFixture;

          yield* capture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* capture.enqueueResponses(
            "POST",
            `/v1/products/${stripeProduct.id}`,
            [Response.json({ ...stripeProduct, active: false })],
          );
          yield* stripe.Product({
            logicalId: "Product",
            props: { name: "Starter" },
          });
          const initial = yield* lifecycle.prepare("removed-product");
          yield* lifecycle.apply(initial);

          yield* graph.reset;
          const removal = yield* lifecycle.prepare("removed-product");
          yield* lifecycle.apply(removal);

          const [retirement] = yield* capture.requestsFor(
            "POST",
            `/v1/products/${stripeProduct.id}`,
          );
          const body = yield* Effect.promise(() => retirement.clone().text());
          const states =
            yield* stateStore.loadResourceStates("removed-product");

          assert.strictEqual(new URLSearchParams(body).get("active"), "false");
          assert.deepStrictEqual(states, []);
        }),
    );

    it.effect(
      "A recurring price uses the product created earlier in the same stack",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const capture = yield* StripeLifecycleFixture;

          yield* capture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* capture.enqueueResponses("POST", "/v1/prices", [
            Response.json(stripePrice),
          ]);
          yield* capture.enqueueResponses(
            "POST",
            "/v1/prices/price_test_starter_monthly",
            [
              Response.json({
                ...stripePrice,
                active: false,
                lookup_key: null,
              }),
            ],
          );
          yield* capture.enqueueResponses(
            "POST",
            "/v1/products/prod_test_starter",
            [Response.json({ ...stripeProduct, active: false })],
          );

          const starter = yield* stripe.Product({
            logicalId: "StarterProduct",
            props: {
              active: true,
              name: "Example Starter",
              metadata: {
                plan: "starter",
              },
            },
          });

          yield* stripe.Price({
            logicalId: "StarterMonthlyPrice",
            props: {
              product: starter,
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

          const [createdPrice] = yield* capture.requestsFor(
            "POST",
            "/v1/prices",
          );
          const priceInput = new URLSearchParams(
            yield* Effect.promise(() => createdPrice.clone().text()),
          );

          assert.strictEqual(priceInput.get("product"), "prod_test_starter");

          yield* lifecycle.destroy(prepared);

          assert.deepStrictEqual(
            Arr.map(yield* capture.requests, (request) => ({
              method: request.method,
              path: new URL(request.url).pathname,
            })),
            [
              { method: "POST", path: "/v1/products" },
              { method: "POST", path: "/v1/prices" },
              { method: "POST", path: "/v1/prices/price_test_starter_monthly" },
              { method: "POST", path: "/v1/products/prod_test_starter" },
            ],
          );

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
        }),
    );

    it.effect(
      "A product relationship rejects a saved customer identity before mutation",
      () =>
        Effect.gen(function* () {
          const model = yield* ResourceModel;
          const stripe = yield* StripeResources;
          const stateStore = yield* ResourceStateStore;
          const capture = yield* StripeLifecycleFixture;

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

          const error = yield* stripe
            .Price({
              logicalId: "StarterMonthlyPrice",
              props: {
                product: new ResourceEntity({
                  key: customer.key,
                  resourceType: {
                    provider: "stripe",
                    service: "billing",
                    resource: "product",
                  },
                }),
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
            })
            .pipe(Effect.flip);
          const savedStates = yield* stateStore.loadResourceStates(
            "billing-missing-output",
          );

          yield* Match.value(error).pipe(
            Match.when(
              { _tag: "ResourceEntityTypeMismatch" },
              () => Effect.void,
            ),
            Match.orElse((unexpected) => Effect.fail(unexpected)),
          );

          assert.deepStrictEqual(yield* capture.requests, []);
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
            ],
          );
        }),
    );

    it.effect(
      "Webhook reconciliation preserves its signing secret until the resource is removed",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const capture = yield* StripeLifecycleFixture;

          yield* capture.enqueueResponses("POST", "/v1/webhook_endpoints", [
            Response.json(stripeWebhook),
          ]);
          yield* capture.enqueueResponses(
            "GET",
            "/v1/webhook_endpoints/we_test_billing_events",
            [Response.json(Struct.omit(stripeWebhook, ["secret"]))],
          );
          yield* capture.enqueueResponses(
            "DELETE",
            "/v1/webhook_endpoints/we_test_billing_events",
            [
              Response.json({
                id: stripeWebhook.id,
                object: "webhook_endpoint",
                deleted: true,
              }),
            ],
          );

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

          const observed = yield* lifecycle.reconcile(prepared);
          const savedAfterRead =
            yield* stateStore.loadResources("billing-webhook");

          assert.deepStrictEqual(observed.missing, []);
          assert.deepStrictEqual(savedAfterRead, savedAfterApply);

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
        }),
    );

    it.effect("Updating a webhook keeps its existing signing secret", () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* StripeLifecycleFixture;

        yield* capture.enqueueResponses(
          "POST",
          "/v1/webhook_endpoints/we_test_billing_events",
          [Response.json({ ...stripeWebhook, secret: undefined })],
        );

        const current = yield* model.nodeFromResource({
          key: { logicalId: "BillingWebhookEndpoint" },
          propsSchema: StripeWebhookEndpointDeclarationPropsSchema,
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
        const updates = yield* capture.requestsFor(
          "POST",
          "/v1/webhook_endpoints/we_test_billing_events",
        );

        assert.deepStrictEqual(
          Arr.map(saved, (node) => node.outputs),
          [
            {
              WebhookEndpointId: "we_test_billing_events",
              WebhookSigningSecret: "whsec_test_billing_events",
            },
          ],
        );

        assert.strictEqual(updates.length, 1);
      }),
    );

    it.effect("Removing a portal clears its saved configuration id", () =>
      Effect.gen(function* () {
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* StripeLifecycleFixture;

        yield* capture.enqueueResponses(
          "POST",
          "/v1/billing_portal/configurations",
          [Response.json(stripePortal)],
        );
        yield* capture.enqueueResponses(
          "POST",
          "/v1/billing_portal/configurations/bpc_test_example",
          [Response.json({ ...stripePortal, active: false })],
        );

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
      }),
    );

    it.effect(
      "A billing catalog resolves nested product and price entities and preserves its export until teardown",
      () =>
        Effect.gen(function* () {
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const storage = yield* KeyValueStore.KeyValueStore;
          const capture = yield* StripeLifecycleFixture;

          yield* capture.enqueueResponses("POST", "/v1/products", [
            Response.json(stripeProduct),
          ]);
          yield* capture.enqueueResponses("POST", "/v1/prices", [
            Response.json(stripePrice),
          ]);
          yield* capture.enqueueResponses(
            "POST",
            "/v1/billing_portal/configurations",
            [Response.json(stripePortal)],
          );
          yield* capture.enqueueResponses("POST", "/v1/webhook_endpoints", [
            Response.json(stripeWebhook),
          ]);
          yield* capture.enqueueResponses(
            "POST",
            "/v1/prices/price_test_starter_monthly",
            [
              Response.json({
                ...stripePrice,
                active: false,
                lookup_key: null,
              }),
            ],
          );
          yield* capture.enqueueResponses(
            "POST",
            "/v1/products/prod_test_starter",
            [Response.json({ ...stripeProduct, active: false })],
          );
          yield* capture.enqueueResponses(
            "POST",
            "/v1/billing_portal/configurations/bpc_test_example",
            [Response.json({ ...stripePortal, active: false })],
          );
          yield* capture.enqueueResponses(
            "DELETE",
            "/v1/webhook_endpoints/we_test_billing_events",
            [
              Response.json({
                id: stripeWebhook.id,
                object: "webhook_endpoint",
                deleted: true,
              }),
            ],
          );

          const product = yield* stripe.Product({
            logicalId: "StarterProduct",
            props: {
              active: true,
              name: "Example Starter",
            },
          });

          const price = yield* stripe.Price({
            logicalId: "StarterMonthlyPrice",
            props: {
              product,
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
                subscription_update: {
                  enabled: true,
                  default_allowed_updates: ["price"],
                  products: [{ product, prices: [price] }],
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
            props: {
              apiVersion: "2026-06-24.dahlia",
              billingPortalConfigurationId: portal,
              mode: "test",
              outputPath: "./.nomoss/state/test-billing.json",
              prices: {
                activeMonthly: price,
                advancedMonthly: price,
                starterMonthly: price,
              },
              products: {
                active: product,
                advanced: product,
                starter: product,
              },
              webhookEndpoint: {
                id: webhook,
              },
            },
          });

          const prepared = yield* lifecycle.prepare("billing-export");

          yield* capture.enqueueResponses(
            "GET",
            "/v1/products/prod_test_starter",
            [Response.json(stripeProduct)],
          );
          yield* capture.enqueueResponses(
            "GET",
            "/v1/prices/price_test_starter_monthly",
            [Response.json(stripePrice)],
          );
          yield* capture.enqueueResponses(
            "GET",
            "/v1/billing_portal/configurations/bpc_test_example",
            [Response.json(stripePortal)],
          );
          yield* capture.enqueueResponses(
            "GET",
            "/v1/webhook_endpoints/we_test_billing_events",
            [Response.json(Struct.omit(stripeWebhook, ["secret"]))],
          );

          yield* lifecycle.apply(prepared);

          const savedAfterApply =
            yield* stateStore.loadResources("billing-export");

          const portalRequests = yield* capture.requestsFor(
            "POST",
            "/v1/billing_portal/configurations",
          );
          const portalBody = yield* Effect.promise(() =>
            portalRequests[0].text(),
          );
          const portalForm = new URLSearchParams(portalBody);
          assert.strictEqual(
            portalForm.get(
              "features[subscription_update][products][0][product]",
            ),
            stripeProduct.id,
          );
          assert.strictEqual(
            portalForm.get(
              "features[subscription_update][products][0][prices][0]",
            ),
            stripePrice.id,
          );

          const observed = yield* lifecycle.reconcile(prepared);

          assert.deepStrictEqual(observed.missing, []);
          assert.sameDeepMembers([...observed.resources], [...savedAfterApply]);

          const encoded = yield* storage
            .get("./.nomoss/state/test-billing.json")
            .pipe(
              Effect.flatMap((value) =>
                Effect.fromOption(Option.fromUndefinedOr(value)),
              ),
            );

          const exportedAfterApply = yield* Schema.decodeEffect(
            Schema.fromJsonString(
              StripeBillingConfigurationExportDocumentSchema,
            ),
          )(encoded);

          yield* lifecycle.destroy(prepared);

          const exportedAfterDestroy = yield* storage.has(
            "./.nomoss/state/test-billing.json",
          );

          assert.deepStrictEqual(exportedAfterApply, {
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
          });

          assert.sameDeepMembers(
            Arr.map(savedAfterApply, (node) => node.key.logicalId),
            [
              "StarterProduct",
              "BillingPortalConfiguration",
              "BillingWebhookEndpoint",
              "StarterMonthlyPrice",
              "BillingConfigurationExport",
            ],
          );

          assert.isFalse(exportedAfterDestroy);
        }),
    );

    it.effect(
      "A failed product update can be retried without losing its applied state",
      () =>
        Effect.gen(function* () {
          const model = yield* ResourceModel;
          const stripe = yield* StripeResources;
          const lifecycle = yield* ResourceStackLifecycle;
          const stateStore = yield* ResourceStateStore;
          const capture = yield* StripeLifecycleFixture;

          yield* capture.enqueueResponses(
            "POST",
            "/v1/products/prod_test_starter",
            [
              Response.json(
                {
                  error: {
                    type: "invalid_request_error",
                    message: "Product update rejected",
                  },
                },
                { status: 400 },
              ),
              Response.json({
                ...stripeProduct,
                name: "Example Starter Plus",
                updated: 2,
              }),
            ],
          );

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

          const updates = yield* capture.requestsFor(
            "POST",
            "/v1/products/prod_test_starter",
          );
          const requestedNames = yield* Effect.forEach(updates, (request) =>
            Effect.promise(() => request.clone().text()).pipe(
              Effect.map((body) => new URLSearchParams(body).get("name")),
            ),
          );

          assert.deepStrictEqual(requestedNames, [
            "Example Starter Plus",
            "Example Starter Plus",
          ]);
          assert.strictEqual(failedStates.length, 1);

          const failedState = Option.getOrUndefined(
            Arr.findFirst(
              failedStates,
              (
                state,
              ): state is Extract<
                ResourceState,
                { readonly _tag: "Updating" }
              > => state._tag === "Updating",
            ),
          );

          assert.ok(failedState);

          const { desiredProps, previousOutputs, previousProps } =
            yield* Effect.all({
              desiredProps: model.decodeProps(
                failedState.node,
                StripeProductPropsSchema,
              ),
              previousOutputs: model.decodeOutputs(
                failedState.previous,
                StripeProductOutputsSchema,
              ),
              previousProps: model.decodeProps(
                failedState.previous,
                StripeProductPropsSchema,
              ),
            });

          const failedStateSummary = [
            {
              desiredName: desiredProps.name,
              failureTag: failedState.lastFailure?.errorTag,
              phase: failedState._tag,
              previousName: previousProps.name,
              productId: previousOutputs.ProductId,
            },
          ];

          assert.deepStrictEqual(failedStateSummary, [
            {
              desiredName: "Example Starter Plus",
              failureTag: "StripeApiError",
              phase: "Updating",
              previousName: "Example Starter",
              productId: "prod_test_starter",
            },
          ]);

          const recoveredStateSummary = yield* Effect.forEach(
            recoveredStates,
            (state) =>
              Effect.all({
                outputs: model.decodeOutputs(
                  state.node,
                  StripeProductOutputsSchema,
                ),
                props: model.decodeProps(state.node, StripeProductPropsSchema),
              }).pipe(
                Effect.map(({ outputs, props }) => ({
                  name: props.name,
                  phase: state._tag,
                  productId: outputs.ProductId,
                })),
              ),
          );

          assert.deepStrictEqual(recoveredStateSummary, [
            {
              name: "Example Starter Plus",
              phase: "Updated",
              productId: "prod_test_starter",
            },
          ]);
        }),
    );

    it.effect("A failed product teardown can be retried from saved state", () =>
      Effect.gen(function* () {
        const model = yield* ResourceModel;
        const stripe = yield* StripeResources;
        const lifecycle = yield* ResourceStackLifecycle;
        const stateStore = yield* ResourceStateStore;
        const capture = yield* StripeLifecycleFixture;

        yield* capture.enqueueResponses(
          "POST",
          "/v1/products/prod_test_destroy_retry",
          [
            Response.json(
              {
                error: {
                  type: "invalid_request_error",
                  message: "Product retirement rejected",
                },
              },
              { status: 400 },
            ),
            Response.json({
              ...stripeProduct,
              id: "prod_test_destroy_retry",
              active: false,
            }),
          ],
        );

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

        const retirements = yield* capture.requestsFor(
          "POST",
          "/v1/products/prod_test_destroy_retry",
        );
        const requestedActive = yield* Effect.forEach(retirements, (request) =>
          Effect.promise(() => request.clone().text()).pipe(
            Effect.map((body) => new URLSearchParams(body).get("active")),
          ),
        );

        assert.deepStrictEqual(requestedActive, ["false", "false"]);
        assert.strictEqual(failedStates.length, 1);

        const failedState = Option.getOrUndefined(
          Arr.findFirst(
            failedStates,
            (
              state,
            ): state is Extract<ResourceState, { readonly _tag: "Deleting" }> =>
              state._tag === "Deleting",
          ),
        );

        assert.ok(failedState);

        const failedDestroyOutputs = yield* model.decodeOutputs(
          failedState.node,
          StripeProductOutputsSchema,
        );

        const failedDestroyStateSummary = [
          {
            failureTag: failedState.lastFailure?.errorTag,
            phase: failedState._tag,
            productId: failedDestroyOutputs.ProductId,
          },
        ];

        assert.deepStrictEqual(failedDestroyStateSummary, [
          {
            failureTag: "StripeApiError",
            phase: "Deleting",
            productId: "prod_test_destroy_retry",
          },
        ]);

        assert.deepStrictEqual(recoveredStates, []);
      }),
    );
  },
);
