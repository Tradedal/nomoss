# Generate Stripe clients

Use [openapi-source.json](openapi-source.json) to select the Stripe specification and resource choices that Nomoss will compile. The manifest pins latest/openapi.spec3.json from [stripe/openapi](https://github.com/stripe/openapi), including generally available v1 and v2 operations, by upstream commit and SHA-256 checksum. Generation checks the source bytes against that checksum before producing clients and catalogs.

When the pinned specification needs a correction, declare it under its specification path in the manifest. SourceCorrectionRegistry validates the correction, and SourceCorrections requires the original value to match the recorded expectation before applying it. A mismatch stops generation so a correction reviewed for one provider revision cannot silently alter another. The resulting clients and exported stripeOperationCatalog use the same corrected document. Inspect that catalog for operation requirements and their source locations.

After generation, inspect a resource's catalog entry when its creation operation has no executable binding. An encoding that the generator cannot bind appears in bindingIssues with the reason creation could not be prepared.

Preserve the order in which `OpenApiResourceSchemas` normalizes schemas: child schemas precede the schemas that contain them. Effect then retains the provider's allowed null values in references, alternatives, enums, and dictionary values.

## Configure resource relationships

Use `resourceHints` in [openapi-source.json](openapi-source.json) when discovery cannot establish which resource an input accepts or which operation creates that resource. For example, Stripe describes `Payout.destination` as a bank-account or card identity, but both target models use account-scoped operations that return the `external_account` union. The generator needs a separate selection for each target before it can generate an entity-valued payout destination.

Configure one hint per target when several resource models share the same creation and read operations. In the example below, `PostAccountsAccountExternalAccounts` creates either a bank account or a card, and `GetAccountsAccountExternalAccountsId` reads either resource. Set `bank_account.responseSchema` to select the bank-account model for `StripeBankAccountResource` and the corresponding card reference to select `StripeCardResource`. Generation uses those provider schemas for validation, and `StripeResourcePolicy` checks the selected model before accepting its outputs. The existing `account.name` hint gives the owning account declaration the name `V1Account`.

```json
{
  "resourceHints": {
    "account": { "name": "V1Account" },
    "bank_account": {
      "responseSchema": "#/components/schemas/bank_account",
      "createOperation": "PostAccountsAccountExternalAccounts",
      "readOperation": "GetAccountsAccountExternalAccountsId",
      "relationships": {
        "/account": ["#/components/schemas/account"]
      }
    },
    "card": {
      "responseSchema": "#/components/schemas/card",
      "createOperation": "PostAccountsAccountExternalAccounts",
      "readOperation": "GetAccountsAccountExternalAccountsId",
      "relationships": {
        "/account": ["#/components/schemas/account"]
      }
    }
  }
}
```

Add a relationship hint for every required parent parameter so Nomoss can obtain its value from a declared resource. Stripe's bank-account creation path is `/v1/accounts/{account}/external_accounts`, and its read path adds `/{id}`. The `/account` relationship binds that parent parameter to Stripe's `account` model, which lets the generated `BankAccount` and `Card` declarations accept a `V1Account` entity in `account`. Selecting the read operation and supplying the parent relationship are separate requirements.

Within an application declaration, the following example uses the `StripeResources` service as `stripe`, an already declared `V1Account` entity as `account`, and a Stripe bank-account token as `bankToken`. `Payout.destination` accepts the `bank` entity because Stripe's payout expansion metadata names `bank_account` as an allowed target. The hints make that target available to the relationship compiler.

```ts
const bank = yield* stripe.BankAccount({
  logicalId: "SettlementBank",
  props: {
    account,
    external_account: bankToken,
  },
});

yield* stripe.Payout({
  logicalId: "Settlement",
  props: {
    amount: 1000,
    currency: "usd",
    destination: bank,
  },
});
```

During apply, Nomoss obtains `account.V1AccountId` for the bank-account request's `account` parameter and `bank.BankAccountId` for the payout's `destination`. Later reads need both the bank ID and its owning account ID, so `StripeResourcePolicy` includes the resolved parent parameter as `AccountId` alongside `BankAccountId` from Stripe's response. `ResourceStateStore` saves both outputs. A later bank-account read then supplies `AccountId` as `account` and `BankAccountId` as `id` to address the same account-scoped object.

For another resource, put `relationships` under that resource's provider name. Use each key to identify a creation input and each value to name its permitted component schemas from the provider document. Paths can select operation parameters or body properties, with JSON Pointer escaping and `*` for array items. For example, `/items/*/price` selects the price property of every item. An explicit relationship replaces discovery's choice at that path while preserving the provider's request validation. Discovery currently selects one identity output per resolved target. A relationship needing several request values requires additional mapping support before it can construct the complete request.

Inspect `stripeResourceCatalog` and `stripeUnresolvedResources` after generation when a resource has no callable declaration. The catalog retains `bindingIssues` for missing parent relationships, unresolved input pointers, unusable target identities, and ambiguous operation bindings. Preparation fails with `ResourceSourceInvalid` when the selected creation operation cannot return the configured `responseSchema`, or when the hint has no discovered resource candidate. Generation also rejects duplicate resource type names with ResourceSourceInvalid.

Check the [resource command rules](#execute-resource-commands) before relying on an update or removal operation. Account-scoped payout execution still needs verification against Stripe's sandbox API.

## Compose resource generation

To build a resource catalog in a generation program, provide [resourceCatalogServicesLayer](../codegen/resourceCatalogLayers.ts) with Effect.provide and call [ResourceCatalogs.buildDiscoveredCatalog](../codegen/resourceCatalogs.ts) with the corrected OperationCatalog and reviewed hints. Pass an existing schema graph when several generation steps need the same definitions. Inspect each returned resource's operations for executable bindings and bindingIssues for operations or relationships that still need a selection.

Call buildOpenApiCatalog when you have explicitly selected an OpenAPI resource and need its output fields, saved identity, and operations validated together. Use buildCatalog for a CloudFormation Registry definition or prepared ResourceDefinition. Pass the resulting output metadata to emitCatalog to add it to a TypeScript module.

For a native Effect resource, call buildEffectCatalog with its registered Struct and output selection. It returns the validated metadata in catalog and the selected native schema in outputSchema. Use both values from that result when compiling the resource so its output names and validation come from the same selection.

Use [OpenApiResourceSchemas](../codegen/openApiResourceSchemas.ts) to find the source for a catalog mapping. Call `readOperationSchemas` for an operation's input location, successful response schemas, and named resource models. The property, identity, and relationship queries show which definition supports the mapping or which detail discovery could not establish.

Use [OpenApiResourceBindings](../codegen/openApiResourceBindings.ts) to select a resource's operations and the outputs each request needs. Its Layer provides the methods that discover operations, resolve relationships, and validate mappings. Call `readIdentityParameters` to find the required path and query parameters a read needs after creation.

## Regenerate the clients

Prepare the reference checkout and select the commit recorded in openapi-source.json. The generator checks the specification checksum before it compiles the specification.

```sh
git clone --depth 1 https://github.com/stripe/openapi.git refs/stripe-openapi
git -C refs/stripe-openapi fetch --depth 1 origin 51610f5f061c9723730582a7638b8cc0e646640d
git -C refs/stripe-openapi checkout --detach FETCH_HEAD
yarn generate:stripe-client
```

Run yarn generate:stripe-client to publish the full supported API, including the registered local BillingConfigurationExport contract. For a focused run, call StripeClientGenerator.generate with selected operation IDs and a separate destination directory. That selection restricts discovery and compilation, and publication replaces the destination with the selected output. A focused run can still require many shared model modules because Stripe's error response refers to expanded provider objects.

After regeneration, check that generated clients follow the discovered resource paths. For each resource binding, verify that its imported request and response schemas belong to the intended operation. An incorrect binding changes the contract used to validate a resolved creation request or to address the saved object during a later read.

### Review generated contracts

Check that a shared model or operation contract uses the same name for its type and schema. Effect's `CodeDocument` supplies both expressions and the `Schema.suspend` callbacks for recursive references. If you change normalization or compilation, preserve the provider's descriptions and constraints in both outputs.

Configure modelModules and defaultModelModule in the source manifest to choose which module under generated/models owns each shared schema. For example, paymentMethods.ts groups wallet schemas with the other payment method models. Use clientNames to override a client name for a discovered operation path. These naming and module options apply to the complete discovery result, so review their effect across all generated consumers. Operations sharing a client belong to that client's module. Creation and update keep separate input contracts because they can accept different requests even when their responses use the same model.

Preserve Schema.suspend when a shared model imports another model module or refers to a later declaration in the same file. JavaScript may otherwise evaluate a schema before its declaration has initialized. StripeModuleEmitter and StripeSchemaEmitter defer those shared-model initializers while retaining Effect's compiled schema and public type. Declaration input modules keep their own initialization rules, and schemas used to construct output references retain the concrete Struct fields that those references require.

Preserve the generated names that callers import. The `Stripe` prefix identifies provider models, and `StripeResourceInput` identifies schemas that accept unresolved resource references. Resource registration and lifecycle code import the catalog property and output schemas by their `Schema` names and use the corresponding payload types.

If `StripeResourceInputs` changes, check the declaration and request schemas together. A declaration can contain a compatible resource entity inside an object or array before the provider assigns an ID. Its saved reference must retain the source identity and request mapping so execution can resolve the provider value later. Both schema forms must retain the same `StripeAnnotations` so execution addresses the same resource.

Check output selection alongside those request mappings. Resource bindings must save the provider identity needed for later reads and retain any output whose value the provider returns only at creation. Typed output references let applications declare dependencies on those values before creation. Resolution must obtain the applied value before the dependent request runs.

Keep Biome's regex-literal conversion disabled in generated schema modules. Effect emits RegExp expressions from provider patterns, and that conversion can produce invalid syntax from their escapes.

### Inspect generated candidates

To inspect a declaration schema before publication, run the input compiler below with a resource type from the published catalog. The compiler uses the pinned provider document, resolves imports, and writes candidates under `.nomoss/stripe-entity-feedback/Stripe/Billing` in a directory named for the resource. It leaves `src` unchanged and skips formatting. Use `NOMOSS_RESOURCE_TYPE='*'` to compile all declaration inputs into `.nomoss/stripe-entity-feedback/all`. Use a separate directory for each compilation because each run assigns its own shared schema names.

```sh
timeout -k 1s 15s nice -n 10 env NODE_OPTIONS='--max-old-space-size=512 --v8-pool-size=1' UV_THREADPOOL_SIZE=1 GOMAXPROCS=1 NOMOSS_RESOURCE_TYPE='Stripe::Billing::Price' node --import tsx tools/compileStripeResourceInputs.ts
```

To inspect generated command registrations, run the command below. It reads the pinned provider source and published resource catalog, then uses the production operation bindings and emitter to write .nomoss/stripe-command-feedback/resourceCommands.ts. Existing operation clients and schemas remain unchanged.

```sh
timeout -k 1s 15s nice -n 10 env NODE_OPTIONS='--max-old-space-size=512 --v8-pool-size=1' UV_THREADPOOL_SIZE=1 GOMAXPROCS=1 node --import tsx tools/compileStripeResourceCommands.ts
```

When output construction or declaration registration changes, run the declaration compiler to refresh resource factories and resourceDeclarations.ts from the published catalog. StripeResourceDeclarationCompiler uses the production AST emitters to prepare candidates, and TypeScriptModulePublisher formats and validates the complete set before replacing any destination. A validation failure preserves existing files. A filesystem failure during publication can leave a partially written batch. Existing operation clients, schemas, command registrations, and unrelated files remain in place.

```sh
yarn exec tsx tools/compileStripeResourceDeclarations.ts
```

### Validate the generated output

After you change emission, run the compiler, lint check, and tests below. The iteration configuration uses the project compiler options and production imports. Compile the full project if the change affects application callers or their service graph. Check the generator source under the [lint procedure](../../docs/development/linting.md).

```sh
yarn exec effect-tsgo tsc --project tools/stripe/tsconfig.iteration.json --pretty false
yarn exec biome check src/providers/stripe/client/generated --error-on-warnings --reporter=summary
yarn exec vitest run tests/stripe/stripeClientGenerator.test.ts --pool forks
```

Review the generated client and catalogs, then test provider behavior separately with `yarn test:integration:stripe` and a sandbox key supplied through STRIPE_API_KEY. The [testing instructions](../../docs/development/testing.md#test-stripe-workflows) describe the workflows, credential permissions, and cleanup.

Review catalog.ts for operation metadata in source order and resourceCatalog.ts for discovered and local resources. Look resources up by their full type names so v1 and v2 resources with the same short name remain distinct. Inspect each entry's unresolved issues before expecting it to provide a callable declaration.

Use Effect's `CodeDocument` and ts-morph to emit TypeScript. Combine imports into one declaration per module and preserve the constructors and request `Struct` fields that resource declarations need. Publish to a directory reserved for replaceable artifacts. The generator formats candidates before it removes the existing directory. It then writes the generated modules and copies Stripe's license. If the formatter fails, the existing output stays in place. A filesystem failure after replacement begins can leave an incomplete client.

## Execute resource commands

Check the catalog entry for the lifecycle operations the resource supports. Creation and reads can be available while update or removal remains unresolved. If the stack requests an operation without a definition, it returns `ResourceCommandUnsupported` before it calls Stripe and preserves saved state. The [resource management development guide](../../docs/development/effect-native-development.md#develop-resource-management) defines how to extend the lifecycle.

The current generated update path uses the read identity mapping. `StripeResourcePolicy` returns `ResourceCommandUnsupported` if the update schema would discard a changed property or if the declaration drops a saved property without a reset rule. A supported Coupon name change retains its `CouponId`. If the declaration changes `percent_off`, the update fails before mutation and preserves applied state.

To remove a resource through POST, set `removeOperation` and `removeValues` in [openapi-source.json](openapi-source.json), then run `yarn generate:stripe-client`. For Product, `PostProductsId` with `active: false` deactivates the saved product. `StripeResourcePolicy.destroy` validates the configured values and saved identity before it sends the request. A successful removal clears saved ownership. A rejected request retains it for retry.

Use removeValues only for constants accepted by the chosen removal request. Generated registrations include a TypeScript satisfies check against the operation's input type, and generation rejects values that would override a saved identity parameter. Discovery selects DELETE automatically, so choose a POST operation explicitly when removal means deactivation.

Set deletedResponseMeansMissing to true in a resource hint when a successful read can return a deleted object. Customer uses this rule for Stripe's deleted-customer response. The shared policy validates the response and checks its identity against saved outputs before it reports absence. A rejected read, invalid response, or different identity preserves saved ownership.

Resource commands report ResourceCommandExecutionFailed with the failed command and its resource metadata. The cause retains the provider operation, HTTP status, and decoded error details. Validation failures retain their schema error. A failed mutation preserves saved state so the application can retry the operation.

### Plan replacement and recover failures

Set `replacement.order` from the resource's creation and removal rules. Price uses `destroyBeforeCreate` because the old price must release its lookup key before its successor can claim it. Its removal values set `active: false` and clear `lookup_key`. WebhookEndpoint uses `createBeforeDestroy` when `rotationKey` changes. Nomoss saves the new webhook ID and secret before it removes the old webhook.

Set `replacement.properties` to the declaration paths that require that sequence, such as `[["rotationKey"]]` for webhook rotation. If the hint has no paths, any change to the resolved declaration requires replacement. After you change the hints, regenerate the client and inspect the order of operations in the plan's `Replace` action before you apply it.

Use ResourceStackLifecycle.applyPlan for an application command that must execute the complete reviewed plan. It validates the captured state before mutation, resolves dependency values as resources apply, and publishes the final applied outputs.

When authoring a lifecycle composition, pass the reviewed action's operations to ResourceStackLifecycle.applyActions with the plan's desired graph and stack name. Keep each node's generation, which distinguishes its provider instance from other instances of the same logical resource. The method uses the same applyAction API as individual changes and returns the resulting provider nodes in operation order. A completed creation can be reused only for the same resolved properties.

If a replacement fails, retry with the same desired properties so the next plan can finish its remaining operations. For example, when webhook creation succeeds and old-object removal fails, saved state retains the new ID and signing secret for retry. Each provider generation has an ordinary lifecycle record, and completed removals remain recorded until the composition finishes. Recovery can therefore skip completed provider work while application outputs retain the last applied instance until its successor is committed.

Use teardown to remove the objects that an unfinished operation still owns. The plan can resume if a removal fails. If you change desired properties before an operation finishes, or ask to reconcile several saved instances as one applied resource, the stack returns `ResourceOperationInProgress`. Complete apply or teardown before you retry.

### Declare resources and supply provider services

Pass resource entities directly into generated relationship properties when declaring an application. For example, Price accepts product in props, and portal subscription settings accept products: [{ product, prices: [price] }]. Provider expansion metadata and source corrections determine which resource types each input accepts. Nomoss validates the relationship, records its dependency, and obtains the applied source outputs before the generated client validates and sends the request. Read known outputs through typed properties such as price.PriceId. Property access performs no I/O. Keep declarations and lifecycle services in the same Layer graph so they use the same registered schemas and applied values. The [generation architecture](../../docs/application/generation-architecture.md) and [resource mapping specification](../../docs/application/resource-mapping.md) define those contracts.

Provider hints configure request preparation and lifecycle choices. Webhook URL credentials and rotation, Price replacement, and Customer's deleted-response rule use generated configuration. Shared services execute those rules from metadata.

The [local source configuration](local-resource-source.json) defines the export's document contract. To change the file's contents, define the properties and their constraints under `input`, then select the properties to publish under `document`. The resource uses the output path to locate the file. That path stays outside the document selection. Each `references` entry identifies a document field that accepts another resource's entity and the applied output that supplies its value. After you change the contract, run `yarn generate:stripe-client` so the declarations, commands, and file reads use the same validators.

Call `BillingConfigurationExport` with `logicalId` and `props`. Pass any related resource entities in `props`, as in the [billing export test fixture](../../tests/support/stripeBillingFixture.ts). Apply resolves those dependencies before the file service validates and publishes the data. `OutputPath` identifies the file that the stack owns. Reconcile checks its contents against the document contract. The stack can recreate an absent file. If the contents are invalid or unreadable, reconcile stops and retains ownership. Teardown removes the file at the saved path. If `outputPath` changes, replacement removes the previous file before the stack publishes at the new path.

To manage a resource in a stack, declare it through StripeResources and let the shared lifecycle services execute its generated configuration. Resource-specific behavior belongs in that generated configuration. Shared execution must interpret its rules through generic operations.

For direct provider calls, supply StripeClient through the application's Layer graph. Generated resource clients provide creation, saved-identity reads, and selected updates. Generated operation clients expose the other provider requests, including PostV2CoreAccountsIdClose for Account closure. Each operation uses the API version associated with its generated schemas. Supply the redacted API key and optional service address through StripeClientConfig and transport through HttpClient. The live configuration reads STRIPE_API_KEY.

Check that `StripeClient` validates input before it serializes the request. Confirm that the response and default error schemas match the selected operation. V1 requests use forms with bracket paths, and v2 requests use JSON bodies. Path identifiers remain separate from body and query properties. Use the shared Stripe fixture to exercise production calls with native request capture and queued responses. If a call fails, inspect the operation, HTTP status, request ID, message, and decoded provider details in `StripeApiError`.

Call reconcile with a prepared stack to refresh saved provider observations. A deleted-customer response or HTTP 404 reports absence. Other read failures retain saved state for retry. When Stripe omits WebhookSigningSecret from a read, Nomoss retains its saved value so the application can continue verifying signatures. The filesystem lifecycle validates configuration exports through their canonical document schema during the same workflow. The sandbox integration coverage verifies present resources and a customer deleted directly in Stripe.
