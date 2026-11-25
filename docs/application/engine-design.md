# Nomoss engine design

The engine contract lets applications pass resource entities directly to provider.Resource(props), inspect the proposed changes, and read validated outputs after apply. Nomoss resolves dependencies and provider request values in the same Effect runtime that owns saved state.

## Resource dependencies

A declared entity identifies its resource type and has a stable declaration identity. Nomoss checks its type against the relationship contract and its identity against the registered source. An incompatible resource fails validation even if its provider ID has the expected scalar type.

Provider metadata defines how a related entity supplies a request value. Nomoss retains the reference until the source applies and then reads its validated state. The application passes the entity itself. The contract covers cross-provider references, nested objects and arrays, and requests that need several source values.

An explicit prerequisite orders resources even when they share no output value. The graph retains prerequisites and entity relationships with each resource's properties and schema. Lifecycle operations restore and publish applied values in memory, so a typed output read requires no storage access.

## Plans and resource identity

The plan identifies the proposed action for each resource and the outputs available after success. It accounts for desired configuration, saved state, and current provider observations. Dependencies determine execution order.

A change requires an accepted mutation identity in the selected AWS account and region. A saved provider identifier identifies the object on subsequent calls. Import requires an external identifier and an adoption policy. Discovery or tags establish identity only where the provider contract permits it. An existing object without an accepted identity produces an import conflict.

The planner uses generated mutability metadata and provider semantics to decide when to replace a resource. It can create the successor first only if both identities can coexist. The provider defines which values Nomoss saves to recover an interrupted replacement.

## Provider capabilities

Cloud Control provides the generic lifecycle for supported AWS types. A provider service that needs additional AWS operations calls their generated Smithy contracts through the internal client. [AWS resource contract](aws-resource-lifecycle-management.md)

Public service methods let a lifecycle compose provider capabilities. Each capability defines schemas for its data and returns typed failures that explain unsuccessful calls. Layers supply the dependencies those methods require. [Effect development contract](../development/effect-native-development.md)

## Execute a plan and recover unfinished work

Apply executes the reviewed plan in dependency order. Dependent actions wait for successful prerequisites and validated outputs. Independent creations and updates run in parallel by default, up to an optional application limit. Removals run sequentially in reverse dependency order.

After a successful provider operation, Nomoss saves its validated outputs and identity. On failure it saves the action's progress and cause. A resumed run validates those records and reads current provider state before it selects another change.

Each provider defines how long to retain generated physical names and recovery data that AWS may omit on a later read. The lifecycle contract governs their persistence and reconciliation. [lifecycle contract](resource-lifecycle-tracker.md)

Provider work shares the lifetime of the caller's Effect. Interruption stops local work. A request AWS has already accepted needs explicit cancellation. The live progress contract calls for typed updates and elapsed time from Effect in the shared runtime. The renderer stops with the command. Full live progress support remains unfinished.

## Application API

The public API covers the application stack lifecycle, from declaration and plan review through apply and teardown. Each export requires an implementation with evidence from production consumers and tests.

The core validates related resource entities, retains their request mappings in saved state, and obtains current source values before dependent mutations. Generated Stripe inputs enforce resource types at resolved relationship paths. AWS entity inputs and unresolved provider relationships remain unfinished, so applications cannot assume that every generated property supports this workflow.

Each resource needs a contract that identifies which Cloud Control operations it supports. The contract also establishes identity across execution contexts so Nomoss can adopt the intended object, recover after interruption, and destroy only the object it owns. Those decisions remain open for resource types without such a contract.
