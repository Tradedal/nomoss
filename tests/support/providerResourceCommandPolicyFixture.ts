import {
  Array as Arr,
  Cause,
  Context,
  Effect,
  Layer,
  Match,
  Ref,
} from "effect";

import {
  resourceGraphBuilderLayer,
  resourceGraphStoreLayer,
  resourceModelLayer,
  resourceOutputResolverLayer,
  resourcePlannerLayer,
  resourcePolicyLayer,
  resourceStackLifecycleLayer,
} from "../../src/core/runtimeLayer.js";
import { ResourceStateStoreTestLayer } from "../../src/core/stateStore.js";
import { QueueLifecycleService } from "../../src/providers/aws/awsQueue.js";
import { QueueResourcePolicy } from "../../src/providers/aws/awsQueueResourcePolicy.js";
import { AwsSqsTransport } from "../../src/providers/aws/awsSqsTransport.js";
import { AwsTagging } from "../../src/providers/aws/awsTagging.js";
import {
  awsQueueResourceCommandMetadataLayer,
  providerResourceCommandPolicyLayerLive,
  stripeBillingConfigurationExportResourceCommandMetadataLayer,
  stripeBillingPortalConfigurationResourceCommandMetadataLayer,
  stripeCustomerResourceCommandMetadataLayer,
  stripePriceResourceCommandMetadataLayer,
  stripeProductResourceCommandMetadataLayer,
  stripeWebhookEndpointResourceCommandMetadataLayer,
} from "../../src/providers/resourceCommandPolicyLayer.js";
import {
  type StripeBillingConfigurationExportDocument,
  StripeBillingConfigurationExportLifecycle,
  type StripeBillingConfigurationExportWriteInput,
} from "../../src/providers/stripe/stripeBillingConfigurationExport.js";
import { StripeBillingConfigurationExportResourcePolicy } from "../../src/providers/stripe/stripeBillingConfigurationExportResourcePolicy.js";
import {
  StripeBillingPortalConfigurationLifecycle,
  type StripeBillingPortalConfigurationProps,
  type StripeBillingPortalConfigurationUpdateProps,
} from "../../src/providers/stripe/stripeBillingPortalConfiguration.js";
import { StripeBillingPortalConfigurationResourcePolicy } from "../../src/providers/stripe/stripeBillingPortalConfigurationResourcePolicy.js";
import {
  StripeCustomerCreateFailed,
  StripeCustomerLifecycle,
  type StripeCustomerProps,
  type StripeCustomerUpdateProps,
} from "../../src/providers/stripe/stripeCustomer.js";
import { StripeCustomerResourcePolicy } from "../../src/providers/stripe/stripeCustomerResourcePolicy.js";
import {
  StripePriceLifecycle,
  type StripePriceProps,
} from "../../src/providers/stripe/stripePrice.js";
import { StripePriceResourcePolicy } from "../../src/providers/stripe/stripePriceResourcePolicy.js";
import {
  StripeProductDestroyFailed,
  StripeProductLifecycle,
  type StripeProductObservedState,
  type StripeProductProps,
  StripeProductUpdateFailed,
  type StripeProductUpdateProps,
} from "../../src/providers/stripe/stripeProduct.js";
import { StripeProductResourcePolicy } from "../../src/providers/stripe/stripeProductResourcePolicy.js";
import { StripeResources } from "../../src/providers/stripe/stripeResources.js";
import {
  StripeWebhookEndpointLifecycle,
  type StripeWebhookEndpointRequestProps,
  type StripeWebhookEndpointUpdateProps,
} from "../../src/providers/stripe/stripeWebhookEndpoint.js";
import { StripeWebhookEndpointResourcePolicy } from "../../src/providers/stripe/stripeWebhookEndpointResourcePolicy.js";

export class ProviderCommandFixtureCapture extends Context.Service<ProviderCommandFixtureCapture>()(
  "nomoss/tests/support/providerResourceCommandPolicyFixture/ProviderCommandFixtureCapture",
  {
    make: Effect.succeed({
      append: (_event: string) => Effect.void,
      snapshot: Effect.succeed<ReadonlyArray<string>>([]),
    }),
  },
) {}

export class StripeBillingConfigurationExportFixture extends Context.Service<StripeBillingConfigurationExportFixture>()(
  "nomoss/tests/support/providerResourceCommandPolicyFixture/StripeBillingConfigurationExportFixture",
  {
    make: Effect.succeed({
      delete: (_outputPath: string) => Effect.void,
      snapshot: Effect.succeed(
        new Map<string, StripeBillingConfigurationExportDocument>(),
      ),
      write: (props: StripeBillingConfigurationExportWriteInput) =>
        Effect.succeed({
          OutputPath: props.outputPath,
        }),
    }),
  },
) {}

const providerCommandFixtureCaptureLayer = Layer.effect(
  ProviderCommandFixtureCapture,
  Effect.gen(function* () {
    const events = yield* Ref.make<ReadonlyArray<string>>([]);
    const capture = {
      append: (event: string) => Ref.update(events, Arr.append(event)),
      snapshot: Ref.get(events),
    };

    return capture;
  }),
);

const stripeBillingConfigurationExportFixtureLayer = Layer.effect(
  StripeBillingConfigurationExportFixture,
  Effect.gen(function* () {
    const exportsByPath = yield* Ref.make(
      new Map<string, StripeBillingConfigurationExportDocument>(),
    );

    return {
      delete: (outputPath: string) =>
        Ref.update(
          exportsByPath,
          (current) =>
            new Map(
              Arr.filter(
                Array.from(current.entries()),
                ([path]) => path !== outputPath,
              ),
            ),
        ),
      snapshot: Ref.get(exportsByPath),
      write: (props: StripeBillingConfigurationExportWriteInput) =>
        Ref.update(exportsByPath, (current) =>
          new Map(current).set(props.outputPath, props.document),
        ).pipe(
          Effect.as({
            OutputPath: props.outputPath,
          }),
        ),
    };
  }),
);

const awsSqsTransportFixtureLayer = Layer.effect(
  AwsSqsTransport,
  Effect.gen(function* () {
    const capture = yield* ProviderCommandFixtureCapture;

    return {
      createQueue: (request) =>
        capture.append("create aws queue").pipe(
          Effect.as({
            QueueUrl: `https://sqs.us-east-1.amazonaws.com/123456789012/${request.QueueName}`,
          }),
        ),
      deleteQueue: () =>
        capture.append("destroy aws queue").pipe(Effect.as({})),
      getQueueAttributes: () =>
        Effect.succeed({
          Attributes: {
            QueueArn: "arn:aws:sqs:us-east-1:123456789012:events",
          },
        }),
      getQueueUrl: (request) =>
        Effect.succeed({
          QueueUrl: `https://sqs.us-east-1.amazonaws.com/123456789012/${request.QueueName}`,
        }),
      listQueueTags: () =>
        Effect.succeed({
          Tags: {},
        }),
    };
  }),
);

const awsQueueResourcePolicyFixtureLayer = Layer.effect(
  QueueResourcePolicy,
  QueueResourcePolicy.make,
).pipe(
  Layer.provideMerge(
    Layer.effect(QueueLifecycleService, QueueLifecycleService.make).pipe(
      Layer.provide(awsSqsTransportFixtureLayer),
    ),
  ),
  Layer.provideMerge(
    Layer.succeed(AwsTagging, {
      reconcile: () => Effect.void,
    }),
  ),
  Layer.provideMerge(resourceModelLayer),
  Layer.provideMerge(resourcePolicyLayer),
);

const createdCustomer = {
  created: 1,
  default_source: null,
  description: null,
  email: null,
  id: "cus_test_billing_customer",
  livemode: false,
  object: "customer" as const,
  shipping: null,
};

type ProviderCommandFixtureScenario =
  | "success"
  | "customerCreateFailure"
  | "productUpdateFailsOnce"
  | "productDestroyFailsOnce";

const productState = (
  id: string,
  name: string,
  updated: number,
): StripeProductObservedState => ({
  active: true,
  created: 1,
  description: null,
  id,
  images: [],
  livemode: false,
  marketing_features: [],
  metadata: {},
  name,
  object: "product",
  package_dimensions: null,
  shippable: null,
  type: "service",
  updated,
  url: null,
});

const stripeCustomerLayer = (scenario: ProviderCommandFixtureScenario) =>
  Layer.effect(
    StripeCustomerLifecycle,
    Effect.gen(function* () {
      const capture = yield* ProviderCommandFixtureCapture;

      return {
        createCustomer: (_props: StripeCustomerProps) =>
          capture.append("create stripe customer").pipe(
            Effect.andThen(
              Match.value(scenario).pipe(
                Match.when("customerCreateFailure", () =>
                  Effect.fail(
                    new StripeCustomerCreateFailed({
                      cause: Cause.fail(
                        "fixture stripe customer create failed",
                      ),
                    }),
                  ),
                ),
                Match.orElse(() => Effect.succeed(createdCustomer)),
              ),
            ),
          ),
        readCustomer: () => Effect.succeedNone,
        updateCustomer: (_input: StripeCustomerUpdateProps) =>
          Effect.succeed(createdCustomer),
        deleteCustomer: () =>
          Match.value(scenario).pipe(
            Match.when("customerCreateFailure", () => Effect.void),
            Match.orElse(() => capture.append("destroy stripe customer")),
          ),
      };
    }),
  );

const stripeProductLayer = (scenario: ProviderCommandFixtureScenario) =>
  Layer.effect(
    StripeProductLifecycle,
    Effect.gen(function* () {
      const capture = yield* ProviderCommandFixtureCapture;
      const productUpdateAttempts = yield* Ref.make(0);
      const productDestroyAttempts = yield* Ref.make(0);

      return {
        createProduct: (_props: StripeProductProps) =>
          capture
            .append("create stripe product")
            .pipe(
              Effect.as(
                productState("prod_test_starter", "Example Starter", 1),
              ),
            ),
        readProduct: () => Effect.succeedNone,
        updateProduct: (input: StripeProductUpdateProps) =>
          capture
            .append(`update stripe product ${input.id} ${input.name}`)
            .pipe(
              Effect.andThen(
                Ref.modify(productUpdateAttempts, (attempts) => [
                  attempts,
                  attempts + 1,
                ]),
              ),
              Effect.flatMap((attempts) =>
                Match.value({ scenario, attempts }).pipe(
                  Match.when(
                    { scenario: "productUpdateFailsOnce", attempts: 0 },
                    () =>
                      Effect.fail(
                        new StripeProductUpdateFailed({
                          cause: Cause.fail("fixture product update failed"),
                        }),
                      ),
                  ),
                  Match.orElse(() =>
                    Effect.succeed(
                      productState(
                        input.id,
                        input.name ?? "Example Starter",
                        attempts + 1,
                      ),
                    ),
                  ),
                ),
              ),
            ),
        deactivateProduct: (productId: string) =>
          Match.value(scenario).pipe(
            Match.when("productDestroyFailsOnce", () =>
              capture.append(`destroy stripe product ${productId}`),
            ),
            Match.orElse(() => capture.append("destroy stripe product")),
            Effect.andThen(
              Ref.modify(productDestroyAttempts, (attempts) => [
                attempts,
                attempts + 1,
              ]),
            ),
            Effect.flatMap((attempts) =>
              Match.value({ scenario, attempts }).pipe(
                Match.when(
                  { scenario: "productDestroyFailsOnce", attempts: 0 },
                  () =>
                    Effect.fail(
                      new StripeProductDestroyFailed({
                        cause: Cause.fail("fixture product destroy failed"),
                      }),
                    ),
                ),
                Match.orElse(() => Effect.void),
              ),
            ),
          ),
      };
    }),
  );

const stripePriceSuccessLayer = Layer.effect(
  StripePriceLifecycle,
  Effect.gen(function* () {
    const capture = yield* ProviderCommandFixtureCapture;

    return {
      createPrice: (_props: StripePriceProps) =>
        capture.append("create stripe price").pipe(
          Effect.as({
            active: true,
            billing_scheme: "per_unit" as const,
            created: 1,
            currency: "usd",
            custom_unit_amount: null,
            id: "price_test_starter_monthly",
            livemode: false,
            lookup_key: "example_starter_monthly_dev",
            metadata: {},
            nickname: "Starter monthly",
            object: "price" as const,
            product: "prod_test_starter",
            recurring: {
              interval: "month",
              interval_count: 1,
              trial_period_days: null,
              usage_type: "licensed",
            },
            tax_behavior: "unspecified" as const,
            tiers_mode: null,
            transform_quantity: null,
            type: "recurring" as const,
            unit_amount: 2900,
            unit_amount_decimal: "2900",
          }),
        ),
      createReplacementPrice: (_priceId: string, _props: StripePriceProps) =>
        capture.append("replace stripe price").pipe(
          Effect.as({
            active: true,
            billing_scheme: "per_unit" as const,
            created: 1,
            currency: "usd",
            custom_unit_amount: null,
            id: "price_test_starter_monthly",
            livemode: false,
            lookup_key: "example_starter_monthly_dev",
            metadata: {},
            nickname: "Starter monthly",
            object: "price" as const,
            product: "prod_test_starter",
            recurring: {
              interval: "month",
              interval_count: 1,
              trial_period_days: null,
              usage_type: "licensed",
            },
            tax_behavior: "unspecified" as const,
            tiers_mode: null,
            transform_quantity: null,
            type: "recurring" as const,
            unit_amount: 2900,
            unit_amount_decimal: "2900",
          }),
        ),
      readPrice: () => Effect.succeedNone,
      deactivatePrice: () => capture.append("destroy stripe price"),
    };
  }),
);

const stripeWebhookEndpointSuccessLayer = Layer.effect(
  StripeWebhookEndpointLifecycle,
  Effect.gen(function* () {
    const capture = yield* ProviderCommandFixtureCapture;

    return {
      createWebhookEndpoint: (_props: StripeWebhookEndpointRequestProps) =>
        capture.append("create stripe webhook endpoint").pipe(
          Effect.as({
            api_version: "2026-06-24.dahlia",
            application: null,
            created: 1,
            description: "Example dev billing webhook",
            enabled_events: ["checkout.session.completed"],
            id: "we_test_billing_events",
            livemode: false,
            metadata: {},
            object: "webhook_endpoint" as const,
            secret: "whsec_test_billing_events",
            status: "enabled",
            url: "https://example.test/api/stripe/webhook",
          }),
        ),
      readWebhookEndpoint: () => Effect.succeedNone,
      updateWebhookEndpoint: (_input: StripeWebhookEndpointUpdateProps) =>
        capture.append("update stripe webhook endpoint").pipe(
          Effect.as({
            api_version: "2026-06-24.dahlia",
            application: null,
            created: 1,
            description: "Example dev billing webhook",
            enabled_events: ["checkout.session.completed"],
            id: "we_test_billing_events",
            livemode: false,
            metadata: {},
            object: "webhook_endpoint" as const,
            status: "enabled",
            url: "https://example.test/api/stripe/webhook",
          }),
        ),
      deleteWebhookEndpoint: () =>
        capture.append("destroy stripe webhook endpoint"),
    };
  }),
);

const stripeBillingPortalConfigurationSuccessLayer = Layer.effect(
  StripeBillingPortalConfigurationLifecycle,
  Effect.succeed({
    createBillingPortalConfiguration: (
      _props: StripeBillingPortalConfigurationProps,
    ) =>
      Effect.succeed({
        active: true,
        application: null,
        business_profile: {
          headline: "Example billing",
          privacy_policy_url: null,
          terms_of_service_url: null,
        },
        created: 1,
        default_return_url: "https://app.example.test/account/billing",
        features: {
          customer_update: {
            allowed_updates: [],
            enabled: false,
          },
          invoice_history: {
            enabled: true,
          },
          payment_method_update: {
            enabled: true,
            payment_method_configuration: null,
          },
          subscription_cancel: {
            cancellation_reason: {
              enabled: false,
              options: [],
            },
            enabled: true,
            mode: "at_period_end" as const,
            proration_behavior: "none" as const,
          },
          subscription_update: {
            billing_cycle_anchor: null,
            default_allowed_updates: [],
            enabled: false,
            proration_behavior: "none" as const,
            schedule_at_period_end: {
              conditions: [],
            },
            trial_update_behavior: "continue_trial" as const,
          },
        },
        id: "bpc_test_example",
        is_default: false,
        livemode: false,
        login_page: {
          enabled: false,
          url: null,
        },
        metadata: {
          application: "example",
          environment: "dev",
        },
        name: "Example dev billing portal",
        object: "billing_portal.configuration" as const,
        updated: 1,
      }),
    readBillingPortalConfiguration: () => Effect.succeedNone,
    updateBillingPortalConfiguration: (
      _input: StripeBillingPortalConfigurationUpdateProps,
    ) =>
      Effect.succeed({
        active: true,
        application: null,
        business_profile: {
          headline: "Example billing",
          privacy_policy_url: null,
          terms_of_service_url: null,
        },
        created: 1,
        default_return_url: "https://app.example.test/account/billing",
        features: {
          customer_update: {
            allowed_updates: [],
            enabled: false,
          },
          invoice_history: {
            enabled: true,
          },
          payment_method_update: {
            enabled: true,
            payment_method_configuration: null,
          },
          subscription_cancel: {
            cancellation_reason: {
              enabled: false,
              options: [],
            },
            enabled: true,
            mode: "at_period_end" as const,
            proration_behavior: "none" as const,
          },
          subscription_update: {
            billing_cycle_anchor: null,
            default_allowed_updates: [],
            enabled: false,
            proration_behavior: "none" as const,
            schedule_at_period_end: {
              conditions: [],
            },
            trial_update_behavior: "continue_trial" as const,
          },
        },
        id: "bpc_test_example",
        is_default: false,
        livemode: false,
        login_page: {
          enabled: false,
          url: null,
        },
        metadata: {
          application: "example",
          environment: "dev",
        },
        name: "Example dev billing portal",
        object: "billing_portal.configuration" as const,
        updated: 1,
      }),
    deactivateBillingPortalConfiguration: () => Effect.void,
  }),
);

const stripeBillingConfigurationExportSuccessLayer = Layer.effect(
  StripeBillingConfigurationExportLifecycle,
  Effect.gen(function* () {
    const fixture = yield* StripeBillingConfigurationExportFixture;

    return {
      writeBillingConfigurationExport: (
        props: StripeBillingConfigurationExportWriteInput,
      ) => fixture.write(props),
      deleteBillingConfigurationExport: (outputPath: string) =>
        fixture.delete(outputPath),
    };
  }),
);

const stripeCustomerResourcePolicyLayer = (
  scenario: ProviderCommandFixtureScenario,
) =>
  Layer.effect(
    StripeCustomerResourcePolicy,
    StripeCustomerResourcePolicy.make,
  ).pipe(
    Layer.provideMerge(stripeCustomerLayer(scenario)),
    Layer.provideMerge(resourceModelLayer),
  );

const stripeProductResourcePolicyLayer = (
  scenario: ProviderCommandFixtureScenario,
) =>
  Layer.effect(
    StripeProductResourcePolicy,
    StripeProductResourcePolicy.make,
  ).pipe(
    Layer.provideMerge(stripeProductLayer(scenario)),
    Layer.provideMerge(resourceModelLayer),
  );

const stripePriceResourcePolicyLayer = Layer.effect(
  StripePriceResourcePolicy,
  StripePriceResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripePriceSuccessLayer),
  Layer.provideMerge(resourceModelLayer),
);

const stripeWebhookEndpointResourcePolicyLayer = Layer.effect(
  StripeWebhookEndpointResourcePolicy,
  StripeWebhookEndpointResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeWebhookEndpointSuccessLayer),
  Layer.provideMerge(resourceModelLayer),
);

const stripeBillingPortalConfigurationResourcePolicyLayer = Layer.effect(
  StripeBillingPortalConfigurationResourcePolicy,
  StripeBillingPortalConfigurationResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeBillingPortalConfigurationSuccessLayer),
  Layer.provideMerge(resourceModelLayer),
);

const stripeBillingConfigurationExportResourcePolicyLayer = Layer.effect(
  StripeBillingConfigurationExportResourcePolicy,
  StripeBillingConfigurationExportResourcePolicy.make,
).pipe(
  Layer.provideMerge(stripeBillingConfigurationExportSuccessLayer),
  Layer.provideMerge(resourceModelLayer),
);

const providerCommandMetadataLayer = Layer.mergeAll(
  awsQueueResourceCommandMetadataLayer,
  stripeCustomerResourceCommandMetadataLayer,
  stripeProductResourceCommandMetadataLayer,
  stripePriceResourceCommandMetadataLayer,
  stripeWebhookEndpointResourceCommandMetadataLayer,
  stripeBillingPortalConfigurationResourceCommandMetadataLayer,
  stripeBillingConfigurationExportResourceCommandMetadataLayer,
);

const providerResourcePolicyLayer = (
  scenario: ProviderCommandFixtureScenario,
) =>
  Layer.mergeAll(
    awsQueueResourcePolicyFixtureLayer,
    stripeCustomerResourcePolicyLayer(scenario),
    stripeProductResourcePolicyLayer(scenario),
    stripePriceResourcePolicyLayer,
    stripeWebhookEndpointResourcePolicyLayer,
    stripeBillingPortalConfigurationResourcePolicyLayer,
    stripeBillingConfigurationExportResourcePolicyLayer,
  );

const providerCommandPolicyLayer = (scenario: ProviderCommandFixtureScenario) =>
  providerResourceCommandPolicyLayerLive.pipe(
    Layer.provideMerge(
      providerCommandMetadataLayer.pipe(
        Layer.provideMerge(providerResourcePolicyLayer(scenario)),
      ),
    ),
    Layer.provideMerge(providerCommandFixtureCaptureLayer),
    Layer.provideMerge(stripeBillingConfigurationExportFixtureLayer),
  );

const stripeResourcesLayer = Layer.effect(
  StripeResources,
  StripeResources.make,
).pipe(Layer.provideMerge(resourceGraphBuilderLayer));

const resourceStackLifecycleFixtureLayer = (
  scenario: ProviderCommandFixtureScenario,
) => {
  const graphStoreLayer = resourceGraphStoreLayer;
  const graphBuilderLayer = resourceGraphBuilderLayer.pipe(
    Layer.provideMerge(graphStoreLayer),
    Layer.provideMerge(resourceModelLayer),
  );
  const resourcesLayer = stripeResourcesLayer.pipe(
    Layer.provideMerge(graphBuilderLayer),
  );
  const stateStoreLayer = ResourceStateStoreTestLayer;
  const plannerLayer = resourcePlannerLayer;
  const outputResolverLayer = resourceOutputResolverLayer;
  const commandPolicyLayer = providerCommandPolicyLayer(scenario);
  const lifecycleLayer = resourceStackLifecycleLayer.pipe(
    Layer.provideMerge(
      Layer.mergeAll(
        graphStoreLayer,
        stateStoreLayer,
        plannerLayer,
        outputResolverLayer,
        commandPolicyLayer,
      ),
    ),
  );

  return Layer.mergeAll(
    resourceModelLayer,
    graphStoreLayer,
    graphBuilderLayer,
    resourcesLayer,
    stateStoreLayer,
    plannerLayer,
    outputResolverLayer,
    commandPolicyLayer,
    lifecycleLayer,
  );
};

/**
 * Lifecycle tests consume this fixture so the test body stays on the public
 * stack contract while provider policies run through their live layer path.
 */
export const ResourceStackLifecycleProviderFixture = {
  successfulCrossProviderStack: () =>
    resourceStackLifecycleFixtureLayer("success"),

  dependentStripeCreateFailure: () =>
    resourceStackLifecycleFixtureLayer("customerCreateFailure"),

  productUpdateFailsOnce: () =>
    resourceStackLifecycleFixtureLayer("productUpdateFailsOnce"),

  productDestroyFailsOnce: () =>
    resourceStackLifecycleFixtureLayer("productDestroyFailsOnce"),
};
