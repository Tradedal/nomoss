# Resource lifecycle operations

When an application applies a resource declaration, Nomoss must resolve related resources, validate the provider request, and execute the selected operation. Generation must obtain request and response validation from the corrected provider specification. Reviewed hints must identify choices the specification leaves to the application, such as whether removal deletes an object or deactivates it.

## Create a resource

Nomoss must validate the resolved declaration against the creation request schema before calling the provider. It must validate the returned identity and outputs before saving them. When discovery finds several creation operations or response models, a hint must select the intended operation and model. Output aliases must preserve the names used by saved records.

## Read a saved resource

Nomoss must construct the read request from the saved identity, verify that the response describes that object, and refresh its outputs. A required output returned only during creation, such as a webhook signing secret, must retain its saved value when reads omit it. A read failure must leave the saved identity and outputs intact so Nomoss can retry without losing ownership of the object.

The resource configuration must distinguish confirmed absence from a failed read. Stripe treats HTTP 404 as absence. Customer's generated registration also recognizes a deleted-customer response through its hint. The shared policy must validate the response and verify its saved identity before it reports absence. Permission, transport, and validation failures must preserve saved ownership.

## Update a resource

Nomoss must apply changed properties to the saved object and validate the complete request before sending it. Generated request mappings must identify which saved output supplies each identity parameter, including operations whose parameter names differ. When an update requires a constant request value, generation must include and validate that value. The configuration must also define how removing a declared property clears its provider value. Nomoss must reject the change before mutation when it cannot express that removal.

Generated Stripe updates currently require the same identity mapping as reads. StripeResourcePolicy returns ResourceCommandUnsupported before sending a request if the update schema would discard a changed property or the new declaration omits a previously saved property. Generation and shared execution still need to support other identity mappings, fixed update values, and provider-specific ways to clear omitted properties. A fixed value that conflicts with the saved identity must be rejected before mutation.

## Remove a resource

Nomoss must call the configured removal operation with the saved identity and clear saved ownership only after the request succeeds. A failed removal must preserve saved state. Hints must select the removal operation and any required constant values when HTTP DELETE does not express the desired action.

Generated Product and BillingPortalConfiguration removal already uses POST with active: false. Automatic discovery selects HTTP DELETE, so POST removal requires an explicit hint. Generation must support the corresponding identity mapping and required values for each additional removal operation. Shared execution must perform these requests when an application plan removes the resource.

## Replace a resource

Nomoss must identify property changes that require replacement and execute creation and removal in the order required by that resource. It must record completed steps so recovery can continue without repeating a successful creation or losing track of either object. After replacement, dependent requests must use the new identity, and retained outputs must remain available where the resource contract requires them.

Hints must identify changes that require replacement and the order of creation and removal when the provider specification omits those decisions. A reviewed plan must identify replacement and retain its ordinary creation and removal operations in execution order. Price removes the old price and releases its lookup key before creating its successor. Webhook rotation creates its successor before removing the old webhook.

Each owned provider instance must use the ordinary lifecycle records for creation, update, and removal. A completed removal must remain recorded until the composed operation finishes so retry can skip it. When a caller requests teardown during an unfinished operation, the teardown plan must remove every instance still owned by the stack through the normal removal workflow. Applied outputs must remain available until the successor is committed, and each instance must retain its own protected outputs for recovery.

## Validate and execute generated operations

The generated configuration and shared services must preserve each operation's input, output, and failure types. Effect must infer service errors and dependencies through the application's shared Layer graph. The generator must validate request mappings and constant values through the existing schema compiler, and execution must validate the completed request against the generated schema.

A generated operation replaces a manual policy only when production registrations use it and the replaced policy, wrapper, and runtime override have been removed. Application integration coverage must verify the provider result and saved identity after each operation, the values received by dependent resources, recovery after failure, and cleanup. Each resource needs operation selections and mappings that satisfy these requirements. The [generation specification](generation-architecture.md#provider-directory-organization) defines where these modules belong, and the [resource management tracker](../../attempts/dev-attempts_generated-resource-management.md) records the Product and BillingPortalConfiguration changes.
