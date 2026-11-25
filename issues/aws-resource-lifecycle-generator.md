# AWS resource lifecycle generator

## Problem

Issue 19, Effect-native resource integration protocol, established the need for reusable cross-resource integrations and bindings. Those integrations depend on resource contracts that describe properties, outputs, identity, mutability, graph references, and provider execution. Contributors who maintain these contracts manually for each AWS resource would duplicate information already published by AWS.

Nomoss needs a repeatable path from external AWS specifications to resource contracts used by the graph, planner, state store, and provider runtime. Generation must preserve AWS facts, and Nomoss must define its lifecycle decisions explicitly.

## Required behavior

The generator must derive schema-backed resource modules from CloudFormation Registry schemas and relationship metadata. Each module must expose property and output schemas, typed output references, graph registration, and lifecycle hints. Required properties, read-only and write-only values, primary identifiers, create-only properties, and relationships must reach the generated contract without manually copied schemas.

An application must be able to declare a generated resource and pass its output references to other declarations. Generated property-reference metadata must establish the corresponding graph dependencies. Those contracts must remain usable by planning, persisted state, output resolution, and future integration services.

The generic Cloud Control lifecycle service must create, update, read, and destroy supported resources through the normal Effect service graph. Mutations must track accepted requests to completion and read the resource model that AWS returns. The implementation must demonstrate this flow for supported resource types and validate generated metadata, schema decoding, dependency ordering, and provider lifecycle behavior under the [testing contract](../docs/development/testing.md).

## Scope and delivery

The [AWS resource specification](../docs/application/aws-resource-lifecycle-management.md) must explain the external sources, generated contracts, execution path, and lifecycle decisions that Nomoss supplies explicitly. CloudFormation templates, generated resource classes, and Cloud Control do not establish all Nomoss planning or recovery policies.

Resource-specific grants, bindings, integrations, and permission placement remain separate work. CLI interactivity, live progress, and terminal rendering also remain outside this generator task.

The pull request must explain the sources used, the generated resource contract, the Cloud Control execution path, and the demonstrated resource types. It must identify the lifecycle decisions that remain explicit in Nomoss.
