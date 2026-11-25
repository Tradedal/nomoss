# Resource graph

An application declares a resource with provider.Resource(props) and passes its entity to any declaration that depends on it. Nomoss registers the schema and determines which outputs the dependent provider request needs.

Core records dependencies and request mappings for entities at any supported property path, even inside an array. Generated Stripe declarations use this contract wherever discovery resolves the target. AWS entity inputs remain incomplete. Unresolved relationships keep their existing value schemas.

## Resource entities

Each declaration returns an entity with a stable identity and a provider-qualified resource type. Effect annotations on its canonical property schema identify the provider responsible for commands. Nomoss validates the properties and metadata before it registers the entity.

A reference schema restricts a relationship to compatible resource entities. TypeScript and runtime validation enforce the same type restriction. Nomoss also verifies the registered source, so a claimed type or a scalar identifier cannot stand in for the required entity. Applications can read ordinary outputs separately.

CloudFormation Registry governs AWS resource properties and outputs. Smithy governs AWS requests. Every provider supplies its relationship contract to the same core model so applications can connect compatible entities across providers. [AWS resource specification](aws-resource-lifecycle-management.md)

## Relationships and request values

Provider metadata defines which source types a property accepts and how their applied outputs supply its value at the destination path. The application supplies only the entity. A request can require several source outputs or a structured value.

Direct and nested references follow the same rules. Nomoss records a dependency and saves a reference to the source. The source's own properties stay with its declaration.

After the source applies, Nomoss validates its state and resolves the dependent request. A mutation proceeds only if the source exists, its type is compatible, and the resolved values satisfy the provider operation schema. [output contract](resource-outputs.md)

An explicit prerequisite orders operations that share no output value. The planner and executor read these prerequisites and entity dependencies from the same Effect directed graph.

## Prepared stacks and plans

A prepared stack keeps an immutable snapshot of its declarations and dependencies. An application can prepare another stack and still execute the first with its original graph.

Nomoss evaluates declarations serially, with an empty graph for each preparation. A failed or interrupted declaration releases partial registrations. The application uses one Layer graph and schema registry throughout the stack's lifetime.

The planner compares desired resources with the last applied state and orders changes by dependency. A new source may have no provider identity yet. If a source changes or moves to a replacement, apply resolves its current validated outputs immediately before the dependent request.

## Saved state and recovery

The canonical state schemas preserve applied nodes and lifecycle records. Saved entity references retain their request mappings separately from previously resolved values. After a reload, recovery can therefore resolve the current source identity. [state schemas](../../src/core/state/resourceState.ts)

ResourceStateStore uses Effect's KeyValueStore schema support to validate reads and encode writes. File storage keeps one JSON document per stack under .nomoss/state. Tests use the same service with an in-memory KeyValueStore. The configured secret store governs protected outputs.

Reconciliation reads each managed object by its saved provider identity. Only values that pass the registered output schema can enter saved state or a dependent request. Cloud Control requires both the resource type and its opaque Identifier.

## Acceptance

Acceptance covers entity declarations through the production stack runtime. Compatible entities establish dependencies across providers and inside nested objects or arrays. An incompatible entity fails even if it would produce the same scalar type. A multi-value mapping preserves the complete request shape.

After reload, source replacement, or failure recovery, a dependent mutation uses the current validated source state. If a required value is unavailable, the mutation stops. Acceptance exercises the dependent request itself.
