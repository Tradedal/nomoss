# Generate AWS resource declarations

Generated Cloud Control declarations let applications configure Registry-defined properties and connect resources through typed output references. Each module also exports an output catalog, such as QueueOutputCatalog, that identifies the source fields and Registry identity metadata used by generation. Import a resource directly through its package path, such as nomoss/providers/aws/cloud-control/sqs/queue. Package export patterns resolve the generated module without an aggregate resource index.

Select the Queue Registry schema and relationship file recorded in the [resource source manifest](../awsServiceResources/sources/resources.json). Regenerate the queue from the repository root:

```sh
yarn generate:aws-resource-definition \
  refs/aws-cdk-service-spec/sources/CloudFormationSchema/us-east-1/aws-sqs-queue.json \
  refs/aws-cdk-service-spec/sources/OobRelationships/relationships.json \
  src/providers/aws/cloudControl/resources/generated/sqs/queue/index.ts
```

The generated declaration must preserve the Registry's property classifications and defaults. ResourceCatalogs selects the output fields and their schemas, which Effect compiles into validators. The emitter constructs the declaration, output references, and catalog together through TypeScript AST operations. If a selected output is absent from the Registry properties, the generator stops before it publishes files so the command cannot publish a declaration with an invalid output reference.

Later Cloud Control requests use the resource's saved type and returned Identifier. The Registry's identity paths describe fields inside the provider model, and the catalog and resource annotation preserve those paths. If a resource has no read-only properties, its generated output schema declares no fields. Nomoss still retains the full provider JSON model in observations and saved state so reads do not lose provider data.

The [resource mapping specification](../../docs/application/resource-mapping.md) defines how generation preserves Registry property constraints and identity rules for declarations, provider reads, and saved state. The [generation architecture](../../docs/application/generation-architecture.md) explains how lifecycle services use the generated contracts to resolve dependencies and validate provider results. Snapshot tests compare fresh Queue metadata with QueueOutputCatalog, and the existing AWS workflow verifies event delivery and teardown through the generated declarations.
