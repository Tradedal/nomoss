# Compose resource catalog services

## Tracker maintenance [keep this section at the top of every tracker]

Preserve this section unchanged while working on a tracker. Keep the tracker lean as development progresses. Consolidate completed tasks into concise statements of delivered behavior, and combine overlapping tasks into coherent outcomes.

Each task must explain the result to deliver and the behavior that establishes completion. Repository guidance defines how to validate work. Keep validation within the task's acceptance conditions; separate tasks for running checks or recording their results add no delivery.

Before marking a task complete, compare the user's request, the initial behavior, and the implemented change. Establish that the affected workflow delivers the requested result and preserves required behavior. Passing checks supports that assessment; completion requires the requested outcome.

## Scope statement

Organize resource generation into three Effect services. OpenApiResourceSchemas owns schema resolution, OpenApiResourceBindings owns discovery and operation bindings, and ResourceCatalogs constructs and emits validated catalogs. Each service must expose composable public methods with consistent names and obtain its dependencies through the composed Layer graph. Preserve resource discovery, operation validation, generated catalogs, and existing failures.

## Direction

Keep schema resolution independent of binding decisions. Bindings select outputs and resolve relationships; catalog construction validates and combines those results. Update consumers to call those public operations directly, infer service requirements from their implementations, and provide dependencies through Layers.

## Completed work

- [x] ResourceSourceInvalid has one shared declaration in resourceErrors.ts. Existing test cases and fixtures provide behavior coverage for this refactor.

- [x] OpenApiResourceSchemas owns graph construction, property and identity queries, relationship links, and nullability normalization. OpenApiResourceBindings owns discovery, operation bindings, output selection, and relationship resolution. ResourceCatalogs composes those public operations to construct and emit validated catalogs. Its private bindResource helper selects outputs, validates the output catalog, and resolves relationships in one Effect operation.

- [x] Each service exports a Layer with inferred requirements. resourceCatalogServicesLayer supplies the three services through one dependency graph. Production consumers and existing tests use the same method names, and the superseded service files and exports have been removed.

- [x] Schema traversal, required-field propagation, and property relationship traversal compose named transformations through native streams, maps, and sets. Shared connection lookup retains source paths, required-property rules use set union and intersection, and native equality detects convergence. Typed traversal records preserve recursive ancestry without merging relationships reached through different fields.

- [x] Read selection retains each compatible operation with its checked item parameter. Native predicates compose matching rules, and read and mutation validation share parameter analysis. Creation discovery, individual resource resolution, and per-field output selection use named functions inside their owning service. Source-schema failures retain typed errors, missing schema locations fail with resource context, and logical groups are separated by blank lines.

- [x] Project compilation and scoped Biome checks pass. The six relevant catalog, generator, resource input, policy, stack, and AWS metadata test files pass all 46 cases. The AWS resource catalog integration case also passes, with generated-contract and catalog snapshots unchanged. Existing assertions remain intact, and this refactor adds no test cases or fixtures.

## Tasks

- [x] The three service APIs expose complete domain operations, with their public methods declared before private support functions. ResourceCatalogs exposes five catalog construction and emission methods. Native Effect preparation returns its catalog and output schema together, and readOperationSchemas supplies resolved models and source locations. Consumers use these operations, and the package exports their input and result contracts. Traversal state, candidate filters, model classifiers, and per-field construction remain private. Compilation, scoped Biome checks, and the 47 existing cases pass with snapshots unchanged.

- [x] Replace compound boolean callbacks, manual set comparisons, repeated lookups, and deeply nested resource transforms across the three services. Matching uses Effect predicates and named checks, required properties use native sets and map equality, and checked read candidates retain their selected parameters. Discovery and catalog construction compose complete domain methods with separated logical groups. Compilation, scoped lint, and the 47 existing cases pass with snapshots unchanged.

- [x] Implement the three services with complete, composable operations and consistent API names. Catalog construction composes output selection, output validation, and relationship resolution through its dependencies. Consumers use the owning public operations, and the superseded service files and exports are removed. Existing catalog, generator, declaration, and policy coverage passes, and project compilation validates the composed dependencies.

## References

The [Effect development contract](../docs/development/effect-native-development.md) governs service declarations and Layer composition. The [source documentation contract](../docs/development/code-documentation.md) governs public method comments. The [testing contract](../docs/development/testing.md) requires existing behavior coverage for this refactor.

## Supporting materials

The requested change replaces the 24-method ResourceCatalogs service with public APIs organized by responsibility. The existing generated deactivation work remains part of the current checkout and must be preserved.
