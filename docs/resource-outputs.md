# Resource outputs

An SQS queue can use a KMS key's ARN for encryption. When you declare the key in Nomoss, the declaration returns a reference to its Arn output. During apply, Nomoss reads the ARN from the key's applied state and puts that value into the queue's creation request.

Generated declarations return these references for their output properties. Each reference records the resource key and the name of an output. The provider supplies the actual value when Nomoss applies the resource. ResourceModel stores the generated output schema and uses it to check values returned by the provider.

## Declaring dependencies

Declare the source resource first, then pass its output reference to the resource that uses it. The input's generated schema must accept references. In this example, the queue takes the key's Arn reference as its KmsMasterKeyId:

```ts
const key = yield* registerKey({
  key: { logicalId: "EncryptionKey" },
  props: {},
});

const queue = yield* registerQueue({
  key: { logicalId: "Queue" },
  props: {
    QueueName: "application-queue",
    KmsMasterKeyId: key.outputs.Arn,
  },
});
```

ResourceGraphBuilder finds references in the declared props, including references inside JSON objects and arrays. It records a dependency for each one. ResourcePlanner uses those dependencies to order the resources, so the key is applied before the queue. The source resource must already be registered when ResourceGraphBuilder registers a resource that refers to it.

The registration methods and resource contracts are exported from `nomoss/providers/aws`. ResourceDeclaration and ResourceOutputReferences are exported from `nomoss/core`. The generator uses Registry relationship metadata to determine which AWS inputs accept references. Inputs that accept JSON can also contain references. Generated output references currently name top-level output properties.

Some provider declarations need an initial input value when they register a resource. ResourceGraphBuilder.resource(key).dependsOn(reference, path) records where apply should replace that value with an output from another resource. The path contains object property names and decimal array indexes. For example, `["Tags", "0", "Value"]` selects the first tag's value. An empty path selects the complete props value. A period in a property name is part of the name.

When a declaration needs to read an initial output immediately, it can call valueFrom(reference, path, schema) or stringFrom(reference, path). These methods read and validate the value, then record the dependency for apply. They record it only if the read succeeds. Generated AWS declarations initially have no output values, so their consumers pass references and wait for apply to resolve them.

## Reading applied values

After apply, use ResourceOutputResolver.resolveOutput(reference, resources, schema) to read an output value. Pass the applied resource nodes and a schema for the value you expect. The resource nodes can come from ResourceStackLifecycle.apply, ResourceStateStore.loadResources, or reconciliation. If the schema needs services to decode a value, provide those services when running the returned Effect.

```ts
const lifecycle = yield* ResourceStackLifecycle;
const resolver = yield* ResourceOutputResolver;
const prepared = yield* lifecycle.prepare("application");
const applied = yield* lifecycle.apply(prepared);

const queueUrl: string = yield* resolver.resolveOutput(
  queue.outputs.QueueUrl,
  applied.resources,
  Schema.String,
);

return queueUrl;
```

ResourceModel.decodeOutputs(node, schema) reads all outputs using the supplied schema. To read one field, call ResourceModel.decodeOutput(node, property, schema). It first checks the outputs against the schema registered for that resource, then reads the field and decodes its value with your schema.

ResourceGraphStore.outputValue(key, property, schema) uses the same field validation to read an initial output from the declaration graph. That graph contains the values supplied when resources were registered. Read provider results from applied resource state. These services and their tagged failures are exported from `nomoss/core`.

## Validation and failures

An output read fails with ResourceOutputResolutionMissing if the source resource is missing or its outputs do not contain the requested field. The error includes the source logical id and output name. A generated schema may allow an output field to be absent, but a read of that field still requires a value.

ResourceModel must have the resource's output schema before it can validate provider results. If the schema has not been registered, the operation fails with ResourceOutputSchemaMissing. Invalid provider outputs and values that fail the caller's schema produce SchemaError.

ResourceOutputResolver.resolveNode(node, resources, dependencies) copies values from applied resources into the supplied node's props. It uses only property dependencies that target that node. Each target path must already exist. If a path is missing, the operation fails with ResourceOutputPropertyPathInvalid and reports the resource and path. The returned node keeps its provider identifier, metadata, and outputs. Prerequisite edges determine execution order and require no property replacement.

ResourceStackLifecycle resolves the props for each create or update immediately before calling ResourceCommandPolicy. Planning can leave a reference unresolved while its source resource still needs to be created. If apply cannot resolve a reference, it records the failure before calling the dependent resource's provider. Provider policies use ResourceModel.withOutputs to validate results from reads and mutations before saving the updated nodes.

Resource declarations register output schemas in ResourceModel. Provider execution, output resolution, and state services must use that same ResourceModel instance so those schemas are available when saved nodes are read. [The queue runtime](../examples/queue/runtime.ts) shows how the application shares these services through one Layer graph. The [resource graph contract](resource-graph-mvp.md) describes planning and persistence. The [AWS resource specification](aws-resource-lifecycle-management.md) defines the requirements for generated contracts and Cloud Control execution.
