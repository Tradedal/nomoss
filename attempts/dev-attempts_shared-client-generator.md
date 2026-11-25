# Shared client generation

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

StripeClientGenerator and AwsOpenApiTypeScript do not preserve every request location and response form described by canonical operations. StripeClient also loses HTTP failure identity when the response body cannot be decoded as JSON.

## Direction

Client emitters and OperationCatalogs must read the same corrected source and preserve its canonical request locations, optional bodies, media types, and response statuses. Client generation must use native JsonSchema, SchemaRepresentation, and CodeDocument contracts and emit source through AST operations. Provider configuration selects names, modules, execution bindings, and reviewed corrections. Smithy conversion prepares AWS source for that flow.

Each correction must state its reason and the complete source value it expects. Generation must stop if the target is absent or its value has changed. Corrections must preserve unrelated fields. To add a field, a correction must check and replace its parent object.

Follow the [testing contract](../docs/development/testing.md). Reuse domain behavior cases, reviewed artifact snapshots, and production live workflows. Do not restore removed transport-format suites or add test-only production APIs. Keep credentials and private configuration outside repository files. The [unified tracker](dev-attempts_unified-resource-generation.md) owns Stripe resource management; the [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md) owns its runtime migration.

## Completed work

- [x] OperationCatalogs extracts canonical requests and responses from corrected Stripe OpenAPI and converted AWS Smithy documents. Catalogs retain source identity, request requirements, media declarations, response statuses, body distinctions, and provider extensions. SchemaCompilation uses native Effect compilation and supplies CodeDocument to both AST emitters.

- [x] SourceCorrections validates expected values before applying replacements or removals. Stripe's corrections keep nullable customer, product, price, and invoice settings valid through OpenAPI compilation. Stripe generation and invocation share a canonical encoding contract.

- [x] Stripe resources execute planned Delete and Read commands through the production stack. Reads distinguish confirmed absence from failure, retain webhook signing secrets, and validate exported files. Reconciliation removes confirmed absences and preserves state on failure. Sandbox coverage exercises customer and recurring-price lifecycles and retains the identity of a replacement price.

## Tasks

- [ ] StripeClientGenerator combines body properties with parameters, and both provider emitters assume particular success responses. The emitters must preserve each canonical request location, optional body, media type, and response status so resource consumers can execute the modeled operation, even when it returns no body.
- [ ] StripeClient.invoke decodes JSON before it constructs StripeApiError. A malformed or non-JSON error body therefore causes the returned failure to lose the HTTP status and request id. The invocation must return those values to lifecycle consumers even when it cannot decode modeled error details.
