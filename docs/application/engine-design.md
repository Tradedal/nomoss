# Nomoss engine design

Applications declare infrastructure through provider.Resource(props) and pass related resource entities directly in those properties. Nomoss must validate the relationships, determine dependencies, and obtain the values that provider requests require. The application must be able to inspect a plan before Nomoss applies it and read validated outputs afterward. Declarations, execution, and saved state must share one Effect runtime.

## Resource dependencies

A declared resource must be an entity with a stable declaration identity and a resource type. A relationship input must accept entities of the resource types allowed by its contract. Nomoss must check both the entity's declared type and the registered resource it identifies. An unrelated entity must fail validation even when its provider identifier has the same scalar type as the expected value.

Provider metadata must define how a related entity supplies the values needed by a request. Nomoss must retain that relationship until the source resource has applied, then obtain the mapped values from its validated provider state. Applications must not select an ID, ARN, output field, or separate reference object to establish a resource relationship. The core contract must support relationships across providers and inside objects and arrays. It must also support mappings that require several values.

One resource may need to execute before another even when no value passes between them. Explicit prerequisites must cover those cases. The graph must retain entity relationships and execution prerequisites, together with the declared properties and schemas needed to interpret each resource. Applications read known provider values through ordinary typed output properties. Lifecycle operations restore and publish those values without persistence work during property access.

## Plans and resource identity

A plan must account for the desired configuration, saved records, and current provider observations. The application needs to know what action is proposed for each resource and which outputs will be available after it succeeds. Resource dependencies determine the permitted execution order.

Nomoss must have an accepted identity before it changes a resource in the selected AWS account and region. Saved provider identifiers support later reads and changes. Import requires an explicit external identifier and a defined adoption policy. When discovery or tags establish identity, they must do so under the provider's contract. An existing resource without an accepted mutation identity must produce an import conflict.

The planner must use generated mutability metadata and provider behavior to identify property changes that require a replacement resource. Nomoss may create the replacement before it deletes the previous resource only when their identities allow both to exist. Providers must define what information Nomoss needs to save so it can recover an interrupted replacement.

## Provider capabilities

Cloud Control supplies the generic lifecycle for supported AWS resource types. Some resource behavior needs additional AWS operations. Those operations must remain explicit in the resource's provider service and use generated Smithy contracts through the internal client, as required by the [AWS resource contract](aws-resource-lifecycle-management.md).

Lifecycle operations must be able to compose provider capabilities through public service methods. Each capability needs schemas for its data and typed failures that explain an unsuccessful operation. The [Effect development contract](../development/effect-native-development.md) governs those APIs and the Layers that supply their dependencies.

## Execute a plan and recover unfinished work

Apply must execute the selected plan in dependency order. A dependent resource must wait for successful prerequisites and required outputs, and destruction must reverse that order. The executor must run independent actions concurrently up to the configured limit. It currently runs those actions sequentially.

After a successful provider operation, Nomoss must save the validated outputs and provider identity needed for later commands. If an action fails, the saved record must describe its progress and retain the failure. Before a resumed run chooses another change, it must read current provider state and validate the saved records.

AWS may not return a generated physical name or the information needed to recover an unfinished operation. Each provider must define which of those values Nomoss retains and for how long. The [lifecycle contract](resource-lifecycle-tracker.md) governs persistence and reconciliation.

Provider work must follow the lifetime of the Effect that calls it. Interruption stops local work under the provider contract. An accepted request that remains active in AWS requires explicit cancellation. Operations that take a long time must expose progress to terminal consumers through typed state in the shared runtime. They must measure elapsed time through Effect, and the renderer must stop with the command. Live progress remains unfinished.

## Application API

Applications must be able to declare resources, inspect the desired graph, obtain a plan, apply selected changes, and destroy managed resources. A public export needs implemented behavior and evidence from its production consumers and tests.

The core validates related resource entities, retains their request mappings in saved state, and obtains current source values before dependent mutations. Generated Stripe inputs enforce resource types at resolved relationship paths. AWS entity inputs and unresolved provider relationships remain unfinished, so applications cannot assume that every generated property supports this workflow.

Support for each resource requires a decision about usable Cloud Control operations, identity across execution contexts, recovery, import, and destruction. A resource remains subject to those open decisions until its assigned contract defines the required behavior.
