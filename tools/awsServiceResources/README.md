# Generate native AWS resources

The native AWS generators produce resource declarations from the CloudFormation Registry and typed client operations from Smithy. A resource can have a declaration before Nomoss can deploy it. The [AWS coverage reference](../../docs/application/aws-resource-coverage.md) records which resources a stack can deploy. Follow the [resource management development guide](../../docs/development/effect-native-development.md#develop-resource-management) to define a lifecycle.

## AWS source layout

The [AWS provider guide](../../providers/aws/README.md) shows where to find a service's npm package, its stack resource declarations, and the lifecycle code and tests.

Put resource definitions in `providers/aws/management/mappings/<service>/`. Use the standard lifecycle for native create, read, update, and delete operations. Use its association configuration when AWS creates an object before it attaches members, as IAM does for instance profiles. Use the association registration when a declaration manages only memberships and teardown must leave the parent intact, as with IAM group membership.

Put provider code in `providers/aws/management/operations/<service>/` when a shared lifecycle needs provider information that a mapping cannot express. For example, IAM returns an access key's secret only at creation, and a service-linked role deletion returns a task whose status must be checked. The shared lifecycle still manages stack state and confirms the result.

## Generate the declaration

Add the Registry file for the selected region to the resource manifest with its revision and SHA-256 checksum. From the repository root, run the declaration generator. It checks the pinned sources, then writes the declaration and its property, request, and output schemas to `providers/aws/generated/resources/<service>/<resource>.ts`. [Resource manifest](sources/resources.json)

```sh
yarn exec tsx tools/compileAwsServiceResourceDeclarations.ts
```

## Resolve resource relationships

When a property accepts a reference to another resource, Nomoss needs to know which output to use. The relationship metadata identifies that output so the stack can deploy the referenced resource first and pass its value in the request. If the generated module lists an ambiguous choice in its `RelationshipIssues` export, check which output AWS accepts at that property. Record the reviewed choice in the manifest's `relationshipOverrides` and regenerate. The declaration generator prints the location of its import report in the system temporary directory.

## Select the AWS operations

Select the operation in the service manifest and regenerate the client from its pinned Smithy model. The command writes the package's TypeScript entry point. For example, to regenerate `@tradedal/aws-client-iam` from the repository root, run:

```sh
yarn exec tsx tools/compileAwsServiceResources.ts tools/awsServiceResources/sources/iam.json
```

Both generation commands export Effect spans through the shared runtime. Follow the [observability procedure](../../docs/operations/observability-sop.md) and inspect `codegen.aws.client` or `codegen.aws.declarations` in Jaeger.

Use the Registry schema for declared properties and the Smithy operation for request and response members. The generated operation carries the member-name mapping used by the client. The declaration generator uses Registry output metadata to build schemas and output getters. The client generator uses the converted OpenAPI documents during generation and publishes the schemas and metadata needed to execute calls.

## Generate credential exchange operations

Run `yarn generate:aws-credential-clients` from the repository root after changing the [pinned credential models](sources/credentials.json). The command writes the STS, SSO, and SSO OIDC packages in [generated/clients](../../providers/aws/generated/clients/) and the [partition lookup used to resolve AWS addresses](../../providers/aws/client-core/generated/partitions.ts). The [credential package](../../providers/aws/credentials/) calls the generated operations to obtain or renew credentials.
