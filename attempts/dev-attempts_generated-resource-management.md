# Eliminate handwritten Stripe resource modules

## Tracker maintenance [keep this section at the top of every tracker]

Preserve this section unchanged while working on a tracker. Keep the tracker lean as development progresses. Consolidate completed tasks into concise statements of delivered behavior, and combine overlapping tasks into coherent outcomes.

Each task must explain the result to deliver and the behavior that establishes completion. Repository guidance defines how to validate work. Keep validation within the task's acceptance conditions; separate tasks for running checks or recording their results add no delivery.

Before marking a task complete, compare the user's request, the initial behavior, and the implemented change. Establish that the affected workflow delivers the requested result and preserves required behavior. Passing checks supports that assessment; completion requires the requested outcome.

## Scope statement

Remove the remaining Price, webhook, and billing export resource modules and their public exports. Stripe resources must use generated declarations and declarative lifecycle configuration. The billing application must declare its configuration file through a generic JSON-file resource. Preserve resource dependencies, saved provider identities, replacement recovery, webhook credentials and signing secrets, and the application file's contents and cleanup.

Remediate the review feedback throughout the current change. The audit of direct JavaScript methods extends across repository-owned TypeScript source, tools, examples, and tests. Refactor the declaration compiler as a separate task with complete Effect service operations.

## Direction

Use existing generated contracts wherever they already express the provider operation. Keep application choices, such as monthly billing terms and exported field names, in application declarations.

Extend generation and generic operations only for behavior the current contracts cannot express. Resource-specific branches, callbacks, compatibility wrappers, and renamed handwritten modules do not complete this cleanup. ResourceCommandExecutionFailed already supplies resource context and the original cause.

## Completed work

- [x] Product and BillingPortalConfiguration use generated POST deactivation operations with active: false. Failed removals retain saved ownership. Customer's generated registration recognizes deleted responses after it checks the saved identity.

- [x] Generated replacement rules retire Price before creation and create a new webhook before removal. Ordinary lifecycle records retain each owned instance, completed operations, and protected outputs. Recovery skips completed work, teardown can remove every owned instance, and Keychain storage preserves each instance's signing secret across reloads.

- [x] Account, Customer and Product handwritten lifecycle services and per-resource error classes are removed. Generated clients retain their provider operations. Shared command errors identify the failed resource and preserve provider or validation failures. The generator and runtime no longer support custom error constructors.

- [x] Price uses its generated declaration and canonical provider schema. Its handwritten lifecycle module, custom schema, management override, and export are removed. Billing examples declare their monthly terms directly and use generated resource types.

- [x] Webhook declarations, rotation properties, and URL credential configuration are generated. Its handwritten lifecycle module, policy, management override, and exports are removed. Generic request preparation reads the configuration keys declared in metadata and preserves the saved URL. Existing saved property structure, replacement order, signing secrets, recovery, and Keychain reload are preserved. The focused catalog and stack checks, seven live Stripe cases, and two Keychain checks pass.

- [x] Request preparation handles absent configuration and credentials through explicit Option decisions. The validated JSON patch runs directly in the Effect pipeline. The ResourceRequest comment explains its input requirements, outgoing credentials, and required provider validation. Resource type names use Effect string operations throughout repository-owned TypeScript, and the audited string, array, and numeric operations use their Effect equivalents. Existing application assertions are preserved; all 130 ordinary tests and scoped lint pass.

- [x] StripeResourceDeclarationCompiler prepares declaration candidates through the production emitters, and TypeScriptModulePublisher validates the complete batch before replacing destinations. The executable selects the catalog and output directory and runs both services through one Layer graph. Provider clients, property types, identities, and output projections remain in the refreshed bindings. Publication coverage verifies written artifacts and preservation of existing destinations after lint or parse rejection.

- [x] The current batch's file-service comments explain why applications publish resolved resource values, how reconciliation uses the document contract, and when saved ownership permits recovery. Declaration and publication comments explain their caller requirements and failure results. Relationship selection uses Option.gen to keep target selection and codec construction together, and generated declaration methods separate their logical groups with blank lines.

- [x] Generic file execution uses the saved dispatch identity and OutputPath for observation and teardown. Failed reads preserve ownership, and filesystem removal accepts an absent path through Effect's native operation. The live billing application verifies unchanged saved resources after invalid file contents, replacement of the export destination, recreation after external deletion with the same application values, and final teardown. The recreation assertion covers an application recovery path that the earlier workflow omitted.

## Tasks

- [ ] Complete the remaining comment review throughout the resource-management change under [code-documentation.md](../docs/development/code-documentation.md). Each comment must explain a verified caller requirement, constraint, or result. Preserve request validation, configured URL credentials, saved properties, replacement recovery, and the original failure causes through the existing stack workflows.

- [ ] Continue JavaScript cleanup as improved lint rules identify additional cases. The current batch is closed after validation. Future cases must use the corresponding Effect operations and explicit handling of absent values. Review Effect.try calls against the invoked API's actual failure contract. Preserve domain results, provider error precedence, and failure causes. Fix generator sources before reproducing generated code, and validate affected operations through existing behavior coverage. Further repository-wide discovery is deferred to those linter findings at the user's direction.

- [ ] Finish application ownership of the generic JSON-file declaration. The current batch removes the three handwritten billing export modules and their runtime override, and generic file operations execute generated contracts. The billing document's field names and resource mappings still live in tools/stripe/local-resource-source.json. Move those application choices into the application declaration while retaining shared dependency resolution, document validation, recovery, and teardown. Keep the existing saved dispatch identity and OutputPath; the current generated registration preserves both, so this change requires no migration decision.

## References

| Source | Role in this change |
|---|---|
| [Generation contract](../docs/application/generation-architecture.md) and [lifecycle contract](../docs/application/resource-operations.md) | Govern generated declarations, dependencies, provider validation, saved identities and recovery. |
| [Application declarations](../examples/stripe/apps.ts) | Declare monthly offers and the billing file that consumes their applied IDs. |
| [Generated declarations](../src/providers/stripe/client/generated/resourceDeclarations.ts) and [provider hints](../tools/stripe/openapi-source.json) | Supply the current resource factories and lifecycle choices. |
| [Testing contract](../docs/development/testing.md) and [Effect development guide](../docs/development/effect-native-development.md) | Govern application validation and the shared service graph. |

## Supporting materials

The pinned [Stripe specification](../refs/stripe-openapi/latest/openapi.spec3.json) supplies provider constraints. The cleanup must remove custom resource handling rather than move it into core services, generated callbacks, or replacement modules.
