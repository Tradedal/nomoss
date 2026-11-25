# Current change set remediation

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Migrate the initial Stripe resource lifecycles to the generated client and native Effect services. Later resource and AWS work has separate scope.

## Direction

Derive clients from validated provider operations and execute them through canonical Layers. Use native HTTP response queues to exercise lifecycle behavior.

## Completed work

- [x] Stripe's pinned OpenAPI manifest supplies the revision, path, checksum, and 21 operations for the initial migration. The generator emits six clients, six contract modules, and shared schemas directly using manifest grouping, AST-derived imports, and lazy schema initialization.

- [x] Account, customer, product, price, webhook, and portal lifecycles use the generated StripeClient through native Effect Layers. The client validates inputs before HTTP execution, encodes v1 forms and v2 JSON, and decodes modeled responses and errors. Declarations use generated schemas, updates omit absent values, and shared fixtures supply native HTTP responses.

- [x] The generated client replaces Stripe Distilled and the rejected combined parser and configuration path. The [publisher](../tools/codegen/) validates candidate modules before replacing destinations and retains Effect's compiled regular expressions.

## Tasks

No separate work remains assigned here. The [unified resource tracker](dev-attempts_unified-resource-generation.md) owns cross-provider extraction after Stripe resource management works. The [client tracker](dev-attempts_shared-client-generator.md) owns HTTP contracts, and the [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md) owns the AWS runtime migration.
