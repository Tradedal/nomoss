# Resource API maturity and stability

## Problem

Known provider values must remain ordinary typed resource data maintained by lifecycle operations. Catalog-wide provider management and compatibility remain unfinished.

## Rules / constraints

Resource declarations remain composable Effects. Applications pass related resource entities in properties and read applied provider values as ordinary typed properties. Lifecycle operations restore and publish those values through shared state. Property access performs no persistence I/O.

Relationship inputs must validate the allowed resource types. Provider metadata defines which applied values supply each request. Preserve relationships across providers, inside objects and arrays, and when a request needs several source values.

Preserve saved output names, resource and dispatch identities, canonical schemas, and supported lifecycle behavior. Unsupported operations must fail before mutation. General import and credential replacement remain separate work.

Declarations, execution, and output consumers must share one Layer graph and ResourceModel. Let service composition infer errors and dependencies, and correct type errors in that composition. Follow the [Effect development contract](../docs/development/effect-native-development.md) for service APIs and lifetimes.

Generate from the complete corrected provider source. Determine resource support from source contracts and reviewed annotations. Use native Effect schema compilation and TypeScript AST emission, preserving CodeDocument.Type and CodeDocument.runtime. AWS operations use generated Smithy contracts through the internal client, with Cloud Control managing Registry resources.

Run one bounded generation process at a time. Prepare input candidates outside src before replacing published inputs, and compile the complete entity input set together because it shares schema names. Regenerate command registration separately when needed. Keep full client generation outside the iteration loop.

Keep deleted APIs absent. Retain CLEANUP_Q [resource-entities] annotations until their assigned behavior works, and preserve DESIGN_Q and REVIEW_Q annotations under their existing review conditions.

## Working features

### Linked Stripe billing resources

A Stripe billing declaration can connect products to prices and include both in a billing portal's subscription settings. Authors pass declared resources in those properties, including nested settings. Nomoss creates prerequisites first and supplies their assigned IDs to dependent requests.

### Applied resource values

Applications can read provider IDs, URLs, and other applied values through typed properties on Stripe resources and the six existing AWS declarations. Preparing a stack restores its saved values. Replacement updates those properties, failed updates preserve the last applied values, and removal makes them unavailable. Each stack retains its own outputs.

### Billing configuration export

A billing application can export its product, price, portal, and webhook IDs to a configuration file. The export refers to declared resources and writes their IDs after apply. Nomoss removes the file during stack teardown.

### Webhook signing secrets

Applications retain access to a webhook's signing secret after reconciliation and updates. Nomoss saves the secret returned at creation because Stripe omits it from later reads.

### Stripe test clocks

A Stripe customer can use a test clock declared in the same stack.

### Coupon updates and removal

A coupon's name can change through its declaration while keeping its existing identity. Removing the coupon from the declaration deletes its Stripe object and saved state.

### Teardown recovery

After a teardown fails, the next attempt deletes only the resources still recorded as managed. Nomoss saves each successful removal as it happens, so a later failure preserves that progress.

## Remaining

### AWS resources

- [ ] Implement removal through application changes. When an author removes an AWS resource from a declaration, Nomoss must delete it and save the result. AwsCloudControlResourceCommandMetadata.execute currently rejects the planned Delete action. The [AWS lifecycle tracker](dev-attempts_aws-resource-lifecycle-generator.md#remaining) owns the deletion change and a related polling change: AwsCloudControlResourceLifecycle must pass the initial mutation event to AwsCloudControlRequestTracker so a terminal result requires no extra status request. Preserve the existing deletion, polling, and interruption contracts.

- [ ] AwsResourceTypeScript must generate entity inputs for AWS relationships from reviewed provider metadata. AWS application consumers still lack the source-derived entity declarations required by the shared resource contract. Deliver those declarations through the existing generator and core graph while preserving canonical Registry validation, Cloud Control identity, and ordinary output APIs.

### Stripe resources

- [ ] ResourceCatalogs and StripeResourceInputs leave relationships without resolved targets as scalar inputs, and generated mappings currently select one saved output. Applications cannot rely on every relationship property to validate entity types or obtain all required request values. Retain source evidence and a concrete unresolved issue for every affected relationship, supply reviewed declarative semantics where the source is insufficient, and generate the allowed entities and complete request mapping. Keep unresolved relationships separate from unsupported lifecycle operations. The [resource mapping tracker](dev-attempts_resource-mapping.md) owns source-resolution defects.

- [ ] ResourceCatalogs.resolveOpenApiResourceMutation still assumes POST, PUT, or PATCH updates, DELETE removal, string identity parameters, a matching resource response for updates, and no required removal body. Automatic selection uses the read endpoint, and replacement properties require a createOnlyProperties hint. Generated resource consumers cannot treat these unverified restrictions as provider semantics. Review the complete corrected source, retain a concrete reason for each unresolved entry, and derive executable operations from that source or reviewed annotations.

- [ ] ResourceCatalogs and generated resource policies cannot yet manage all parent identities, reads with several identifiers, fixed removal body values, or deactivation and custom retirement policies. Nested resource consumers lack complete saved-identity bindings, and generated registration currently requires executable removal. Resolve the source identities and select reviewed Effect policies through the existing command contract. StripeResourcePolicy must define property removal, replacement order, and updates whose identity parameters differ from reads before it accepts those changes.

### Drift detection

- [ ] ResourceModel lacks a canonical projection of observed managed properties for ResourcePlanner to compare with declarations. Stack consumers cannot yet obtain the required drift decisions for defaults, read-only and write-only properties, or retained secrets. Define that projection through canonical schemas and connect it to update and replacement decisions. ResourceStackLifecycle and StripeClient must retain the provider progress, idempotency, retry, and cleanup behavior needed to resume failed execution without losing accepted identities or dependent relationships.

### Deployment recovery (low priority)

- [ ] Low priority: Recover a Stripe deployment when price replacement succeeds and a dependent resource fails. Resumption must use the replacement price in nested portal settings and exported application IDs, preserve recoverable state, and avoid creating the successful replacement again. Core recovery resolves replacement identities; this behavior remains unestablished through production Stripe declarations in StripeExampleApps and ResourceStackLifecycle.

- [ ] Low priority: Resume interrupted deployments after restarting Nomoss with saved relationships, provider identities, output names, request mappings, and retained secrets intact. Current saved-dependent recovery leaves compatibility across runtime restarts and generated-contract changes unresolved in ResourceModel, ResourceGraphBuilder, ResourceStackLifecycle, and ResourceStateStore. Use canonical state and schema registration for compatibility fixes; changes that require migration need an explicit decision.

### Provider clients and generation

- [ ] StripeOperationBindings and StripeClient combine request locations and require JSON response bodies, leaving some discovered operations unusable by generated resource consumers. Preserve modeled locations, encodings, optional bodies, and empty responses through generated contracts and execution. The [shared client tracker](dev-attempts_shared-client-generator.md) owns transport implementation; catalog entries must retain their concrete execution limits until those operations work.

- [ ] StripeModulePublisher does not yet guarantee that failed publication preserves the previous complete output. Applications and generators need an intact set of imports and schemas after a failure. Make publication preserve the prior complete module set when preparation or publication fails, without requiring manual repair of generated artifacts.
