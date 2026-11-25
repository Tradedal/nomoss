# AWS client and resource lifecycle generation

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

AwsClient and AwsClientConfig still depend on prohibited AWS packages to resolve credentials and service addresses, and AwsServiceDefinition exposes an external rules type. Native Effect services must support the same execution contexts before those dependencies are removed.

## Direction

The declaration changes cover the six existing generated AWS resources, native Effect types and schema exports, and the upload event workflow. Preserve canonical output names and keep deleted core symbols absent. Credential, address resolution, and provider lifecycle changes retain their separate scope.
Follow the [AWS contract](../docs/application/aws-resource-lifecycle-management.md) and development-process guides. Keep Cloud Control's POST / route and X-Amz-Target selection in separate versioned OpenAPI documents. Smithy's official converter and protocol extension must preserve execution traits. Required upstream sources stay in refs. Generate TypeScript through AST operations and compile schemas through native Effect APIs.

The signer may depend on @smithy/signature-v4, @smithy/core checksum support, @smithy/types, and tslib. Their imports must remain inside the signer, whose public API must expose Nomoss domain contracts. The remaining work must replace @aws-sdk/core, @aws-sdk/credential-provider-node, and generated service packages.

Keep the work in the existing checkout. Infer Effect channels from the service graph and use canonical validators and the shared AWS fixture. The [CLI tracker](dev-attempts_cli-live-progress.md) owns command progress.

## Completed work

- [x] AwsResourceTypeScript exports schema-derived types and ordinary applied outputs for all six declarations, including empty output schemas and quoted properties. The upload event example uses those outputs for queue URLs and ARNs. ResourceStackLifecycle restores saved Cloud Control identifiers and retains them through updates.

- [x] Smithy's official converter and the AWS JSON 1.0 extension publish eight Cloud Control OpenAPI 3.1 operation documents. The generator verifies pinned downloads with Effect, preserves modeled errors and retry metadata, and emits validated AST-based TypeScript with shared error sets and separate HTTP and operation contracts.

- [x] The shared AWS runtime prepares and signs requests, decodes modeled failures, and retries the same payload with fresh credential resolution on each attempt. Generated bindings and the AWS command registrations use the same Cloud Control Layer in production and fixtures. AWS registration loads independently of Stripe.

## Tasks

- [ ] AwsCloudControlResourceCommandMetadata.execute rejects the planned Delete action for a resource removed from the declaration. It must dispatch that action to provider deletion and update saved state after success so an application can remove a resource through its declaration. The separate explicit Destroy path must remain available.
- [ ] AwsCloudControlResourceLifecycle discards the initial mutation ProgressEvent except for its token, so AwsCloudControlRequestTracker always requests status again. The lifecycle must pass that event to the tracker, and the tracker must return terminal outcomes without another status request. For pending requests, it must retain the five-second interval and follow the [Cloud Control progress contract](https://docs.aws.amazon.com/cloudcontrolapi/latest/APIReference/API_ProgressEvent.html).
- [ ] AwsClientConfig.resolveCredentials and resolveConfiguration still use external providers. Native Effect services must replace them and preserve supported authentication and credential refresh for their callers. Generate the required authentication calls through Smithy before you remove the external configuration and credential imports.
- [ ] AwsClient.createHttpClient uses @aws-sdk/core to resolve service addresses, and AwsServiceDefinition exposes RuleSetObject. Generation must produce canonical address metadata, and public services must resolve it with the supported region, partition, FIPS, dual-stack, and custom-address behavior. Remove the external resolver and metadata type after their consumers use those native services.
- [ ] Projen, the package manifest, and the lockfile still declare prohibited runtime packages and unused @aws-crypto/sha256-js. Remove each dependency through repository tooling after its consumer has a native replacement. Only the permitted signature dependencies may remain, and their imports must stay within the signer.
- [ ] ResourceStackLifecycle has no explicit import operation for an application that adopts an existing object. Define the adoption contract so the application can supply a Cloud Control Identifier and the lifecycle can use it to read that object. Ordinary reconciliation must continue to use saved identity.
