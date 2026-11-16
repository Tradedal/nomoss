# Code remediation checklist

## Prepare or commit the review batch

Review the implementation you just completed. Use the checklist below to find defects and finish the cleanup, then stage or commit the changes as a coherent batch for review.

Organize the batch around changes that must work together. Keep a changed interface with the callers migrated to it, because reviewing either part requires the other. Keep changed tests with the implementation they exercise.

Make batches easy to review and size them so review can advance without breaking related work into disconnected files or producing one large dump.

Apply the checklist to the staged batch while reading the complete operations it changes. Fix the defects identified by the checklist and keep the corrections staged with the batch. Keep validation focused and reuse passing results for unchanged work.

For a batch of mechanical changes of low risk, commit without waiting for the user and start working on the next batch.

## Required behavior and public APIs

- [ ] Compare the completed implementation with the accepted requirements through the public API the application is supposed to use. Follow the call to the result its consumer receives. Restore missing behavior within the assignment. Report a conflict that needs a user decision before changing the required API or narrowing what counts as complete.

- [ ] Trace successful returns to the work they claim to complete. Replace placeholder results, unexecuted Effects, or successful defaults that skip required work with calls to the responsible production services. Verify the actual result and saved state; a method name or return type does not establish that the operation happened.

- [ ] Check application callers for engine procedures introduced during cleanup or type repair. Keep registration, declaration isolation, preparation, and output resolution inside the engine where the accepted design assigns them. Correct the service composition that exposes the problem. Renaming an internal operation or adding a forwarding wrapper does not supply the required application API.

- [ ] Compare resource-specific branches with the general capability required by the assignment. Move behavior implemented only for an example into the responsible core service or generator. Verify that other supported resources use the same implementation. Keep examples as consumers of that capability.

- [ ] Resolve changed imports to their existing declarations. Stop the affected implementation when a declaration is missing and report the missing reference. Keep deleted symbols absent until the user supplies a reference or authorizes their implementation.

## Effect types and service composition

- [ ] Inspect changed Effect and Layer types for manual success, error, or dependency declarations, casts, and caller annotations that hide missing services. Remove those declarations and supply the dependency in the operation or Layer that needs it. Construct dependencies before their consumers and check that the producing operation infers its public types without any or unknown.

- [ ] Check unnamed exported types at the export that produces them. Expose a smaller service or domain value whose public contract the consumer can name, while preserving its required operation and inferred types. Remove handwritten reconstructions of Layer requirements or repeated type parameters used only to transport the service graph.

- [ ] Follow state written by an operation to the service its consumer reads. Ensure both use the same instance in the shared Layer graph. Replace consumer-local graphs, copied state, and captured contexts used to bypass dependency composition with the established service connections.

- [ ] Follow subscriptions, watchers, and other persistent streams through replacement and shutdown. Keep their fibers scoped, or retain and interrupt the active fiber before replacement. Correct work that survives its owning scope or continues under an old identity; remove daemon forks used for that work.

## Operations and generated contracts

- [ ] Read each changed service method with its callbacks and callers. Keep validation, decisions, dependency calls, and the completed result together. Put reusable domain work in public service methods. Ensure the constructor returns its public API explicitly and each method returns a named final value with an explicit domain type.

- [ ] Inspect lint fixes for deeply nested callbacks, unrelated inputs collected into an object, or helpers added only to silence a diagnostic. Rewrite the affected operation through readable native Effect composition. Preserve execution order and keep local parsing and decisions beside the work that uses them.

- [ ] Check validation against the canonical schema for the domain. Replace copied contracts and local validators that make a business decision with that schema and the responsible service operation. Preserve the typed failures promised to callers instead of hiding them through fallback values.

- [ ] Review generator changes with the contracts their consumers import. Make corrections in the generator and reproduce its output through TypeScript AST operations and Effect schema compilation. Remove hand-edited generated contracts and source templates. For AWS operations, verify the generated Smithy contract is executed by the internal client under the [AWS resource contract](../application/aws-resource-lifecycle-management.md).

## Evidence and completion

- [ ] Read each behavior test through the production operation it exercises. Replace test-local implementations or fake service interfaces that bypass the operation with the shared domain fixture and real consumer. Keep recorded responses when the fixture contract requires them. Verify outcomes the consumer receives, including reads after writes and failures followed by retries where the assigned behavior requires them.

- [ ] Compare changed assertions, snapshots, and examples with the accepted behavior before accepting them. Correct evidence that merely follows the new implementation or uses an available internal API in place of the required public API. Add coverage only for a specific behavior gap under the [testing contract](testing.md).

- [ ] Run scoped Biome lint, the project Effect and TypeScript check, and the smallest relevant behavior suites under the [linting workflow](linting.md). Confirm that the checks processed the completed changes. Retain valid results for unchanged work, repeat checks after relevant repairs, and report failures outside the batch without expanding the assignment.

- [ ] Review changed comments and documentation through the writing checks in [review-docs.md](review-docs.md#meaning-and-requirements).
