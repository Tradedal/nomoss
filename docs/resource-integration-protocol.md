# Effect-Native Resource Integration Protocol

## Problem statement

Cross-resource relationships need values, permissions, configuration, and lifecycle ordering from more than one resource. A direct implementation for every source and destination pair grows as a source-by-destination matrix and repeats the same policy and graph logic across pair-specific modules.

The protocol separates source configuration, destination contribution, permission placement, and graph ordering. A new resource implements the role it performs in a relationship contract. Existing implementations for the other role remain unchanged.

## Scalability requirement

A relationship contract supports a set of source types and a set of destination types. Supporting `S` source types and `D` destination types requires at most `S` source implementations and `D` destination implementations for that contract. The protocol does not require `S × D` pair implementations.

Adding a destination to an existing relationship contract must not require changes to source implementations. Adding a source to an existing relationship contract must not require changes to destination implementations.

A relationship contract represents one interaction, such as event delivery. It is not named for a resource pair.

## Required contracts

### Relationship contract

Each relationship contract defines these types:

- **Source reference parameter**: the concrete source reference type accepted by a source implementation.
- **Destination reference parameter**: the concrete destination reference type accepted by a destination implementation.
- **Source context**: the source values a destination needs to place permissions, such as a source ARN or account identifier.
- **Contribution result**: the destination values the source needs for provider configuration, plus property dependencies and explicit prerequisites.
- **Relationship identity**: a stable key used for planning, diff, update, and removal.

The contract defines relationship data and typed resource references. Provider request objects remain in the provider service that sends the request.

Every public data contract has an Effect `Schema` definition.

### Source service

A source service implements one relationship contract for one source resource type. It must:

- derive the contract's source context from the typed source reference;
- invoke any destination implementation accepted by the relationship contract;
- translate the contribution result into source provider configuration;
- add property dependencies and explicit prerequisites to the resource graph;
- assign the relationship identity to every managed configuration entry.

The source service may depend on the relationship contract and services for its source resource type. It must not import destination resource modules, dispatch on destination types, or contain destination provider request types.

### Destination implementation

A destination implementation provides one destination resource type for one relationship contract. It must:

- accept the source context defined by the relationship contract;
- expose the typed destination values required by the contract;
- request every permission required for the source to use the destination;
- return all permission actions as explicit prerequisites;
- produce the same relationship identity and contribution result for equivalent decoded inputs.

The destination implementation may depend on the relationship contract and services for its destination resource type. It must not import source resource modules, dispatch on source types, or contain source provider request types.

### Resource policy

The resource-policy contract adds a policy statement to a typed resource reference and returns the graph action that applies the policy.

Each resource type that supports a resource policy provides one resource-specific implementation. Grant logic calls this contract and does not reconstruct provider policy requests.

This contract corresponds to CDK `IResourceWithPolicyV2`.

### Encrypted resource and KMS grants

The encrypted-resource contract returns the typed KMS key reference configured for a resource. The KMS-grants contract adds the required key permission and returns the graph action that applies it.

Grant logic uses these contracts when a relationship requires access to a customer-managed key. The returned KMS action becomes a prerequisite of the source configuration.

These contracts correspond to CDK `IEncryptedResource`, resource-specific grant Facades, and `grantOnKey`.

## Effect mapping

Source services, resource-policy services, encrypted-resource services, and KMS-grant services are Effect services.

Destination contributions are ordinary Effects exposed by destination services. Their requirements remain visible to the source call until the application Layer graph provides them.

Provider Layers supply resource-specific service implementations. Test Layers supply the same contracts for conformance tests.

Service methods use inferred Effect channels. Manual `Effect.Effect`, `Layer.Layer`, channel aliases, assertions, and `any` do not form part of the protocol.

Base resource types contain identity, desired properties, and typed outputs. Relationship methods reside in the source and destination services defined by this protocol.

## Graph requirements

Each contribution must declare these graph relationships:

- typed destination outputs used by source configuration;
- resource-policy actions required before source configuration;
- KMS-grant actions required before source configuration;
- a stable relationship identity for the configuration and permission entries created by the contribution.

The source service must add every declared property dependency and prerequisite to the resource graph. The core lifecycle uses that graph for apply and reverse destroy order.

Equivalent contribution inputs must produce the same relationship identity and contribution result. Two contributions with the same relationship identity and different content produce a tagged conflict error.

A destination that cannot place a required permission produces a typed permission error and no contribution result.

## Enforcement

Every relationship contract has a shared conformance suite.

Source conformance tests must prove that one source implementation accepts at least two destination implementations through the same contract and adds their property dependencies and prerequisites to the graph.

Destination conformance tests must prove stable contribution results, complete permission prerequisites, and typed failure when permission placement is unavailable.

Graph conformance tests must prove that permission actions precede source configuration and that the same dependencies produce reverse destroy order.

Type tests must reject a destination from a different relationship contract. Schema tests must reject invalid public contract data.

Import rules must reject destination resource imports from source implementations, source resource imports from destination implementations, and provider request imports from relationship contracts.

API checks must reject relationship methods on base resource types. Lint rules must reject manual Effect channels, assertions, and `any` in protocol services.

Protocol acceptance requires two materially different proving relationships. The second relationship must reuse the same contract roles and shared permission contracts while adding resource-specific implementations only.

## S3 object-created notifications to SQS

The first proof assigns these roles:

- `BucketNotifications` implements the source side of the event-delivery contract for S3.
- `QueueNotification` implements the destination side of the same contract for SQS.
- The queue ARN is a typed destination value and creates the queue-to-notification property dependency.
- The queue resource-policy implementation adds permission for S3 message delivery.
- The queue-policy action is an explicit prerequisite of the bucket-notification action.
- A required KMS grant adds another prerequisite for a queue using a customer-managed key.

The proof must add a second event-delivery destination without changing `BucketNotifications`. It must also exercise the second proving relationship required by protocol acceptance.
