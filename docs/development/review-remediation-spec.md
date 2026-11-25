# Review and remediate the assigned change

Call the supported APIs that consumers use for the assigned change. Check the results they receive, the state those operations save, and the failures they return against the required behavior. Limit the files and fixes to the assigned scope. Apply the [Effect development contract](effect-native-development.md) to the implementation and the [testing contract](testing.md) to the evidence that establishes its behavior.

## Keep the review within its assigned scope

Identify what the change lets its consumers do and which files provide that behavior. Check that working and staged changes belong to that scope. Preserve unrelated files and changes, including their existing state in the index.

Remove experimental code or remaining references only when the user has authorized that cleanup. Do not restore deleted declarations. Record unfinished behavior in the existing tracker and identify the affected user, the result they cannot obtain, and why the work remains open. If the user authorized only a plan, keep implementation and other excluded actions halted during review.

## Check the result the application receives

Follow an application action from its public entry point to the result its caller receives. Check that the services that register declarations, prepare plans, call the provider, save state, and resolve outputs share the same assigned service instances. If these operations produce inconsistent values or use different dependencies, correct the source of that disagreement within the authorized scope.

Interrupt, replace, and resume work that takes a long time as the assigned behavior requires. Check that local interruption stops the specified local work and that remote cancellation follows its separate contract. Regression tests must observe the real consumer and use deterministic Effect signals to wait until the operation actually completes.

## Review public APIs and their callers

Check that each public name identifies an established domain capability and that internal callers import its canonical declaration. Within the assigned scope, remove aliases and modules that forward exports solely to rename a service, method, runtime, or Layer. Check that package entry points expose the supported services, contracts, and errors applications need to call those capabilities.

Read each method as one coherent operation and check that it calls public methods or dependency services for shared behavior. Keep its complete implementation in the service. The service constructor must explicitly return its public API object; do not collect methods in an intermediate object before that return.

At the end of each operation, bind its completed result to a named local with an explicit domain contract type and return that local explicitly. Let TypeScript infer intermediate types and Effect channels from the values and dependencies that produce them. Check that canonical schemas validate inputs and that callers pass the types those schemas require. Do not hide a mismatch through casts, manual channel declarations, or satisfies expressions.

## Read each operation and its callbacks

Read callbacks and Effect.sync bodies together with the main method. Check whether they accumulate values or choose branches imperatively in ways that hide required work, its order, or its failures. Use Effect's collection and decision constructs to make those actions explicit. Put reusable capabilities in public methods and keep local decisions in the operation that uses them.

Place the statements that look up or validate a value together, then separate them with a blank line from the work that consumes the result. Keep related statements together and leave enough space around multiline calls to show where each operation ends. When you adjust whitespace, keep statements in their existing blocks and preserve their execution order and control flow.

For an AWS operation, read the source model and check that the generator preserves its request bindings, payload schemas, and execution metadata in the contract callers import. Follow a caller through that public export to the internal client, as required by the [AWS resource specification](../application/aws-resource-lifecycle-management.md). Check that the generated schema validates caller input, the client prepares and serializes the request, and the signer signs that final request before the HTTP service sends it. Check how the client decodes the response or returns a typed failure. For a Cloud Control mutation, follow how the tracker uses the request token until AWS reports a terminal result. Check that the lifecycle reads and validates the resource model before it saves outputs or releases dependent work. Assess each step against the linked contract, including which dependencies it permits, how retries reuse the prepared request, and which HTTP work and waits must stop when the caller is interrupted.

## Review comments, specifications, and operating instructions

Read each source comment with the complete operation and its callers. Check that it explains a supported reason or requirement that adjacent statements do not establish. If the code extends a library, the comment must explain what the extension adds and which behavior the library already supplies.

Write multiline JSDoc with its delimiters on separate lines. Wrap prose to the configured width and separate paragraphs with blank comment lines. Check that specifications explain required behavior, API documentation explains how to call the API and interpret its result, and operating instructions provide the steps and commands needed to perform the task.

Read a functionality specification as someone who must perform its workflow and understand the expected result. The reader must not need to reconstruct the implementation. Remove accounts of method calls, constructor statements, and tracker activity. Explain required architecture and API decisions with enough technical detail to establish the constraint and its consequence.

Read the complete edited text against the [documentation contract](code-documentation.md), [specification guidance](spec-writing.md), and [writing review](unslop.md). Keep private project details outside repository documentation.

## Verify the completed change

Choose each check to answer a question about the behavior delivered by the change. Reuse existing evidence when the relevant work is unchanged. Add a test only for an identified Nomoss behavior that needs proof. Remove tests and dedicated fixtures that merely repeat implementation or library guarantees only when the user has authorized that removal.

Finish the fixes before the final checks for the assigned scope. Run the Biome and Effect language-service checks required for changed code by the [linting workflow](linting.md). Read the result against the governing contract as well; automated checks cannot establish every requirement. Repeat a check after a relevant change or when the existing evidence does not answer a specific question.

Check that the finished change provides the promised behavior to its required consumers. Stage only the requested scope and record unfinished work in its assigned tracker. Commit or push only with the user's explicit authorization and follow the repository's Git rules.
