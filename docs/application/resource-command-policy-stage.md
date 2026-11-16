# Resource command policy

The stack lifecycle must express each resource read or mutation through the command schemas and dispatch it to the registered provider policy. That policy executes the resource-specific behavior and returns an outcome that core services can validate and save. Core services determine dependency order and collect those results for the application.

## Requests and outcomes

A command must identify the resource through its stable key and schema metadata so it reaches the provider policy registered for that resource. A missing policy or an unsupported command must produce a tagged failure that the caller can handle.

The [resource model](../../src/core/resource/model.ts) and [lifecycle model](../../src/core/resource/lifecycle.ts) define the shared data. A provider read must describe what was found through ResourceObservation. The planner must express the action selected from desired, saved, and observed state through PlanDecision. Execution must provide ResourceCommandResult so reconciliation, output resolution, and persistence can use the same outcome.

## Resource dependencies

Applications must be able to pass a resource entity directly into a relationship input. The relationship contract must identify the allowed resource types and define which values the dependent provider request needs. Nomoss must validate the entity against that contract and the registered source resource before it accepts the dependency.

Before a dependent mutation, Nomoss must obtain the mapped values from the source resource's validated applied state. The completed request must pass the provider operation schema. A missing source, incompatible resource type, unresolved mapping, or invalid value must stop the dependent mutation. Core execution and resolved Stripe inputs provide this entity contract. AWS generation and unresolved provider relationships still require the work recorded in the [resource graph contract](resource-graph.md).

Some resource behavior requires an earlier operation to finish even when no output value is consumed. Provider policies must declare those prerequisites explicitly. The graph must preserve them alongside dependencies established by entity relationships.

## Provider behavior

Generic AWS lifecycle behavior must use generated resource metadata and Cloud Control. Behavior that needs additional AWS operations belongs in an explicit resource policy service. Every AWS invocation must use generated contracts through the internal client described in the [AWS resource contract](aws-resource-lifecycle-management.md).

Each provider capability must have a named public method that callers can compose. The method must keep the validation, decisions, dependency calls, and result for that capability together. Shared domain behavior belongs in composable service methods under the [Effect development contract](../development/effect-native-development.md).

## Plan and execute resource commands

The planner must use provider observations to choose an action for each desired or saved resource. If an application removes a declaration, saved state must still identify the remote object so Nomoss can plan to delete it. The plan must retain the dependencies and provider information required to execute that action.

The executor must follow graph order and run independent actions within the configured concurrency limit. A successful command must provide the validated outputs and provider identity needed by later operations. If a command fails, the executor must preserve its tagged failure and stop dependent actions.

Provider policies must receive validated domain values. State reads must decode saved data, and writes must encode it. Both operations must apply the secret-output rules in the [resource lifecycle specification](resource-lifecycle-tracker.md).

## Application use

CLI and embedded applications must receive the same lifecycle and provider behavior. Both must be able to inspect a plan before they apply changes. An application that contacts AWS requires its chosen provider configuration and Layers; an application that inspects a local declaration graph requires only the services used for that inspection.

Terminal presentation must display the decisions and results supplied by lifecycle services. The planner and provider policies must continue to choose resource actions while the CLI reports their progress.
