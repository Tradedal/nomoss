# Test Nomoss behavior

Nomoss tests exercise public service operations with the dependencies used by applications. Fixtures control external behavior through the services responsible for it, and assertions inspect the result promised to the caller. Effect Vitest runs that program and releases its scoped dependencies when the test or the group that owns them finishes.

## Choose evidence for the required behavior

Choose an observation that proves the result claimed by the test. For example, a claim that apply saved a resource needs a read of that saved value after the public apply operation completes. A claim about dependency order needs an observation that the dependent operation proceeds after its prerequisite completes. The test label and assertions should describe that same result so a failure identifies which promised behavior is absent.

A service test belongs in a file named after the service with the suffix .test.ts. Its describe block groups a capability, and each test label names that capability and explains its outcome under the relevant initial condition or trigger. Put the scenario and any conditions on elapsed time in that sentence and the test body so the name identifies what failed under those conditions.

The required result determines which operation a test exercises. A pure domain rule can be checked with input values and its result or failure. Provider translation needs a response passed through the production provider service, followed by an assertion about the observation or failure it returns. Reconciliation needs controlled provider observations and a check of saved state. An apply workflow needs the production service call so assertions can follow provider actions in dependency order, read saved lifecycle transitions, and verify resource cleanup.

Live provider workflows establish that generated clients and resource execution work together against the service. Keep a small number of these workflows and run the relevant one after generation or execution changes. Repeat more focused checks when the change or a failure leaves a specific correctness question unresolved.

A regression test must fail for a realistic defect in the production operation and pass when that operation delivers the required result. Assertions that observe that result must remain valid after an internal refactor. Library documentation provides evidence for library guarantees, so new tests are needed when the unresolved question concerns Nomoss behavior.

Assertions about a private representation or a sequence of implementation steps can reject an equivalent implementation after a refactor. Such tests are prohibited because the required result for callers remains the same. Check that result through the production API. Changes to a production API or data passed through application Layers need an application consumer's requirement. Access for a test alone does not justify them.

When a complete generated artifact establishes the required result, capture it through the production generator in a snapshot test. The output must be deterministic so a changed snapshot identifies a change to the code its consumers receive. Review that generated contract and its behavior before you accept new expectations.

For a failed stack, resource, or provider operation, CLI tests must check the diagnostics the operator receives and how the process exits. They must also check how it exits after interruption. To test progress reports, run the executable workflow, observe elapsed time and terminal output, and verify that the display stops when its scope ends.

## Check generated metadata

Run the AWS operation metadata tests in the ordinary test suite. They verify metadata from versioned documents converted from Smithy models after the declared source corrections are applied.

```sh
yarn exec vitest run tests/aws/operationCatalogs.test.ts --pool forks
```

After an intentional source or generation change, use Vitest's update option to capture the new metadata in tests/aws/__snapshots__/operationCatalogs.test.ts.snap. Review the metadata before you accept those expectations.

```sh
yarn exec vitest run tests/aws/operationCatalogs.test.ts --pool forks --update
```

Run the catalog and resource input tests to check contracts generated from small OpenAPI documents through production services. These cases verify which fields source references and composed schemas make required, and which relationship alternatives and parameter types the contracts accept. They also check generated names, which data the contracts retain, and which inputs pass native Effect schemas. Their inputs are part of the tests, so they require neither a source checkout nor provider credentials.

```sh
yarn exec vitest run tests/resourceCatalogs.test.ts tests/stripe/stripeClientGenerator.test.ts --pool forks
```

To check AWS Queue output metadata against the CloudFormation Registry document, first prepare the local checkout under the [AWS resource generation instructions](../../tools/awsResources/README.md). Then run the following test with the integration configuration, which includes files excluded from the default configuration. This test reads the local reference and requires no provider credentials.

```sh
yarn exec vitest run --config vitest.integration.config.ts tests/resourceCatalogs.integration.test.ts --pool forks
```

After an intentional mapping change, run the same command with --update and review tests/__snapshots__/resourceCatalogs.integration.test.ts.snap. Regenerate the affected declarations, then run the provider workflow to establish that the configured resource identity works against the service.

## Supply test dependencies through shared fixtures

A reusable fixture connects the production models and provider services needed to call a public operation, then supplies controlled data and external behavior for that call. Scenarios shared by tests of the same service belong with that service's domain. Reusable test Layers belong beside their live Layers with a TestLayer suffix. A single-use input can remain in its test.

Fixtures control external behavior while the production contracts continue to validate it. Use production ResourceStateStore with KeyValueStore.layerMemory in resource state tests so saved values pass through actual serialization and lifecycle transitions. HTTP fixtures capture native requests and return native responses through the generated provider request and response contracts.

Provide one Layer graph for each test group so operations within a constructed graph share the same stateful services. Layer.provide supplies a Layer's internal dependencies, and Layer.provideMerge also exposes those services to the test when assertions need to call them. Compose the graph with all required services available before a dependent Layer is constructed.

## Coordinate asynchronous work in Effect tests

The program returned to it.effect owns the work that the test needs to complete and the assertions about its result. Keep them in one terminating Effect.gen expression or declarative pipeline so the test runner waits for that work. For an expected tagged failure, use Effect failure combinators to obtain the error as a value that an assertion can inspect.

An asynchronous assertion needs evidence that the operation reached the state under examination. Coordinate that work with deterministic signals and the test clock, then observe completion and cleanup through the public operation. Direct fiber control is appropriate when the behavior under test is interruption or the lifetime of a shared fiber.

Run integration files with vitest.integration.config.ts because vitest.config.ts excludes them. The macOS Keychain test also requires that configuration. Its cleanup must remove the test credential and state file when the test scope ends.

## Test AWS workflows

Before you request credentials on a workstation already configured for integration tests, check `~/.codex/memories/nomoss-integration.md` for the selected AWS profile and Stripe secret reference.

awsCloudControlStackTestLayer connects production resource declarations to provider execution, output resolution, and persistence for controlled AWS workflows. Its HttpClient receives fixture responses while production ResourceStateStore saves to KeyValueStore.layerMemory. Supply it through layer(..., { buildPerTest: true }) so each test starts with independent state and releases its services at completion. Check captured provider requests for resolved dependency values and read saved lifecycle transitions to verify successful operations and recorded failures.

To validate resources in AWS, supply live provider Layers and verify the resources through provider reads. Effect Vitest's it.live selects live test services, such as the clock. The Layers supplied to the test determine which provider it calls.

The S3-to-SQS workflow in awsUploadEvents.integration.test.ts must establish event delivery through generated Cloud Control declarations. Create the bucket and queue and apply delivery permission before you enable bucket notifications, because S3 validates the destination. Use the installed AWS CLI with the selected profile to upload an object and receive its SQS notification.

Use unique stack and resource names for the live suite and save state through production file storage. At cleanup, remove the uploaded object before you destroy the managed stack. Verify through final Cloud Control reads that the bucket and queue are absent.

Select the integration account with AWS_PROFILE and the region with AWS_REGION. The default region is us-east-1. Run the AWS workflow suite with the following command. To run all integration files for operating-system services and live providers, use `yarn test:integration`.

```sh
AWS_PROFILE=your-integration-profile AWS_REGION=us-east-1 yarn test:integration:aws
```

## Test Stripe workflows

The live Stripe suite exercises three billing applications to check resource updates and their application outputs. One has a single offer, and another exports three offers and a webhook. When a price amount changes, the suite follows the replacement price ID into the dependent portal configuration and exported application IDs.

The application cases also submit fractional price amounts and absent dependencies to verify rejection before saved resources change. Check saved state after those failures to establish that the rejected declaration left managed resources intact.

Live cases exercise the generated Coupon, TaxRate, and ShippingRate clients as well as the Customer, Product, and Price stack workflow. Their provider reads verify creation, updates, and removal against the service.

The billing export workflow reconciles provider resources and validates the published application file through production policies. It checks that a webhook's saved secret survives reconciliation when the provider omits that secret from its read response. Teardown removes the managed resources and the exported file.

Focused fixture tests check which provider observations justify a saved-state change. Reconciliation removes a saved resource after a 404 because the provider has confirmed absence. It preserves the resource after a denied read because absence remains unconfirmed. If a webhook response omits its secret, reconciliation preserves the saved secret for signature verification.

Supply STRIPE_API_KEY from your secret manager or shell environment. The suite accepts sandbox secret keys and sandbox restricted keys with the prefixes described in [Stripe's API key documentation](https://docs.stripe.com/keys). A restricted key must allow the provider operations exercised by the suite. Keep account identifiers, secret-manager locations, and credentials outside repository files. Run the suite explicitly in a trusted environment and keep provider credentials out of public pull-request jobs.

When AWS Secrets Manager holds the key, use the profile, region, secret identifier, and JSON field recorded in the workstation note. Extract that field from SecretString and pass it as STRIPE_API_KEY to the test command. Use the AWS profile to authorize secret retrieval and the extracted Stripe key to authorize provider requests.

```sh
yarn test:integration:stripe
```

Each run uses unique names and marks the objects it creates with an integration ID. If the run fails, cleanup destroys resources identified in saved state. It retains that state if teardown fails and removes the local state file after successful cleanup. If Nomoss cannot decode a creation response, the provider may have created an object whose ID was never saved. Locate that object by its integration metadata so you can remove it.

Cleanup deletes Stripe Customer objects, coupons, and webhooks and deactivates the other Stripe objects exercised by the suite. The workflows leave account settings and other resources unchanged and create no payments or subscriptions.

## Check the completed change

For implementation work, follow the [linting workflow](linting.md) to lint the files you changed, run the project compiler, and run the smallest relevant behavior test. Run broader checks when they fall within the authorized scope.

For documentation changes, read the complete prose against the applicable contract and verify its links and examples. Biome, TypeScript, and Vitest are unnecessary for prose changes.
