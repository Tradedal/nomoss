# Code review and remediation checklist

## Scope

- [ ] Compare the working tree and index with the requested change. Preserve unrelated edits and their staged state. For a plan-only assignment, limit the review to the plan.
- [ ] Confirm the user authorized removal before deleting experimental code, references, tests, or dedicated fixtures. Keep deleted declarations absent.
- [ ] Record unfinished work in the assigned tracker. Name the affected user, the result they still need, and what blocks it.

## Application behavior

- [ ] Run the application action through its public API. Compare the returned result, saved state, and reported failures with the accepted requirements.
- [ ] Trace a declaration through planning, provider calls, state writes, and output resolution. Check that the services use the same instances in the shared Layer graph. Fix the dependency that causes consumers to read different state.
- [ ] Review changes to resource definitions, generation, and provider registration against the [resource management development guide](effect-native-development.md#develop-resource-management).
- [ ] For long-running work, exercise interruption, replacement, and resumption as required. Check which local work stops and what the remote cancellation contract requires. In regression tests, use deterministic Effect signals to wait for the result the real consumer receives.

## Public APIs and Effect composition

- [ ] Compare public names with the repository's terms for the same capability. Follow imports to their canonical declarations and remove forwarding exports used solely to rename them. Check that package entry points expose the services, contracts, and errors callers need.
- [ ] Read the complete method and its callbacks together. Keep local validation and decisions beside the work that uses them. Call public methods or dependency services for shared behavior. Return the service's public API object directly from its constructor.
- [ ] Check inputs against the canonical schema and verify callers supply its required types. Return the completed result from a named local with an explicit domain type. Let TypeScript infer intermediate types and Effect channels. Replace casts, manual channel declarations, and `satisfies` expressions that mask a mismatch with a fix where the mismatch originates.
- [ ] Trace generic parameters in Effect and Layer inputs, callbacks, and local type aliases. If a parameter only carries a success type, error type, or service requirement, use the native combinator to infer it. [Effect channel inference](effect-native-development.md#let-effect-infer-channels-at-the-call-site)
- [ ] Inspect callbacks and `Effect.sync` bodies for loops or branches that obscure execution order or failures. Use Effect's collection and decision operations where they express the work directly. [Effect development contract](effect-native-development.md)
- [ ] Group lookup and validation statements together. Leave a blank line before the work that consumes the result. Keep execution order and control flow intact when adjusting whitespace.

## AWS generation and execution

- [ ] Compare the Smithy model with the generated contract callers import. Check request bindings, payload schemas, and execution metadata. Follow the public export to the AWS client and verify input validation and serialization. Check that the signer receives the final request before transport and that the client decodes the response or returns the typed failure. Verify the dependencies, prepared request reuse on retry, and interruption of HTTP work and waits against the contract. [AWS resource specification](../application/aws-resource-lifecycle-management.md)
- [ ] Follow a native AWS mutation through confirmation. Check that the lifecycle reads and validates the resource before it saves outputs or releases dependent work. [AWS resource specification](../application/aws-resource-lifecycle-management.md)

## Comments and documentation

- [ ] Read each changed comment with the operation and its callers. Keep the reason or contract the reader needs to understand the call. For a library extension, identify the library API it uses and the behavior the extension adds. Check multiline JSDoc delimiters, line width, and paragraph spacing. [Code documentation](code-documentation.md)
- [ ] Walk through each edited specification as its intended reader. Verify that it explains the required workflow and outcome. Remove accounts of method calls, constructor statements, and tracker activity. Where an architecture or API decision is required, explain the constraint and its consequence. Leave private project details outside repository documentation. [Specification guidance](spec-writing.md) · [Writing review](unslop.md)
- [ ] Try to follow the steps in edited operating instructions. Check that the commands and expected results let the reader complete the task. In API documentation, check that callers can tell how to call the API and interpret the result.

## Validation and completion

- [ ] Compare proposed tests with existing coverage. Add a test for a specific gap in Nomoss behavior and assert the result its consumer receives. Use existing evidence for unchanged work. [Testing contract](testing.md)
- [ ] After the final fixes, run the required Biome and Effect language-service checks for the changed code. Inspect the result against the governing contract for requirements that need direct review. Rerun a check after a change that affects its result or when the evidence leaves a specific requirement unverified. [Linting workflow](linting.md)
- [ ] Stage only the requested files. Obtain explicit authorization before committing or pushing.
