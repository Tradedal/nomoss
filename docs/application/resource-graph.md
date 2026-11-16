# Resource graph

Applications declare resources through provider.Resource(props) and pass related resource entities directly in the appropriate properties. Nomoss must determine which resources depend on those entities and obtain the values needed by each provider request. Applications must not register internal schemas or choose output fields to establish those relationships.

The core validates entity types and records their dependencies and request mappings, including inside objects and arrays. Generated Stripe declarations use that contract at resolved relationship paths. AWS declarations still need generated entity inputs, and unresolved provider relationships retain their existing value schemas.

## Resource entities

A declaration must return a resource entity with a stable declaration identity and a resource type that identifies its provider. The declaration's canonical schema must define its properties and preserve provider metadata through Effect annotations so command dispatch can select the responsible provider. Nomoss must validate those properties and metadata before it accepts the resource into the graph.

A relationship's reference schema must accept a resource entity and restrict it to the resource types allowed by that relationship. TypeScript input types and runtime validation must enforce the same restriction. Validation must check the entity against the registered source resource, so a claimed type cannot authorize a reference to a different resource. An ID, ARN, or scalar output reference cannot satisfy an entity relationship. Ordinary output APIs remain available for application values.

AWS property and output schemas must follow CloudFormation Registry. AWS requests must follow the Smithy-derived contracts described in the [AWS resource specification](aws-resource-lifecycle-management.md). All providers must supply their relationship contracts to the same core model so applications can relate compatible entities across providers.

## Relationships and request values

Each relationship contract must retain its allowed resource types, the destination property path, and the mapping from a source resource's applied state to the required request value. Provider metadata owns that mapping. Applications supply the related entity without choosing the field that represents it in a provider request. Mappings must support the shapes and number of values required by the provider contract; the core must not assume that every relationship resolves to one string identifier.

Nomoss must recognize entity relationships inside objects and arrays through the same contract as direct property relationships. It must record each dependency and encode a serializable reference to the source entity. It must not traverse or copy that entity's properties and object graph into the dependent declaration.

Execution must wait for the source resource to apply, validate its provider state, and obtain the mapped request values. The completed request must then pass the schema for the dependent provider operation. Missing sources, incompatible resource types, unresolved mappings, and invalid values must fail before the dependent mutation. The [output contract](resource-outputs.md) describes validation of provider values and application output reads.

Some operations must wait for another resource without consuming its values. Explicit prerequisites must express those ordering requirements. Effect's directed graph must retain both those prerequisites and entity relationships so the planner and executor use the same dependencies.

## Prepared stacks and plans

A prepared stack must retain an immutable snapshot of the resources and dependencies declared for that run. An application may prepare another stack before it executes the first, and the first stack must keep its own graph.

Each stack preparation must start with an empty graph and serialize declaration work. A failed or interrupted declaration must leave no partially registered resources available to a later run. Declaration, planning, execution, and output resolution must use the same application Layer graph and registered schemas.

The planner must compare the desired configuration with the last applied state and group actions by dependency order. Relationships may remain unresolved before a source resource exists. A change or replacement of that source must cause Nomoss to reconsider dependent request values. Apply must resolve them against the current validated state of the source immediately before the dependent provider operation.

## Saved state and recovery

Saved state must preserve applied nodes and lifecycle records under the canonical [state schemas](../../src/core/state/resourceState.ts). It must also retain the entity references and request mappings needed to interpret relationships after a reload. A saved relationship must remain distinct from the provider value obtained during a previous apply, so recovery can resolve the current source identity.

ResourceStateStore must validate reads and encode writes through Effect's KeyValueStore schema support. File storage keeps one JSON document per stack under .nomoss/state. Tests must use the same state service with an in-memory KeyValueStore. Secret outputs must follow the configured secret-storage policy.

During reconciliation, Nomoss must use saved provider identifiers to read managed resources. Returned values must pass the registered output schemas before they become saved state or inputs to dependent requests. Cloud Control requires its saved opaque Identifier as well as the resource type.

## Acceptance

Core acceptance must exercise declarations through production graph, planner, resolver, lifecycle, and state services. Compatible entities must establish dependencies; incompatible entities must fail even when their eventual identifiers share a scalar type. The same behavior must hold for relationships across providers and inside objects and arrays. A mapping that needs several values must retain its complete request shape.

The evidence must also cover saved references after a reload, source replacement, and recovery after failure. Dependent mutations must use the current validated source state and stop when a required value cannot resolve. Successful registration or scalar output forwarding alone cannot establish entity relationship support.
