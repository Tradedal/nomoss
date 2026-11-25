# Compose resource catalog services

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Organize resource generation into three Effect services. OpenApiResourceSchemas owns schema resolution, OpenApiResourceBindings owns discovery and operation bindings, and ResourceCatalogs constructs and emits validated catalogs. Each service must expose composable public methods with consistent names and obtain its dependencies through the composed Layer graph. Preserve resource discovery, operation validation, generated catalogs, and existing failures.

## Direction

Keep schema resolution independent of binding decisions. Bindings select outputs and resolve relationships; catalog construction validates and combines those results. Update consumers to call those public operations directly, infer service requirements from their implementations, and provide dependencies through Layers.

## Completed work

- [x] OpenApiResourceSchemas resolves schema graphs, properties, identities, and nullability. OpenApiResourceBindings discovers operations, selects outputs, and resolves relationships. ResourceCatalogs composes those public operations to validate and publish catalogs. One Layer supplies all three services, and the package exports their public contracts.

- [x] Native Effect preparation returns the catalog and output schema together. `readOperationSchemas` supplies resolved models and source locations. Shared traversal preserves recursive ancestry, source paths, and required-field rules. Read selection retains the matching parameter, and read and mutation bindings share parameter analysis. Missing schema locations retain resource context in typed failures.

## Tasks

All work in scope is complete.

## References

The [Effect development contract](../docs/development/effect-native-development.md) governs service declarations and Layer composition. The [source documentation contract](../docs/development/code-documentation.md) governs public method comments. The [testing contract](../docs/development/testing.md) requires existing behavior coverage for this refactor.

## Supporting materials

Preserve generated deactivation behavior when changing catalog composition.
