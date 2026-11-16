# AWS resource generation from Smithy and CloudFormation definitions

## Tracker maintenance [keep this section at the top of every tracker]

Preserve this section unchanged while working on a tracker. Keep the tracker lean as development progresses. Consolidate completed tasks into concise statements of delivered behavior, and combine overlapping tasks into coherent outcomes.

Each task must explain the result to deliver and the behavior that establishes completion. Repository guidance defines how to validate work. Keep validation within the task's acceptance conditions; separate tasks for running checks or recording their results add no delivery.

Before marking a task complete, compare the user's request, the initial behavior, and the implemented change. Establish that the affected workflow delivers the requested result and preserves required behavior. Passing checks supports that assessment; completion requires the requested outcome.

## Scope statement

Use the upstream tools and their documented workflows to reduce the code Nomoss needs for declarative AWS resource management. Start with AWS::SQS::Queue and include S3 and a few other resource types already declared in this repository. The implementation must produce generated resource declarations, preserve their lifecycle requirements, and let applications connect compatible resources through the shared core.

Use the shared core for resource dependencies, planning, command execution, saved state, replacement, and recovery. Cloud Control implementation and its live integration runs are on hold. Its existing generated resource types identify useful integration cases for this work.

## Direction

CloudFormation definitions supply resource properties, identities, output classifications, and replacement rules. Smithy supplies operation inputs, responses, errors, and execution traits. Record the source for each property and operation mapping. An unresolved mapping must prevent publication of the affected lifecycle operation.

Follow the upstream usage guides before selecting a tool or extending Nomoss. Establish what its public API actually generates or executes and what its input must already contain. Develop the selected integration through the production generator, run integration tests, and use their results to identify support and remaining issues. Record concrete failures and missing metadata beside the task they prevent.

Keep generation modular and use the existing Effect services and Stripe generation patterns. Supply dependencies through Layers and infer Effect requirements from their composition. Generate TypeScript through AST operations and compile validation through the existing Effect schema services. Put shared code in its owning module and migrate imports directly when moving it.

Keep each operation readable from input to result. Separate logical groups with blank lines, name nested AST operations, and construct complete metadata objects. Shared service metadata belongs in one generated definition. Verify source checksums before conversion, and verify the expected original value before applying a source correction to the provider input. A checksum mismatch, invalid canonical schema, or unresolved lifecycle mapping must stop the affected publication. Retain CDK compatibility reports beside the original definitions.

## Completed work

- [x] Pin the SQS Smithy model and Queue CloudFormation definition in the [manifest](../tools/awsServiceResources/sources/sqs.json). Preparation verifies their checksums and builds the resource output catalog. The Queue definition identifies QueueUrl as the primary identifier and QueueUrl and Arn as outputs. Stripe uses the shared source-verification service.

- [x] Generate the [SQS client](../src/providers/aws/client/generated/sqs.ts) with 23 operation contracts through the official Smithy converter and existing AWS schema and publication services. Operations use the internal AWS client and reference one shared service definition. Modeled Unit responses use empty-response schemas. Conflicting schema definitions and missing protocol content for declared response bodies fail generation.

- [x] Exercise queue creation, reads, an attribute update, and deletion against AWS through the generated client. The [live integration case](../tests/awsServiceResources.integration.test.ts) checks the queue URL and ARN, observes the updated visibility timeout, and confirms absence after deletion. Cleanup can recover the URL by queue name if creation-response decoding fails.

- [x] Share [resource entity emission](../tools/codegen/resourceDeclarations.ts) and [AST helpers](../tools/codegen/typeScriptNodes.ts) with Stripe. Stripe imports the shared modules directly.

- [x] Integrate CDK's public definition importer with verified Registry inputs and relationship metadata through [AwsResourceMetadataImporter](../tools/awsResources/awsResourceMetadata.ts). The original definitions supply validation while CDK supplies connections through nested structures and arrays. Import diagnostics and correction records are saved for review. The [tool usage guide](../tools/awsServiceResources/README.md) describes CDK, Smithy, and CloudFormation CLI usage and the limits established by the selected sources.

- [x] Publish [native resource declarations](../src/providers/aws/resources/generated/native/) for SQS Queue, S3 Bucket, SNS Topic, and KMS Key through the [declaration command](../tools/compileAwsServiceResourceDeclarations.ts) and [pinned manifest](../tools/awsServiceResources/sources/resources.json). The declarations share entity-schema generation with Stripe, accept unambiguous resource references, and validate resolved requests against the original Registry schemas. Source create-only properties supply replacement planning. Ambiguous source-output choices are exported as relationship issues.

- [x] Exercise generated queue, topic, and bucket entities through production declaration, planning, output resolution, and persistence in the [integration case](../tests/awsResourceDeclarations.integration.test.ts). The resolved S3 request retains its object-expiration rule and uses queue and topic ARNs. Saved provider results supply application outputs. Renaming the queue produces a replacement plan that includes updates to dependent resources. These provider results are controlled; this case establishes declaration and planning behavior.

- [x] Add source comments beside the main AWS generation flows and substantial blocks, including relationship selection, replacement metadata, declaration registration, source verification, metadata import, and publication. The surrounding shared input-schema comments explain dictionary dependencies, property metadata, collection paths, deferred schemas, and generated reference codecs. These comments document the constraints and consequences at the code they govern under the [code documentation contract](../docs/development/code-documentation.md).

- [x] Traverse CDK relationship types through [Stream.unfold](../node_modules/effect/src/Stream.ts) in [awsResourceMetadata.ts](../tools/awsResources/awsResourceMetadata.ts). Immutable traversal tasks retain each path's visited definitions, and Effect infers failures directly from definition resolution. Nested paths, recursive-definition rejection, missing-definition rejection, and target deduplication remain part of the operation. Both source-manifest extensions use the documented `Schema.fieldsAssign` API in [model.ts](../tools/awsServiceResources/model.ts).

- [x] Generate all four native declarations under [resources/generated/native](../src/providers/aws/resources/generated/native/) through the corrected declaration command. Consumer imports and operating instructions use that location, relative core imports are regenerated, and the existing Projen generated-file settings cover it. Remove the standalone SQS mapping demo, its JSON mapping, its README, and its tracker reference.

## Tasks

### Next batch: native SQS stack lifecycle

- [ ] Create and observe a declared Queue through the stack API and generated SQS client. Add reviewed mappings from Registry properties to SQS requests and from SQS responses to the resource model; for example, encode integer VisibilityTimeout as a string attribute and map QueueArn to Arn. Register execution through the shared command policies and Layer graph. Complete the live creation and observation scenarios in [awsServiceResources.integration.test.ts](../tests/awsServiceResources.integration.test.ts), with assertions on actual queue settings and saved QueueUrl and Arn. Use the [Queue definition](../refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-sqs-queue.json) and [SQS operation model](../refs/aws-api-models/models/sqs/service/2012-11-05/sqs-2012-11-05.json) as the mapping contracts.

- [ ] Apply Queue property changes through the stack API while preserving QueueUrl. Use the reviewed SQS mappings to update declared settings and observe their applied values before core saves the resource. Complete the live attribute-update scenario in [awsServiceResources.integration.test.ts](../tests/awsServiceResources.integration.test.ts); verify the changed AWS value and unchanged saved identity, and preserve core's generated replacement rules for create-only properties.

- [ ] Remove a Queue through both a declaration change and explicit stack teardown. Execute deletion with the saved QueueUrl, confirm provider absence, and then clear saved ownership. Complete both removal scenarios in [awsServiceResources.integration.test.ts](../tests/awsServiceResources.integration.test.ts), retain cleanup after failures, and use [core replacement and recovery](../docs/application/resource-operations.md) through the same shared runtime.

### Later batches: encryption and notification delivery

- [ ] Resolve the KMS entity output selection for SQS KmsMasterKeyId and S3 bucket encryption, where metadata permits both Arn and KeyId. Establish forward queue-policy and topic-policy relationships from the Registry definitions, including the reverse records currently attached to QueueUrl and TopicArn. Exercise the resolved values through application declarations and preserve rejection of unsupported nested create-only paths.

- [ ] Deliver S3 notifications and SNS subscriptions through generated resources with the required queue and KMS permissions. Evaluate reuse of CDK's [notification destination](../refs/aws-cdk/packages/aws-cdk-lib/aws-s3-notifications/lib/sqs.ts) and [subscription](../refs/aws-cdk/packages/aws-cdk-lib/aws-sns-subscriptions/lib/sqs.ts) behavior, including its Lambda-backed S3 notification setup. Apply permission before notification configuration, remove permission after notifications, and verify actual delivery. Include object-expiration updates and an explicit nonempty-bucket teardown policy under the [CDK S3 contract](../refs/aws-cdk/packages/aws-cdk-lib/aws-s3/README.md).

## References

| Source | Role in this scope |
|---|---|
| [Generation architecture](../docs/application/generation-architecture.md) | Defines how shared generation produces resource and operation contracts. |
| [Resource lifecycle operations](../docs/application/resource-operations.md) and [resource graph contract](../docs/application/resource-graph.md) | Govern dependencies, validation, saved identity, replacement, and recovery through core. |
| [AWS resource contract](../docs/application/aws-resource-lifecycle-management.md) | Supplies requirements for canonical AWS schemas, internal request execution, and application service composition. This track adds native service API resource management. |
| [Current AWS resource generation](../tools/awsResources/README.md) and [current Smithy conversion](../tools/awsCloudControl/README.md) | Describe the Registry compiler and Smithy converter already used by the generators. |
| [AWS API models](../refs/aws-api-models/README.md) | Locates the Smithy JSON models for AWS service operations. |
| [CloudFormation resource schema](../refs/cloudformation-resource-schema/README.md) | Defines the resource semantics carried by Registry definitions. |
| [Registry definitions](../refs/aws-cdk-service-spec/sources/CloudFormationSchema/) and [relationship metadata](../refs/aws-cdk-service-spec/sources/OobRelationships/relationships.json) | Supply resource definitions and relationship metadata for generation. |
| [SQS Queue definition](../refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-sqs-queue.json) and [SQS Smithy model](../refs/aws-api-models/models/sqs/service/2012-11-05/sqs-2012-11-05.json) | Establish the selected resource's identity, output classifications, candidate lifecycle calls, and modeled operation results. |
| [Smithy source and documentation](../refs/smithy/) | Supplies authoritative model and conversion behavior for the selected protocols. |
| [CDK importer usage](../refs/aws-cdk-service-spec/packages/@aws-cdk/service-spec-importers/README.md) and [CDK source ordering](../refs/aws-cdk-service-spec/README.md) | Explain programmatic imports, validation reports, corrections, and the historical type information retained for CDK compatibility. |
| [Smithy's CloudFormation generation guide](../refs/smithy/docs/source-1.0/guides/generating-cloudformation-resources.rst) and [CloudFormation traits](../refs/smithy/docs/source-2.0/aws/aws-cloudformation.rst) | Define the annotated resource declarations the exporter requires and the property classifications it can derive. |
| [CloudFormation CLI](../refs/cloudformation-cli/README.md) | Describes generation, validation, packaging, and provider testing. Its development and stabilization guides distinguish generated models from the handler implementation a provider author supplies. |
| [CDK S3 usage](../refs/aws-cdk/packages/aws-cdk-lib/aws-s3/README.md), [notification destinations](../refs/aws-cdk/packages/aws-cdk-lib/aws-s3-notifications/README.md), and [SNS subscriptions](../refs/aws-cdk/packages/aws-cdk-lib/aws-sns-subscriptions/README.md) | Explain object lifecycle rules, teardown policies, delivery grants, and generated custom resources. |

## Supporting materials

Generate the native declarations and run their application integration case:

```sh
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
yarn exec vitest run --config vitest.integration.config.ts tests/awsResourceDeclarations.integration.test.ts --pool forks
```

The previous AWS cases exercise Cloud Control declarations or manually constructed output references. The new integration case covers the previously absent path from native generated entity inputs to resolved S3 and SNS requests, saved application outputs, and replacement planning. It uses the shared core services with controlled provider results and establishes no native provider mutation.

CDK importer 0.0.145 reports nine loading diagnostics, six interpretation diagnostics, and three correction records for the four pinned definitions. Reports reside in `.cache/nomoss/aws-resource-metadata/us-east-1/`. Its model omits object-or-string policy properties and merges an S3 logging alternative. The original Registry properties remain the input to Nomoss's schema compiler.

The selected SQS, S3, and SNS Smithy models contain no resource declarations or cfnResource annotations, so Smithy's exporter cannot supply their missing CRUD mappings. Registry handler permissions identify candidate calls but leave their arguments, order, and stabilization unspecified. The SQS definition describes the VisibilityTimeout range in prose while its structured schema checks only the integer type. Native execution rules and source corrections must account for those gaps, and integration tests must establish the actual provider result.

The operation command publishes the SQS client from its pinned manifest:

```sh
yarn exec tsx tools/compileAwsServiceResources.ts
```
