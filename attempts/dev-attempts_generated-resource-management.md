# Eliminate handwritten Stripe resource modules

## Tracker maintenance

Keep this section at the top of each tracker. Consolidate completed tasks into delivered outcomes and combine overlapping tasks as the work progresses.

State the result each task must deliver and the behavior that establishes completion. Include acceptance conditions in the task. Follow repository validation guidance.

Before marking a task complete, compare the requested result and initial behavior with what the affected workflow now delivers. Confirm that it preserves the required existing behavior.

## Scope statement

Remove the remaining Price, webhook, and billing export resource modules and their public exports. Stripe resources must use generated declarations and declarative lifecycle configuration. The billing application must declare its configuration file through a generic JSON-file resource. Preserve resource dependencies, saved provider identities, replacement recovery, webhook credentials and signing secrets, and the application file's contents and cleanup.

Remediate the review feedback throughout the current change. The audit of direct JavaScript methods extends across repository-owned TypeScript source, tools, examples, and tests. Refactor the declaration compiler as a separate task with complete Effect service operations.

## Direction

Use existing generated contracts wherever they already express the provider operation. Keep application choices, such as monthly billing terms and exported field names, in application declarations.

Extend generation and generic operations only for behavior the current contracts cannot express. Resource-specific branches, callbacks, compatibility wrappers, and renamed handwritten modules do not complete this cleanup. ResourceCommandExecutionFailed already supplies resource context and the original cause.

## Completed work

- [x] Generated declarations replace the handwritten Account, Customer, Product, Price, and webhook lifecycle modules. Product and portal deactivation use generated POST operations. Customer removal checks the saved identity, and failed removals preserve ownership. Shared command failures retain resource context and the original cause.

- [x] Price retires before replacement, and webhooks create the replacement before retiring the previous instance. Lifecycle records preserve owned instances, completed operations, and protected outputs. Recovery skips finished work, teardown handles every owned instance, and Keychain storage retains signing secrets. Generated request metadata supplies URL credential keys and preserves the saved URL.

- [x] StripeResourceDeclarationCompiler and TypeScriptModulePublisher prepare declarations through production emitters and validate the complete candidate batch before replacing output. Generated bindings retain provider inputs, identities, and projections. Request preparation uses Effect operations for missing configuration, credentials, and validated JSON patches.

- [x] Generic file execution observes and removes exports through the existing dispatch identity and `OutputPath`. Invalid contents preserve ownership, an absent file can be recreated with the same values, and teardown accepts a missing path.

## Tasks

- [ ] Complete the remaining comment review throughout the resource-management change under [code-documentation.md](../docs/development/code-documentation.md). Each comment must explain a verified caller requirement, constraint, or result. Preserve request validation, configured URL credentials, saved properties, replacement recovery, and the original failure causes through the existing stack workflows.

- [ ] Continue JavaScript cleanup as improved lint rules identify additional cases. The current batch is closed after validation. Future cases must use the corresponding Effect operations and explicit handling of absent values. Review Effect.try calls against the invoked API's actual failure contract. Preserve domain results, provider error precedence, and failure causes. Fix generator sources before reproducing generated code, and validate affected operations through existing behavior coverage. Further repository-wide discovery is deferred to those linter findings at the user's direction.

- [ ] Finish application ownership of the generic JSON-file declaration. The current batch removes the three handwritten billing export modules and their runtime override, and generic file operations execute generated contracts. The billing document's field names and resource mappings still live in tools/stripe/local-resource-source.json. Move those application choices into the application declaration while retaining shared dependency resolution, document validation, recovery, and teardown. Keep the existing saved dispatch identity and OutputPath; the current generated registration preserves both, so this change requires no migration decision.

## References

| Source | Role in this change |
|---|---|
| [Generation contract](../docs/application/generation-architecture.md) and [lifecycle contract](../docs/application/resource-operations.md) | Govern generated declarations, dependencies, provider validation, saved identities and recovery. |
| [Billing export test fixture](../tests/support/stripeBillingFixture.ts) | Declares monthly offers and a billing file that consumes their applied IDs. |
| [Generated declarations](../src/providers/stripe/client/generated/resourceDeclarations.ts) and [provider hints](../tools/stripe/openapi-source.json) | Supply the current resource factories and lifecycle choices. |
| [Testing contract](../docs/development/testing.md) and [Effect development guide](../docs/development/effect-native-development.md) | Govern application validation and the shared service graph. |

## Supporting materials

The pinned [Stripe specification](../refs/stripe-openapi/latest/openapi.spec3.json) supplies provider constraints. The cleanup must remove custom resource handling rather than move it into core services, generated callbacks, or replacement modules.
