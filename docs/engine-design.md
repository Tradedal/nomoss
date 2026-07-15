# Nomoss Engine Design

## Purpose

Nomoss is an AWS-first infrastructure engine implemented as a native Effect library. Resource declarations run inside normal Effect programs, outputs flow into later inputs, the engine builds a dependency graph, planning produces data, and apply executes provider actions through services.

The engine is the runtime path that evaluates infrastructure Effects, derives desired resource graphs, chooses lifecycle backends, and applies changes through explicit services.

## Core Model

`Program` is an `Effect` that declares infrastructure and returns outputs. Requirements are ordinary Effect requirements supplied by layers.

`ResourceSpec` is desired infrastructure data: resource type, logical id, props, lifecycle policy, and dependency refs.

`Output` is a typed dependency expression. A resource can expose attributes before the physical value exists; downstream resources consume those expressions as inputs. The planner resolves this expression graph instead of requiring hand-written ordering.

`Provider` is an Effect service for a resource family or backend. Providers implement validation, read, diff, create, update, delete, error translation, polling, and AWS client requirements.

`Engine` is an Effect service that evaluates the program, builds the graph, plans actions, executes actions, and returns evaluated outputs.

## Lifecycle Phases

The engine evaluates the program to collect desired resources, resolves output expressions enough to understand dependency edges, compares desired resources with current state, builds a plan, applies the plan in graph order, and evaluates final outputs.

Each lifecycle phase has explicit data contracts and runs through Effect services and layers.

## Effect Runtime Contract

Every engine operation is an `Effect`. Engine services are `Context.Service` values, and live AWS clients are provided by layers at the executable edge.

Resource declarations and providers depend on services rather than constructors that read process state. Errors are tagged data errors. Provider defects remain defects only when the engine cannot recover by design.

The initial service graph includes engine orchestration, graph building, planning, applying, resource registration, AWS credentials, AWS region, AWS SDK or Cloud Control adapters, and provider-specific state where needed.

## State Strategy

Nomoss uses state only when the provider cannot reconstruct enough information from AWS. Generated physical names, replacement generations, local artifact hashes, and provider migration metadata require Nomoss-managed state.

When AWS can be the source of truth, Nomoss derives identity from deterministic naming, Nomoss tags, and AWS read/list responses. In that mode the provider reports operation progress from AWS and Nomoss persists only data required for later graph reconciliation.

State requirements are part of each provider contract rather than a global engine assumption.

## AWS Lifecycle Backend

AWS Cloud Control API is the generic AWS lifecycle option for resource types with usable schemas and handlers. It supports create, read, update, delete, list, progress polling by request token, and resource-property models.

For supported resources, an `AwsCloudControlProvider` encodes desired props as the AWS resource model, discovers current resources through list/read using deterministic identity and Nomoss tags, diffs desired and current properties, creates resources with idempotency tokens, updates with JSON Patch where supported, deletes by primary identifier, and polls operation progress until terminal state.

Cloud Control reduces the amount of Nomoss lifecycle state needed for resources where AWS already supplies read/list, standardized handlers, idempotency tokens, and progress events. Planning still remains a Nomoss responsibility.

## Direct AWS SDK Backend

Some AWS resources need direct SDK calls because Cloud Control coverage is incomplete, stabilization is custom, or the desired operation is higher-level than one Cloud Control resource.

Direct SDK providers are still Effect-native. AWS clients are services, provider actions return typed Effects, reads are explicit, retries and polling use Effect, and provider state is minimal and justified by the provider contract.

## Planning

Planning combines graph structure with backend selection. It reads the desired resource graph, provider registry, current AWS state from provider reads/lists, and optional Nomoss state for providers that require it.

The output is an ordered action graph containing the backend per resource, dependency edges, replacement decisions, delete ordering, and expected output availability. Diff results are data values such as `Create`, `Update`, `Replace`, `Delete`, `Noop`, and `ImportConflict`.

## Apply

Apply executes the plan as Effect work. Independent branches run with bounded concurrency and dependent resources wait for upstream outputs.

For Cloud Control resources, apply submits the AWS operation, polls progress, reads the resulting resource model, and publishes outputs to downstream nodes. For Nomoss-state-backed resources, apply writes state at the provider-defined recovery points.

Provider actions are interruptible where AWS semantics allow it. A resumed run re-reads AWS state and persisted Nomoss state before choosing the next action.

## Resource Identity And Imports

Nomoss requires explicit mutation identity before changing AWS resources. Taggable resources carry Nomoss app or project, stage, logical resource id, resource type, and schema/provider version tags.

If a deterministic identifier already exists without Nomoss tags, the planner returns `ImportConflict`. Import or adoption can become an explicit operation after the mutation contract is defined.

Resources that cannot be tagged need stricter provider identity rules. The provider contract must explain how the resource is distinguished from external resources before update or delete is enabled.

## Replacement

Replacement is a planner decision. Cloud Control schemas, update failures, and provider metadata can mark fields as replacement-only.

The planner prefers create-before-delete when identifiers allow it and uses delete-before-create when the AWS resource identity forces it. Providers that cannot make replacement recoverable from AWS read/list alone opt into Nomoss-managed state.

## Public API

The first API exposes infrastructure program definition, desired graph evaluation, plan, apply, destroy, and current AWS-backed graph inspection.

Provider-specific convenience APIs wait until the engine contracts are stable. The first implementation should prove one Cloud Control backend and one direct SDK backend so the state contract is exercised in both modes.

## Open Questions

The remaining design questions are Cloud Control coverage for the first proof, deterministic identity across accounts and regions, resources that cannot be discovered safely through list/read, provider metadata required for update-versus-replacement decisions, and destroy behavior from either the current program, Nomoss tag discovery, or both.
