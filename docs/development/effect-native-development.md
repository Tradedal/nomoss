# Develop Nomoss services with Effect

## Expose composable public capabilities

Implement the [planned application API](../application/infrastructure-application-api.md) with registration and preparation handled by Nomoss. Application authors must be able to declare resources, relationships, and returned data through the public stack API.

Execute generated provider operations through Nomoss's internal client under the [cloud resource contract](../application/aws-resource-lifecycle-management.md). Expose public APIs that generated operations and resource services can use to resolve credentials, sign requests, and retry. Reuse the prepared payload and idempotency token on each retry. Make credential resolution and the operation that signs requests independently callable so retries can use refreshed credentials.

Bind a public service method's completed result to a descriptive local name with its domain type, then return that value. For example, ResourceStackOperations.apply uses a `result` value typed as `ResourceApplicationResult<Output>`, which checks the lifecycle result and evaluated outputs. TypeScript still infers the method's failures and required services from the calls that produce that value.

## Validate data through canonical schemas

Validate resource declarations through canonical schemas and provider payloads through generated schemas. After a provider mutation, wait for completion and validate the returned resource before persistence, as required by the [cloud resource contract](../application/aws-resource-lifecycle-management.md). Local copies of generated contracts are prohibited because they introduce separate validation rules for the same provider data.

Generate request schemas, response schemas, and invocation metadata from published Smithy models for the operations covered by that contract. Generated client libraries for the same operations are prohibited in dependencies and generated imports because they would execute those calls through a separate client.

Generate methods, schemas, documentation, and exports together through ts-morph and TypeScript AST operations. Compile the generated schemas through Effect.

## Connect services and manage their lifetimes

Declare services through Context.Service and compose declaration and execution through one application Layer graph. Both operations need the same ResourceModel instance so execution can validate provider values against the schemas registered by the declaration. Output validation fails with ResourceOutputSchemaMissing if a separate instance lacks a schema registered by the declaration.

When the compiler reports a type mismatch, correct the operation that produces the value or the Layer composition that supplies its services. A manual type alias, cast, caller annotation, or handwritten Layer requirement changes the declared type while the absent service remains unresolved, so it is prohibited as a fix.

If an export exposes implementation types that TypeScript cannot name, reduce its returned value to the required public capability and give that value a named domain type, as in the result example above. The Effect.gen body can still determine failures and required services from its calls, so callers receive those types along with the named result. A handwritten Effect.Effect or Layer.Layer annotation would require another description of the operation's failures and service requirements. Those annotations, universal return types for Effect.gen operations, and replacement iterator contracts are prohibited because their handwritten types can diverge from the composed operation.

Let declaration helpers infer their declaration, provider, and state types from the composed services. Repeated type parameters for those services, manually maintained service unions, and empty defaults for Layer requirements are prohibited because they require callers to maintain a separate description of the service graph.

Obtain a user decision before the declaration API requires authors to add registration, permit acquisition, or preparation calls. Follow the [output guide](../application/resource-outputs.md#output-values-after-apply) for the calls required by the current API.

Keep the application scope open through declaration, plan review, and execution. Execute the reviewed plan through the ResourceStackOperations instance that prepared it so the plan uses the declaration's schema registry and state service. The executable or embedded application closes that scope when its work ends. Code that retains arbitrary Layers, reconstructs their requirements, or installs saved contexts for later calls can supply different service instances at execution and is prohibited by the [application service composition contract](../application/infrastructure-application-api.md#effect-service-composition).

Use Layer.buildWithMemoMap when the caller must supply a [Layer](https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Layer.ts) memoization map and an owning [Scope](https://github.com/Effect-TS/effect/blob/main/packages/effect/src/Scope.ts). The map controls service sharing, and the scope owns cleanup. TypeScript infers the returned Effect's failures and required services from the Layer.

Stop the active stream before its replacement starts. Give each stream its own scope and close that scope to stop it, or store the active fiber in service state and interrupt it directly. Apply that cleanup when a change of identity or runtime requires a new stream.

## Compose operations and return typed failures

Keep every operation required for a method's result in the Effect returned to its caller. Use Effect.tap for observations such as log entries that leave the successful result value unchanged. Perform external I/O and process execution through Effect services so the application supplies their implementations and controls their lifetimes. Send program logs through Effect and terminal output through the command renderer that applies the CLI's presentation contract.

Represent provider rejections, transport failures, and invalid responses with Data.TaggedError. Include the affected resource or operation and the provider's failure details so callers can identify the failed work. Decode modeled provider errors through generated contracts, and translate transport and validation failures in internal services into the tagged errors promised by their public methods.

## Run applications through the shared service graph

Run the infrastructure Effect under a stable stack name through the executable's shared application Layers. A later run under that name restores saved resource identities and values before a new plan. Supply provider credentials and configuration, such as the AWS region, through those Layers.
