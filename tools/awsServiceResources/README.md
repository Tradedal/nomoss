# Generate AWS resources from upstream definitions

Use CloudFormation Registry definitions for resource properties and Smithy models for AWS operations. Nomoss compiles the property validators through Effect and generates TypeScript through its shared AST services. The current command publishes the native SQS operation client:

```sh
yarn exec tsx tools/compileAwsServiceResources.ts
```

The [SQS source manifest](sources/sqs.json) pins both documents and the relationship source by revision and SHA-256. Source preparation verifies those files before conversion. Native resource lifecycle execution remains unfinished in the [development tracker](../../attempts/dev-attempts_aws-smithy-resource-generation.md). Cloud Control work is on hold.

## Generate declarations and check their use

Generate the native SQS Queue, S3 Bucket, SNS Topic, and KMS Key declarations from the repository root:

```sh
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
```

The [resource manifest](sources/resources.json) selects the region, Registry definitions, and relationship source. Optional positional arguments select another manifest and output directory. Each selected definition and the relationship file must match its pinned checksum. The command renders all selected modules before publishing them under `src/providers/aws/resources/generated/native/<service>/<resource>/index.ts`. This location keeps generated native declarations within the generated AWS tooling configuration and gives them a separate directory from the existing Cloud Control declarations. Publication formats and lints each module.

Each module exports a declaration function, such as `declareAWSQueue`, and its property, request, and output schemas. Pass a related entity directly where the generated property permits it. For example, an S3 queue-notification configuration accepts the entity returned by `declareAWSQueue` in its Queue property. The declaration codec saves the relationship; the core resolves the queue ARN into the request and validates the completed request against the original Registry schema. Ordinary output getters read applied values from the owning stack.

The [declaration integration test](../../tests/awsResourceDeclarations.integration.test.ts) uses these generated modules through the production graph, planning, output-resolution, and persistence services. It checks S3 object expiration together with queue and topic notification connections, application outputs from saved provider results, and replacement planning after a queue rename. Provider results are controlled in this test. Native create, update, and delete execution still needs the mappings and policies listed in the tracker.

```sh
yarn exec vitest run --config vitest.integration.config.ts tests/awsResourceDeclarations.integration.test.ts --pool forks
```

The existing native SQS workflow checks actual creation, attribute propagation, and deletion through the generated operation client. Select the integration account through AWS_PROFILE and AWS_REGION under the [AWS testing procedure](../../docs/development/testing.md#test-aws-workflows):

```sh
yarn exec vitest run --config vitest.integration.config.ts tests/awsServiceResources.integration.test.ts --pool forks
```

To add a declaration, add its Registry file, revision, and checksum to the resource manifest and use the same region's relationship source. Regenerate and exercise its intended application connections. A native operation client additionally needs its Smithy service manifest and the operation-generation command above. The resource handlers' permissions identify relevant API calls; reviewed mappings still need to define their arguments, sequence, and completion conditions.

## Use CDK's definition tools

The [CDK importer guide](../../refs/aws-cdk-service-spec/packages/@aws-cdk/service-spec-importers/README.md) describes `DatabaseBuilder.importCloudFormationRegistryResources(directory).build()`. The directory contains one directory per region. The result includes a typed database and an import report. The CLI equivalent is `import-db --source cfnSchemaDir:<directory> <database-file>`. Adding --validate makes schema validation failures reject the affected source. The normal CLI mode retains validation warnings in its report.

CDK's importer reads inline `relationshipRef` metadata and its separate relationship importer reads [OobRelationships](../../refs/aws-cdk-service-spec/sources/OobRelationships/relationships.json). These records identify the referenced resource type and property. Their property paths can pass through nested definitions and arrays. Nomoss must retain that location when it generates an entity input and records the resulting dependency. A resource relationship supplies a value and an execution dependency; permission policies and configuration calls need their own execution rules.

The [CDK source-ordering guide](../../refs/aws-cdk-service-spec/README.md) explains that its database combines several sources and preserves historical types for compatibility. Its [Registry importer](../../refs/aws-cdk-service-spec/packages/@aws-cdk/service-spec-importers/src/importers/import-cloudformation-registry.ts) converts schemas into the CDK property model. Nomoss must keep the selected Registry document as the authority for validation and preserve its region and revision. The CDK model can supply additional metadata after that metadata is checked against the selected document.

[AwsResourceMetadataImporter](../awsResources/awsResourceMetadata.ts) uses the public DatabaseBuilder API with the selected region and verified documents. CDK's packaged corrections run on temporary inputs. Nomoss retains the original documents for schema compilation and keeps validation warnings and interpretation failures in `.cache/nomoss/aws-resource-metadata/<region>/`. The importer versions are pinned through Projen and the lockfile. A missing imported resource or recursive definition fails preparation.

The selected sources produced nine loading diagnostics, six interpretation diagnostics, and three correction records with importer 0.0.145. Strict mode rejects newer tagging.permissions metadata. The CDK model omits SQS RedrivePolicy and RedriveAllowPolicy and KMS KeyPolicy because it cannot interpret their object-or-string form. It also merges an alternative in S3 logging configuration. These original properties remain in Nomoss's generated schemas because their validators come from the Registry documents. The report also identifies reverse relationship records on read-only QueueUrl and TopicArn properties, which CDK cannot attach to writable inputs.

When several properties of the same resource are allowed at an input, the generated RelationshipIssues export identifies the unresolved choice. SQS KmsMasterKeyId permits both the KMS key ARN and KeyId. Its entity mapping needs a reviewed selection. Ordinary provider values remain available for that field. Relationship metadata also leaves context-dependent requirements unresolved, such as the correspondence between an SNS subscription's protocol and destination.

## Use CDK's S3 and subscription constructs

CDK's [S3 guide](../../refs/aws-cdk/packages/aws-cdk-lib/aws-s3/README.md) describes lifecycleRules for object expiration and storage transitions, removalPolicy for bucket retention, and autoDeleteObjects for removing bucket contents. These settings have different effects. An object expiration rule configures S3's background processing. Destroying a nonempty bucket requires work to remove its objects. CDK's autoDeleteObjects feature uses a custom resource and permission changes to perform that work.

The [notification-destination guide](../../refs/aws-cdk/packages/aws-cdk-lib/aws-s3-notifications/README.md) uses bucket.addEventNotification with an SqsDestination or SnsDestination. These constructs configure delivery permission as well as the destination reference. SqsDestination.bind grants S3 permission to send messages and adds KMS key permissions for an encrypted queue. The S3 guide states that notification configuration uses a Lambda-backed custom resource. Its [SNS subscription guide](../../refs/aws-cdk/packages/aws-cdk-lib/aws-sns-subscriptions/README.md) similarly documents queue subscriptions and automatic KMS permissions.

These higher-level constructs contain reusable resource-specific behavior. Using their synthesized declarations with Nomoss would require preserving generated policies, references, dependencies, and custom-resource execution. The current definition importer supplies relationship metadata. Delivery permission, S3 notification ordering, and bucket-content removal remain explicit implementation work in the tracker.

## Use Smithy's resource model and exporter

Smithy resource declarations bind identifiers, properties, and lifecycle operations. The [resource traits](../../refs/smithy/docs/source-2.0/spec/resource-traits.rst) describe explicit property bindings and references to other resources. The [AWS ARN reference trait](../../refs/smithy/docs/source-2.0/aws/aws-core.rst) can also identify a CloudFormation resource type. Preserve those facts during generation where the selected AWS model supplies them.

The [CloudFormation generation guide](../../refs/smithy/docs/source-1.0/guides/generating-cloudformation-resources.rst) documents the `cloudformation` build plugin from `software.amazon.smithy:smithy-aws-cloudformation`. Its Java API, `CfnConverter.convertToNodes(model)`, exports schemas for resource declarations annotated with `aws.cloudformation#cfnResource`. The service setting selects the Smithy service to export. The converter's extension interfaces allow additional schema conversion rules. Its input must already contain the resource declarations and annotations that establish those rules. The checked SQS, S3, and SNS models have zero resource declarations and zero cfnResource annotations, so this exporter cannot derive their resource lifecycles from the operations alone.

## Use the CloudFormation CLI for provider development

The [CloudFormation CLI guide](../../refs/cloudformation-cli/README.md) describes `cfn init`, `cfn generate`, `cfn validate`, and `cfn test`. These commands create a provider project, generate language models and handler stubs, validate its resource schema, and test the implemented handlers. Provider development also includes packaging and registration. Registering a provider is a separate operation that changes the AWS account.

The CLI's [development guide](../../refs/cloudformation-cli/doc_source/resource-type-develop.md) requires the provider author to implement the service calls inside those handlers. Its [stabilization guide](../../refs/cloudformation-cli/doc_source/resource-type-develop-stabilize.md) describes translating resource properties into requests, chaining calls, handling failures, and waiting for the desired state. These are requirements for native Nomoss lifecycle execution too. Its [handler requirements](../../refs/cloudformation-cli/doc_source/resource-type-test-contract.md) define success as reaching the declared state and preserving resource identity.

Use the CLI's handler requirements when evaluating native lifecycle support. Creation must preserve identity and idempotency, updates must apply the declared values, reads must distinguish absence from failure, and deletion must establish absence. Integration tests must observe those results and saved state through Nomoss services. A source permission list identifies allowed calls; the handler implementation supplies their sequence and property translations.
