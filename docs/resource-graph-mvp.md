# Resource Graph Specification

## Direction

Nomoss models infrastructure as Effect programs that produce schema-bound resource graph nodes. The graph records resource identity, dependency edges, ordering, and query data. Resource behavior runs through Effect services and layers.

AWS is the first provider target. Distilled AWS schemas define AWS operation payloads. Nomoss binds those schemas to resource definitions, graph nodes, persisted state, plan inputs, and execution results.

## Schema Binding

Every resource has real schemas for its supported operations. For AWS, create, read, update, and delete payloads use Distilled schemas where they exist, such as `S3.CreateBucketRequest`, `SQS.CreateQueueRequest`, and `S3.PutBucketNotificationConfigurationRequest`.

Graph and state records store schema-encoded resource data. Decoding uses the schema bound to the resource node or state record.

The an Effect application Amplify metadata pattern is the reference design: schemas carry metadata, runtime reads metadata from the schema, decodes that metadata through a schema, and uses the same schema path to decode and validate payloads. Nomoss applies the same principle to Distilled resource schemas.

## Graph Model

If Effect `Graph` supports structured node values, the graph node value carries schema-bound resource data directly. Strings are reserved for stable resource labels, Graph-required identifiers, CLI output, and Mermaid rendering.

A resource graph node represents stable resource identity, schema-bound desired props, schema-bound outputs or output refs, operation metadata derived from the bound schema, and dependency edges produced by consuming resource outputs.

The graph is extensible across AWS resource types. Adding a resource type adds schemas and lifecycle behavior without rewriting graph storage.

## Lifecycle

Planning reads desired graph data and hydrated state data through their bound schemas. Create, update, delete, destroy, and refresh decisions are made from decoded schema-valid values.

Execution uses Effect services supplied by provider layers. Parallel execution is derived from graph dependency batches: independent nodes in the same batch may run with `Effect.all(..., { concurrency: "unbounded" })`; dependent batches run after their prerequisites.

State persistence stores schema-encoded resource records plus the schema binding required to decode them on hydration. Hydration validates persisted state before reconciliation.
