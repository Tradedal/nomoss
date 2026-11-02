# Resource graph

Applications must be able to declare resources that need values from other resources before those values exist. For example, an SQS queue can use a KMS key's ARN for encryption. Nomoss must apply the key before the queue and use the ARN returned by AWS when configuring the queue. The resource graph describes these dependencies so the application does not have to arrange provider calls itself.

## Resource declarations

A declaration describes the resource the application wants to manage. Nomoss needs to know which provider handles it, what type of resource it is, and whether its properties are valid. The resource schema must carry the provider and resource type in Effect annotations, and registration must validate that information together with the declared properties.

AWS declarations must follow the resource properties and outputs defined by CloudFormation Registry. Requests to AWS must follow the Smithy-derived contracts described in the [AWS resource specification](aws-resource-lifecycle-management.md). These contracts must remain available during planning and execution so every service interprets the same resource consistently.

## Dependencies and output values

An application connects resources by passing an output reference as an input to another declaration. That reference identifies the resource that will produce the value and the output to read from it. References inside objects and arrays must establish the same dependencies as references used directly as properties.

Before applying a dependent resource, Nomoss must obtain the required values from resources already applied and validate them against their output schemas. Declaration and execution must share one ResourceModel instance so the schemas registered by the application are available when provider results arrive. The [output API](resource-outputs.md) explains how applications declare these references and read values after apply.

Some operations need to wait for another resource without consuming one of its outputs. The graph must also support these explicit prerequisites. Both kinds of dependency belong in Effect's directed graph model and determine the order in which actions may execute.

## Preparing and planning a stack

A prepared stack must keep the resources and dependencies declared for that run. An application may prepare another stack before executing the first; doing so must leave the first stack's graph unchanged. Plans therefore require immutable graph snapshots.

Preparation must begin with an empty graph and allow only one declaration to run at a time. A failed or interrupted declaration must clear its partially registered resources so they cannot appear in a later run. Declaration, planning, provider execution, and output resolution must use the same application Layer graph.

Planning compares the declared properties with the last applied state and groups the required actions by dependency order. Output references may remain unresolved while planning. Execution must replace them with validated values immediately before the dependent provider operation.

## Saved state

Later commands need to find the resources already managed by the stack and understand any unfinished operation. Saved state must preserve applied resource nodes and lifecycle records according to the canonical [state schemas](../src/core/state/resourceState.ts). ResourceStateStore must validate reads and encode writes through Effect's KeyValueStore schema support.

File storage keeps one JSON document per stack under .nomoss/state. Tests must use the same state service with an in-memory KeyValueStore so storage validation and lifecycle behavior remain the same. Outputs marked as secret must follow the selected secret-storage policy when saved and restored.

During Cloud Control reconciliation, Nomoss must use the saved provider identifiers to find resources in AWS. Returned outputs must pass the schemas registered by the application's declarations before they can become saved state or inputs to another resource.
