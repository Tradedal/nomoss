# Generate AWS resources from upstream definitions

Use CloudFormation Registry definitions for resource properties and Smithy models for AWS operations. Nomoss compiles the property validators through Effect and generates TypeScript through its shared AST services. The current command publishes the native SQS operation client:

```sh
yarn exec tsx tools/compileAwsServiceResources.ts
```

The [SQS source manifest](sources/sqs.json) pins both documents and the relationship source by revision and SHA-256. Source preparation verifies those files before conversion. Its lifecycle configuration selects the SQS operations and records naming exceptions and property reset values. Cloud Control work is on hold.

## Manage a state machine through the native client

The [state machine example](../../examples/state-machine/application.ts) declares a workflow that waits five seconds and returns a ready status. The [resource configuration](../../src/providers/aws/resources/stepFunctions/stateMachine.ts) uses Effect's `Schema.encodeKeys` to translate the CloudFormation names to AWS names. One `Schema.fromJsonString` codec turns the definition into JSON text on a write and restores the object on a read. The native AWS runtime registers those operations with core. Apply saves the ARN so reconciliation can read the same state machine later.

The [source manifest](sources/stepFunctions.json) pins the Registry and Smithy files. It selects the four operations the application uses. Generate the client and declaration from the repository root with the pinned JSON files available at the manifest paths.

```sh
yarn exec tsx tools/compileAwsServiceResources.ts tools/awsServiceResources/sources/stepFunctions.json src/providers/aws/client/generated/stepFunctions.ts
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
```

## Generate declarations and check their use

Generate the native declarations listed in the resource manifest from the repository root:

```sh
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
```

The [resource manifest](sources/resources.json) selects the region, Registry definitions, and relationship source. Optional positional arguments select another manifest and output directory. Each selected definition and the relationship file must match its pinned checksum. The command renders all selected modules before publishing them under `src/providers/aws/resources/generated/native/<service>/<resource>/index.ts`. This location keeps generated native declarations within the generated AWS tooling configuration and gives them a separate directory from the existing Cloud Control declarations. Publication formats and lints each module.

Each module exports a declaration function, such as `AWSQueue`, and its property, request, and output schemas. Pass a related entity directly where the generated property permits it. For example, an S3 queue-notification configuration accepts the entity returned by `AWSQueue` in its Queue property. The declaration codec saves the relationship; the core resolves the queue ARN into the request and validates the completed request against the original Registry schema. Ordinary output getters read applied values from the owning stack.

The native SQS workflows check the generated operation client and a declared application's lifecycle against AWS. The application case verifies saved identity, reconciliation, attribute and tag changes, property reset, declaration removal, and explicit teardown. Select the integration account through AWS_PROFILE and AWS_REGION under the [AWS testing procedure](../../docs/development/testing.md#test-aws-workflows):

```sh
yarn exec vitest run --config vitest.integration.config.ts tests/awsServiceResources.integration.test.ts --pool forks
```

To add a declaration, add its Registry file, revision, and checksum to the resource manifest and use the same region's relationship source. Regenerate and exercise its intended application connections. A native operation client additionally needs its Smithy service manifest and the operation-generation command above. Resource handlers' permissions identify relevant API calls. Lifecycle configuration must select the calls and account for their naming and reset rules before a native command can be registered.

## Generate IAM operations

The [IAM manifest](sources/iam.json) selects the IAM operations compiled from the pinned Smithy model. The [AWS Query projection](AwsQueryOpenApiProtocol.java) retains the request and result shapes that the AWS SDK uses to encode form data and decode XML. The shared AWS client uses the signing region selected by Smithy's addressing rules, so a regional deployment can call the global IAM service.

```sh
yarn exec tsx tools/compileAwsServiceResources.ts tools/awsServiceResources/sources/iam.json src/providers/aws/client/generated/iam.ts
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
```

The [IAM role registration](../../src/providers/aws/resources/iam/role.ts) uses the generated client to apply role trust and policy assignments. The declaration generator also publishes schemas for IAM policies, users, groups, memberships, and instance profiles. Their pending lifecycle and grant work is recorded in the [AWS tracker](../../attempts/dev-attempts_aws-smithy-resource-generation.md#iam-policies-principals-and-assignments).

## Add an IAM policy statement to a role

Call `role.addToPolicy` with a name within the role and the IAM actions and resource scope you need. The statement defaults to Allow. Set `effect` or `conditions` when the policy needs them. Nomoss gives each named statement its own inline policy so it can update or remove it independently.

Use `LambdaExecutionRole` for Lambda trust and CloudWatch Logs permissions. Pass the resulting role as `executionRole` when you create the function. Nomoss applies the role and its logging policy before it creates the function. [HTTP echo declaration](../../examples/http-echo/application.ts)

Pass declared resources in `resources` to scope a statement to their applied ARNs. The shared graph records dependencies on those resources, resolves their current ARNs before applying the policy, and orders policy removal before resource removal. The statement accepts queues, buckets, topics, keys, functions, state machines, roles, and managed policies. Their own lifecycle support determines whether the native runtime can deploy them. ARN strings and wildcard patterns remain available for existing resources and more specific scopes, such as objects inside a bucket.

```ts
yield* role.addToPolicy("ReadQueueAttributes", {
  actions: ["sqs:GetQueueAttributes"],
  resources: [jobs],
});
```

After deployment, a session that assumes this role can read attributes of the jobs queue. Removing the call removes the named inline policy after Nomoss checks the role ID and policy statement ID. [IAM tracker](../../attempts/dev-attempts_aws-smithy-resource-generation.md#iam-policies-principals-and-assignments)

## Generate and execute the Queue mapping

The declaration command writes the Queue registration to [resourceCommands.ts](../../src/providers/aws/resources/generated/native/resourceCommands.ts). The metadata importer supplies the identity, tag property, and replacement rules. The Registry definition supplies writable properties and their types. The generator checks the selected operations against the SQS operation catalog and saves their codecs in the registration.

```text
Imported metadata + Registry properties + lifecycle configuration → generator → resourceCommands.ts
Queue declaration → stack plan → shared AWS policy + saved mapping → SQS APIs
```

The application loads the registration through `awsNativeStackLayerLive`. During apply, the runtime validates requests with the registered codecs and calls the internal AWS client. For example, it sends `VisibilityTimeout: 45` as an SQS attribute named `VisibilityTimeout` with the string value `"45"`. It reads the queue ARN and confirms the declared values before core saves the observation.

Import AWSQueue from nomoss/providers/aws/sqs/queue and awsNativeStackLayerLive from nomoss/providers/aws. The following operation runs within an application scope that supplies resourceStackOperationsLayer and awsNativeStackLayerLive, together with persistent state storage and the state secret policy. The [live application case](../../tests/awsServiceResources.integration.test.ts) shows the complete Layer composition and uses these public package paths.

```ts
import { ResourceStackOperations } from "nomoss/core";
import { AWSQueue } from "nomoss/providers/aws/sqs/queue";
import { Effect } from "effect";

const eventsStack = Effect.fn("Events.stack")(function* () {
  const operations = yield* ResourceStackOperations;
  return yield* operations.Stack(
    "events",
    Effect.gen(function* () {
      const queue = yield* AWSQueue({
        logicalId: "Events",
        props: { VisibilityTimeout: 45 },
      });

      return () => ({ queueUrl: queue.QueueUrl, queueArn: queue.Arn });
    }),
  );
});

const applyEvents = Effect.fn("Events.apply")(function* () {
  const operations = yield* ResourceStackOperations;
  const desired = yield* eventsStack();
  return yield* operations.apply(desired);
});
```

When a declaration omits `QueueName`, Nomoss derives it from the owning stack, logical ID, and create-only properties. Creation retries use the same name, and updates use the saved `QueueUrl`. Removing `VisibilityTimeout` restores 30 seconds. Removing a queue policy sends an empty policy string. If a property has no reset rule, the update fails before it changes the queue. [SQS lifecycle settings](sources/sqs.json)

The shared policy waits for attributes and managed tags to match before returning a successful mutation. AwsResourceStabilizationTimeout defaults to twenty minutes to cover SQS's documented fifteen-minute retention propagation period. An application can supply a shorter timeout with Effect.provideService. Deletion waits up to 75 seconds for absence, and only configured missing-resource errors establish absence.

For native handlers that compose these operations directly, [AwsResourceMapping](../../src/providers/aws/management/resourceMapping.ts) supplies validated declarations, native attribute values, stable physical names, and reconstructed resource observations. [AwsResourcePolicy](../../src/providers/aws/management/resourcePolicy.ts) exposes provider reads, propagation waits, and lifecycle commands through the shared runtime. Stack applications use ResourceStackOperations so core retains responsibility for planning and saved ownership.

For another resource with the same attribute-map API and URL identity, select its service manifest in resources.json and supply its lifecycle configuration. Add its generated operation catalog to the declaration command's renderPolicies call. The generator supplies the writable-property table; the manifest holds operation roles and exceptions. A resource with a different request or identity model needs execution behavior appropriate to that API. The [development tracker](../../attempts/dev-attempts_aws-smithy-resource-generation.md) retains the subsequent encryption and notification work.

## Import AWS modules

The [package export patterns](https://nodejs.org/api/packages.html#subpath-patterns) resolve resource imports directly to their generated modules. A new service or resource requires no entry in an aggregate index. Native resources use paths such as nomoss/providers/aws/s3/bucket and nomoss/providers/aws/sqs/queue. Generated operation clients use nomoss/providers/aws/client/sqs, while shared client assembly comes from nomoss/providers/aws/client and configuration comes from nomoss/providers/aws/client/config.

Cloud Control has its own runtime at nomoss/providers/aws/cloud-control and resource paths such as nomoss/providers/aws/cloud-control/sqs/queue. Its handwritten services and generated resource declarations reside under src/providers/aws/cloudControl. Shared client assembly resides in src/providers/aws/client and has no dependency on the Cloud Control runtime. The package defines its export patterns through Projen at the project root.

## Resolve resource relationships

The resource metadata importer reads inline references and the relationship file selected by the resource manifest. A relationship names the output of one resource and the input of another. The declaration generator retains the full input path, including nested properties and array elements, so core can substitute the output and order the resources. [Resource metadata importer](../awsResources/awsResourceMetadata.ts)

The importer applies corrections to temporary inputs and writes its diagnostics to `.cache/nomoss/aws-resource-metadata/<region>/`. The schema compiler uses the original Registry definitions. This preserves property alternatives that the importer cannot represent, including object and string forms of SQS and KMS policies.

When several properties of the same resource are allowed at an input, the generated RelationshipIssues export identifies the unresolved choice. SQS KmsMasterKeyId permits both the KMS key ARN and KeyId. Its entity mapping needs a reviewed selection. Ordinary provider values remain available for that field. Relationship metadata also leaves context-dependent requirements unresolved, such as the correspondence between an SNS subscription's protocol and destination.

## Plan notification delivery

Notification delivery needs a destination reference and permission for the sending service to use it. Encrypted destinations may also need permission to use the key. Native delivery must apply those permissions before configuring notifications and remove them after the notification configuration is removed. The native resource tracker covers this work and the separate policy for destroying nonempty buckets. [AWS resource tracker](../../attempts/dev-attempts_aws-smithy-resource-generation.md#later-batches-encryption-and-notification-delivery)

## Use Smithy's resource model and exporter

Smithy resource declarations bind identifiers, properties, and lifecycle operations. The [resource traits](../../refs/smithy/docs/source-2.0/spec/resource-traits.rst) describe explicit property bindings and references to other resources. The [AWS ARN reference trait](../../refs/smithy/docs/source-2.0/aws/aws-core.rst) can also identify a CloudFormation resource type. Preserve those facts during generation where the selected AWS model supplies them.

The [CloudFormation generation guide](../../refs/smithy/docs/source-1.0/guides/generating-cloudformation-resources.rst) documents the `cloudformation` build plugin from `software.amazon.smithy:smithy-aws-cloudformation`. Its Java API, `CfnConverter.convertToNodes(model)`, exports schemas for resource declarations annotated with `aws.cloudformation#cfnResource`. The service setting selects the Smithy service to export. The converter's extension interfaces allow additional schema conversion rules. Its input must already contain the resource declarations and annotations that establish those rules. The checked SQS, S3, and SNS models have zero resource declarations and zero cfnResource annotations, so this exporter cannot derive their resource lifecycles from the operations alone.

## Use the CloudFormation CLI for provider development

The [CloudFormation CLI guide](../../refs/cloudformation-cli/README.md) describes `cfn init`, `cfn generate`, `cfn validate`, and `cfn test`. These commands create a provider project, generate language models and handler stubs, validate its resource schema, and test the implemented handlers. Provider development also includes packaging and registration. Registering a provider is a separate operation that changes the AWS account.

The CLI's [development guide](../../refs/cloudformation-cli/doc_source/resource-type-develop.md) requires the provider author to implement the service calls inside those handlers. Its [stabilization guide](../../refs/cloudformation-cli/doc_source/resource-type-develop-stabilize.md) describes translating resource properties into requests, chaining calls, handling failures, and waiting for the desired state. These are requirements for native Nomoss lifecycle execution too. Its [handler requirements](../../refs/cloudformation-cli/doc_source/resource-type-test-contract.md) define success as reaching the declared state and preserving resource identity.

Use the CLI's handler requirements when evaluating native lifecycle support. Creation must preserve identity and idempotency, updates must apply the declared values, reads must distinguish absence from failure, and deletion must establish absence. Integration tests must observe those results and saved state through Nomoss services. A source permission list identifies allowed calls; the handler implementation supplies their sequence and property translations.
