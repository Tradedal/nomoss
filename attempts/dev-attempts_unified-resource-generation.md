# Resource API maturity and stability

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Known provider values must remain ordinary typed resource data maintained by lifecycle operations. Catalog-wide provider management and compatibility remain unfinished.

## Direction

Resource declarations remain composable Effects. Applications pass related resource entities in properties and read applied provider values as ordinary typed properties. Lifecycle operations restore and publish those values through shared state. Property access performs no persistence I/O.

Relationship inputs must validate the allowed resource types. Provider metadata defines which applied values supply each request. Preserve relationships across providers, inside objects and arrays, and when a request needs several source values.

Preserve saved output names, resource and dispatch identities, canonical schemas, and supported lifecycle behavior. Unsupported operations must fail before mutation. General import and credential replacement remain separate work.

Declarations, execution, and output consumers must share one Layer graph and ResourceModel. Let service composition infer errors and dependencies, and correct type errors in that composition. Follow the [Effect development contract](../docs/development/effect-native-development.md) for service APIs and lifetimes.

Generate from the complete corrected provider source. Determine resource support from source contracts and reviewed annotations. Use native Effect schema compilation and TypeScript AST emission, preserving CodeDocument.Type and CodeDocument.runtime. AWS operations use generated Smithy contracts through the internal client, with Cloud Control managing Registry resources.

Run one bounded generation process at a time. Prepare input candidates outside src before replacing published inputs, and compile the complete entity input set together because it shares schema names. Regenerate command registration separately when needed. Keep full client generation outside the iteration loop.

Keep deleted APIs absent. Preserve DESIGN_Q and REVIEW_Q annotations under their existing review conditions.

## Completed work

- [x] Stripe declarations connect products, prices, and nested portal settings, and customers can use test clocks from the same stack. Nomoss orders prerequisites and resolves their applied IDs before dependent requests.

- [x] Stripe resources and the six existing AWS declarations expose typed applied values. Preparing a stack restores its own saved outputs. Replacement publishes new values, failed updates retain the last applied values, and removal clears them. Webhook signing secrets survive reconciliation because creation saves the values Stripe omits from later reads.

- [x] Billing applications export product, price, portal, and webhook IDs after apply. Teardown removes the generated file. Coupons retain identity across name changes and are deleted when removed from declarations. Teardown saves each successful removal so retries handle only resources still recorded as managed.

## Tasks

### AWS resources

- [ ] Implement removal through application changes. When an author removes an AWS resource from a declaration, Nomoss must delete it and save the result. AwsCloudControlResourceCommandMetadata.execute currently rejects the planned Delete action. The [AWS lifecycle tracker](dev-attempts_aws-resource-lifecycle-generator.md#tasks) owns the deletion change and a related polling change: AwsCloudControlResourceLifecycle must pass the initial mutation event to AwsCloudControlRequestTracker so a terminal result requires no extra status request. Preserve the existing deletion, polling, and interruption contracts.

- [ ] AwsResourceTypeScript must generate entity inputs for AWS relationships from reviewed provider metadata. AWS application consumers still lack the source-derived entity declarations required by the shared resource contract. Deliver those declarations through the existing generator and core graph while preserving canonical Registry validation, Cloud Control identity, and ordinary output APIs.

### Stripe resources

- [ ] ResourceCatalogs and StripeResourceInputs leave relationships without resolved targets as scalar inputs, and generated mappings currently select one saved output. Applications cannot rely on every relationship property to validate entity types or obtain all required request values. Retain source evidence and a concrete unresolved issue for every affected relationship, supply reviewed declarative semantics where the source is insufficient, and generate the allowed entities and complete request mapping. Keep unresolved relationships separate from unsupported lifecycle operations. The [resource mapping tracker](dev-attempts_resource-mapping.md) owns source-resolution defects.

- [ ] ResourceCatalogs.resolveOpenApiResourceMutation still assumes POST, PUT, or PATCH updates, DELETE removal, string identity parameters, a matching resource response for updates, and no required removal body. Automatic selection uses the read operation, and replacement properties require a createOnlyProperties hint. Generated resource consumers cannot treat these unverified restrictions as provider semantics. Review the complete corrected source, retain a concrete reason for each unresolved entry, and derive executable operations from that source or reviewed annotations.

- [ ] ResourceCatalogs and generated resource policies cannot yet manage all parent identities, reads with several identifiers, fixed removal body values, or deactivation and custom retirement policies. Nested resource consumers lack complete saved-identity bindings, and generated registration currently requires executable removal. Resolve the source identities and select reviewed Effect policies through the existing command contract. StripeResourcePolicy must define property removal, replacement order, and updates whose identity parameters differ from reads before it accepts those changes.

### Drift detection

- [ ] ResourceModel lacks a canonical projection of observed managed properties for ResourcePlanner to compare with declarations. Stack consumers cannot yet obtain the required drift decisions for defaults, read-only and write-only properties, or retained secrets. Define that projection through canonical schemas and connect it to update and replacement decisions. ResourceStackLifecycle and StripeClient must retain the provider progress, idempotency, retry, and cleanup behavior needed to resume failed execution without losing accepted identities or dependent relationships.

### Deployment recovery (low priority)

- [ ] Recover a Stripe deployment when price replacement succeeds and a dependent resource fails. Resumption must use the replacement price in nested portal settings and exported application IDs, preserve recoverable state, and avoid creating the successful replacement again. Core recovery resolves replacement identities; this behavior remains unestablished through production Stripe declarations in StripeExampleApps and ResourceStackLifecycle.

- [ ] Resume interrupted deployments after restarting Nomoss with saved relationships, provider identities, output names, request mappings, and retained secrets intact. Current saved-dependent recovery leaves compatibility across runtime restarts and generated-contract changes unresolved in ResourceModel, ResourceGraphBuilder, ResourceStackLifecycle, and ResourceStateStore. Use canonical state and schema registration for compatibility fixes; changes that require migration need an explicit decision.

### Provider clients and generation

- [ ] StripeOperationBindings and StripeClient combine request locations and require JSON response bodies, leaving some discovered operations unusable by generated resource consumers. Preserve modeled locations, encodings, optional bodies, and empty responses through generated contracts and execution. The [shared client tracker](dev-attempts_shared-client-generator.md) owns transport implementation; catalog entries must retain their concrete execution limits until those operations work.

- [ ] StripeModulePublisher does not yet guarantee that failed publication preserves the previous complete output. Applications and generators need an intact set of imports and schemas after a failure. Make publication preserve the prior complete module set when preparation or publication fails, without requiring manual repair of generated artifacts.
