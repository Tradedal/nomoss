# Resource mapping

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

ResourceCatalogs cannot yet resolve some nested identities, relationships, and output fields defined across schema branches. Those gaps leave discovered Stripe resources without usable generated bindings.

## Direction

ResourceCatalogs must discover resources across the full corrected provider source without a manual operation or client list. It must record creation models before it resolves lifecycle behavior and retain unresolved issues on the affected entries. Hints may resolve ambiguity or supply exceptional names and lifecycle decisions, but must not copy property schemas or define entire resource mappings.

Use canonical JSON Schema contracts, JSON Pointer paths, native Effect compilation, and AST emission. Preserve saved output names, identity, dependency resolution, state format, secret retention, and provider behavior. AWS continues through Cloud Control. General import and credential replacement remain separate.

Use small source documents for domain behavior cases and preserve the existing AWS metadata snapshot. Do not add Stripe metadata comparison tests or test-only APIs. Provider acceptance uses production clients and the stack. The [unified tracker](dev-attempts_unified-resource-generation.md) owns managed generation and catalog-wide acceptance; this tracker owns the source-resolution defects below.

Relationship discovery must retain the allowed resource types and mappings needed by the canonical core contract. Generated Stripe schemas accept compatible resource entities at resolved paths. The unified tracker owns core execution and its provider consumers; source resolution here must preserve the metadata they require across the complete catalog, including issues for unresolved targets.

## Completed work

- [x] ResourceCatalogs records creation operations before resolving saved-identity reads. Canonical schemas and parameter locations govern resolution across Registry, OpenAPI, and Effect inputs. Named aliases resolve to their resource, nullable constraints survive compilation, and provider namespaces distinguish v1 and v2 names. Unresolved entries retain source evidence and binding issues, including unsupported encodings.

- [x] Generated Stripe clients run through Effect Layers. Creation validates resolved declaration inputs against the provider contract before invocation. Generated declarations accept supported resource entities and expose typed outputs through the shared model. AWS Cloud Control declarations consume the shared output catalog and retain the full provider model and opaque identifier.

- [x] ResourceModel validates observed identity, including older saved records and deleted-customer observations. Replacement passes new price IDs into dependent portal settings and file exports. Reconciliation retains webhook secrets and preserves saved state on failure. Teardown can resume after a failed removal.

- [x] Stripe emits bindings and schema definitions separately. TypeScriptModulePublisher validates syntax before replacing destinations, and generation records compilation and publication under the command trace. The billing export uses generated schemas and projections, and its filesystem lifecycle validates documents before creating directories.

## Tasks

- [ ] ResourceCatalogs leaves parent parameters and reads that need several identifiers unresolved. Its resolution flow must retain those source-derived values in generated creation inputs and saved read bindings so applications can declare nested resources and read them through their saved identity.
- [ ] ResourceCatalogs output projection rejects a selected field when several source definitions contribute to that field. The projection must retain every contributing constraint and source location so generated outputs accept the composed model without loss of validation.
- [ ] StripeClient cannot encode the request required for file creation. The [client tracker](dev-attempts_shared-client-generator.md) owns transport support. ResourceCatalogs must retain the operation and the reason it cannot execute on the catalog entry until its binding is executable.
