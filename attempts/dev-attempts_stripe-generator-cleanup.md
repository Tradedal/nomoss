# Stripe generator cleanup

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Restore native Effect schema emission and group generated Stripe contracts for application consumers. The [unified resource generation tracker](dev-attempts_unified-resource-generation.md) owns catalog-wide resource management.

## Direction

Preserve native CodeDocument.Type and CodeDocument.runtime. When a grouped model's initializer would read an uninitialized schema during import, generation may defer that initializer through Schema.suspend. It must keep the compiled expression intact and retain concrete catalog Struct fields. Declaration input modules must retain their initialization policy. Custom schema suffixes, copied payload types, recursive type rewrites, and substitute provider errors remain excluded.

The production command publishes the full supported API. Focused selections exercise selected operations during development.

## Completed work

- [x] The command and fixture share one Layer graph. The production command generates the full supported API, while focused callers may select operations before discovery and compilation. The loader verifies pinned source and applies declared corrections.

- [x] Effect's CodeDocument supplies public types and runtime validators, including recursive types, native descriptions, and provider error schemas. Shared models use manifest-selected families. Grouped initializers defer only when they depend on uninitialized models. Catalog roots retain Struct fields and declaration inputs retain their own initialization policy.

- [x] Clients publish operation descriptors and native input, success, and error contracts together. Catalogs retain source order, distinct provider resource names, and issues on unresolved resources. Generated clients accept declaration properties, validate resolved creation inputs before invocation, and use saved identifiers for reads. Artifact coverage includes ordinary and recursive models.

- [x] Customer deletion verifies the saved identity, Product uses deactivation, and Price replacement retires the prior price and releases its lookup key before creation. Webhook rotation retained a specialized policy in this phase. These resources and billing exports shared the stack graph. The [generated resource management tracker](dev-attempts_generated-resource-management.md) records the subsequent lifecycle changes.

- [x] Application integration cases exercise single and multiple offers and exported configuration through production declarations. Their fixture owns unique names, output paths, and scoped cleanup. Failed teardown preserves local state, and the export case requires a signing secret before checking that reconciliation retains it. [Generation architecture](../docs/application/generation-architecture.md)

## Tasks

No separate work is assigned here. Continue through the [unified resource generation tracker](dev-attempts_unified-resource-generation.md).
