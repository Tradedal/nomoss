# Current change set remediation

## Problem

The initial Stripe client migration has no active work assigned here. Its restrictions on import and tooling changes no longer govern current work; active follow-ups have separate trackers.

## Rules / constraints

This historical record does not authorize you to implement code, stage changes, or create commits. Follow the current development contracts and the active scope in the [unified resource tracker](dev-attempts_unified-resource-generation.md), [client tracker](dev-attempts_shared-client-generator.md), or [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md).

## Completed

- [x] Removed the rejected four-file tools/codegen implementation. Its combined operation parser and speculative configuration model violated the required pipeline structure. The replacement must begin with the validated operation contract from the dev reference; the removed implementation is excluded from reuse.

- [x] The staged Stripe batch defines canonical Layers beside their services and replaces simulated lifecycle decisions with native HTTP response queues.
- [x] Stripe's official OpenAPI repository is available under refs/stripe-openapi. The source manifest identifies its revision, specification path, checksum, and the 21 operations used by current resources.
- [x] StripeClient executes generated operations with input validation, authenticated HTTP, bracket-encoded v1 forms, JSON v2 bodies, and generated response and failure decoding.
- [x] Account, customer, product, price, webhook, and billing portal lifecycles call the generated client through the canonical StripeClient Layer. The live graph supplies native configuration and HTTP services.
- [x] The staged package manifest, Projen dependency declarations, upgrade task, and lockfile remove the Stripe Distilled dependency and include the required Effect runtime, test dependencies, and ts-morph. Contributors can reproduce the generator's output through its repository command; AWS dependency changes retain their separate scope.
- [x] StripeClientGenerator emits six resource clients, six contract modules, and shared schemas directly into their configured modules. The manifest controls grouping, AST references determine imports, and shared schemas use lazy initialization across modules. The generator no longer uses a monolithic intermediate module, copies clients, or moves declarations between modules. Effect's reference policy prefixes shared names to avoid JavaScript globals.
- [x] Resource declarations derive provider validation from generated schemas, including recurring-price fields. Update policies omit absent properties, and fixture responses follow the pinned specification's required and nullable fields.
- [x] StripeClient callers receive validated form and JSON responses, modeled failure details, and input-validation failures before HTTP execution through the shared production fixture.
- [x] TypeScriptModulePublisher checks scoped temporary files before it publishes them. Malformed candidates retain the previous destination, and the canonical publisher Layer supplies the Stripe generation command. Staged Biome and Projen definitions include tooling files. Generated schema modules preserve Effect's compiled RegExp expressions so formatter conversion cannot corrupt escaped provider patterns.
- [x] Generator operations, source grouping, lifecycle methods, resource policies, and fixture response queues document their supported results and failure behavior. Removed the obsolete webhook secret conversion retained from the previous client.

## Remaining

No separate work remains assigned here. The [unified resource tracker](dev-attempts_unified-resource-generation.md) owns cross-provider extraction after Stripe resource management works. The [client tracker](dev-attempts_shared-client-generator.md) owns HTTP contracts, and the [AWS tracker](dev-attempts_aws-resource-lifecycle-generator.md) owns the AWS runtime migration.
