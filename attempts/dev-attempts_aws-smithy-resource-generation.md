# AWS resource generation from Smithy and CloudFormation definitions

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Generate native AWS declarations and lifecycle operations from CloudFormation Registry definitions and Smithy models. Start with SQS Queue and the existing S3, SNS, and KMS declarations. Use the shared core for dependencies, planning, saved state, replacement, and recovery. Cloud Control implementation and live runs remain on hold.

The Queue batch covers settings, saved identity, tags, propagation, and confirmed removal. KMS output selection and notification delivery follow separately. HTTP echo must deploy declared resources and code using ordinary provider configuration. IAM work covers reusable policies and assignments for roles, users, and groups, with revocation limited to Nomoss-owned assignments. [IAM manifest](../tools/awsServiceResources/sources/resources.json)

## Direction

CloudFormation supplies property and identity rules. Smithy supplies operation contracts and execution traits. Record the source for each mapping. Use existing metadata APIs and reviewed configuration for choices the sources cannot express.

Reuse the Effect Layer graph, native schema compilation, and AST emission. Verify source checksums and expected values before corrections. Reject invalid schemas and unresolved lifecycle mappings before publishing affected operations. Preserve import diagnostics beside their definitions.

## Completed work

- [x] Pinned Registry definitions and the official Smithy converter supply generated declarations for SQS Queue, S3 Bucket, SNS Topic, and KMS Key and 23 SQS operation contracts. The shared AWS runtime executes those contracts and handles modeled empty responses. Declarations validate resolved inputs against original Registry schemas, generate replacement rules, and retain ambiguous output choices as relationship issues. [Generation guide](../tools/awsServiceResources/README.md)

- [x] The retired native Queue lifecycle used a generated mapping for `QueueUrl`, `Arn`, attributes, tags, operation roles, and reset values. It preserved identity across updates, restored omitted attributes to configured defaults, cleared removed policies, and waited for propagation. Live stack coverage confirmed both declaration removal and explicit teardown release ownership after provider absence. [SQS manifest](../tools/awsServiceResources/sources/sqs.json) · [Live workflow](../tests/awsServiceResources.integration.test.ts)

- [x] Native and Cloud Control declarations have distinct public import paths. AWS and Stripe share entity emission and AST helpers. Generated contracts and their bindings resolve imports from their publication paths. [Shared declaration emission](../tools/codegen/resourceDeclarations.ts)

- [x] The earlier native API Gateway and Lambda registrations deployed HTTP echo. `Asset.fromPath` and `Asset.fromBuild` prepare files, directories, and source builds. Planning retains reproducible ZIP bytes by SHA-256, and apply deploys those bytes even if source changes after planning. Lambda updates configuration before code, waits for readiness, and verifies the deployed hash. Direct uploads reject ZIPs larger than 50 MiB before mutation. [Asset service](../src/core/asset.ts)

- [x] The CLI runs help, version, dependencies, and saved-state inspection without AWS credentials. Diff prepares assets locally. Create and update apply the planned artifact, reconcile reads saved resources, and delete uses saved identity even when declaration loading fails. Live queue and echo workflows established command errors, unchanged plans, updates at the same identity, and teardown with unreadable source. [CLI workflow](../docs/application/cli-workflow.md)

- [x] Stack removal follows saved dependencies. Removing the echo resources preserved the health route. Independent actions finish after typed failures so rollback can remove accepted resources from their recorded identities. Live rollback removed the API after both Lambda creations failed. [Stack lifecycle](../src/core/stack/resourceStackLifecycle.ts)

- [x] The IAM Smithy generator preserves AWS Query wire shapes and global signing configuration. The shared client uses SDK Query serialization and XML decoding. [IAM manifest](../tools/awsServiceResources/sources/iam.json)

- [x] Live tests of the earlier permission implementation scoped invocation to the declared API Gateway route, role, or EventBridge rule. Revocation preserved unrelated permissions. The generated IAM registration still needs the grants used by Lambda. [IAM workload tracker](dev-attempts_aws-iam-workload.md)

- [x] The state machine example declares its execution role and tears both resources down through the graph. Generated JSON RPC contracts with no output members accept an empty reply or an empty JSON object. [State machine example](../examples/state-machine/application.ts) · [Pinned protocol](../refs/smithy/docs/source-2.0/aws/protocols/aws-json.rst.template)

## Tasks

### Cleanup before the next native AWS registration

The native SQS registration was removed because the attribute-map path embedded SQS rules in shared code and ran a separate lifecycle. The existing native stack tests are disabled pending a generated registration. [SQS workflow](../tests/awsServiceResources.integration.test.ts)

- [ ] Make the staged AWS changes build on their own. The staged snapshot produced 51 compiler errors. Its runtime imports lifecycle services that exist only in the working tree, its generated command registry includes only SQS, and its generator and parser disagree with their consumers about `renderPolicies` and `memberNames`. Verify the intended registrations against the manifest, then run `effect-tsgo tsc --build . --force` on a fresh export of the index. The staged build must finish with zero errors or warnings using only the source and dependency records in that export.

- [ ] Resolve the Effect compiler suggestions in the changed AWS code. The working tree compiles, but Lambda's update and the shared AWS mapping and policy services pass already-typed values to unknown-input decoders. Use the typed decoder where the input satisfies the schema and keep validation where provider data enters the application. Rerun the project compiler and check the diagnostics for the changed files. [Lint and compiler guidance](../docs/development/linting.md)

- [ ] Remove the manual channels from `retryPropagation`. Biome flags its `Effect.Effect<A, E, R>` parameter in `resourceStabilization.ts`. Compose the native retry operation with the shared timing policy. Verify that Lambda retries the role propagation failure within the configured window and that other failures reach the caller. Include the lint rule's Yarn patch with the dependency records and confirm that a fresh install passes the same check. [Stabilization service](../src/core/resource/resourceStabilization.ts)

- [ ] Trace the four `useLiteralKeys` findings in the generated API Gateway route to the expression that emits those keys. Correct the generator, regenerate the route, and verify that changing its target keeps the same route ID. Rerun `yarn lint` and report the separate warning in the Stripe emitter if it persists. [Generated route](../providers/aws/generated/resources/apigatewayv2/route.ts) · [Route update test](../tests/aws/apiGatewayRoute.integration.test.ts)

- [ ] Review the IAM, Lambda, and API Gateway registrations together. Trace create, update, and removal through the generated command registry. Where registrations repeat the same sequence, put it in the existing lifecycle, version, or stabilization service and supply its dependencies through Layers. Keep AWS-specific choices visible at the registration, including which IAM versions may be retired and when Lambda can accept a code update. Verify that managed policy updates retain the ARN, Lambda waits for configuration before it changes code, and a route update preserves unrelated routes. [Shared lifecycle](../src/core/resource/resourceLifecycle.ts) · [AWS runtime](../providers/aws/runtime.ts)

### AWS resource creation recovery

- [ ] Preserve ownership when AWS accepts creation before Nomoss saves a validated result. A failed readiness read can leave a creation record without the provider ID that AWS already returned. Save that identity before waiting for readiness. A process exit before the response arrives requires a separate recovery rule. For example, the pinned API Gateway model defines an AWS-assigned integration ID and supplies neither a caller token nor tags on `CreateIntegration`. Define what evidence identifies the created object and what a retry does when ownership remains uncertain. Verify that a later command can recover or remove the same object while preserving unrelated objects and avoiding duplicate creation. [API Gateway Smithy model](../refs/aws-api-models/models/apigatewayv2/service/2018-11-29/apigatewayv2-2018-11-29.json) · [Current AWS registration](../providers/aws/management/resourceLifecycleRegistration.ts) · [Lifecycle recovery contract](../docs/application/resource-lifecycle-tracker.md)

### IAM policies and grants

- [ ] Provide `addManagedPolicy(policy)` and `attachInlinePolicy(policy)` on role, user, and group declarations, and a method to declare group membership. Let applications attach a managed policy by entity or ARN and attach an inline policy with multiple statements as one unit. Save the identities of the assigned objects so revocation preserves unrelated policies and memberships, even after a name has been reused. Each assignment must authorize its own actions and remain independent when the other is removed. Retries must recover partial assignment updates. [IAM declaration manifest](../tools/awsServiceResources/sources/resources.json)

- [ ] Add queue `grantSendMessages` and `grantConsumeMessages`, and topic `grantPublish`. Each grant must authorize its named action on the selected queue or topic. Revocation must deny that access and preserve unrelated permissions. Support the key permissions required for encrypted queues and topics, and define when a sender needs permission on the destination's resource policy. [Resource graph](../docs/application/resource-graph.md)

- [ ] Add bucket `grantRead`, `grantPut`, and `grantDelete` methods that accept a key pattern, and key `grantEncrypt`, `grantDecrypt`, and `grantEncryptDecrypt` methods. Each bucket grant must authorize its own action only for matching keys. Encrypted bucket operations must require the corresponding KMS grant and fail when that grant is removed. [Resource graph](../docs/application/resource-graph.md)

- [ ] Add state machine `grantStartExecution` and `grantStartSyncExecution`. Each grant must authorize its named operation on the selected state machine. Synchronous execution applies to an Express workflow. Removing the grant must revoke access.

- [ ] Register user, group, and instance profile lifecycles. Verify membership changes and role replacement in an instance profile without deleting unrelated principals. Define the scope for federation providers, service-linked roles, and credentials separately because AWS gives them different creation and recovery contracts. Login passwords, private keys, and access key secrets must follow the existing secret handling rules before credential resources can be managed. [Lifecycle secret handling](../docs/application/resource-lifecycle-tracker.md#secrets-across-runs)

### Encryption and notification delivery

- [ ] Resolve the KMS entity output selection for SQS KmsMasterKeyId and S3 bucket encryption, where metadata permits both Arn and KeyId. Establish forward queue-policy and topic-policy relationships from the Registry definitions, including the reverse records currently attached to QueueUrl and TopicArn. Application declarations must resolve the selected values and reject unsupported nested create-only paths.

- [ ] Deliver S3 notifications and SNS subscriptions through generated resources with the required queue and KMS permissions. The stack must grant permission before configuring delivery and remove it after removing the notifications. Configured destinations must receive events. Include object-expiration updates and an explicit policy for removing the contents of a bucket during teardown. [Resource lifecycle requirements](../docs/application/resource-operations.md)

## References

| Source | Role in this scope |
|---|---|
| [Generation architecture](../docs/application/generation-architecture.md) | Defines how shared generation produces resource and operation contracts. |
| [Resource lifecycle operations](../docs/application/resource-operations.md) and [resource graph contract](../docs/application/resource-graph.md) | Govern dependencies, validation, saved identity, replacement, and recovery through core. |
| [AWS resource contract](../docs/application/aws-resource-lifecycle-management.md) | Supplies requirements for canonical AWS schemas, internal request execution, and application service composition. This track adds native service API resource management. |
| [Current AWS resource generation](../tools/awsResources/README.md) and [current Smithy conversion](../tools/awsCloudControl/README.md) | Describe the Registry compiler and Smithy converter already used by the generators. |
| [AWS API models](../refs/aws-api-models/README.md) | Locates the Smithy JSON models for AWS service operations. |
| [CloudFormation resource schema](../refs/cloudformation-resource-schema/README.md) | Defines the resource semantics carried by Registry definitions. |
| [Resource source manifest](../tools/awsServiceResources/sources/resources.json) | Selects Registry definitions and relationship metadata for generation. |
| [SQS manifest](../tools/awsServiceResources/sources/sqs.json) and [SQS Smithy model](../refs/aws-api-models/models/sqs/service/2012-11-05/sqs-2012-11-05.json) | Establish the selected resource's identity, output classifications, candidate lifecycle calls, and modeled operation results. |
| [Smithy source and documentation](../refs/smithy/) | Supplies authoritative model and conversion behavior for the selected protocols. |
| [Resource metadata importer](../tools/awsResources/awsResourceMetadata.ts) | Imports selected definitions and saves validation reports and correction records. |
| [Smithy's CloudFormation generation guide](../refs/smithy/docs/source-1.0/guides/generating-cloudformation-resources.rst) and [CloudFormation traits](../refs/smithy/docs/source-2.0/aws/aws-cloudformation.rst) | Define the annotated resource declarations the exporter requires and the property classifications it can derive. |
| [CloudFormation CLI](../refs/cloudformation-cli/README.md) | Describes generation, validation, packaging, and provider testing. Its development and stabilization guides distinguish generated models from the handler implementation a provider author supplies. |

## Supporting materials

### Lambda permission integration

The native Lambda registrations and the HTTP echo stack were removed. The IAM workload tracker records the permission and ownership behavior a generated implementation will need. [IAM workload tracker](dev-attempts_aws-iam-workload.md)

With the earlier role implementation, live role delegation allowed PassRole and AssumeRole for the target role and denied both for an unrelated role. Removing both grants preserved an unrelated policy and revoked AssumeRole for the original session. PassRole revocation remained unconfirmed because Lambda still accepted the role during the observation window.

### Permission API examples

Use these application calls to define the API before implementation. Each call returns an Effect and runs inside the stack's `Effect.gen` alongside the affected resource declarations. The grant method belongs to the resource being accessed and accepts a typed declaration for the grantee. The method supplies the actions and chooses which policy to change. Nomoss resolves provider identities, orders the resource operations, and removes the corresponding policy or statement when you remove the grant. Keep action-specific methods on the resource and reuse the existing policy lifecycle.

#### High-level grants

The execution role identifies the role Lambda assumes while running the handler. Select it explicitly when creating the function, as the HTTP echo application does today.

```ts
const executionRole = yield* LambdaExecutionRole("EchoRole");
const echoFunction = yield* AWSFunction({
  logicalId: "EchoFunction",
  executionRole,
  props: { Runtime: "nodejs24.x", Handler: "index.echo", Code: artifact },
});
```

In the HTTP route grant, `echoRoute` targets `echoFunction` through a Lambda integration. The first call adds a function policy statement that lets API Gateway invoke the function for the route's concrete method and literal path in any stage. Use `addPermission` with an explicit source ARN for a specific stage, parameterized paths, `ANY`, or `$default`. The second call adds an identity policy statement that lets the same-account role invoke the function directly.

```ts
yield* echoFunction.grantInvoke(echoRoute);
yield* echoFunction.grantInvoke(invokeRole);
```

For IAM role delegation, the target role is the receiver and the caller role is the argument. PassRole authorizes the caller to pass the target role to an AWS service. AssumeRole gives the caller permission to call STS for the target role. The target role's trust policy supplies the corresponding trust.

```ts
yield* executionRole.grantPassRole(deployerRole);
yield* applicationRole.grantAssumeRole(workerRole);
```

For common resource access, the grant names identify the supported operation. A bucket grant can take an object key pattern to scope access, and synchronous execution applies to a synchronous Express workflow.

```ts
yield* jobs.grantSendMessages(producerRole);
yield* jobs.grantConsumeMessages(workerRole);
yield* events.grantPublish(producerRole);

yield* uploads.grantRead(workerRole, "incoming/*");
yield* uploads.grantPut(producerRole, "incoming/*");
yield* uploads.grantDelete(cleanupRole, "expired/*");
yield* encryptionKey.grantEncrypt(producerRole);
yield* encryptionKey.grantDecrypt(workerRole);
yield* encryptionKey.grantEncryptDecrypt(transferRole);

yield* workflow.grantStartExecution(workerRole);
yield* expressWorkflow.grantStartSyncExecution(workerRole);
```

#### Low-level policy methods

Use the low-level methods when the application needs to supply its own IAM actions, policy conditions, or service principal. `addToPolicy` adds an identity policy statement to the receiving role. `addPermission` declares a named statement in the receiving function's policy. In the second call, `partnerRuleArn` identifies the specific EventBridge rule authorized to invoke the function. The method takes the function identity from its receiver.

```ts
yield* workerRole.addToPolicy("ReadQueueAttributes", {
  actions: ["sqs:GetQueueAttributes"],
  resources: [jobs],
});

yield* echoFunction.addPermission("PartnerRule", {
  action: "lambda:InvokeFunction",
  principal: "events.amazonaws.com",
  sourceArn: partnerRuleArn,
});
```

Attach an existing managed policy or a named inline policy when the application needs to manage an entire policy. In this example, `auditPolicy` is a managed policy resource and `operationsPolicy` is a named inline policy document with multiple statements.

```ts
yield* workerRole.addManagedPolicy(auditPolicy);
yield* workerRole.attachInlinePolicy(operationsPolicy);
```

Generate native resource factories and verify the queue lifecycle against AWS:

```sh
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
yarn exec vitest run --config vitest.integration.config.ts tests/awsServiceResources.integration.test.ts --pool forks
```

The resource metadata importer reports nine loading diagnostics, six interpretation diagnostics, and three correction records for the four pinned definitions. Reports reside in `.cache/nomoss/aws-resource-metadata/us-east-1/`. Its model omits object-or-string policy properties and merges an S3 logging alternative. The original Registry properties remain the input to Nomoss's schema compiler.

The selected SQS, S3, and SNS Smithy models contain no resource declarations or cfnResource annotations, so Smithy's exporter cannot supply their missing CRUD mappings. Registry handler permissions identify candidate calls but leave their arguments, order, and stabilization unspecified. The SQS definition describes the VisibilityTimeout range in prose while its structured schema checks only the integer type. Native execution rules and source corrections must account for those gaps, and integration tests must establish the actual provider result.

The native Queue implementation uses imported resource metadata and explicit configuration for API roles and resets. One shared executor translates declared attributes, restores configured defaults, clears removed policies with empty strings, and waits for propagation. [SQS lifecycle configuration](../tools/awsServiceResources/sources/sqs.json)

The operation command publishes the SQS client from its pinned manifest:

```sh
yarn exec tsx tools/compileAwsServiceResources.ts
```
