# Resource lifecycle operations

The resource lifecycle contract defines how Nomoss turns a declaration into a validated provider request. The corrected provider specification governs requests and responses. A reviewed hint supplies a lifecycle decision the provider leaves open, such as whether removal deletes or deactivates the object.

## Create a resource

Once the declaration's dependencies resolve, Nomoss validates the creation request, calls the provider, and saves the returned identity and outputs only after they pass validation. A hint selects the intended operation and response model when discovery finds several candidates. Output aliases preserve names already in saved records.

## Read a saved resource

A read uses the saved identity. Nomoss verifies the returned object before it refreshes its outputs. For a creation-only output such as a webhook signing secret, the resource retains the saved value if the read omits it. A failed read leaves the identity and outputs available for retry.

Stripe treats HTTP 404 as confirmed absence. A Customer hint also permits a deleted-customer response after the policy validates it and matches its identity to the saved object. If authorization, transport, or validation fails, the stack retains ownership.

## Update a resource

An update targets the saved object. Its mapping specifies which output supplies each identity parameter, even if the names differ. The complete request passes validation, including any required constant. If a declaration drops a property, the policy defines how to clear the provider value. Without such a rule, the change fails before mutation.

Generated Stripe updates currently use the same identity mapping as reads. StripeResourcePolicy returns ResourceCommandUnsupported if the update schema discards a changed field or the declaration drops a saved property. Other identity mappings, constant update values, and provider-specific property resets remain outstanding. A constant that conflicts with the saved identity is invalid.

## Remove a resource

Removal uses the saved identity. Nomoss releases ownership only after the provider call succeeds. When HTTP DELETE does not express the intended action, a hint selects the operation and any constants its request requires.

Product and BillingPortalConfiguration use a hint to select POST with active: false for removal. Discovery selects HTTP DELETE by default. Support for each additional removal operation requires an identity mapping and request values the shared service can execute when the declaration disappears.

## Replace a resource

The plan identifies changes that require replacement and orders ordinary creation and removal according to the resource policy. Nomoss records each completed step. Recovery can then skip a successful creation and retain ownership of both objects until removal succeeds. Dependent requests use the successor's identity, and the resource's retention contract governs its outputs.

Where the provider leaves replacement behavior unspecified, hints identify the triggering properties and execution order. The reviewed plan shows that order. Price releases its lookup key when it retires the previous price, then creates its successor. Webhook rotation creates the successor first.

Each owned instance has its own lifecycle record and protected outputs. A completed removal remains on record until the operation finishes so a retry can skip it. Teardown during an unfinished operation removes every instance the stack still owns. Applied outputs remain available until Nomoss commits the successor.

## Validate and execute generated operations

Generated configuration preserves the provider operation's input, output, and failure types. Effect infers service dependencies and errors from the application Layer graph. The schema compiler checks mappings and constants, and the runtime validates the completed request.

A generated operation replaces a manual policy once production uses the generated registration and the superseded policy, wrapper, and runtime override are gone. Application integration coverage follows the provider object and its saved identity through each change, checks the values that dependents receive, and exercises recovery and cleanup. Each resource needs executable selections and mappings for its supported operations. [generation specification](generation-architecture.md#provider-directory-organization) · [resource management tracker](../../attempts/dev-attempts_generated-resource-management.md)
