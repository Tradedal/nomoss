# Resource command policy

The stack lifecycle sends each resource command to its registered provider policy. The policy returns a result that core can validate and save. Core orders commands by dependency and returns their results to the application.

## Requests and outcomes

The resource key identifies the instance, and the provider and type in its schema metadata identify the management definition. A command can use that metadata from saved state after the declaration disappears. If the definition is absent or lacks the requested operation, the caller receives a tagged failure.

ResourceObservation describes what a provider read found. PlanDecision records the action the planner selects from desired, saved, and observed state. ResourceCommandResult gives core one result to reconcile, persist, and expose as outputs. [resource model](../../src/core/resource/model.ts) · [lifecycle model](../../src/core/resource/lifecycle.ts)

## Resource dependencies

Applications pass a resource entity into a relationship property. The contract specifies the allowed source types and which source values the dependent request needs. Nomoss checks both the supplied entity and its registered source before it accepts the dependency.

Before a dependent change, core resolves the relationship against the source's validated applied state and checks the complete provider request. An absent or incompatible source, an unresolved mapping, or an invalid value stops the change. Resolved Stripe inputs use this contract. AWS generation and unresolved provider relationships still need work. [resource graph contract](resource-graph.md)

A provider policy declares an explicit prerequisite when an operation depends on another resource but needs none of its output values. The graph records that dependency alongside entity relationships.

## Provider behavior

The management definition selects provider operations, identifies the owned object, and defines what confirms a change. Shared lifecycle services execute those rules through the provider client. Where a provider requires a decision or sequence specific to a resource, the shared lifecycle calls a typed operation at that step. See the [resource management development guide](../development/effect-native-development.md#develop-resource-management).

A named public service method exposes each provider capability. It accepts domain inputs, owns the decisions that affect the call, and returns a result other services can use. [Effect development contract](../development/effect-native-development.md)

## Plan and execute resource commands

The planner compares each desired or saved resource with its provider observation. When a declaration disappears, the saved identity still identifies the object to delete. The plan retains the provider and dependencies needed for that deletion.

The executor follows dependency order and applies the configured concurrency limit to independent actions. On success it returns the validated outputs and provider identity for later operations. A tagged failure stops dependent actions and retains the cause.

Provider policies receive validated domain values. The state service decodes saved records on read and encodes them on write. Both operations respect the resource's secret storage policy. [resource lifecycle specification](resource-lifecycle-tracker.md)

## Application use

CLI and embedded applications can inspect the same plan and apply it through the same lifecycle. An AWS request needs the application's provider configuration and Layers. Local graph inspection needs only the services that evaluate the declaration.

The terminal displays the plan and reports progress. The planner and provider policies select the actions.
