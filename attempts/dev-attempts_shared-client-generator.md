# Shared client generation

## Problem

StripeClientGenerator and AwsOpenApiTypeScript do not preserve every request location and response form described by canonical operations. StripeClient also loses HTTP failure identity when the response body cannot be decoded as JSON.

## Rules / constraints

Client emitters and OperationCatalogs must read the same corrected source and preserve its canonical request locations, optional bodies, media types, and response statuses. Client generation must use native JsonSchema, SchemaRepresentation, and CodeDocument contracts and emit source through AST operations. Provider configuration selects names, modules, execution bindings, and reviewed corrections. Smithy conversion prepares AWS source for that flow.

Each correction must state its reason and the complete source value it expects. Generation must stop if the target is absent or its value has changed. Corrections must preserve unrelated fields. To add a field, a correction must check and replace its parent object.

Follow the [testing contract](../docs/development/testing.md). Reuse domain behavior cases, reviewed artifact snapshots, and production live workflows. Do not restore removed transport-format suites or add test-only production APIs. Keep credentials and private configuration outside repository files. The [unified tracker](dev-attempts_unified-resource-generation.md) owns Stripe resource management; the [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md) owns its runtime migration.

## Completed

- [x] ClientOperation defines request locations, requiredness, media declarations, and response statuses for shared generation. Empty response bodies remain distinct from content with an unspecified schema.
- [x] SourceCorrections applies schema-defined replacements and removals through native Effect JSON patches. It rejects missing targets and unexpected values before it returns a corrected document. tools/codegen/index.ts exports the contracts and service.
- [x] Removed the unused alternative pipeline, its handwritten intermediate records, and its disconnected provider configurations. TypeScriptModulePublisher retains the file-formatting and publication APIs used by the existing generators.
- [x] SourceCorrectionRegistry supplies schema-validated correction data to Stripe's source manifest and AWS's correction file. Both generators apply expected-value checks before catalog extraction and schema compilation.
- [x] OperationCatalogs extracts canonical operations and metadata from corrected documents. Metadata retains source and service identity, request requirements, response declarations, and provider extensions. The same operation declarations supply provider client generation.
- [x] Stripe's OpenAPI source and AWS's officially converted Smithy documents use the common correction and catalog flow. Generated provider exports include stripeOperationCatalog and cloudControlOperationCatalog; provider-specific decoding follows catalog extraction so it cannot discard catalog metadata.
- [x] SchemaCompilation supplies shared normalization, import, and code compilation through native JsonSchema and SchemaRepresentation APIs. Both provider generators consume CodeDocument directly, and StripeCompiledSchema has been removed. Module assignment stays within emission.
- [x] StripeOperation and StripeOpenApiInvocation derive their contracts from canonical schemas. Generation validates supported request encodings before publication, and invocation selects its encoder through the same contract.
- [x] Stripe resource policies dispatch planned Delete decisions through their existing teardown methods. ResourceStackLifecycle.apply can retire omitted Stripe resources and remove their saved state.
- [x] Stripe sandbox integration uses the production declaration, planning, client, and file-state services to create, reconcile, update, and remove a customer and a product with its recurring price. It observes a customer deleted directly in Stripe and preserves the replacement price's saved identity. Source acceptance compares fresh metadata with the published catalog and reviewed snapshot.
- [x] Stripe's source correction registry preserves nullable customer, product, price, and invoice-setting unions and enums through native OpenAPI compilation. The registry checks the original alternatives before it adds explicit null alternatives; generated response validation accepts unset provider fields.
- [x] All six Stripe resource policies accept ResourceCommand.Read. Remote reads distinguish provider 404s and deleted customers from read failures, webhook observations preserve the saved signing secret, and configuration-export reads validate the published file. ResourceStackLifecycle.reconcile saves present resources and removes resources confirmed absent. A failed read preserves saved state.

## Remaining

- [ ] StripeClientGenerator combines body properties with parameters, and both provider emitters assume particular success responses. The emitters must preserve each canonical request location, optional body, media type, and response status so resource consumers can execute the modeled operation, even when it returns no body.
- [ ] StripeClient.invoke decodes JSON before it constructs StripeApiError. A malformed or non-JSON error body therefore causes the returned failure to lose the HTTP status and request id. The invocation must return those values to lifecycle consumers even when it cannot decode modeled error details.
